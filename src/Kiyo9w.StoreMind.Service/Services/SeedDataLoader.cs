using System.Text.Json;
using System.Text.Json.Serialization;
using Kiyo9w.StoreMind.Core.Contracts;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// provides access to seed data, loading strictly from json
/// </summary>
internal static class SeedDataLoader
{
    private static SeedData? _cachedData;
    
    public static SeedData Data => _cachedData ??= LoadData();

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
                // Failed to load
            }
        }

        return new SeedData();
    }
}

/// <summary>
/// dto for deserializing seed data
/// </summary>
internal class SeedData
{
    public List<InventoryItem> InventoryItems { get; set; } = [];
    
    public Dictionary<string, decimal> SupplierPrices { get; set; } = new();
    
    public Dictionary<string, int> WarehouseStock { get; set; } = new();

    public Dictionary<string, SalesPerformance> SalesPerformance { get; set; } = new();
}
