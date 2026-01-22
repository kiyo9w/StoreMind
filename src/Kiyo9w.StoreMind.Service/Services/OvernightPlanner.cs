using System.Diagnostics;
using System.Text.Json;
using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Core.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// generates overnight plans using Claude/OpenAI via Semantic Kernel
/// </summary>
public class OvernightPlanner
{
    private readonly Kernel _kernel;
    private readonly IInventory _inventory;
    private readonly ISupplier _supplier;
    private readonly ILogger<OvernightPlanner> _log;
    private readonly StoreMindOptions _options;

    public OvernightPlanner(
        Kernel kernel,
        IInventory inventory,
        ISupplier supplier,
        IOptions<StoreMindOptions> options,
        ILogger<OvernightPlanner> log)
    {
        _kernel = kernel;
        _inventory = inventory;
        _supplier = supplier;
        _options = options.Value;
        _log = log;
    }

    public async Task<Plan> GeneratePlanAsync(string? storeId = null, CancellationToken ct = default)
    {
        storeId ??= _options.StoreId;
        _log.LogInformation("Starting overnight planning for store {StoreId}", storeId);
        var sw = Stopwatch.StartNew();

        // sense: gather current state
        var snapshot = await _inventory.GetSnapshotAsync(storeId, ct);
        var expiring = snapshot.GetExpiringItems(3).ToList();
        var lowStock = snapshot.GetLowStockItems(10).ToList();

        _log.LogInformation("Found {Expiring} expiring items and {LowStock} low stock items",
            expiring.Count, lowStock.Count);

        // propose: ask LLM to generate plan
        var prompt = BuildPlannerPrompt(snapshot, expiring, lowStock);
        var result = await _kernel.InvokePromptAsync(prompt, cancellationToken: ct);
        var responseText = result.ToString();

        // parse LLM response into actions
        var actions = ParseActionsFromResponse(responseText, snapshot);

        var plan = new Plan(
            Date: DateTime.Today.ToString("yyyy-MM-dd"),
            Assumptions: BuildAssumptions(expiring, lowStock),
            Actions: actions,
            QuestionsForManager: [])
        {
            ModelUsed = _options.Models.PlannerModel
        };

        _log.LogInformation("Plan generated in {Ms}ms with {Actions} actions",
            sw.ElapsedMilliseconds, actions.Count);

        return plan;
    }

    private string BuildPlannerPrompt(Snapshot snapshot, List<InventoryItem> expiring, List<InventoryItem> lowStock)
    {
        var expiringJson = JsonSerializer.Serialize(expiring.Select(i => new { i.Sku, i.Name, i.StockLevel, i.DaysUntilExpiry }));
        var lowStockJson = JsonSerializer.Serialize(lowStock.Select(i => new { i.Sku, i.Name, i.StockLevel, i.Category }));
        var today = DateTime.Today.ToString("yyyy-MM-dd");

        return $$"""
            <Background>
            You are an overnight store operations planner for a convenience store.
            Current date: {{today}}
            Store ID: {{snapshot.StoreId}}
            Total items in inventory: {{snapshot.Items.Count}}
            </Background>

            <Instructions>
            ROLE: Store Operations Planner
            GOAL: Generate purchase orders (DraftPo) for items that need restocking
            CONSTRAINT: Only output DraftPo actions. Each action needs evidence.
            
            Review the expiring and low-stock items below. For each item that needs ordering:
            1. Check if it's running low (< 10 units) or needs restocking after expiry clearance
            2. Suggest an order quantity based on typical restock levels
            3. Include confidence score (0.0-1.0) based on how certain you are
            </Instructions>

            <Data>
            EXPIRING ITEMS (within 3 days):
            {{expiringJson}}

            LOW STOCK ITEMS (< 10 units):
            {{lowStockJson}}
            </Data>

            <OutputSchema>
            Respond with a JSON array of actions. Each action should have:
            - sku: the item SKU
            - qty: suggested order quantity (integer)
            - confidence: 0.0 to 1.0
            - reason: brief explanation
            
            Example: [{"sku": "UMB-001", "qty": 20, "confidence": 0.85, "reason": "Low stock, rain expected"}]
            </OutputSchema>
            """;
    }

    private List<Proposal> ParseActionsFromResponse(string response, Snapshot snapshot)
    {
        var actions = new List<Proposal>();

        try
        {
            // try to extract JSON array from response
            var jsonStart = response.IndexOf('[');
            var jsonEnd = response.LastIndexOf(']');

            if (jsonStart >= 0 && jsonEnd > jsonStart)
            {
                var json = response.Substring(jsonStart, jsonEnd - jsonStart + 1);
                var parsed = JsonSerializer.Deserialize<List<LlmAction>>(json);

                if (parsed != null)
                {
                    foreach (var a in parsed)
                    {
                        var item = snapshot.Items.FirstOrDefault(i => i.Sku == a.Sku);
                        if (item == null) continue;

                        actions.Add(new Proposal(
                            Type: ProposalType.DraftPo,
                            Target: new ActionTarget(a.Sku, a.Qty),
                            ExpectedImpact: new ExpectedImpact(
                                WasteReduction: item.IsExpiringSoon ? a.Qty * item.Price * 0.5m : 0,
                                MarginDelta: a.Qty * item.Price * 0.15m,
                                StockoutRiskDelta: -0.2),
                            Confidence: a.Confidence,
                            Evidence:
                            [
                                new Evidence(
                                    Source: Evidence.Sources.InventorySnapshot,
                                    Timestamp: DateTime.UtcNow,
                                    EntityId: snapshot.SnapshotId)
                            ],
                            RiskFlags: item.StockLevel < 5 ? ["critical_low_stock"] : []
                        ));
                    }
                }
            }
        }
        catch (JsonException ex)
        {
            _log.LogWarning(ex, "Failed to parse LLM response as JSON, returning empty actions");
        }

        // if no actions parsed, create fallback actions for critical items
        if (actions.Count == 0)
        {
            _log.LogWarning("No actions parsed from LLM, generating fallback actions");
            foreach (var item in snapshot.GetLowStockItems(5).Take(3))
            {
                actions.Add(new Proposal(
                    Type: ProposalType.DraftPo,
                    Target: new ActionTarget(item.Sku, 20),
                    ExpectedImpact: new ExpectedImpact(0, 20 * item.Price * 0.15m, -0.1),
                    Confidence: 0.6,
                    Evidence:
                    [
                        new Evidence(Evidence.Sources.InventorySnapshot, DateTime.UtcNow, snapshot.SnapshotId)
                    ],
                    RiskFlags: ["fallback_action"]
                ));
            }
        }

        return actions;
    }

    private List<string> BuildAssumptions(List<InventoryItem> expiring, List<InventoryItem> lowStock)
    {
        var assumptions = new List<string>
        {
            $"Inventory snapshot taken at {DateTime.UtcNow:HH:mm} UTC",
            $"Found {expiring.Count} items expiring within 3 days",
            $"Found {lowStock.Count} items below safety stock threshold (10 units)"
        };

        if (expiring.Count > 5)
            assumptions.Add("High expiry count may indicate over-ordering in previous cycles");

        return assumptions;
    }

    private record LlmAction(string Sku, int Qty, double Confidence, string? Reason);
}
