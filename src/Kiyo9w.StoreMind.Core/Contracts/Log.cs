using System.Text.Json.Serialization;

namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// Categorizes the type of event being logged in the decision audit trail
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum DecisionLogType
{
    ToolCall,
    PlanGenerated,
    CriticReview,
    PlanRepaired,
    ActionApproved,
    ActionRejected,
    ActionExecuted,
    Error,
    ModelFallback
}

/// <summary>
/// A single entry in the persistent audit log, tracking agent decisions and tool usage
/// </summary>
[JsonSerializable(typeof(Log))]
public record Log
{
    [JsonPropertyName("id")]
    public string Id { get; init; } = Guid.NewGuid().ToString("N");

    /// <summary>
    /// links related events (e.g., all steps in a single planning run)
    /// </summary>
    [JsonPropertyName("correlation_id")]
    public required string CorrelationId { get; init; }

    [JsonPropertyName("type")]
    public required DecisionLogType Type { get; init; }

    [JsonPropertyName("timestamp")]
    public DateTimeOffset Timestamp { get; init; } = DateTimeOffset.UtcNow;

    [JsonPropertyName("agent_name")]
    public string? AgentName { get; init; }

    [JsonPropertyName("model_used")]
    public string? ModelUsed { get; init; }

    [JsonPropertyName("tool_name")]
    public string? ToolName { get; init; }

    [JsonPropertyName("input")]
    public string? Input { get; init; }

    [JsonPropertyName("output")]
    public string? Output { get; init; }

    [JsonPropertyName("latency_ms")]
    public long? LatencyMs { get; init; }

    [JsonPropertyName("error")]
    public string? Error { get; init; }

    [JsonPropertyName("context")]
    public Dictionary<string, object>? Context { get; init; }


}
