import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:insider/configs/app_config.dart';
import 'package:insider/features/plans/cubit/plans_state.dart';
import 'package:insider/features/plans/data/mock_plans.dart';
import 'package:insider/features/plans/data/plan_demo_images.dart';

import 'package:insider/injector/injector.dart';

import 'package:insider/injector/modules/dio_module.dart';

/// PlansCubit manages the state for the Plans feature
/// Connects to StoreMind backend API at /api/manager/plans
class PlansCubit extends Cubit<PlansState> {
  PlansCubit() : super(const PlansState());

  /// List of available plan dates from backend
  List<String> _availableDates = [];

  /// Get available plan dates
  List<String> get availableDates => _availableDates;

  /// Load plans from StoreMind backend
  /// GET /api/manager/plans -> list of plan dates
  /// GET /api/manager/plans/{date} -> plan details with actions
  Future<void> loadPlans({DateTime? forDate}) async {
    debugPrint('');
    debugPrint(
        '╔════════════════════════════════════════════════════════════╗');
    debugPrint(
        '║ [PlansCubit] loadPlans() CALLED                            ║');
    debugPrint(
        '╠════════════════════════════════════════════════════════════╣');
    debugPrint('║ forDate: $forDate');
    debugPrint('║ Current state.status: ${state.status}');
    debugPrint(
        '╚════════════════════════════════════════════════════════════╝');
    debugPrint('');

    emit(state.copyWith(status: PlansStatus.loading));
    debugPrint('[PlansCubit] Emitted PlansStatus.loading');

    try {
      debugPrint('[PlansCubit] Getting Dio instance...');
      final dio =
          Injector.instance<Dio>(instanceName: DioModule.dioInstanceName);
      debugPrint('[PlansCubit] Dio baseUrl: ${dio.options.baseUrl}');
      debugPrint('[PlansCubit] AppConfig.baseUrl: ${AppConfig.baseUrl}');

      // 1. Get list of plan dates from StoreMind backend
      final listUrl = '${AppConfig.baseUrl}/api/manager/plans';
      debugPrint('[PlansCubit] GET $listUrl');

      final listResponse = await dio.get(listUrl).timeout(
        const Duration(seconds: 10),
        onTimeout: () {
          throw DioException(
            requestOptions: RequestOptions(path: listUrl),
            error: 'Connection timeout',
            type: DioExceptionType.connectionTimeout,
          );
        },
      );

      debugPrint(
          '[PlansCubit] List response: ${listResponse.statusCode} ${listResponse.data}');

      final dates = List<String>.from(listResponse.data['plans'] ?? []);
      _availableDates = dates;
      debugPrint('[PlansCubit] Parsed dates: $dates');

      if (dates.isEmpty) {
        debugPrint('[PlansCubit] No plans found, setting empty items.');
        emit(state.copyWith(
          status: PlansStatus.loaded,
          items: [],
          planDate: forDate ?? DateTime.now(),
        ));
        return;
      }

      // 2. Determine which date to load
      String targetDate;
      if (forDate != null) {
        // Format the requested date as yyyy-MM-dd
        targetDate =
            '${forDate.year}-${forDate.month.toString().padLeft(2, '0')}-${forDate.day.toString().padLeft(2, '0')}';
        // Check if this date has a plan
        if (!dates.contains(targetDate)) {
          debugPrint('[PlansCubit] No plan found for $targetDate');
          emit(state.copyWith(
            status: PlansStatus.loaded,
            items: [],
            planDate: forDate,
          ));
          return;
        }
      } else {
        // Use the latest plan date
        targetDate = dates.first;
      }

      final planUrl = '${AppConfig.baseUrl}/api/manager/plans/$targetDate';
      debugPrint('[PlansCubit] GET $planUrl');

      final planResponse = await dio.get(planUrl).timeout(
        const Duration(seconds: 10),
        onTimeout: () {
          throw DioException(
            requestOptions: RequestOptions(path: planUrl),
            error: 'Connection timeout',
            type: DioExceptionType.connectionTimeout,
          );
        },
      );

      debugPrint('[PlansCubit] Plan response: ${planResponse.statusCode}');

      final plan = planResponse.data['plan'] as Map<String, dynamic>;
      final actions = plan['actions'] as List? ?? [];

      debugPrint('[PlansCubit] Plan has ${actions.length} actions');

      // Parse plan summary and traces
      final planSummary = _parsePlanSummary(plan);

      // 3. Parse proposals to existing PlanItem model
      final items = actions.map<PlanItem>((json) {
        final target = json['target'] as Map<String, dynamic>? ?? {};

        // Parse structured evidence items
        final structuredEvidence = (json['evidence'] as List?)?.map((e) {
              final source = e['source']?.toString() ?? 'Unknown';
              final description = e['description']?.toString() ?? '';
              return EvidenceItem(source: source, description: description);
            }).toList() ??
            <EvidenceItem>[];

        // Legacy: flat string evidence for backward compatibility
        final evidenceList = structuredEvidence
            .map((e) => e.description)
            .where((d) => d.isNotEmpty)
            .toList();

        // Map backend type to frontend enum
        final type = _parseType(json['type']?.toString());

        // Parse risk flags
        final riskFlags =
            (json['risk_flags'] as List?)?.map((e) => e.toString()).toList() ??
                <String>[];

        // Parse confidence and margin
        final confidence = (json['confidence'] as num?)?.toDouble() ?? 1.0;
        final impact = json['expected_impact'] as Map<String, dynamic>?;
        final marginDelta = (impact?['margin_delta'] as num?)?.toDouble();

        // Build subtitle with quantity, confidence, and margin info
        final qty = (target['qty'] as num?)?.toInt() ?? 0;
        final confidencePct = (confidence * 100).toInt();
        final subtitle = marginDelta != null && marginDelta > 0
            ? 'Qty: $qty • Confidence: $confidencePct% • ¥${marginDelta.toStringAsFixed(0)} margin'
            : 'Qty: $qty • Confidence: $confidencePct%';

        // Use the rich reasoning field if available, fall back to evidence join
        final reasoning =
            json['reasoning']?.toString() ?? evidenceList.join('. ');

        final sku = target['sku']?.toString() ?? 'Unknown Item';
        return PlanItem(
          id: json['id']?.toString() ?? '',
          title: sku,
          subtitle: subtitle,
          imageUrl: json['image_url']?.toString() ??
              json['imageUrl']?.toString() ??
              PlanDemoImages.forKey(sku),
          quantity: qty,
          type: type,
          reasoning: reasoning,
          evidence: evidenceList,
          structuredEvidence: structuredEvidence,
          riskFlags: riskFlags,
          confidence: confidence,
          marginDelta: marginDelta,
          status: _parseStatus(json['approval_state']?.toString()),
        );
      }).toList();

      debugPrint('[PlansCubit] Parsed ${items.length} items successfully');

      emit(state.copyWith(
        status: PlansStatus.loaded,
        items: items,
        planDate: DateTime.tryParse(targetDate),
        planSummary: planSummary,
      ));
    } catch (e, stack) {
      debugPrint('[PlansCubit] CRITICAL ERROR: $e\n$stack');

      emit(state.copyWith(
        status: PlansStatus.error,
        errorMessage: 'Error: $e',
        planDate: forDate ?? state.planDate,
      ));
    }
  }

  /// Load plan for a specific date (shorthand)
  Future<void> loadPlanForDate(DateTime date) async {
    await loadPlans(forDate: date);
  }

  /// Parse backend ProposalType to frontend enum
  /// Backend: Order, Markdown, Alert
  /// Frontend: order, markdown, restock, discontinue
  ProposalType _parseType(String? type) {
    switch (type?.toLowerCase()) {
      case 'order':
        return ProposalType.order;
      case 'markdown':
        return ProposalType.markdown;
      case 'alert':
        return ProposalType.discontinue;
      default:
        return ProposalType.order;
    }
  }

  /// Parse backend ApprovalState to frontend enum
  /// Backend: Pending, Approved, Rejected
  /// Frontend: pending, approved, adjusted, rejected
  ProposalStatus _parseStatus(String? state) {
    switch (state?.toLowerCase()) {
      case 'approved':
        return ProposalStatus.approved;
      case 'rejected':
        return ProposalStatus.rejected;
      default:
        return ProposalStatus.pending;
    }
  }

  /// Parse plan-level summary and agent traces from backend response
  PlanSummary _parsePlanSummary(Map<String, dynamic> plan) {
    final assumptions =
        (plan['assumptions'] as List?)?.map((e) => e.toString()).toList() ?? [];
    final modelUsed = plan['model_used']?.toString();
    final confidenceScore =
        (plan['confidence_score'] as num?)?.toDouble() ?? 0.0;
    final actions = plan['actions'] as List? ?? [];

    // Parse conversation traces
    final conversation = plan['conversation'] as Map<String, dynamic>? ?? {};
    final tracesJson = conversation['traces'] as List? ?? [];
    final durationMs = (conversation['duration_ms'] as num?)?.toInt() ?? 0;

    final traces = tracesJson.map<AgentTraceItem>((t) {
      return AgentTraceItem(
        agentName: t['agent_name']?.toString() ?? 'Unknown',
        role: t['role']?.toString() ?? 'Unknown',
        content: t['content']?.toString() ?? '',
        timestamp: DateTime.tryParse(t['timestamp']?.toString() ?? '') ??
            DateTime.now(),
        modelUsed: t['model_used']?.toString(),
        tokensUsed: (t['tokens_used'] as num?)?.toInt(),
        latencyMs: (t['latency_ms'] as num?)?.toInt(),
      );
    }).toList();

    // Extract observation count from reasoning log
    final reasoningLog = plan['reasoning_log']?.toString() ?? '';
    final obsMatch = RegExp(r'(\d+) observations').firstMatch(reasoningLog);
    final observationCount =
        obsMatch != null ? int.tryParse(obsMatch.group(1)!) ?? 0 : 0;

    // Extract weather summary from plan snapshot if available
    final snapshot = plan['snapshot'] as Map<String, dynamic>?;
    String? weatherSummary;
    if (snapshot != null) {
      final weather = snapshot['weather'] as Map<String, dynamic>?;
      if (weather != null) {
        final condition = weather['condition']?.toString();
        final tempHigh = (weather['temp_high'] as num?)?.toInt();
        final tempLow = (weather['temp_low'] as num?)?.toInt();
        if (condition != null) {
          weatherSummary = '$condition';
          if (tempHigh != null && tempLow != null) {
            weatherSummary = '$condition — ${tempLow}°C to ${tempHigh}°C';
          }
        }
      }
    }
    // Fallback: check for weather string in plan root
    weatherSummary ??= plan['weather_summary']?.toString();

    return PlanSummary(
      assumptions: assumptions,
      weatherSummary: weatherSummary,
      modelUsed: modelUsed,
      confidenceScore: confidenceScore,
      totalActions: actions.length,
      agentInteractions: traces.length,
      analysisObservations: observationCount,
      durationMs: durationMs,
      traces: traces,
    );
  }

  /// Update quantity for a plan item (local state only)
  /// Backend update happens when acceptItem is called
  void updateQuantity(String itemId, int newQuantity) {
    final updatedItems = state.items.map((item) {
      if (item.id == itemId) {
        return item.copyWith(adjustedQuantity: newQuantity);
      }
      return item;
    }).toList();

    emit(state.copyWith(items: updatedItems));
  }

  /// Accept a plan item (approve with current/adjusted quantity)
  /// POST /api/manager/plans/{date}/actions/{id}/revise
  Future<void> acceptItem(String itemId) async {
    final date = state.planDate?.toIso8601String().split('T').first;
    if (date == null) {
      debugPrint('[PlansCubit] No plan date available');
      return;
    }

    try {
      final dio =
          Injector.instance<Dio>(instanceName: DioModule.dioInstanceName);
      final item = state.items.firstWhere((i) => i.id == itemId);

      debugPrint(
          '[PlansCubit] Accepting item $itemId with quantity ${item.adjustedQuantity}');

      // Use revise endpoint (accept = approve with current/adjusted quantity)
      await dio.post(
        '${AppConfig.baseUrl}/api/manager/plans/$date/actions/$itemId/revise',
        data: {
          'new_quantity': item.adjustedQuantity,
          'revised_by': 'manager', // todo: get from auth service
        },
      );

      // Refresh from backend
      await loadPlans();
    } catch (e) {
      debugPrint('[PlansCubit] Failed to accept item: $e');

      // Fallback: update local state for demo
      final updatedItems = state.items.map((item) {
        if (item.id == itemId) {
          final isAdjusted = item.adjustedQuantity != item.quantity;
          return item.copyWith(
            status:
                isAdjusted ? ProposalStatus.adjusted : ProposalStatus.approved,
          );
        }
        return item;
      }).toList();

      emit(state.copyWith(items: updatedItems));
    }
  }

  /// Reject a plan item
  /// POST /api/manager/plans/{date}/actions/{id}/reject
  Future<void> rejectItem(String itemId) async {
    final date = state.planDate?.toIso8601String().split('T').first;
    if (date == null) return;

    try {
      final dio =
          Injector.instance<Dio>(instanceName: DioModule.dioInstanceName);

      debugPrint('[PlansCubit] Rejecting item $itemId');

      await dio.post(
        '${AppConfig.baseUrl}/api/manager/plans/$date/actions/$itemId/reject',
        data: {
          'rejected_by': 'manager',
          'reason': 'Rejected from UI',
        },
      );

      await loadPlans();
    } catch (e) {
      debugPrint('[PlansCubit] Failed to reject item: $e');

      // Fallback: update local state for demo
      final updatedItems = state.items.map((item) {
        if (item.id == itemId) {
          return item.copyWith(status: ProposalStatus.rejected);
        }
        return item;
      }).toList();

      emit(state.copyWith(items: updatedItems));
    }
  }

  /// Reset an item back to pending (local state only)
  void resetItem(String itemId) {
    final updatedItems = state.items.map((item) {
      if (item.id == itemId) {
        return item.copyWith(
          status: ProposalStatus.pending,
          adjustedQuantity: item.quantity,
        );
      }
      return item;
    }).toList();

    emit(state.copyWith(items: updatedItems));
  }

  /// Accept all pending items
  Future<void> acceptAll() async {
    // Get all pending items
    final pendingItems =
        state.items.where((i) => i.status == ProposalStatus.pending).toList();

    for (final item in pendingItems) {
      await acceptItem(item.id);
    }
  }
}
