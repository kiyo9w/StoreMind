import 'dart:ui';
import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:insider/core/design_system/design_system.dart';
import 'package:insider/features/app/cubit/manager_mode_cubit.dart';
import 'package:insider/features/plans/cubit/plans_cubit.dart';
import 'package:insider/features/plans/cubit/plans_state.dart';
import 'package:insider/features/plans/data/mock_plans.dart';
import 'package:insider/features/plans/data/demo_ja.dart';

import 'package:insider/features/plans/view/proposal_card.dart';
import 'package:insider/features/chat/view/conversation_screen.dart';
import 'package:insider/features/chat/data/models/chat_models.dart';
import 'package:intl/intl.dart';

class PlansScreen extends StatelessWidget {
  const PlansScreen({
    super.key,
    this.showBackButton = true,
  });

  final bool showBackButton;

  @override
  Widget build(BuildContext context) {
    debugPrint('[PlansScreen] build() called');
    return BlocBuilder<ManagerModeCubit, bool>(
      builder: (context, isManager) {
        debugPrint('[PlansScreen] ManagerModeCubit isManager: $isManager');
        if (!isManager) {
          debugPrint('[PlansScreen] Showing _ManagerOnlyScreen (not manager)');
          return _ManagerOnlyScreen(showBackButton: showBackButton);
        }

        debugPrint('[PlansScreen] Creating PlansCubit and BlocProvider');
        return BlocProvider(
          create: (context) {
            debugPrint(
                '[PlansScreen] BlocProvider create callback - instantiating PlansCubit');
            final cubit = PlansCubit();
            debugPrint('[PlansScreen] PlansCubit created, calling loadPlans()');
            cubit.loadPlans();
            return cubit;
          },
          child: _PlansContent(showBackButton: showBackButton),
        );
      },
    );
  }
}

class _PlansContent extends StatefulWidget {
  const _PlansContent({this.showBackButton = true});

  final bool showBackButton;

  @override
  State<_PlansContent> createState() => _PlansContentState();
}

class _PlansContentState extends State<_PlansContent> {
  final TextEditingController _inputController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    debugPrint('[PlansScreen] initState called - forcing loadPlans()');
    // Force load plans after the widget is built
    WidgetsBinding.instance.addPostFrameCallback((_) {
      debugPrint('[PlansScreen] PostFrameCallback - calling loadPlans()');
      context.read<PlansCubit>().loadPlans();
    });
  }

  @override
  void dispose() {
    _inputController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _handleAskAboutPlan() {
    final query = _inputController.text.trim();
    if (query.isEmpty) return;

    HapticFeedback.mediumImpact();
    _inputController.clear();

    // Get plan date from cubit for StoreMind manager chat context
    final planDate = context.read<PlansCubit>().state.planDate;
    final planDateString = planDate != null
        ? '${planDate.year}-${planDate.month.toString().padLeft(2, '0')}-${planDate.day.toString().padLeft(2, '0')}'
        : null;

    debugPrint(
        '[PlansScreen] Navigating to conversation with planDate: $planDateString');

    // Navigate to conversation with plan context for StoreMind multi-agent chat
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => ConversationScreen(
          query: 'Regarding today\'s inventory plan: $query',
          chatMode: ChatMode.simpleQa,
          isManager: true, // Enable StoreMind manager mode
          planDate: planDateString, // Pass plan date for context
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? const Color(0xFF2F3033) : const Color(0xFFB6B7BB),
      body: NestedScrollView(
        headerSliverBuilder: (context, innerBoxIsScrolled) {
          return [
            SliverAppBar.large(
              expandedHeight: 120,
              backgroundColor:
                  isDark ? const Color(0xFF2F3033) : const Color(0xFFB6B7BB),
              surfaceTintColor: Colors.transparent,
              leading: widget.showBackButton
                  ? IconButton(
                      icon: Icon(
                        Icons.arrow_back,
                        color: isDark ? Colors.white : Colors.black,
                      ),
                      onPressed: () => Navigator.pop(context),
                    )
                  : null,
              title: Text(
                DemoJa.planReview,
                style: DesignSystem.headingLarge.copyWith(
                  color: isDark ? Colors.white : Colors.black,
                  fontSize: 28,
                ),
              ),
              centerTitle: false,
              actions: [
                BlocBuilder<PlansCubit, PlansState>(
                  builder: (context, state) {
                    return _CalendarButton(
                      isDark: isDark,
                      selectedDate: state.planDate ?? DateTime.now(),
                      onTap: () => _openCalendar(context, isDark),
                    );
                  },
                ),
                const SizedBox(width: 8),
              ],
            ),
          ];
        },
        body: Column(
          children: [
            _buildStatusFilterList(context, isDark),
            Expanded(
              child: BlocBuilder<PlansCubit, PlansState>(
                builder: (context, state) {
                  // Handle initial and loading states - show loading indicator
                  if (state.status == PlansStatus.initial ||
                      state.status == PlansStatus.loading) {
                    return const Center(child: CircularProgressIndicator());
                  }

                  if (state.status == PlansStatus.error) {
                    return Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.error_outline,
                              size: 48,
                              color: isDark ? Colors.redAccent : Colors.red),
                          const SizedBox(height: 16),
                          Text(
                            DemoJa.failedLoad,
                            style: DesignSystem.headingMedium.copyWith(
                              color: isDark ? Colors.white : Colors.black,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 32),
                            child: Text(
                              state.errorMessage ?? DemoJa.unknownError,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: isDark ? Colors.white70 : Colors.black54,
                              ),
                            ),
                          ),
                          const SizedBox(height: 24),
                          FilledButton.icon(
                            onPressed: () =>
                                context.read<PlansCubit>().loadPlans(),
                            icon: const Icon(Icons.refresh),
                            label: const Text(DemoJa.retry),
                            style: FilledButton.styleFrom(
                              backgroundColor: DesignSystem.primaryCyan,
                            ),
                          ),
                        ],
                      ),
                    );
                  }

                  if (state.items.isEmpty) {
                    return _buildEmptyState(isDark);
                  }

                  return Stack(
                    children: [
                      const Positioned.fill(child: _ContourField()),
                      ListView.builder(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 20, vertical: 8),
                        itemCount: state.items.length + 2,
                        itemBuilder: (context, index) {
                          if (index == 0) {
                            return _PlanInsightsCard(
                              isDark: isDark,
                              summary: state.planSummary,
                            );
                          }
                          if (index == state.items.length + 1) {
                            return const SizedBox(height: 100);
                          }
                          final item = state.items[index - 1];
                          return ProposalCard(
                            item: item,
                            isDark: isDark,
                            onQuantityChanged: (qty) => context
                                .read<PlansCubit>()
                                .updateQuantity(item.id, qty),
                            onAccept: () =>
                                context.read<PlansCubit>().acceptItem(item.id),
                            onReject: () =>
                                context.read<PlansCubit>().rejectItem(item.id),
                            onReset: () =>
                                context.read<PlansCubit>().resetItem(item.id),
                          );
                        },
                      ),
                    ],
                  );
                },
              ),
            ),
            _buildInputArea(isDark),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusFilterList(BuildContext context, bool isDark) {
    return BlocBuilder<PlansCubit, PlansState>(
      builder: (context, state) {
        return Padding(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 8),
          child: Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              _buildFilterChip(DemoJa.all, state.items.length, true, isDark),
              _buildFilterChip(
                  DemoJa.pending, state.pendingCount, false, isDark,
                  isPending: true),
              _buildFilterChip(
                  DemoJa.approved, state.approvedCount, false, isDark),
              _buildFilterChip(
                  DemoJa.rejected, state.rejectedCount, false, isDark),
            ],
          ),
        );
      },
    );
  }

  Widget _buildFilterChip(String label, int count, bool isSelected, bool isDark,
      {bool isPending = false}) {
    final bgColor = isSelected
        ? (isDark ? Colors.white : Colors.black)
        : (isDark
            ? Colors.white.withOpacity(0.08)
            : Colors.black.withOpacity(0.05));
    final textColor = isSelected
        ? (isDark ? Colors.black : Colors.white)
        : (isDark ? Colors.white : Colors.black);

    return Container(
      height: 36,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(20),
        border: isPending && !isSelected
            ? Border.all(
                color: DesignSystem.primaryCyan.withOpacity(0.5), width: 1)
            : null,
      ),
      alignment: Alignment.center,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            label,
            style: DesignSystem.button.copyWith(
              color: textColor,
              fontWeight: FontWeight.w600,
              fontSize: 14,
            ),
          ),
          if (count > 0) ...[
            const SizedBox(width: 6),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: isSelected
                    ? (isDark
                        ? Colors.black.withOpacity(0.2)
                        : Colors.white.withOpacity(0.2))
                    : (isDark
                        ? Colors.white.withOpacity(0.2)
                        : Colors.black.withOpacity(0.1)),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                count.toString(),
                style: TextStyle(
                  color: textColor,
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildEmptyState(bool isDark) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.check_circle_outline,
              size: 64, color: isDark ? Colors.white24 : Colors.black12),
          const SizedBox(height: 16),
          Text(
            DemoJa.allCaughtUp,
            style: DesignSystem.headingMedium.copyWith(
              color: isDark ? Colors.white54 : Colors.black54,
            ),
          ),
        ],
      ),
    );
  }

  // Calendar date selection bottom sheet
  Future<void> _openCalendar(BuildContext context, bool isDark) async {
    final cubit = context.read<PlansCubit>();
    final currentDate = cubit.state.planDate ?? DateTime.now();
    DateTime viewMonth = DateTime(currentDate.year, currentDate.month);
    DateTime tempSelected = currentDate;

    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setState) {
            return Container(
              decoration: BoxDecoration(
                color: isDark ? const Color(0xFF1C1C1E) : Colors.white,
                borderRadius:
                    const BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: SafeArea(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 12, 20, 20),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Drag handle
                      Center(
                        child: Container(
                          width: 36,
                          height: 4,
                          decoration: BoxDecoration(
                            color: isDark ? Colors.white24 : Colors.black12,
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      // Title
                      Text(
                        'Select Date',
                        style: DesignSystem.headingMedium.copyWith(
                          color: isDark ? Colors.white : Colors.black,
                        ),
                      ),
                      const SizedBox(height: 20),
                      // Month navigation
                      _buildMonthHeader(viewMonth, isDark, (newMonth) {
                        setState(() => viewMonth = newMonth);
                      }),
                      const SizedBox(height: 16),
                      // Day of week headers
                      _buildDayOfWeekHeaders(isDark),
                      const SizedBox(height: 8),
                      // Calendar grid
                      _buildCalendarGrid(
                        viewMonth,
                        tempSelected,
                        isDark,
                        cubit.availableDates,
                        (day) => setState(() => tempSelected = day),
                      ),
                      const SizedBox(height: 20),
                      // Action buttons
                      Row(
                        children: [
                          Expanded(
                            child: _buildActionButton(
                              'Cancel',
                              isDark,
                              isSecondary: true,
                              onTap: () => Navigator.pop(ctx),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: _buildActionButton(
                              'Select',
                              isDark,
                              onTap: () {
                                debugPrint(
                                    '[PlansScreen] Calendar Select tapped, date: $tempSelected');
                                Navigator.pop(ctx);
                                debugPrint(
                                    '[PlansScreen] Calling cubit.loadPlanForDate($tempSelected)');
                                cubit.loadPlanForDate(tempSelected);
                              },
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildMonthHeader(
      DateTime viewMonth, bool isDark, Function(DateTime) onChanged) {
    final title = DateFormat('MMMM yyyy').format(viewMonth);
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        IconButton(
          onPressed: () =>
              onChanged(DateTime(viewMonth.year, viewMonth.month - 1)),
          icon: Icon(
            Icons.chevron_left_rounded,
            color: isDark ? Colors.white70 : Colors.black54,
          ),
        ),
        Text(
          title,
          style: DesignSystem.titleMedium.copyWith(
            color: isDark ? Colors.white : Colors.black,
            fontWeight: FontWeight.w700,
          ),
        ),
        IconButton(
          onPressed: () =>
              onChanged(DateTime(viewMonth.year, viewMonth.month + 1)),
          icon: Icon(
            Icons.chevron_right_rounded,
            color: isDark ? Colors.white70 : Colors.black54,
          ),
        ),
      ],
    );
  }

  Widget _buildDayOfWeekHeaders(bool isDark) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return Row(
      children: days
          .map((day) => Expanded(
                child: Center(
                  child: Text(
                    day,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: isDark ? Colors.white38 : Colors.black38,
                    ),
                  ),
                ),
              ))
          .toList(),
    );
  }

  Widget _buildCalendarGrid(
    DateTime viewMonth,
    DateTime selectedDate,
    bool isDark,
    List<String> availableDates,
    Function(DateTime) onDateSelected,
  ) {
    final firstOfMonth = DateTime(viewMonth.year, viewMonth.month, 1);
    final startWeekday = (firstOfMonth.weekday + 6) % 7; // Monday = 0
    final startDate = firstOfMonth.subtract(Duration(days: startWeekday));
    final today = DateTime.now();

    return Column(
      children: List.generate(6, (row) {
        return Row(
          children: List.generate(7, (col) {
            final day = startDate.add(Duration(days: row * 7 + col));
            final isInMonth = day.month == viewMonth.month;
            final isSelected = _isSameDay(day, selectedDate);
            final isToday = _isSameDay(day, today);
            final isFuture =
                day.isAfter(DateTime(today.year, today.month, today.day));

            // Check if this date has a plan available
            final dateString =
                '${day.year}-${day.month.toString().padLeft(2, '0')}-${day.day.toString().padLeft(2, '0')}';
            final hasPlan = availableDates.contains(dateString);

            return Expanded(
              child: GestureDetector(
                onTap: isFuture
                    ? null
                    : () {
                        HapticFeedback.lightImpact();
                        onDateSelected(day);
                      },
                child: Container(
                  height: 44,
                  margin: const EdgeInsets.all(2),
                  decoration: BoxDecoration(
                    gradient: isSelected
                        ? LinearGradient(
                            colors: [
                              DesignSystem.primaryCyan,
                              DesignSystem.primaryCyan.withOpacity(0.8),
                            ],
                          )
                        : null,
                    color: isSelected
                        ? null
                        : (isToday
                            ? (isDark
                                ? Colors.white.withOpacity(0.1)
                                : Colors.black.withOpacity(0.05))
                            : null),
                    borderRadius: BorderRadius.circular(12),
                    border: isToday && !isSelected
                        ? Border.all(
                            color: DesignSystem.primaryCyan.withOpacity(0.5),
                            width: 1.5,
                          )
                        : null,
                  ),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      Text(
                        '${day.day}',
                        style: TextStyle(
                          fontSize: 15,
                          fontWeight: isSelected || isToday
                              ? FontWeight.w700
                              : FontWeight.w500,
                          color: isFuture
                              ? (isDark ? Colors.white24 : Colors.black)
                              : isSelected
                                  ? Colors.white
                                  : (isInMonth
                                      ? (isDark ? Colors.white : Colors.black)
                                      : (isDark
                                          ? Colors.white38
                                          : Colors.black26)),
                        ),
                      ),
                      // Plan indicator dot
                      if (hasPlan && !isSelected)
                        Positioned(
                          bottom: 6,
                          child: Container(
                            width: 5,
                            height: 5,
                            decoration: BoxDecoration(
                              color: DesignSystem.primaryCyan,
                              shape: BoxShape.circle,
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            );
          }),
        );
      }),
    );
  }

  Widget _buildActionButton(String label, bool isDark,
      {bool isSecondary = false, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.mediumImpact();
        onTap();
      },
      child: Container(
        height: 50,
        decoration: BoxDecoration(
          gradient: isSecondary
              ? null
              : LinearGradient(
                  colors: [
                    DesignSystem.primaryCyan,
                    DesignSystem.primaryCyan.withOpacity(0.8),
                  ],
                ),
          color: isSecondary
              ? (isDark
                  ? Colors.white.withOpacity(0.1)
                  : Colors.black.withOpacity(0.05))
              : null,
          borderRadius: BorderRadius.circular(14),
        ),
        child: Center(
          child: Text(
            label,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: isSecondary
                  ? (isDark ? Colors.white : Colors.black)
                  : Colors.white,
            ),
          ),
        ),
      ),
    );
  }

  bool _isSameDay(DateTime a, DateTime b) =>
      a.year == b.year && a.month == b.month && a.day == b.day;

  Widget _buildInputArea(bool isDark) {
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF0F0F0F) : Colors.white,
        border: Border(
            top: BorderSide(
          color: isDark ? Colors.white10 : Colors.black12,
        )),
      ),
      child: Row(
        children: [
          Expanded(
            child: Container(
              height: 52,
              decoration: BoxDecoration(
                color:
                    isDark ? const Color(0xFF1E1E1E) : const Color(0xFFF3F4F6),
                borderRadius: BorderRadius.circular(26),
              ),
              child: Row(
                children: [
                  const SizedBox(width: 16),
                  Expanded(
                    child: TextField(
                      controller: _inputController,
                      style: TextStyle(
                        color: isDark ? Colors.white : Colors.black,
                        fontSize: 16,
                      ),
                      decoration: InputDecoration(
                        hintText: DemoJa.askHint,
                        hintStyle: TextStyle(
                          color: isDark ? Colors.white38 : Colors.black38,
                        ),
                        border: InputBorder.none,
                      ),
                      onSubmitted: (_) => _handleAskAboutPlan(),
                    ),
                  ),
                  IconButton(
                    icon: Icon(
                      Icons.arrow_upward_rounded,
                      color: isDark ? Colors.white : Colors.black,
                    ),
                    onPressed: _handleAskAboutPlan,
                  ),
                  const SizedBox(width: 4),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ManagerOnlyScreen extends StatelessWidget {
  const _ManagerOnlyScreen({this.showBackButton = true});

  final bool showBackButton;

  @override
  Widget build(BuildContext context) {
    // ... existing manager screen implementation (simplified for brevity or can be copied over)
    return const Scaffold(body: Center(child: Text(DemoJa.managerOnly)));
  }
}

/// AI Insights card showing plan summary and agent traces
class _PlanInsightsCard extends StatefulWidget {
  const _PlanInsightsCard({
    required this.isDark,
    this.summary,
  });

  final bool isDark;
  final PlanSummary? summary;

  @override
  State<_PlanInsightsCard> createState() => _PlanInsightsCardState();
}

class _PlanInsightsCardState extends State<_PlanInsightsCard>
    with SingleTickerProviderStateMixin {
  bool _isExpanded = false;
  late AnimationController _animationController;
  late Animation<double> _expandAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _expandAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _toggleExpand() {
    setState(() {
      _isExpanded = !_isExpanded;
      if (_isExpanded) {
        _animationController.forward();
      } else {
        _animationController.reverse();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final summary = widget.summary ??
        const PlanSummary(
          confidenceScore: 0.95,
          agentInteractions: 21,
          totalActions: 25,
          analysisObservations: 15,
        );
    const ink = Color(0xFF1C1C1E);
    const muted = Color(0xFF3A3A3C);
    final caption = summary.assumptions.isNotEmpty
        ? summary.assumptions.first
        : (summary.weatherSummary ??
            DemoJa.obsActions(
                summary.analysisObservations, summary.totalActions));

    return Padding(
      padding: const EdgeInsets.only(bottom: 22),
      child: CustomPaint(
        painter: _GlassShadowPainter(),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(32),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 28, sigmaY: 28),
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.38),
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    Colors.white.withOpacity(0.78),
                    Colors.white.withOpacity(0.42),
                    Colors.white.withOpacity(0.22),
                  ],
                ),
                backgroundBlendMode: BlendMode.screen,
                borderRadius: BorderRadius.circular(32),
                border: Border.all(
                  color: Colors.white.withOpacity(0.72),
                  width: 1.4,
                ),
              ),
              child: Stack(
                children: [
                  Positioned.fill(
                    child: IgnorePointer(
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              Colors.white.withOpacity(0.55),
                              Colors.white.withOpacity(0.08),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(22, 20, 22, 18),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Container(
                                  width: 8,
                                  height: 8,
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF34C759),
                                    shape: BoxShape.circle,
                                    boxShadow: [
                                      BoxShadow(
                                        color: const Color(0xFF34C759)
                                            .withOpacity(0.7),
                                        blurRadius: 6,
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(width: 8),
                                const Text(
                                  DemoJa.after,
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.w600,
                                    color: ink,
                                  ),
                                ),
                                const Spacer(),
                                Text(
                                  '計画 · 信頼度 ${(summary.confidenceScore * 100).toStringAsFixed(1)}%',
                                  style: const TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w400,
                                    color: muted,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 26),
                            const SizedBox(
                              height: 64,
                              width: double.infinity,
                              child: _InsightWaveform(color: Color(0xFFFFFFFF)),
                            ),
                            const SizedBox(height: 22),
                            Text(
                              '「$caption」',
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w400,
                                color: ink,
                                height: 1.45,
                              ),
                            ),
                          ],
                        ),
                      ),
                      if (summary.traces.isNotEmpty) ...[
                        const Divider(height: 1, color: Color(0x14000000)),
                        Material(
                          color: Colors.transparent,
                          child: InkWell(
                            onTap: _toggleExpand,
                            child: Padding(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 22, vertical: 12),
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      _isExpanded
                                          ? DemoJa.hideTrace
                                          : DemoJa.viewTrace(
                                              summary.traces.length),
                                      style: const TextStyle(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w500,
                                        color: muted,
                                      ),
                                    ),
                                  ),
                                  AnimatedRotation(
                                    turns: _isExpanded ? 0.5 : 0,
                                    duration: const Duration(milliseconds: 200),
                                    child: const Icon(
                                      Icons.keyboard_arrow_down,
                                      size: 20,
                                      color: muted,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        SizeTransition(
                          sizeFactor: _expandAnimation,
                          child: _buildTracesTimeline(),
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTracesTimeline() {
    final summary = widget.summary;
    if (summary == null) return const SizedBox.shrink();

    final traces = summary.traces;

    return Container(
      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 8),
          ...List.generate(traces.length, (index) {
            final trace = traces[index];
            final isLast = index == traces.length - 1;
            return _buildTraceStep(trace, isLast, index);
          }),
        ],
      ),
    );
  }

  Widget _buildTraceStep(AgentTraceItem trace, bool isLast, int index) {
    final isAnalysis = trace.agentName == 'AnalysisLLM';
    final question = trace.question;
    final answer = trace.answer;

    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Timeline connector
          SizedBox(
            width: 32,
            child: Column(
              children: [
                Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    color: _getTraceColor(trace).withOpacity(0.15),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: Text(
                      trace.roleIcon,
                      style: const TextStyle(fontSize: 12),
                    ),
                  ),
                ),
                if (!isLast)
                  Expanded(
                    child: Container(
                      width: 1.5,
                      margin: const EdgeInsets.symmetric(vertical: 4),
                      color: widget.isDark
                          ? Colors.white.withOpacity(0.1)
                          : Colors.black.withOpacity(0.08),
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(width: 10),
          // Content
          Expanded(
            child: Container(
              margin: EdgeInsets.only(bottom: isLast ? 0 : 12),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: widget.isDark
                    ? Colors.white.withOpacity(0.04)
                    : Colors.black.withOpacity(0.02),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: widget.isDark
                      ? Colors.white.withOpacity(0.06)
                      : Colors.black.withOpacity(0.05),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Agent name and step number
                  Row(
                    children: [
                      Text(
                        trace.displayName,
                        style: DesignSystem.captionSmall.copyWith(
                          color: _getTraceColor(trace),
                          fontWeight: FontWeight.w700,
                          letterSpacing: 0.3,
                        ),
                      ),
                      const Spacer(),
                      Text(
                        'ステップ ${index + 1}',
                        style: TextStyle(
                          color:
                              widget.isDark ? Colors.white24 : Colors.black26,
                          fontSize: 10,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  // Content: Q&A format for analysis, plain for others
                  if (isAnalysis && question != null) ...[
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Q ',
                          style: DesignSystem.bodySmall.copyWith(
                            color: widget.isDark
                                ? Colors.white
                                : const Color(0xFF1C1C1E),
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        Expanded(
                          child: Text(
                            question,
                            style: DesignSystem.bodySmall.copyWith(
                              color: widget.isDark
                                  ? Colors.white.withOpacity(0.85)
                                  : Colors.black87,
                              fontWeight: FontWeight.w500,
                              height: 1.4,
                            ),
                          ),
                        ),
                      ],
                    ),
                    if (answer != null) ...[
                      const SizedBox(height: 6),
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'A ',
                            style: DesignSystem.bodySmall.copyWith(
                              color: DesignSystem.success,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          Expanded(
                            child: Text(
                              answer,
                              style: DesignSystem.bodySmall.copyWith(
                                color: widget.isDark
                                    ? Colors.white70
                                    : Colors.black54,
                                height: 1.4,
                              ),
                              maxLines: 4,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ] else
                    Text(
                      trace.content,
                      style: DesignSystem.bodySmall.copyWith(
                        color: widget.isDark ? Colors.white70 : Colors.black54,
                        height: 1.4,
                      ),
                      maxLines: 3,
                      overflow: TextOverflow.ellipsis,
                    ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Color _getTraceColor(AgentTraceItem trace) {
    final ink = widget.isDark ? Colors.white70 : const Color(0xFF3A3A3C);
    switch (trace.agentName) {
      case 'CriticLLM':
        return const Color(0xFF34C759);
      default:
        return ink;
    }
  }
}

class _InsightWaveform extends StatelessWidget {
  const _InsightWaveform({required this.color});

  final Color color;

  static const _heights = <double>[
    0.22,
    0.28,
    0.24,
    0.36,
    0.48,
    0.34,
    0.58,
    0.78,
    0.52,
    0.44,
    0.70,
    0.96,
    0.62,
    0.50,
    0.38,
    0.32,
    0.42,
    0.60,
    0.48,
    0.36,
    0.46,
    0.54,
    0.40,
    0.32,
    0.38,
    0.30,
    0.26,
    0.28,
    0.24,
    0.22,
  ];

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        for (var i = 0; i < _heights.length; i++) ...[
          if (i > 0) const SizedBox(width: 4),
          Expanded(
            child: Align(
              child: Container(
                height: 12 + 52 * _heights[i],
                decoration: BoxDecoration(
                  color: color,
                  borderRadius: BorderRadius.circular(99),
                ),
              ),
            ),
          ),
        ],
      ],
    );
  }
}

class _ContourField extends StatelessWidget {
  const _ContourField();

  @override
  Widget build(BuildContext context) {
    return const CustomPaint(painter: _ContourPainter(), size: Size.infinite);
  }
}

class _ContourPainter extends CustomPainter {
  const _ContourPainter();

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1
      ..color = const Color(0x33FFFFFF);
    for (var k = 0; k < 9; k++) {
      final path = Path();
      final y0 = size.height * (0.08 + k * 0.11);
      path.moveTo(0, y0);
      for (var x = 0.0; x <= size.width; x += 8) {
        final y = y0 +
            18 * math.sin((x / size.width) * math.pi * 2 + k * 0.7) +
            10 * math.sin((x / size.width) * math.pi * 5 + k);
        path.lineTo(x, y);
      }
      canvas.drawPath(path, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _GlassShadowPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final rrect = RRect.fromRectAndRadius(
      Rect.fromLTWH(4, 10, size.width - 8, size.height - 12),
      const Radius.circular(32),
    );
    canvas.drawRRect(
      rrect,
      Paint()
        ..color = const Color(0x33000000)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 18),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// Beautiful calendar button that shows the selected date
class _CalendarButton extends StatelessWidget {
  const _CalendarButton({
    required this.isDark,
    required this.selectedDate,
    required this.onTap,
  });

  final bool isDark;
  final DateTime selectedDate;
  final VoidCallback onTap;

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final yesterday = DateTime(now.year, now.month, now.day - 1);
    final dateToCompare = DateTime(date.year, date.month, date.day);

    if (dateToCompare == today) {
      return DemoJa.today;
    } else if (dateToCompare == yesterday) {
      return DemoJa.yesterday;
    } else {
      return DateFormat('M月d日').format(date);
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              isDark
                  ? Colors.white.withOpacity(0.12)
                  : Colors.black.withOpacity(0.06),
              isDark
                  ? Colors.white.withOpacity(0.06)
                  : Colors.black.withOpacity(0.03),
            ],
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isDark
                ? Colors.white.withOpacity(0.15)
                : Colors.black.withOpacity(0.08),
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.calendar_today_rounded,
              size: 16,
              color: DesignSystem.primaryCyan,
            ),
            const SizedBox(width: 8),
            Text(
              _formatDate(selectedDate),
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: isDark ? Colors.white : Colors.black,
              ),
            ),
            const SizedBox(width: 4),
            Icon(
              Icons.keyboard_arrow_down_rounded,
              size: 18,
              color: isDark ? Colors.white54 : Colors.black45,
            ),
          ],
        ),
      ),
    );
  }
}
