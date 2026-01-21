using System.Text.Json.Serialization;

namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// Points to a specific data source or artifact that justifies a decision
/// </summary>
[JsonSerializable(typeof(Evidence))]
public record Evidence(
    [property: JsonPropertyName("source")] string Source,
    [property: JsonPropertyName("timestamp")] DateTime Timestamp,
    [property: JsonPropertyName("entityId")] string EntityId)
{
    /// <summary>
    /// Known valid source identifiers
    /// </summary>
    public static class Sources
    {
        public const string InventorySnapshot = "InventorySnapshot";
        public const string ExpiryReport = "ExpiryReport";
        public const string Weather = "Weather";
        public const string SalesHistory = "SalesHistory";
        public const string Policy = "Policy";
    }

    public bool IsValid() =>
        !string.IsNullOrWhiteSpace(Source) &&
        Timestamp != default &&
        !string.IsNullOrWhiteSpace(EntityId);
}
