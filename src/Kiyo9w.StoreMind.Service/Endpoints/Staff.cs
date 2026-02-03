using System.Text.Json;
using System.Text.RegularExpressions;
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
        await WriteEvent(StreamEventType.BeginStream, new BeginStreamData(sessionId));

        // build context that restricts to Staff role
        // the AgentOrchestrator's instructions check for "User: Staff" and block Planner access
        var context = "User: Staff\n\nThe user is a staff member. They can query inventory but cannot modify plans. Stocker access only.";

        // track conversation from agent-end events
        var conversation = new AgentConversation();
        string? lastOrchestratorContent = null;
        string? lastStockerContent = null;

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

                    // Track responses for final reply extraction
                    if (end.AgentName == "Orchestrator")
                    {
                        lastOrchestratorContent = end.FullContent;
                    }
                    else if (end.AgentName == "Stocker")
                    {
                        lastStockerContent = end.FullContent;
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

        // extract final response (strip status tags)
        var finalResponse = lastOrchestratorContent ?? "";
        if (finalResponse.Contains("<status>"))
        {
            finalResponse = Regex.Replace(finalResponse, @"<status>.*?</status>", "", 
                RegexOptions.Singleline).Trim();
        }

        // fallback to Stocker's response if Orchestrator just returned status
        if (string.IsNullOrWhiteSpace(finalResponse) && !string.IsNullOrEmpty(lastStockerContent))
        {
            finalResponse = lastStockerContent;
        }

        // emit stream-end (no plan for staff, using null-safe record)
        await WriteEvent(StreamEventType.StreamEnd, new StreamEndData(
            finalResponse,
            null,
            null,
            conversation));
    }
}

/// <summary>
/// Staff chat request - just a message, no plan context
/// </summary>
public record StaffChatRequest(string Message);
