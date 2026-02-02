namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// SSE event types for multi-agent streaming chat
/// </summary>
public static class StreamEventType
{
    public const string BeginStream = "begin-stream";
    public const string AgentStep = "agent-step";      // an agent responded
    public const string TextChunk = "text-chunk";      // final answer chunk
    public const string StreamEnd = "stream-end";      // complete, with plan
}

/// <summary>
/// Begin stream event
/// </summary>
public record BeginStreamData(string SessionId, string PlanDate);

/// <summary>
/// Agent step event - when an agent in the council responds
/// </summary>
public record AgentStepData(
    int StepNumber,
    string AgentName,    // "Orchestrator", "Stocker", "Planner", "Reviser"
    string Role,         // "Manager" or "Specialist"
    string Content,      // agent's full response
    string? Thought,     // extracted <thinking> content if any
    string Status);      // "thinking", "working", "done"

/// <summary>
/// Text chunk for streaming final answer
/// </summary>
public record TextChunkData(string Text);

/// <summary>
/// Stream end event with final response and updated plan
/// </summary>
public record StreamEndData(
    string Reply,
    Plan? UpdatedPlan,
    string? ActionModified,
    AgentConversation Conversation);
