using System.Text.Json;
using System.Threading.Channels;
using Kiyo9w.StoreMind.Service;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(options => options.Limits.MaxRequestBodySize = 64 * 1024);
builder.Services.ConfigureHttpJsonOptions(options => options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower);
builder.Services.AddSingleton<IRetailSource, FixtureSource>();
builder.Services.AddSingleton<SessionStore>();
builder.Services.AddSingleton<StateStore>();
var app = builder.Build();
app.Services.GetRequiredService<StateStore>().Initialize();
var bootstrapCredentials = app.Services.GetRequiredService<SessionStore>().ConsumeBootstrapCredentials();
if (bootstrapCredentials.Count > 0) app.Logger.LogWarning("StoreMind one-time local credentials (not served to the browser): {Credentials}", string.Join(", ", bootstrapCredentials.Select(x => $"{x.Key}={x.Value}")));

app.Use(async (context, next) =>
{
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["X-Frame-Options"] = "DENY";
    context.Response.Headers["Referrer-Policy"] = "no-referrer";
    context.Response.Headers["Content-Security-Policy"] = "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'";
    try { await next(); }
    catch (ConflictException ex) { await Problem(context, ex.Status, ex.Code, ex.Message, new { current_exception = ex.Item, current_version = ex.Item.Version }); }
    catch (ApiException ex) { await Problem(context, ex.Status, ex.Code, ex.Message); }
    catch (BadHttpRequestException) { await Problem(context, 400, "bad_request", "Request could not be parsed."); }
});
app.Use(async (context, next) =>
{
    if (!context.Request.Path.StartsWithSegments("/api") || context.Request.Path == "/api/auth/sign-in") { await next(); return; }
    var header = context.Request.Headers.Authorization.ToString();
    var actor = header.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase) ? context.RequestServices.GetRequiredService<SessionStore>().Get(header[7..]) : null;
    if (actor is null) { await Problem(context, 401, "unauthorized", "A valid bearer session is required."); return; }
    context.Items["actor"] = actor;
    context.Items["token"] = header[7..];
    await next();
});
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapPost("/api/auth/sign-in", (SignInRequest request, SessionStore sessions) =>
{
    var result = sessions.SignIn(request.Username, request.Password);
    if (result is null) return Results.Problem(statusCode: 401, title: "Invalid credentials", extensions: new Dictionary<string, object?> { ["code"] = "invalid_credentials" });
    return Results.Ok(new { token = result.Value.Token, actor = result.Value.Actor, assistant_enabled = false });
});
app.MapPost("/api/auth/sign-out", (HttpContext context, SessionStore sessions) => { sessions.SignOut((string)context.Items["token"]!); return Results.NoContent(); });
app.MapGet("/api/me", (HttpContext context, StateStore store) => { var actor = ActorOf(context); var onShift = actor.StoreId is null || store.Shifts(actor, actor.StoreId).Any(x => x.ActorId == actor.Id && x.OnShift); return Results.Ok(new { actor, capabilities = actor.Capabilities, assistant_enabled = false, on_shift = onShift }); });
app.MapGet("/api/stores", (HttpContext context, StateStore store) => Results.Ok(store.StoreSummaries(ActorOf(context))));
app.MapGet("/api/districts", (HttpContext context, StateStore store) => Results.Ok(store.DistrictSummaries(ActorOf(context))));
app.MapGet("/api/exceptions", (HttpContext context, StateStore store, string? storeId, string? state) =>
{
    var snapshot = store.Snapshot(ActorOf(context), storeId, state);
    return Results.Ok(new { sequence = snapshot.Sequence, items = snapshot.Items.Select(x => new { exception = x, allowed_commands = store.AllowedFor(ActorOf(context), x) }) });
});
app.MapGet("/api/exceptions/{id}", (HttpContext context, StateStore store, string id) =>
{
    var item = store.Find(ActorOf(context), id) ?? throw new ApiException(404, "not_found", "Exception not found.");
    var snapshot = store.Snapshot(ActorOf(context), null, null);
    return Results.Ok(new { sequence = snapshot.Sequence, exception = item, allowed_commands = store.AllowedFor(ActorOf(context), item) });
});
app.MapPost("/api/exceptions/{id}/{command}", (HttpContext context, StateStore store, string id, string command, CommandRequest request) =>
{
    if (!context.Request.Headers.TryGetValue("Idempotency-Key", out var key) || string.IsNullOrWhiteSpace(key)) throw new ApiException(400, "idempotency_key_required", "Idempotency-Key is required.");
    if (!context.Request.Headers.TryGetValue("If-Match", out var match) || !long.TryParse(match.ToString().Trim('"'), out var version)) throw new ApiException(400, "if_match_required", "If-Match must contain the exception version.");
    if (key.ToString().Length > 128) throw new ApiException(422, "invalid_idempotency_key", "Idempotency-Key is too long.");
    return Results.Ok(store.Execute(ActorOf(context), id, command.ToLowerInvariant(), key.ToString(), version, request));
});
app.MapPost("/api/demo/reset", (HttpContext context, StateStore store) =>
{
    if (!context.Request.Headers.TryGetValue("Idempotency-Key", out var key) || string.IsNullOrWhiteSpace(key)) throw new ApiException(400, "idempotency_key_required", "Idempotency-Key is required.");
    if (key.ToString().Length > 128) throw new ApiException(422, "invalid_idempotency_key", "Idempotency-Key is too long.");
    return Results.Ok(store.Reset(ActorOf(context), key.ToString()));
});
app.MapGet("/api/shifts", (HttpContext context, StateStore store, string? storeId) =>
{
    var actor = ActorOf(context);
    var id = storeId ?? actor.StoreId ?? throw new ApiException(400, "store_required", "storeId is required.");
    return Results.Ok(store.Shifts(actor, id));
});
app.MapPost("/api/shifts/clock-in", (HttpContext context, StateStore store, ShiftRequest request) => Results.Ok(store.ClockIn(ActorOf(context), request.StoreId)));
app.MapPost("/api/shifts/clock-out", (HttpContext context, StateStore store, ShiftRequest request) => Results.Ok(store.ClockOut(ActorOf(context), request.StoreId)));
app.MapGet("/api/policies", (HttpContext context, StateStore store) => Results.Ok(store.Policies(ActorOf(context))));
app.MapPost("/api/policies/{exceptionClass}/preview", (HttpContext context, StateStore store, string exceptionClass, PolicyDraft draft) => Results.Ok(store.PreviewPolicy(ActorOf(context), exceptionClass, draft)));
app.MapPost("/api/policies/{exceptionClass}/publish", (HttpContext context, StateStore store, string exceptionClass, PolicyDraft draft) => Results.Ok(store.PublishPolicy(ActorOf(context), exceptionClass, draft)));
app.MapPost("/api/policies/{exceptionClass}/unpublish", (HttpContext context, StateStore store, string exceptionClass) => Results.Ok(store.UnpublishPolicy(ActorOf(context), exceptionClass)));
app.MapGet("/api/proofs", (HttpContext context, StateStore store) => Results.Ok(store.Proofs(ActorOf(context))));
app.MapGet("/api/policy-metrics", (HttpContext context, StateStore store) => Results.Ok(store.PolicyMetrics(ActorOf(context))));
app.MapGet("/api/exceptions/{id}/commands", (HttpContext context, StateStore store, string id) => Results.Ok(store.Commands(ActorOf(context), id)));
app.MapGet("/api/commands/{commandId}", (HttpContext context, StateStore store, string commandId) => Results.Ok(store.Command(ActorOf(context), commandId)));
app.MapPost("/api/assistant", () => Results.Problem(statusCode: 503, title: "Assistant disabled", extensions: new Dictionary<string, object?> { ["code"] = "assistant_disabled" }));
app.MapGet("/api/events", async (HttpContext context, StateStore store, SessionStore sessions, long? after, CancellationToken cancellation) =>
{
    var actor = ActorOf(context);
    var token = (string)context.Items["token"]!;
    var revocation = sessions.RevocationToken(token) ?? throw new ApiException(401, "unauthorized", "The bearer session was revoked.");
    using var linked = CancellationTokenSource.CreateLinkedTokenSource(cancellation, revocation);
    var streamCancellation = linked.Token;
    var replay = store.Replay(actor, after ?? 0);
    context.Response.ContentType = "text/event-stream"; context.Response.Headers.CacheControl = "no-cache"; context.Response.Headers["X-Accel-Buffering"] = "no";
    await context.Response.Body.FlushAsync(streamCancellation);
    if (replay is null) { await WriteSse(context, "reset_required", new { reason = "retention_exceeded" }, streamCancellation); return; }
    foreach (var envelope in replay) await WriteSse(context, "change", envelope, streamCancellation);
    var channel = Channel.CreateBounded<EventEnvelope>(new BoundedChannelOptions(32) { FullMode = BoundedChannelFullMode.Wait, SingleReader = true, SingleWriter = false });
    using var subscription = store.Subscribe(envelope =>
    {
        if ((envelope.AggregateType == "demo" || store.Find(actor, envelope.AggregateId) is not null) && !channel.Writer.TryWrite(envelope)) channel.Writer.TryComplete();
    });
    await foreach (var envelope in channel.Reader.ReadAllAsync(streamCancellation)) await WriteSse(context, "change", envelope, streamCancellation);
});
app.MapFallbackToFile("index.html");
app.Run();

static Actor ActorOf(HttpContext context) => (Actor)context.Items["actor"]!;
static async Task Problem(HttpContext context, int status, string code, string detail, object? extra = null)
{
    if (context.Response.HasStarted) return; context.Response.StatusCode = status; context.Response.ContentType = "application/problem+json";
    await context.Response.WriteAsJsonAsync(new { type = $"https://storemind.invalid/problems/{code}", title = code, status, detail, code, extra }, options: new JsonSerializerOptions(JsonSerializerDefaults.Web) { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower });
}
static async Task WriteSse(HttpContext context, string eventName, object data, CancellationToken cancellation)
{
    var json = JsonSerializer.Serialize(data, new JsonSerializerOptions(JsonSerializerDefaults.Web) { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower });
    await context.Response.WriteAsync($"event: {eventName}\ndata: {json}\n\n", cancellation); await context.Response.Body.FlushAsync(cancellation);
}
public partial class Program { }
