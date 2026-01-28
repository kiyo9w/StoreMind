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
    [property: JsonPropertyName("sku")] string Sku,
    [property: JsonPropertyName("qty")] decimal Qty);

/// <summary>
/// Estimated outcomes for this action
/// </summary>
[JsonSerializable(typeof(ExpectedImpact))]
public record ExpectedImpact(
    [property: JsonPropertyName("waste_reduction")] decimal WasteReduction,
    [property: JsonPropertyName("margin_delta")] decimal MarginDelta,
    [property: JsonPropertyName("stockout_risk_delta")] double StockoutRiskDelta);

/// <summary>
/// Represents a single action inside a <see cref="Plan"/>
/// </summary>
[JsonSerializable(typeof(Proposal))]
public record Proposal(
    [property: JsonPropertyName("type")] ProposalType Type,
    [property: JsonPropertyName("target")] ActionTarget Target,
    [property: JsonPropertyName("expected_impact")] ExpectedImpact ExpectedImpact,
    [property: JsonPropertyName("confidence")] double Confidence,
    [property: JsonPropertyName("evidence")] IReadOnlyList<Evidence> Evidence,
    [property: JsonPropertyName("risk_flags")] IReadOnlyList<string> RiskFlags,
    [property: JsonPropertyName("requires_manager_approval")] bool RequiresManagerApproval = true)
{
    [JsonPropertyName("id")]
    public string Id { get; init; } = Guid.NewGuid().ToString("N")[..8];

    [JsonPropertyName("approval_state")]
    public ApprovalState ApprovalState { get; init; } = ApprovalState.Pending;

    [JsonPropertyName("rejected_by")]
    public string? RejectedBy { get; init; }

    [JsonPropertyName("rejection_reason")]
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
