# Dataset Requirements for StoreMind Demo

This document specifies the data requirements for the StoreMind inventory demo. Future agents implementing the data layer should follow these specs.

---

## Decision: Curated In-Memory Dataset

We're using a **hand-curated dataset** of 30-50 convenience store items. No external database. No M5/Instacart datasets.

**Rationale:**
- Full control over demo scenarios (expiring items, low stock, etc.)
- Predictable LLM outputs for planning demos
- Zero setup complexity
- Fast iteration

---

## Data Schema

Each inventory item must conform to `InventoryItem` in [Snapshot.cs](../src/Kiyo9w.StoreMind.Core/Contracts/Snapshot.cs):

```csharp
public record InventoryItem(
    string Sku,           // e.g., "BNT-001"
    string Name,          // e.g., "Chicken Bento Box"
    string Description,   // Short description
    decimal Price,        // Selling price in JPY
    string Category,      // e.g., "Prepared Foods", "Beverages", "Household"
    int StockLevel,       // Current units in store
    DateTimeOffset? ExpirationDate = null,  // For perishables
    int LeadTimeDays = 1  // Days to restock from supplier
);
```

---

## Required Item Categories

The demo dataset must include items from these categories:

| Category | Count | Purpose in Demo |
|----------|-------|-----------------|
| **Prepared Foods** | 8-10 | Expiry scenarios (bento, onigiri, sandwiches) |
| **Beverages** | 6-8 | Low stock scenarios (milk, tea, coffee) |
| **Snacks** | 5-7 | Normal stock items |
| **Household** | 4-5 | Weather-dependent items (umbrellas, tissues) |
| **Seasonal** | 2-3 | Event-driven demand (beer for weekends) |

---

## Demo Scenario Data

The dataset must support these demo narratives:

### Scenario 1: Expiring Bento
- 3-5 prepared food items with `ExpirationDate` within 1-3 days
- Stock level: 20-50 units (enough to trigger markdown action)

### Scenario 2: Low Stock Milk
- 1-2 beverage items with `StockLevel < 10`
- Used to demo "recheck decision" flow in manager chat

### Scenario 3: Weather-Dependent Ordering
- Umbrellas with `StockLevel = 12` (low)
- Agent should recommend ordering when rain forecast exists

---

## Sample Items (Reference)

```json
[
  {
    "sku": "BNT-001",
    "name": "Chicken Teriyaki Bento",
    "description": "Rice with teriyaki chicken and vegetables",
    "price": 498,
    "category": "Prepared Foods",
    "stockLevel": 30,
    "expirationDate": "2026-01-24T20:00:00Z",
    "leadTimeDays": 1
  },
  {
    "sku": "MLK-001",
    "name": "Hokkaido Milk 1L",
    "description": "Fresh whole milk from Hokkaido",
    "price": 248,
    "category": "Beverages",
    "stockLevel": 8,
    "expirationDate": "2026-01-28T00:00:00Z",
    "leadTimeDays": 2
  },
  {
    "sku": "UMB-001",
    "name": "Compact Umbrella",
    "description": "Foldable umbrella, assorted colors",
    "price": 890,
    "category": "Household",
    "stockLevel": 12,
    "expirationDate": null,
    "leadTimeDays": 3
  }
]
```

---

## Image Enrichment (Optional)

If product images are needed for the Flutter UI:

1. Use **Open Food Facts API** for real product images
2. Query by barcode or product name: `GET https://world.openfoodfacts.org/api/v2/search?search_terms=milk`
3. Extract `product.image_front_url`
4. Store URL in an extended property or separate mapping

**Alternative:** Use placeholder images by category if OFF matching is unreliable.

---

## Implementation Location

The in-memory inventory implementation should:

1. Implement `IInventory` interface
2. Live in `src/Kiyo9w.StoreMind.Service/Services/InMemoryInventory.cs`
3. Seed data in constructor or from embedded JSON resource
4. Register in `Program.cs` as singleton

---

## Supplier Data

For the `ISupplier` interface, create matching mock data:

```csharp
public class InMemorySupplier : ISupplier
{
    // Return cost price (typically 60-70% of selling price)
    public Task<decimal?> GetSupplierPriceAsync(string sku, DateTime date, CancellationToken ct)
    {
        // SKU -> base cost lookup
        // Apply date-based fluctuation (±5%) for realism
    }

    // Return warehouse availability
    public Task<int> GetWarehouseStockAsync(string sku, CancellationToken ct)
    {
        // Return 100-500 units (always available for demo)
    }
}
```

---

## What NOT to Do

- Do NOT use real M5 or Instacart datasets (adds complexity)
- Do NOT connect to external databases
- Do NOT over-engineer data seeding (simple JSON array is fine)
- Do NOT implement data persistence (in-memory resets on restart is acceptable)
