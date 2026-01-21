using System.Text.Json.Serialization;

namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// The lifecycle state of a proposed action
/// </summary>
public enum ApprovalState
{
    Draft,
    PendingReview,
    Approved,
    Rejected,
    Executed,
    Cancelled
}



/// <summary>
/// Defines the category of action the agent proposed
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ProposalType
{
    DraftPo,
    DraftMarkdown,
    DraftBundle,
    DraftTransfer,
    DraftTask,
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
    public ApprovalState ApprovalState { get; init; } = ApprovalState.Draft;

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
