# Frontend-Backend Alignment Analysis Report
**StoreMind Project - Querying & Planning Modes**

*Generated: 2026-02-02*
*Last Updated: 2026-02-02 (Deep Code Analysis)*

---

## Executive Summary

The StoreMind project is in an active migration phase, transitioning from a beautiful chat-based UI to an inventory management system with AI-powered planning. The backend has been significantly refactored with a multi-agent architecture (Orchestrator, Stocker, Planner, Reviser), but the frontend is only partially aligned.

**Overall Alignment Score: 45%** *(+5% from SSE infrastructure being better than expected)*

### Key Findings

✅ **Strong Areas:**
- SSE streaming via **EventFlux** handles 14+ event types including `agent-step` (Orchestrator/Stocker/Planner/Reviser)
- Beautiful UI design preserved with proper dark mode support
- Manager/Staff toggle UI exists in `chat_screen.dart:89-136`
- Agent name mapping already maps backend agents to display text
- Chat modes (simpleQa, deepQa, proSearch) work well

⚠️ **Critical Gaps (Code-Verified):**
| Gap | Frontend Location | Backend Location | Impact |
|-----|------------------|------------------|--------|
| Wrong chat endpoint | `chat_repository_impl.dart:241` calls `/api/v1/chat/completions` | Expects `/api/manager/chat` | 🔴 Chat won't work |
| No role sent to backend | `conversation_screen.dart:235-244` - `ChatRequest` has no `userRole` | Backend checks role in context | 🔴 Role-based access broken |
| No `planDate` in chat | `ChatRequest` model missing field | `ManagerChatRequest` requires `PlanDate` | 🔴 Plan context lost |
| Plans uses mock data | `plans_cubit.dart:29` returns `mockPlanItems` | API ready at `/api/manager/plans` | 🟡 Plans feature unusable |
| No `PlanApiClient` | Not in `rest_client` package | Full API available | 🟡 Can't call plan endpoints |
| Enum mismatch | `ProposalType`: order, markdown, **restock**, **discontinue** | `ProposalType`: Order, Markdown, **Alert** | 🟡 Deserialization fails |
| No Staff endpoint | `ManagerModeCubit` toggles mode | Only `Manager.cs` exists | 🟡 Staff can't use app |

---

## 1. Querying Mode (Staff)

### Backend Implementation

**Endpoint:** ❌ **MISSING**
- Expected: `/api/staff/chat` (SSE streaming)
- Current: Only `/api/manager/*` endpoints exist in `Manager.cs`

**Agent Configuration:**
- Should route to **Stocker** agent only (Llama 3.3 70B via Groq)
- Read-only access to inventory data
- No access to Planner or plan modification

**Suggested Contract (minimal):**
```csharp
// In new Staff.cs
public record StaffChatRequest(string Message);
// Response: SSE stream with agent-step + text-chunk + stream-end events
```

### Frontend Implementation

**Current State:** ✅ Partially Implemented (toggle works, routing doesn't)

**Code Locations:**
- Toggle UI: `chat_screen.dart:89-136` - Uses `ManagerModeCubit`
- Mode state: `manager_mode_cubit.dart` - Simple bool toggle
- Chat request: `conversation_screen.dart:235-244` - **Does NOT include role**

**Verified SSE Support:** ✅ EventFlux parses these events correctly
```dart
// chat_repository_impl.dart:369-425
case 'agent-step':
  // Maps: Orchestrator → "Thinking...", Stocker → "Checking inventory"
  // Maps: Planner → "Planning...", Reviser → "Reviewing..."
```

**Issues (Code-Verified):**

1. **Wrong Endpoint:** 
   ```dart
   // chat_repository_impl.dart:241
   url: '${AppConfig.baseUrl}/api/v1/chat/completions'  // ❌ Wrong
   // Should be: /api/staff/chat for staff, /api/manager/chat for manager
   ```

2. **Role Not Sent:**
   ```dart
   // conversation_screen.dart:235-244
   final request = ChatRequest(
     messages: List.from(_conversationHistory),
     conversationId: _conversationId,
     threadId: _threadId,
     mode: _chatMode,  // ❌ This is simpleQa/deepQa, NOT manager/staff
     // Missing: userRole: isManager ? 'manager' : 'staff'
   );
   ```

3. **ChatRequest Model Missing Fields:**
   ```dart
   // chat_models.dart - ChatRequest class
   // Missing: String? userRole
   // Missing: String? planDate (needed for manager chat)
   ```

---

## 2. Planning Mode (Manager) 

### Backend Implementation

**Endpoint:** ✅ **IMPLEMENTED** - `Manager.cs`

**Available Endpoints (Verified):**

| Endpoint | Method | Request | Response | Frontend Support |
|----------|--------|---------|----------|------------------|
| `/api/manager/plans` | GET | - | `PlanListResponse` | ❌ No client |
| `/api/manager/plans/{date}` | GET | - | `PlanDetailResponse` | ❌ No client |
| `/api/manager/chat` | POST | `ManagerChatRequest` | SSE stream | ❌ Wrong endpoint called |
| `/api/manager/explain` | POST | `Explain` | `Explanation` | ❌ No client |
| `/api/manager/plans/{date}/approve` | POST | `Approval` | `ApprovalResult` | ❌ No client |
| `/api/manager/plans/{date}/actions/{id}/revise` | POST | `ReviseRequest` | `ReviseResult` | ❌ No client |
| `/api/manager/plans/{date}/actions/{id}/reject` | POST | `RejectRequest` | `RejectResult` | ❌ No client |
| `/api/manager/run-planning` | POST | - | `PlanRunResponse` | ❌ No client |

**SSE Events (Verified in Manager.cs:234-368):**
```csharp
await WriteEvent("begin-stream", new BeginStreamData(sessionId, planDate));
await WriteEvent("agent-step", new AgentStepData(stepNumber, agentName, role, content, thought, status));
await WriteEvent("text-chunk", new TextChunkData(text));
await WriteEvent("stream-end", new StreamEndData(reply, updatedPlan, actionModified, conversation));
// Status values: "thinking", "reviewing", "working"
```

**Backend Data Models (from Contracts/):**

```csharp
// Plan.cs - Full structure
record Plan(
    string Date,                              // Format: "yyyy-MM-dd"
    IReadOnlyList<string> Assumptions,
    IReadOnlyList<Proposal> Actions,          // ⚠️ Frontend calls them "items"
    IReadOnlyList<string> QuestionsForManager
) {
    string PlanId;                            // Auto: "plan-yyyyMMdd-{guid}"
    DateTimeOffset GeneratedAt;
    string? ModelUsed;
    AgentConversation? Conversation;          // ⚠️ Frontend missing
    string? ReasoningLog;
    double ConfidenceScore { get; }           // Computed average
}

// Proposal.cs - Full structure
record Proposal(
    ProposalType Type,                        // Order, Markdown, Alert
    ActionTarget Target,                      // { Sku, Qty (decimal) }
    ExpectedImpact ExpectedImpact,            // { WasteReduction, MarginDelta, StockoutRiskDelta }
    double Confidence,                        // 0.0 - 1.0
    IReadOnlyList<Evidence> Evidence,         // Complex objects, not strings!
    IReadOnlyList<string> RiskFlags,
    bool RequiresManagerApproval = true
) {
    string Id;                                // Auto: 8-char GUID
    ApprovalState ApprovalState;              // Pending, Approved, Rejected
    string? RejectedBy;
    string? RejectionReason;
}

// Evidence.cs
record Evidence(
    EvidenceSource Source,                    // Inventory, Expiry, Weather, Sales, Policy, AI
    DateTime Timestamp,
    string EntityId                           // Reference to data source
);

// Enums
enum ProposalType { Order, Markdown, Alert }  // ⚠️ Frontend: order, markdown, restock, discontinue
enum ApprovalState { Pending, Approved, Rejected }  // ⚠️ Frontend: pending, approved, adjusted, rejected
enum EvidenceSource { Inventory, Expiry, Weather, Sales, Policy, AI }
```

### Frontend Implementation

**Current State:** ⚠️ **Placeholder/Mock Only** - Beautiful UI but no backend connection

**Files (Verified):**
- Plans screen UI: `plans_screen.dart` - Works, displays mock data
- Mock data: `mock_plans.dart:91-202` - 5 hardcoded items
- State management: `plans_cubit.dart` - Local state only, no API calls
- Proposal cards: `proposal_card.dart` - Beautiful card UI with actions

**UI Features That Work:**
✅ Filter chips (All/Pending/Approved/Rejected) with counts
✅ Proposal cards with image, title, subtitle, quantity
✅ Expandable reasoning section with evidence pills
✅ Accept/Reject buttons (local state only)
✅ Quantity adjustment (local state only)
✅ Status indicators with color coding

### 2.1 Data Model Comparison (Side-by-Side)

| Field | Frontend (`PlanItem`) | Backend (`Proposal`) | Action Needed |
|-------|----------------------|---------------------|---------------|
| `id` | `String id` | `string Id` | ✅ Compatible |
| `type` | `ProposalType` (4 values) | `ProposalType` (3 values) | 🔴 Map enums |
| `product` | `title`, `subtitle`, `imageUrl` | `Target.Sku` only | 🟡 Need product lookup |
| `quantity` | `int quantity` | `decimal Target.Qty` | 🟡 Use `double` |
| `evidence` | `List<String>` | `List<Evidence>` | 🟡 Flatten to strings |
| `status` | `ProposalStatus` (4 values) | `ApprovalState` (3 values) | 🔴 Map enums |
| `confidence` | ❌ Missing | `double Confidence` | 🟢 Add field |
| `expectedImpact` | ❌ Missing | `ExpectedImpact` | 🟢 Add for MVP? |
| `riskFlags` | ❌ Missing | `List<string>` | 🟢 Add for MVP? |
| `reasoning` | `String` (frontend-only) | ❌ Not in backend | Keep for UI |
| `unit` | `String` (frontend-only) | ❌ Not in backend | Keep for UI |

**Frontend Enum Values (mock_plans.dart:4-16):**
```dart
enum ProposalType { order, markdown, restock, discontinue }  // ❌ restock, discontinue not in backend
enum ProposalStatus { pending, approved, adjusted, rejected }  // ❌ adjusted not in backend
```

**Backend Enum Values:**
```csharp
enum ProposalType { Order, Markdown, Alert }  // Alert maps to Alert/Warning
enum ApprovalState { Pending, Approved, Rejected }  // No "adjusted" state
```

### 2.2 MVP Approach: Minimal Models + Mapping Layer

**Philosophy:** Don't create complex models. Keep existing `PlanItem` UI model, add a mapping layer.

**Option A: Keep Frontend Models, Add DTO + Mapper (Recommended for MVP)**

```dart
// NEW: lib/features/plans/data/models/plan_dto.dart
// Minimal DTOs that match backend JSON exactly
import 'package:json_annotation/json_annotation.dart';
part 'plan_dto.g.dart';

@JsonSerializable()
class PlanDto {
  final String date;
  final List<ProposalDto> actions;
  @JsonKey(name: 'plan_id') final String? planId;
  
  factory PlanDto.fromJson(Map<String, dynamic> json) => _$PlanDtoFromJson(json);
}

@JsonSerializable()
class ProposalDto {
  final String id;
  final String type;  // "Order", "Markdown", "Alert"
  final ActionTargetDto target;
  final double confidence;
  final List<EvidenceDto> evidence;
  @JsonKey(name: 'approval_state') final String approvalState;
  
  factory ProposalDto.fromJson(Map<String, dynamic> json) => _$ProposalDtoFromJson(json);
}

@JsonSerializable()
class ActionTargetDto {
  final String sku;
  final double qty;
  factory ActionTargetDto.fromJson(Map<String, dynamic> json) => _$ActionTargetDtoFromJson(json);
}

@JsonSerializable()
class EvidenceDto {
  final String source;  // "Inventory", "Weather", etc.
  final String timestamp;
  @JsonKey(name: 'entity_id') final String entityId;
  factory EvidenceDto.fromJson(Map<String, dynamic> json) => _$EvidenceDtoFromJson(json);
}
```

```dart
// NEW: lib/features/plans/data/plan_mapper.dart
extension ProposalDtoMapper on ProposalDto {
  PlanItem toPlanItem() {
    return PlanItem(
      id: id,
      title: target.sku,  // TODO: Lookup product name by SKU
      subtitle: '${target.qty.toInt()} units',
      quantity: target.qty.toInt(),
      type: _mapProposalType(type),
      reasoning: evidence.map((e) => '${e.source}: ${e.entityId}').join(', '),
      evidence: evidence.map((e) => '${e.source}: ${e.entityId}').toList(),
      status: _mapApprovalState(approvalState),
    );
  }
  
  ProposalType _mapProposalType(String backendType) {
    switch (backendType.toLowerCase()) {
      case 'order': return ProposalType.order;
      case 'markdown': return ProposalType.markdown;
      case 'alert': return ProposalType.discontinue;  // Map Alert → discontinue for now
      default: return ProposalType.order;
    }
  }
  
  ProposalStatus _mapApprovalState(String state) {
    switch (state.toLowerCase()) {
      case 'pending': return ProposalStatus.pending;
      case 'approved': return ProposalStatus.approved;
      case 'rejected': return ProposalStatus.rejected;
      default: return ProposalStatus.pending;
    }
  }
}
```

**Option B: Skip DTOs, Parse JSON Directly (Fastest MVP)**

```dart
// In PlansCubit - direct JSON parsing without code generation
PlanItem _parseProposal(Map<String, dynamic> json) {
  final target = json['target'] as Map<String, dynamic>;
  final evidence = (json['evidence'] as List?)?.map((e) => 
    '${e['source']}: ${e['entity_id']}').toList() ?? [];
  
  return PlanItem(
    id: json['id'] ?? '',
    title: target['sku'] ?? 'Unknown',
    subtitle: '${(target['qty'] as num?)?.toInt() ?? 0} units',
    quantity: (target['qty'] as num?)?.toInt() ?? 0,
    type: _parseType(json['type']),
    reasoning: evidence.join(', '),
    evidence: evidence,
    status: _parseStatus(json['approval_state']),
  );
}
```

### 2.3 API Client Options

**Current REST Clients (from rest_client_module.dart):**
- `AuthClient` - Auth endpoints
- `WorkflowClient` - Chat completions (wrong endpoint for StoreMind)
- `ProfileClient` - User profile
- `NewsClient` - News/discovery
- `DogApiClient` - Demo

**Option A: Add ManagerApiClient (Retrofit style - matches existing pattern)**

```dart
// NEW: rest_client/lib/src/clients/manager/manager_client.dart
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';
part 'manager_client.g.dart';

@RestApi()
abstract class ManagerApiClient {
  factory ManagerApiClient(Dio dio, {String baseUrl}) = _ManagerApiClient;

  @GET('/api/manager/plans')
  Future<HttpResponse<Map<String, dynamic>>> listPlans();

  @GET('/api/manager/plans/{date}')
  Future<HttpResponse<Map<String, dynamic>>> getPlan(@Path() String date);

  @POST('/api/manager/plans/{date}/approve')
  Future<HttpResponse<Map<String, dynamic>>> approvePlan(
    @Path() String date,
    @Body() Map<String, dynamic> approval,
  );

  @POST('/api/manager/plans/{date}/actions/{actionId}/revise')
  Future<HttpResponse<Map<String, dynamic>>> reviseAction(
    @Path() String date,
    @Path() String actionId,
    @Body() Map<String, dynamic> request,
  );

  @POST('/api/manager/plans/{date}/actions/{actionId}/reject')
  Future<HttpResponse<Map<String, dynamic>>> rejectAction(
    @Path() String date,
    @Path() String actionId,
    @Body() Map<String, dynamic> request,
  );

  // Note: /api/manager/chat uses SSE, handle separately via EventFlux
}
```

**Option B: Direct Dio calls (Fastest MVP - no code generation)**

```dart
// In PlansCubit or PlansRepository - direct Dio usage
class PlansRepository {
  final Dio _dio;
  
  Future<List<String>> listPlanDates() async {
    final response = await _dio.get('/api/manager/plans');
    return List<String>.from(response.data['plans']);
  }
  
  Future<Map<String, dynamic>> getPlan(String date) async {
    final response = await _dio.get('/api/manager/plans/$date');
    return response.data['plan'];
  }
  
  Future<void> approvePlan(String date, String approvedBy) async {
    await _dio.post('/api/manager/plans/$date/approve', data: {
      'approved_by': approvedBy,
    });
  }
  
  Future<void> reviseAction(String date, String actionId, double qty, String by) async {
    await _dio.post('/api/manager/plans/$date/actions/$actionId/revise', data: {
      'new_quantity': qty,
      'revised_by': by,
    });
  }
  
  Future<void> rejectAction(String date, String actionId, String by, String? reason) async {
    await _dio.post('/api/manager/plans/$date/actions/$actionId/reject', data: {
      'rejected_by': by,
      'reason': reason,
    });
  }
}
```

### 2.4 Chat Integration Fix (Critical for MVP)

**Problem:** Frontend calls wrong endpoint with wrong request format.

**Current (chat_repository_impl.dart:241):**
```dart
EventFlux.instance.connect(
  EventFluxConnectionType.post,
  url: '${AppConfig.baseUrl}/api/v1/chat/completions',  // ❌ Wrong endpoint
  body: mappedRequest.toJson(),  // ❌ Wrong request format
)
```

**Backend Expects (Api.cs:36):**
```csharp
public record ManagerChatRequest(string Message, string PlanDate);
```

**Fix Option A: Add new method for Manager chat (Clean separation)**

```dart
// In chat_repository_impl.dart - ADD this method
Stream<ChatStreamEvent> streamManagerChat({
  required String message,
  required String planDate,
}) async* {
  final url = '${AppConfig.baseUrl}/api/manager/chat';
  final body = {
    'message': message,
    'plan_date': planDate,  // Backend uses snake_case
  };
  
  // Reuse existing EventFlux connection pattern
  yield* _connectEventFlux(
    url: url,
    body: body,
    onEvent: _handleManagerChatEvent,
  );
}

// In conversation_screen.dart - USE based on role
if (isManagerMode && planDate != null) {
  stream = _chatRepository.streamManagerChat(
    message: query,
    planDate: planDate,
  );
} else {
  stream = _chatRepository.streamChat(request);  // Staff mode
}
```

**Fix Option B: Modify existing streamChat (Minimal changes)**

```dart
// In ChatRepository interface - add parameters
Stream<ChatStreamEvent> streamChat(
  ChatRequest request, {
  bool isManager = false,
  String? planDate,
});

// In chat_repository_impl.dart - branch by role
String get endpoint {
  if (isManager && planDate != null) {
    return '/api/manager/chat';
  }
  return '/api/v1/chat/completions';  // Or /api/staff/chat when backend adds it
}

Map<String, dynamic> get body {
  if (isManager && planDate != null) {
    return {'message': request.messages.last.content, 'plan_date': planDate};
  }
  return mappedRequest.toJson();
}
```

**Critical Missing Data Flow:**

```
┌──────────────────────┐     ┌────────────────────┐     ┌─────────────────────┐
│ PlansScreen          │────►│ ConversationScreen │────►│ ChatRepository      │
│ (knows planDate)     │     │ (needs planDate)   │     │ (needs planDate)    │
└──────────────────────┘     └────────────────────┘     └─────────────────────┘
         │                            │                          │
         │ Navigate with:             │ Pass to:                 │ Include in:
         │ planDate: "2026-01-22"     │ ChatRequest or params    │ ManagerChatRequest
         └────────────────────────────┴──────────────────────────┘

Currently: planDate is NOT passed through this chain!
```

---

## 3. SSE Streaming Alignment

### ✅ Well-Aligned Area (Best Part of Integration!)

The SSE infrastructure is the strongest alignment point. Frontend already parses all needed events.

**Backend Events (Manager.cs:234-368):**
```csharp
await WriteEvent("begin-stream", new BeginStreamData(sessionId, planDate));
await WriteEvent("agent-step", new AgentStepData(stepNumber, agentName, role, content, thought, status));
await WriteEvent("text-chunk", new TextChunkData(text));
await WriteEvent("stream-end", new StreamEndData(reply, updatedPlan, actionModified, conversation));
```

**Frontend Parsing (chat_repository_impl.dart:369-425) - Already Works!**
```dart
case 'agent-step':
  final agentName = data['agent_name'];  // ✅ Parses correctly
  final status = data['status'];          // ✅ thinking/reviewing/working
  final thought = data['thought'];        // ✅ Available
  final content = data['content'];        // ✅ Available
  
  // Maps backend agent names to UI display text
  String displayTitle = switch (agentName) {
    'Orchestrator' => 'Thinking...',
    'Stocker' => 'Checking inventory',
    'Planner' => 'Planning...',
    'Reviser' => 'Reviewing...',
    _ => 'Processing...',
  };
```

**Frontend Supports 14+ Event Types:**
| Event | Frontend Support | Usage |
|-------|-----------------|-------|
| `begin-stream` | ✅ `response_started` flag | Clears search status |
| `agent-step` | ✅ Full parsing | Shows agent activity |
| `text-chunk` | ✅ `content` field | Streams response text |
| `stream-end` | ✅ `DoneEvent` | Finalizes message |
| `agent-query-plan` | ✅ | DeepQA planning |
| `agent-plan-delta` | ✅ | Plan updates |
| `agent-search-queries` | ✅ | Shows search queries |
| `agent-read-results` | ✅ | Shows sources |
| `agent-understand-results` | ✅ | Shows thinking |
| `agent-finish` | ✅ | Marks completion |

**Minor Improvements (Nice-to-Have, not MVP-blocking):**

1. **`stream-end` with `UpdatedPlan`:** When backend modifies a plan via chat, it returns `UpdatedPlan`. Frontend should refresh `PlansCubit` state.
   ```dart
   // In _handleStreamData when event is stream-end:
   if (data['updated_plan'] != null) {
     context.read<PlansCubit>().refreshFromBackend(data['updated_plan']);
   }
   ```

2. **`thought` field display:** Backend sends `thought` for each agent step. Frontend could show in expandable section.

3. **Agent icons:** Could add icons for each agent (🤔 Orchestrator, 📦 Stocker, 📋 Planner, ✅ Reviser)

---

## 4. MVP Migration Path (Minimal Viable Product)

### 🎯 Goal: Working demo where Manager can view/modify plans and chat about them

### Phase 1: Fix Manager Chat Endpoint (CRITICAL - 1 hour)

**Files to modify:**
1. `chat_repository_impl.dart` - Add manager chat method
2. `conversation_screen.dart` - Pass role and planDate

```dart
// 1. Add to ChatRepository interface
Stream<ChatStreamEvent> streamManagerChat({
  required String message,
  required String planDate,
});

// 2. Implement in chat_repository_impl.dart
Stream<ChatStreamEvent> streamManagerChat({
  required String message,
  required String planDate,
}) {
  return _connectEventFlux(
    url: '${AppConfig.baseUrl}/api/manager/chat',
    body: {'message': message, 'plan_date': planDate},
  );
}

// 3. Update conversation_screen.dart to use it when from Plans screen
// Add optional planDate parameter to ConversationScreen
```

### Phase 2: Connect Plans to Backend (2-3 hours)

**Files to modify:**
1. `plans_cubit.dart` - Add API calls
2. `mock_plans.dart` - Add parsing helpers (keep existing PlanItem class!)

**Minimal Changes to PlansCubit:**
```dart
// plans_cubit.dart
final Dio _dio;  // Inject existing Dio instance

Future<void> loadPlans() async {
  emit(state.copyWith(status: PlansStatus.loading));
  try {
    // 1. Get list of plan dates
    final datesResponse = await _dio.get('/api/manager/plans');
    final dates = List<String>.from(datesResponse.data['plans'] ?? []);
    
    if (dates.isEmpty) {
      emit(state.copyWith(status: PlansStatus.loaded, items: []));
      return;
    }
    
    // 2. Get latest plan
    final latestDate = dates.first;
    final planResponse = await _dio.get('/api/manager/plans/$latestDate');
    final planJson = planResponse.data['plan'] as Map<String, dynamic>;
    
    // 3. Parse proposals to PlanItems (keep existing UI model!)
    final items = (planJson['actions'] as List).map(_parseProposal).toList();
    
    emit(state.copyWith(
      status: PlansStatus.loaded, 
      items: items,
      planDate: DateTime.tryParse(latestDate),
    ));
  } catch (e) {
    emit(state.copyWith(status: PlansStatus.error, errorMessage: e.toString()));
  }
}

PlanItem _parseProposal(dynamic json) {
  final target = json['target'] as Map<String, dynamic>;
  final evidence = (json['evidence'] as List?)?.map((e) => 
    '${e['source']}: ${e['entity_id']}').toList() ?? [];
  
  return PlanItem(
    id: json['id'] ?? '',
    title: target['sku'] ?? 'Unknown Item',
    subtitle: 'Confidence: ${((json['confidence'] ?? 0) * 100).toInt()}%',
    quantity: (target['qty'] as num?)?.toInt() ?? 0,
    type: _mapType(json['type']),
    reasoning: evidence.join(' • '),
    evidence: evidence,
    status: _mapStatus(json['approval_state']),
  );
}

ProposalType _mapType(String? type) => switch (type?.toLowerCase()) {
  'order' => ProposalType.order,
  'markdown' => ProposalType.markdown,
  'alert' => ProposalType.discontinue,
  _ => ProposalType.order,
};

ProposalStatus _mapStatus(String? state) => switch (state?.toLowerCase()) {
  'approved' => ProposalStatus.approved,
  'rejected' => ProposalStatus.rejected,
  _ => ProposalStatus.pending,
};
```

### Phase 3: Wire Up Accept/Reject Actions (1-2 hours)

**In PlansCubit:**
```dart
Future<void> acceptItem(String itemId) async {
  final date = state.planDate?.toIso8601String().split('T').first;
  if (date == null) return;
  
  await _dio.post('/api/manager/plans/$date/actions/$itemId/revise', data: {
    'new_quantity': state.items.firstWhere((i) => i.id == itemId).adjustedQuantity,
    'revised_by': 'manager',  // TODO: Get from auth
  });
  
  await loadPlans();  // Refresh from backend
}

Future<void> rejectItem(String itemId) async {
  final date = state.planDate?.toIso8601String().split('T').first;
  if (date == null) return;
  
  await _dio.post('/api/manager/plans/$date/actions/$itemId/reject', data: {
    'rejected_by': 'manager',
  });
  
  await loadPlans();
}
```

### Phase 4: Backend Staff Endpoint (1-2 hours)

**Create Staff.cs (copy-paste from Manager.cs, simplify):**
```csharp
// Endpoints/Staff.cs
public static void MapStaffEndpoints(this WebApplication app)
{
    var group = app.MapGroup("/api/staff").WithTags("Staff");
    
    group.MapPost("/chat", HandleChat);  // SSE, routes to Stocker only
}

// Only difference: Use Stocker agent, no plan modification
```

### Phase 5: Frontend Role Routing (30 min)

**In chat_screen.dart when navigating to conversation:**
```dart
final isManager = context.read<ManagerModeCubit>().state;
final planDate = isManager ? context.read<PlansCubit>().state.planDate : null;

Navigator.push(context, MaterialPageRoute(
  builder: (_) => ConversationScreen(
    query: query,
    isManager: isManager,
    planDate: planDate?.toIso8601String().split('T').first,
  ),
));
```

---

## 5. Gap Analysis (MVP-Focused)

### 5.1 Critical Gaps (Must Fix for MVP)

| Gap | Impact | Fix Complexity | Owner |
|-----|--------|----------------|-------|
| Chat calls wrong endpoint | Manager chat broken | Low - change URL | Frontend |
| No `planDate` in chat request | Plan context lost | Low - add param | Frontend |
| Plans uses mock data | Plans feature useless | Medium - add API calls | Frontend |
| No Staff endpoint | Staff can't use app | Low - copy Manager.cs | Backend |

### 5.2 Enum Mapping (Quick Fix in Frontend)

**Don't change enum definitions!** Just add mapping functions:

```dart
// In mock_plans.dart or a new utils file
extension ProposalTypeMapping on String {
  ProposalType toProposalType() => switch (toLowerCase()) {
    'order' => ProposalType.order,
    'markdown' => ProposalType.markdown,
    'alert' => ProposalType.discontinue,  // Map backend "Alert" to frontend "discontinue"
    _ => ProposalType.order,
  };
}

extension ProposalStatusMapping on String {
  ProposalStatus toProposalStatus() => switch (toLowerCase()) {
    'pending' => ProposalStatus.pending,
    'approved' => ProposalStatus.approved,
    'rejected' => ProposalStatus.rejected,
    _ => ProposalStatus.pending,
  };
}

// For sending TO backend (reverse mapping)
extension ProposalTypeToBackend on ProposalType {
  String toBackendString() => switch (this) {
    ProposalType.order => 'Order',
    ProposalType.markdown => 'Markdown',
    ProposalType.restock => 'Order',  // Treat as Order
    ProposalType.discontinue => 'Alert',
  };
}
```

### 5.3 Data Gaps (Can Skip for MVP)

These fields exist in backend but frontend doesn't display them. **Skip for MVP:**

| Backend Field | Why Skip |
|---------------|----------|
| `ExpectedImpact.wasteReduction` | Nice UI enhancement, not blocking |
| `ExpectedImpact.marginDelta` | Nice UI enhancement, not blocking |
| `ExpectedImpact.stockoutRiskDelta` | Nice UI enhancement, not blocking |
| `Proposal.riskFlags` | Nice UI enhancement, not blocking |
| `Plan.assumptions` | Could show in header, not critical |
| `Plan.questionsForManager` | Could show as prompts, not critical |

### 5.4 Frontend Fields Not in Backend (Keep As-Is)

These frontend fields enhance UX but backend doesn't have them. **Keep them:**

| Frontend Field | Purpose | Keep? |
|----------------|---------|-------|
| `title` | Human-readable product name | ✅ Derive from SKU or hardcode |
| `subtitle` | Additional context | ✅ Build from backend data |
| `imageUrl` | Product image | ✅ Can hardcode or skip |
| `unit` | "units", "boxes", etc. | ✅ Hardcode per SKU or skip |
| `reasoning` | Human-readable explanation | ✅ Build from evidence list |

---

## 6. Architecture (MVP Approach)

### 6.1 Guiding Principles

✅ **DO:**
- Keep existing `PlanItem`, `ProposalType`, `ProposalStatus` classes
- Add inline parsing/mapping in Cubit (not separate repository layer for MVP)
- Inject existing `Dio` instance directly into `PlansCubit`
- Use existing SSE infrastructure (EventFlux) - it works!

❌ **DON'T:**
- Create new model classes that duplicate existing ones
- Add code generation (json_serializable) just for plans
- Build complex repository pattern for 3 API calls
- Refactor enum names or class structures

### 6.2 MVP Data Flow (Simplified)

```
┌─────────────────────────────────────────────────────────────────┐
│ Backend: /api/manager/plans/{date}                              │
│ Returns: { plan: { actions: [...], ... }, verdict: {...} }      │
└──────────────────────────────┬──────────────────────────────────┘
                               │ JSON response
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│ PlansCubit._parseProposal(json)                                 │
│ • json['target']['sku'] → title                                 │
│ • json['evidence'] → reasoning (joined strings)                 │
│ • json['approval_state'] → status (mapped)                      │
│ Returns: PlanItem (existing class!)                             │
└──────────────────────────────┬──────────────────────────────────┘
                               │ List<PlanItem>
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│ PlansScreen / ProposalCard (unchanged!)                         │
│ • Displays same UI as before                                    │
│ • Accept/Reject call Cubit methods                              │
│ • Cubit methods call backend, then reload                       │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Chat Data Flow (New for Manager)

```
┌──────────────┐     ┌────────────────────┐     ┌─────────────────────┐
│ PlansScreen  │────►│ ConversationScreen │────►│ ChatRepositoryImpl  │
│              │     │ + isManager=true   │     │                     │
│ planDate     │     │ + planDate         │     │ streamManagerChat() │
└──────────────┘     └────────────────────┘     └─────────────────────┘
                              │                          │
                              │ "Ask about plan"         │ POST /api/manager/chat
                              ▼                          │ { message, plan_date }
                     ┌────────────────────┐              ▼
                     │ SSE Events         │◄──── EventFlux connection
                     │ agent-step         │      (existing infrastructure)
                     │ text-chunk         │
                     │ stream-end         │
                     └────────────────────┘
```

---

## 7. MVP Testing Checklist

### Backend Verification (Use Swagger at http://localhost:5000/swagger)

- [ ] `GET /api/manager/plans` returns `{"plans": ["2026-01-29", ...], "count": 1}`
- [ ] `GET /api/manager/plans/2026-01-29` returns plan with `actions` array
- [ ] Each action has: `id`, `type`, `target.sku`, `target.qty`, `approval_state`
- [ ] `POST /api/manager/chat` with `{"message": "test", "plan_date": "2026-01-29"}` streams events
- [ ] SSE events include `agent-step` with `agent_name` in ["Orchestrator", "Stocker", "Planner", "Reviser"]
- [ ] `POST /api/manager/plans/2026-01-29/actions/{id}/revise` updates quantity
- [ ] `POST /api/manager/plans/2026-01-29/actions/{id}/reject` changes `approval_state` to "Rejected"

### Frontend Verification (Manual Testing)

**Phase 1 - Chat Fix:**
- [ ] In Manager mode, chat connects to `/api/manager/chat` (check network tab)
- [ ] SSE events display agent names in UI
- [ ] Streaming text appears correctly

**Phase 2 - Plans Connection:**
- [ ] Plans screen shows loading state
- [ ] Plans screen fetches from `/api/manager/plans` (check network tab)
- [ ] Proposal cards show data from backend (not mock data)
- [ ] `title` shows SKU (e.g., "UMB-001")
- [ ] `status` reflects backend `approval_state`

**Phase 3 - Actions:**
- [ ] Clicking Accept calls `/api/manager/plans/{date}/actions/{id}/revise`
- [ ] Clicking Reject calls `/api/manager/plans/{date}/actions/{id}/reject`
- [ ] After action, plan reloads and shows updated state

**Integration Test:**
- [ ] From Plans screen, tap "Ask about this plan"
- [ ] ConversationScreen opens with `planDate` passed
- [ ] Chat message goes to `/api/manager/chat` with `plan_date`
- [ ] Agent responds with plan-aware context

---

## 8. Immediate Action Items (Copy-Paste Ready)

### 8.1 Fix Chat Endpoint (Frontend - 15 min)

**File:** `mobile/lib/data/repositories/chat/chat_repository_impl.dart`

Find line ~241 and add a new method:

```dart
// ADD this method to ChatRepositoryImpl class
Stream<ChatStreamEvent> streamManagerChat({
  required String message,
  required String planDate,
}) async* {
  final token = await _localStorageSecureService.getAccessToken();
  
  final eventQueue = StreamQueue<ChatStreamEvent>();
  
  EventFlux.instance.connect(
    EventFluxConnectionType.post,
    url: '${AppConfig.baseUrl}/api/manager/chat',  // ✅ Correct endpoint!
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
      if (token != null) 'Authorization': 'Bearer $token',
    },
    body: {
      'message': message,
      'plan_date': planDate,
    },
    onSuccessCallback: (response) {
      response.stream?.listen((event) {
        final data = _transformApiResponse(event.data);
        if (data != null) {
          eventQueue.add(DataEvent(data));
        }
      });
    },
    onError: (e) => eventQueue.add(ErrorEvent(e.message ?? 'Unknown error')),
    autoReconnect: false,
  );
  
  yield* eventQueue.stream;
}
```

### 8.2 Add planDate to ConversationScreen (Frontend - 15 min)

**File:** `mobile/lib/features/chat/view/conversation_screen.dart`

```dart
// MODIFY class definition (around line 21)
class ConversationScreen extends StatefulWidget {
  final String query;
  final ChatMode chatMode;
  final bool isManager;        // ADD
  final String? planDate;      // ADD

  const ConversationScreen({
    super.key,
    required this.query,
    this.chatMode = ChatMode.simpleQa,
    this.isManager = false,    // ADD
    this.planDate,             // ADD
  });
  // ...
}

// MODIFY _sendMessage method (around line 247-261)
// Replace the stream selection logic:
final Stream<ChatStreamEvent> stream;
if (widget.isManager && widget.planDate != null) {
  // Manager mode - use manager chat endpoint
  stream = _chatRepository.streamManagerChat(
    message: query,
    planDate: widget.planDate!,
  );
} else {
  // Staff mode or no plan context - use regular chat
  switch (_chatMode) {
    case ChatMode.deepQa:
      stream = _chatRepository.streamDeepQa(request);
      break;
    case ChatMode.proSearch:
      stream = _chatRepository.streamProSearch(request);
      break;
    case ChatMode.simpleQa:
      stream = _chatRepository.streamChat(request);
      break;
  }
}
```

### 8.3 Connect Plans to Backend (Frontend - 1 hour)

**File:** `mobile/lib/features/plans/cubit/plans_cubit.dart`

```dart
// REPLACE the entire loadPlans() method:
Future<void> loadPlans() async {
  emit(state.copyWith(status: PlansStatus.loading));
  
  try {
    final dio = Injector.instance<Dio>();  // Get from DI
    
    // 1. Get list of plan dates
    final listResponse = await dio.get('${AppConfig.baseUrl}/api/manager/plans');
    final dates = List<String>.from(listResponse.data['plans'] ?? []);
    
    if (dates.isEmpty) {
      emit(state.copyWith(status: PlansStatus.loaded, items: []));
      return;
    }
    
    // 2. Get the latest plan
    final latestDate = dates.first;
    final planResponse = await dio.get('${AppConfig.baseUrl}/api/manager/plans/$latestDate');
    final plan = planResponse.data['plan'] as Map<String, dynamic>;
    final actions = plan['actions'] as List? ?? [];
    
    // 3. Parse to existing PlanItem model
    final items = actions.map<PlanItem>((json) {
      final target = json['target'] as Map<String, dynamic>? ?? {};
      final evidenceList = (json['evidence'] as List?)?.map((e) {
        final source = e['source']?.toString() ?? 'Unknown';
        final entityId = e['entity_id']?.toString() ?? '';
        return '$source: $entityId';
      }).toList() ?? <String>[];
      
      return PlanItem(
        id: json['id']?.toString() ?? '',
        title: target['sku']?.toString() ?? 'Unknown Item',
        subtitle: 'Qty: ${target['qty']} • Confidence: ${((json['confidence'] ?? 0) * 100).toInt()}%',
        quantity: (target['qty'] as num?)?.toInt() ?? 0,
        type: _parseType(json['type']?.toString()),
        reasoning: evidenceList.join(' • '),
        evidence: evidenceList,
        status: _parseStatus(json['approval_state']?.toString()),
      );
    }).toList();
    
    emit(state.copyWith(
      status: PlansStatus.loaded,
      items: items,
      planDate: DateTime.tryParse(latestDate),
    ));
  } catch (e) {
    emit(state.copyWith(
      status: PlansStatus.error,
      errorMessage: 'Failed to load plans: $e',
    ));
  }
}

ProposalType _parseType(String? type) {
  switch (type?.toLowerCase()) {
    case 'order': return ProposalType.order;
    case 'markdown': return ProposalType.markdown;
    case 'alert': return ProposalType.discontinue;
    default: return ProposalType.order;
  }
}

ProposalStatus _parseStatus(String? state) {
  switch (state?.toLowerCase()) {
    case 'approved': return ProposalStatus.approved;
    case 'rejected': return ProposalStatus.rejected;
    default: return ProposalStatus.pending;
  }
}
```

### 8.4 Backend: Add Staff Endpoint (1 hour)

**Create:** `backend/src/Kiyo9w.StoreMind.Service/Endpoints/Staff.cs`

```csharp
// Copy the chat handler pattern from Manager.cs, but simpler
namespace Kiyo9w.StoreMind.Service.Endpoints;

public static class Staff
{
    public static void MapStaffEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/staff").WithTags("Staff");
        group.MapPost("/chat", HandleChat);
    }

    private static async Task HandleChat(
        HttpContext httpContext,
        [FromBody] StaffChatRequest request,
        AgentOrchestrator orchestrator,
        CancellationToken ct)
    {
        // Same SSE setup as Manager.cs HandleChat
        // But only routes to Stocker agent (no plan modification)
        httpContext.Response.ContentType = "text/event-stream";
        // ... copy SSE logic from Manager.cs
        // ... restrict to Stocker agent only
    }
}

public record StaffChatRequest(string Message);
```

**Register in Program.cs:**
```csharp
app.MapStaffEndpoints();  // Add this line near MapManagerEndpoints()
```

---

## 9. Risk Assessment (MVP Scope)

### 🔴 MVP Blockers (Fix Before Demo)

| Risk | Current State | Impact | Quick Fix |
|------|--------------|--------|-----------|
| Wrong chat endpoint | Calls `/api/v1/chat/completions` | Manager chat broken | Change URL in streamManagerChat |
| No planDate in chat | Not passed to backend | Plan context lost | Add param to ConversationScreen |
| Plans uses mock data | Returns hardcoded items | Plans feature useless | Call Dio.get in loadPlans() |

### 🟡 Demo Limitations (Acceptable for MVP)

| Limitation | Impact | Future Fix |
|------------|--------|------------|
| No Staff endpoint | Staff mode shows generic chat | Add Staff.cs endpoint |
| SKU shown instead of product name | Less user-friendly | Add product lookup |
| No image for products | Less visual | Add imageUrl mapping |
| Quantity is int not decimal | Precision loss for fractional units | Use double |
| No confidence badge in UI | Less informative | Add to ProposalCard |

### 🟢 Non-Issues (Already Working)

| Feature | Status |
|---------|--------|
| SSE streaming | ✅ EventFlux parses all events correctly |
| Agent step display | ✅ Shows Orchestrator/Stocker/Planner/Reviser |
| Manager/Staff toggle | ✅ UI works, just not wired to backend |
| Plans UI | ✅ Beautiful cards, filter chips, actions |
| Dark mode | ✅ Works throughout |
| Error display | ✅ Shows errors in chat |

---

## 10. MVP Action Plan

### ✅ What's Already Working

| Feature | Location | Status |
|---------|----------|--------|
| SSE streaming | `chat_repository_impl.dart` | ✅ 14+ event types parsed |
| Agent step UI | `assistant_message.dart` | ✅ Shows thinking/reviewing |
| Plans UI | `plans_screen.dart`, `proposal_card.dart` | ✅ Beautiful, just needs data |
| Manager toggle | `manager_mode_cubit.dart` | ✅ State management works |
| Dark mode | Throughout | ✅ Full support |

### ❌ What Needs Fixing (3-4 hours total)

| Task | File(s) | Time | Blocking |
|------|---------|------|----------|
| 1. Add `streamManagerChat()` | `chat_repository_impl.dart` | 15 min | 🔴 Yes |
| 2. Add params to ConversationScreen | `conversation_screen.dart` | 15 min | 🔴 Yes |
| 3. Connect PlansCubit to API | `plans_cubit.dart` | 1 hour | 🔴 Yes |
| 4. Wire Accept/Reject to API | `plans_cubit.dart` | 30 min | 🟡 Demo |
| 5. Pass planDate from PlansScreen | `plans_screen.dart` | 15 min | 🟡 Demo |
| 6. Add Staff endpoint | `Staff.cs` (backend) | 1 hour | 🟡 Demo |

### 🎯 MVP Success Criteria

- [ ] Manager opens app → sees real plan from backend
- [ ] Manager taps proposal → can Accept or Reject (calls backend)
- [ ] Manager taps "Ask about this" → chat opens with plan context
- [ ] Chat shows agent thinking (Orchestrator/Stocker/Planner/Reviser)
- [ ] Agent responds with plan-aware answer

### 📋 Suggested Work Order

```
Day 1 (2-3 hours):
├── 1. Fix Manager chat endpoint (frontend)
├── 2. Add planDate to ConversationScreen (frontend)  
└── 3. Connect PlansCubit to backend API (frontend)

Day 2 (1-2 hours):
├── 4. Wire Accept/Reject to backend (frontend)
├── 5. Pass planDate when navigating to chat (frontend)
└── 6. Test full Manager flow end-to-end

Day 3 (1-2 hours):
├── 7. Add Staff endpoint (backend)
└── 8. Test Staff flow (query inventory only)
```

### 🚫 Skip for MVP (Future Enhancements)

- Complex DTO models with code generation
- Repository pattern abstraction
- Offline support / SQLite caching
- Product image lookup by SKU
- Confidence score badges
- ExpectedImpact visualization
- Risk flags display
- Deep error handling

---

## 11. File Reference Quick Links

### Frontend Key Files
- **Chat SSE**: `mobile/lib/data/repositories/chat/chat_repository_impl.dart`
- **Chat Screen**: `mobile/lib/features/chat/view/conversation_screen.dart`
- **Plans Cubit**: `mobile/lib/features/plans/cubit/plans_cubit.dart`
- **Plans Models**: `mobile/lib/features/plans/data/mock_plans.dart`
- **Plans UI**: `mobile/lib/features/plans/view/plans_screen.dart`
- **Manager Toggle**: `mobile/lib/features/app/cubit/manager_mode_cubit.dart`
- **App Config**: `mobile/lib/configs/app_config.dart`

### Backend Key Files
- **Manager Endpoints**: `backend/src/Kiyo9w.StoreMind.Service/Endpoints/Manager.cs`
- **API Contracts**: `backend/src/Kiyo9w.StoreMind.Core/Contracts/Api.cs`
- **Plan Model**: `backend/src/Kiyo9w.StoreMind.Core/Contracts/Plan.cs`
- **Proposal Model**: `backend/src/Kiyo9w.StoreMind.Core/Contracts/Proposal.cs`
- **SSE Events**: `backend/src/Kiyo9w.StoreMind.Core/Contracts/StreamEvents.cs`

---

**Report End**

*Generated by deep code analysis on 2026-02-02*
*For questions: refer to `backend/README.md` or `backend/.agent/AGENT.md`*
