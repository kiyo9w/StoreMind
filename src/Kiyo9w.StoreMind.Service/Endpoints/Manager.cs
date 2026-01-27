using System.Diagnostics;
using System.Text.Json;
using System.Text.Json.Serialization;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service.Endpoints;

public static class Manager
{
    public static void MapManagerEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/manager").WithTags("Tier2-Manager");

        group.MapGet("/plans", HandleListPlans)
             .WithName("ListPlans")
             .WithOpenApi();

        group.MapGet("/plans/{date}", HandleGetPlan)
             .WithName("GetPlan")
             .WithOpenApi();

        group.MapPost("/explain", HandleExplain)
             .WithName("ExplainDecision")
             .WithOpenApi();

        group.MapPost("/plans/{date}/approve", HandleApprovePlan)
             .WithName("ApprovePlan")
             .WithOpenApi();

        group.MapPost("/plans/{date}/actions/{actionId}/revise", HandleReviseAction)
             .WithName("ReviseAction")
             .WithOpenApi();

        group.MapPost("/plans/{date}/actions/{actionId}/reject", HandleRejectAction)
             .WithName("RejectAction")
             .WithOpenApi();

        group.MapPost("/chat", HandleChat)
             .WithName("ManagerChat")
             .WithOpenApi();
    }

    private static IResult HandleListPlans([FromServices] PlanStore store)
    {
        var dates = store.ListPlanDates().ToList();
        return Results.Ok(new { plans = dates, count = dates.Count });
    }

    private static async Task<IResult> HandleGetPlan(string date, [FromServices] PlanStore store)
    {
        var result = await store.LoadAsync(date);
        if (result == null)
            return Results.NotFound(new { message = $"No plan found for {date}" });

        return Results.Ok(new
        {
            plan = result.Value.Plan,
            verdict = result.Value.Verdict
        });
    }

    private static async Task<IResult> HandleExplain(
        [FromBody] Explain request,
        [FromServices] Kernel kernel,
        [FromServices] PlanStore store)
    {
        var sw = Stopwatch.StartNew();

        // load the plan if specified
        string planContext = "";
        if (!string.IsNullOrEmpty(request.PlanId))
        {
            // extract date from plan ID (format: plan-yyyyMMdd-xxx)
            var datePart = request.PlanId.Length >= 13
                ? request.PlanId.Substring(5, 8)
                : DateTime.Today.ToString("yyyyMMdd");

            var dateFormatted = $"{datePart[..4]}-{datePart[4..6]}-{datePart[6..8]}";
            var planData = await store.LoadAsync(dateFormatted);

            if (planData != null)
            {
                planContext = JsonSerializer.Serialize(new
                {
                    plan = planData.Value.Plan,
                    verdict = planData.Value.Verdict
                });
            }
        }

        var prompt = $"""
            You are a store operations assistant explaining decisions to the manager.
            
            {(string.IsNullOrEmpty(planContext) ? "" : $"<PlanContext>{planContext}</PlanContext>")}
            
            Question: {request.Question}
            
            Explain clearly and concisely why this decision was made, citing evidence from the plan if available.
            """;

        var result = await kernel.InvokePromptAsync(prompt);
        var content = result.ToString();

        return Results.Ok(new Explanation(content, request.Question, request.PlanId, sw.ElapsedMilliseconds));
    }

    private static async Task<IResult> HandleApprovePlan(
        string date,
        [FromBody] Approval approval,
        [FromServices] PlanStore store)
    {
        var result = await store.LoadAsync(date);
        if (result == null)
            return Results.NotFound(new { message = $"No plan found for {date}" });

        // for demo: just return success (in production would update the file)
        return Results.Ok(new ApprovalResult(
            Success: true,
            Message: $"Plan for {date} approved by {approval.ApprovedBy}",
            PlanId: result.Value.Plan.PlanId,
            ActionId: "all",
            ApprovedBy: approval.ApprovedBy
        ));
    }

    private static async Task<IResult> HandleReviseAction(
        string date,
        string actionId,
        [FromBody] ReviseRequest request,
        [FromServices] PlanStore store,
        [FromServices] PlanCritic critic)
    {
        var result = await store.LoadAsync(date);
        if (result == null)
            return Results.NotFound(new { message = $"No plan found for {date}" });

        var (plan, _) = result.Value;

        // find the action
        var actionIndex = plan.Actions.ToList().FindIndex(a => a.Id == actionId);
        if (actionIndex < 0)
            return Results.NotFound(new ReviseResult(false, null, null, $"Action {actionId} not found"));

        var oldAction = plan.Actions[actionIndex];

        // create updated action with new quantity
        var newTarget = oldAction.Target with { Qty = request.NewQuantity };
        var newAction = oldAction with { Target = newTarget };

        // rebuild actions list with the updated action
        var updatedActions = plan.Actions.ToList();
        updatedActions[actionIndex] = newAction;

        // create updated plan
        var updatedPlan = plan with { Actions = updatedActions };

        // re-run critic
        var verdict = await critic.CritiqueAsync(updatedPlan);

        // save updated plan
        await store.SaveAsync(updatedPlan, verdict);

        return Results.Ok(new ReviseResult(true, newAction, verdict, null));
    }

    private static async Task<IResult> HandleRejectAction(
        string date,
        string actionId,
        [FromBody] RejectRequest request,
        [FromServices] PlanStore store)
    {
        var result = await store.LoadAsync(date);
        if (result == null)
            return Results.NotFound(new { message = $"No plan found for {date}" });

        var (plan, verdict) = result.Value;

        // find the action
        var actionIndex = plan.Actions.ToList().FindIndex(a => a.Id == actionId);
        if (actionIndex < 0)
            return Results.NotFound(new RejectResult(false, actionId, $"Action {actionId} not found"));

        var oldAction = plan.Actions[actionIndex];

        // update action state to rejected
        var rejectedAction = oldAction with
        {
            ApprovalState = ApprovalState.Rejected,
            RejectedBy = request.RejectedBy,
            RejectionReason = request.Reason
        };

        // rebuild actions list
        var updatedActions = plan.Actions.ToList();
        updatedActions[actionIndex] = rejectedAction;

        // create updated plan and save
        var updatedPlan = plan with { Actions = updatedActions };
        await store.SaveAsync(updatedPlan, verdict);

        return Results.Ok(new RejectResult(true, actionId, null));
    }

    private static async Task<IResult> HandleChat(
        [FromBody] ManagerChatRequest request,
        [FromServices] Kernel kernel,
        [FromServices] PlanStore store,
        [FromServices] PlanCritic critic)
    {


        var result = await store.LoadAsync(request.PlanDate);
        if (result == null)
            return Results.NotFound(new { message = $"No plan found for {request.PlanDate}" });

        var (plan, _) = result.Value;

        // build context for LLM
        var actionsJson = JsonSerializer.Serialize(plan.Actions.Select((a, i) => new
        {
            index = i + 1,
            id = a.Id,
            sku = a.Target.Sku,
            qty = a.Target.Qty,
            type = a.Type.ToString()
        }));

        var prompt = $$"""
            You are a store manager assistant. The manager wants to modify the plan.
            
            <CurrentActions>
            {{actionsJson}}
            </CurrentActions>
            
            <ManagerMessage>
            {{request.Message}}
            </ManagerMessage>
            
            Analyze the manager's message. If they want to change a quantity:
            1. Identify which action (by index number or SKU)
            2. Determine the new quantity
            
            Respond with JSON: {"action_id": "xxx", "new_qty": 10, "reply": "I've updated..."}
            If no revision needed, respond with: {"action_id": null, "new_qty": null, "reply": "your response"}
            """;

        var llmResult = await kernel.InvokePromptAsync(prompt);
        var responseText = llmResult.ToString();

        // parse LLM response
        string? actionModified = null;
        Plan? updatedPlan = null;
        string reply = responseText;

        try
        {
            var jsonStart = responseText.IndexOf('{');
            var jsonEnd = responseText.LastIndexOf('}');
            if (jsonStart >= 0 && jsonEnd > jsonStart)
            {
                var json = responseText.Substring(jsonStart, jsonEnd - jsonStart + 1);
                var parsed = JsonSerializer.Deserialize<ChatParseResult>(json);

                if (parsed?.ActionId != null && parsed.NewQty.HasValue)
                {
                    // find action by ID or by index
                    // find action by ID or by index
                    var actions = plan.Actions.ToList();
                    var actionIndex = actions.FindIndex(a =>
                        a.Id == parsed.ActionId ||
                        actions.IndexOf(a) + 1 == int.Parse(parsed.ActionId.Replace("#", "")));

                    if (actionIndex >= 0)
                    {
                        var oldAction = plan.Actions[actionIndex];
                        var newTarget = oldAction.Target with { Qty = parsed.NewQty.Value };
                        var newAction = oldAction with { Target = newTarget };

                        var updatedActions = plan.Actions.ToList();
                        updatedActions[actionIndex] = newAction;
                        updatedPlan = plan with { Actions = updatedActions };

                        var verdict = await critic.CritiqueAsync(updatedPlan);
                        await store.SaveAsync(updatedPlan, verdict);

                        actionModified = oldAction.Id;
                    }
                }
                reply = parsed?.Reply ?? responseText;
            }
        }
        catch
        {
            // parsing failed, just return the raw reply
        }

        return Results.Ok(new ManagerChatResponse(reply, updatedPlan, actionModified));
    }

    private record ChatParseResult(
        [property: JsonPropertyName("action_id")] string? ActionId,
        [property: JsonPropertyName("new_qty")] decimal? NewQty,
        [property: JsonPropertyName("reply")] string? Reply);
}
