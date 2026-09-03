import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:math' as math;

/// Agent colors for visual identification - StoreMind brand colors
class AgentColors {
  static const orchestrator = Color(0xFF8B5CF6); // Purple - Coordinator
  static const stocker = Color(0xFF10B981); // Emerald - Inventory specialist
  static const planner = Color(0xFF3B82F6); // Blue - Planning specialist
  static const reviser = Color(0xFFF59E0B); // Amber - Review specialist
  static const system = Color(0xFF6B7280); // Gray - System messages
  static const unknown = Color(0xFF94A3B8); // Slate - Unknown agents

  static Color forAgent(String? agentName) {
    switch (agentName?.toLowerCase()) {
      case 'orchestrator':
        return orchestrator;
      case 'stocker':
        return stocker;
      case 'planner':
        return planner;
      case 'reviser':
        return reviser;
      case 'system':
        return system;
      default:
        return unknown;
    }
  }

  static IconData iconForAgent(String? agentName) {
    switch (agentName?.toLowerCase()) {
      case 'orchestrator':
        return Icons.hub_outlined;
      case 'stocker':
        return Icons.inventory_2_outlined;
      case 'planner':
        return Icons.calendar_today_outlined;
      case 'reviser':
        return Icons.rate_review_outlined;
      case 'system':
        return Icons.settings_outlined;
      default:
        return Icons.smart_toy_outlined;
    }
  }

  /// Get a human-friendly description for each agent
  static String descriptionForAgent(String? agentName) {
    switch (agentName?.toLowerCase()) {
      case 'orchestrator':
        return 'エージェントを調整中';
      case 'stocker':
        return '在庫を確認中';
      case 'planner':
        return '計画を更新中';
      case 'reviser':
        return '回答を確認中';
      case 'system':
        return '処理中';
      default:
        return '作業中';
    }
  }
}

/// Beautiful animated indicator showing agent activity during streaming
class AgentActivityIndicator extends StatefulWidget {
  final String? agentName;
  final String? role;
  final bool isThinking;
  final bool isToolRunning;
  final String? toolName;
  final String? thinkingPreview;
  final bool showCompact;

  const AgentActivityIndicator({
    super.key,
    this.agentName,
    this.role,
    this.isThinking = false,
    this.isToolRunning = false,
    this.toolName,
    this.thinkingPreview,
    this.showCompact = false,
  });

  @override
  State<AgentActivityIndicator> createState() => _AgentActivityIndicatorState();
}

class _AgentActivityIndicatorState extends State<AgentActivityIndicator>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late AnimationController _rotateController;
  late AnimationController _shimmerController;
  late Animation<double> _pulseAnimation;
  late Animation<double> _rotateAnimation;
  late Animation<double> _shimmerAnimation;

  @override
  void initState() {
    super.initState();

    // Pulse animation for thinking state
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(begin: 0.97, end: 1.03).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
    _pulseController.repeat(reverse: true);

    // Rotation animation for tool running state
    _rotateController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _rotateAnimation = Tween<double>(begin: 0, end: 2 * math.pi).animate(
      CurvedAnimation(parent: _rotateController, curve: Curves.linear),
    );

    // Shimmer animation for glow effect
    _shimmerController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    _shimmerAnimation = Tween<double>(begin: 0.3, end: 0.6).animate(
      CurvedAnimation(parent: _shimmerController, curve: Curves.easeInOut),
    );
    _shimmerController.repeat(reverse: true);
  }

  @override
  void didUpdateWidget(AgentActivityIndicator oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isToolRunning && !_rotateController.isAnimating) {
      _rotateController.repeat();
    } else if (!widget.isToolRunning && _rotateController.isAnimating) {
      _rotateController.stop();
    }
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _rotateController.dispose();
    _shimmerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.agentName == null && !widget.isToolRunning) {
      return const SizedBox.shrink();
    }

    final isDark = Theme.of(context).brightness == Brightness.dark;
    final agentColor = AgentColors.forAgent(widget.agentName);

    if (widget.showCompact) {
      return _buildCompactIndicator(isDark, agentColor);
    }

    return _buildFullIndicator(isDark, agentColor);
  }

  Widget _buildCompactIndicator(bool isDark, Color agentColor) {
    return AnimatedBuilder(
      animation: _pulseAnimation,
      builder: (context, child) => Transform.scale(
        scale: widget.isThinking ? _pulseAnimation.value : 1.0,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                agentColor.withOpacity(isDark ? 0.2 : 0.1),
                agentColor.withOpacity(isDark ? 0.1 : 0.05),
              ],
            ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: agentColor.withOpacity(0.25),
              width: 1,
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (widget.isToolRunning)
                AnimatedBuilder(
                  animation: _rotateAnimation,
                  builder: (context, child) => Transform.rotate(
                    angle: _rotateAnimation.value,
                    child: Icon(
                      Icons.settings_rounded,
                      size: 16,
                      color: agentColor,
                    ),
                  ),
                )
              else
                Icon(
                  AgentColors.iconForAgent(widget.agentName),
                  size: 16,
                  color: agentColor,
                ),
              const SizedBox(width: 8),
              Text(
                widget.isToolRunning
                    ? _formatToolName(widget.toolName)
                    : widget.agentName ?? 'Agent',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: agentColor,
                ),
              ),
              const SizedBox(width: 6),
              SizedBox(
                width: 20,
                height: 8,
                child: _AnimatedDots(color: agentColor),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFullIndicator(bool isDark, Color agentColor) {
    final description = widget.isToolRunning
        ? '${_formatToolName(widget.toolName)} を使用中'
        : AgentColors.descriptionForAgent(widget.agentName);

    return AnimatedBuilder(
      animation: Listenable.merge([_pulseAnimation, _shimmerAnimation]),
      builder: (context, child) => Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          // Modern glassmorphism with gradient
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              isDark
                  ? Colors.white.withOpacity(0.08)
                  : Colors.white.withOpacity(0.95),
              isDark
                  ? agentColor.withOpacity(0.05)
                  : agentColor.withOpacity(0.03),
            ],
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isDark
                ? agentColor.withOpacity(_shimmerAnimation.value * 0.5)
                : agentColor.withOpacity(0.15),
            width: 1.5,
          ),
          boxShadow: [
            BoxShadow(
              color: agentColor.withOpacity(
                  widget.isThinking ? _shimmerAnimation.value : 0.1),
              blurRadius: widget.isThinking ? 20 : 8,
              spreadRadius: -4,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            // Agent avatar with pulse and glow effect
            Transform.scale(
              scale: widget.isThinking ? _pulseAnimation.value : 1.0,
              child: Container(
                width: 44,
                height: 44,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      agentColor,
                      agentColor.withOpacity(0.8),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(14),
                  boxShadow: [
                    BoxShadow(
                      color: agentColor.withOpacity(
                          widget.isThinking ? _shimmerAnimation.value : 0.25),
                      blurRadius: widget.isThinking ? 16 : 8,
                      spreadRadius: -2,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: widget.isToolRunning
                    ? AnimatedBuilder(
                        animation: _rotateAnimation,
                        builder: (context, child) => Transform.rotate(
                          angle: _rotateAnimation.value,
                          child: const Icon(
                            Icons.settings_rounded,
                            size: 22,
                            color: Colors.white,
                          ),
                        ),
                      )
                    : Icon(
                        AgentColors.iconForAgent(widget.agentName),
                        size: 22,
                        color: Colors.white,
                      ),
              ),
            ),
            const SizedBox(width: 14),

            // Agent info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    children: [
                      Flexible(
                        child: Text(
                          widget.agentName ?? 'Agent',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            color: isDark ? Colors.white : Colors.black87,
                            letterSpacing: -0.3,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      if (widget.role != null) ...[
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 3,
                          ),
                          decoration: BoxDecoration(
                            color: agentColor.withOpacity(0.12),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            widget.role!,
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: agentColor,
                              letterSpacing: 0.2,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      SizedBox(
                        width: 24,
                        height: 10,
                        child: _AnimatedDots(color: agentColor),
                      ),
                      const SizedBox(width: 8),
                      Flexible(
                        child: Text(
                          description,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                            color: isDark ? Colors.white54 : Colors.black45,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  // Thinking preview
                  if (widget.thinkingPreview != null &&
                      widget.thinkingPreview!.isNotEmpty) ...[
                    const SizedBox(height: 10),
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: isDark
                            ? Colors.white.withOpacity(0.05)
                            : Colors.black.withOpacity(0.03),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: isDark
                              ? Colors.white.withOpacity(0.08)
                              : Colors.black.withOpacity(0.05),
                        ),
                      ),
                      child: Text(
                        widget.thinkingPreview!.length > 120
                            ? '${widget.thinkingPreview!.substring(0, 120)}...'
                            : widget.thinkingPreview!,
                        maxLines: 3,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontSize: 11,
                          fontStyle: FontStyle.italic,
                          color: isDark ? Colors.white38 : Colors.black38,
                          height: 1.4,
                        ),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _formatToolName(String? toolName) {
    if (toolName == null) return 'tool';
    // Convert snake_case to Title Case
    return toolName
        .split('_')
        .map((word) => word.isNotEmpty
            ? '${word[0].toUpperCase()}${word.substring(1).toLowerCase()}'
            : '')
        .join(' ');
  }
}

/// Smooth animated dots indicator
class _AnimatedDots extends StatefulWidget {
  final Color color;

  const _AnimatedDots({required this.color});

  @override
  State<_AnimatedDots> createState() => _AnimatedDotsState();
}

class _AnimatedDotsState extends State<_AnimatedDots>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: List.generate(3, (index) {
            final delay = index * 0.2;
            final progress = (_controller.value + delay) % 1.0;
            final scale = 0.5 + 0.5 * math.sin(progress * math.pi);
            return Transform.scale(
              scale: scale,
              child: Container(
                width: 5,
                height: 5,
                decoration: BoxDecoration(
                  color: widget.color.withOpacity(0.5 + 0.5 * scale),
                  shape: BoxShape.circle,
                ),
              ),
            );
          }),
        );
      },
    );
  }
}

/// Beautiful card for displaying tool calls during streaming
class ToolCallCard extends StatefulWidget {
  final String toolName;
  final String? agentName;
  final String? arguments;
  final String? result;
  final bool isRunning;

  const ToolCallCard({
    super.key,
    required this.toolName,
    this.agentName,
    this.arguments,
    this.result,
    this.isRunning = true,
  });

  @override
  State<ToolCallCard> createState() => _ToolCallCardState();
}

class _ToolCallCardState extends State<ToolCallCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  bool _isExpanded = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    if (widget.isRunning) {
      _controller.repeat();
    }
  }

  @override
  void didUpdateWidget(ToolCallCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isRunning && !_controller.isAnimating) {
      _controller.repeat();
    } else if (!widget.isRunning && _controller.isAnimating) {
      _controller.stop();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  String _formatToolName(String name) {
    return name
        .split('_')
        .map((word) => word.isNotEmpty
            ? '${word[0].toUpperCase()}${word.substring(1).toLowerCase()}'
            : '')
        .join(' ');
  }

  IconData _getToolIcon(String toolName) {
    final lower = toolName.toLowerCase();
    if (lower.contains('inventory') || lower.contains('stock')) {
      return Icons.inventory_2_outlined;
    } else if (lower.contains('weather')) {
      return Icons.cloud_outlined;
    } else if (lower.contains('search')) {
      return Icons.search;
    } else if (lower.contains('plan')) {
      return Icons.calendar_today_outlined;
    } else if (lower.contains('price')) {
      return Icons.attach_money;
    } else {
      return Icons.build_outlined;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final agentColor = AgentColors.forAgent(widget.agentName);
    final toolIcon = _getToolIcon(widget.toolName);

    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final progress = _controller.value;
        final borderOpacity = widget.isRunning
            ? 0.3 + 0.2 * math.sin(progress * 2 * math.pi)
            : 0.2;

        return GestureDetector(
          onTap: () {
            HapticFeedback.lightImpact();
            setState(() => _isExpanded = !_isExpanded);
          },
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            margin: const EdgeInsets.only(bottom: 8),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  isDark ? const Color(0xFF1E293B) : const Color(0xFFF8FAFC),
                  isDark ? const Color(0xFF0F172A) : const Color(0xFFF1F5F9),
                ],
              ),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(
                color: widget.isRunning
                    ? agentColor.withOpacity(borderOpacity)
                    : (widget.result != null
                        ? const Color(0xFF10B981).withOpacity(0.3)
                        : Colors.grey.withOpacity(0.2)),
                width: 1.5,
              ),
              boxShadow: [
                if (widget.isRunning)
                  BoxShadow(
                    color: agentColor.withOpacity(0.15),
                    blurRadius: 12,
                    spreadRadius: -4,
                  ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    // Tool icon with rotation when running
                    Container(
                      width: 32,
                      height: 32,
                      decoration: BoxDecoration(
                        color: widget.isRunning
                            ? agentColor.withOpacity(0.15)
                            : (widget.result != null
                                ? const Color(0xFF10B981).withOpacity(0.15)
                                : Colors.grey.withOpacity(0.15)),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: widget.isRunning
                          ? Transform.rotate(
                              angle: progress * 2 * math.pi,
                              child: Icon(
                                Icons.settings_rounded,
                                size: 18,
                                color: agentColor,
                              ),
                            )
                          : Icon(
                              widget.result != null
                                  ? Icons.check_circle_outline_rounded
                                  : toolIcon,
                              size: 18,
                              color: widget.result != null
                                  ? const Color(0xFF10B981)
                                  : Colors.grey,
                            ),
                    ),
                    const SizedBox(width: 10),
                    // Tool name and status
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            _formatToolName(widget.toolName),
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w600,
                              color: isDark ? Colors.white : Colors.black87,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Row(
                            children: [
                              if (widget.agentName != null) ...[
                                Text(
                                  widget.agentName!,
                                  style: TextStyle(
                                    fontSize: 11,
                                    color: agentColor,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                                Text(
                                  ' • ',
                                  style: TextStyle(
                                    fontSize: 11,
                                    color: isDark
                                        ? Colors.white38
                                        : Colors.black38,
                                  ),
                                ),
                              ],
                              Text(
                                widget.isRunning
                                    ? 'Running...'
                                    : (widget.result != null
                                        ? 'Completed'
                                        : 'Pending'),
                                style: TextStyle(
                                  fontSize: 11,
                                  color: widget.isRunning
                                      ? agentColor
                                      : (widget.result != null
                                          ? const Color(0xFF10B981)
                                          : Colors.grey),
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    // Expand/collapse indicator
                    if (widget.arguments != null || widget.result != null)
                      Icon(
                        _isExpanded
                            ? Icons.keyboard_arrow_up_rounded
                            : Icons.keyboard_arrow_down_rounded,
                        size: 20,
                        color: isDark ? Colors.white38 : Colors.black38,
                      ),
                  ],
                ),
                // Expanded content
                if (_isExpanded) ...[
                  if (widget.arguments != null) ...[
                    const SizedBox(height: 10),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: isDark
                            ? Colors.black.withOpacity(0.3)
                            : Colors.grey.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Arguments',
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: isDark ? Colors.white54 : Colors.black54,
                              letterSpacing: 0.5,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            widget.arguments!,
                            style: TextStyle(
                              fontSize: 11,
                              fontFamily: 'monospace',
                              color: isDark ? Colors.white70 : Colors.black87,
                            ),
                            maxLines: 5,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                  ],
                  if (widget.result != null) ...[
                    const SizedBox(height: 8),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: const Color(0xFF10B981).withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: const Color(0xFF10B981).withOpacity(0.2),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              const Icon(
                                Icons.check_circle_outline_rounded,
                                size: 12,
                                color: Color(0xFF10B981),
                              ),
                              const SizedBox(width: 4),
                              Text(
                                'Result',
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w600,
                                  color: const Color(0xFF10B981),
                                  letterSpacing: 0.5,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Text(
                            widget.result!,
                            style: TextStyle(
                              fontSize: 11,
                              color: isDark ? Colors.white70 : Colors.black87,
                            ),
                            maxLines: 8,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                  ],
                ],
              ],
            ),
          ),
        );
      },
    );
  }
}

/// Plan update notification badge
class PlanUpdateBadge extends StatelessWidget {
  final String? actionModified;
  final VoidCallback? onTap;

  const PlanUpdateBadge({
    super.key,
    this.actionModified,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: () {
        HapticFeedback.mediumImpact();
        onTap?.call();
      },
      child: Container(
        margin: const EdgeInsets.only(top: 12, bottom: 8),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              const Color(0xFF3B82F6).withOpacity(0.15),
              const Color(0xFF8B5CF6).withOpacity(0.15),
            ],
          ),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: const Color(0xFF3B82F6).withOpacity(0.3),
            width: 1,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF3B82F6), Color(0xFF8B5CF6)],
                ),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(
                Icons.calendar_today_rounded,
                size: 14,
                color: Colors.white,
              ),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Plan Updated',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: isDark ? Colors.white : Colors.black87,
                  ),
                ),
                if (actionModified != null) ...[
                  const SizedBox(height: 2),
                  Text(
                    'Action: $actionModified',
                    style: TextStyle(
                      fontSize: 11,
                      color: isDark ? Colors.white54 : Colors.black54,
                    ),
                  ),
                ],
              ],
            ),
            const SizedBox(width: 8),
            Icon(
              Icons.arrow_forward_ios_rounded,
              size: 12,
              color: isDark ? Colors.white38 : Colors.black38,
            ),
          ],
        ),
      ),
    );
  }
}

/// Typing dots animation widget
class TypingDotsIndicator extends StatefulWidget {
  final Color color;
  final double size;

  const TypingDotsIndicator({
    super.key,
    this.color = const Color(0xFF8B5CF6),
    this.size = 6,
  });

  @override
  State<TypingDotsIndicator> createState() => _TypingDotsIndicatorState();
}

class _TypingDotsIndicatorState extends State<TypingDotsIndicator>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size * 5,
      height: widget.size,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: List.generate(3, (index) {
          return AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              final progress = (_controller.value + index * 0.15) % 1.0;
              final scale = 0.5 + 0.5 * math.sin(progress * math.pi);
              return Transform.scale(
                scale: scale,
                child: Container(
                  width: widget.size,
                  height: widget.size,
                  decoration: BoxDecoration(
                    color: widget.color.withOpacity(0.5 + 0.5 * scale),
                    shape: BoxShape.circle,
                  ),
                ),
              );
            },
          );
        }),
      ),
    );
  }
}
