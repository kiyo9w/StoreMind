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

    // searches for items based on name, sku, category, or description
    // tokenizes query into words — an item matches if ANY word appears in any searchable field
    // items are ranked by number of matching words (most relevant first)
    public Task<IReadOnlyList<InventoryItem>> SearchItemsAsync(string storeId, string query, int topK = 10, CancellationToken ct = default)
    {
        var words = query.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        var results = SeedDataLoader.Data.InventoryItems
            .Select(item =>
            {
                int score = 0;
                foreach (var w in words)
                {
                    if (item.Name.Contains(w, StringComparison.OrdinalIgnoreCase))
                        score += 3;  // name match is strongest signal
                    if (item.Category.Contains(w, StringComparison.OrdinalIgnoreCase))
                        score += 2;  // category match is a strong signal
                    if (item.Sku.Contains(w, StringComparison.OrdinalIgnoreCase))
                        score += 2;
                    if (item.Description.Contains(w, StringComparison.OrdinalIgnoreCase))
                        score += 1;  // description match is a weaker signal
                }
                return (item, score);
            })
            .Where(x => x.score > 0)
            .OrderByDescending(x => x.score)
            .Take(topK)
            .Select(x => x.item)
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
