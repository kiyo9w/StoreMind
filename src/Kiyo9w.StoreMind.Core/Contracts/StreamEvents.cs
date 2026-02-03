namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// SSE event types for multi-agent streaming chat
/// </summary>
public static class StreamEventType
{
    public const string BeginStream = "begin-stream";
    public const string StreamEnd = "stream-end";
    
    // Agent lifecycle events
    public const string AgentStart = "agent-start";       // Agent begins responding
    public const string AgentThinking = "agent-thinking"; // <thinking> content detected
    public const string AgentEnd = "agent-end";           // Agent finished responding
    
    // Content streaming
    public const string TextChunk = "text-chunk";         // Token-by-token content
    
    // Tool events
    public const string ToolCall = "tool-call";           // Agent calls a tool
    public const string ToolResult = "tool-result";       // Tool returns result
    
    // Error
    public const string Error = "error";                  // Explicit error event
}

/// <summary>
/// Begin stream event
/// </summary>
public record StreamingEvent(string EventType, object Data);

/// <summary>
/// Begin stream event - emitted when streaming starts
/// </summary>
public record BeginStreamData(string SessionId, string? PlanDate = null);

/// <summary>
/// Agent start event - emitted when an agent begins responding
/// </summary>
public record AgentStartData(string AgentName, string Role);

/// <summary>
/// Agent thinking event - emitted when <thinking> content is detected
/// </summary>
public record AgentThinkingData(string AgentName, string Content);

/// <summary>
/// Agent end event - emitted when an agent finishes responding
/// </summary>
public record AgentEndData(
    string AgentName,
    string Role,
    string FullContent,
    string? ThinkingContent,
    long? LatencyMs);

/// <summary>
/// Text chunk for token-by-token streaming
/// </summary>
public record TextChunkData(string Text);

/// <summary>
/// Tool call event - emitted when an agent invokes a tool
/// </summary>
public record ToolCallData(
    string AgentName,
    string ToolName,
    string Arguments,
    string CallId);

/// <summary>
/// Tool result event - emitted when a tool returns its result
/// </summary>
public record ToolResultData(
    string AgentName,
    string ToolName,
    string Result,
    string CallId);

/// <summary>
/// Error event - emitted when an error occurs during streaming
/// </summary>
public record ErrorData(string Message, string? AgentName = null);

/// <summary>
/// Stream end event with final response and updated plan
/// </summary>
public record StreamEndData(
    string Reply,
    Plan? UpdatedPlan,
    string? ActionModified,
    AgentConversation Conversation);
