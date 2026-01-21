
using System.ComponentModel;
using Microsoft.SemanticKernel;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Core.Interfaces;

namespace Kiyo9w.StoreMind.Service.Plugins;

public class Inventory
{
    private readonly IInventory _inventoryService;

    public Inventory(IInventory inventoryService)
    {
        _inventoryService = inventoryService ?? throw new ArgumentNullException(nameof(inventoryService));
    }

    [KernelFunction]
    [Description("gets the current inventory snapshot regarding a store")]
    public async Task<Snapshot> GetInventorySnapshotAsync(
        [Description("the target store id")] string storeId,
        CancellationToken ct = default)
    {
        return await _inventoryService.GetSnapshotAsync(storeId, ct);
    }

    [KernelFunction]
    [Description("pulls items that are gonna expire pretty soon")]
    public async Task<IReadOnlyList<InventoryItem>> GetExpiringItemsAsync(
        [Description("the store identifier regarding the query")] string storeId,
        [Description("number of days to look ahead usually defaults to 3")] int withinDays = 3,
        CancellationToken ct = default)
    {
        var snapshot = await _inventoryService.GetSnapshotAsync(storeId, ct);
        return snapshot.GetExpiringItems(withinDays).ToList();
    }

    [KernelFunction]
    [Description("gets items that are running low on stocks")]
    public async Task<IReadOnlyList<InventoryItem>> GetLowStockItemsAsync(
        [Description("the target store id")] string storeId,
        [Description("safety stock threshold")] int threshold = 10,
        CancellationToken ct = default)
    {
        var snapshot = await _inventoryService.GetSnapshotAsync(storeId, ct);
        return snapshot.GetLowStockItems(threshold).ToList();
    }

    [KernelFunction]
    [Description("searches for items using fuzzy text search")]
    public async Task<IReadOnlyList<InventoryItem>> SearchItemsAsync(
        [Description("the store identifier")] string storeId,
        [Description("the actual search text")] string query,
        [Description("max results to return")] int topK = 5,
        CancellationToken ct = default)
    {
        return await _inventoryService.SearchItemsAsync(storeId, query, topK, ct);
    }
}
