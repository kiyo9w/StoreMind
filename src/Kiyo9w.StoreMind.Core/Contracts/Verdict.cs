using System.Text.Json.Serialization;

namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// Outcome of the critic review
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum VerdictType { Approve, Revise }

/// <summary>
/// Describes a policy violation or error preventing approval
/// </summary>
[JsonSerializable(typeof(BlockingIssue))]
public record BlockingIssue(
    [property: JsonPropertyName("action_index")] int ActionIndex,
    [property: JsonPropertyName("reason")] string Reason,
    [property: JsonPropertyName("policy_ref")] string? PolicyRef);

/// <summary>
/// Output from the Critic agent. Contains the verdict and any blocking issues
/// </summary>
[JsonSerializable(typeof(Verdict))]
public record Verdict(
    [property: JsonPropertyName("verdict")] VerdictType Outcome,
    [property: JsonPropertyName("blocking_issues")] IReadOnlyList<BlockingIssue> BlockingIssues,
    [property: JsonPropertyName("suggestions")] IReadOnlyList<string> Suggestions)
{
    [JsonPropertyName("issued_at")]
    public DateTimeOffset IssuedAt { get; init; } = DateTimeOffset.UtcNow;

    [JsonPropertyName("model_used")]
    public string? ModelUsed { get; init; }

    public bool IsApproved => Outcome == VerdictType.Approve;
}
