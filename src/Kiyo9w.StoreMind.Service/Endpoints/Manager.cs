using Kiyo9w.StoreMind.Core.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Kiyo9w.StoreMind.Service.Endpoints;

public static class Manager
{
    public static void MapManagerEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/manager/explain", HandleExplain)
           .WithName("ExplainDecision")
           .WithTags("Tier2-Manager")
           .WithOpenApi();
    }

    private static IResult HandleExplain([FromBody] Explain request)
    {
        var response = new Explanation(
            Explanation: "demo response: explainability endpoint. rag pipeline isnt ready.",
            Question: request.Question,
            PlanId: request.PlanId,
            LatencyMs: 0
        );
        return Results.Ok(response);
    }
}
