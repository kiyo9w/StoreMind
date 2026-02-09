# Wire Mobile Frontend to StoreMind Backend API

Connect the Flutter mobile app to the deployed backend at `api.storemind.kiyo9w.dev`, matching all UI endpoints to the real API.

## User Review Required

> [!IMPORTANT]
> **CORS Configuration**: The backend currently allows `https://storemind.kiyo9w.dev`. For mobile app access, we may need to:
> - Add the mobile app's origin to CORS policy, or
> - Since mobile apps don't have CORS restrictions, this should work directly

> [!NOTE]
> This PR focuses on **wiring endpoints only**. Data shape discrepancies (UI model vs API model) will be addressed in a follow-up task.

---

## Proposed Changes

### rest_client package - API Client Layer

#### [NEW] [storemind_client.dart](file:///Volumes/FreeSpace/StoreMind/mobile/packages/rest_client/lib/src/clients/storemind/storemind_client.dart)
Retrofit client for StoreMind backend:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /api/manager/plans` | `listPlans()` | Get list of plan dates |
| `GET /api/manager/plans/{date}` | `getPlan(date)` | Get plan details with verdict |
| `POST /api/manager/plans/{date}/approve` | `approvePlan(date, approval)` | Approve entire plan |
| `POST /api/manager/plans/{date}/actions/{id}/revise` | `reviseAction(date, id, request)` | Revise action quantity |
| `POST /api/manager/plans/{date}/actions/{id}/reject` | `rejectAction(date, id, request)` | Reject action |
| `POST /api/manager/chat` | `chat(request)` | Manager chat conversation |
| `POST /api/manager/explain` | `explain(request)` | Explain AI reasoning |
| `POST /api/manager/run-planning` | `runPlanning()` | Trigger manual plan generation |

#### [NEW] [storemind_models.dart](file:///Volumes/FreeSpace/StoreMind/mobile/packages/rest_client/lib/src/models/storemind/storemind_models.dart)
Domain models matching backend snake_case JSON:
- `PlanListResponse`, `PlanDetailResponse`, `PlanRunResponse`
- `Plan`, `Proposal`, `ActionTarget`, `ExpectedImpact`, `Evidence`
- `Verdict`, `BlockingIssue`
- `Approval`, `ApprovalResult`, `ReviseRequest`, `ReviseResult`
- `RejectRequest`, `RejectResult`
- `ManagerChatRequest`, `ManagerChatResponse`
- `Explain`, `Explanation`

---

### mobile/lib/configs - Configuration

#### [MODIFY] [app_config.dart](file:///Volumes/FreeSpace/StoreMind/mobile/lib/configs/app_config.dart)
Add StoreMind API base URL:
```dart
static String storeMindUrl = 'https://api.storemind.kiyo9w.dev';
```

---

### mobile/lib/injector - Dependency Injection

#### [MODIFY] [dio_module.dart](file:///Volumes/FreeSpace/StoreMind/mobile/lib/injector/modules/dio_module.dart)
Add dedicated Dio instance for StoreMind API (no auth needed initially):
```dart
static const String storeMindDioInstanceName = 'storeMindDioInstance';
```

#### [MODIFY] [rest_client_module.dart](file:///Volumes/FreeSpace/StoreMind/mobile/lib/injector/modules/rest_client_module.dart)
Register `StoreMindClient` with StoreMind Dio instance.

---

### mobile/lib/data/repositories - Repository Layer

#### [NEW] [plans/plans_repository.dart](file:///Volumes/FreeSpace/StoreMind/mobile/lib/data/repositories/plans/plans_repository.dart)
Abstract repository interface for plans operations.

#### [NEW] [plans/plans_repository_impl.dart](file:///Volumes/FreeSpace/StoreMind/mobile/lib/data/repositories/plans/plans_repository_impl.dart)
Implementation using `StoreMindClient`, with mapping from API models to UI models.

#### [MODIFY] [repository_module.dart](file:///Volumes/FreeSpace/StoreMind/mobile/lib/injector/modules/repository_module.dart)
Register `PlansRepository`.

---

### mobile/lib/features/plans - Feature Layer

#### [MODIFY] [plans_cubit.dart](file:///Volumes/FreeSpace/StoreMind/mobile/lib/features/plans/cubit/plans_cubit.dart)
- Inject `PlansRepository` dependency
- Replace mock data calls with repository methods
- Add error handling for API failures

---

## Verification Plan

### Automated Tests

**Run rest_client package tests**:
```bash
cd /Volumes/FreeSpace/StoreMind/mobile/packages/rest_client
flutter test
```

**Run mobile tests**:
```bash
cd /Volumes/FreeSpace/StoreMind/mobile
flutter test
```

### Manual Verification

1. **Health Check**: Verify backend is accessible
   ```bash
   curl https://api.storemind.kiyo9w.dev/health
   ```
   Expected: `{"status":"healthy","timestamp":"..."}`

2. **Plans List**: Run the app and navigate to Plans screen
   - Should see loading indicator
   - Should display plans from backend (or empty state if none)
   - No more mock "Umbrella" / "Bento Box" data

3. **Plan Details**: Tap on a plan date
   - Should show real proposals with AI reasoning
   - Evidence and risk flags should render

4. **Actions**: Test approve/reject/revise buttons
   - Should call backend and update UI state

> [!NOTE]
> If backend has no plans, we can trigger plan generation via the `/run-planning` endpoint first.
