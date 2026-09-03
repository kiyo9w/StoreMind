import 'package:flutter/material.dart';

/// Smooth animated text view with cursor effect for streaming content
class StreamingTextView extends StatefulWidget {
  final String text;
  final bool isStreaming;
  final TextStyle? style;
  final TextAlign textAlign;
  final int? maxLines;
  final TextOverflow overflow;

  const StreamingTextView({
    super.key,
    required this.text,
    this.isStreaming = false,
    this.style,
    this.textAlign = TextAlign.start,
    this.maxLines,
    this.overflow = TextOverflow.clip,
  });

  @override
  State<StreamingTextView> createState() => _StreamingTextViewState();
}

class _StreamingTextViewState extends State<StreamingTextView>
    with SingleTickerProviderStateMixin {
  late AnimationController _cursorController;
  late Animation<double> _cursorAnimation;

  @override
  void initState() {
    super.initState();
    _cursorController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _cursorAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _cursorController, curve: Curves.easeInOut),
    );
    _cursorController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _cursorController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final defaultStyle = widget.style ??
        TextStyle(
          fontSize: 15,
          height: 1.6,
          color: isDark ? Colors.white.withOpacity(0.9) : Colors.black87,
        );

    if (!widget.isStreaming || widget.text.isEmpty) {
      return SelectableText(
        widget.text,
        style: defaultStyle,
        textAlign: widget.textAlign,
        maxLines: widget.maxLines,
      );
    }

    // Streaming mode: add blinking cursor at end
    return RichText(
      textAlign: widget.textAlign,
      maxLines: widget.maxLines,
      overflow: widget.overflow,
      text: TextSpan(
        children: [
          TextSpan(
            text: widget.text,
            style: defaultStyle,
          ),
          WidgetSpan(
            alignment: PlaceholderAlignment.middle,
            child: AnimatedBuilder(
              animation: _cursorAnimation,
              builder: (context, child) => Opacity(
                opacity: _cursorAnimation.value,
                child: Container(
                  width: 2,
                  height: (defaultStyle.fontSize ?? 15) * 1.2,
                  margin: const EdgeInsets.only(left: 1),
                  decoration: BoxDecoration(
                    color: isDark
                        ? const Color(0xFF8B5CF6)
                        : const Color(0xFF6366F1),
                    borderRadius: BorderRadius.circular(1),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Markdown-aware streaming text that properly renders as content streams
class StreamingMarkdownText extends StatelessWidget {
  final String text;
  final bool isStreaming;
  final TextStyle? style;

  const StreamingMarkdownText({
    super.key,
    required this.text,
    this.isStreaming = false,
    this.style,
  });

  @override
  Widget build(BuildContext context) {
    // For MVP, just use regular text with streaming indicator
    // Could integrate flutter_markdown here for rich rendering
    return StreamingTextView(
      text: text,
      isStreaming: isStreaming,
      style: style,
    );
  }
}
