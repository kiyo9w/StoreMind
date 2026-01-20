
using System.ComponentModel;
using Microsoft.SemanticKernel;
using Kiyo9w.StoreMind.Core.Interfaces;

namespace Kiyo9w.StoreMind.Service.Plugins;

public class Supplier
{
    private readonly ISupplier _supplierService;

    public Supplier(ISupplier supplierService)
    {
        _supplierService = supplierService ?? throw new ArgumentNullException(nameof(supplierService));
    }

    [KernelFunction]
    [Description("Gets the current supplier/warehouse price offer for an item")]
    public async Task<decimal?> GetSupplierPriceAsync(
        [Description("The item SKU")] string sku,
        [Description("Date to check pricing for (default: today)")] DateTime? date = null,
        CancellationToken ct = default)
    {
        return await _supplierService.GetSupplierPriceAsync(sku, date ?? DateTime.UtcNow, ct);
    }

    [KernelFunction]
    [Description("Gets the stock level available at the central warehouse")]
    public async Task<int> GetWarehouseStockAsync(
        [Description("The item SKU")] string sku,
        CancellationToken ct = default)
    {
        return await _supplierService.GetWarehouseStockAsync(sku, ct);
    }
}
