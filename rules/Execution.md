# EXECUTION PROTOCOL (v5.0)

## 1. THE "COMPILER IS TRUTH" DOCTRINE
If it doesn't build, it doesn't exist. "Imagining" code is forbidden.

## 2. AGENTIC PATTERNS
### A. The "Tool-Gated" Architecture
We do NOT let models execute DB writes directly.
*   **Allowed**: `DraftOrder(...)` -> Returns a `DraftId`.
*   **Allowed**: `SubmitDraft(draftId)` -> Requires `RequiresApproval=true`.
*   **Prohibited**: `ExecuteSql("UPDATE inventory...")`.

### B. Prompt Engineering Standards
**ALL** Agent prompts must follow the **Role-Goal-Tool-Constraint** format.

```csharp
const string PlannerInstructions = """
    ROLE: StoreOps Planner.
    GOAL: Minimize waste (< 5%) and stockouts (< 1%).
    TOOLS: GetSnapshot, DraftMarkdown.
    CONSTRAINTS: 
    1. Output MUST be valid JSON matching the `DecisionPlan` schema.
    2. Do NOT use markdown formatting (```json). Just raw JSON.
    3. No leading/trailing commentary; output must be a single JSON object.
    4. Every action requires an `Evidence` object with `Source`, `Timestamp`, and `EntityId`.
""";
```

### C. Structured Output Enforcement Ladder
When requiring JSON output from agents, apply this priority:

1. **Provider Structured Output**: Use constrained decoding if provider supports it (e.g., OpenAI `response_format`).
2. **Strict JSON Schema + Repair**: If not available, enforce schema + allow 1 repair prompt attempt.
3. **Reject + Log**: On failure after repair, reject and log raw output for eval analysis.

**Stop Conditions**:
- Max 1 repair attempt for JSON errors
- On failure: store raw output + error for analysis, do NOT retry indefinitely

### D. Tool-Call Tracing Requirement
**Every** tool call MUST log to `DecisionLog`:
- Input parameters
- Output result
- Correlation ID
- Timestamp
- Calling agent name

## 3. EXECUTION WORKFLOW

### STEP 1: CONTEXT
1.  **Read Plan**: Am I building the *Planner* (Opus) or the *Critic* (GPT-5)?
2.  **Read Stack**: Copy the `ChatCompletionAgent` pattern.

### STEP 2: TEST-DRIVEN PROMPTING
For Agents, we write **Evaluations** before code.
*   *Eval*: "If I feed the agent a snapshot with 50 expiring bento boxes, the output JSON **MUST** contain a `DraftMarkdown` action with target `Bento123`."

### STEP 3: SCHEMA-FIRST IMPLEMENTATION
1.  **Define Schema**: Create the C# `record` conforming to canonical schema in `Stack_context.mdc`.
2.  **Provide Minimal Example**: Schema-first + compact example (avoid bloating context with large examples).
3.  **Mock Tools**: Implement `MockInventoryTool` to return predictable data.
4.  **Agent Loop**: Implement the Sense-Propose-Critique loop (in C#).
5.  **Validate with C#**: Final gate is **deterministic C# validators**, not LLM critique alone.
6.  **Verify**: Run `dotnet test`.

### STEP 4: MEMORY UPDATE
Log the model choice.
```markdown
## [2026-01-21 14:00] Task: 2.2.a
### Implemented
- `StoreOpsPlanner` (Claude Opus)
### Artifacts Produced
- `DecisionPlan.json`
- `DecisionLog` entries
### Model Routing Used
- Primary: Claude Opus 4.5
- Fallback: None (success)
- Latency: 2.3s
### Prompt Strategy
- Schema-first prompting with minimal JSON example to ensure schema compliance.
### Verification
- ✅ JSON Deserialization tested successfully.
- ✅ C# validators passed.
```

## 4. ERROR RECOVERY
### A. JSON Errors
Apply the Structured Output Enforcement Ladder (Section 2.C):
1. Enable `Structured Output` if provider supports it.
2. Add a specific "Repair" prompt (1 attempt max).
3. On failure: reject, log raw output for eval, fail closed.

### B. Hallucination
If the model invents SKUs, enforce valid SKU checks in the `DraftTools` (deterministic C# validation).

### C. Business Rule Validation
**LLM critique is advisory only**. The final gate for business rules MUST be deterministic C# validators:
- Markdown cap validator
- Safety stock validator
- SKU existence validator

## 5. INTERACTION PROTOCOL
**User**: "Implement Task 2.2"
**Agent**:
1. Checks Plan -> "Task 2.2: The Agents".
2. Checks Stack_context -> "Pattern: Overnight Planner", "Canonical Schema".
3. Generates the `StoreOpsPlanner` class using ModelId alias config.
4. Verifies JSON serialization against canonical schema.
5. Runs deterministic C# validators.
6. Updates MEMORY.md with artifacts produced and model routing used.