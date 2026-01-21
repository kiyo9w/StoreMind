using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Service.Services;
using Microsoft.AspNetCore.Mvc;

namespace Kiyo9w.StoreMind.Service.Endpoints;

public static class Planning
{
    public static void MapPlanningEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/plans").WithTags("Tier2-Planning");

        group.MapGet("/today", HandleGetToday)
             .WithName("GetTodaysPlan")
             .WithOpenApi();

        group.MapPost("/run", HandleRunPlanning)
             .WithName("RunPlanning")
             .WithOpenApi();

        group.MapPost("/{planId}/actions/{actionId}/approve", HandleApprove)
             .WithName("ApproveAction")
             .WithOpenApi();
    }

    private static async Task<IResult> HandleGetToday([FromServices] PlanStore store)
    {
        var today = DateTime.Today.ToString("yyyy-MM-dd");
        var result = await store.LoadAsync(today);

        if (result == null)
        {
            return Results.NotFound(new { message = "No plan found for today", date = today });
        }

        return Results.Ok(new
        {
            plan = result.Value.Plan,
            verdict = result.Value.Verdict
        });
    }

    // manually trigger planning (for demo/testing)
    private static async Task<IResult> HandleRunPlanning(
        [FromServices] OvernightPlanner planner,
        [FromServices] PlanCritic critic,
        [FromServices] PlanStore store)
    {
        var plan = await planner.GeneratePlanAsync();
        var verdict = await critic.CritiqueAsync(plan);
        await store.SaveAsync(plan, verdict);

        return Results.Ok(new
        {
            plan,
            verdict,
            message = verdict.IsApproved
                ? "Plan approved and saved"
                : $"Plan has {verdict.BlockingIssues.Count} issues, saved for review"
        });
    }

    private static IResult HandleApprove(string planId, string actionId, [FromBody] Approval request)
    {
        var response = new ApprovalResult(
            Success: true,
            Message: "Action approved",
            PlanId: planId,
            ActionId: actionId,
            ApprovedBy: request.ApprovedBy
        );
        return Results.Ok(response);
    }
}
