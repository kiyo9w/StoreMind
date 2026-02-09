using System.Diagnostics;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Service.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;

namespace Kiyo9w.StoreMind.Service.Endpoints;

public static class Manager
{
    public static void MapManagerEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/manager").WithTags("Manager");

        group.MapGet("/plans", HandleListPlans)
             .WithName("ListPlans");

        group.MapGet("/plans/{date}", HandleGetPlan)
             .WithName("GetPlan");

        group.MapPost("/explain", HandleExplain)
             .WithName("ExplainDecision");

        group.MapPost("/plans/{date}/approve", HandleApprovePlan)
             .WithName("ApprovePlan");

        group.MapPost("/plans/{date}/actions/{actionId}/revise", HandleReviseAction)
             .WithName("ReviseAction");

        group.MapPost("/plans/{date}/actions/{actionId}/reject", HandleRejectAction)
             .WithName("RejectAction");

        group.MapPost("/chat", HandleChat)
             .WithName("ManagerChat");

        group.MapPost("/run-planning", HandleRunPlanning)
             .WithName("RunPlanning");

        group.MapGet("/scheduler", HandleGetSchedule)
             .WithName("GetSchedule");

        group.MapPost("/scheduler", HandleSetSchedule)
             .WithName("SetSchedule");
    }

    private static Ok<PlanListResponse> HandleListPlans([FromServices] PlanStore store)
    {
        var dates = store.ListPlanDates().ToList();
        return TypedResults.Ok(new PlanListResponse(dates, dates.Count));
    }

    private static async Task<Results<Ok<PlanDetailResponse>, NotFound<object>>> HandleGetPlan(
        string date, 
        [FromServices] PlanStore store)
    {
        var result = await store.LoadAsync(date);
        if (result == null)
            return TypedResults.NotFound((object)new { message = $"No plan found for {date}" });

        return TypedResults.Ok(new PlanDetailResponse(
            Plan: result.Value.Plan,
            Verdict: result.Value.Verdict
        ));
    }

    private static async Task<Ok<Explanation>> HandleExplain(
        [FromBody] Explain request,
        [FromServices] Kernel kernel,
        [FromServices] PlanStore store,
        [FromServices] InventoryService inventory,
        [FromServices] SupplierService supplier)
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
                // Enrich context with Supplier Prices and Sales Velocity
                var allSales = SeedDataLoader.Data.SalesPerformance; 
                var allPrices = SeedDataLoader.Data.SupplierPrices;

                planContext = JsonSerializer.Serialize(new
                {
                    plan = planData.Value.Plan,
                    verdict = planData.Value.Verdict,
                    sales_context = allSales,
                    supplier_prices = allPrices
                });
            }
        }

        var prompt = $"""
            You are a store operations assistant explaining decisions to the manager.
            
            {(string.IsNullOrEmpty(planContext) ? "" : $"<PlanContext>{planContext}</PlanContext>")}
            
            Question: {request.Question}
            
            Explain clearly and concisely why this decision was made, citing evidence from the plan if available.
            If the user asks about facts (prices, sales history) present in the context, answer them directly.
            """;

        var result = await kernel.InvokePromptAsync(prompt);
        var content = result.ToString();

        return TypedResults.Ok(new Explanation(content, request.Question, request.PlanId, sw.ElapsedMilliseconds));
    }

    private static async Task<Results<Ok<ApprovalResult>, NotFound<object>>> HandleApprovePlan(
        string date,
        [FromBody] Approval approval,
        [FromServices] PlanStore store)
    {
        var result = await store.LoadAsync(date);
        if (result == null)
            return TypedResults.NotFound((object)new { message = $"No plan found for {date}" });

        var (plan, verdict) = result.Value;

        // Update all actions to Approved state
        var approvedActions = plan.Actions
            .Select(a => a with { ApprovalState = ApprovalState.Approved })
            .ToList();

        var updatedPlan = plan with { Actions = approvedActions };
        await store.SaveAsync(updatedPlan, verdict);

        return TypedResults.Ok(new ApprovalResult(
            Success: true,
            Message: $"Plan for {date} approved by {approval.ApprovedBy} ({approvedActions.Count} actions)",
            PlanId: updatedPlan.PlanId,
            ActionId: "all",
            ApprovedBy: approval.ApprovedBy
        ));
    }

    private static async Task<Results<Ok<ReviseResult>, NotFound<object>, NotFound<ReviseResult>>> HandleReviseAction(
        string date,
        string actionId,
        [FromBody] ReviseRequest request,
        [FromServices] PlanStore store,
        [FromServices] PlanCritic critic)
    {
        var result = await store.LoadAsync(date);
        if (result == null)
            return TypedResults.NotFound((object)new { message = $"No plan found for {date}" });

        var (plan, _) = result.Value;

        // find the action
        var actionIndex = plan.Actions.ToList().FindIndex(a => a.Id == actionId);
        if (actionIndex < 0)
            return TypedResults.NotFound(new ReviseResult(false, null, null, $"Action {actionId} not found"));

        var oldAction = plan.Actions[actionIndex];

        // create updated action with new quantity
        var newTarget = oldAction.Target with { Qty = request.NewQuantity };
        var newAction = oldAction with { Target = newTarget };

        // rebuild actions list with updated action
        var updatedActions = plan.Actions.ToList();
        updatedActions[actionIndex] = newAction;

        // create updated plan
        var updatedPlan = plan with { Actions = updatedActions };

        // re-run critic
        var verdict = await critic.CritiqueAsync(updatedPlan);

        // save updated plan
        await store.SaveAsync(updatedPlan, verdict);

        return TypedResults.Ok(new ReviseResult(true, newAction, verdict, null));
    }

    private static async Task<Results<Ok<RejectResult>, NotFound<object>, NotFound<RejectResult>>> HandleRejectAction(
        string date,
        string actionId,
        [FromBody] RejectRequest request,
        [FromServices] PlanStore store)
    {
        var result = await store.LoadAsync(date);
        if (result == null)
            return TypedResults.NotFound((object)new { message = $"No plan found for {date}" });

        var (plan, verdict) = result.Value;

        // find the action
        var actionIndex = plan.Actions.ToList().FindIndex(a => a.Id == actionId);
        if (actionIndex < 0)
            return TypedResults.NotFound(new RejectResult(false, actionId, $"Action {actionId} not found"));

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

        return TypedResults.Ok(new RejectResult(true, actionId, null));
    }

    private record ChatParseResult(
        [property: JsonPropertyName("action_id")] string? ActionId,
        [property: JsonPropertyName("new_qty")] decimal? NewQty,
        [property: JsonPropertyName("reply")] string? Reply);

    /// <summary>
    /// SSE streaming chat - emits token-by-token agent events in real-time
    /// </summary>
    private static async Task HandleChat(
        HttpContext httpContext,
        [FromBody] ManagerChatRequest request,
        [FromServices] PlanStore store,
        [FromServices] AgentOrchestrator orchestrator,
        CancellationToken ct)
    {
        // set SSE headers
        httpContext.Response.ContentType = "text/event-stream";
        httpContext.Response.Headers.CacheControl = "no-cache";
        httpContext.Response.Headers.Connection = "keep-alive";

        var jsonOptions = new JsonSerializerOptions 
        { 
            PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower 
        };

        // helper to write SSE event
        async Task WriteEvent(string eventType, object data)
        {
            var json = JsonSerializer.Serialize(data, jsonOptions);
            var eventData = $"event: {eventType}\ndata: {json}\n\n";
            await httpContext.Response.WriteAsync(eventData, ct);
            await httpContext.Response.Body.FlushAsync(ct);
        }

        // load plan for context
        var result = await store.LoadAsync(request.PlanDate);
        if (result == null)
        {
            await WriteEvent(StreamEventType.Error, new ErrorData($"No plan found for {request.PlanDate}"));
            await WriteEvent(StreamEventType.StreamEnd, new StreamEndData(
                "No plan found.", null, null, new AgentConversation()));
            return;
        }

        var (plan, _) = result.Value;
        var sessionId = $"chat-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}"[..32];

        // emit begin-stream
        await WriteEvent(StreamEventType.BeginStream, new BeginStreamData(sessionId, request.PlanDate));

        // build context for agents
        var actionsJson = JsonSerializer.Serialize(plan.Actions.Select((a, i) => new
        {
            index = i + 1,
            id = a.Id,
            sku = a.Target.Sku,
            qty = a.Target.Qty,
            type = a.Type.ToString()
        }));
        var context = $"User: Manager\n\nPlan Date: {request.PlanDate}. Current Actions: {actionsJson}";

        // track conversation from agent-end events
        var conversation = new AgentConversation();
        string? lastOrchestratorContent = null;
        string? lastSpecialistContent = null;

        try
        {
            // Stream token-by-token using ProcessStreamingAsync
            await foreach (var evt in orchestrator.ProcessStreamingAsync(request.Message, context, ct))
            {
                // Forward all events to SSE
                await WriteEvent(evt.EventType, evt.Data);

                // Build traces from agent-end events for conversation tracking
                if (evt.EventType == StreamEventType.AgentEnd && evt.Data is AgentEndData end)
                {
                    conversation.AddTrace(new AgentTrace(
                        end.AgentName, end.Role, end.FullContent, DateTimeOffset.UtcNow)
                    {
                        ThinkingContent = end.ThinkingContent,
                        LatencyMs = end.LatencyMs
                    });

                    // Track orchestrator's final response
                    if (end.AgentName == "Orchestrator")
                    {
                        lastOrchestratorContent = end.FullContent;
                    }
                    // Track specialist responses (Stocker/Planner) for fallback
                    else if (end.AgentName == "Stocker" || end.AgentName == "Planner")
                    {
                        lastSpecialistContent = end.FullContent;
                    }
                }
            }
        }
        catch (Exception ex)
        {
            await WriteEvent(StreamEventType.Error, new ErrorData(ex.Message));
            conversation.AddTrace(new AgentTrace(
                AgentName: "System",
                Role: "Error",
                Content: ex.Message,
                Timestamp: DateTimeOffset.UtcNow));
        }

        conversation.Complete();

        // ──────────────────────────────────────────────────────────
        // Extract the best final response for the user
        // ──────────────────────────────────────────────────────────
        var finalResponse = AgentOrchestrator.StripInternalTags(lastOrchestratorContent ?? "").Trim();

        // Prefer specialist's actual answer when orchestrator was just coordinating
        if (AgentOrchestrator.IsJustDelegation(finalResponse) && !string.IsNullOrEmpty(lastSpecialistContent))
        {
            finalResponse = AgentOrchestrator.StripInternalTags(lastSpecialistContent).Trim();
        }

        // reload plan to check for modifications
        var freshResult = await store.LoadAsync(request.PlanDate);
        var updatedPlan = freshResult?.Plan ?? plan;

        // detect modified action
        string? actionModified = null;
        foreach (var original in plan.Actions)
        {
            var updated = updatedPlan.Actions.FirstOrDefault(a => a.Id == original.Id);
            if (updated != null && updated.Target.Qty != original.Target.Qty)
            {
                actionModified = original.Id;
                break;
            }
        }

        // emit stream-end with final data
        await WriteEvent(StreamEventType.StreamEnd, new StreamEndData(
            finalResponse,
            updatedPlan,
            actionModified,
            conversation));
    }

    // manually trigger planning
    private static async Task<Ok<PlanRunResponse>> HandleRunPlanning(
        [FromServices] OvernightPlanner planner,
        [FromServices] PlanCritic critic,
        [FromServices] PlanStore store)
    {
        Plan? finalPlan = null;
        
        // Run planning and get final plan
        await foreach (var progress in planner.GeneratePlanAsync())
        {
            if (progress.FinalPlan != null)
                finalPlan = progress.FinalPlan;
        }

        if (finalPlan == null)
        {
            return TypedResults.Ok(new PlanRunResponse(
                Plan: null,
                Verdict: null,
                Message: "Planning failed to produce a plan"
            ));
        }

        var verdict = await critic.CritiqueAsync(finalPlan);
        await store.SaveAsync(finalPlan, verdict);

        return TypedResults.Ok(new PlanRunResponse(
            Plan: finalPlan,
            Verdict: verdict,
            Message: verdict.IsApproved
                ? "Plan approved and saved"
                : $"Plan has {verdict.BlockingIssues.Count} issues, saved for review"
        ));
    }

    /// <summary>
    /// Get current scheduler configuration
    /// </summary>
    private static Ok<ScheduleInfo> HandleGetSchedule(
        [FromServices] BackgroundPlanningService scheduler)
    {
        var (time, enabled, nextRun) = scheduler.GetScheduleInfo();
        return TypedResults.Ok(new ScheduleInfo(
            time.ToString("HH:mm"), 
            enabled, 
            nextRun?.ToString("yyyy-MM-dd HH:mm")));
    }

    /// <summary>
    /// Update scheduler configuration
    /// </summary>
    private static Ok<ScheduleInfo> HandleSetSchedule(
        [FromBody] ScheduleRequest request,
        [FromServices] BackgroundPlanningService scheduler)
    {
        var time = TimeOnly.Parse(request.Time);
        scheduler.SetSchedule(time, request.Enabled);
        var (_, enabled, nextRun) = scheduler.GetScheduleInfo();
        return TypedResults.Ok(new ScheduleInfo(
            time.ToString("HH:mm"), 
            enabled, 
            nextRun?.ToString("yyyy-MM-dd HH:mm")));
    }
}

// Scheduler endpoint DTOs
public record ScheduleRequest(string Time, bool Enabled = true);
public record ScheduleInfo(string Time, bool Enabled, string? NextRun);
