using System.Text.Json;
using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Core.Contracts;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// validates plans against store policies using GPT
/// </summary>
public class PlanCritic
{
    private readonly Kernel _kernel;
    private readonly ILogger<PlanCritic> _log;
    private readonly StoreMindOptions _options;

    public PlanCritic(Kernel kernel, IOptions<StoreMindOptions> options, ILogger<PlanCritic> log)
    {
        _kernel = kernel;
        _options = options.Value;
        _log = log;
    }

    public async Task<Verdict> CritiqueAsync(Plan plan, CancellationToken ct = default)
    {
        _log.LogInformation("Critiquing plan {PlanId} with {Actions} actions", plan.PlanId, plan.Actions.Count);

        var prompt = BuildCriticPrompt(plan);
        var result = await _kernel.InvokePromptAsync(prompt, cancellationToken: ct);
        var responseText = result.ToString();

        // parse the response
        var verdict = ParseVerdict(responseText, plan);

        _log.LogInformation("Verdict: {Outcome} with {Issues} blocking issues",
            verdict.Outcome, verdict.BlockingIssues.Count);

        return verdict;
    }

    private string BuildCriticPrompt(Plan plan)
    {
        var planJson = JsonSerializer.Serialize(plan, new JsonSerializerOptions { WriteIndented = true });

        return $$"""
            <Background>
            You are a risk compliance officer reviewing an overnight inventory plan.
            Your job is to check for policy violations and flag issues.
            </Background>

            <Policies>
            1. Max order quantity per SKU: 100 units
            2. Minimum confidence threshold: 0.5
            3. Safety stock must stay above 5 units after execution
            4. All actions must have at least one evidence pointer
            5. Total order value should not exceed 50,000 per plan
            </Policies>

            <Plan>
            {{planJson}}
            </Plan>

            <Instructions>
            Review the plan against the policies above.
            For each violation found, note the action index and reason.
            
            Respond with JSON in this format:
            {"approved": true, "issues": []}
            or
            {"approved": false, "issues": [{"action_index": 0, "reason": "...", "policy": "max_qty"}]}
            
            If no violations, set approved=true and issues=[]
            </Instructions>
            """;
    }

    private Verdict ParseVerdict(string response, Plan plan)
    {
        var blockingIssues = new List<BlockingIssue>();
        var approved = true;

        try
        {
            var jsonStart = response.IndexOf('{');
            var jsonEnd = response.LastIndexOf('}');

            if (jsonStart >= 0 && jsonEnd > jsonStart)
            {
                var json = response.Substring(jsonStart, jsonEnd - jsonStart + 1);
                var parsed = JsonSerializer.Deserialize<CriticResponse>(json);

                if (parsed != null)
                {
                    approved = parsed.Approved;
                    if (parsed.Issues != null)
                    {
                        foreach (var issue in parsed.Issues)
                        {
                            blockingIssues.Add(new BlockingIssue(
                                ActionIndex: issue.ActionIndex,
                                Reason: issue.Reason ?? "Unknown violation",
                                PolicyRef: issue.Policy));
                        }
                    }
                }
            }
        }
        catch (JsonException ex)
        {
            _log.LogWarning(ex, "Failed to parse critic response, running deterministic checks");
        }

        // always run deterministic policy checks regardless of LLM response
        var deterministicIssues = RunDeterministicChecks(plan);
        blockingIssues.AddRange(deterministicIssues);

        if (blockingIssues.Count > 0)
            approved = false;

        return new Verdict(
            Outcome: approved ? VerdictType.Approve : VerdictType.Revise,
            BlockingIssues: blockingIssues,
            SuggestedPatch: [])
        {
            ModelUsed = _options.Models.CriticModel
        };
    }

    private List<BlockingIssue> RunDeterministicChecks(Plan plan)
    {
        var issues = new List<BlockingIssue>();

        for (var i = 0; i < plan.Actions.Count; i++)
        {
            var action = plan.Actions[i];

            // check max quantity
            if (action.Target.Qty > 100)
            {
                issues.Add(new BlockingIssue(i, $"Order quantity {action.Target.Qty} exceeds max 100", "max_qty"));
            }

            // check confidence threshold
            if (action.Confidence < 0.5)
            {
                issues.Add(new BlockingIssue(i, $"Confidence {action.Confidence:P0} below 50% threshold", "min_confidence"));
            }

            // check evidence exists
            if (action.Evidence == null || action.Evidence.Count == 0)
            {
                issues.Add(new BlockingIssue(i, "Missing evidence pointer", "evidence_required"));
            }
        }

        return issues;
    }

    private record CriticResponse(bool Approved, List<CriticIssue>? Issues);
    private record CriticIssue(int ActionIndex, string? Reason, string? Policy);
}
