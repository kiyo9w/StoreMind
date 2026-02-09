using System.Text.Json.Serialization;

namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// A point-in-time record of the entire store inventory
/// </summary>
[JsonSerializable(typeof(Snapshot))]
public record Snapshot(
    string StoreId,
    DateTimeOffset AsOf,
    IReadOnlyList<InventoryItem> Items)
{
    public string SnapshotId { get; init; } = $"snap-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}"[..28];

    /// <summary>
    /// Filters items that expire within the specified number of days
    /// </summary>
    public IEnumerable<InventoryItem> GetExpiringItems(int withinDays) =>
        Items.Where(i => i.ExpirationDate.HasValue &&
                        i.ExpirationDate.Value <= AsOf.AddDays(withinDays));

    /// <summary>
    /// Filters items where the stock level is below the threshold
    /// </summary>
    public IEnumerable<InventoryItem> GetLowStockItems(int threshold = 10) =>
        Items.Where(i => i.StockLevel < threshold);

    public decimal TotalValue => Items.Sum(i => i.Price * i.StockLevel);
}

/// <summary>
/// Represents a single SKU within an inventory snapshot
/// </summary>
[JsonSerializable(typeof(InventoryItem))]
public record InventoryItem(
    [property: JsonPropertyName("sku")] string Sku,
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("description")] string Description,
    [property: JsonPropertyName("price")] decimal Price,
    [property: JsonPropertyName("category")] string Category,
    [property: JsonPropertyName("stock_level")] int StockLevel,
    [property: JsonPropertyName("expiration_date")] DateTimeOffset? ExpirationDate = null,
    [property: JsonPropertyName("lead_time_days")] int LeadTimeDays = 1)
{
    [JsonIgnore]
    public int? DaysUntilExpiry => ExpirationDate.HasValue
        ? (int)(ExpirationDate.Value - DateTimeOffset.UtcNow).TotalDays
        : null;

    [JsonIgnore]
    public bool IsExpiringSoon => DaysUntilExpiry is > 0 and <= 3;

    [JsonIgnore]
    public bool IsExpired => DaysUntilExpiry is < 0;
}
