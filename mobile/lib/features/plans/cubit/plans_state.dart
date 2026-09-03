import 'package:insider/features/plans/data/mock_plans.dart';

enum PlansStatus {
  initial,
  loading,
  loaded,
  error,
}

class PlansState {
  final PlansStatus status;
  final List<PlanItem> items;
  final String? errorMessage;
  final DateTime? planDate;
  final PlanSummary? planSummary;

  const PlansState({
    this.status = PlansStatus.initial,
    this.items = const [],
    this.errorMessage,
    this.planDate,
    this.planSummary,
  });

  PlansState copyWith({
    PlansStatus? status,
    List<PlanItem>? items,
    String? errorMessage,
    DateTime? planDate,
    PlanSummary? planSummary,
  }) {
    return PlansState(
      status: status ?? this.status,
      items: items ?? this.items,
      errorMessage: errorMessage ?? this.errorMessage,
      planDate: planDate ?? this.planDate,
      planSummary: planSummary ?? this.planSummary,
    );
  }

  int get pendingCount => items.where((i) => i.status == ProposalStatus.pending).length;
  int get approvedCount => items.where((i) => i.status == ProposalStatus.approved).length;
  int get adjustedCount => items.where((i) => i.status == ProposalStatus.adjusted).length;
  int get rejectedCount => items.where((i) => i.status == ProposalStatus.rejected).length;
}
