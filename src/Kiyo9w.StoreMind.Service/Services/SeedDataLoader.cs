using System.Text.Json;
using Kiyo9w.StoreMind.Core.Contracts;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Provides access to seed data, loading strictly from JSON.
/// Supports daily randomization for varied demo scenarios.
/// </summary>
public class SeedDataService
{
    private SeedData? _data;
    private readonly ILogger<SeedDataService>? _log;
    private readonly object _lock = new();
    
    public SeedDataService(ILogger<SeedDataService>? log = null)
    {
        _log = log;
    }

    /// <summary>
    /// Gets the current seed data, loading from file if not yet loaded.
    /// </summary>
    public SeedData Data
    {
        get
        {
            if (_data == null)
            {
                lock (_lock)
                {
                    _data ??= LoadData();
                }
            }
            return _data;
        }
    }

    /// <summary>
    /// Replaces the in-memory data with randomized values.
    /// </summary>
    public void ApplyRandomization(DateTime date)
    {
        lock (_lock)
        {
            _data ??= LoadData();
            _data = RandomizeData(_data, date);
            _log?.LogInformation("Applied randomization for {Date}", date.ToString("yyyy-MM-dd"));
        }
    }

    /// <summary>
    /// Reloads data from file, discarding any randomization.
    /// </summary>
    public void Reload()
    {
        lock (_lock)
        {
            _data = LoadData();
            _log?.LogInformation("Seed data reloaded from file");
        }
    }

    private static SeedData LoadData()
    {
        var jsonPath = Path.Combine(AppContext.BaseDirectory, "CANONICAL_MOCK_DATA.json");
        
        if (File.Exists(jsonPath))
        {
            try
            {
                var json = File.ReadAllText(jsonPath);
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
                };
                return JsonSerializer.Deserialize<SeedData>(json, options) ?? new SeedData();
            }
            catch
            {
            }
        }

        return new SeedData();
    }

    /// <summary>
    /// Creates a randomized copy of the seed data using date-based seed.
    /// </summary>
    private SeedData RandomizeData(SeedData data, DateTime date)
    {
        // Use date as seed for reproducibility
        var seed = date.Year * 10000 + date.Month * 100 + date.Day;
        var random = new Random(seed);

        // Randomize inventory items (create new instances with varied values)
        var randomizedItems = data.InventoryItems.Select(item =>
        {
            // Stock variation: ±30%
            var stockVariation = random.NextDouble() * 0.6 - 0.3;
            var newStock = Math.Max(0, (int)(item.StockLevel * (1 + stockVariation)));
            
            // 10% chance of dramatic change
            if (random.NextDouble() < 0.1)
            {
                newStock = random.NextDouble() < 0.5 ? 0 : item.StockLevel * 3;
            }

            // Expiry variation: 0-2 days closer
            DateTimeOffset? newExpiry = item.ExpirationDate;
            if (item.ExpirationDate.HasValue)
            {
                var daysOffset = random.Next(0, 3);
                newExpiry = item.ExpirationDate.Value.AddDays(-daysOffset);
            }

            return item with
            {
                StockLevel = newStock,
                ExpirationDate = newExpiry
            };
        }).ToList();

        // Randomize sales performance
        var randomizedSales = data.SalesPerformance.ToDictionary(
            kvp => kvp.Key,
            kvp =>
            {
                var perf = kvp.Value;
                var salesVariation = random.NextDouble() * 0.4 - 0.2;
                var newSales = Math.Max(0, (int)(perf.LastWeekSales * (1 + salesVariation)));

                var newTrend = perf.Trend;
                if (random.NextDouble() < 0.3)
                {
                    var trends = new[] { "up", "down", "stable", "flat" };
                    newTrend = trends[random.Next(trends.Length)];
                }

                return perf with
                {
                    LastWeekSales = newSales,
                    Trend = newTrend
                };
            });

        return new SeedData
        {
            InventoryItems = randomizedItems,
            SupplierPrices = data.SupplierPrices,
            WarehouseStock = data.WarehouseStock,
            SalesPerformance = randomizedSales
        };
    }
}

/// <summary>
/// DTO for deserializing seed data
/// </summary>
public class SeedData
{
    public List<InventoryItem> InventoryItems { get; set; } = [];
    
    public Dictionary<string, decimal> SupplierPrices { get; set; } = new();
    
    public Dictionary<string, int> WarehouseStock { get; set; } = new();

    public Dictionary<string, SalesPerformance> SalesPerformance { get; set; } = new();
}

/// <summary>
/// Static accessor for backward compatibility.
/// Uses singleton instance of SeedDataService.
/// </summary>
internal static class SeedDataLoader
{
    private static readonly Lazy<SeedDataService> _instance = new(() => new SeedDataService());
    
    public static SeedData Data => _instance.Value.Data;
}
