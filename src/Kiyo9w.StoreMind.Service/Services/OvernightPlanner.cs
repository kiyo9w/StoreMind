using System.Text.Json;
using System.Text.Json.Serialization;
using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Core.Interfaces;
using Kiyo9w.StoreMind.Service.Plugins;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Orchestrates the overnight planning process using a hybrid approach of deterministic baseline generation
/// followed by LLM-based refinement and validation.
/// </summary>
public class OvernightPlanner
{
    private readonly Kernel _kernel;
    private readonly IInventory _inventory;
    private readonly ISupplier _supplier;
    private readonly Plugins.WeatherPlugin _weather;
    private readonly StoreMindOptions _options;
    private readonly ILogger<OvernightPlanner> _log;

    private const int LowStockThreshold = 10;
    private const int DefaultOrderQty = 20;
    private const int MaxAdjustmentDelta = 50;

    public OvernightPlanner(
        Kernel kernel,
        IInventory inventory,
        ISupplier supplier,
        Plugins.WeatherPlugin weather,
        IOptions<StoreMindOptions> options,
        ILogger<OvernightPlanner> log)
    {
        _kernel = kernel;
        _inventory = inventory;
        _supplier = supplier;
        _weather = weather;
        _options = options.Value;
        _log = log;
    }

    public async Task<Plan> GeneratePlanAsync(string? storeId = null, CancellationToken ct = default)
    {
        storeId ??= _options.StoreId;

        // 1. Data Gathering
        var snapshot = await _inventory.GetSnapshotAsync(storeId, ct);
        var weather = await _weather.GetForecastAsync(ct: ct);
        var lowStockItems = snapshot.GetLowStockItems(LowStockThreshold).ToList();
        var expiringItems = snapshot.GetExpiringItems(3).ToList();

        // 2. Deterministic Baseline
        var baselineProposals = GenerateBaseline(snapshot, lowStockItems);

        // 3. LLM Refinement
        var adjustments = await GetLlmAdjustmentsAsync(baselineProposals, weather, expiringItems, ct);

        // 4. Application & Validation
        var rejections = new List<string>();
        var finalProposals = ApplyAdjustments(baselineProposals, adjustments, snapshot, rejections);

        // Build assumptions based on what was actually used
        var assumptions = new List<string>
        {
            $"Snapshot taken at {snapshot.AsOf:HH:mm} UTC with {snapshot.Items.Count} items",
            $"Found {lowStockItems.Count} low-stock items (< {LowStockThreshold} units)",
            $"Found {expiringItems.Count} items expiring within 3 days",
            $"Weather: {weather.Summary}"
        };

        if (adjustments.Count > 0)
        {
            assumptions.Add($"LLM suggested {adjustments.Count} adjustments to baseline");
            if (rejections.Count > 0)
            {
                assumptions.Add($"Ignored {rejections.Count} adjustments: {string.Join("; ", rejections)}");
                _log.LogInformation("Rejected {Count} LLM adjustments: {Reasons}", rejections.Count, string.Join(", ", rejections));
            }
        }

        return new Plan(
            Date: DateTime.Today.ToString("yyyy-MM-dd"),
            Assumptions: assumptions,
            Actions: finalProposals,
            QuestionsForManager: [])
        {
            ModelUsed = _options.Models.PlannerModel
        };
    }

    /// <summary>
    /// Generates a deterministic baseline plan based on inventory thresholds and standard reorder quantities.
    /// </summary>
    private List<Proposal> GenerateBaseline(Snapshot snapshot, List<InventoryItem> lowStockItems)
    {
        var proposals = new List<Proposal>();

        foreach (var item in lowStockItems)
        {
            var orderQty = DefaultOrderQty - item.StockLevel;
            if (orderQty <= 0) continue;

            // Supplier price for margin
            var supplierPrice = _supplier.GetSupplierPriceAsync(item.Sku, DateTime.Today).GetAwaiter().GetResult();
            var marginPerUnit = supplierPrice.HasValue ? (item.Price - supplierPrice.Value) : (item.Price * 0.15m);
            var marginDelta = orderQty * marginPerUnit;

            proposals.Add(new Proposal(
                Type: ProposalType.DraftPo,
                Target: new ActionTarget(item.Sku, orderQty),
                ExpectedImpact: new ExpectedImpact(
                    WasteReduction: 0,
                    MarginDelta: marginDelta,
                    StockoutRiskDelta: -0.5),
                Confidence: 1.0,
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

        return proposals;
    }

    /// <summary>
    /// Invokes the LLM to suggest adjustments to the baseline plan based on weather and other context.
    /// </summary>
    private async Task<List<LlmAdjustment>> GetLlmAdjustmentsAsync(
        List<Proposal> baseline,
        WeatherForecast weather,
        List<InventoryItem> expiringItems,
        CancellationToken ct)
    {
        var adjustments = new List<LlmAdjustment>();

        try
        {
            var prompt = BuildRefinementPrompt(baseline, weather, expiringItems);
            var result = await _kernel.InvokePromptAsync(prompt, cancellationToken: ct);
            adjustments = ParseAdjustments(result.ToString());
        }
        catch (Exception ex)
        {
            _log.LogWarning(ex, "LLM refinement failed, using baseline only");
        }

        return adjustments;
    }

    private string BuildRefinementPrompt(
        List<Proposal> baseline,
        WeatherForecast weather,
        List<InventoryItem> expiringItems)
    {
        // Create semantic summaries for the prompt
        var baselineSummary = string.Join("\n", baseline.Select(p => 
            $"  • {p.Target.Sku}: ordering {p.Target.Qty} units (Margin impact: {p.ExpectedImpact.MarginDelta:C})"));
        
        var expiringSummary = expiringItems.Count > 0
            ? string.Join("\n", expiringItems.Select(e => 
                $"  • {e.Sku} ({e.Name}): {e.StockLevel} units, expires in {e.DaysUntilExpiry} days"))
            : "  None";

        return $$"""
            <Context>
            You are a Senior Inventory Analyst for a high-volume convenience store.
            
            Current Weather Forecast:
            {{weather.Summary}}
            Temp: {{weather.TemperatureCelsius}}°C | Rain: {{(weather.RainExpected ? "YES" : "NO")}}
            
            Inventory Alerts (Expiring Soon):
            {{expiringSummary}}
            
            Proposed Baseline Orders (Deterministic Math):
            {{baselineSummary}}
            </Context>
            
            <Goal>
            Optimize the baseline orders to maximize store profitability.
            
            Objectives:
            1. Opportunistic Growth: Identification of demand spikes correlated with weather (e.g., heatwaves -> cold drinks, rain -> umbrellas/comfort food).
            2. Risk Mitigation: Aggressive reduction of orders for items expiring soon to prevent waste.
            3. Margin Protection: Prioritize stock availability for high-margin items.
            </Goal>
            
            <Instruction>
            Review the baseline. It was generated by a simple algorithm and lacks context.
            
            Step 1: In a <thinking> block, analyze the situation step-by-step:
            - Correlate the specific weather details (Temp {{weather.TemperatureCelsius}}, Rain) with likely human behavior. Which specific categories will surge? Which will drop?
            - Cross-reference these surges with the 'Expiring Items' list. Are we ordering more of something that is already about to rot?
            - Critique each baseline proposal. Is the quantity too conservative for a surge? Too risky for a slump?
            
            Step 2: Generate a list of adjustments.
            - Only output adjustments that have strong justification.
            - If the baseline is optimal, output an empty list.
            
            Step 3: Output the adjustments in JSON format.
            </Instruction>
            
            <OutputFormat>
            <thinking>
            [Your deep reasoning here...]
            </thinking>
            <json>
            [
              {"sku": "SKU-001", "delta": 10, "reason": "Heatwave demand surge > 30C"},
              {"sku": "SKU-002", "delta": -5, "reason": "Rain expected, reducing ice cream demand"}
            ]
            </json>
            </OutputFormat>
            """;
    }

    /// <summary>
    /// Constructs weather-based signals and historical correlations for the prompt.
    /// </summary>
    private static string BuildWeatherSignals(WeatherForecast weather)
    {
        var signals = new List<string>();

        if (weather.RainExpected)
        {
            signals.Add("• Rain days: +300-400% demand in 'Outdoor Protection' (umbrellas, raincoats)");
            signals.Add("• Rain days: +50% demand in 'Hot Beverages' and 'Ready Meals'");
            signals.Add("• Rain days: -20% foot traffic overall (fewer impulse purchases)");
        }

        if (weather.TemperatureCelsius > 28)
        {
            signals.Add("• Hot weather (>28°C): +200% demand in 'Cold Beverages'");
            signals.Add("• Hot weather: +100% demand in 'Ice Cream' and 'Frozen goods'");
            signals.Add("• Hot weather: Dairy products expire faster - monitor expiry dates");
        }
        else if (weather.TemperatureCelsius < 10)
        {
            signals.Add("• Cold weather (<10°C): +150% demand in 'Hot Beverages'");
            signals.Add("• Cold weather: +80% demand in 'Ready Meals' and 'Soup'");
        }

        // Always include general correlation
        signals.Add("• Expiring perishables: Historical waste cost = $15/unit average");
        
        return signals.Count > 0 ? string.Join("\n", signals) : "• No significant weather-driven patterns expected";
    }


    private List<LlmAdjustment> ParseAdjustments(string response)
    {
        try
        {
            var jsonStart = response.IndexOf('[');
            var jsonEnd = response.LastIndexOf(']');

            if (jsonStart >= 0 && jsonEnd > jsonStart)
            {
                var json = response.Substring(jsonStart, jsonEnd - jsonStart + 1);
                return JsonSerializer.Deserialize<List<LlmAdjustment>>(json, 
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? [];
            }
        }
        catch { }

        return [];
    }

    /// <summary>
    /// Applies the LLM-suggested adjustments to the baseline plan, validating against the current snapshot and business rules.
    /// </summary>
    private List<Proposal> ApplyAdjustments(
        List<Proposal> baseline,
        List<LlmAdjustment> adjustments,
        Snapshot snapshot,
        List<string> rejections)
    {
        var result = baseline.ToList();
        var adjustmentId = 0;

        foreach (var adj in adjustments)
        {
            adjustmentId++;
            
            // Validate: SKU must exist in snapshot
            var item = snapshot.Items.FirstOrDefault(i => i.Sku == adj.Sku);
            if (item == null)
            {
                rejections.Add($"unknown SKU '{adj.Sku}'");
                _log.LogDebug("Rejected adjustment {Id}: SKU {Sku} not in snapshot", adjustmentId, adj.Sku);
                continue;
            }

            // Validate: delta must be reasonable
            if (Math.Abs(adj.Delta) > MaxAdjustmentDelta)
            {
                rejections.Add($"delta {adj.Delta} too large for {adj.Sku}");
                _log.LogDebug("Rejected adjustment {Id}: delta {Delta} exceeds max {Max}", adjustmentId, adj.Delta, MaxAdjustmentDelta);
                continue;
            }

            var existingIndex = result.FindIndex(p => p.Target.Sku == adj.Sku);

            if (existingIndex >= 0)
            {
                // Modify existing proposal
                var existing = result[existingIndex];
                var newQty = Math.Max(0, existing.Target.Qty + adj.Delta);

                if (newQty == 0)
                {
                    result.RemoveAt(existingIndex);
                    _log.LogInformation("AI adjustment removed order for {Sku} (delta={Delta})", adj.Sku, adj.Delta);
                }
                else
                {
                    // Rebuild with new qty and added evidence (using proper EntityId format)
                    var newEvidence = existing.Evidence.ToList();
                    newEvidence.Add(new Evidence(
                        Source: "AI_Adjustment",
                        Timestamp: DateTime.UtcNow,
                        EntityId: $"adj-{adjustmentId:D2}-{adj.Sku}"));

                    result[existingIndex] = existing with
                    {
                        Target = existing.Target with { Qty = newQty },
                        Confidence = 0.85,
                        Evidence = newEvidence
                    };
                    _log.LogInformation("AI adjustment modified {Sku}: {Old} → {New} ({Reason})", 
                        adj.Sku, existing.Target.Qty, newQty, adj.Reason);
                }
            }
            else if (adj.Delta > 0)
            {
                // Get supplier price for margin calculation
                var supplierPrice = _supplier.GetSupplierPriceAsync(adj.Sku, DateTime.Today).GetAwaiter().GetResult();
                var marginPerUnit = supplierPrice.HasValue ? (item.Price - supplierPrice.Value) : (item.Price * 0.15m);
                
                // Add new proposal from LLM suggestion
                result.Add(new Proposal(
                    Type: ProposalType.DraftPo,
                    Target: new ActionTarget(adj.Sku, adj.Delta),
                    ExpectedImpact: new ExpectedImpact(0, adj.Delta * marginPerUnit, -0.2),
                    Confidence: 0.75,
                    Evidence:
                    [
                        new Evidence(
                            Source: "AI_Suggestion",
                            Timestamp: DateTime.UtcNow,
                            EntityId: $"adj-{adjustmentId:D2}-{adj.Sku}")
                    ],
                    RiskFlags: ["ai_initiated"]
                ));
                _log.LogInformation("AI suggestion added new order for {Sku}: qty={Qty} ({Reason})", 
                    adj.Sku, adj.Delta, adj.Reason);
            }
        }

        return result;
    }

    private record LlmAdjustment(string Sku, int Delta, string? Reason);
}
