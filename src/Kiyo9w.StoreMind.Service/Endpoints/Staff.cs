using Kiyo9w.StoreMind.Core.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Kiyo9w.StoreMind.Service.Endpoints;

public static class Staff
{
    public static void MapStaffEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/staff/ask", HandleAsk)
           .WithName("StaffAsk")
           .WithOpenApi();
    }

    private static IResult HandleAsk([FromBody] StaffQuery request)
    {
        var response = new StaffAnswer(
            Answer: "demo answer: staff q&a endpoint. not hooked up to local model yet.",
            Query: request.Question,
            LatencyMs: 0
        );
        return Results.Ok(response);
    }
}
