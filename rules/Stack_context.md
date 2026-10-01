# RETAILMIND PROJECT CONTEXT (v5.0)
**CRITICAL**: This file is the **single source of truth**. If it conflicts with other files, **THIS FILE WINS**.

---

## 0. ARCHITECTURAL VISION
StoreMind is a **Hybrid Intelligence System** that rejects the "one model to rule them all" premise. We route tasks to the best model for the job based on **reasoning depth**, **speed**, and **cost**.

### The "Best-of-Breed" Routing Table
| Role | Component | Primary Model (2026) | Fallback | Why? |
|------|-----------|----------------------|----------|------|
| **Planner** | Overnight Strategy | **Claude Opus 4.5** | GPT-5.2 | Requires massive context & long-form planning quality. |
| **Quant** | Margin/Waste Optimizer | **GPT-5.2** | *(See Note)* | Strongest math reasoning for "Profit vs Waste" trade-offs. |
| **Manager** | Daytime RAG Chatbot | **GPT-5.2 (Fast)** | Claude Opus | Latency-sensitive (<3s) explanations. |
| **Querry** | Staff Q&A | **Phi-3-mini** | *(Cloud RAG)* | Access to central vector store. |



### Model ID Aliasing
Use `ModelId` alias mapping in configuration; **never hardcode vendor-specific IDs in prompts**.
```json
{
  "ModelAliases": {
    "Planner": "claude-opus-4.5",
    "Quant": "gpt-5.2",
    "Manager": "gpt-5.2-fast",
    "Querry": "phi-3-mini"
  }
}
```

---

## 1. PROMPT STRUCTURE (Tagged Blocks)
All agent prompts MUST use explicit tagged blocks for reliability and linting:

```xml
<Background>
  Context about the retail domain, current store state, and business objectives.
</Background>

<Instructions>
  Step-by-step task instructions using Role-Goal-Tool-Constraint format.
</Instructions>

<Tools>
  List of available tools with their contracts (see Section 1.B).
</Tools>

<OutputSchema>
  The exact JSON schema the agent must produce.
</OutputSchema>

<FailureModes>
  Known failure modes and how the agent should handle them.
</FailureModes>
```

---

## 2. AGENT & MEMORY CONTRACT
### A. Memory Protocol
After **EVERY** task, agents **MUST** update `MEMORY.md`.
- **Log Decisions**: "Routed to Claude Opus because task required 30-day forecast context."
- **Log Routing Failures**: "GPT-5.2 API timeout; fell back to GLM-4.6."
- **Artifacts Produced**: List artifacts (e.g., `DecisionPlan.json`, `DecisionLog`).
- **Model Routing Used**: Which model called, fallback used, latency observed.

### B. Tool Contract Specification
Each tool MUST have a defined contract:

| Tool Name | Inputs (JSON Schema) | Outputs | Error Conditions | Allowed Callers |
|-----------|---------------------|---------|------------------|-----------------|
| `GetInventory` | `{ "storeId": "string", "asOf": "datetime" }` | `InventorySnapshot` | `StoreNotFound`, `DataStale` | Planner, Manager, Querry |
| `GetWeather` | `{ "location": "string", "days": "int" }` | `WeatherForecast` | `LocationInvalid` | Planner |
| `DraftPurchaseOrder` | `{ "sku": "string", "qty": "decimal", "evidence": "EvidencePointer" }` | `DraftId` | `SkuNotFound`, `QtyExceedsLimit` | Planner |
| `DraftMarkdownPlan` | `{ "sku": "string", "discount": "decimal", "evidence": "EvidencePointer" }` | `DraftId` | `DiscountExceedsMax` | Planner |
| `SubmitOrder` | `{ "draftId": "string", "approvalRecord": "string" }` | `OrderConfirmation` | `ApprovalMissing`, `DraftExpired` | Manager (HITL Only) |

**Tool Rules**:
- Tools MUST be deterministic; LLM can only request tool calls—tools compute numbers.
- All tool calls MUST log inputs/outputs and correlation IDs into `DecisionLog`.

### C. Tool Access Protocol (Least Privilege)
Agents are NOT allowed unrestricted access.
1.  **Read Tools** (Safe): `GetInventory`, `GetWeather`, `GetSalesHistory`.
2.  **Draft Tools** (Planning): `DraftPurchaseOrder`, `DraftMarkdownPlan`. **NEVER** execute directly.
3.  **Execute Tools** (Hard Gated): `SubmitOrder`, `UpdatePrice`. **Requires persisted human approval (review record) or an externally signed policy token.**

---

## 3. TERMINATION & BUDGET RULES
For any multi-agent orchestration, explicit limits MUST be enforced:

| Control | Limit | On Exceed |
|---------|-------|-----------|
| **Max Iterations** | 3 (Planner → Critic → Repair) | Fail closed, log raw output |
| **Max Tool Calls** | 10 per agent invocation | Fail closed |
| **Max Tokens** | 16K input, 4K output per call | Truncate context, log warning |
| **Timeout** | 60s per agent call | Fail closed, use cached fallback |

**Orchestration Flow**: `Planner (1 call) → Critic (1 call) → Optional Repair (1 call) → STOP`.

---

## 4. TOOLCHAIN & VERSIONS (Pinned)
### A. Environment
**Global.json**:
```json
{
  "sdk": {
    "version": "9.0.101",
    "rollForward": "latestFeature"
  }
}
```

### B. NuGet Packages (Exact)
| Package | Version | Purpose |
|---------|---------|---------|
| `Microsoft.SemanticKernel` | `1.68.0` | Core Orchestrator |
| `Microsoft.ML.OnnxRuntimeGenAI` | `0.7.0` | Querry Inference (Phi-3) |
| `Qdrant.Client` | `1.12.0` | Vector Store |
| `Microsoft.Extensions.Options.ConfigurationExtensions` | `9.0.0` | Config Binding |

> **Note**: `AgentGroupChat` (alpha) is **optional** and isolated to "Debate Mode" only. Not required for Sense→Propose→Critique pattern.

---

## 5. CORE DOMAIN MODEL (Canonical Schema)
**CRITICAL**: This is the **canonical** schema. `Plan.mdc`, `Execution.mdc`, and all code MUST conform to this.

### A. Entities
```csharp
namespace Kiyo9w.StoreMind.Core;

// Action Type Enum (Strongly Typed)
public enum ActionType
{
    DraftPo,
    DraftMarkdown,
    Transfer,
    Alert
}

// Evidence Pointer (Structured, not a single string)
public record EvidencePointer(
    string Source,        // e.g., "InventorySnapshot", "ExpiryReport"
    DateTime Timestamp,   // When the evidence was captured
    string EntityId       // e.g., SKU ID, Snapshot ID
);

// The "Decision Artifact" (Output of Overnight Planning)
public record DecisionPlan(
    string Date,                           // YYYY-MM-DD
    string Description,
    IReadOnlyList<PlannedAction> Actions,  // Strongly typed list
    IReadOnlyList<string> Risks,
    double ConfidenceScore
);

public record PlannedAction(
    ActionType ActionType,                 // Enum, not string
    string TargetSku,
    decimal Quantity,
    EvidencePointer Evidence,              // Structured evidence
    bool RequiresApproval = true
);
```

---

## 6. CODE PATTERN BANK (Orchestration)
**"Sense -> Propose -> Critique -> Terminate -> Persist"**

### A. The "Overnight Planner" (Claude Opus / GPT-5.2)
Use `ChatCompletionAgent` with strict JSON schema instructions.

```csharp
var plannerAgent = new ChatCompletionAgent {
    Name = "StoreOpsPlanner",
    Instructions = """
        <Background>Retail store nightly planning context.</Background>
        <Instructions>
        ROLE: StoreOps Planner (Nightly).
        GOAL: Generate a draft decision plan to minimize waste and maximize margin.
        TOOLS: Read-only tools + Draft tools.
        CONSTRAINT: NO EXECUTION. Output valid JSON. Cite evidence for every action.
        </Instructions>
        <OutputSchema>DecisionPlan JSON schema</OutputSchema>
        <FailureModes>On invalid SKU, return error in Risks array.</FailureModes>
    """,
    Kernel = kernel 
    // Arguments: Set model via ModelId alias, not vendor-specific ID
};
```

### B. The "Risk Critic" (Compliance)
This agent validates the plan *before* it's saved.

```csharp
var criticAgent = new ChatCompletionAgent {
    Name = "RiskEnforcer",
    Instructions = """
        ROLE: Risk & Policy Enforcer.
        TASK: Review the 'DecisionPlan' JSON.
        POLICY:
        - Max markdown is 50%.
        - Safety stock must be > 10 units for staples.
        OUTPUT: "APPROVE" or "REJECT: [Reason]".
    """,
    Kernel = kernel
};
```

### C. Orchestration Loop (Explicit Control)
Do NOT rely on "magic" conversation. Use code to drive the loop.

```csharp
// 1. SENSE
var snapshot = await inventoryService.GetSnapshotAsync();

// 2. PROPOSE
var history = new ChatHistory();
history.AddUserMessage(JsonSerializer.Serialize(snapshot));
var planJson = await plannerAgent.InvokeAsync(history);

// 3. CRITIQUE
var critique = await criticAgent.InvokeAsync(planJson);

// 4. TERMINATE (Explicit stop after 1 repair attempt)
if (critique.Content.Contains("REJECT") && repairAttempts < 1) {
    // One repair attempt allowed
    repairAttempts++;
    // ... repair logic ...
} else if (repairAttempts >= 1) {
    await logger.LogFailureAsync(planJson, critique);
    return; // STOP - fail closed
}

// 5. PERSIST
if (critique.Content.Contains("APPROVE")) {
    await db.SavePlanAsync(planJson);
}
```

---

## 7. CODING STANDARDS
- **Binding**: Use `IOptions<StoreMindOptions>` binding. **NO hardcoded keys**.
- **Namespace**: File-scoped (`namespace Kiyo9w.StoreMind.Core;`).
- **Async**: All I/O must be `async/await`.
- **Formatting**: K&R style braces. `dotnet format` must pass.

---

## 8. EXECUTION POLICIES
### A. "No Python" Law
- **Zero Tolerance**: Do not emit `.py` files.
- **Data Analysis**: Use `Microsoft.Data.Analysis`.

### B. Safety Constraints
- **File System**: Read/Write only in `./data` or `./logs`.
- **Network**: Restrict to configured Model Endpoints (Zhipu/OpenAI/Anthropic).

---

## 9. DOCUMENTATION STANDARDS
Explain the "Why".
```csharp
/// <summary>
/// Orchestrates the nightly planning loop (Sense-Propose-Critique).
/// </summary>
/// <remarks>
/// WHY: Separating Planner (Opus) from Critic (GPT-5.2) reduces hallucination risk.
/// </remarks>
public class OptimizationLoop { ... }
```