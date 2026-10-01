using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Kiyo9w.StoreMind.Service;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Xunit;

namespace Kiyo9w.StoreMind.Tests;

public sealed class StageBContractTests
{
    private static readonly Actor Lead = new("actor-lead", "lead", "Morgan Lead", "DepartmentOwner", "store-001", "district-01") { Department = "grocery", Capabilities = ["read_department", "command_exception"] };
    private static readonly Actor District = new("actor-district", "district", "Casey District", "DistrictManager", null, "district-01") { Capabilities = ["read_district", "command_exception"] };

    [Theory]
    [InlineData("high", 4)]
    [InlineData("medium", 8)]
    public void escalation_requires_bounded_fields_sets_deadline_and_allows_only_one_active(string severity, int hours)
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var before = DateTimeOffset.UtcNow;
        var escalated = state.Store.Execute(Lead, item.Id, "escalate", $"escalate-{severity}", item.Version,
            new(null, null, null, EscalationReason: "lack_of_progress", EscalationSeverity: severity, EscalationTrend: "declining"));

        Assert.Equal("escalated", escalated.Exception.State);
        Assert.InRange(escalated.Exception.EscalatedAt!.Value, before, DateTimeOffset.UtcNow);
        Assert.Equal(hours, (escalated.Exception.EscalationDueAt - escalated.Exception.EscalatedAt)!.Value.TotalHours);
        Assert.Equal(("lack_of_progress", severity, "declining"), (escalated.Exception.EscalationReason, escalated.Exception.EscalationSeverity, escalated.Exception.EscalationTrend));
        Assert.DoesNotContain("escalate", escalated.AllowedCommands);
        Assert.Contains("deescalate", escalated.AllowedCommands);
        Assert.DoesNotContain("snooze", escalated.AllowedCommands);
        Assert.Equal(escalated.Exception.EscalationDueAt, escalated.Exception.Timeline[^1].EscalationDueAt);
        var duplicate = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "escalate", $"duplicate-{severity}", escalated.Exception.Version,
            new(null, null, null, EscalationReason: "inactivity", EscalationSeverity: severity, EscalationTrend: "same")));
        Assert.Equal("forbidden", duplicate.Code);
    }

    [Fact]
    public void escalation_fields_are_command_specific_and_bounded()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var unexpected = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "acknowledge", "unexpected-escalation", item.Version,
            new(null, null, null, EscalationReason: "inactivity")));
        Assert.Equal("unexpected_escalation_fields", unexpected.Code);

        foreach (var input in new[]
        {
            new CommandRequest(null, null, null, EscalationReason: "other", EscalationSeverity: "high", EscalationTrend: "same"),
            new CommandRequest(null, null, null, EscalationReason: "inactivity", EscalationSeverity: "critical", EscalationTrend: "same"),
            new CommandRequest(null, null, null, EscalationReason: "inactivity", EscalationSeverity: "high", EscalationTrend: "unknown")
        })
            Assert.Equal(422, Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "escalate", Guid.NewGuid().ToString("n"), item.Version, input)).Status);
    }

    [Fact]
    public void deescalation_requires_justification_and_preserves_escalation_history_across_restart()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var escalated = state.Store.Execute(Lead, item.Id, "escalate", "durable-escalation", item.Version,
            new(null, null, null, EscalationReason: "customer_deadline", EscalationSeverity: "high", EscalationTrend: "same"));
        var denied = Assert.Throws<ApiException>(() => state.Store.Execute(Lead, item.Id, "deescalate", "missing-justification", escalated.Exception.Version, new("  ", null, null)));
        Assert.Equal("deescalation_justification_required", denied.Code);

        var deescalated = state.Store.Execute(Lead, item.Id, "deescalate", "deescalate", escalated.Exception.Version, new("Customer deadline moved", null, null));
        Assert.Equal("active", deescalated.Exception.State);
        Assert.Equal("Customer deadline moved", deescalated.Exception.DeescalationJustification);
        Assert.NotNull(deescalated.Exception.DeescalatedAt);
        Assert.Equal(escalated.Exception.EscalatedAt, deescalated.Exception.EscalatedAt);
        Assert.Equal(escalated.Exception.EscalationDueAt, deescalated.Exception.EscalationDueAt);

        var restarted = new StateStore(new FixtureSource(), state.Path);
        restarted.Initialize();
        var persisted = restarted.Find(Lead, item.Id)!;
        Assert.Equal(deescalated.Exception.DeescalationJustification, persisted.DeescalationJustification);
        Assert.Equal(deescalated.Exception.EscalationReason, persisted.EscalationReason);
        Assert.Equal(new[] { "escalate", "deescalate" }, persisted.Timeline.TakeLast(2).Select(x => x.ActionCode));
    }

    [Fact]
    public void proof_source_recheck_contract_remains_unchanged_after_escalation()
    {
        using var state = TestState.Create();
        var item = state.Store.Find(Lead, "exc-001")!;
        var escalated = state.Store.Execute(Lead, item.Id, "escalate", "proof-escalate", item.Version,
            new(null, null, null, EscalationReason: "inactivity", EscalationSeverity: "medium", EscalationTrend: "same"));
        var acted = state.Store.Execute(Lead, item.Id, "act", "proof-act", escalated.Exception.Version, new(null, "replenish_shelf", null));
        Assert.Equal("escalated", acted.Exception.State);
        Assert.Contains("deescalate", acted.AllowedCommands);
        Assert.Equal(1, state.Store.StoreSummaries(Lead).Single().EscalatedCount);
        Assert.Equal(1, state.Store.DistrictSummaries(Lead).Single().EscalatedCount);
        var verified = state.Store.Execute(Lead, item.Id, "verify", "proof-verify", acted.Exception.Version,
            new(null, null, [new Proof("shelf_photo", "fixture://src-001/shelf_photo/1", "/assets/fixtures.svg#shelf-gap")]));
        Assert.Equal("escalated", verified.Exception.State);
        Assert.Contains("deescalate", verified.AllowedCommands);
        Assert.Equal(1, state.Store.StoreSummaries(Lead).Single().EscalatedCount);
        Assert.Equal(1, state.Store.DistrictSummaries(Lead).Single().EscalatedCount);
        Assert.Equal("fixture://src-001/follow-up/1", verified.Exception.Timeline[^1].MetricSourceRef);
        Assert.StartsWith("proof_", verified.Exception.Timeline[^1].Proofs.Single().Id);
        var reacted = state.Store.Execute(Lead, item.Id, "act", "proof-react", verified.Exception.Version, new(null, "replenish_shelf", null));
        var resolved = state.Store.Execute(Lead, item.Id, "verify", "proof-resolve", reacted.Exception.Version,
            new(null, null, [new Proof("shelf_photo", "fixture://src-001/shelf_photo/2", "/assets/fixtures.svg#shelf-gap")]));
        Assert.Equal("resolved", resolved.Exception.State);
        Assert.NotNull(resolved.Exception.ResolvedAt);
        Assert.Equal("verified", resolved.Exception.ClosureReason);
        Assert.Null(resolved.Exception.EscalatedAt);
        Assert.Null(resolved.Exception.EscalationDueAt);
        Assert.Null(resolved.Exception.EscalationReason);
        Assert.Null(resolved.Exception.EscalationSeverity);
        Assert.Null(resolved.Exception.EscalationTrend);
        var escalationHistory = Assert.Single(resolved.Exception.Timeline.Where(entry => entry.ActionCode == "escalate"));
        Assert.Equal("inactivity", escalationHistory.EscalationReason);
    }

    [Fact]
    public async Task district_and_store_summaries_are_authorized_and_use_snake_case_stage_b_shape()
    {
        await using var app = new StoreMindFactory();
        using var client = app.CreateClient();
        await SignIn(client, "district");
        using var stores = JsonDocument.Parse(await client.GetStringAsync("/api/stores"));
        Assert.Equal(new[] { "store-001", "store-002" }, stores.RootElement.EnumerateArray().Select(x => x.GetProperty("store_id").GetString()).Order().ToArray());
        Assert.All(stores.RootElement.EnumerateArray(), row =>
        {
            Assert.True(row.TryGetProperty("escalated_count", out _));
            Assert.True(row.TryGetProperty("response_overdue_count", out _));
        });
        using var districts = JsonDocument.Parse(await client.GetStringAsync("/api/districts"));
        var district = districts.RootElement.EnumerateArray().Single();
        foreach (var field in new[] { "district_id", "store_count", "active_count", "escalated_count", "response_overdue_count", "oldest_escalation_due_at" })
            Assert.True(district.TryGetProperty(field, out _), $"Missing district summary field {field}");
        Assert.Equal("district-01", district.GetProperty("district_id").GetString());

        await SignIn(client, "lead");
        using var scoped = JsonDocument.Parse(await client.GetStringAsync("/api/districts"));
        Assert.Equal(1, scoped.RootElement.EnumerateArray().Single().GetProperty("store_count").GetInt32());
    }

    private static async Task SignIn(HttpClient client, string username)
    {
        using var response = await client.PostAsJsonAsync("/api/auth/sign-in", new { username, password = $"{username}-secret" });
        response.EnsureSuccessStatusCode();
        using var payload = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", payload.RootElement.GetProperty("token").GetString());
    }

    private sealed class StoreMindFactory : WebApplicationFactory<Program>
    {
        private readonly string directory = Path.Combine(Path.GetTempPath(), "storemind-stage-b-http-tests", Guid.NewGuid().ToString("n"));
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            foreach (var username in new[] { "clerk", "lead", "lead-west", "district", "hq" }) builder.UseSetting($"StoreMind:Accounts:{username}", $"{username}-secret");
            builder.ConfigureServices(services =>
            {
                services.RemoveAll<IRetailSource>();
                services.RemoveAll<StateStore>();
                services.AddSingleton<IRetailSource, FixtureSource>();
                services.AddSingleton(provider => new StateStore(provider.GetRequiredService<IRetailSource>(), Path.Combine(directory, "state.json")));
            });
        }
        public override async ValueTask DisposeAsync()
        {
            await base.DisposeAsync();
            if (Directory.Exists(directory)) Directory.Delete(directory, true);
        }
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
        public static TestState Create() => new(System.IO.Path.Combine(System.IO.Path.GetTempPath(), "storemind-stage-b-tests", Guid.NewGuid().ToString("n")));
        public void Dispose() { if (System.IO.Directory.Exists(Directory)) System.IO.Directory.Delete(Directory, true); }
    }
}
