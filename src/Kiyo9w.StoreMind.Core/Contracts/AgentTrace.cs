using System.Text.Json.Serialization;

namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// Represents a single LLM interaction trace for audit and debugging
/// </summary>
[JsonSerializable(typeof(AgentTrace))]
public record AgentTrace(
    string AgentName,
    string Role,
    string Content,
    DateTimeOffset Timestamp)
{
    /// <summary>
    /// The model that generated this trace (e.g., "llama-3.3-70b-versatile", "gpt-4o")
    /// </summary>
    public string? ModelUsed { get; init; }

    /// <summary>
    /// Optional: extracted thinking/reasoning portion if using chain-of-thought
    /// </summary>
    public string? ThinkingContent { get; init; }

    /// <summary>
    /// Token usage for this interaction (if available)
    /// </summary>
    public int? TokensUsed { get; init; }

    /// <summary>
    /// Latency in milliseconds for this LLM call
    /// </summary>
    public long? LatencyMs { get; init; }
}

/// <summary>
/// Aggregates all LLM traces from a multi-agent session
/// </summary>
[JsonSerializable(typeof(AgentConversation))]
public record AgentConversation
{
    /// <summary>
    /// Unique session ID for this conversation
    /// </summary>
    public string SessionId { get; init; } = $"conv-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}"[..28];

    /// <summary>
    /// When this conversation started
    /// </summary>
    public DateTimeOffset StartedAt { get; init; } = DateTimeOffset.UtcNow;

    /// <summary>
    /// When the conversation ended (null if still in progress)
    /// </summary>
    public DateTimeOffset? CompletedAt { get; set; }

    /// <summary>
    /// Total duration in milliseconds
    /// </summary>
    public long? DurationMs => CompletedAt.HasValue 
        ? (long)(CompletedAt.Value - StartedAt).TotalMilliseconds 
        : null;

    /// <summary>
    /// Ordered list of all agent interactions
    /// </summary>
    public List<AgentTrace> Traces { get; init; } = [];

    /// <summary>
    /// Summary of agents involved and their contributions
    /// </summary>
    public Dictionary<string, int> AgentContributions => 
        Traces.GroupBy(t => t.AgentName)
              .ToDictionary(g => g.Key, g => g.Count());

    /// <summary>
    /// Total tokens used across all traces (if available)
    /// </summary>
    public int? TotalTokensUsed => 
        Traces.Where(t => t.TokensUsed.HasValue).Sum(t => t.TokensUsed);

    /// <summary>
    /// Add a new trace to the conversation
    /// </summary>
    public void AddTrace(AgentTrace trace) => Traces.Add(trace);

    /// <summary>
    /// Mark the conversation as complete
    /// </summary>
    public void Complete() => CompletedAt = DateTimeOffset.UtcNow;
}
