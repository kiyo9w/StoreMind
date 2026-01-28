using Kiyo9w.StoreMind.Core.Contracts;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// reads inventory from the seed data
/// this is the only source of truth (mock) for the demo
/// </summary>
public class InventoryService
{
    // gets the current inventory snapshot regarding a store
    public Task<Snapshot> GetSnapshotAsync(string storeId, CancellationToken ct = default)
    {
        var items = SeedDataLoader.Data.InventoryItems;
        var snapshot = new Snapshot(storeId, DateTimeOffset.UtcNow, items);
        return Task.FromResult(snapshot);
    }

    // searches for items based on name, sku or category
    public Task<IReadOnlyList<InventoryItem>> SearchItemsAsync(string storeId, string query, int topK = 10, CancellationToken ct = default)
    {
        var results = SeedDataLoader.Data.InventoryItems
            .Where(i => i.Name.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                       i.Sku.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                       i.Category.Contains(query, StringComparison.OrdinalIgnoreCase))
            .Take(topK)
            .ToList();
        
        return Task.FromResult<IReadOnlyList<InventoryItem>>(results);
    }

    // retrieves sales performance metrics for a specific sku
    public Task<SalesPerformance?> GetSalesVelocityAsync(string storeId, string sku, CancellationToken ct = default)
    {
        var data = SeedDataLoader.Data.SalesPerformance;
        return Task.FromResult(data.TryGetValue(sku, out var perf) ? perf : null);
    }
}
