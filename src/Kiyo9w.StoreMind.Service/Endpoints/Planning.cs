using Kiyo9w.StoreMind.Core.Contracts;
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

        group.MapPost("/{planId}/actions/{actionId}/approve", HandleApprove)
             .WithName("ApproveAction")
             .WithOpenApi();
    }

    private static IResult HandleGetToday()
    {
        return Results.Ok(new
        {
            message = "demo mode: plan review endpoint. planner logic pending implementation.",
            date = DateTime.UtcNow.ToString("yyyy-MM-dd")
        });
    }

    private static IResult HandleApprove(string planId, string actionId, [FromBody] Approval request)
    {
        var response = new ApprovalResult(
            Success: true,
            Message: "demo: action approval endpoint.",
            PlanId: planId,
            ActionId: actionId,
            ApprovedBy: request.ApprovedBy
        );
        return Results.Ok(response);
    }
}
