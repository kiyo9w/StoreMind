namespace Kiyo9w.StoreMind.Core.Interfaces;

/// <summary>
/// Abstraction for accessing external supplier and warehouse data
/// </summary>
public interface ISupplier
{
    /// <summary>
    /// Gets the cost price of an SKU from the supplier for a specific date
    /// </summary>
    /// <returns>The price, or null if pricing is unavailable for that date/SKU.</returns>
    Task<decimal?> GetSupplierPriceAsync(string sku, DateTime date, CancellationToken ct = default);

    /// <summary>
    /// Check the available stock quantity at the central warehouse
    /// </summary>
    Task<int> GetWarehouseStockAsync(string sku, CancellationToken ct = default);
}
