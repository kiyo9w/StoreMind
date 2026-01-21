using System.Diagnostics;
using System.Text.Json;
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
}
