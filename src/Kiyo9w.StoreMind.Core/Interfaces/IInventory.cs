using Kiyo9w.StoreMind.Core.Contracts;

namespace Kiyo9w.StoreMind.Core.Interfaces;

/// <summary>
/// access to store inventory data for agents
/// </summary>
public interface IInventory
{
    /// <summary>
    /// Retrieves the full inventory state for a specific store
    /// </summary>
    Task<Snapshot> GetSnapshotAsync(string storeId, CancellationToken ct = default);

    /// <summary>
    /// Searches for inventory items matching a query string
    /// </summary>
    /// <remarks>
    /// useful for RAG where agents need to look up items by name
    /// </remarks>
    Task<IReadOnlyList<InventoryItem>> SearchItemsAsync(string storeId, string query, int topK = 10, CancellationToken ct = default);

    /// <summary>
    /// Gets the sales velocity and performance data for a specific item
    /// </summary>
    Task<SalesPerformance?> GetSalesVelocityAsync(string storeId, string sku, CancellationToken ct = default);
}
