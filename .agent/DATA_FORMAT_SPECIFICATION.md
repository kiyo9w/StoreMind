# StoreMind Data Format Specification

> **Purpose**: This document defines the canonical data formats for all entities in StoreMind. All mock data, test fixtures, LLM prompts, and future database records MUST conform to these specifications to ensure consistency across the codebase.

---

## 📋 Table of Contents

1. [General Conventions](#general-conventions)
2. [Identifiers](#identifiers)
3. [Date & Time Formats](#date--time-formats)
4. [Monetary Values](#monetary-values)
5. [Core Entities](#core-entities)
   - [InventoryItem](#inventoryitem)
   - [Snapshot](#snapshot)
   - [Plan](#plan)
   - [Proposal (Action)](#proposal-action)
   - [Evidence](#evidence)
   - [Verdict](#verdict)
   - [Log](#log)
6. [Supplier Data](#supplier-data)
7. [Weather Data](#weather-data)
8. [API Request/Response Models](#api-requestresponse-models)
9. [Mock Data Guidelines](#mock-data-guidelines)
10. [LLM Output Schema](#llm-output-schema)
11. [Validation Rules](#validation-rules)

---

## General Conventions

### JSON Serialization Policy
- **Property naming**: Use `snake_case` for JSON serialization
- **Null handling**: Omit null values in serialization unless explicitly required
- **Enum serialization**: Use string representation (via `JsonStringEnumConverter`)

### String Conventions
- **Empty vs Null**: Use `null` for absent/unknown values, empty string `""` is invalid for required fields
- **Whitespace**: Trim all text inputs, reject whitespace-only strings
- **Encoding**: UTF-8 for all text

---

## Identifiers

All identifiers follow a predictable pattern to enable parsing and correlation.

| Entity | Format | Example | Notes |
|--------|--------|---------|-------|
| **Store ID** | `store-{NNN}` | `store-001` | 3-digit zero-padded number |
| **SKU** | `{CATEGORY}-{NNN}` | `MILK-001`, `PASTA-001` | Category uppercase, 3-digit number |
| **Snapshot ID** | `snap-{yyyyMMddHHmmss}-{guid}` | `snap-20260128020000-a1b2c3` | Truncated to 28 chars |
| **Plan ID** | `plan-{yyyyMMdd}-{guid}` | `plan-20260128-a1b2c3d4` | Truncated to 24 chars |
| **Action/Proposal ID** | `{guid}` | `a1b2c3d4` | 8-char hex string from GUID |
| **Log ID** | `{guid}` | Full 32-char hex GUID | |
| **Correlation ID** | `corr-{yyyyMMddHHmmss}-{guid}` | `corr-20260128020000-a1b2` | Links related events |

### SKU Categories (Canonical List)

| Category Code | Display Name | Examples |
|--------------|--------------|----------|
| `MILK` | Dairy - Milk | Fresh milk, flavored milk |
| `YOGURT` | Dairy - Yogurt | Greek yogurt, fruit yogurt |
| `BREAD` | Bakery | Sliced bread, buns |
| `RICE` | Grains - Rice | Jasmine rice, brown rice |
| `PASTA` | Grains - Pasta | Spaghetti, penne |
| `WATER` | Beverages - Water | Mineral water, sparkling |
| `SODA` | Beverages - Soda | Cola, orange soda |
| `CHIPS` | Snacks | Potato chips, corn chips |
| `SOAP` | Personal Care | Hand soap, body wash |
| `UMB` | Accessories | Umbrellas |
| `BENTO` | Ready Meals | Bento boxes, meal kits |
| `SAKE` | Alcohol | Sake, beer |
| `CRACKERS` | Snacks - Crackers | Rice crackers, biscuits |

---

## Date & Time Formats

| Context | Format | Example | Type in C# |
|---------|--------|---------|------------|
| **Plan Date** | `yyyy-MM-dd` | `2026-01-28` | `string` (validated) |
| **Timestamps** | ISO 8601 with offset | `2026-01-28T02:00:00+09:00` | `DateTimeOffset` |
| **Expiration dates** | ISO 8601 with offset | `2026-02-01T00:00:00Z` | `DateTimeOffset?` |
| **Evidence timestamps** | ISO 8601 UTC | `2026-01-28T02:00:00Z` | `DateTime` |
| **Date in file names** | `yyyy-MM-dd` | `2026-01-28.json` | N/A |

### Validation Rules
- Plan date MUST be in `yyyy-MM-dd` format (not `yyyy-M-d`, not `dd-MM-yyyy`)
- All timestamps MUST include timezone offset or be explicitly UTC (`Z` suffix)
- Evidence timestamps use `DateTime` (assumes UTC context)

---

## Monetary Values

| Context | Type | Precision | Example |
|---------|------|-----------|---------|
| **Retail price** | `decimal` | 2 decimal places | `2.50` |
| **Supplier price** | `decimal` | 2 decimal places | `1.80` |
| **Margin delta** | `decimal` | 2 decimal places | `375.00` |
| **Waste reduction** | `decimal` | 2 decimal places | `5000.00` |
| **Action quantity** | `decimal` | 0 decimal places (whole units) | `30` |

### Currency
- Default currency: **JPY** (Japanese Yen) or **USD** based on context
- Currency symbol is NOT stored with values (implicit from store configuration)
- All monetary calculations use `decimal` to avoid floating-point errors

---

## Core Entities

### InventoryItem

```json
{
  "sku": "MILK-001",
  "name": "Fresh Milk 1L",
  "description": "Pasteurized whole milk",
  "price": 2.50,
  "category": "Dairy",
  "stock_level": 8,
  "expiration_date": "2026-01-30T00:00:00Z",
  "lead_time_days": 1
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `sku` | string | ✅ | Pattern: `{CATEGORY}-{NNN}` |
| `name` | string | ✅ | Max 100 chars, non-empty |
| `description` | string | ✅ | Max 500 chars |
| `price` | decimal | ✅ | > 0 |
| `category` | string | ✅ | From canonical category list |
| `stock_level` | int | ✅ | >= 0 |
| `expiration_date` | DateTimeOffset? | ❌ | Null for non-perishables |
| `lead_time_days` | int | ❌ | Default: 1, range: 1-365 |

### Snapshot

```json
{
  "snapshot_id": "snap-20260128020000-a1b2c3",
  "store_id": "store-001",
  "as_of": "2026-01-28T02:00:00+09:00",
  "items": [ /* InventoryItem[] */ ]
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `snapshot_id` | string | ✅ | Auto-generated, 28 chars |
| `store_id` | string | ✅ | Pattern: `store-{NNN}` |
| `as_of` | DateTimeOffset | ✅ | Must be valid timestamp |
| `items` | InventoryItem[] | ✅ | Non-empty array |

### Plan

```json
{
  "plan_id": "plan-20260128-a1b2c3d4",
  "date": "2026-01-28",
  "generated_at": "2026-01-28T02:00:00+09:00",
  "model_used": "claude-opus-4.5",
  "confidence_score": 0.85,
  "assumptions": [
    "Plan generated at 02:00 UTC using auto function calling",
    "Tools used: Inventory, Weather, Supplier"
  ],
  "actions": [ /* Proposal[] */ ],
  "questions_for_manager": [
    "Should we increase umbrella stock given the extended forecast?"
  ]
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `plan_id` | string | ✅ | Auto-generated, 24 chars |
| `date` | string | ✅ | Format: `yyyy-MM-dd` |
| `generated_at` | DateTimeOffset | ✅ | Auto-set on creation |
| `model_used` | string? | ❌ | Model identifier |
| `confidence_score` | double | ✅ (computed) | Range: 0.0-1.0 |
| `assumptions` | string[] | ✅ | Can be empty array |
| `actions` | Proposal[] | ✅ | At least 1 action required |
| `questions_for_manager` | string[] | ✅ | Can be empty array |

### Proposal (Action)

```json
{
  "id": "a1b2c3d4",
  "type": "DraftPo",
  "target": {
    "sku": "MILK-001",
    "qty": 20
  },
  "expected_impact": {
    "waste_reduction": 0.00,
    "margin_delta": 36.00,
    "stockout_risk_delta": -0.20
  },
  "confidence": 0.85,
  "evidence": [ /* Evidence[] */ ],
  "risk_flags": ["critical_low_stock"],
  "requires_manager_approval": true,
  "approval_state": "Draft",
  "rejected_by": null,
  "rejection_reason": null
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `id` | string | ✅ | 8-char hex |
| `type` | ProposalType | ✅ | Enum value |
| `target` | ActionTarget | ✅ | Non-null, valid SKU |
| `expected_impact` | ExpectedImpact | ✅ | Non-null |
| `confidence` | double | ✅ | Range: 0.0-1.0 |
| `evidence` | Evidence[] | ✅ | At least 1 required |
| `risk_flags` | string[] | ✅ | Can be empty |
| `requires_manager_approval` | bool | ❌ | Default: true |
| `approval_state` | ApprovalState | ❌ | Default: Draft |

#### ProposalType Values
| Value | Description | Use Case |
|-------|-------------|----------|
| `DraftPo` | Purchase Order | Restocking items |
| `DraftMarkdown` | Price Reduction | Expiring items |
| `DraftBundle` | Product Bundle | Cross-selling |
| `DraftTransfer` | Inventory Transfer | Multi-store |
| `DraftTask` | Staff Task | Manual actions |
| `Alert` | Notification Only | Warnings |

#### ApprovalState Values
| Value | Description |
|-------|-------------|
| `Draft` | Initial state |
| `PendingReview` | Awaiting manager |
| `Approved` | Manager approved |
| `Rejected` | Manager rejected |
| `Executed` | Action completed |
| `Cancelled` | Action cancelled |

### Evidence

```json
{
  "source": "InventorySnapshot",
  "timestamp": "2026-01-28T02:00:00Z",
  "entityId": "snap-20260128020000-a1b2c3"
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `source` | string | ✅ | From canonical list |
| `timestamp` | DateTime | ✅ | Must not be default |
| `entityId` | string | ✅ | Non-empty |

#### Evidence Source Values (Canonical)
| Source | Description |
|--------|-------------|
| `InventorySnapshot` | Current inventory state |
| `ExpiryReport` | Expiration analysis |
| `Weather` | Weather forecast data |
| `SalesHistory` | Historical sales data |
| `Policy` | Store policy reference |

### Verdict

```json
{
  "verdict": "Approve",
  "issued_at": "2026-01-28T02:05:00+09:00",
  "model_used": "gpt-5.2",
  "blocking_issues": [],
  "suggested_patch": []
}

### SalesPerformance

```json
{
  "sku": "MILK-001",
  "avg_weekly_sales": 200.5,
  "last_week_sales": 210,
  "trend": "stable"
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `sku` | string | ✅ | Valid SKU |
| `avg_weekly_sales` | double | ✅ | >= 0 |
| `last_week_sales` | int | ✅ | >= 0 |
| `trend` | string | ❌ | "up", "down", "stable" |
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `verdict` | VerdictType | ✅ | `Approve` or `Revise` |
| `issued_at` | DateTimeOffset | ✅ | Auto-set |
| `model_used` | string? | ❌ | Model identifier |
| `blocking_issues` | BlockingIssue[] | ✅ | Can be empty |
| `suggested_patch` | JsonPatchOp[] | ✅ | Can be empty |

### Log

```json
{
  "id": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
  "correlation_id": "corr-20260128020000-a1b2",
  "type": "PlanGenerated",
  "timestamp": "2026-01-28T02:00:00+09:00",
  "agent_name": "OvernightPlanner",
  "model_used": "claude-opus-4.5",
  "tool_name": null,
  "input": null,
  "output": "Plan ID: plan-20260128-a1b2c3d4",
  "latency_ms": 3500,
  "error": null,
  "context": {
    "store_id": "store-001",
    "action_count": 3
  }
}
```

---

## Supplier Data

### Supplier Price Map
```json
{
  "MILK-001": 1.80,
  "YOGURT-002": 2.20,
  "BREAD-001": 1.20
}
```

### Warehouse Stock Map
```json
{
  "MILK-001": 200,
  "YOGURT-002": 150,
  "BREAD-001": 100
}
```

**Constraints:**
- All SKUs must match the canonical format
- Prices must be `decimal` with 2 decimal precision
- Stock quantities must be positive integers

---

## Weather Data

### WeatherForecast

```json
{
  "summary": "Rain expected. Current: 15.5°C, Humidity: 78%",
  "temperature_celsius": 15.5,
  "humidity_percent": 78,
  "rain_expected": true
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `summary` | string | ✅ | Human-readable |
| `temperature_celsius` | double | ✅ | Realistic range: -50 to 60 |
| `humidity_percent` | int | ✅ | Range: 0-100 |
| `rain_expected` | bool | ✅ | |

---

## API Request/Response Models

### StaffQuery / StaffAnswer

```json
// Request
{
  "question": "Do we have milk in stock?",
  "store_id": "store-001"
}

// Response
{
  "answer": "Yes, we have 8 units of Fresh Milk 1L (MILK-001) in stock.",
  "query": "Do we have milk in stock?",
  "latency_ms": 245
}
```

### ManagerChatRequest / ManagerChatResponse

```json
// Request
{
  "message": "Increase the rice order to 50 units",
  "plan_date": "2026-01-28"
}

// Response
{
  "reply": "Updated rice order from 20 to 50 units.",
  "updated_plan": { /* Plan object or null */ },
  "action_modified": "a1b2c3d4"
}
```

---

## Mock Data Guidelines

### When Creating Mock Inventory Items

```csharp
// ✅ CORRECT
new InventoryItem(
    Sku: "MILK-001",           // Category-NNN format
    Name: "Fresh Milk 1L",      // Descriptive, includes size
    Description: "Pasteurized whole milk",  // Brief description
    Price: 2.50m,               // Decimal with m suffix
    Category: "Dairy",          // From canonical list
    StockLevel: 8,              // Realistic number
    ExpirationDate: DateTimeOffset.UtcNow.AddDays(2)  // Use DateTimeOffset
)

// ❌ WRONG - Inconsistencies found in codebase
new InventoryItem(
    Sku: "milk001",            // ❌ Missing dash, lowercase
    Name: "Milk",              // ❌ Too brief, no size
    Description: "",           // ❌ Empty description
    Price: 2.5,                // ❌ Missing 'm' suffix (compiles but unclear)
    Category: "dairy",         // ❌ Lowercase category
    StockLevel: -1,            // ❌ Negative stock
    ExpirationDate: DateTime.Now.AddDays(2)  // ❌ Should use DateTimeOffset
)
```

### Reference Mock Dataset

Use these items as the **canonical demo dataset**:

```csharp
// Dairy - Expiring Soon
("MILK-001", "Fresh Milk 1L", "Pasteurized whole milk", 2.50m, "Dairy", 8, +2 days)
("YOGURT-002", "Greek Yogurt 500g", "Plain greek yogurt", 3.20m, "Dairy", 12, +1 day)

// Bakery - Expiring Soon
("BREAD-001", "White Bread Loaf", "Sliced white bread", 1.80m, "Bakery", 5, +2 days)

// Grains - Low Stock
("RICE-001", "Jasmine Rice 5kg", "Premium Thai jasmine rice", 12.00m, "Grains", 3, +180 days)
("PASTA-001", "Spaghetti 500g", "Italian durum wheat pasta", 2.50m, "Grains", 7, +365 days)

// Accessories - Low Stock, No Expiry
("UMB-001", "Compact Umbrella", "Foldable travel umbrella", 15.00m, "Accessories", 2, null)

// Beverages - Normal Stock
("WATER-001", "Mineral Water 1.5L", "Natural spring water", 1.00m, "Beverages", 45, null)
("SODA-001", "Cola 330ml", "Classic cola can", 1.50m, "Beverages", 60, +90 days)

// Snacks - Normal Stock
("CHIPS-001", "Potato Chips 150g", "Salted potato chips", 2.80m, "Snacks", 35, +60 days)

// Personal Care - Normal Stock, No Expiry
("SOAP-001", "Hand Soap 250ml", "Antibacterial hand soap", 3.50m, "Personal Care", 25, null)
```

---

## LLM Output Schema

### For OvernightPlanner (Action Generation)

When prompting an LLM to generate actions, expect this output format:

```json
[
  {
    "sku": "MILK-001",
    "qty": 20,
    "confidence": 0.85,
    "reason": "Low stock (8 units), high turnover item, supplier price favorable"
  }
]
```

**Parsing Rules:**
- Extract JSON array from response (find first `[` to last `]`)
- Validate each SKU exists in current snapshot
- Confidence must be 0.0-1.0
- Quantity must be positive integer

### For PlanCritic (Verdict)

```json
{
  "approved": true,
  "issues": []
}
```

Or with issues:

```json
{
  "approved": false,
  "issues": [
    {
      "action_index": 0,
      "reason": "Order quantity 150 exceeds maximum 100",
      "policy": "max_qty"
    }
  ]
}
```

### For ManagerChat (Action Modification)

```json
{
  "action_id": "a1b2c3d4",
  "new_qty": 50,
  "reply": "I've updated the rice order from 20 to 50 units."
}
```

---

## Validation Rules

### Business Rules (Enforced in Code)

| Rule | Value | Enforcement |
|------|-------|-------------|
| Max order quantity per SKU | 100 units | PlanCritic |
| Minimum confidence threshold | 0.50 (50%) | PlanCritic |
| Safety stock threshold | 10 units | PlanCritic |
| Max discount percentage | 50% | Future |
| Evidence required per action | >= 1 | Plan.Validate() |

### Date Format Validation

```csharp
// Valid formats for Plan.Date
"2026-01-28"  // ✅
"2026-1-28"   // ❌ Missing leading zero
"28-01-2026"  // ❌ Wrong order
"2026/01/28"  // ❌ Wrong separator
```

---

## Checklist for New Mock Data

When adding new mock data to the codebase:

- [ ] SKU follows `{CATEGORY}-{NNN}` pattern
- [ ] Category is from the canonical list
- [ ] Price uses `decimal` with 2 decimal places
- [ ] Stock level is non-negative integer
- [ ] Expiration date uses `DateTimeOffset` (or null for non-perishables)
- [ ] Description is meaningful (not empty)
- [ ] Name includes relevant details (size, variant)
- [ ] Supplier price exists if item is in mock inventory
- [ ] Warehouse stock exists if item is in mock inventory

---

## Known Inconsistencies to Fix

The following inconsistencies were identified during codebase analysis:

### 1. Evidence Timestamp Type Mismatch
- **Location**: `Evidence.cs` uses `DateTime` for `Timestamp`
- **Issue**: Inconsistent with other timestamps using `DateTimeOffset`
- **Impact**: Timezone handling ambiguity
- **Recommendation**: Consider migrating to `DateTimeOffset`

### 2. Test Data SKU Format
- **Location**: `PlanTests.cs`
- **Issue**: Uses `GRAIN-005` which is not in the canonical mock dataset
- **Recommendation**: Use SKUs from the canonical list or add `GRAIN` to categories

### 3. Snapshot ID Generation
- **Location**: `Snapshot.cs`
- **Issue**: ID is generated with `DateTime.UtcNow` (not `DateTimeOffset`)
- **Recommendation**: Consider using `DateTimeOffset.UtcNow` for consistency

### 4. Lead Time Days Default
- **Location**: `MockServices.cs` vs `InventoryItem.cs`
- **Issue**: Mock data doesn't explicitly set `LeadTimeDays`, relies on default
- **Recommendation**: Explicitly set values in mock data for clarity

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-28 | AI Assistant | Initial specification |

---

> **Note for LLM Agents**: When generating mock data, test fixtures, or processing inventory data, ALWAYS reference this specification to ensure format consistency. Pay special attention to:
> - SKU format: `{CATEGORY}-{NNN}`
> - Date format for plans: `yyyy-MM-dd`
> - Confidence range: `0.0` to `1.0`
> - Evidence is REQUIRED for all proposals
