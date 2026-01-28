using System.Text.Json.Serialization;

namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// Where the evidence came from
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EvidenceSource
{
    Inventory,
    Expiry,
    Weather,
    Sales,
    Policy,
    AI
}

/// <summary>
/// Points to a data source that justifies a decision
/// Every proposals needs at least one piece of evidence so the agent can explain itself
/// </summary>
[JsonSerializable(typeof(Evidence))]
public record Evidence(
    EvidenceSource Source,
    DateTime Timestamp,
    string EntityId)
{
    public bool IsValid() =>
        Timestamp != default &&
        !string.IsNullOrWhiteSpace(EntityId);
}
