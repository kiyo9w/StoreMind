using System.ComponentModel;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Service.Services;
using Microsoft.SemanticKernel;
using System.Text.Json;

namespace Kiyo9w.StoreMind.Service.Plugins;

/// <summary>
/// Exposes planning and critique capabilities as AI tools.
/// </summary>
public class PlanningPlugin
{
    private readonly PlanCritic _critic;
    private readonly PlanStore _store;

    public PlanningPlugin(PlanCritic critic, PlanStore store)
    {
        _critic = critic;
        _store = store;
    }

    [KernelFunction]
    [Description("Gets the current day's replenishment plan. Plans are generated nightly by the background scheduler.")]
    public async Task<string> GetCurrentPlan(
        [Description("Plan date (YYYY-MM-DD), defaults to today")] string? date = null)
    {
        date ??= DateTime.Today.ToString("yyyy-MM-dd");
        var result = await _store.LoadAsync(date);
        
        if (result == null)
            return $"No plan found for {date}. Plans are generated nightly by the background scheduler.";
        
        var plan = result.Value.Plan;
        return JsonSerializer.Serialize(new 
        { 
            plan.Date, 
            ActionCount = plan.Actions.Count, 
            plan.Assumptions,
            Actions = plan.Actions.Select(a => new { a.Id, a.Target.Sku, a.Target.Qty, a.Type })
        });
    }

    [KernelFunction]
    [Description("Updates the quantity of a specific action in a plan.")]
    public async Task<string> UpdateAction(
        [Description("Plan Date (YYYY-MM-DD)")] string date,
        [Description("Action ID (e.g. 'act-01' or just '1' for index)")] string actionId,
        [Description("New Quantity")] int newQty)
    {
        var result = await _store.LoadAsync(date);
        if (result == null) return $"Error: No plan found for {date}";

        var (plan, _) = result.Value;
        var actions = plan.Actions.ToList();
        
        // Find action by ID or Index
        var index = actions.FindIndex(a => a.Id == actionId);
        if (index < 0 && int.TryParse(actionId, out var idx)) index = idx - 1; // Try 1-based index
        
        if (index < 0 || index >= actions.Count) return $"Error: Action {actionId} not found";

        var oldAction = actions[index];
        var newAction = oldAction with { Target = oldAction.Target with { Qty = newQty } };
        actions[index] = newAction;

        var updatedPlan = plan with { Actions = actions };
        var verdict = await _critic.CritiqueAsync(updatedPlan);
        await _store.SaveAsync(updatedPlan, verdict);

        return $"Updated Action {actionId} ({oldAction.Target.Sku}) to {newQty} units. Verdict: {verdict.Outcome}";
    }

    [KernelFunction]
    [Description("Is called when the user aproves the plan")]
    public async Task<string> ApprovePlan([Description("Plan Date (YYYY-MM-DD)")] string date)
    {
         var result = await _store.LoadAsync(date);
        if (result == null) return $"Error: No plan found for {date}";

        var (plan, verdict) = result.Value;

        // Update all actions to Approved state
        var approvedActions = plan.Actions
            .Select(a => a with { ApprovalState = ApprovalState.Approved })
            .ToList();

        var updatedPlan = plan with { Actions = approvedActions };
        await _store.SaveAsync(updatedPlan, verdict);
        return "Plan approved";
    }

    [KernelFunction]
    [Description("Validates and critiques a plan against business policies.")]
    public async Task<string> CritiquePlan(
        [Description("The plan object in JSON format")] string planJson)
    {
        try 
        {
            var plan = JsonSerializer.Deserialize<Plan>(planJson);
            if (plan == null) return "Error: Invalid plan JSON";
            
            var verdict = await _critic.CritiqueAsync(plan);
            return JsonSerializer.Serialize(verdict);
        }
        catch (Exception ex)
        {
            return $"Error critiquing plan: {ex.Message}";
        }
    }
}
