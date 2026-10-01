namespace Kiyo9w.StoreMind.Service;

public sealed record Actor(string Id, string Username, string DisplayName, string Role, string? StoreId, string? DistrictId)
{
    public string TenantId { get; init; } = "storemind-demo";
    public string? Department { get; init; }
    public IReadOnlyList<string> Assignments { get; init; } = [];
    public IReadOnlyList<string> Capabilities { get; init; } = [];
    public int PolicyVersion { get; init; } = 1;
}
public sealed record SignInRequest(string Username, string Password);
public sealed record ShiftRequest(string StoreId);
public sealed record Proof(string Type, string Value, string? SourceRef)
{
    public string? Id { get; init; }
    public string ArtifactRef => Value;
}
public sealed record CommandRequest(string? Reason, string? ActionCode, IReadOnlyList<Proof>? Proofs, int? SnoozeMinutes = null, string? TargetActorId = null, string? EscalationReason = null, string? EscalationSeverity = null, string? EscalationTrend = null);
public sealed record ProofArtifact(string Type, string ArtifactRef, string SourceRef, string Label);
public sealed record AllowedAction(string Code, string Label);
public sealed record SourceRecord(string SourceId, string Type, string StoreId, string Title, string Description, int Urgency, decimal Impact, decimal Confidence, decimal CurrentMetricValue, DateTimeOffset ObservedAt, string RequiredProofType, decimal MetricTarget, string MetricDirection);
public sealed record FollowUpObservation(string SourceId, decimal MetricValue, DateTimeOffset ObservedAt, string SourceRef);
public sealed record TimelineEntry(string Id, string Actor, string Role, DateTimeOffset Timestamp, string? Reason, string ActionCode, decimal? MetricValue, string? MetricSourceRef, IReadOnlyList<Proof> Proofs, string CommandId, bool Succeeded, string StateAfter, DateTimeOffset? SnoozedUntil, string Digest, string? EscalationReason = null, string? EscalationSeverity = null, string? EscalationTrend = null, DateTimeOffset? EscalationDueAt = null);
public sealed class ShiftPresence
{
    public required string ActorId { get; init; }
    public required string DisplayName { get; init; }
    public required string Role { get; init; }
    public required string StoreId { get; init; }
    public string? Department { get; init; }
    public bool OnShift { get; set; }
    public DateTimeOffset? ClockedAt { get; set; }
}
public sealed record PolicyDraft(int? ThresholdScore = null, int? VolumeBudget = null);
public sealed class ExceptionClassPolicy
{
    public required string Class { get; init; }
    public required string Label { get; init; }
    public bool Published { get; set; } = true;
    public int ThresholdScore { get; set; }
    public int VolumeBudget { get; set; } = 4;
}
public sealed record PolicyPreview(string Class, int ExpectedCount, int VolumeBudget, bool WouldExceedBudget, int ThresholdScore);
public sealed record PolicyReceipt(string Class, string Label, bool Published, int ThresholdScore, int VolumeBudget, int LiveCount);
public sealed record ProofRecord(string ProofId, string ExceptionId, string StoreId, string Type, string ArtifactRef, string? SourceRef, DateTimeOffset RecordedAt, string ActorId);
public sealed record PolicyMetrics(int OpenCount, int ResolvedCount, int ProofCount, decimal CompletionRate, decimal FalsePositiveRate);
public sealed record CommandState(string Status, DateTimeOffset At, string? Detail = null);
public sealed class CommandAdmission
{
    public required string CommandId { get; init; }
    public required string ActorId { get; init; }
    public required string AggregateId { get; init; }
    public required string Command { get; init; }
    public required string Fingerprint { get; init; }
    public string Status { get; set; } = "accepted";
    public string? ErrorCode { get; set; }
    public long? Sequence { get; set; }
    public DateTimeOffset AcceptedAt { get; set; }
    public DateTimeOffset? CompletedAt { get; set; }
    public List<CommandState> States { get; init; } = [];
}
public sealed class RetailException
{
    public required string Id { get; init; }
    public required string SourceId { get; init; }
    public required string SourceType { get; init; }
    public required string StoreId { get; init; }
    public required string StoreName { get; init; }
    public string TenantId { get; init; } = "storemind-demo";
    public string Department { get; init; } = "store_operations";
    public string AssignmentId { get; init; } = "store_operations";
    public int PolicyVersion { get; init; } = 1;
    public required string DistrictId { get; init; }
    public required string Title { get; init; }
    public required string Description { get; init; }
    public required string Severity { get; init; }
    public required int RankScore { get; init; }
    public required int Urgency { get; init; }
    public required decimal Impact { get; init; }
    public string AssignedOwner { get; set; } = "Store operations";
    public string OwnerKind { get; set; } = "role";
    public string? OwnerActorId { get; set; }
    public string RoleOwner { get; set; } = "Store operations";
    public DateTimeOffset DueAt { get; set; }
    public string ItemLocation { get; set; } = "Assigned store area";
    public string InactionConsequence { get; set; } = "Escalates to the next authorized owner when overdue.";
    public int UrgencyPoints { get; set; }
    public int ImpactPoints { get; set; }
    public int ConfidencePoints { get; set; }
    public int AgePoints { get; set; }
    public string RankExplanation { get; set; } = "";
    public required decimal Confidence { get; init; }
    public required DateTimeOffset ObservedAt { get; set; }
    public required string RequiredProofType { get; init; }
    public IReadOnlyList<ProofArtifact> AvailableProofs { get; set; } = [];
    public decimal CurrentMetricValue { get; set; }
    public required decimal MetricTarget { get; init; }
    public required string MetricDirection { get; init; }
    public required IReadOnlyList<AllowedAction> AllowedActions { get; init; }
    public string State { get; set; } = "active";
    public long Version { get; set; } = 1;
    public DateTimeOffset? SnoozedUntil { get; set; }
    public List<TimelineEntry> Timeline { get; init; } = [];
    public int RecheckCount { get; set; }
    public DateTimeOffset? EscalatedAt { get; set; }
    public DateTimeOffset? EscalationDueAt { get; set; }
    public string? EscalationReason { get; set; }
    public string? EscalationSeverity { get; set; }
    public string? EscalationTrend { get; set; }
    public DateTimeOffset? DeescalatedAt { get; set; }
    public string? DeescalationJustification { get; set; }
    public DateTimeOffset? ResolvedAt { get; set; }
    public DateTimeOffset? SuppressedAt { get; set; }
    public string? ClosureReason { get; set; }
}
public sealed record StoreSummary(string StoreId, string StoreName, string DistrictId, int ActiveCount, int OverdueCount, int BlockedCount, int SuppressedCount, int HighSeverityCount, int ResolvedCount, DateTimeOffset? OldestOpenAt, int EscalatedCount, int ResponseOverdueCount);
public sealed record DistrictSummary(string DistrictId, int StoreCount, int ActiveCount, int EscalatedCount, int ResponseOverdueCount, DateTimeOffset? OldestEscalationDueAt);
public sealed record EventEnvelope(string EventId, string TenantId, string AggregateType, string AggregateId, long AggregateVersion, string Type, long Sequence, DateTimeOffset OccurredAt, object Data);
public sealed record CommandReceipt(string CommandId, string AggregateId, string Command, long Sequence, RetailException Exception, IReadOnlyList<string> AllowedCommands, string Status = "completed", DateTimeOffset? AcceptedAt = null, DateTimeOffset? CompletedAt = null);
public sealed record ResetReceipt(string CommandId, long Sequence, DateTimeOffset ResetAt);
public sealed class DurableState
{
    public long Sequence { get; set; }
    public List<RetailException> Exceptions { get; set; } = [];
    public List<EventEnvelope> Events { get; set; } = [];
    public Dictionary<string, CommandReceipt> Commands { get; set; } = [];
    public Dictionary<string, ResetReceipt> ResetCommands { get; set; } = [];
    public Dictionary<string, string> CommandFingerprints { get; set; } = [];
    public Dictionary<string, CommandAdmission> Admissions { get; set; } = [];
    public List<ShiftPresence> Shifts { get; set; } = [];
    public List<ExceptionClassPolicy> Policies { get; set; } = [];
}
public interface IRetailSource
{
    IReadOnlyList<SourceRecord> Read();
    FollowUpObservation Recheck(string sourceId, int observationIndex);
}
