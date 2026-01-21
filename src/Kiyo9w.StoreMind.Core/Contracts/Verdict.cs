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
/// Suggested JSON patch to fix the plan
/// </summary>
public record JsonPatchOp(
    [property: JsonPropertyName("op")] string Op,
    [property: JsonPropertyName("path")] string Path,
    [property: JsonPropertyName("value")] object? Value);

/// <summary>
/// Structured output from the critic containing verdict and fixes
/// </summary>
[JsonSerializable(typeof(Verdict))]
public record Verdict(
    [property: JsonPropertyName("verdict")] VerdictType Outcome,
    [property: JsonPropertyName("blocking_issues")] IReadOnlyList<BlockingIssue> BlockingIssues,
    [property: JsonPropertyName("suggested_patch")] IReadOnlyList<JsonPatchOp> SuggestedPatch)
{
    [JsonPropertyName("issued_at")]
    public DateTimeOffset IssuedAt { get; init; } = DateTimeOffset.UtcNow;

    [JsonPropertyName("model_used")]
    public string? ModelUsed { get; init; }

    public bool IsApproved => Outcome == VerdictType.Approve;


}
