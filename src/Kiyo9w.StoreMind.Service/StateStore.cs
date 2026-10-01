using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace Kiyo9w.StoreMind.Service;

public sealed class StateStore
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower, WriteIndented = true };
    private readonly IRetailSource source;
    private readonly object gate = new();
    private readonly string path;
    private readonly List<Action<EventEnvelope>> subscribers = [];
    private DurableState state = new();
    public StateStore(IRetailSource source) : this(source, Path.Combine(AppContext.BaseDirectory, "data", "state.json")) { }
    public StateStore(IRetailSource source, string dataPath) { this.source = source; path = dataPath; }
    public void Initialize()
    {
        lock (gate)
        {
            if (!File.Exists(path)) { state = ResetCore(); return; }
            state = JsonSerializer.Deserialize<DurableState>(File.ReadAllText(path), Json) ?? ResetCore();
            EnsurePolicies();
            EnsureShifts();
            RefreshDerivedFields();
            Persist();
        }
    }
    public (long Sequence, List<RetailException> Items) Snapshot(Actor actor, string? store, string? itemState) { lock (gate) { WakeDueSnoozes(); return (state.Sequence, Clone(state.Exceptions.Where(x => AccessPolicy.CanSee(actor, x) && (store is null || x.StoreId == store) && (itemState is null || itemState == "active" && x.State is not ("resolved" or "suppressed" or "snoozed") || x.State == itemState)).OrderByDescending(x => x.RankScore).ThenBy(x => x.Id).ToList())); } }
    public RetailException? Find(Actor actor, string id) { lock (gate) { WakeDueSnoozes(); var x = state.Exceptions.FirstOrDefault(e => e.Id == id); return x is not null && AccessPolicy.CanSee(actor, x) ? Clone(x) : null; } }
    public IReadOnlyList<string> AllowedFor(Actor actor, RetailException item) { lock (gate) return AccessPolicy.Allowed(actor, item, OnShiftUnlocked(actor)).ToArray(); }
    public IReadOnlyList<StoreSummary> StoreSummaries(Actor actor)
    {
        lock (gate)
        {
            var now = DateTimeOffset.UtcNow;
            return state.Exceptions.Where(x => AccessPolicy.CanSee(actor, x)).GroupBy(x => new { x.StoreId, x.StoreName, x.DistrictId }).Select(g => new StoreSummary(
                g.Key.StoreId, g.Key.StoreName, g.Key.DistrictId,
                g.Count(x => x.State is not ("resolved" or "suppressed")),
                g.Count(x => x.State is not ("resolved" or "suppressed") && x.DueAt < now),
                g.Count(x => x.State is "escalated" or "snoozed"), g.Count(x => x.State == "suppressed"),
                g.Count(x => x.Severity is "critical" or "high" && x.State is not ("resolved" or "suppressed")),
                g.Count(x => x.State == "resolved"),
                g.Where(x => x.State is not ("resolved" or "suppressed")).Select(x => (DateTimeOffset?)x.ObservedAt).Min(),
                g.Count(x => x.State == "escalated"),
                g.Count(x => x.State == "escalated" && x.EscalationDueAt < now))).OrderBy(x => x.StoreName).ToArray();
        }
    }
    public IReadOnlyList<DistrictSummary> DistrictSummaries(Actor actor)
    {
        lock (gate)
        {
            var now = DateTimeOffset.UtcNow;
            return state.Exceptions.Where(x => AccessPolicy.CanSee(actor, x)).GroupBy(x => x.DistrictId).Select(g => new DistrictSummary(
                g.Key, g.Select(x => x.StoreId).Distinct().Count(),
                g.Count(x => x.State is not ("resolved" or "suppressed")),
                g.Count(x => x.State == "escalated"),
                g.Count(x => x.State == "escalated" && x.EscalationDueAt < now),
                g.Where(x => x.State == "escalated").Select(x => x.EscalationDueAt).Min())).OrderBy(x => x.DistrictId).ToArray();
        }
    }
    public IReadOnlyList<ShiftPresence> Shifts(Actor actor, string storeId)
    {
        lock (gate)
        {
            if (!CanViewStore(actor, storeId)) return [];
            return Clone(state.Shifts.Where(x => x.StoreId == storeId).OrderBy(x => x.DisplayName).ToList());
        }
    }
    public ShiftPresence ClockIn(Actor actor, string storeId)
    {
        lock (gate)
        {
            var shift = RequireOwnShift(actor, storeId);
            shift.OnShift = true;
            shift.ClockedAt = DateTimeOffset.UtcNow;
            Persist();
            return Clone(shift);
        }
    }
    public ShiftPresence ClockOut(Actor actor, string storeId)
    {
        lock (gate)
        {
            var shift = RequireOwnShift(actor, storeId);
            shift.OnShift = false;
            shift.ClockedAt = DateTimeOffset.UtcNow;
            foreach (var item in state.Exceptions.Where(x => x.StoreId == storeId && x.OwnerKind == "person" && x.OwnerActorId == actor.Id).ToArray())
                ReturnToRole(item, actor, shift.ClockedAt.Value);
            Persist();
            return Clone(shift);
        }
    }
    public IReadOnlyList<ExceptionClassPolicy> Policies(Actor actor)
    {
        lock (gate)
        {
            RequirePolicy(actor);
            return Clone(state.Policies.OrderBy(x => x.Class).ToList());
        }
    }
    public PolicyPreview PreviewPolicy(Actor actor, string exceptionClass, PolicyDraft draft)
    {
        lock (gate)
        {
            RequirePolicy(actor);
            EnsurePolicies();
            var current = state.Policies.FirstOrDefault(x => x.Class == exceptionClass) ?? throw new ApiException(404, "not_found", "Exception class policy not found.");
            var policy = new ExceptionClassPolicy { Class = current.Class, Label = current.Label, Published = current.Published, ThresholdScore = draft.ThresholdScore ?? current.ThresholdScore, VolumeBudget = draft.VolumeBudget ?? current.VolumeBudget };
            var expected = ExceptionPolicy.ExpectedCount(source.Read(), exceptionClass, policy);
            return new PolicyPreview(exceptionClass, expected, policy.VolumeBudget, expected > policy.VolumeBudget, policy.ThresholdScore);
        }
    }
    public PolicyReceipt PublishPolicy(Actor actor, string exceptionClass, PolicyDraft draft)
    {
        lock (gate)
        {
            var policy = MutatePolicy(actor, exceptionClass, draft, persist: true, publish: true);
            return Receipt(policy);
        }
    }
    public PolicyReceipt UnpublishPolicy(Actor actor, string exceptionClass)
    {
        lock (gate)
        {
            var policy = MutatePolicy(actor, exceptionClass, new PolicyDraft(), persist: true, publish: false);
            return Receipt(policy);
        }
    }
    public IReadOnlyList<ProofRecord> Proofs(Actor actor)
    {
        lock (gate)
        {
            RequireHqRead(actor);
            return Clone(state.Exceptions.SelectMany(item => item.Timeline.SelectMany(entry => entry.Proofs.Select(proof =>
                new ProofRecord(proof.Id ?? ProofId(item, proof), item.Id, item.StoreId, proof.Type, proof.ArtifactRef, proof.SourceRef, entry.Timestamp, entry.Actor)))).OrderBy(x => x.RecordedAt).ToList());
        }
    }
    public PolicyMetrics PolicyMetrics(Actor actor)
    {
        lock (gate)
        {
            RequireHqRead(actor);
            var open = state.Exceptions.Count(x => x.State is not ("resolved" or "suppressed"));
            var resolved = state.Exceptions.Count(x => x.State == "resolved");
            var suppressed = state.Exceptions.Count(x => x.State == "suppressed");
            var proofCount = state.Exceptions.SelectMany(x => x.Timeline).SelectMany(x => x.Proofs).Count();
            var closed = resolved + suppressed;
            var completion = resolved + open == 0 ? 0 : (decimal)resolved / (resolved + open);
            var falsePositive = closed == 0 ? 0 : (decimal)suppressed / closed;
            return new PolicyMetrics(open, resolved, proofCount, completion, falsePositive);
        }
    }
    public CommandAdmission Command(Actor actor, string commandId)
    {
        lock (gate)
        {
            var admission = state.Admissions.Values.FirstOrDefault(x => x.CommandId == commandId && CanSeeAdmission(actor, x))
                ?? throw new ApiException(404, "not_found", "Command admission not found.");
            return Clone(admission);
        }
    }
    public IReadOnlyList<CommandAdmission> Commands(Actor actor, string exceptionId)
    {
        lock (gate)
        {
            return Clone(state.Admissions.Values.Where(x => x.AggregateId == exceptionId && CanSeeAdmission(actor, x)).OrderBy(x => x.AcceptedAt).ToList());
        }
    }
    public CommandReceipt Execute(Actor actor, string id, string command, string key, long expectedVersion, CommandRequest input)
    {
        lock (gate)
        {
            var dedupeKey = actor.Id + ":" + key;
            var fingerprint = Fingerprint(input);
            if (state.Commands.TryGetValue(dedupeKey, out var prior))
            {
                if (prior.AggregateId != id || prior.Command != command || !state.CommandFingerprints.TryGetValue(dedupeKey, out var priorFingerprint) || priorFingerprint != fingerprint) throw new ApiException(409, "idempotency_conflict", "Idempotency-Key was already used for a different request.");
                return Clone(prior);
            }
            if (state.Admissions.TryGetValue(dedupeKey, out var priorAdmission))
            {
                if (priorAdmission.AggregateId != id || priorAdmission.Command != command || priorAdmission.Fingerprint != fingerprint) throw new ApiException(409, "idempotency_conflict", "Idempotency-Key was already used for a different request.");
                if (priorAdmission.Status == "failed") throw new ApiException(422, priorAdmission.ErrorCode ?? "failed", "Command previously failed.");
            }
            var item = state.Exceptions.FirstOrDefault(x => x.Id == id) ?? throw new ApiException(404, "not_found", "Exception not found.");
            if (!AccessPolicy.CanSee(actor, item)) throw new ApiException(403, "forbidden", "Command is not allowed.");
            var onShift = OnShiftUnlocked(actor);
            if (AccessPolicy.RequiresShift(actor) && !onShift) throw new ApiException(403, "not_on_shift", "Store commands require an on-shift actor.");
            if (!AccessPolicy.Allowed(actor, item, onShift).Contains(command)) throw new ApiException(403, "forbidden", "Command is not allowed.");
            if (item.Version != expectedVersion) throw new ConflictException(Clone(item));
            var now = DateTimeOffset.UtcNow;
            var admission = Admit(dedupeKey, actor, id, command, fingerprint, now);
            try
            {
                Validate(command, input, item);
                if (command == "handoff") ValidateHandoff(item, input);
                var proofs = RecordProofs(item, input.Proofs ?? []);
                FollowUpObservation? observation = null;
                if (command == "verify")
                {
                    observation = source.Recheck(item.SourceId, item.RecheckCount);
                    item.RecheckCount++;
                }
                var success = command != "verify" || Verified(observation!, item);
                var wasEscalated = item.State == "escalated";
                if (success) item.State = command switch { "acknowledge" => "acknowledged", "act" => wasEscalated ? "escalated" : "in_progress", "snooze" => "snoozed", "suppress" => "suppressed", "escalate" => "escalated", "deescalate" => "active", "verify" => "resolved", "reopen" => "active", _ => item.State };
                else item.State = wasEscalated ? "escalated" : "active";
                if (command == "snooze") item.SnoozedUntil = now.AddMinutes(input.SnoozeMinutes!.Value);
                else if (command == "reopen") item.SnoozedUntil = null;
                if (command == "claim") AssignOwner(item, actor);
                else if (command == "handoff") AssignOwner(item, SessionStore.FindActor(input.TargetActorId!)!);
                if (command == "escalate")
                {
                    item.EscalatedAt = now;
                    item.EscalationDueAt = now.AddHours(input.EscalationSeverity == "high" ? 4 : 8);
                    item.EscalationReason = input.EscalationReason;
                    item.EscalationSeverity = input.EscalationSeverity;
                    item.EscalationTrend = input.EscalationTrend;
                    item.DeescalatedAt = null;
                    item.DeescalationJustification = null;
                    item.ResolvedAt = null;
                    item.SuppressedAt = null;
                    item.ClosureReason = null;
                }
                else if (command == "deescalate")
                {
                    item.DeescalatedAt = now;
                    item.DeescalationJustification = input.Reason!.Trim();
                }
                else if (command == "suppress")
                {
                    item.SuppressedAt = now;
                    item.ClosureReason = input.Reason;
                }
                else if (command == "verify" && success)
                {
                    item.ResolvedAt = now;
                    item.ClosureReason = "verified";
                    item.EscalatedAt = null;
                    item.EscalationDueAt = null;
                    item.EscalationReason = null;
                    item.EscalationSeverity = null;
                    item.EscalationTrend = null;
                }
                if (observation is not null) item.CurrentMetricValue = observation.MetricValue;
                item.Version++;
                var entry = new TimelineEntry(Guid.NewGuid().ToString("n"), actor.Id, actor.Role, now, input.Reason, input.ActionCode ?? command, observation?.MetricValue, observation?.SourceRef, proofs, key, success, item.State, item.SnoozedUntil, Digest(actor, item, command, key, now, fingerprint, observation?.SourceRef), input.EscalationReason, input.EscalationSeverity, input.EscalationTrend, command == "escalate" ? item.EscalationDueAt : null);
                item.Timeline.Add(entry);
                var envelope = Append(item, success ? command : "verification_failed", entry);
                Complete(admission, envelope.Sequence, now);
                var receipt = new CommandReceipt(key, id, command, envelope.Sequence, Clone(item), AccessPolicy.Allowed(actor, item, onShift).ToArray(), "completed", admission.AcceptedAt, admission.CompletedAt);
                state.Commands[dedupeKey] = receipt;
                state.CommandFingerprints[dedupeKey] = fingerprint;
                Persist(); Publish(envelope);
                return Clone(receipt);
            }
            catch (ApiException ex) when (ex is not ConflictException)
            {
                Fail(admission, ex.Code, now);
                Persist();
                throw;
            }
        }
    }
    public ResetReceipt Reset(Actor actor, string key)
    {
        lock (gate)
        {
            if (!actor.Capabilities.Contains("demo_reset")) throw new ApiException(403, "forbidden", "Reset requires the demo_reset capability.");
            var dedupeKey = actor.Id + ":reset:" + key;
            if (state.ResetCommands.TryGetValue(dedupeKey, out var prior)) return Clone(prior);
            var resetCommands = state.ResetCommands;
            var priorSequence = state.Sequence;
            var policies = CurrentPolicies();
            state = new DurableState { Sequence = priorSequence, Exceptions = ExceptionPolicy.Evaluate(source.Read(), policies), ResetCommands = resetCommands, Policies = policies, Shifts = SeededShifts() };
            var resetAt = DateTimeOffset.UtcNow;
            var envelope = new EventEnvelope(Guid.NewGuid().ToString("n"), actor.TenantId, "demo", "reset", 1, "reset_required", ++state.Sequence, resetAt, new { reason = "demo_reset" });
            var receipt = new ResetReceipt(key, envelope.Sequence, resetAt);
            state.ResetCommands[dedupeKey] = receipt;
            state.Events.Add(envelope); Persist(); Publish(envelope); return Clone(receipt);
        }
    }
    public IReadOnlyList<EventEnvelope>? Replay(Actor actor, long after)
    {
        lock (gate) { var oldest = state.Events.Count == 0 ? state.Sequence + 1 : state.Events[0].Sequence; if (after > state.Sequence || (after > 0 && after < oldest - 1)) return null; return Clone(state.Events.Where(e => e.Sequence > after && EventVisible(actor, e)).ToList()); }
    }
    public IDisposable Subscribe(Action<EventEnvelope> callback) { lock (gate) subscribers.Add(callback); return new Subscription(subscribers, callback, gate); }
    private void RefreshDerivedFields()
    {
        var current = ExceptionPolicy.Evaluate(source.Read(), CurrentPolicies()).ToDictionary(x => x.SourceId, StringComparer.Ordinal);
        foreach (var item in state.Exceptions)
        {
            if (!current.TryGetValue(item.SourceId, out var derived)) continue;
            item.RoleOwner = derived.RoleOwner;
            if (item.OwnerKind != "person") item.AssignedOwner = derived.AssignedOwner;
            item.DueAt = derived.DueAt;
            item.ObservedAt = derived.ObservedAt;
            item.ItemLocation = derived.ItemLocation;
            item.InactionConsequence = derived.InactionConsequence;
            item.UrgencyPoints = derived.UrgencyPoints;
            item.ImpactPoints = derived.ImpactPoints;
            item.ConfidencePoints = derived.ConfidencePoints;
            item.CurrentMetricValue = item.Timeline.LastOrDefault(entry => entry.MetricValue.HasValue)?.MetricValue ?? derived.CurrentMetricValue;
            item.AvailableProofs = derived.AvailableProofs;
            item.AgePoints = derived.AgePoints;
            item.RankExplanation = derived.RankExplanation;
            for (var index = 0; index < item.Timeline.Count; index++)
            {
                var entry = item.Timeline[index];
                if (entry.Proofs.Any(proof => string.IsNullOrWhiteSpace(proof.Id)))
                    item.Timeline[index] = entry with { Proofs = entry.Proofs.Select(proof => proof with { Id = ProofId(item, proof) }).ToArray() };
            }
        }
    }
    private DurableState ResetCore()
    {
        var policies = CurrentPolicies();
        var result = new DurableState { Sequence = state.Sequence, Exceptions = ExceptionPolicy.Evaluate(source.Read(), policies), ResetCommands = state.ResetCommands, Policies = policies, Shifts = SeededShifts() };
        state = result; Persist(); return result;
    }
    private EventEnvelope Append(RetailException item, string type, object data) { var e = new EventEnvelope(Guid.NewGuid().ToString("n"), "storemind-demo", "retail_exception", item.Id, item.Version, type, ++state.Sequence, DateTimeOffset.UtcNow, data); state.Events.Add(e); if (state.Events.Count > 200) state.Events.RemoveRange(0, state.Events.Count - 200); return e; }
    private void Persist() { Directory.CreateDirectory(Path.GetDirectoryName(path)!); var temp = path + ".tmp"; File.WriteAllText(temp, JsonSerializer.Serialize(state, Json)); File.Move(temp, path, true); }
    private void Publish(EventEnvelope e) { foreach (var callback in subscribers.ToArray()) callback(Clone(e)); }
    private bool EventVisible(Actor actor, EventEnvelope e) { if (e.AggregateType == "demo") return true; var item = state.Exceptions.FirstOrDefault(x => x.Id == e.AggregateId); return item is not null && AccessPolicy.CanSee(actor, item); }
    private static bool Verified(FollowUpObservation observation, RetailException item) => item.MetricDirection == "gte" ? observation.MetricValue >= item.MetricTarget : observation.MetricValue <= item.MetricTarget;
    private void ValidateHandoff(RetailException item, CommandRequest input)
    {
        var target = SessionStore.FindActor(input.TargetActorId ?? "") ?? throw new ApiException(422, "invalid_handoff_target", "Handoff target must be an on-shift actor at the same store.");
        if (target.Id == item.OwnerActorId || target.StoreId != item.StoreId || !AccessPolicy.CanSee(target, item)) throw new ApiException(422, "invalid_handoff_target", "Handoff target must be an on-shift actor at the same store.");
        if (!OnShiftUnlocked(target)) throw new ApiException(422, "target_not_on_shift", "Handoff target is not on shift.");
    }
    private static void Validate(string command, CommandRequest input, RetailException item)
    {
        if (command == "act" && (string.IsNullOrWhiteSpace(input.ActionCode) || !item.AllowedActions.Any(x => x.Code == input.ActionCode))) throw new ApiException(422, "invalid_action_code", "action_code must be one of the exception's allowed_actions.");
        if (command == "suppress") { var allowed = new[] { "duplicate", "planned_work", "bad_signal", "accepted_risk", "other" }; if (input.Reason is null || !allowed.Contains(input.Reason)) throw new ApiException(422, "invalid_suppression_reason", "Use a bounded suppression reason."); if (input.Reason == "other" && string.IsNullOrWhiteSpace(input.ActionCode)) throw new ApiException(422, "detail_required", "Other suppression requires detail in action_code."); }
        if (command == "snooze" && input.SnoozeMinutes is not (15 or 30 or 60 or 120)) throw new ApiException(422, "invalid_snooze_window", "snooze_minutes must be one of 15, 30, 60, or 120.");
        if (command != "snooze" && input.SnoozeMinutes is not null) throw new ApiException(422, "unexpected_snooze_window", "snooze_minutes is accepted only by the snooze command.");
        var hasEscalationFields = input.EscalationReason is not null || input.EscalationSeverity is not null || input.EscalationTrend is not null;
        if (command != "escalate" && hasEscalationFields) throw new ApiException(422, "unexpected_escalation_fields", "Escalation fields are accepted only by the escalate command.");
        if (command == "escalate")
        {
            if (input.EscalationReason is not ("inactivity" or "lack_of_progress" or "customer_deadline")) throw new ApiException(422, "invalid_escalation_reason", "escalation_reason must be inactivity, lack_of_progress, or customer_deadline.");
            if (input.EscalationSeverity is not ("high" or "medium")) throw new ApiException(422, "invalid_escalation_severity", "escalation_severity must be high or medium.");
            if (input.EscalationTrend is not ("improving" or "same" or "declining")) throw new ApiException(422, "invalid_escalation_trend", "escalation_trend must be improving, same, or declining.");
        }
        if (command == "deescalate" && string.IsNullOrWhiteSpace(input.Reason)) throw new ApiException(422, "deescalation_justification_required", "De-escalation requires a non-blank reason as justification.");
        var proofs = input.Proofs ?? [];
        if (command != "verify" && proofs.Count > 0) throw new ApiException(422, "unexpected_proof", "Proof is accepted only by the verify command.");
        if (proofs.Any(x => string.IsNullOrWhiteSpace(x.Type) || x.Type != item.RequiredProofType)) throw new ApiException(422, "invalid_proof_type", "Proof types must match the exception policy.");
        if (command == "verify" && !proofs.Any(x => x.Type == item.RequiredProofType && !string.IsNullOrWhiteSpace(x.Value))) throw new ApiException(422, "proof_required", $"Verification requires non-empty {item.RequiredProofType} proof before the source metric is rechecked.");
        if (input.Reason?.Length > 500 || input.ActionCode?.Length > 200 || proofs.Count > 4 || proofs.Any(x => (x.Type?.Length ?? 0) > 64 || (x.Value?.Length ?? 0) > 256 || x.SourceRef?.Length > 256) || proofs.Sum(x => (x.Type?.Length ?? 0) + (x.Value?.Length ?? 0) + (x.SourceRef?.Length ?? 0)) > 1024) throw new ApiException(422, "input_too_large", "Command fields exceed bounded limits.");
        if (command == "handoff" && string.IsNullOrWhiteSpace(input.TargetActorId)) throw new ApiException(422, "invalid_handoff_target", "Handoff requires target_actor_id.");
    }
    private static IReadOnlyList<Proof> RecordProofs(RetailException item, IReadOnlyList<Proof> submissions)
    {
        if (submissions.Count == 0) return [];
        foreach (var proof in submissions)
            if (!item.AvailableProofs.Any(artifact => artifact.Type == proof.Type && artifact.ArtifactRef == proof.Value && artifact.SourceRef == proof.SourceRef))
                throw new ApiException(422, "invalid_proof_reference", "Proof must match a server-issued artifact for this exception.");
        var recorded = submissions.Select(proof => proof with { Id = ProofId(item, proof) }).ToArray();
        var priorIds = item.Timeline.SelectMany(entry => entry.Proofs).Select(proof => proof.Id ?? ProofId(item, proof)).ToHashSet(StringComparer.Ordinal);
        if (recorded.Select(proof => proof.Id).Distinct(StringComparer.Ordinal).Count() != recorded.Length || recorded.Any(proof => priorIds.Contains(proof.Id!))) throw new ApiException(422, "proof_already_used", "Each proof artifact can be admitted only once for an exception.");
        return recorded;
    }
    private static string ProofId(RetailException item, Proof proof) => "proof_" + Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes($"{item.TenantId}|{item.Id}|{item.SourceId}|{proof.Type}|{proof.Value}|{proof.SourceRef}"))).ToLowerInvariant()[..24];
    private void WakeDueSnoozes()
    {
        var now = DateTimeOffset.UtcNow;
        var due = state.Exceptions.Where(item => item.State == "snoozed" && item.SnoozedUntil <= now).ToArray();
        if (due.Length == 0) return;
        var system = new Actor("system-policy", "system", "Policy clock", "System", null, null) { Capabilities = ["read_tenant"] };
        foreach (var item in due)
        {
            var wakeAt = item.SnoozedUntil;
            item.State = "active";
            item.SnoozedUntil = null;
            item.Version++;
            var key = $"wake:{item.Id}:{wakeAt:O}";
            var fingerprint = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(key))).ToLowerInvariant();
            var entry = new TimelineEntry(Guid.NewGuid().ToString("n"), system.Id, system.Role, now, "Policy snooze window elapsed", "wake", null, null, [], key, true, item.State, null, Digest(system, item, "wake", key, now, fingerprint, null));
            item.Timeline.Add(entry);
            Publish(Append(item, "wake", entry));
        }
        Persist();
    }
    private static string Fingerprint(CommandRequest input) => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(JsonSerializer.Serialize(input, Json)))).ToLowerInvariant();
    private static string Digest(Actor actor, RetailException item, string command, string key, DateTimeOffset at, string fingerprint, string? observationRef) => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes($"{actor.Id}|{item.Id}|{command}|{key}|{at:O}|{fingerprint}|{observationRef}"))).ToLowerInvariant();
    private static T Clone<T>(T value) => JsonSerializer.Deserialize<T>(JsonSerializer.Serialize(value, Json), Json)!;
    private List<ExceptionClassPolicy> CurrentPolicies()
    {
        EnsurePolicies();
        return Clone(state.Policies);
    }
    private void EnsurePolicies()
    {
        if (state.Policies.Count > 0) return;
        state.Policies = ExceptionPolicy.DefaultPolicies().ToList();
    }
    private void EnsureShifts()
    {
        if (state.Shifts.Count > 0) return;
        state.Shifts = SeededShifts();
    }
    private static List<ShiftPresence> SeededShifts()
    {
        var now = DateTimeOffset.UtcNow;
        return SessionStore.StoreActors().Select(actor => new ShiftPresence { ActorId = actor.Id, DisplayName = actor.DisplayName, Role = actor.Role, StoreId = actor.StoreId!, Department = actor.Department, OnShift = true, ClockedAt = now }).ToList();
    }
    private bool OnShiftUnlocked(Actor actor) => !AccessPolicy.RequiresShift(actor) || state.Shifts.Any(x => x.ActorId == actor.Id && x.StoreId == actor.StoreId && x.OnShift);
    private static bool CanViewStore(Actor actor, string storeId)
    {
        if (actor.Capabilities.Contains("read_tenant")) return true;
        if (actor.StoreId == storeId) return true;
        return actor.Capabilities.Contains("read_district") && ExceptionPolicy.Stores.TryGetValue(storeId, out var store) && store.District == actor.DistrictId;
    }
    private ShiftPresence RequireOwnShift(Actor actor, string storeId)
    {
        if (!AccessPolicy.RequiresShift(actor) || actor.StoreId != storeId) throw new ApiException(403, "forbidden", "Shift presence is scoped to the actor's store.");
        var shift = state.Shifts.FirstOrDefault(x => x.ActorId == actor.Id && x.StoreId == storeId);
        if (shift is null)
        {
            shift = new ShiftPresence { ActorId = actor.Id, DisplayName = actor.DisplayName, Role = actor.Role, StoreId = storeId, Department = actor.Department, OnShift = false };
            state.Shifts.Add(shift);
        }
        return shift;
    }
    private void ReturnToRole(RetailException item, Actor actor, DateTimeOffset at)
    {
        item.OwnerKind = "role";
        item.OwnerActorId = null;
        item.AssignedOwner = item.RoleOwner;
        item.Version++;
        var key = $"return:{item.Id}:{at:O}";
        var fingerprint = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(key))).ToLowerInvariant();
        var entry = new TimelineEntry(Guid.NewGuid().ToString("n"), actor.Id, actor.Role, at, "Owner clocked out", "return_to_role", null, null, [], key, true, item.State, item.SnoozedUntil, Digest(actor, item, "return_to_role", key, at, fingerprint, null));
        item.Timeline.Add(entry);
        Publish(Append(item, "return_to_role", entry));
    }
    private static void AssignOwner(RetailException item, Actor owner)
    {
        item.OwnerKind = "person";
        item.OwnerActorId = owner.Id;
        item.AssignedOwner = owner.DisplayName;
    }
    private static void RequirePolicy(Actor actor)
    {
        if (!actor.Capabilities.Contains("publish_policy")) throw new ApiException(403, "forbidden", "Class policy requires the publish_policy capability.");
    }
    private static void RequireHqRead(Actor actor)
    {
        if (!actor.Capabilities.Contains("read_tenant")) throw new ApiException(403, "forbidden", "Proof and policy metrics require headquarters read.");
    }
    private static bool CanSeeAdmission(Actor actor, CommandAdmission admission) => admission.ActorId == actor.Id || actor.Capabilities.Contains("read_tenant");
    private ExceptionClassPolicy MutatePolicy(Actor actor, string exceptionClass, PolicyDraft draft, bool persist, bool? publish)
    {
        RequirePolicy(actor);
        EnsurePolicies();
        var policy = state.Policies.FirstOrDefault(x => x.Class == exceptionClass) ?? throw new ApiException(404, "not_found", "Exception class policy not found.");
        if (draft.ThresholdScore is not null) policy.ThresholdScore = draft.ThresholdScore.Value;
        if (draft.VolumeBudget is not null) policy.VolumeBudget = draft.VolumeBudget.Value;
        if (publish is not null) policy.Published = publish.Value;
        if (persist) Persist();
        return policy;
    }
    private PolicyReceipt Receipt(ExceptionClassPolicy policy) =>
        new(policy.Class, policy.Label, policy.Published, policy.ThresholdScore, policy.VolumeBudget, state.Exceptions.Count(x => x.SourceType == policy.Class && x.State is not ("resolved" or "suppressed")));
    private CommandAdmission Admit(string dedupeKey, Actor actor, string id, string command, string fingerprint, DateTimeOffset now)
    {
        if (!state.Admissions.TryGetValue(dedupeKey, out var admission))
        {
            admission = new CommandAdmission { CommandId = keyFrom(dedupeKey), ActorId = actor.Id, AggregateId = id, Command = command, Fingerprint = fingerprint, Status = "accepted", AcceptedAt = now, States = [new CommandState("accepted", now)] };
            state.Admissions[dedupeKey] = admission;
        }
        admission.Status = "running";
        admission.States.Add(new CommandState("running", now));
        return admission;
    }
    private static string keyFrom(string dedupeKey)
    {
        var index = dedupeKey.IndexOf(':');
        return index < 0 ? dedupeKey : dedupeKey[(index + 1)..];
    }
    private static void Complete(CommandAdmission admission, long sequence, DateTimeOffset now)
    {
        admission.Status = "completed";
        admission.Sequence = sequence;
        admission.CompletedAt = now;
        admission.ErrorCode = null;
        admission.States.Add(new CommandState("completed", now));
    }
    private static void Fail(CommandAdmission admission, string code, DateTimeOffset now)
    {
        admission.Status = "failed";
        admission.ErrorCode = code;
        admission.CompletedAt = now;
        admission.States.Add(new CommandState("failed", now, code));
    }
    private sealed class Subscription(List<Action<EventEnvelope>> all, Action<EventEnvelope> callback, object gate) : IDisposable { public void Dispose() { lock (gate) all.Remove(callback); } }
}
public class ApiException(int status, string code, string message) : Exception(message) { public int Status { get; } = status; public string Code { get; } = code; }
public sealed class ConflictException(RetailException item) : ApiException(409, "version_conflict", "Exception version is stale.") { public RetailException Item { get; } = item; }
