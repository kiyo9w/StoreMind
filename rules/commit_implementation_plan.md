# Commit Organization Plan

## Goal Description
Organize the currently uncommitted changes (~15 files) into a clean, logical series of commits that respect the project's dependency structure and commit message conventions.

## User Review Required
> [!IMPORTANT]
> Please review the proposed commit order below. Once approved, I will execute these commits in sequence.

## Proposed Commits

### 1. Core Domain Updates
**Message:** `feat(core): update contracts and interfaces for hybrid intelligence`
**Description:** Updates the foundational contracts and configuration options needed for the new services.
**Files:**
- `src/Kiyo9w.StoreMind.Core/Configuration/StoreMindOptions.cs`
- `src/Kiyo9w.StoreMind.Core/Contracts/*.cs` (Api.cs, Evidence.cs, Log.cs, Plan.cs, Proposal.cs, Snapshot.cs, Verdict.cs)
- `src/Kiyo9w.StoreMind.Core/Interfaces/*.cs` (IInventory.cs, ISupplier.cs)
- `src/Kiyo9w.StoreMind.Core/obj/...` (Project file list update)

### 2. Service Logic Implementation
**Message:** `feat(service): add core planning and inference services`
**Description:** Adds the business logic for offline planning, critiquing, and local inference.
**Files:**
- `src/Kiyo9w.StoreMind.Service/Services/OvernightPlanner.cs`
- `src/Kiyo9w.StoreMind.Service/Services/Phi3Chat.cs`
- `src/Kiyo9w.StoreMind.Service/Services/PlanCritic.cs`
- `src/Kiyo9w.StoreMind.Service/Services/PlanStore.cs`
- `src/Kiyo9w.StoreMind.Service/Services/PlanningJob.cs`

### 3. API Endpoint Implementation
**Message:** `feat(endpoints): implement management and staff assistant endpoints`
**Description:** Updates the API endpoints to use the new services, replacing previous demo stubs.
**Files:**
- `src/Kiyo9w.StoreMind.Service/Endpoints/Manager.cs`
- `src/Kiyo9w.StoreMind.Service/Endpoints/Planning.cs`
- `src/Kiyo9w.StoreMind.Service/Endpoints/Staff.cs`

### 4. Service Wiring & Startup
**Message:** `feat(service): configure semantic kernel and background jobs`
**Description:** Updates Program.cs to register all new services and configure the Semantic Kernel.
**Files:**
- `src/Kiyo9w.StoreMind.Service/Program.cs`

### 5. Documentation
**Message:** `docs: add coding standards and context documentation`
**Description:** Adds project documentation and rules.
**Files:**
- `Code_writing_rules.md`
- `context.md`
- `rules/`

## Verification Plan
### Automated Tests
- Run `dotnet build` after each commit (except potentially 2 and 3 if they have circular references, though the order attempts to minimize this. Step 3 depends on 2, Step 4 depends on 2 and 3. Step 2 depends on 1).
- Final `dotnet build` to ensure the clean state is valid.
