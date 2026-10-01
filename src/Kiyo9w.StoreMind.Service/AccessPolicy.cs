using System.Security.Cryptography;
using System.Text;

namespace Kiyo9w.StoreMind.Service;

public static class AccessPolicy
{
    public static bool CanSee(Actor actor, RetailException item)
    {
        if (actor.TenantId != item.TenantId || actor.PolicyVersion != item.PolicyVersion) return false;
        if (actor.Capabilities.Contains("read_tenant")) return true;
        if (actor.Capabilities.Contains("read_district") && actor.DistrictId == item.DistrictId) return true;
        if (actor.StoreId != item.StoreId) return false;
        if (actor.Capabilities.Contains("read_store")) return true;
        if (actor.Capabilities.Contains("read_department") && actor.Department == item.Department) return true;
        return actor.Capabilities.Contains("read_assignment") && actor.Assignments.Contains(item.AssignmentId);
    }

    public static bool RequiresShift(Actor actor) => actor.StoreId is not null;

    public static IReadOnlyList<string> Allowed(Actor actor, RetailException item, bool onShift = true)
    {
        if (!CanSee(actor, item) || !actor.Capabilities.Contains("command_exception")) return [];
        if (RequiresShift(actor) && !onShift) return [];
        var commands = item.State switch
        {
            "active" => new List<string> { "acknowledge", "act", "snooze", "suppress", "escalate" },
            "acknowledged" => ["act", "snooze", "suppress", "escalate"],
            "in_progress" => ["snooze", "suppress", "escalate", "verify"],
            "escalated" => ["act", "verify", "deescalate"],
            "snoozed" => ["reopen"],
            "resolved" or "suppressed" => ["reopen"],
            _ => new List<string>()
        };
        if (actor.Role == "StoreClerk") commands.RemoveAll(x => x is "suppress" or "escalate" or "deescalate" || x == "reopen" && item.State != "snoozed");
        if (item.State is not ("resolved" or "suppressed"))
        {
            if (item.OwnerKind != "person") commands.Insert(0, "claim");
            else if (item.OwnerActorId == actor.Id) commands.Insert(0, "handoff");
        }
        return commands;
    }
}

public sealed class SessionStore
{
    private sealed record Account(Actor Actor, byte[] Salt, byte[] PasswordHash);
    private sealed record ActiveSession(Actor Actor, CancellationTokenSource Revocation);

    private static readonly IReadOnlyDictionary<string, Actor> ActorTemplates = new Dictionary<string, Actor>(StringComparer.OrdinalIgnoreCase)
    {
        ["clerk"] = new("actor-clerk", "clerk", "Avery Clerk", "StoreClerk", "store-001", "district-01") { Department = "grocery", Assignments = ["grocery"], Capabilities = ["read_assignment", "command_exception"] },
        ["lead"] = new("actor-lead", "lead", "Morgan Lead", "DepartmentOwner", "store-001", "district-01") { Department = "grocery", Capabilities = ["read_department", "command_exception"] },
        ["lead-west"] = new("actor-lead-west", "lead-west", "Rowan West", "DepartmentOwner", "store-002", "district-01") { Department = "grocery", Capabilities = ["read_department", "command_exception"] },
        ["district"] = new("actor-district", "district", "Casey District", "DistrictManager", null, "district-01") { Capabilities = ["read_district", "command_exception"] },
        ["hq"] = new("actor-hq", "hq", "Taylor Headquarters", "Headquarters", null, null) { Capabilities = ["read_tenant", "command_exception", "demo_reset", "publish_policy"] }
    };

    private readonly Dictionary<string, Account> accounts = new(StringComparer.OrdinalIgnoreCase);
    private readonly Dictionary<string, ActiveSession> sessions = new(StringComparer.Ordinal);
    private readonly Dictionary<string, string> bootstrapCredentials = new(StringComparer.OrdinalIgnoreCase);

    public SessionStore(IConfiguration configuration)
    {
        foreach (var (username, actor) in ActorTemplates)
        {
            var configured = configuration[$"StoreMind:Accounts:{username}"];
            var password = string.IsNullOrWhiteSpace(configured) ? GeneratePassword() : configured;
            if (configured is null) bootstrapCredentials[username] = password;
            var salt = RandomNumberGenerator.GetBytes(16);
            accounts[username] = new Account(actor, salt, Hash(password, salt));
        }
    }

    public IReadOnlyDictionary<string, string> ConsumeBootstrapCredentials()
    {
        lock (sessions)
        {
            var copy = new Dictionary<string, string>(bootstrapCredentials, StringComparer.OrdinalIgnoreCase);
            bootstrapCredentials.Clear();
            return copy;
        }
    }

    public static Actor? FindActor(string id) => ActorTemplates.Values.FirstOrDefault(x => x.Id == id);
    public static IReadOnlyList<Actor> StoreActors() => ActorTemplates.Values.Where(x => x.StoreId is not null).ToArray();

    public (string Token, Actor Actor)? SignIn(string username, string password)
    {
        if (!accounts.TryGetValue(username, out var account) || !CryptographicOperations.FixedTimeEquals(account.PasswordHash, Hash(password, account.Salt))) return null;
        var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
        lock (sessions) sessions[token] = new ActiveSession(account.Actor, new CancellationTokenSource());
        return (token, account.Actor);
    }

    public Actor? Get(string token) { lock (sessions) return sessions.GetValueOrDefault(token)?.Actor; }
    public CancellationToken? RevocationToken(string token) { lock (sessions) return sessions.TryGetValue(token, out var session) ? session.Revocation.Token : null; }
    public void SignOut(string token)
    {
        ActiveSession? session;
        lock (sessions) { if (!sessions.Remove(token, out session)) return; }
        session.Revocation.Cancel();
    }

    private static byte[] Hash(string password, byte[] salt) => Rfc2898DeriveBytes.Pbkdf2(Encoding.UTF8.GetBytes(password), salt, 100_000, HashAlgorithmName.SHA256, 32);
    private static string GeneratePassword() => Convert.ToBase64String(RandomNumberGenerator.GetBytes(18)).Replace('+', '-').Replace('/', '_').TrimEnd('=');
}
