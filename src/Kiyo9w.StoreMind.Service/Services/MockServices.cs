using System.Text.Json;
using System.Text.Json.Serialization;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Core.Interfaces;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Provides access to canonical mock data, loading from JSON or falling back to defaults.
/// </summary>
internal static class CanonicalDataLoader
{
    private static CanonicalMockData? _cachedData;
    
    public static CanonicalMockData Data => _cachedData ??= LoadData();

    private static CanonicalMockData LoadData()
    {
        // Try working directory first (where the app runs from)
        var jsonPath = Path.Combine(Directory.GetCurrentDirectory(), ".agent", "CANONICAL_MOCK_DATA.json");
        
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
                var data = JsonSerializer.Deserialize<CanonicalMockData>(json, options);
                if (data != null) return data;
            }
            catch
            {
                // Fall through to hardcoded data
            }
        }

        // Fallback: hardcoded data (always works, no file dependency)
        return CreateFallbackData();
    }

    private static CanonicalMockData CreateFallbackData() => new()
    {
        InventoryItems =
        [
            new("MILK-001", "Fresh Milk 1L", "Pasteurized whole milk", 2.50m, "Dairy", 8, DateTimeOffset.UtcNow.AddDays(2)),
            new("YOGURT-002", "Greek Yogurt 500g", "Plain greek yogurt", 3.20m, "Dairy", 12, DateTimeOffset.UtcNow.AddDays(1)),
            new("BREAD-001", "White Bread Loaf", "Sliced white bread", 1.80m, "Bakery", 5, DateTimeOffset.UtcNow.AddDays(2)),
            new("RICE-001", "Jasmine Rice 5kg", "Premium Thai jasmine rice", 12.00m, "Grains", 3, DateTimeOffset.UtcNow.AddDays(180)),
            new("PASTA-001", "Spaghetti 500g", "Italian durum wheat pasta", 2.50m, "Grains", 7, DateTimeOffset.UtcNow.AddDays(365)),
            new("UMB-001", "Compact Umbrella", "Foldable travel umbrella", 15.00m, "Accessories", 2, null),
            new("WATER-001", "Mineral Water 1.5L", "Natural spring water", 1.00m, "Beverages", 45, null),
            new("SODA-001", "Cola 330ml", "Classic cola can", 1.50m, "Beverages", 60, DateTimeOffset.UtcNow.AddDays(90)),
            new("CHIPS-001", "Potato Chips 150g", "Salted potato chips", 2.80m, "Snacks", 35, DateTimeOffset.UtcNow.AddDays(60)),
            new("SOAP-001", "Hand Soap 250ml", "Antibacterial hand soap", 3.50m, "Personal Care", 25, null),
            new("BENTO-001", "Salmon Bento Box", "Grilled salmon with rice", 8.50m, "Ready Meals", 15, DateTimeOffset.UtcNow.AddDays(1)),
            new("SAKE-001", "Junmai Sake 720ml", "Premium Japanese rice wine", 25.00m, "Alcohol", 24, null),
            new("SUNSCREEN-005", "SunBlock SPF 50", "High protection sunscreen 100ml", 15.00m, "Personal Care", 200, DateTimeOffset.UtcNow.AddYears(2)),
            new("BBQ-COAL-001", "Charcoal 3kg", "Premium wood charcoal", 8.00m, "Outdoor", 50, null),
            new("WATER-500ML", "Mineral Water 500ml", "Natural spring water", 0.50m, "Beverages", 100, null),
        ],
        SupplierPrices = new()
        {
            ["MILK-001"] = 1.80m, ["YOGURT-002"] = 2.20m, ["BREAD-001"] = 1.20m,
            ["RICE-001"] = 9.50m, ["PASTA-001"] = 1.80m, ["UMB-001"] = 8.00m,
            ["WATER-001"] = 0.60m, ["SODA-001"] = 0.90m, ["CHIPS-001"] = 1.80m,
            ["SOAP-001"] = 2.20m, ["BENTO-001"] = 5.00m, ["SAKE-001"] = 18.00m
        },
        WarehouseStock = new()
        {
            ["MILK-001"] = 200, ["YOGURT-002"] = 150, ["BREAD-001"] = 100,
            ["RICE-001"] = 50, ["PASTA-001"] = 80, ["UMB-001"] = 500,
            ["WATER-001"] = 1000, ["SODA-001"] = 800, ["CHIPS-001"] = 300,
            ["SOAP-001"] = 200, ["BENTO-001"] = 50, ["SAKE-001"] = 100
        }
    };
}

/// <summary>
/// DTO for deserializing CANONICAL_MOCK_DATA.json
/// </summary>
internal class CanonicalMockData
{
    [JsonPropertyName("inventory_items")]
    public List<InventoryItem> InventoryItems { get; set; } = [];
    
    [JsonPropertyName("supplier_prices")]
    public Dictionary<string, decimal> SupplierPrices { get; set; } = new();
    
    [JsonPropertyName("warehouse_stock")]
    public Dictionary<string, int> WarehouseStock { get; set; } = new();

    [JsonPropertyName("sales_performance")]
    public Dictionary<string, SalesPerformance> SalesPerformance { get; set; } = new();
}

/// <summary>
/// Provides inventory data from the canonical mock data source.
/// </summary>
public class MockInventoryService : IInventory
{
    public Task<Snapshot> GetSnapshotAsync(string storeId, CancellationToken ct = default)
    {
        var items = CanonicalDataLoader.Data.InventoryItems;
        var snapshot = new Snapshot(storeId, DateTimeOffset.UtcNow, items);
        return Task.FromResult(snapshot);
    }

    public Task<IReadOnlyList<InventoryItem>> SearchItemsAsync(string storeId, string query, int topK = 10, CancellationToken ct = default)
    {
        var results = CanonicalDataLoader.Data.InventoryItems
            .Where(i => i.Name.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                       i.Sku.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                       i.Category.Contains(query, StringComparison.OrdinalIgnoreCase))
            .Take(topK)
            .ToList();
        
        return Task.FromResult<IReadOnlyList<InventoryItem>>(results);
    }

    public Task<SalesPerformance?> GetSalesVelocityAsync(string storeId, string sku, CancellationToken ct = default)
    {
        var data = CanonicalDataLoader.Data.SalesPerformance;
        return Task.FromResult(data.TryGetValue(sku, out var perf) ? perf : null);
    }
}

/// <summary>
/// Provides supplier data from the canonical mock data source.
/// </summary>
public class MockSupplierService : ISupplier
{
    public Task<decimal?> GetSupplierPriceAsync(string sku, DateTime date, CancellationToken ct = default)
    {
        var prices = CanonicalDataLoader.Data.SupplierPrices;
        return Task.FromResult<decimal?>(prices.TryGetValue(sku, out var price) ? price : null);
    }

    public Task<int> GetWarehouseStockAsync(string sku, CancellationToken ct = default)
    {
        var stock = CanonicalDataLoader.Data.WarehouseStock;
        return Task.FromResult(stock.TryGetValue(sku, out var qty) ? qty : 0);
    }
}
