using Xunit;
using Kiyo9w.StoreMind.Core.Contracts;

namespace Kiyo9w.StoreMind.Tests;

/// <summary>
/// Tests for snapshot and inventory logic
/// </summary>
public class SnapshotTests
{
    [Fact]
    public void inventory_item_expiry_logic_calculates_correctly()
    {
        // Arrange
        var now = DateTimeOffset.UtcNow;
        
        var fresh = new InventoryItem("A", "Fresh", "Desc", 10m, "Cat", 10, now.AddDays(10.5));
        var soon = new InventoryItem("B", "Soon", "Desc", 10m, "Cat", 10, now.AddDays(2));
        var expired = new InventoryItem("C", "Expired", "Desc", 10m, "Cat", 10, now.AddDays(-1));
        var nonPerishable = new InventoryItem("D", "Canned", "Desc", 10m, "Cat", 10);

        // Assert
        // Fresh
        Assert.False(fresh.IsExpiringSoon);
        Assert.False(fresh.IsExpired);
        Assert.Equal(10, fresh.DaysUntilExpiry);
        
        // Soon (< 3 days)
        Assert.True(soon.IsExpiringSoon);
        Assert.False(soon.IsExpired);
        
        // Expired
        Assert.False(expired.IsExpiringSoon);
        Assert.True(expired.IsExpired);
        Assert.True(expired.DaysUntilExpiry < 0);
        
        // Non-perishable
        Assert.Null(nonPerishable.DaysUntilExpiry);
    }

    [Fact]
    public void snapshot_aggregates_expiring_and_low_stock_and_value()
    {
        // Arrange
        var now = DateTimeOffset.UtcNow;
        var items = new[]
        {
            // Low stock (5), Expiring soon (2 days), Value 500
            new InventoryItem("SKU-1", "Bento", "D", 100m, "Food", StockLevel: 5, ExpirationDate: now.AddDays(2)), 
            // Normal stock (20), Expired (-1 days), Value 2000
            new InventoryItem("SKU-2", "Milk", "D", 100m, "Dairy", StockLevel: 20, ExpirationDate: now.AddDays(-1)),
            // Low stock (8), Fresh (10 days), Value 800
            new InventoryItem("SKU-3", "Bread", "D", 100m, "Bakery", StockLevel: 8, ExpirationDate: now.AddDays(10))
        };
        var snapshot = new Snapshot("store-1", now, items);

        // Act
        var expiringIn3Days = snapshot.GetExpiringItems(3).ToList();
        var lowStock = snapshot.GetLowStockItems(10).ToList();
        var totalValue = snapshot.TotalValue;

        // Assert
        // SKU-1 (2 days) and SKU-2 (-1 days) match "within 3 days" logic usually? 
        // Logic check: <= AsOf.AddDays(3). -1 is <= +3. So both.
        Assert.Contains(items[0], expiringIn3Days);
        Assert.Contains(items[1], expiringIn3Days);
        Assert.DoesNotContain(items[2], expiringIn3Days);

        // Low stock (< 10): SKU-1 (5) and SKU-3 (8)
        Assert.Contains(items[0], lowStock);
        Assert.Contains(items[2], lowStock);
        Assert.Equal(2, lowStock.Count);

        // Total Value: 500 + 2000 + 800 = 3300
        Assert.Equal(3300m, totalValue);
        Assert.NotNull(snapshot.SnapshotId);
    }
}
