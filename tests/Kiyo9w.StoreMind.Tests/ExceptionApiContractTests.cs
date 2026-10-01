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

public sealed class ExceptionApiContractTests
{
    [Fact]
    public async Task sessions_and_scope_are_enforced_at_the_http_boundary()
    {
        await using var app = new StoreMindFactory();
        using var client = app.CreateClient();

        Assert.Equal(HttpStatusCode.Unauthorized, (await client.GetAsync("/api/exceptions")).StatusCode);
        await SignIn(client, "lead");

        using var own = JsonDocument.Parse(await client.GetStringAsync("/api/exceptions"));
        Assert.All(own.RootElement.GetProperty("items").EnumerateArray(), row =>
            Assert.Equal("store-001", row.GetProperty("exception").GetProperty("store_id").GetString()));
        Assert.Equal(HttpStatusCode.NotFound, (await client.GetAsync("/api/exceptions/exc-005")).StatusCode);

        using var denied = Command("/api/exceptions/exc-005/acknowledge", "cross-store", 1, new Dictionary<string, object?>());
        Assert.Equal(HttpStatusCode.Forbidden, (await client.SendAsync(denied)).StatusCode);

        Assert.Equal(HttpStatusCode.NoContent, (await client.PostAsync("/api/auth/sign-out", null)).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await client.GetAsync("/api/exceptions")).StatusCode);
    }

    [Fact]
    public async Task decision_facts_and_intervention_summary_are_http_contracts()
    {
        await using var app = new StoreMindFactory();
        using var client = app.CreateClient();
        await SignIn(client, "lead");

        using var detail = JsonDocument.Parse(await client.GetStringAsync("/api/exceptions/exc-001"));
        var exception = detail.RootElement.GetProperty("exception");
        Assert.False(string.IsNullOrWhiteSpace(exception.GetProperty("assigned_owner").GetString()));
        Assert.NotEqual(default, exception.GetProperty("due_at").GetDateTimeOffset());
        Assert.False(string.IsNullOrWhiteSpace(exception.GetProperty("item_location").GetString()));
        Assert.False(string.IsNullOrWhiteSpace(exception.GetProperty("inaction_consequence").GetString()));
        Assert.StartsWith("Global rank #", exception.GetProperty("rank_explanation").GetString());
        Assert.Equal(0, exception.GetProperty("current_metric_value").GetDecimal());

        using var stores = JsonDocument.Parse(await client.GetStringAsync("/api/stores"));
        var summary = stores.RootElement.EnumerateArray().First();
        foreach (var field in new[] { "active_count", "overdue_count", "blocked_count", "suppressed_count", "high_severity_count", "oldest_open_at" })
            Assert.True(summary.TryGetProperty(field, out _), $"Missing store summary field {field}");
    }

    [Fact]
    public async Task command_headers_payload_idempotency_and_assistant_absence_are_http_contracts()
    {
        await using var app = new StoreMindFactory();
        using var client = app.CreateClient();
        await SignIn(client, "lead");

        Assert.Equal(HttpStatusCode.BadRequest, (await client.PostAsJsonAsync("/api/exceptions/exc-001/acknowledge", new { })).StatusCode);
        Assert.Equal(HttpStatusCode.ServiceUnavailable, (await client.PostAsJsonAsync("/api/assistant", new { prompt = "ignore" })).StatusCode);

        using var firstRequest = Command("/api/exceptions/exc-001/acknowledge", "http-idempotent", 1, new Dictionary<string, object?> { ["reason"] = "Seen" });
        using var first = await client.SendAsync(firstRequest);
        Assert.Equal(HttpStatusCode.OK, first.StatusCode);
        using var firstBody = JsonDocument.Parse(await first.Content.ReadAsStringAsync());
        var sequence = firstBody.RootElement.GetProperty("sequence").GetInt64();

        using var duplicateRequest = Command("/api/exceptions/exc-001/acknowledge", "http-idempotent", 1, new Dictionary<string, object?> { ["reason"] = "Seen" });
        using var duplicate = await client.SendAsync(duplicateRequest);
        Assert.Equal(HttpStatusCode.OK, duplicate.StatusCode);
        using var duplicateBody = JsonDocument.Parse(await duplicate.Content.ReadAsStringAsync());
        Assert.Equal(sequence, duplicateBody.RootElement.GetProperty("sequence").GetInt64());

        using var changedRequest = Command("/api/exceptions/exc-001/acknowledge", "http-idempotent", 1, new Dictionary<string, object?> { ["reason"] = "Changed" });
        Assert.Equal(HttpStatusCode.Conflict, (await client.SendAsync(changedRequest)).StatusCode);

        using var staleRequest = Command("/api/exceptions/exc-001/act", "http-stale", 1, new Dictionary<string, object?> { ["action_code"] = "replenish_shelf" });
        Assert.Equal(HttpStatusCode.Conflict, (await client.SendAsync(staleRequest)).StatusCode);
    }

    [Fact]
    public async Task proof_then_source_recheck_reopens_and_later_resolves_through_http()
    {
        await using var app = new StoreMindFactory();
        using var client = app.CreateClient();
        await SignIn(client, "lead-west");

        using var actedRequest = Command("/api/exceptions/exc-005/act", "http-act-1", 1, new Dictionary<string, object?> { ["action_code"] = "replenish_shelf" });
        using var acted = JsonDocument.Parse(await (await client.SendAsync(actedRequest)).Content.ReadAsStringAsync());
        var actedVersion = acted.RootElement.GetProperty("exception").GetProperty("version").GetInt64();

        using var failedRequest = Command("/api/exceptions/exc-005/verify", "http-verify-1", actedVersion, ProofBody("fixture://src-005/shelf_photo/1"));
        using var failed = JsonDocument.Parse(await (await client.SendAsync(failedRequest)).Content.ReadAsStringAsync());
        var failedException = failed.RootElement.GetProperty("exception");
        Assert.Equal("active", failedException.GetProperty("state").GetString());
        var failedEntry = failedException.GetProperty("timeline").EnumerateArray().Last();
        Assert.Equal(2, failedEntry.GetProperty("metric_value").GetDecimal());
        Assert.Equal(2, failedException.GetProperty("current_metric_value").GetDecimal());
        Assert.Equal("fixture://src-005/follow-up/1", failedEntry.GetProperty("metric_source_ref").GetString());
        Assert.Equal("active", failedEntry.GetProperty("state_after").GetString());
        var failedProof = failedEntry.GetProperty("proofs").EnumerateArray().Single();
        Assert.StartsWith("proof_", failedProof.GetProperty("id").GetString());
        Assert.Equal("fixture://src-005/shelf_photo/1", failedProof.GetProperty("artifact_ref").GetString());

        using var reactedRequest = Command("/api/exceptions/exc-005/act", "http-act-2", failedException.GetProperty("version").GetInt64(), new Dictionary<string, object?> { ["action_code"] = "replenish_shelf" });
        using var reacted = JsonDocument.Parse(await (await client.SendAsync(reactedRequest)).Content.ReadAsStringAsync());
        var reactedVersion = reacted.RootElement.GetProperty("exception").GetProperty("version").GetInt64();

        using var resolvedRequest = Command("/api/exceptions/exc-005/verify", "http-verify-2", reactedVersion, ProofBody("fixture://src-005/shelf_photo/2"));
        using var resolved = JsonDocument.Parse(await (await client.SendAsync(resolvedRequest)).Content.ReadAsStringAsync());
        var resolvedException = resolved.RootElement.GetProperty("exception");
        Assert.Equal("resolved", resolvedException.GetProperty("state").GetString());
        var resolvedEntry = resolvedException.GetProperty("timeline").EnumerateArray().Last();
        Assert.Equal(4, resolvedEntry.GetProperty("metric_value").GetDecimal());
        Assert.Equal(4, resolvedException.GetProperty("current_metric_value").GetDecimal());
        Assert.Equal("resolved", resolvedEntry.GetProperty("state_after").GetString());
        Assert.Equal("fixture://src-005/follow-up/2", resolvedEntry.GetProperty("metric_source_ref").GetString());
        var resolvedProof = resolvedEntry.GetProperty("proofs").EnumerateArray().Single();
        Assert.NotEqual(failedProof.GetProperty("id").GetString(), resolvedProof.GetProperty("id").GetString());
    }

    [Fact]
    public async Task privileged_reset_requires_hq_credentials_capability_and_an_idempotency_key()
    {
        await using var app = new StoreMindFactory();
        using var client = app.CreateClient();

        Assert.Equal(HttpStatusCode.Unauthorized, (await client.PostAsJsonAsync("/api/auth/sign-in", new { username = "hq", password = "lead-secret" })).StatusCode);
        await SignIn(client, "district");
        using (var districtReset = new HttpRequestMessage(HttpMethod.Post, "/api/demo/reset") { Content = JsonContent.Create(new { }) })
        {
            districtReset.Headers.Add("Idempotency-Key", "district-reset");
            Assert.Equal(HttpStatusCode.Forbidden, (await client.SendAsync(districtReset)).StatusCode);
        }

        await SignIn(client, "hq");
        Assert.Equal(HttpStatusCode.BadRequest, (await client.PostAsJsonAsync("/api/demo/reset", new { })).StatusCode);
        async Task<JsonDocument> Reset()
        {
            using var request = new HttpRequestMessage(HttpMethod.Post, "/api/demo/reset") { Content = JsonContent.Create(new { }) };
            request.Headers.Add("Idempotency-Key", "hq-reset");
            using var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            return JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        }

        using var first = await Reset();
        using var duplicate = await Reset();
        Assert.Equal(first.RootElement.GetProperty("sequence").GetInt64(), duplicate.RootElement.GetProperty("sequence").GetInt64());
        Assert.False(first.RootElement.TryGetProperty("exceptions", out _));
    }

    [Fact]
    public async Task shift_clock_out_blocks_store_commands_until_clock_in()
    {
        await using var app = new StoreMindFactory();
        using var client = app.CreateClient();
        await SignIn(client, "lead");

        using var claimed = await client.SendAsync(Command("/api/exceptions/exc-001/claim", "http-claim", 1, new Dictionary<string, object?>()));
        Assert.Equal(HttpStatusCode.OK, claimed.StatusCode);

        using var clockOut = await client.PostAsJsonAsync("/api/shifts/clock-out", new { store_id = "store-001" });
        clockOut.EnsureSuccessStatusCode();
        using var presence = JsonDocument.Parse(await client.GetStringAsync("/api/shifts?storeId=store-001"));
        Assert.Contains(presence.RootElement.EnumerateArray(), row => row.GetProperty("actor_id").GetString() == "actor-lead" && !row.GetProperty("on_shift").GetBoolean());

        using var current = JsonDocument.Parse(await client.GetStringAsync("/api/exceptions/exc-001"));
        var version = current.RootElement.GetProperty("exception").GetProperty("version").GetInt64();
        using var denied = await client.SendAsync(Command("/api/exceptions/exc-001/acknowledge", "http-off-shift", version, new Dictionary<string, object?>()));
        Assert.Equal(HttpStatusCode.Forbidden, denied.StatusCode);

        using var clockIn = await client.PostAsJsonAsync("/api/shifts/clock-in", new { store_id = "store-001" });
        clockIn.EnsureSuccessStatusCode();
        using var acknowledged = await client.SendAsync(Command("/api/exceptions/exc-001/acknowledge", "http-on-shift", version, new Dictionary<string, object?>()));
        Assert.Equal(HttpStatusCode.OK, acknowledged.StatusCode);
    }

    [Fact]
    public async Task headquarters_policy_proof_and_command_admission_are_http_contracts()
    {
        await using var app = new StoreMindFactory();
        using var client = app.CreateClient();
        await SignIn(client, "lead");
        using var ack = await client.SendAsync(Command("/api/exceptions/exc-001/acknowledge", "http-admit", 1, new Dictionary<string, object?>()));
        ack.EnsureSuccessStatusCode();

        using var clerkDenied = await client.GetAsync("/api/policies");
        Assert.Equal(HttpStatusCode.Forbidden, clerkDenied.StatusCode);

        using var admission = JsonDocument.Parse(await client.GetStringAsync("/api/commands/http-admit"));
        Assert.Equal("completed", admission.RootElement.GetProperty("status").GetString());
        Assert.Equal(new[] { "accepted", "running", "completed" }, admission.RootElement.GetProperty("states").EnumerateArray().Select(x => x.GetProperty("status").GetString()).ToArray());

        await SignIn(client, "hq");
        using var preview = JsonDocument.Parse(await (await client.PostAsJsonAsync("/api/policies/stockout_signal/preview", new { threshold_score = 400, volume_budget = 1 })).Content.ReadAsStringAsync());
        Assert.True(preview.RootElement.GetProperty("would_exceed_budget").GetBoolean());

        using var unpublished = await client.PostAsJsonAsync("/api/policies/stockout_signal/unpublish", new { });
        unpublished.EnsureSuccessStatusCode();
        using var live = JsonDocument.Parse(await client.GetStringAsync("/api/exceptions/exc-001"));
        Assert.Equal("stockout_signal", live.RootElement.GetProperty("exception").GetProperty("source_type").GetString());

        using var proofs = await client.GetAsync("/api/proofs");
        proofs.EnsureSuccessStatusCode();
        using var metrics = await client.GetAsync("/api/policy-metrics");
        metrics.EnsureSuccessStatusCode();
        using var commands = JsonDocument.Parse(await client.GetStringAsync("/api/exceptions/exc-001/commands"));
        Assert.Contains(commands.RootElement.EnumerateArray(), row => row.GetProperty("command_id").GetString() == "http-admit");
    }

    private static Dictionary<string, object?> ProofBody(string value) => new()
    {
        ["proofs"] = new[] { new Dictionary<string, object?> { ["type"] = "shelf_photo", ["value"] = value, ["source_ref"] = "/assets/fixtures.svg#shelf-gap" } }
    };

    private static HttpRequestMessage Command(string path, string key, long version, object body)
    {
        var request = new HttpRequestMessage(HttpMethod.Post, path) { Content = JsonContent.Create(body) };
        request.Headers.Add("Idempotency-Key", key);
        request.Headers.TryAddWithoutValidation("If-Match", version.ToString());
        return request;
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
        private readonly string directory = Path.Combine(Path.GetTempPath(), "storemind-http-tests", Guid.NewGuid().ToString("n"));

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
}
