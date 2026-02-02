using System.Text.Json;
using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Core.Contracts;

using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Validates plans against defined business policies and strategic guidelines.
/// </summary>
public class PlanCritic
{
    private readonly Kernel _kernel;

    private readonly InventoryService _inventory;
    private readonly StoreMindOptions _options;
    private readonly ILogger<PlanCritic> _log;

    // Policy constants defined in DATA_FORMAT_SPECIFICATION.md
    private const int MaxQtyPerSku = 100;
    private const double MinConfidence = 0.5;
    private const int SafetyStockThreshold = 10;
    private const decimal MaxTotalOrderValue = 50_000m;

    public PlanCritic(
        KernelFactory kernelFactory,
        InventoryService inventory,
        IOptions<StoreMindOptions> options,
        ILogger<PlanCritic> log)
    {
        _inventory = inventory;
        _options = options.Value;
        _log = log;
        
        // Use the Manager kernel for critique (Critic is a manager/reviewer role)
        _kernel = kernelFactory.CreateManagerKernel();
    }

    public async Task<Verdict> CritiqueAsync(Plan plan, CancellationToken ct = default)
    {
        // 1. Deterministic Checks
        var snapshot = await _inventory.GetSnapshotAsync(_options.StoreId, ct);
        var deterministicIssues = RunDeterministicChecks(plan, snapshot);

        // 2. Strategic Review
        var strategicIssues = new List<BlockingIssue>();
        AgentTrace? criticTrace = null;
        
        if (deterministicIssues.Count == 0)
        {
            (strategicIssues, criticTrace) = await RunStrategicReviewAsync(plan, ct);
        }

        var allIssues = deterministicIssues.Concat(strategicIssues).ToList();
        var approved = allIssues.Count == 0;

        return new Verdict(
            Outcome: approved ? VerdictType.Approve : VerdictType.Revise,
            BlockingIssues: allIssues,
            Suggestions: [])
        {
            ModelUsed = _options.Models.ManagerModelId,
            ReasoningTrace = criticTrace
        };
    }

    /// <summary>
    /// Enforces deterministic business policies including quantity limits, confidence thresholds, and safety stock.
    /// </summary>
    private List<BlockingIssue> RunDeterministicChecks(Plan plan, Snapshot snapshot)
    {
        var issues = new List<BlockingIssue>();
        decimal totalOrderValue = 0;

        for (var i = 0; i < plan.Actions.Count; i++)
        {
            var action = plan.Actions[i];
            var item = snapshot.Items.FirstOrDefault(x => x.Sku == action.Target.Sku);
            var unitPrice = item?.Price ?? 10m; // Fallback price for calculation

            // Policy 1: Max order quantity per SKU
            if (action.Target.Qty > MaxQtyPerSku)
            {
                issues.Add(new BlockingIssue(i, 
                    $"Order quantity {action.Target.Qty} exceeds max {MaxQtyPerSku}", 
                    "max_qty"));
            }

            // Policy 2: Minimum confidence threshold
            if (action.Confidence < MinConfidence)
            {
                issues.Add(new BlockingIssue(i, 
                    $"Confidence {action.Confidence:P0} below {MinConfidence:P0} threshold", 
                    "min_confidence"));
            }

            // Policy 3: Safety stock after execution (for DraftMarkdown/discounts)
            if (action.Type == ProposalType.Markdown && item != null)
            {
                var expectedSales = action.Target.Qty; // Markdown expected to sell this many
                var remainingStock = item.StockLevel - expectedSales;
                if (remainingStock < SafetyStockThreshold)
                {
                    issues.Add(new BlockingIssue(i,
                        $"Markdown would leave only {remainingStock} units (safety: {SafetyStockThreshold})",
                        "safety_stock"));
                }
            }

            // Policy 4: Evidence required
            if (action.Evidence == null || action.Evidence.Count == 0)
            {
                issues.Add(new BlockingIssue(i, "Missing evidence pointer", "evidence_required"));
            }

            // Accumulate for Policy 5
            totalOrderValue += action.Target.Qty * unitPrice;
        }

        // Policy 5: Total order value cap
        if (totalOrderValue > MaxTotalOrderValue)
        {
            issues.Add(new BlockingIssue(-1, // -1 = global issue
                $"Total order value {totalOrderValue:C} exceeds {MaxTotalOrderValue:C} limit",
                "budget_limit"));
        }

        return issues;
    }

    /// <summary>
    /// Performs a strategic review using an LLM to identify risks that deterministic rules might miss.
    /// </summary>
    private async Task<(List<BlockingIssue> Issues, AgentTrace? Trace)> RunStrategicReviewAsync(Plan plan, CancellationToken ct)
    {
        var issues = new List<BlockingIssue>();
        var startTime = DateTimeOffset.UtcNow;
        var sw = System.Diagnostics.Stopwatch.StartNew();
        
        string rawResponse = "";
        string? thinkingContent = null;

        try
        {
            var actionSummary = string.Join("\n", plan.Actions.Select((a, i) => 
                $"  {i}. [{a.Type}] {a.Target.Sku}: {a.Target.Qty} units (confidence: {a.Confidence:P0})"));

            var prompt = $$"""
                <Context>
                A plan has passed all deterministic policy checks (quantity limits, confidence thresholds, 
                safety stock, evidence requirements, total value caps). Your role is strategic review only.
                
                Plan Actions:
                {{actionSummary}}
                
                Total actions: {{plan.Actions.Count}}
                </Context>
                
                <Goal>
                Identify strategic risks that deterministic code cannot detect:
                - Logical conflicts (ordering AND discounting same SKU simultaneously)  
                - Suspicious patterns (unusually large perishable orders)
                - Internal inconsistencies (actions that contradict each other)
                
                Do NOT flag issues that are covered by policy checks (quantity >100, confidence <0.5, etc.)
                </Goal>
                
                <Reasoning>
                Think about whether the plan makes strategic sense as a whole.
                Consider: Would a human manager question any of these decisions?
                Write your thinking in a <thinking> block first.
                </Reasoning>
                
                <Output>
                After thinking, output ONLY JSON:
                {"issues": [{"action_index": 0, "reason": "brief explanation", "severity": "warning"}]}
                
                If no strategic issues: {"issues": []}
                </Output>
                """;

            var result = await _kernel.InvokePromptAsync(prompt, cancellationToken: ct);
            rawResponse = result.ToString();
            
            // extract thinking content
            var thinkStart = rawResponse.IndexOf("<thinking>");
            var thinkEnd = rawResponse.IndexOf("</thinking>");
            if (thinkStart >= 0 && thinkEnd > thinkStart)
            {
                thinkingContent = rawResponse.Substring(thinkStart + 10, thinkEnd - (thinkStart + 10)).Trim();
            }

            var jsonStart = rawResponse.IndexOf('{');
            var jsonEnd = rawResponse.LastIndexOf('}');
            if (jsonStart >= 0 && jsonEnd > jsonStart)
            {
                var json = rawResponse.Substring(jsonStart, jsonEnd - jsonStart + 1);
                var parsed = JsonSerializer.Deserialize<StrategicResponse>(json,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (parsed?.Issues != null)
                {
                    foreach (var issue in parsed.Issues.Where(i => i.Severity != "warning"))
                    {
                        issues.Add(new BlockingIssue(
                            issue.ActionIndex,
                            issue.Reason ?? "Strategic concern",
                            "strategic_review"));
                    }
                }
            }
        }
        catch (Exception ex)
        {
            // Strategic review failed - log for traceability but not blocking
            _log.LogWarning(ex, "Strategic LLM review failed, skipping fuzzy checks");
            rawResponse = $"Error: {ex.Message}";
        }

        sw.Stop();
        
        var trace = new AgentTrace(
            AgentName: "CriticLLM",
            Role: "Manager",
            Content: rawResponse,
            Timestamp: startTime)
        {
            ModelUsed = _options.Models.ManagerModelId,
            ThinkingContent = thinkingContent,
            LatencyMs = sw.ElapsedMilliseconds
        };

        return (issues, trace);
    }

    private record StrategicResponse(List<StrategicIssue>? Issues);
    private record StrategicIssue(int ActionIndex, string? Reason, string? Severity);
}
