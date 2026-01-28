using System.Text.Json.Serialization;

namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// Tracks whether a proposal is waiting, approved, or rejected.
/// We keep it simple: 3 states cover the demo flow.
/// </summary>
public enum ApprovalState
{
    Pending,
    Approved,
    Rejected
}



/// <summary>
/// The three action types the system actually uses:
/// Order (restock), Markdown (discount expiring items), Alert (notify manager).
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ProposalType
{
    Order,
    Markdown,
    Alert
}

/// <summary>
/// Identifies item and qty for the action
/// </summary>
[JsonSerializable(typeof(ActionTarget))]
    public record ActionTarget(
    string Sku,
    decimal Qty);

/// <summary>
/// Estimated outcomes for this action
/// </summary>
public record ExpectedImpact(
    decimal WasteReduction,
    decimal MarginDelta,
    double StockoutRiskDelta);

/// <summary>
/// Represents a single action inside a <see cref="Plan"/>
/// </summary>
[JsonSerializable(typeof(Proposal))]
public record Proposal(
    ProposalType Type,
    ActionTarget Target,
    ExpectedImpact ExpectedImpact,
    double Confidence,
    IReadOnlyList<Evidence> Evidence,
    IReadOnlyList<string> RiskFlags,
    bool RequiresManagerApproval = true)
{
    public string Id { get; init; } = Guid.NewGuid().ToString("N")[..8];

    public ApprovalState ApprovalState { get; init; } = ApprovalState.Pending;

    public string? RejectedBy { get; init; }

    public string? RejectionReason { get; init; }

    /// <summary>
    /// Checks if the action is valid internally like the target and evidence
    /// </summary>
    public bool IsValid() =>
        Target is not null &&
        !string.IsNullOrWhiteSpace(Target.Sku) &&
        Evidence is not null &&
        Evidence.Count >= 1 &&
        Evidence.All(e => e.IsValid()) &&
        Confidence is >= 0.0 and <= 1.0;
}
