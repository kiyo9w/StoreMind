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
    int ActionIndex,
    string Reason,
    string? PolicyRef);

/// <summary>
/// Output from the Critic agent. Contains the verdict and any blocking issues
/// </summary>
[JsonSerializable(typeof(Verdict))]
public record Verdict(
    VerdictType Outcome,
    IReadOnlyList<BlockingIssue> BlockingIssues,
    IReadOnlyList<string> Suggestions)
{
    public DateTimeOffset IssuedAt { get; init; } = DateTimeOffset.UtcNow;

    public string? ModelUsed { get; init; }

    public bool IsApproved => Outcome == VerdictType.Approve;
}
