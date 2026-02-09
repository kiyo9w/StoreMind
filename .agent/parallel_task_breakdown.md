# StoreMind Parallel Task Breakdown
**For Backend & Mobile Development Teams**

*Based on: frontend_backend_alignment_report.md (MVP approach)*  
*Created: 2026-02-02*

---

## 🎯 Goal

Get Manager flow working end-to-end: View plans → Ask about plans → Modify plans via chat

**Estimated Total:** 5-6 hours (parallelized across 2 teams)

---

## 📋 Task Assignment Strategy

### Parallel Streams (No Dependencies)

```
┌─────────────────────────┐     ┌──────────────────────────┐
│   BACKEND TEAM          │     │   MOBILE TEAM            │
│                         │     │                          │
│ ├─ B1: Staff Endpoint   │     │ ├─ M1: Manager Chat Fix  │
│ │  (can start now)      │     │ │  (can start now)       │
│ │                       │     │ │                        │
│ └─ B2: Test/Polish      │     │ └─ M2: Plans API Connect │
│    (waits for B1)       │     │    (depends on M1)       │
│                         │     │                          │
│                         │     │ └─ M3: Actions Wiring    │
│                         │     │    (depends on M2)       │
└─────────────────────────┘     └──────────────────────────┘
                 │                          │
                 │   Integration Testing    │
                 └──────────────────────────┘
```

---

## 🔧 BACKEND TEAM TASKS

### B1: Staff Chat Endpoint ⏱️ 1-1.5 hours
**Priority:** Medium (Demo enhancement, not MVP blocker)  
**Parallel-Safe:** ✅ Yes - doesn't touch Manager endpoints

#### What to Build
Create read-only chat endpoint for Staff users that routes to Stocker agent only.

#### Files to Modify/Create

**NEW FILE:** `backend/src/Kiyo9w.StoreMind.Service/Endpoints/Staff.cs`

```csharp
using Microsoft.AspNetCore.Mvc;
using Kiyo9w.StoreMind.Service.Services;

namespace Kiyo9w.StoreMind.Service.Endpoints;

public static class Staff
{
    public static void MapStaffEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/staff").WithTags("Staff");
        
        group.MapPost("/chat", HandleChat)
             .WithName("StaffChat");
    }

    // SSE streaming chat - only Stocker agent, no plan access
    private static async Task HandleChat(
        HttpContext httpContext,
        [FromBody] StaffChatRequest request,
        [FromServices] AgentOrchestrator orchestrator,
        CancellationToken ct)
    {
        // Copy SSE setup from Manager.cs:234-272
        httpContext.Response.ContentType = "text/event-stream";
        httpContext.Response.Headers.CacheControl = "no-cache";
        httpContext.Response.Headers.Connection = "keep-alive";

        var jsonOptions = new JsonSerializerOptions 
        { 
            PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower 
        };

        async Task WriteEvent(string eventType, object data)
        {
            var json = JsonSerializer.Serialize(data, jsonOptions);
            var eventData = $"event: {eventType}\ndata: {json}\n\n";
            await httpContext.Response.WriteAsync(eventData, ct);
            await httpContext.Response.Body.FlushAsync(ct);
        }

        var sessionId = $"staff-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}"[..32];
        await WriteEvent("begin-stream", new { session_id = sessionId });

        var conversation = new AgentConversation();
        string finalResponse = "";
        int stepNumber = 0;

        try
        {
            // Context: Staff has NO plan access
            var context = "User is a staff member. Provide inventory information only. Do not discuss plans or ordering decisions.";

            await foreach (var trace in orchestrator.ProcessAsync(request.Message, context, ct))
            {
                // Filter: Only allow Stocker agent responses
                if (trace.AgentName != "Stocker" && trace.AgentName != "Orchestrator")
                    continue;

                conversation.AddTrace(trace);
                stepNumber++;

                await WriteEvent("agent-step", new
                {
                    step_number = stepNumber,
                    agent_name = trace.AgentName,
                    role = trace.Role,
                    content = trace.Content,
                    thought = trace.ThinkingContent,
                    status = trace.AgentName == "Orchestrator" ? "thinking" : "working"
                });

                if (trace.AgentName == "Orchestrator")
                    finalResponse = trace.Content;
            }
        }
        catch (Exception ex)
        {
            finalResponse = "I encountered an error. Please try again.";
        }

        conversation.Complete();

        await WriteEvent("text-chunk", new { text = finalResponse });
        await WriteEvent("stream-end", new
        {
            reply = finalResponse,
            conversation
        });
    }
}

public record StaffChatRequest(string Message);
```

**MODIFY:** `backend/src/Kiyo9w.StoreMind.Service/Program.cs`

```csharp
// Add after app.MapManagerEndpoints();
app.MapStaffEndpoints();
```

#### Success Criteria
- [ ] `POST /api/staff/chat` returns SSE stream
- [ ] Only Stocker agent responses appear (no Planner/Reviser)
- [ ] SSE events match format: `begin-stream`, `agent-step`, `text-chunk`, `stream-end`
- [ ] Test with Swagger: `{"message": "How much milk do we have?"}`

#### Related Files
- `backend/src/Kiyo9w.StoreMind.Service/Endpoints/Manager.cs` (reference)
- `backend/src/Kiyo9w.StoreMind.Service/Services/AgentOrchestrator.cs` (used)
- `backend/src/Kiyo9w.StoreMind.Core/Contracts/StreamEvents.cs` (reference)

---

### B2: Testing & Polish ⏱️ 30 min
**Depends On:** B1 completion  
**Parallel-Safe:** ✅ Yes

#### What to Test
1. **Staff endpoint restrictions:**
   - Ask about plans → Should refuse or ignore
   - Ask about inventory → Should work
   
2. **Manager endpoints (smoke test):**
   - GET `/api/manager/plans` returns dates
   - GET `/api/manager/plans/{date}` returns plan
   - POST `/api/manager/chat` with plan_date works

3. **SSE event format:**
   - All events use snake_case
   - Agent names match: "Orchestrator", "Stocker", "Planner", "Reviser"

#### Files to Verify
- `backend/src/Kiyo9w.StoreMind.Service/Endpoints/Manager.cs`
- `backend/src/Kiyo9w.StoreMind.Service/Endpoints/Staff.cs`

---

## 📱 MOBILE TEAM TASKS

### M1: Manager Chat Endpoint Fix ⏱️ 30-45 min
**Priority:** 🔴 CRITICAL (MVP blocker)  
**Parallel-Safe:** ✅ Yes - new method, doesn't touch existing chat code

#### What to Build
Add `streamManagerChat()` method that connects to `/api/manager/chat` with `plan_date`.

#### Files to Modify

**FILE 1:** `mobile/lib/data/repositories/chat/chat_repository.dart`

```dart
// ADD this method signature to interface
Stream<ChatStreamEvent> streamManagerChat({
  required String message,
  required String planDate,
});
```

**FILE 2:** `mobile/lib/data/repositories/chat/chat_repository_impl.dart`

Find `class ChatRepositoryImpl` and add this method (around line 600):

```dart
@override
Stream<ChatStreamEvent> streamManagerChat({
  required String message,
  required String planDate,
}) {
  final controller = StreamController<ChatStreamEvent>();
  final eventQueue = <String>[];
  Timer? processTimer;
  StreamSubscription? upstreamSubscription;
  bool isCancelled = false;

  void processQueue(Timer timer) {
    if (isCancelled || controller.isClosed) {
      timer.cancel();
      return;
    }

    if (eventQueue.isNotEmpty) {
      final data = eventQueue.removeAt(0);
      final trimmedData = data.trim();
      
      if (trimmedData == '[DONE]' || trimmedData == 'data: [DONE]') {
        controller.add(const ChatStreamEvent.done());
        processTimer?.cancel();
        controller.close();
        return;
      }

      try {
        final json = jsonDecode(data) as Map<String, dynamic>;
        final transformed = _transformApiResponse(json);
        if (transformed != null) {
          if (transformed['_stream_done'] == true) {
            controller.add(const ChatStreamEvent.done());
            processTimer?.cancel();
            controller.close();
            return;
          }
          if (!controller.isClosed) {
            controller.add(ChatStreamEvent.data(transformed));
          }
        }
      } catch (e) {
        if (data.contains('[DONE]')) {
          controller.add(const ChatStreamEvent.done());
          processTimer?.cancel();
          controller.close();
        } else if (!controller.isClosed) {
          controller.add(ChatStreamEvent.error('Parse error: $e'));
        }
      }
    }
  }

  processTimer = Timer.periodic(const Duration(milliseconds: 10), processQueue);

  final path = '/api/manager/chat';
  final body = {
    'message': message,
    'plan_date': planDate,
  };

  debugPrint('[SSE] Manager Chat - Connecting to $path');
  debugPrint('[SSE] Request Body: ${jsonEncode(body)}');

  _connectEventFlux(
    path: path,
    body: body,
    onData: (data) {
      if (!isCancelled && !controller.isClosed) {
        eventQueue.add(data);
      }
    },
    onError: (e) {
      if (!isCancelled && !controller.isClosed) {
        String errorMessage = 'Connection error';
        if (e is EventFluxException) {
          errorMessage = e.message ?? 'Unknown error';
        }
        controller.add(ChatStreamEvent.error('Manager chat error: $errorMessage'));
      }
    },
    onDone: () {
      debugPrint('[SSE] Manager chat connection closed');
      Future.delayed(const Duration(milliseconds: 500), () {
        if (eventQueue.isEmpty && !controller.isClosed && !isCancelled) {
          controller.add(const ChatStreamEvent.done());
          processTimer?.cancel();
          controller.close();
        }
      });
    },
    onSubscription: (subscription) {
      upstreamSubscription = subscription;
    },
  );

  controller.onCancel = () {
    debugPrint('[SSE] Manager chat cancelled');
    isCancelled = true;
    processTimer?.cancel();
    upstreamSubscription?.cancel();
  };

  return controller.stream;
}
```

**FILE 3:** `mobile/lib/features/chat/view/conversation_screen.dart`

Modify class definition (around line 21):

```dart
class ConversationScreen extends StatefulWidget {
  final String query;
  final ChatMode chatMode;
  final bool isManager;     // ADD
  final String? planDate;   // ADD

  const ConversationScreen({
    super.key,
    required this.query,
    this.chatMode = ChatMode.simpleQa,
    this.isManager = false,   // ADD
    this.planDate,            // ADD
  });

  @override
  State<ConversationScreen> createState() => _ConversationScreenState();
}
```

Modify `_sendMessage()` method (around line 247-261):

```dart
void _sendMessage(String query) async {
  // ... existing code up to stream selection ...

  // REPLACE stream selection with this:
  final Stream<ChatStreamEvent> stream;
  
  if (widget.isManager && widget.planDate != null) {
    // Manager mode with plan context
    stream = _chatRepository.streamManagerChat(
      message: query,
      planDate: widget.planDate!,
    );
  } else {
    // Staff mode or no plan context - use regular endpoints
    final request = ChatRequest(
      messages: List.from(_conversationHistory),
      conversationId: _conversationId,
      threadId: _threadId,
      mode: _chatMode,
      // ... rest of request
    );
    
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

  // Continue with existing stream subscription logic...
}
```

#### Success Criteria
- [ ] Network tab shows `POST /api/manager/chat` with body `{message, plan_date}`
- [ ] SSE events stream correctly (begin-stream, agent-step, text-chunk, stream-end)
- [ ] Agent names display in UI (Orchestrator, Stocker, Planner, Reviser)

#### Related Files
- `mobile/lib/features/chat/data/models/chat_models.dart` (no changes needed)
- `mobile/lib/injector/modules/repository_module.dart` (no changes needed)

---

### M2: Connect Plans to Backend API ⏱️ 1-1.5 hours
**Priority:** 🔴 CRITICAL (MVP blocker)  
**Depends On:** M1 (for testing chat integration)  
**Parallel-Safe:** ⚠️ Medium - modifies PlansCubit, but UI doesn't change

#### What to Build
Replace mock data in `PlansCubit` with API calls to `/api/manager/plans`.

#### Files to Modify

**FILE 1:** `mobile/lib/features/plans/cubit/plans_cubit.dart`

```dart
import 'package:dio/dio.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:insider/configs/app_config.dart';
import 'package:insider/features/plans/cubit/plans_state.dart';
import 'package:insider/features/plans/data/mock_plans.dart';
import 'package:insider/injector/injector.dart';

class PlansCubit extends Cubit<PlansState> {
  PlansCubit() : super(const PlansState());

  // REPLACE loadPlans() entirely:
  Future<void> loadPlans() async {
    emit(state.copyWith(status: PlansStatus.loading));
    
    try {
      final dio = Injector.instance<Dio>();
      
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
    } catch (e, stack) {
      print('Failed to load plans: $e\n$stack');
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

  // Keep existing methods: updateQuantity, acceptItem, rejectItem, resetItem
  // We'll wire them to API in M3
}
```

#### Success Criteria
- [ ] Plans screen shows loading spinner
- [ ] Network tab shows `GET /api/manager/plans` then `GET /api/manager/plans/{date}`
- [ ] Proposal cards display real data (SKU as title, confidence in subtitle)
- [ ] Status badges reflect backend `approval_state`

#### Related Files
- `mobile/lib/features/plans/data/mock_plans.dart` (keep for reference)
- `mobile/lib/features/plans/view/plans_screen.dart` (no changes needed - UI stays same)
- `mobile/lib/features/plans/cubit/plans_state.dart` (no changes needed)

---

### M3: Wire Accept/Reject/Revise to Backend ⏱️ 45 min - 1 hour
**Priority:** 🟡 Medium (Demo enhancement)  
**Depends On:** M2 completion  
**Parallel-Safe:** ✅ Yes - same file as M2, but M2 must be done first

#### What to Build
Make Accept/Reject/Adjust quantity buttons call backend APIs and refresh.

#### Files to Modify

**FILE:** `mobile/lib/features/plans/cubit/plans_cubit.dart` (continue from M2)

```dart
// ADD to PlansCubit class:

Future<void> acceptItem(String itemId) async {
  final date = state.planDate?.toIso8601String().split('T').first;
  if (date == null) {
    print('No plan date available');
    return;
  }
  
  try {
    final dio = Injector.instance<Dio>();
    final item = state.items.firstWhere((i) => i.id == itemId);
    
    // Use revise endpoint (accept = approve with current/adjusted quantity)
    await dio.post(
      '${AppConfig.baseUrl}/api/manager/plans/$date/actions/$itemId/revise',
      data: {
        'new_quantity': item.adjustedQuantity,
        'revised_by': 'manager', // TODO: Get from auth service
      },
    );
    
    // Refresh from backend
    await loadPlans();
  } catch (e) {
    print('Failed to accept item: $e');
    emit(state.copyWith(
      status: PlansStatus.error,
      errorMessage: 'Failed to accept: $e',
    ));
  }
}

Future<void> rejectItem(String itemId) async {
  final date = state.planDate?.toIso8601String().split('T').first;
  if (date == null) return;
  
  try {
    final dio = Injector.instance<Dio>();
    
    await dio.post(
      '${AppConfig.baseUrl}/api/manager/plans/$date/actions/$itemId/reject',
      data: {
        'rejected_by': 'manager',
        'reason': 'Rejected from UI',
      },
    );
    
    await loadPlans();
  } catch (e) {
    print('Failed to reject item: $e');
    emit(state.copyWith(
      status: PlansStatus.error,
      errorMessage: 'Failed to reject: $e',
    ));
  }
}

void updateQuantity(String itemId, int newQuantity) {
  // Update local state immediately for UI responsiveness
  final updatedItems = state.items.map((item) {
    if (item.id == itemId) {
      return item.copyWith(
        adjustedQuantity: newQuantity,
        status: ProposalStatus.adjusted,
      );
    }
    return item;
  }).toList();
  
  emit(state.copyWith(items: updatedItems));
  
  // Note: Don't call backend yet - only when Accept is tapped
}

void resetItem(String itemId) {
  final updatedItems = state.items.map((item) {
    if (item.id == itemId) {
      return item.copyWith(
        adjustedQuantity: item.quantity,
        status: ProposalStatus.pending,
      );
    }
    return item;
  }).toList();
  
  emit(state.copyWith(items: updatedItems));
}
```

#### Success Criteria
- [ ] Tapping Accept calls `POST /api/manager/plans/{date}/actions/{id}/revise`
- [ ] Tapping Reject calls `POST /api/manager/plans/{date}/actions/{id}/reject`
- [ ] After action, plan reloads and shows updated status
- [ ] Status badge changes (Pending → Approved or Rejected)

#### Related Files
- `mobile/lib/features/plans/view/proposal_card.dart` (no changes - already wired)
- `mobile/lib/features/plans/view/plans_screen.dart` (no changes)

---

### M4: Connect Plans Screen to Manager Chat ⏱️ 15-20 min
**Priority:** 🟡 Medium (Demo flow completion)  
**Depends On:** M1 + M2  
**Parallel-Safe:** ✅ Yes

#### What to Build
When tapping "Ask about this plan" from Plans screen, pass `planDate` to `ConversationScreen`.

#### Files to Modify

**FILE:** `mobile/lib/features/plans/view/plans_screen.dart`

Find `_handleAskAboutPlan()` method (around line 59-75) and modify:

```dart
void _handleAskAboutPlan() {
  final query = _inputController.text.trim();
  if (query.isEmpty) return;

  HapticFeedback.mediumImpact();
  _inputController.clear();
  
  final planDate = context.read<PlansCubit>().state.planDate;
  final planDateString = planDate != null 
      ? '${planDate.year}-${planDate.month.toString().padLeft(2, '0')}-${planDate.day.toString().padLeft(2, '0')}'
      : null;
  
  // Navigate to conversation with plan context
  Navigator.of(context).push(
    MaterialPageRoute(
      builder: (context) => ConversationScreen(
        query: 'Regarding today\'s inventory plan: $query',
        chatMode: ChatMode.simpleQa,
        isManager: true,              // ADD
        planDate: planDateString,     // ADD
      ),
    ),
  );
}
```

#### Success Criteria
- [ ] From Plans screen, type question and tap send
- [ ] ConversationScreen opens with `isManager=true` and `planDate` set
- [ ] Network tab shows `POST /api/manager/chat` with correct `plan_date`
- [ ] Agent responds with plan-aware context

#### Related Files
- `mobile/lib/features/chat/view/conversation_screen.dart` (M1 already modified)
- `mobile/lib/features/plans/cubit/plans_cubit.dart` (M2 already has planDate)

---

## 🔀 Integration Testing Tasks

### I1: End-to-End Manager Flow ⏱️ 15-20 min
**Depends On:** All mobile tasks (M1-M4) + B1  
**Who:** Both teams (or QA)

#### Test Scenario

```
1. Open app → Toggle to Manager mode
   Expected: Plans icon appears in header

2. Tap Plans icon
   Expected: Loading spinner → Plan cards appear
   Verify: Network shows GET /api/manager/plans

3. Tap a proposal card to expand
   Expected: Shows reasoning, evidence, actions
   Verify: Accept/Reject buttons visible

4. Adjust quantity → Tap Accept
   Expected: Status changes to Approved
   Verify: Network shows POST .../revise

5. Tap "Ask about this plan" input
   Type: "Why order 50 umbrellas?"
   Expected: ConversationScreen opens
   Verify: Network shows POST /api/manager/chat with plan_date

6. Watch agent thinking steps
   Expected: See "Orchestrator", "Stocker", "Planner", "Reviser"
   Verify: Final response mentions rain forecast (plan context)

7. Toggle to Staff mode → Send chat message
   Expected: Generic chat (no plan access)
   Verify: Network shows POST /api/staff/chat (if B1 done)
```

#### Pass Criteria
- [ ] All 7 steps complete without errors
- [ ] Plan data is real (not mock)
- [ ] Manager chat includes plan context
- [ ] Staff chat works but has no plan access

---

## 📊 Task Dependencies Graph

```
MOBILE:
  M1 (Manager Chat Fix)
    │
    ├──► M2 (Plans API Connect)
    │      │
    │      └──► M3 (Accept/Reject Wiring)
    │
    └──► M4 (Plans → Chat Navigation)
            │
            └──► I1 (Integration Test)

BACKEND:
  B1 (Staff Endpoint)
    │
    └──► B2 (Testing)
           │
           └──► I1 (Integration Test)

CRITICAL PATH: M1 → M2 → M3 → I1 (3-4 hours)
PARALLEL PATH: B1 → B2 (1.5 hours)
```

---

## 🎯 Success Metrics per Team

### Backend Team ✅
- [ ] `/api/staff/chat` endpoint returns SSE stream
- [ ] Only Stocker agent responses (no Planner/Reviser)
- [ ] All existing Manager endpoints still work
- [ ] Swagger tests pass for both Staff and Manager

### Mobile Team ✅
- [ ] Plans screen loads real data from backend
- [ ] Accept/Reject actions update backend and refresh UI
- [ ] Manager chat connects to `/api/manager/chat` with `plan_date`
- [ ] Staff chat connects to `/api/staff/chat` (when backend ready)
- [ ] SSE agent steps display correctly

### Integration ✅
- [ ] Manager can view → modify → chat about plans
- [ ] Staff can query inventory without plan access
- [ ] No mock data visible in production flow

---

## ⏰ Time Estimates Summary

| Team | Task | Time | Can Start | Blocking |
|------|------|------|-----------|----------|
| Backend | B1: Staff Endpoint | 1-1.5h | ✅ Now | No |
| Backend | B2: Testing | 30m | After B1 | No |
| Mobile | M1: Manager Chat | 30-45m | ✅ Now | 🔴 MVP |
| Mobile | M2: Plans API | 1-1.5h | After M1 | 🔴 MVP |
| Mobile | M3: Actions Wiring | 45m-1h | After M2 | 🟡 Demo |
| Mobile | M4: Chat Navigation | 15-20m | After M1+M2 | 🟡 Demo |
| Both | I1: Integration Test | 15-20m | After all | - |

**Total Parallel Time:** ~3 hours (if both teams work simultaneously)  
**Total Sequential Time:** ~6 hours (if one person does everything)

---

## 🚀 Recommended Work Order

### Day 1 Morning (2 hours)
**Backend:** Start B1 (Staff Endpoint)  
**Mobile:** Complete M1 (Manager Chat Fix) + Start M2 (Plans API)

### Day 1 Afternoon (2 hours)
**Backend:** Finish B1, complete B2 (Testing)  
**Mobile:** Finish M2, complete M3 (Actions Wiring)

### Day 2 Morning (1 hour)
**Mobile:** Complete M4 (Chat Navigation)  
**Both:** Run I1 (Integration Testing)

### Day 2 Afternoon
**Polish, bug fixes, demo prep**

---

## 📝 Quick Reference

### File Checklist by Team

**Backend touches:**
- ✏️ `backend/src/Kiyo9w.StoreMind.Service/Endpoints/Staff.cs` (new)
- ✏️ `backend/src/Kiyo9w.StoreMind.Service/Program.cs` (1 line)

**Mobile touches:**
- ✏️ `mobile/lib/data/repositories/chat/chat_repository.dart`
- ✏️ `mobile/lib/data/repositories/chat/chat_repository_impl.dart`
- ✏️ `mobile/lib/features/chat/view/conversation_screen.dart`
- ✏️ `mobile/lib/features/plans/cubit/plans_cubit.dart`
- ✏️ `mobile/lib/features/plans/view/plans_screen.dart`

**No changes needed:**
- ✅ `mobile/lib/features/plans/data/mock_plans.dart` (keep for reference)
- ✅ `mobile/lib/features/plans/view/proposal_card.dart` (already wired correctly)
- ✅ `mobile/lib/features/chat/data/models/chat_models.dart`
- ✅ `backend/src/Kiyo9w.StoreMind.Service/Endpoints/Manager.cs`

---

**End of Task Breakdown**

*Ready to assign to teams! Each task is isolated and can run in parallel.*
