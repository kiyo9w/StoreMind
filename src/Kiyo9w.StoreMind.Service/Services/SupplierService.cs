namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// returns supplier prices and warehouse stock from seed data
/// </summary>
public class SupplierService
{
    // gets the current supplier price for a sku
    public Task<decimal?> GetSupplierPriceAsync(string sku, DateTime date, CancellationToken ct = default)
    {
        var prices = SeedDataLoader.Data.SupplierPrices;
        return Task.FromResult<decimal?>(prices.TryGetValue(sku, out var price) ? price : null);
    }

    // checks the available stock in the central warehouse
    public Task<int> GetWarehouseStockAsync(string sku, CancellationToken ct = default)
    {
        var stock = SeedDataLoader.Data.WarehouseStock;
        return Task.FromResult(stock.TryGetValue(sku, out var qty) ? qty : 0);
    }
}
