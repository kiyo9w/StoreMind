using System.Text.Json.Nodes;
using Kiyo9w.StoreMind.Service;
using Xunit;

namespace Kiyo9w.StoreMind.Tests;

public sealed class ExceptionServiceContractTests
{
    private static readonly Actor Clerk = new("actor-clerk", "clerk", "Avery Clerk", "StoreClerk", "store-001", "district-01") { Department = "grocery", Assignments = ["grocery"], Capabilities = ["read_assignment", "command_exception"] };
    private static readonly Actor Lead = new("actor-lead", "lead", "Morgan Lead", "DepartmentOwner", "store-001", "district-01") { Department = "grocery", Capabilities = ["read_department", "command_exception"] };
    private static readonly Actor WestLead = new("actor-lead-west", "lead-west", "Rowan West", "DepartmentOwner", "store-002", "district-01") { Department = "grocery", Capabilities = ["read_department", "command_exception"] };
    private static readonly Actor District = new("actor-district", "district", "Casey District", "DistrictManager", null, "district-01") { Capabilities = ["read_district", "command_exception"] };
    private static readonly Actor Hq = new("actor-hq", "hq", "Taylor Headquarters", "Headquarters", null, null) { Capabilities = ["read_tenant", "command_exception", "demo_reset", "publish_policy"] };
    private static readonly CommandRequest Empty = new(null, null, null);

    [Fact]
    public void fixtures_create_exactly_eight_deduplicated_ranked_exceptions_with_a_four_per_store_cap()
    {
        using var state = TestState.Create();
        var items = state.Store.Snapshot(Hq, null, null).Items;

        Assert.Equal(8, items.Count);
        Assert.Equal(8, items.Select(x => x.SourceId).Distinct().Count());
        Assert.Equal(new[] { "pickup_breach", "planogram_task", "refund_anomaly", "stockout_signal" },
            items.Select(x => x.SourceType).Distinct().Order().ToArray());
        Assert.Equal(new[] { "exc-005", "exc-001", "exc-002", "exc-008", "exc-004", "exc-006", "exc-003", "exc-007" },
            items.Select(x => x.Id).ToArray());
        Assert.All(items.GroupBy(x => x.StoreId), group => Assert.InRange(group.Count(), 1, 4));

        Assert.All(items, item =>
        {
            Assert.NotEmpty(item.AssignedOwner);
            Assert.NotEqual(default, item.DueAt);
            Assert.NotEmpty(item.ItemLocation);
            Assert.NotEmpty(item.InactionConsequence);
            Assert.Equal(item.RankScore, item.UrgencyPoints + item.ImpactPoints + item.ConfidencePoints + item.AgePoints);
        });
        Assert.All(items.Select((item, index) => (item, index)), ranked =>
            Assert.StartsWith($"Global rank #{ranked.index + 1} of {items.Count}.", ranked.item.RankExplanation));

        var capped = ExceptionPolicy.Evaluate(new CappedSource().Read());
        Assert.Equal(4, capped.Count);
        Assert.Equal(new[] { "cap-5", "cap-4", "cap-3", "cap-2" }, capped.Select(x => x.SourceId).ToArray());
    }

    [Fact]
    public void access_policy_enforces_store_district_and_headquarters_visibility_and_denies_commands()
    {
        using var state = TestState.Create();
        Assert.All(state.Store.Snapshot(Lead, null, null).Items, x => Assert.Equal("store-001", x.StoreId));
        Assert.Equal(new[] { "store-001", "store-002" }, state.Store.Snapshot(District, null, null).Items.Select(x => x.StoreId).Distinct().Order().ToArray());
        Assert.Equal(8, state.Store.Snapshot(Hq, null, null).Items.Count);
        Assert.Null(state.Store.Find(Lead, "exc-005"));
        var denied = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, "exc-005", "acknowledge", "denied", 1, Empty));
        Assert.Equal((403, "forbidden"), (denied.Status, denied.Code));
        Assert.DoesNotContain("suppress", AccessPolicy.Allowed(Clerk, state.Store.Find(Clerk, "exc-001")!));
    }

    [Fact]
    public void lifecycle_exposes_only_legal_actions_and_rejects_unlisted_action_codes()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        Assert.Equal(new[] { "claim", "acknowledge", "act", "snooze", "suppress", "escalate" }, AccessPolicy.Allowed(Lead, item));

        var acknowledged = state.Store.Execute(Lead, item.Id, "acknowledge", "life-1", item.Version, Empty);
        Assert.Equal("acknowledged", acknowledged.Exception.State);
        Assert.Equal(new[] { "claim", "act", "snooze", "suppress", "escalate" }, acknowledged.AllowedCommands);

        var invalid = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "act", "life-invalid", acknowledged.Exception.Version,
            new(null, "invented_action", null)));
        Assert.Equal("invalid_action_code", invalid.Code);
        Assert.Equal(acknowledged.Exception.Version, state.Store.Find(Lead, item.Id)!.Version);

        var acted = state.Store.Execute(Lead, item.Id, "act", "life-2", acknowledged.Exception.Version,
            new("Shelf replenished", "replenish_shelf", null));
        Assert.Equal("in_progress", acted.Exception.State);
        Assert.Equal(new[] { "claim", "snooze", "suppress", "escalate", "verify" }, acted.AllowedCommands);
        Assert.Equal("replenish_shelf", acted.Exception.Timeline[^1].ActionCode);
    }

    [Fact]
    public void verification_uses_originating_source_observations_to_reopen_then_resolve()
    {
        using var state = TestState.Create();
        var active = state.Store.Find(WestLead, "exc-005")!;
        var acted = state.Store.Execute(WestLead, active.Id, "act", "verify-act", active.Version,
            new(null, "replenish_shelf", null));

        var failed = state.Store.Execute(WestLead, active.Id, "verify", "verify-fail", acted.Exception.Version,
            new("Recheck", null, [new Proof("shelf_photo", "fixture://src-005/shelf_photo/1", "/assets/fixtures.svg#shelf-gap")]));
        Assert.Equal("active", failed.Exception.State);
        Assert.False(failed.Exception.Timeline[^1].Succeeded);
        Assert.Equal("active", failed.Exception.Timeline[^1].StateAfter);
        Assert.Equal(2, failed.Exception.CurrentMetricValue);
        Assert.Equal(2, failed.Exception.Timeline[^1].MetricValue);
        Assert.Equal("fixture://src-005/follow-up/1", failed.Exception.Timeline[^1].MetricSourceRef);
        var failedProof = Assert.Single(failed.Exception.Timeline[^1].Proofs);
        Assert.StartsWith("proof_", failedProof.Id);
        Assert.Equal("fixture://src-005/shelf_photo/1", failedProof.ArtifactRef);
        Assert.Equal("verification_failed", Assert.Single(state.Store.Replay(WestLead, acted.Sequence)!).Type);

        var reacted = state.Store.Execute(WestLead, active.Id, "act", "verify-react", failed.Exception.Version,
            new(null, "replenish_shelf", null));
        var resolved = state.Store.Execute(WestLead, active.Id, "verify", "verify-pass", reacted.Exception.Version,
            new("Recheck", null, [new Proof("shelf_photo", "fixture://src-005/shelf_photo/2", "/assets/fixtures.svg#shelf-gap")]));
        Assert.Equal("resolved", resolved.Exception.State);
        Assert.True(resolved.Exception.Timeline[^1].Succeeded);
        Assert.Equal("resolved", resolved.Exception.Timeline[^1].StateAfter);
        Assert.Equal(4, resolved.Exception.Timeline[^1].MetricValue);
        Assert.Equal(4, resolved.Exception.CurrentMetricValue);
        var restarted = new StateStore(new FixtureSource(), state.Path);
        restarted.Initialize();
        Assert.Equal(4, restarted.Find(WestLead, active.Id)!.CurrentMetricValue);
        Assert.Equal("fixture://src-005/follow-up/2", resolved.Exception.Timeline[^1].MetricSourceRef);
        Assert.NotEqual(failedProof.Id, Assert.Single(resolved.Exception.Timeline[^1].Proofs).Id);
        Assert.Equal(new[] { "reopen" }, resolved.AllowedCommands);
        Assert.DoesNotContain(state.Store.Snapshot(WestLead, null, "active").Items, x => x.Id == active.Id);
    }

    [Theory]
    [InlineData("duplicate")]
    [InlineData("planned_work")]
    [InlineData("bad_signal")]
    [InlineData("accepted_risk")]
    public void suppression_accepts_each_bounded_taxonomy_value(string reason)
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var receipt = state.Store.Execute(Lead, item.Id, "suppress", $"suppress-{reason}", item.Version, new(reason, null, null));
        Assert.Equal("suppressed", receipt.Exception.State);
        Assert.Equal(reason, receipt.Exception.Timeline[^1].Reason);
    }

    [Fact]
    public void suppression_rejects_unknown_reason_and_requires_detail_for_other()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        Assert.Equal("invalid_suppression_reason", Assert.Throws<ApiException>(() =>
            state.Store.Execute(Lead, item.Id, "suppress", "bad-taxonomy", item.Version, new("temporary", null, null))).Code);
        Assert.Equal("detail_required", Assert.Throws<ApiException>(() =>
            state.Store.Execute(Lead, item.Id, "suppress", "other-empty", item.Version, new("other", null, null))).Code);
        var receipt = state.Store.Execute(Lead, item.Id, "suppress", "other-detail", item.Version, new("other", "Vendor-confirmed exception", null));
        Assert.Equal("suppressed", receipt.Exception.State);
    }

    [Fact]
    public void proof_payloads_are_command_scoped_policy_typed_and_bounded()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var unexpected = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "act", "proof-on-act", item.Version,
            new(null, "replenish_shelf", [new Proof("shelf_photo", "photo", null)])));
        Assert.Equal("unexpected_proof", unexpected.Code);

        var acted = state.Store.Execute(Lead, item.Id, "act", "proof-act", item.Version, new(null, "replenish_shelf", null));
        var wrongType = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "verify", "proof-wrong", acted.Exception.Version,
            new(null, null, [new Proof("receipt_reference", "receipt", null)])));
        Assert.Equal("invalid_proof_type", wrongType.Code);
        var oversized = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "verify", "proof-large", acted.Exception.Version,
            new(null, null, [new Proof("shelf_photo", new string('x', 257), null)])));
        Assert.Equal("input_too_large", oversized.Code);

        var arbitrary = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "verify", "proof-arbitrary", acted.Exception.Version,
            new(null, null, [new Proof("shelf_photo", "photo-1", "/assets/fixtures.svg#shelf-gap")])));
        Assert.Equal("invalid_proof_reference", arbitrary.Code);
        var inventedArtifact = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "verify", "proof-invented-artifact", acted.Exception.Version,
            new(null, null, [new Proof("shelf_photo", "fixture://src-001/shelf_photo/999999", "/assets/fixtures.svg#shelf-gap")])));
        Assert.Equal("invalid_proof_reference", inventedArtifact.Code);
        var inventedSource = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "verify", "proof-invented-source", acted.Exception.Version,
            new(null, null, [new Proof("shelf_photo", "fixture://src-001/shelf_photo/1", "/assets/fixtures.svg#fabricated")])));
        Assert.Equal("invalid_proof_reference", inventedSource.Code);

        var verified = state.Store.Execute(Lead, item.Id, "verify", "proof-valid", acted.Exception.Version,
            new(null, null, [new Proof("shelf_photo", "fixture://src-001/shelf_photo/1", "/assets/fixtures.svg#shelf-gap")]));
        var recorded = Assert.Single(verified.Exception.Timeline[^1].Proofs);
        Assert.StartsWith("proof_", recorded.Id);
        Assert.Equal("fixture://src-001/shelf_photo/1", recorded.ArtifactRef);
        var reacted = state.Store.Execute(Lead, item.Id, "act", "proof-react", verified.Exception.Version, new(null, "replenish_shelf", null));
        var reused = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "verify", "proof-reused", reacted.Exception.Version,
            new(null, null, [new Proof("shelf_photo", "fixture://src-001/shelf_photo/1", "/assets/fixtures.svg#shelf-gap")])));
        Assert.Equal("proof_already_used", reused.Code);
    }

    [Fact]
    public void duplicate_command_requires_identical_payload_and_returns_one_transition()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var request = new CommandRequest("first", null, null);
        var first = state.Store.Execute(Lead, item.Id, "acknowledge", "same-key", item.Version, request);
        var duplicate = state.Store.Execute(Lead, item.Id, "acknowledge", "same-key", item.Version, request);
        Assert.Equal((first.CommandId, first.AggregateId, first.Command, first.Sequence),
            (duplicate.CommandId, duplicate.AggregateId, duplicate.Command, duplicate.Sequence));
        var conflict = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "acknowledge", "same-key", item.Version, new("changed", null, null)));
        Assert.Equal("idempotency_conflict", conflict.Code);
        Assert.Single(state.Store.Find(Lead, item.Id)!.Timeline);
        Assert.Single(state.Store.Replay(Lead, 0)!);
    }

    [Fact]
    public void idempotency_reuse_and_stale_versions_conflict_without_state_change()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var accepted = state.Store.Execute(Lead, item.Id, "acknowledge", "shared-key", item.Version, Empty);
        var before = state.Store.Find(Lead, item.Id)!;

        var reused = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "act", "shared-key", before.Version,
            new(null, "replenish_shelf", null)));
        Assert.Equal("idempotency_conflict", reused.Code);
        var stale = Assert.Throws<ConflictException>(() => state.Store.Execute(Lead, item.Id, "act", "fresh-key", item.Version,
            new(null, "replenish_shelf", null)));
        Assert.Equal(before.Version, stale.Item.Version);
        var after = state.Store.Find(Lead, item.Id)!;
        Assert.Equal((before.State, before.Version, before.Timeline.Count), (after.State, after.Version, after.Timeline.Count));
        Assert.Equal(accepted.Sequence, state.Store.Snapshot(Lead, null, null).Sequence);
    }

    [Fact]
    public void restart_rehydrates_state_sequence_receipts_and_dedupe()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var original = state.Store.Execute(Lead, item.Id, "acknowledge", "durable-key", item.Version, Empty);
        var restarted = new StateStore(new FixtureSource(), state.Path);
        restarted.Initialize();

        Assert.Equal(original.Sequence, restarted.Snapshot(Lead, null, null).Sequence);
        Assert.Equal("acknowledged", restarted.Find(Lead, item.Id)!.State);
        var duplicate = restarted.Execute(Lead, item.Id, "acknowledge", "durable-key", item.Version, Empty);
        Assert.Equal((original.CommandId, original.AggregateId, original.Command, original.Sequence),
            (duplicate.CommandId, duplicate.AggregateId, duplicate.Command, duplicate.Sequence));
        Assert.Single(restarted.Find(Lead, item.Id)!.Timeline);
    }

    [Fact]
    public void restart_backfills_current_policy_facts_without_losing_lifecycle_state()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Hq, "exc-002")!;
        state.Store.Execute(Hq, item.Id, "acknowledge", "migration-command", item.Version, Empty);
        var durable = JsonNode.Parse(File.ReadAllText(state.Path))!;
        foreach (var exception in durable["exceptions"]!.AsArray())
            foreach (var field in new[] { "assigned_owner", "due_at", "item_location", "inaction_consequence", "urgency_points", "impact_points", "confidence_points", "current_metric_value", "age_points", "rank_explanation" })
                exception!.AsObject().Remove(field);
        File.WriteAllText(state.Path, durable.ToJsonString());

        var restarted = new StateStore(new FixtureSource(), state.Path);
        restarted.Initialize();
        var migrated = restarted.Find(Hq, item.Id)!;
        Assert.Equal("acknowledged", migrated.State);
        Assert.Single(migrated.Timeline);
        Assert.NotEqual(default, migrated.DueAt);
        Assert.StartsWith("Global rank #", migrated.RankExplanation);
        Assert.Equal(14, migrated.CurrentMetricValue);
        Assert.Equal(migrated.RankScore, migrated.UrgencyPoints + migrated.ImpactPoints + migrated.ConfidencePoints + migrated.AgePoints);
    }

    [Fact]
    public void reset_is_hq_only_idempotent_deterministic_and_retains_monotonic_sequence()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var command = state.Store.Execute(Lead, item.Id, "acknowledge", "before-reset", item.Version, Empty);
        var denied = Assert.Throws<ApiException>(() => state.Store.Reset(District, "district-reset"));
        Assert.Equal("forbidden", denied.Code);
        var reset = state.Store.Reset(Hq, "hq-reset");
        var duplicate = state.Store.Reset(Hq, "hq-reset");

        Assert.Equal(command.Sequence + 1, reset.Sequence);
        Assert.Equal(reset, duplicate);
        var snapshot = state.Store.Snapshot(Hq, null, null);
        Assert.Equal(reset.Sequence, snapshot.Sequence);
        Assert.All(snapshot.Items, x => { Assert.Equal("active", x.State); Assert.Equal(1, x.Version); Assert.Empty(x.Timeline); });
        Assert.Equal(ExceptionPolicy.Evaluate(new FixtureSource().Read()).Select(x => x.Id), snapshot.Items.Select(x => x.Id));
        Assert.Equal("reset_required", Assert.Single(state.Store.Replay(Hq, command.Sequence)!).Type);
        Assert.Equal("reset_required", Assert.Single(state.Store.Replay(Clerk, command.Sequence)!).Type);
        Assert.Null(state.Store.Replay(Hq, reset.Sequence + 1));
    }

    [Fact]
    public void snooze_is_policy_bounded_durable_and_reopenable_by_store_user()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Clerk, "exc-001")!;
        var invalid = Assert.Throws<ApiException>(() => state.Store.Execute(Clerk, item.Id, "snooze", "snooze-invalid", item.Version, new("Waiting for delivery", null, null, 10)));
        Assert.Equal("invalid_snooze_window", invalid.Code);

        var before = DateTimeOffset.UtcNow;
        var snoozed = state.Store.Execute(Clerk, item.Id, "snooze", "snooze-valid", item.Version, new("Waiting for delivery", null, null, 60));
        Assert.Equal("snoozed", snoozed.Exception.State);
        Assert.True(snoozed.Exception.SnoozedUntil >= before.AddMinutes(60));
        Assert.Contains("reopen", snoozed.AllowedCommands);
        Assert.Equal(snoozed.Exception.SnoozedUntil, snoozed.Exception.Timeline.Single().SnoozedUntil);

        var restarted = new StateStore(new FixtureSource(), state.Path);
        restarted.Initialize();
        var persisted = restarted.Find(Clerk, item.Id)!;
        Assert.Equal("snoozed", persisted.State);
        Assert.Equal(snoozed.Exception.SnoozedUntil, persisted.SnoozedUntil);
        var reopened = restarted.Execute(Clerk, item.Id, "reopen", "snooze-reopen", persisted.Version, Empty);
        Assert.Equal("active", reopened.Exception.State);
        Assert.Null(reopened.Exception.SnoozedUntil);
    }

    [Fact]
    public void replay_rejects_retention_gaps_and_ahead_cursors()
    {
        using var state = TestState.Create();
        var version = state.Store.Find(Lead, "exc-001")!.Version;
        long sequence = 0;
        for (var cycle = 0; cycle < 51; cycle++)
        {
            state.Store.Execute(Lead, "exc-001", "acknowledge", $"replay-{cycle}-ack", version++, Empty);
            state.Store.Execute(Lead, "exc-001", "act", $"replay-{cycle}-act", version++, new(null, "replenish_shelf", null));
            state.Store.Execute(Lead, "exc-001", "suppress", $"replay-{cycle}-suppress", version++, new("accepted_risk", null, null));
            var reopened = state.Store.Execute(Lead, "exc-001", "reopen", $"replay-{cycle}-reopen", version++, Empty);
            sequence = reopened.Sequence;
        }

        Assert.Null(state.Store.Replay(Lead, 1));
        Assert.Null(state.Store.Replay(Lead, sequence + 1));
        Assert.Equal(sequence, Assert.Single(state.Store.Replay(Lead, sequence - 1)!).Sequence);
    }

    [Fact]
    public void command_path_operates_with_assistant_absent()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var receipt = state.Store.Execute(Lead, item.Id, "acknowledge", "no-assistant", item.Version, Empty);
        Assert.Equal("acknowledged", receipt.Exception.State);
        Assert.Equal("actor-lead", receipt.Exception.Timeline.Single().Actor);
        Assert.NotEmpty(receipt.Exception.Timeline.Single().Digest);
    }

    private sealed class TestState : IDisposable
    {
        private TestState(string directory)
        {
            Directory = directory;
            Path = System.IO.Path.Combine(directory, "state.json");
            Store = new StateStore(new FixtureSource(), Path);
            Store.Initialize();
        }

        public string Directory { get; }
        public string Path { get; }
        public StateStore Store { get; }
        public static TestState Create() => new(System.IO.Path.Combine(System.IO.Path.GetTempPath(), "storemind-tests", Guid.NewGuid().ToString("n")));
        public void Dispose() { if (System.IO.Directory.Exists(Directory)) System.IO.Directory.Delete(Directory, true); }
    }

    private sealed class CappedSource : IRetailSource
    {
        public IReadOnlyList<SourceRecord> Read() => Enumerable.Range(0, 6).Select(i =>
            new SourceRecord($"cap-{i}", "stockout_signal", "store-001", $"Item {i}", "Cap fixture", i + 1, i * 100, .9m, 0,
                new DateTimeOffset(2026, 9, 2, 7, 0, 0, TimeSpan.Zero), "shelf_photo", 1, "gte")).ToArray();
        public FollowUpObservation Recheck(string sourceId, int observationIndex) => new(sourceId, 1, new DateTimeOffset(2026, 9, 2, 8, 5, 0, TimeSpan.Zero), $"fixture://{sourceId}/follow-up/1");
    }
}
