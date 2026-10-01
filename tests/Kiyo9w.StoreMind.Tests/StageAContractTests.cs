using System.Text.Json.Nodes;
using Kiyo9w.StoreMind.Service;
using Xunit;

namespace Kiyo9w.StoreMind.Tests;

public sealed class StageAContractTests
{
    private static readonly Actor Clerk = new("actor-clerk", "clerk", "Avery Clerk", "StoreClerk", "store-001", "district-01") { Department = "grocery", Assignments = ["grocery"], Capabilities = ["read_assignment", "command_exception"] };
    private static readonly Actor Lead = new("actor-lead", "lead", "Morgan Lead", "DepartmentOwner", "store-001", "district-01") { Department = "grocery", Capabilities = ["read_department", "command_exception"] };
    private static readonly Actor WestLead = new("actor-lead-west", "lead-west", "Rowan West", "DepartmentOwner", "store-002", "district-01") { Department = "grocery", Capabilities = ["read_department", "command_exception"] };
    private static readonly Actor District = new("actor-district", "district", "Casey District", "DistrictManager", null, "district-01") { Capabilities = ["read_district", "command_exception"] };
    private static readonly Actor Hq = new("actor-hq", "hq", "Taylor Headquarters", "Headquarters", null, null) { Capabilities = ["read_tenant", "command_exception", "demo_reset", "publish_policy"] };
    private static readonly CommandRequest Empty = new(null, null, null);

    [Fact]
    public void seeded_shift_places_store_roles_on_shift_and_keeps_exceptions_on_the_role_queue()
    {
        using var state = TestState.Create();
        var shifts = state.Store.Shifts(Lead, "store-001");
        Assert.Equal(2, shifts.Count(x => x.OnShift));
        Assert.Contains(shifts, x => x.ActorId == Lead.Id && x.OnShift);
        Assert.Contains(shifts, x => x.ActorId == Clerk.Id && x.OnShift);
        Assert.DoesNotContain(state.Store.Shifts(WestLead, "store-002"), x => x.ActorId == Lead.Id);

        var item = state.Store.Find(Lead, "exc-001")!;
        Assert.Equal("role", item.OwnerKind);
        Assert.Null(item.OwnerActorId);
        Assert.Equal("Grocery department owner", item.AssignedOwner);
        Assert.Contains("claim", AccessPolicy.Allowed(Lead, item, true));
    }

    [Fact]
    public void claim_binds_a_named_on_shift_owner_and_handoff_moves_it_to_another_on_shift_actor()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var claimed = state.Store.Execute(Lead, item.Id, "claim", "claim-lead", item.Version, Empty);
        Assert.Equal("person", claimed.Exception.OwnerKind);
        Assert.Equal(Lead.Id, claimed.Exception.OwnerActorId);
        Assert.Equal("Morgan Lead", claimed.Exception.AssignedOwner);
        Assert.Contains("handoff", claimed.AllowedCommands);
        Assert.DoesNotContain("claim", claimed.AllowedCommands);

        var handed = state.Store.Execute(Lead, item.Id, "handoff", "handoff-clerk", claimed.Exception.Version, new(null, null, null, TargetActorId: Clerk.Id));
        Assert.Equal(Clerk.Id, handed.Exception.OwnerActorId);
        Assert.Equal("Avery Clerk", handed.Exception.AssignedOwner);
        Assert.Equal("person", handed.Exception.OwnerKind);
        Assert.Equal("handoff", handed.Exception.Timeline[^1].ActionCode);
    }

    [Fact]
    public void clock_out_returns_named_ownership_to_the_role_queue_and_blocks_store_commands_until_clock_in()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var claimed = state.Store.Execute(Lead, item.Id, "claim", "claim-before-out", item.Version, Empty);

        var shift = state.Store.ClockOut(Lead, "store-001");
        Assert.False(shift.OnShift);
        var returned = state.Store.Find(Lead, item.Id)!;
        Assert.Equal("role", returned.OwnerKind);
        Assert.Null(returned.OwnerActorId);
        Assert.Equal("Grocery department owner", returned.AssignedOwner);
        Assert.True(returned.Version > claimed.Exception.Version);
        Assert.Equal("return_to_role", returned.Timeline[^1].ActionCode);

        var denied = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "acknowledge", "off-shift-ack", returned.Version, Empty));
        Assert.Equal((403, "not_on_shift"), (denied.Status, denied.Code));

        state.Store.ClockIn(Lead, "store-001");
        var acknowledged = state.Store.Execute(Lead, item.Id, "acknowledge", "on-shift-ack", returned.Version, Empty);
        Assert.Equal("acknowledged", acknowledged.Exception.State);

        var districtAck = state.Store.Execute(District, "exc-002", "acknowledge", "district-no-clock", 1, Empty);
        Assert.Equal("acknowledged", districtAck.Exception.State);
    }

    [Fact]
    public void handoff_rejects_off_shift_and_cross_store_targets()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var claimed = state.Store.Execute(Lead, item.Id, "claim", "claim-handoff-guard", item.Version, Empty);
        state.Store.ClockOut(Clerk, "store-001");

        var offShift = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "handoff", "handoff-off", claimed.Exception.Version, new(null, null, null, TargetActorId: Clerk.Id)));
        Assert.Equal("target_not_on_shift", offShift.Code);

        state.Store.ClockIn(Clerk, "store-001");
        var crossStore = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "handoff", "handoff-west", claimed.Exception.Version, new(null, null, null, TargetActorId: WestLead.Id)));
        Assert.Equal("invalid_handoff_target", crossStore.Code);
    }

    [Fact]
    public void restart_preserves_shift_presence_and_named_ownership()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        state.Store.Execute(Lead, item.Id, "claim", "claim-durable", item.Version, Empty);
        state.Store.ClockOut(Clerk, "store-001");

        var restarted = new StateStore(new FixtureSource(), state.Path);
        restarted.Initialize();
        Assert.False(restarted.Shifts(Lead, "store-001").Single(x => x.ActorId == Clerk.Id).OnShift);
        var persisted = restarted.Find(Lead, item.Id)!;
        Assert.Equal(Lead.Id, persisted.OwnerActorId);
        Assert.Equal("Morgan Lead", persisted.AssignedOwner);
    }

    [Fact]
    public void headquarters_can_preview_publish_and_unpublish_class_policy_without_erasing_live_exceptions()
    {
        using var state = TestState.Create();
        var live = state.Store.Find(Hq, "exc-001")!;
        Assert.Equal("stockout_signal", live.SourceType);

        var denied = Assert.Throws<ApiException>(() => state.Store.UnpublishPolicy(Lead, "stockout_signal"));
        Assert.Equal("forbidden", denied.Code);

        var preview = state.Store.PreviewPolicy(Hq, "stockout_signal", new PolicyDraft(ThresholdScore: 400, VolumeBudget: 1));
        Assert.True(preview.WouldExceedBudget);

        var unpublished = state.Store.UnpublishPolicy(Hq, "stockout_signal");
        Assert.False(unpublished.Published);
        Assert.Equal("stockout_signal", state.Store.Find(Hq, "exc-001")!.SourceType);

        var reset = state.Store.Reset(Hq, "policy-reset");
        Assert.DoesNotContain(state.Store.Snapshot(Hq, null, null).Items, x => x.SourceType == "stockout_signal");
        Assert.Contains(state.Store.Snapshot(Hq, null, null).Items, x => x.SourceType == "pickup_breach");
        Assert.Equal(reset.Sequence, state.Store.Snapshot(Hq, null, null).Sequence);

        var published = state.Store.PublishPolicy(Hq, "stockout_signal", new PolicyDraft(VolumeBudget: 4));
        Assert.True(published.Published);
        state.Store.Reset(Hq, "policy-reset-2");
        Assert.Contains(state.Store.Snapshot(Hq, null, null).Items, x => x.SourceType == "stockout_signal");
    }

    [Fact]
    public void headquarters_proof_console_lists_recorded_proof_and_completion_metrics()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var acted = state.Store.Execute(Lead, item.Id, "act", "proof-act", item.Version, new(null, "replenish_shelf", null));
        var failed = state.Store.Execute(Lead, item.Id, "verify", "proof-verify-fail", acted.Exception.Version,
            new(null, null, [new Proof("shelf_photo", "fixture://src-001/shelf_photo/1", "/assets/fixtures.svg#shelf-gap")]));
        var reacted = state.Store.Execute(Lead, item.Id, "act", "proof-act-2", failed.Exception.Version, new(null, "replenish_shelf", null));
        state.Store.Execute(Lead, item.Id, "verify", "proof-verify", reacted.Exception.Version,
            new(null, null, [new Proof("shelf_photo", "fixture://src-001/shelf_photo/2", "/assets/fixtures.svg#shelf-gap")]));

        var proofs = state.Store.Proofs(Hq);
        Assert.Equal(2, proofs.Count(x => x.ExceptionId == item.Id));
        Assert.All(proofs.Where(x => x.ExceptionId == item.Id), recorded =>
        {
            Assert.StartsWith("proof_", recorded.ProofId);
            Assert.Equal("shelf_photo", recorded.Type);
        });

        var clerkDenied = Assert.Throws<ApiException>(() => state.Store.Proofs(Clerk));
        Assert.Equal("forbidden", clerkDenied.Code);

        var metrics = state.Store.PolicyMetrics(Hq);
        Assert.True(metrics.ResolvedCount >= 1);
        Assert.True(metrics.ProofCount >= 1);
        Assert.InRange(metrics.CompletionRate, 0, 1);
    }

    [Fact]
    public void admitted_commands_expose_accepted_running_completed_or_failed_server_state()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var receipt = state.Store.Execute(Lead, item.Id, "acknowledge", "admit-ok", item.Version, Empty);
        Assert.Equal("completed", receipt.Status);
        Assert.NotNull(receipt.AcceptedAt);
        Assert.NotNull(receipt.CompletedAt);

        var admission = state.Store.Command(Lead, "admit-ok");
        Assert.Equal("completed", admission.Status);
        Assert.Equal(receipt.Sequence, admission.Sequence);
        Assert.Equal(new[] { "accepted", "running", "completed" }, admission.States.Select(x => x.Status).ToArray());

        var failed = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "act", "admit-fail", receipt.Exception.Version, new(null, "invented_action", null)));
        Assert.Equal("invalid_action_code", failed.Code);
        var failedAdmission = state.Store.Command(Lead, "admit-fail");
        Assert.Equal("failed", failedAdmission.Status);
        Assert.Equal("invalid_action_code", failedAdmission.ErrorCode);
        Assert.Equal(receipt.Exception.Version, state.Store.Find(Lead, item.Id)!.Version);

        var replayed = state.Store.Execute(Lead, item.Id, "acknowledge", "admit-ok", item.Version, Empty);
        Assert.Equal((receipt.CommandId, receipt.Sequence, "completed"), (replayed.CommandId, replayed.Sequence, replayed.Status));

        var visible = state.Store.Commands(Lead, item.Id);
        Assert.Contains(visible, x => x.CommandId == "admit-ok" && x.Status == "completed");
        Assert.Contains(visible, x => x.CommandId == "admit-fail" && x.Status == "failed");
    }

    [Fact]
    public void command_admission_survives_restart_and_is_scoped_to_the_actor()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        state.Store.Execute(Lead, item.Id, "acknowledge", "admit-restart", item.Version, Empty);

        var restarted = new StateStore(new FixtureSource(), state.Path);
        restarted.Initialize();
        Assert.Equal("completed", restarted.Command(Lead, "admit-restart").Status);
        var hidden = Assert.Throws<ApiException>(() => restarted.Command(Clerk, "admit-restart"));
        Assert.Equal("not_found", hidden.Code);
        Assert.Contains(restarted.Commands(Hq, item.Id), x => x.CommandId == "admit-restart");
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
}
