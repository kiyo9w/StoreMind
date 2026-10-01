# PROJECT PLAN: StoreMind (v5.0)
## Best-of-Breed Hybrid Intelligence System

**Applicant**: Ngo Thanh Trung
**Date**: 21 Jan 2026
**Target**: Datacom Co., Ltd. (Japan)

---

## 1. Executive Summary: The "Best-of-Breed" Pivot
We reject the notion of a single "SOTA" model. StoreMind uses a **specialized model routing architecture** to optimize for **reasoning quality**, **cost**, and **speed**.

### The Hybrid Roster
1.  **Overnight Planner**: **Claude Opus 4.5** (Deep Reasoning).
2.  **Overnight Quant**: **GPT-5.2** (Math/Optimization). LLM proposes parameters; **code computes final numbers**.
3.  **Daytime Manager**: **GPT-5.2 Fast** (Latency Sensitive).
4.  **Store Querry**: **Phi-3-mini** (Cloud RAG).

---

## 2. System Architecture

### 2.1 The "Sense-Propose-Critique" Loop
Instead of a chaotic "debate", we use a structured nightly pipeline:

1.  **Sense (Deterministic)**: `InventoryService` snapshots data (expiry risk, stock levels) + `WeatherService`.
2.  **Propose (Claude Opus)**: `StoreOpsPlanner` drafts a JSON `DecisionPlan` (Orders, Markdowns).
3.  **Critique (GPT-5.2)**: `RiskEnforcer` validates the plan against logic constants (e.g., "Don't order 500 umbrellas if rain prob < 10%").
4.  **Validate (C# Deterministic)**: Data contracts & validators (see Section 2.2).
5.  **Persist**: Save approved plan for the Morning Manager.

### 2.2 Data Contracts & Validators
Between Propose and Persist, the following **deterministic C# validators** MUST run:

| Validator | Purpose | On Failure |
|-----------|---------|------------|
| **JSON Schema Validator** | Validates `DecisionPlan` against canonical schema | Reject + log sample for eval |
| **SKU Existence Validator** | Confirms all SKUs exist in inventory DB | Reject action, continue others |
| **Budget/Threshold Validator** | Markdown cap (50%), min safety stock (10 units) | Reject + flag violation |
| **System.Text.Json Source-Gen** | Type-safe deserialization with compile-time validation | Parse error = reject |

**Policy**: "LLM proposes; code computes." All final numbers (quantities, discounts) are calculated by C#, not trusted from LLM output.

---

## 3. Implementation Plan

### PHASE 0: FOUNDATION
- [x] **0.1**: Setup .NET 9 Projects.
- [ ] **0.2**: Configure `StoreMindOptions` with multi-provider support (OpenAI + Anthropic).

### PHASE 1: TIER 1 - Querry RAG (Central Data)
*Goal: Staff Q&A using the central vector database.*
- [ ] **1.1**: Implement `IInventoryService` (Qdrant).
- [ ] **1.2**: Implement `Phi3ChatService` (Connected RAG).
- [ ] **1.3**: Build Console Interface for Staff Queries.

### PHASE 2: TIER 2 - OVERNIGHT ORCHESTRATION (Opus + GPT-5.2)
*Goal: The "Prescient" Morning Report.*

#### Task Group 2.1: Tooling (The "API Surface")
- [ ] **2.1.a**: Implement **Read Tools** (`GetSalesHistory`, `GetExpiryBuckets`).
- [ ] **2.1.b**: Implement **Draft Tools** (`DraftPurchaseOrder`, `DraftMarkdownPlan`).
- [ ] **2.1.c**: Implement **Observability** (`WriteDecisionLog`).

#### Task Group 2.2: The Agents (Sense-Propose-Critique)
- [ ] **2.2.a**: Implement `StoreOpsPlanner` (Claude Opus) with JSON Schema constraints.
- [ ] **2.2.b**: Implement `RiskEnforcer` (GPT-5.2) with validation logic.
- [ ] **2.2.c**: Implement `OvernightJob` (The Orchestrator Loop).

#### Task Group 2.3: HITL Morning Review
- [ ] **2.3.a**: Persist `DraftPlan` to review queue.
- [ ] **2.3.b**: Implement Review UI/CLI for Morning Manager.
- [ ] **2.3.c**: Implement Approval record & audit log persistence.

### PHASE 3: DAYTIME MANAGER (RAG + Explainability)
*Goal: Latency <3s for manager queries.*
- [ ] **3.1**: Implement `ManagerCopilot` (GPT-5.2 Fast).
- [ ] **3.2**: Enable "Why did you do X?" retrieval from `DecisionLog`.

### PHASE 4: RELIABILITY & OBSERVABILITY
*Goal: Production-grade agent system with continuous evaluation.*

#### Task Group 4.1: Evals & Regression
- [ ] **4.1.a**: Implement prompt correctness tests (expected outputs for known inputs).
- [ ] **4.1.b**: Implement tool-call correctness tests (mock tool responses).
- [ ] **4.1.c**: Setup regression test suite for multi-provider routing.

#### Task Group 4.2: Observability
- [ ] **4.2.a**: Implement structured logging with correlation IDs.
- [ ] **4.2.b**: Implement latency tracking per model/provider.
- [ ] **4.2.c**: Implement cost tracking per agent invocation.

---