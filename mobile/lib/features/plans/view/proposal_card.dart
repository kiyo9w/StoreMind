import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:insider/core/design_system/design_system.dart';
import 'package:insider/features/plans/data/mock_plans.dart';

class ProposalCard extends StatefulWidget {
  const ProposalCard({
    super.key,
    required this.item,
    required this.isDark,
    required this.onQuantityChanged,
    required this.onAccept,
    required this.onReject,
    required this.onReset,
  });

  final PlanItem item;
  final bool isDark;
  final ValueChanged<int> onQuantityChanged;
  final VoidCallback onAccept;
  final VoidCallback onReject;
  final VoidCallback onReset;

  @override
  State<ProposalCard> createState() => _ProposalCardState();
}

class _ProposalCardState extends State<ProposalCard>
    with SingleTickerProviderStateMixin {
  bool _isExpanded = false;
  late TextEditingController _quantityController;
  late AnimationController _animationController;
  late Animation<double> _expandAnimation;

  @override
  void initState() {
    super.initState();
    _quantityController =
        TextEditingController(text: widget.item.adjustedQuantity.toString());
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _expandAnimation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    );
  }

  @override
  void didUpdateWidget(ProposalCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.item.adjustedQuantity != widget.item.adjustedQuantity) {
      _quantityController.text = widget.item.adjustedQuantity.toString();
    }
  }

  @override
  void dispose() {
    _quantityController.dispose();
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

  Color _getStatusColor() {
    switch (widget.item.status) {
      case ProposalStatus.approved:
        return DesignSystem.success;
      case ProposalStatus.adjusted:
        return DesignSystem.warning;
      case ProposalStatus.rejected:
        return DesignSystem.error;
      case ProposalStatus.pending:
        return Colors.transparent;
    }
  }

  String _typeEmoji() {
    switch (widget.item.type) {
      case ProposalType.order:
        return '🛒';
      case ProposalType.markdown:
        return '🏷️';
      case ProposalType.restock:
        return '📦';
      case ProposalType.discontinue:
        return '🚫';
    }
  }

  IconData _getTypeIcon() {
    switch (widget.item.type) {
      case ProposalType.order:
        return Icons.shopping_cart_outlined;
      case ProposalType.markdown:
        return Icons.local_offer_outlined;
      case ProposalType.restock:
        return Icons.inventory_2_outlined;
      case ProposalType.discontinue:
        return Icons.remove_shopping_cart_outlined;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isPending = widget.item.status == ProposalStatus.pending;
    final isRejected = widget.item.status == ProposalStatus.rejected;
    final statusColor = _getStatusColor();

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: widget.isDark ? const Color(0xFF0F0F0F) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: statusColor != Colors.transparent
              ? statusColor.withOpacity(widget.isDark ? 0.35 : 0.45)
              : (widget.isDark
                  ? DesignSystem.borderDark.withOpacity(0.6)
                  : DesignSystem.borderLight.withOpacity(0.7)),
          width: 1,
        ),
        boxShadow: widget.isDark
            ? []
            : [
                BoxShadow(
                  color: Colors.black.withOpacity(0.06),
                  blurRadius: 12,
                  offset: const Offset(0, 6),
                ),
              ],
      ),
      child: Stack(
        children: [
          Padding(
            padding: EdgeInsets.fromLTRB(
              16,
              isPending ? 16 : 12,
              40,
              16,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildProductImage(),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.item.title,
                            style: DesignSystem.headingMedium.copyWith(
                              color: widget.isDark
                                  ? DesignSystem.textPrimaryDark
                                  : DesignSystem.textPrimaryLight,
                              fontWeight: FontWeight.w700,
                              fontSize: 22,
                              height: 1.15,
                              decoration: isRejected
                                  ? TextDecoration.lineThrough
                                  : null,
                              decorationColor: DesignSystem.error,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 10),

                          // Quantity decision control — second vertical element,
                          // immediately after identity
                          _buildQuantityControl(isPending),

                          const SizedBox(height: 6),

                          // One secondary caption row: delta + metadata tokens
                          _buildMetaCaption(isPending),
                        ],
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 14),

                // Expand/collapse button for reasoning
                _buildExpandButton(),

                // Expandable reasoning section
                SizeTransition(
                  sizeFactor: _expandAnimation,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 14),
                      _buildReasoningCard(),
                    ],
                  ),
                ),

                const SizedBox(height: 14),

                // Action buttons
                _buildActionButtons(isPending),
              ],
            ),
          ),
          Positioned(
            top: 12,
            right: 14,
            child: Text(
              _typeEmoji(),
              style: const TextStyle(fontSize: 22, height: 1),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProductImage() {
    return Container(
      width: 64,
      height: 64,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: widget.isDark
            ? DesignSystem.backgroundDarkCard
            : DesignSystem.backgroundLightHover,
        border: Border.all(
          color: widget.isDark
              ? DesignSystem.borderDark.withOpacity(0.6)
              : DesignSystem.borderLight.withOpacity(0.8),
          width: 0.5,
        ),
      ),
      clipBehavior: Clip.antiAlias,
      child: widget.item.imageUrl != null
          ? (widget.item.imageUrl!.startsWith('http')
              ? Image.network(
                  widget.item.imageUrl!,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => _buildImageFallback(),
                )
              : Image.asset(
                  widget.item.imageUrl!,
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => _buildImageFallback(),
                ))
          : _buildImageFallback(),
    );
  }

  Widget _buildImageFallback() {
    return Center(
      child: Icon(
        _getTypeIcon(),
        size: 28,
        color: widget.isDark
            ? DesignSystem.primaryCyan.withOpacity(0.6)
            : DesignSystem.primaryCyanDark.withOpacity(0.5),
      ),
    );
  }

  /// One secondary caption row under the quantity control: the delta chip
  /// (when it exists) plus subtitle metadata rendered as compact tokens, or
  /// the raw subtitle verbatim when it is not bullet-delimited. A leading
  /// `Qty:` segment is suppressed since quantity is the dominant control.
  Widget _buildMetaCaption(bool isPending) {
    final delta = widget.item.adjustedQuantity - widget.item.quantity;
    final showDelta = delta != 0 &&
        (isPending || widget.item.status == ProposalStatus.adjusted);

    final raw = widget.item.subtitle;
    final segments =
        raw.split('•').map((s) => s.trim()).where((s) => s.isNotEmpty).toList();

    if (segments.length >= 2) {
      final qtyPattern = RegExp(r'^Qty\s*:', caseSensitive: false);
      final visible =
          qtyPattern.hasMatch(segments.first) ? segments.sublist(1) : segments;

      final children = <Widget>[
        if (showDelta) ...[
          _buildDeltaChip(delta),
          const SizedBox(width: 6),
        ],
        for (final segment in visible) _buildSubtitleToken(segment),
      ];
      if (children.isEmpty) return const SizedBox.shrink();
      return Wrap(spacing: 6, runSpacing: 6, children: children);
    }

    final subtitleColor = widget.isDark
        ? DesignSystem.textSecondaryDark
        : DesignSystem.textSecondaryLight;

    return Row(
      children: [
        if (showDelta) ...[
          _buildDeltaChip(delta),
          const SizedBox(width: 6),
        ],
        Flexible(
          child: Text(
            raw,
            style: DesignSystem.bodySmall.copyWith(
              color: subtitleColor,
              fontSize: 13,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }

  Widget _buildSubtitleToken(String segment) {
    final colon = segment.indexOf(':');
    final hasLabel = colon > 0 && colon < segment.length - 1;
    final label = hasLabel ? segment.substring(0, colon).trim() : null;
    final value = hasLabel ? segment.substring(colon + 1).trim() : segment;

    final labelColor = widget.isDark
        ? DesignSystem.textTertiaryDark
        : DesignSystem.textTertiaryLight;
    final valueColor = widget.isDark
        ? DesignSystem.textPrimaryDark
        : DesignSystem.textPrimaryLight;
    final tokenColor = widget.isDark
        ? DesignSystem.backgroundDarkHover
        : DesignSystem.backgroundLightHover;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: tokenColor,
        borderRadius: BorderRadius.circular(6),
      ),
      child: hasLabel
          ? Text.rich(
              TextSpan(
                text: '$label ',
                style: DesignSystem.captionSmall.copyWith(
                  color: labelColor,
                  fontSize: 11,
                ),
                children: [
                  TextSpan(
                    text: value,
                    style: DesignSystem.captionSmall.copyWith(
                      color: valueColor,
                      fontWeight: FontWeight.w600,
                      fontSize: 11,
                    ),
                  ),
                ],
              ),
            )
          : Text(
              segment,
              style: DesignSystem.captionSmall.copyWith(
                color: valueColor,
                fontWeight: FontWeight.w500,
                fontSize: 11,
              ),
            ),
    );
  }

  Widget _buildQuantityControl(bool isPending) {
    final isRejected = widget.item.status == ProposalStatus.rejected;
    final statusColor = _getStatusColor();

    final valueColor = isPending
        ? (widget.isDark
            ? DesignSystem.textPrimaryDark
            : DesignSystem.textPrimaryLight)
        : statusColor;

    final valueStyle = DesignSystem.displayMedium.copyWith(
      color: valueColor,
      decoration: isRejected ? TextDecoration.lineThrough : null,
      decorationColor: DesignSystem.error,
    );

    final unitStyle = DesignSystem.bodyMedium.copyWith(
      color: widget.isDark
          ? DesignSystem.textSecondaryDark
          : DesignSystem.textSecondaryLight,
      fontWeight: FontWeight.w500,
    );

    if (isPending) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildStepButton(Icons.remove, () => _stepQuantity(-1)),
          const SizedBox(width: 6),
          Flexible(
            child: TextField(
              controller: _quantityController,
              keyboardType: TextInputType.number,
              textAlign: TextAlign.center,
              style: valueStyle,
              decoration: InputDecoration(
                isDense: true,
                contentPadding: EdgeInsets.zero,
                border: InputBorder.none,
                suffixText: widget.item.unit,
                suffixStyle: unitStyle,
              ),
              inputFormatters: [
                FilteringTextInputFormatter.digitsOnly,
              ],
              onChanged: (value) {
                final quantity = int.tryParse(value);
                if (quantity != null && quantity > 0) {
                  widget.onQuantityChanged(quantity);
                }
              },
            ),
          ),
          const SizedBox(width: 6),
          _buildStepButton(Icons.add, () => _stepQuantity(1)),
        ],
      );
    }

    return Text.rich(
      TextSpan(
        text: widget.item.adjustedQuantity.toString(),
        style: valueStyle,
        children: [
          TextSpan(text: ' ${widget.item.unit}', style: unitStyle),
        ],
      ),
    );
  }

  Widget _buildDeltaChip(int delta) {
    final isReduction = delta < 0;
    final color = isReduction ? DesignSystem.success : DesignSystem.warning;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: color.withOpacity(0.3), width: 0.5),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            isReduction ? Icons.arrow_downward : Icons.arrow_upward,
            size: 10,
            color: color,
          ),
          const SizedBox(width: 2),
          Text(
            '${isReduction ? '' : '+'}$delta',
            style: DesignSystem.captionSmall.copyWith(
              color: color,
              fontWeight: FontWeight.w700,
              fontSize: 10,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStepButton(IconData icon, VoidCallback onTap) {
    final iconColor = widget.isDark
        ? DesignSystem.textPrimaryDark
        : DesignSystem.textPrimaryLight;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            color:
                widget.isDark ? DesignSystem.backgroundDarkHover : Colors.white,
            borderRadius: BorderRadius.circular(10),
            border: Border.all(
              color: widget.isDark
                  ? DesignSystem.borderDark.withOpacity(0.6)
                  : DesignSystem.borderLight,
              width: 0.5,
            ),
          ),
          child: Icon(icon, size: 18, color: iconColor),
        ),
      ),
    );
  }

  void _stepQuantity(int step) {
    final current =
        int.tryParse(_quantityController.text) ?? widget.item.adjustedQuantity;
    final next = current + step;
    if (next < 1) return;
    HapticFeedback.selectionClick();
    _quantityController.text = next.toString();
    widget.onQuantityChanged(next);
  }

  Widget _buildExpandButton() {
    final textColor = widget.isDark
        ? DesignSystem.textSecondaryDark
        : DesignSystem.textSecondaryLight;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: _toggleExpand,
        borderRadius: BorderRadius.circular(8),
        child: ConstrainedBox(
          constraints: const BoxConstraints(minHeight: 44),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                AnimatedRotation(
                  turns: _isExpanded ? 0 : -0.25,
                  duration: const Duration(milliseconds: 200),
                  child: Icon(
                    Icons.keyboard_arrow_down,
                    size: 20,
                    color: textColor,
                  ),
                ),
                const SizedBox(width: 6),
                Text(
                  _isExpanded ? 'Hide reasoning' : 'View reasoning',
                  style: DesignSystem.bodySmall.copyWith(
                    color: textColor,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildReasoningCard() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: widget.isDark
            ? DesignSystem.backgroundDarkCard
            : DesignSystem.backgroundLightHover,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Risk flags at the top if present
          if (widget.item.riskFlags.isNotEmpty) ...[
            Wrap(
              spacing: 6,
              runSpacing: 4,
              children: widget.item.riskFlags
                  .map((flag) => _buildRiskFlag(flag))
                  .toList(),
            ),
            const SizedBox(height: 10),
          ],
          Text(
            'REASONING',
            style: DesignSystem.captionSmall.copyWith(
              color: widget.isDark
                  ? DesignSystem.textTertiaryDark
                  : DesignSystem.textTertiaryLight,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.8,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            widget.item.reasoning,
            style: DesignSystem.bodySmall.copyWith(
              color: widget.isDark
                  ? DesignSystem.textPrimaryDark
                  : DesignSystem.textPrimaryLight,
              height: 1.5,
            ),
          ),
          if (widget.item.structuredEvidence.isNotEmpty) ...[
            const SizedBox(height: 12),
            Text(
              'EVIDENCE',
              style: DesignSystem.captionSmall.copyWith(
                color: widget.isDark
                    ? DesignSystem.textTertiaryDark
                    : DesignSystem.textTertiaryLight,
                fontWeight: FontWeight.w600,
                letterSpacing: 0.8,
              ),
            ),
            const SizedBox(height: 6),
            ...widget.item.structuredEvidence
                .map((e) => _buildStructuredEvidenceRow(e)),
          ] else if (widget.item.evidence.isNotEmpty) ...[
            const SizedBox(height: 12),
            Text(
              'EVIDENCE',
              style: DesignSystem.captionSmall.copyWith(
                color: widget.isDark
                    ? DesignSystem.textTertiaryDark
                    : DesignSystem.textTertiaryLight,
                fontWeight: FontWeight.w600,
                letterSpacing: 0.8,
              ),
            ),
            const SizedBox(height: 6),
            Wrap(
              spacing: 6,
              runSpacing: 6,
              children: widget.item.evidence
                  .map((e) => _buildEvidencePill(e))
                  .toList(),
            ),
          ],
          // Confidence + Margin chips, wrapping on narrow screens
          if (widget.item.confidence > 0 ||
              widget.item.marginDelta != null) ...[
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 6,
              children: [
                if (widget.item.confidence > 0)
                  _buildConfidenceMeter(widget.item.confidence),
                if (widget.item.marginDelta != null)
                  _buildMarginChip(widget.item.marginDelta!),
              ],
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildRiskFlag(String flag) {
    final label = flag.replaceAll('_', ' ').toUpperCase();
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: DesignSystem.error.withOpacity(0.12),
        borderRadius: BorderRadius.circular(6),
        border: Border.all(
          color: DesignSystem.error.withOpacity(0.3),
          width: 0.5,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.warning_amber_rounded,
            size: 12,
            color: DesignSystem.error,
          ),
          const SizedBox(width: 4),
          Text(
            label,
            style: DesignSystem.captionSmall.copyWith(
              color: DesignSystem.error,
              fontWeight: FontWeight.w700,
              fontSize: 10,
              letterSpacing: 0.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStructuredEvidenceRow(EvidenceItem evidence) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            evidence.sourceIcon,
            style: const TextStyle(fontSize: 14),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  evidence.source.toUpperCase(),
                  style: DesignSystem.captionSmall.copyWith(
                    color: widget.isDark
                        ? DesignSystem.primaryCyan.withOpacity(0.8)
                        : DesignSystem.primaryCyanDark,
                    fontWeight: FontWeight.w700,
                    fontSize: 10,
                    letterSpacing: 0.5,
                  ),
                ),
                const SizedBox(height: 1),
                Text(
                  evidence.description,
                  style: DesignSystem.captionSmall.copyWith(
                    color: widget.isDark
                        ? DesignSystem.textSecondaryDark
                        : DesignSystem.textSecondaryLight,
                    height: 1.35,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEvidencePill(String evidence) {
    final parts = evidence.split(':');
    final hasDetail = parts.length > 1;
    final title = parts.first.trim();
    final detail = hasDetail ? parts.sublist(1).join(':').trim() : '';

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: widget.isDark
            ? DesignSystem.backgroundDarkHover
            : const Color(0xFFE8E8E8),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            title,
            style: DesignSystem.captionSmall.copyWith(
              color: widget.isDark
                  ? DesignSystem.textPrimaryDark
                  : DesignSystem.textPrimaryLight,
              fontWeight: FontWeight.w600,
            ),
          ),
          if (detail.isNotEmpty) ...[
            const SizedBox(height: 1),
            Text(
              detail,
              style: DesignSystem.captionSmall.copyWith(
                color: widget.isDark
                    ? DesignSystem.textSecondaryDark
                    : DesignSystem.textSecondaryLight,
                fontWeight: FontWeight.w400,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildConfidenceMeter(double confidence) {
    final pct = (confidence * 100).toInt();
    final color = pct >= 80
        ? DesignSystem.success
        : pct >= 60
            ? DesignSystem.warning
            : DesignSystem.error;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withOpacity(0.25), width: 0.5),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: 32,
            height: 4,
            child: ClipRRect(
              borderRadius: BorderRadius.circular(2),
              child: LinearProgressIndicator(
                value: confidence,
                backgroundColor: color.withOpacity(0.2),
                valueColor: AlwaysStoppedAnimation(color),
              ),
            ),
          ),
          const SizedBox(width: 6),
          Text(
            '$pct% confident',
            style: DesignSystem.captionSmall.copyWith(
              color: color,
              fontWeight: FontWeight.w600,
              fontSize: 10,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMarginChip(double marginDelta) {
    final isPositive = marginDelta >= 0;
    final color = isPositive ? DesignSystem.success : DesignSystem.error;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withOpacity(0.25), width: 0.5),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            isPositive ? Icons.trending_up : Icons.trending_down,
            size: 12,
            color: color,
          ),
          const SizedBox(width: 4),
          Text(
            '${isPositive ? '+' : ''}${marginDelta.toStringAsFixed(1)}% margin',
            style: DesignSystem.captionSmall.copyWith(
              color: color,
              fontWeight: FontWeight.w600,
              fontSize: 10,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionButtons(bool isPending) {
    if (!isPending) {
      // Show reset button for already-actioned items
      return Row(
        children: [
          Flexible(child: _buildStatusBadge()),
          const SizedBox(width: 12),
          _ActionButton(
            label: 'Reset',
            icon: Icons.refresh,
            color: widget.isDark
                ? DesignSystem.textSecondaryDark
                : DesignSystem.textSecondaryLight,
            isDark: widget.isDark,
            isOutlined: true,
            onTap: () {
              HapticFeedback.lightImpact();
              widget.onReset();
            },
          ),
        ],
      );
    }

    return Row(
      children: [
        // Reject button
        Expanded(
          child: _ActionButton(
            label: 'Reject',
            icon: Icons.close,
            color: DesignSystem.error,
            isDark: widget.isDark,
            isOutlined: true,
            onTap: () {
              HapticFeedback.mediumImpact();
              widget.onReject();
            },
          ),
        ),
        const SizedBox(width: 12),

        // Accept button — decisively larger
        Expanded(
          flex: 2,
          child: _ActionButton(
            label: widget.item.adjustedQuantity != widget.item.quantity
                ? 'Accept (${widget.item.adjustedQuantity})'
                : 'Accept',
            icon: Icons.check,
            color: widget.isDark ? Colors.white : Colors.black,
            textColor: widget.isDark ? Colors.black : Colors.white,
            isDark: widget.isDark,
            isOutlined: false,
            onTap: () {
              HapticFeedback.mediumImpact();
              widget.onAccept();
            },
          ),
        ),
      ],
    );
  }

  Widget _buildStatusBadge() {
    IconData icon;
    String label;
    Color color;

    switch (widget.item.status) {
      case ProposalStatus.approved:
        icon = Icons.check_circle;
        label = 'Approved';
        color = DesignSystem.success;
        break;
      case ProposalStatus.adjusted:
        icon = Icons.edit;
        label = 'Adjusted to ${widget.item.adjustedQuantity}';
        color = DesignSystem.warning;
        break;
      case ProposalStatus.rejected:
        icon = Icons.cancel;
        label = 'Rejected';
        color = DesignSystem.error;
        break;
      default:
        return const SizedBox.shrink();
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.12),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: color.withOpacity(0.4),
          width: 0.5,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: color),
          const SizedBox(width: 6),
          Flexible(
            child: Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: DesignSystem.bodySmall.copyWith(
                color: color,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  const _ActionButton({
    required this.label,
    required this.icon,
    required this.color,
    this.textColor,
    required this.isDark,
    required this.isOutlined,
    required this.onTap,
  });

  final String label;
  final IconData icon;
  final Color color;
  final Color? textColor;
  final bool isDark;
  final bool isOutlined;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final borderRadius = BorderRadius.circular(12);
    return Material(
      color: Colors.transparent,
      borderRadius: borderRadius,
      child: InkWell(
        onTap: onTap,
        borderRadius: borderRadius,
        child: ConstrainedBox(
          constraints: const BoxConstraints(minHeight: 44),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: isOutlined ? Colors.transparent : color,
              borderRadius: borderRadius,
              border: Border.all(
                color: isOutlined ? color.withOpacity(0.7) : Colors.transparent,
                width: 1.2,
              ),
              boxShadow: isOutlined
                  ? null
                  : [
                      BoxShadow(
                        color: color.withOpacity(0.25),
                        blurRadius: 12,
                        offset: const Offset(0, 6),
                      ),
                    ],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  icon,
                  size: 20,
                  color: isOutlined ? color : (textColor ?? Colors.white),
                ),
                const SizedBox(width: 6),
                Flexible(
                  child: Text(
                    label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: DesignSystem.bodyMedium.copyWith(
                      color: isOutlined ? color : (textColor ?? Colors.white),
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
