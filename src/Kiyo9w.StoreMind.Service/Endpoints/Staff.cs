using System.Text.Json;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Service.Services;
using Microsoft.AspNetCore.Mvc;

namespace Kiyo9w.StoreMind.Service.Endpoints;

/// <summary>
/// Staff endpoints - read-only inventory queries via Stocker agent
/// No plan modification access (handled by AgentOrchestrator role check)
/// </summary>
public static class Staff
{
    public static void MapStaffEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/staff").WithTags("Staff");

        group.MapPost("/chat", HandleChat)
             .WithName("StaffChat");
    }

    /// <summary>
    /// SSE streaming chat for Staff - inventory queries only
    /// Routes through AgentOrchestrator with "User: Staff" context to restrict access
    /// </summary>
    private static async Task HandleChat(
        HttpContext httpContext,
        [FromBody] StaffChatRequest request,
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

        var sessionId = $"staff-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}"[..32];

        // emit begin-stream (no plan date for staff)
        await WriteEvent(StreamEventType.BeginStream, new { session_id = sessionId });

        // build context that restricts to Staff role
        // the AgentOrchestrator's instructions check for "User: Staff" and block Planner access
        var context = "User: Staff\n\nThe user is a staff member. They can query inventory but cannot modify plans. Stocker access only.";

        // track conversation and final response
        var conversation = new AgentConversation();
        string finalResponse = "";
        string? lastOrchestratorContent = null;
        string? lastStockerContent = null;  // fallback for when Orchestrator just returns status
        int stepNumber = 0;

        try
        {
            await foreach (var trace in orchestrator.ProcessAsync(request.Message, context, ct))
            {
                conversation.AddTrace(trace);
                stepNumber++;

                // determine status based on agent
                var status = trace.AgentName == "Orchestrator" && trace.ThinkingContent != null
                    ? "thinking"
                    : "working";

                // emit agent-step event
                await WriteEvent(StreamEventType.AgentStep, new AgentStepData(
                    StepNumber: stepNumber,
                    AgentName: trace.AgentName,
                    Role: trace.Role,
                    Content: trace.Content,
                    Thought: trace.ThinkingContent,
                    Status: status));

                // track agent responses
                if (trace.AgentName == "Orchestrator")
                {
                    lastOrchestratorContent = trace.Content;
                }
                else if (trace.AgentName == "Stocker")
                {
                    lastStockerContent = trace.Content;
                }
            }

            // extract final response (strip status tags)
            finalResponse = lastOrchestratorContent ?? "";
            if (finalResponse.Contains("<status>"))
            {
                finalResponse = System.Text.RegularExpressions.Regex
                    .Replace(finalResponse, @"<status>.*?</status>", "", 
                             System.Text.RegularExpressions.RegexOptions.Singleline)
                    .Trim();
            }

            // fallback to Stocker's response if Orchestrator just returned status
            if (string.IsNullOrWhiteSpace(finalResponse) && !string.IsNullOrEmpty(lastStockerContent))
            {
                finalResponse = lastStockerContent;
            }

            // stream final response as text-chunk
            if (!string.IsNullOrEmpty(finalResponse))
            {
                await WriteEvent(StreamEventType.TextChunk, new TextChunkData(finalResponse));
            }
        }
        catch (Exception ex)
        {
            conversation.AddTrace(new AgentTrace(
                AgentName: "System",
                Role: "Error",
                Content: ex.Message,
                Timestamp: DateTimeOffset.UtcNow));
            finalResponse = "I encountered an error processing your request.";
        }

        conversation.Complete();

        // emit stream-end (no plan for staff)
        await WriteEvent(StreamEventType.StreamEnd, new
        {
            reply = finalResponse,
            conversation
        });
    }
}

/// <summary>
/// Staff chat request - just a message, no plan context
/// </summary>
public record StaffChatRequest(string Message);
