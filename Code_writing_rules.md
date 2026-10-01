# ASP.NET Core Coding Standards & Anti-Patterns

This document outlines strict coding standards to apply across all ASP.NET Core projects. The goal is to avoid "AI-generated" bloat and maintain a clean, human-like, and concise codebase.

## 1. Naming Conventions: Conciseness Over Description

Context should come from namespaces and folder structures, not redundant class suffixes. We value short, punchy names.

### ❌ Anti-Pattern: The "Suffix Soup"
Do not attach redundant suffixes that describe the *type* of the file rather than its *domain* purpose.
*   `UserEntity`
*   `ProductDto`
*   `OrderRepository`
*   `InventoryPlugin`
*   `PaymentService` (unless it's a generic infrastructure service)
*   `CustomerController` (Controller suffix is often required by framework, but keep it minimal everywhere else)

### ✅ The Rule: 1-2 Word Domain Names
Use the sharpest possible noun.
*   `User`
*   `Product`
*   `Order` (inside `Repositories` namespace)
*   `Inventory` (inside `Plugins` namespace)
*   `Payment` (inside `Services` namespace)

**Exceptions:**
*   Framework-mandated suffixes (e.g., `Controller` in MVC, though Minimal APIs avoid this).
*   Configuration options (e.g., `DatabaseOptions` is acceptable for clarity).

## 2. API Contract Naming

Simplify Request/Response records. The context of "Input" and "Output" is usually obvious from usage.

### ❌ Anti-Pattern: Verbose Contracts
*   `CreateUserRequest`
*   `CreateUserResponse`
*   `GetProductQuery`
*   `GetProductResult`

### ✅ The Rule: Direct Naming
*   `CreateUser` (The input)
*   `UserCreated` or `CreationResult` (The output)
*   `ProductQuery`
*   `ProductResult`

## 3. Commenting Style: Human, Casual, & Direct

Comments should read like they were written by a developer in a hurry, not a grammatically rigid machine. Lowercase is fine. Fragment sentences are fine.

### ❌ Anti-Pattern: The "Robotic Librarian"
*   **Trailing Periods:** `/// <summary> Gets the user by ID. </summary>`
*   **Top-Level Headers:** `// Service: Program.cs - ASP.NET Core host...`
*   **Stating the Obvious:** `// Constructor` or `// Sets the value`
*   **Formal Grammar:** "This method is responsible for validating the input."

### ✅ The Rule: Natural & direct
*   **No Trailing Periods:** `/// <summary> gets the user by id </summary>`
*   **No File Headers:** We can see the filename; don't repeat it.
*   **Casual Tone:** "basically to make sure we can read/write the json correctly"
*   **Capitalize "AI":** Always "AI", never "ai".
*   **Snake Case in Tests:** `public void should_return_error_if_invalid()` is often more readable for tests.

## 4. Domain & Cultural Neutrality

Unless the project is explicitly localized (e.g., a Tokyo-specific travel app), avoid hardcoding assumptions about currency, culture, or specific product types in core logic and tests.

### ❌ Anti-Pattern: Cultural Hardcoding
*   Specific Currencies: `PriceYen`, `CostUSD`, `FeeEUR`
*   Specific Cultural Test Data: "Sushi", "Wagyu", "Hamburger", "Fish & Chips" (unless relevant)
*   Region-Specific Logic: Hardcoding tax rates or business hours specific to one country in core domain logic.

### ✅ The Rule: Generic Universals
*   **Currency Neutral:** `Price`, `Cost`, `Fee`, `Amount`.
*   **Generic Test Data:** "Premium Item", "Standard Product", "Category A".
*   **Configurable Logic:** Strategy patterns for region-specific rules.

## 5. Simplicity in Testing

Test file names should match the concise naming of the classes they test.

### ❌ Anti-Pattern: Verbose Test Names
*   `UserAuthenticationIntegrationTests.cs`
*   `ProductInventoryUnitTests.cs`

### ✅ The Rule: Concise Test Names
*   `AuthTests.cs`
*   `InventoryTests.cs`

## 1. DTO Design (Contracts & Models)

**Core Principle:** DTOs (Data Transfer Objects) must be dumb. They are containers for data, nothing else.

### 🔴 Anti-Patterns (Do NOT Do This)
*   **Smart DTOs:** Adding logic, methods, or behavior to a DTO.
*   **Self-Validation:** Implementing `IsValid()` methods or complex validation logic inside the record/class. Validation belongs in the Service/Validator layer, not the Contract.
*   **Factory Methods:** Creating static factory methods (e.g., `Result.Success()`, `Verdict.Approved()`) for simple DTOs. This couples the data structure to specific creation logic and makes serialization/deserialization harder for generic tools.
*   **Nested Helper Types:** Defining Enums or helper classes *inside* a DTO record. Keep them at the namespace level or in separate files.

### 🟢 Best Practices (Do This)
*   **Simple Records:** Use C# `record` types with clear properties.
*   **Public Settable Properties:** Ensure properties are easy to set (init-only is fine) to support easy serialization/deserialization by AI agents and JSON serializers.
*   **Validation Externalization:** Use FluentValidation or manual checks in the service layer if data needs validating.

**Example:**

```csharp
// ❌ BAD: Over-engineered "Smart" DTO
public record Operation(string Op, string Path) {
    public bool IsValid() => !string.IsNullOrEmpty(Op); // Logic in DTO
    
    public static Operation Replace(string path) => new("replace", path); // Factory method
}

// ✅ GOOD: Simple Data Carrier
public record Operation(
    string Op,
    string Path,
    object? Value
);
```

## 2. Commenting & Text Style ("Humanization")

**Core Principle:** Comments and user-facing strings should sound like a casual, competent human developer, not a robotic generator.

### 🔴 Anti-Patterns (Do NOT Do This)
*   **Robotic Formality:** "Represents the specific instance of..." or "Gets or sets the value indicating whether..."
*   **Trailing Periods:** Putting a period at the end of every single comment line or fragment.
*   **Stating the Obvious:** `// Sets the ID` above `target.Id = id;`.
*   **Over-Documentation:** XML docs for internal private methods or self-explanatory DTO properties unless generating public API docs.

### 🟢 Best Practices (Do This)
*   **Casual & Direct:** Use natural language. Ideally, lowercase start for quick comments.
*   **Explain "Why", not "What":** Focus on intent or weird edge cases.
*   **No Periodic Formatting:** Drop the trailing periods for single-line comments.

**Example:**

```csharp
// ❌ BAD: Robotic
/// <summary>
/// Retrieves the inventory snapshot for the specified store identifier.
/// </summary>
/// <param name="storeId">The unique identifier of the store.</param>
public async Task<Snapshot> GetAsync(string storeId) { ... }

// ✅ GOOD: Human
// gets the current inventory snapshot regarding a store
public async Task<Snapshot> GetAsync(string storeId) { ... }
```

## 3. General Architecture (YAGNI / KISS)

**Core Principle:** Do not implement features "just in case."

### 🔴 Anti-Patterns (Do NOT Do This)
*   **Pre-emptive Abstraction:** Creating interfaces, base classes, or generic repositories for a simple verified requirement.
*   **Unused Policy Engines:** writing complex "Policy" or "Gatekeeper" classes with static validation methods that aren't actually hooked up to anything yet.
*   **Strict Enums for everything:** If a simple string constant works and gives more flexibility to an LLM, use a string.

### 🟢 Best Practices (Do This)
*   **Implement for Now:** Write the code needed to pass the current test or requirement.
*   **Refactor Later:** If duplication appears 3 times, then refactor. Not before.
*   **Trust the Agent:** In AI-native apps, allow the LLM some flexibility. Don't lock down every input with strict Enum parsing if the LLM might output a slightly different but valid string (unless strictness is required for correctness).
