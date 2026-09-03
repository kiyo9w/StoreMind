import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:insider/core/design_system/design_system.dart';
import 'package:insider/generated/assets.gen.dart';
import 'package:insider/features/chat/data/source_service.dart';
import 'package:insider/features/chat/view/widgets/source_selector_sheet.dart';
import 'package:insider/features/chat/data/models/chat_models.dart';

/// Chat View - Reusable component for the main chat interface
class ChatView extends StatefulWidget {
  const ChatView({
    super.key,
    required this.onSend,
    this.chatMode = ChatMode.simpleQa,
    this.onModeChanged,
  });

  final Function(String, ChatMode) onSend;
  final ChatMode chatMode;
  final Function(ChatMode)? onModeChanged;

  @override
  State<ChatView> createState() => _ChatViewState();
}

class _ChatViewState extends State<ChatView> {
  final TextEditingController _inputController = TextEditingController();
  final FocusNode _inputFocusNode = FocusNode();
  bool _isInputFocused = false;
  bool _showDemoBanner = true;

  late ChatMode _chatMode;
  final SourceService _sourceService = SourceService.instance;

  @override
  void initState() {
    super.initState();
    _chatMode = widget.chatMode;
    _inputFocusNode.addListener(_onFocusChange);
    _showDemoBanner = true;

    // Reset sources to default for a fresh chat session
    _sourceService.reset();

    _inputController.addListener(() {
      setState(() {});
    });

    _sourceService.ensureRemoteResourcesLoaded().then((_) {
      if (mounted) setState(() {});
    });
  }

  @override
  void didUpdateWidget(covariant ChatView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.chatMode != widget.chatMode) {
      setState(() {
        _chatMode = widget.chatMode;
      });
    }
  }

  void _onFocusChange() {
    setState(() {
      _isInputFocused = _inputFocusNode.hasFocus;
    });
  }

  @override
  void dispose() {
    _inputController.dispose();
    _inputFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        Expanded(
          child: Stack(
            children: [
              _buildChatContent(context, isDark),
              if (_showDemoBanner)
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: _buildDemoBanner(context, isDark),
                ),
              Positioned(
                left: 0,
                right: 0,
                bottom: 0,
                child: _buildInputArea(context, isDark),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildChatContent(BuildContext context, bool isDark) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Spacer(flex: 2),
          (isDark ? Assets.images.darkVe : Assets.images.lightVe).image(
            width: 200,
            height: 60,
            fit: BoxFit.contain,
          ),
          const Spacer(flex: 3),
        ],
      ),
    );
  }

  Widget _buildInputArea(BuildContext context, bool isDark) {
    final hasText = _inputController.text.trim().isNotEmpty;

    return Container(
      padding: const EdgeInsets.fromLTRB(
        DesignSystem.spacing16,
        DesignSystem.spacing16,
        DesignSystem.spacing16,
        DesignSystem.spacing20,
      ),
      decoration: BoxDecoration(
        color:
            isDark ? DesignSystem.backgroundDark : DesignSystem.backgroundLight,
      ),
      child: AnimatedContainer(
        duration: DesignSystem.durationNormal,
        curve: Curves.easeOutCubic,
        constraints: const BoxConstraints(
          minHeight: 88,
        ),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF1E1E1E) : const Color(0xFFF5F5F5),
          borderRadius: BorderRadius.circular(32),
          border: Border.all(
            color: _isInputFocused
                ? DesignSystem.primaryCyan.withOpacity(0.5)
                : (isDark ? const Color(0xFF333333) : const Color(0xFFE5E5E5)),
            width: 1.5,
          ),
          boxShadow: _isInputFocused
              ? [
                  BoxShadow(
                    color: DesignSystem.primaryCyan.withOpacity(0.15),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                    spreadRadius: 0,
                  ),
                ]
              : [
                  BoxShadow(
                    color: Colors.black.withOpacity(isDark ? 0.2 : 0.05),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                    spreadRadius: 0,
                  ),
                ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Text input area
            Padding(
              padding: const EdgeInsets.only(
                top: 14,
                left: 16,
                right: 16,
                bottom: 8,
              ),
              child: TextField(
                controller: _inputController,
                focusNode: _inputFocusNode,
                minLines: 1,
                maxLines: 5,
                textCapitalization: TextCapitalization.sentences,
                style: DesignSystem.bodyLarge.copyWith(
                  color: isDark
                      ? DesignSystem.textPrimaryDark
                      : DesignSystem.textPrimaryLight,
                  height: 1.5,
                  fontSize: 18,
                ),
                decoration: InputDecoration(
                  hintText: 'Ask anything...',
                  hintStyle: DesignSystem.bodyLarge.copyWith(
                    color: isDark
                        ? const Color(0xFF666666)
                        : const Color(0xFFAAAAAA),
                    fontSize: 18,
                    height: 1.5,
                    fontWeight: FontWeight.w400,
                  ),
                  filled: true,
                  fillColor: Colors.transparent,
                  border: InputBorder.none,
                  enabledBorder: InputBorder.none,
                  focusedBorder: InputBorder.none,
                  disabledBorder: InputBorder.none,
                  contentPadding: EdgeInsets.zero,
                  isDense: true,
                ),
                onSubmitted: hasText ? (value) => _handleSend() : null,
              ),
            ),
            // Icons row at bottom
            Padding(
              padding: const EdgeInsets.only(
                left: 12,
                right: 12,
                bottom: 12,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  // Left side: Plus and Mode buttons
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // // Plus Button
                      // _buildCircleActionButton(
                      //   icon: Icons.add,
                      //   isDark: isDark,
                      //   onTap: _showAttachmentOptions,
                      // ),
                      // const SizedBox(width: 8),
                      // Mode Button
                      // GestureDetector(
                      //   onTap: _showModeSelection,
                      //   child: Container(
                      //     padding: const EdgeInsets.symmetric(
                      //       horizontal: 12,
                      //       vertical: 8,
                      //     ),
                      //     decoration: BoxDecoration(
                      //       color: isDark
                      //           ? (_chatMode != ChatMode.simpleQa
                      //               ? DesignSystem.primaryCyan
                      //                   .withValues(alpha: 0.1)
                      //               : const Color(0xFF2C2C2C))
                      //           : (_chatMode != ChatMode.simpleQa
                      //               ? DesignSystem.primaryCyan
                      //                   .withValues(alpha: 0.05)
                      //               : const Color(0xFFF0F0F0)),
                      //       borderRadius: BorderRadius.circular(20),
                      //       // Minimal border for a premium feel
                      //       border: Border.all(
                      //         color: _chatMode != ChatMode.simpleQa
                      //             ? DesignSystem.primaryCyan
                      //                 .withValues(alpha: 0.2)
                      //             : Colors.transparent,
                      //         width: 1,
                      //       ),
                      //     ),
                      //     child: Row(
                      //       mainAxisSize: MainAxisSize.min,
                      //       children: [
                      //         Icon(
                      //           _chatMode == ChatMode.simpleQa
                      //               ? Icons.search
                      //               : (_chatMode == ChatMode.deepQa
                      //                   ? Icons.manage_search
                      //                   : Icons.saved_search),
                      //           size: 16,
                      //           color: _chatMode != ChatMode.simpleQa
                      //               ? DesignSystem.primaryCyan
                      //               : (isDark
                      //                   ? const Color(0xFFAAAAAA)
                      //                   : const Color(0xFF666666)),
                      //         ),
                      //         const SizedBox(width: 8),
                      //         Text(
                      //           _chatMode == ChatMode.simpleQa
                      //               ? 'Search'
                      //               : (_chatMode == ChatMode.deepQa
                      //                   ? 'Research'
                      //                   : 'Pro Search'),
                      //           style: DesignSystem.captionSmall.copyWith(
                      //             color: _chatMode != ChatMode.simpleQa
                      //                 ? DesignSystem.primaryCyan
                      //                 : (isDark
                      //                     ? const Color(0xFFDDDDDD)
                      //                     : const Color(0xFF666666)),
                      //             fontWeight: FontWeight.w600,
                      //             fontSize: 13,
                      //           ),
                      //         ),
                      //         const SizedBox(width: 4),
                      //         Icon(
                      //           Icons.keyboard_arrow_down_rounded,
                      //           size: 16,
                      //           color: _chatMode != ChatMode.simpleQa
                      //               ? DesignSystem.primaryCyan
                      //                   .withValues(alpha: 0.7)
                      //               : (isDark
                      //                   ? const Color(0xFF666666)
                      //                   : const Color(0xFF999999)),
                      //         ),
                      //       ],
                      //     ),
                      //   ),
                      // ),
                    ],
                  ),

                  // Right side icons: Globe, Send
                  Row(
                    children: [
                      _buildIconButton(
                        icon: Icons.language,
                        isDark: isDark,
                        color: (_sourceService.selectedWebUris.isNotEmpty ||
                                _sourceService
                                    .selectedKnowledgeBaseUris.isNotEmpty)
                            ? DesignSystem.primaryCyan
                            : null,
                        onTap: () {
                          HapticFeedback.lightImpact();
                          _openSourceSelector(isDark);
                        },
                      ),
                      const SizedBox(width: 8),
                      // Send button
                      ValueListenableBuilder<TextEditingValue>(
                        valueListenable: _inputController,
                        builder: (context, value, child) {
                          final hasTextValue = value.text.trim().isNotEmpty;
                          return AnimatedScale(
                            duration: const Duration(milliseconds: 200),
                            scale: hasTextValue ? 1.0 : 0.9,
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 200),
                              width: 36,
                              height: 36,
                              decoration: BoxDecoration(
                                color: hasTextValue
                                    ? (isDark ? Colors.white : Colors.black)
                                    : (isDark
                                        ? const Color(0xFF333333)
                                        : const Color(0xFFDDDDDD)),
                                shape: BoxShape.circle,
                                boxShadow: hasTextValue
                                    ? [
                                        BoxShadow(
                                          color: Colors.black.withOpacity(0.2),
                                          blurRadius: 8,
                                          offset: const Offset(0, 4),
                                        ),
                                      ]
                                    : null,
                              ),
                              child: Material(
                                color: Colors.transparent,
                                child: InkWell(
                                  onTap: hasTextValue ? _handleSend : null,
                                  borderRadius: BorderRadius.circular(18),
                                  child: Center(
                                    child: Icon(
                                      Icons.arrow_upward_rounded,
                                      color: hasTextValue
                                          ? (isDark
                                              ? Colors.black
                                              : Colors.white)
                                          : (isDark
                                              ? const Color(0xFF666666)
                                              : Colors.white),
                                      size: 20,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDemoBanner(BuildContext context, bool isDark) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(
        horizontal: DesignSystem.spacing16,
        vertical: DesignSystem.spacing12,
      ),
      decoration: BoxDecoration(
        color: Colors.black,
        border: Border(
          bottom: BorderSide(
            color: Colors.white.withOpacity(0.1),
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        'Backend (ASP.NET) integration is in progress.',
                        style: DesignSystem.bodySmall.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w500,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const SizedBox(width: 8),
                    GestureDetector(
                      onTap: () => _showAboutDialog(context, isDark),
                      child: Text(
                        'Learn more',
                        style: DesignSystem.bodySmall.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                          decoration: TextDecoration.underline,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 2),
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        'バックエンド（ASP.NET）の統合が進行中です。',
                        style: DesignSystem.bodySmall.copyWith(
                          color: Colors.white.withOpacity(0.8),
                          fontWeight: FontWeight.w500,
                          fontSize: 11,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    const SizedBox(width: 8),
                    GestureDetector(
                      onTap: () => _showAboutDialog(context, isDark),
                      child: Text(
                        '詳しく見る',
                        style: DesignSystem.bodySmall.copyWith(
                          color: Colors.white.withOpacity(0.8),
                          fontWeight: FontWeight.w700,
                          decoration: TextDecoration.underline,
                          fontSize: 11,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          GestureDetector(
            onTap: () {
              setState(() {
                _showDemoBanner = false;
              });
            },
            child: Container(
              padding: const EdgeInsets.all(4),
              child: Icon(
                Icons.close,
                size: 20,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showAboutDialog(BuildContext context, bool isDark) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: isDark
            ? DesignSystem.backgroundDarkElevated
            : DesignSystem.backgroundLightElevated,
        shape: RoundedRectangleBorder(
          borderRadius: DesignSystem.borderRadiusLarge,
          side: BorderSide(
            color: isDark ? DesignSystem.borderDark : DesignSystem.borderLight,
          ),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'About Demo',
              style: DesignSystem.titleMedium.copyWith(
                fontWeight: FontWeight.w700,
                color: isDark
                    ? DesignSystem.textPrimaryDark
                    : DesignSystem.textPrimaryLight,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              'デモについて',
              style: DesignSystem.bodyMedium.copyWith(
                fontWeight: FontWeight.w700,
                color: (isDark
                        ? DesignSystem.textPrimaryDark
                        : DesignSystem.textPrimaryLight)
                    .withOpacity(0.7),
              ),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'This front end is a demo of the intended final experience. Backend (ASP.NET) integration is in progress.',
              style: DesignSystem.bodyMedium.copyWith(
                color: isDark
                    ? DesignSystem.textPrimaryDark
                    : DesignSystem.textPrimaryLight,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'このフロントエンドは、最終的な体験のデモです。現在、バックエンド（ASP.NET）との統合を進めています。',
              style: DesignSystem.bodySmall.copyWith(
                color: (isDark
                        ? DesignSystem.textPrimaryDark
                        : DesignSystem.textPrimaryLight)
                    .withOpacity(0.7),
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'The UI is a slight modification from a project I have worked on, which is why it has been done so fast :)',
              style: DesignSystem.bodyMedium.copyWith(
                color: isDark
                    ? DesignSystem.textSecondaryDark
                    : DesignSystem.textSecondaryLight,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'UIは過去のプロジェクトを基に軽く修正したものです。そのため迅速に実装できました :)',
              style: DesignSystem.bodySmall.copyWith(
                color: (isDark
                        ? DesignSystem.textSecondaryDark
                        : DesignSystem.textSecondaryLight)
                    .withOpacity(0.7),
              ),
            ),
            const SizedBox(height: 24),
            _buildGitHubLink(
              context,
              text: 'To understand the project, please first read:',
              url:
                  'https://github.com/kiyo9w/StoreMind?tab=readme-ov-file#storemind-english',
              isDark: isDark,
            ),
            const SizedBox(height: 12),
            _buildGitHubLink(
              context,
              text: 'プロジェクトを理解するには、まずこちらをお読みください:',
              url: 'https://github.com/kiyo9w/StoreMind',
              isDark: isDark,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(
              'Close / 閉じる',
              style: DesignSystem.button.copyWith(
                color: DesignSystem.primaryCyan,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGitHubLink(
    BuildContext context, {
    required String text,
    required String url,
    required bool isDark,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          text,
          style: DesignSystem.bodySmall.copyWith(
            color: isDark
                ? DesignSystem.textPrimaryDark
                : DesignSystem.textPrimaryLight,
          ),
        ),
        const SizedBox(height: 4),
        GestureDetector(
          onTap: () async {
            final uri = Uri.parse(url);
            if (await canLaunchUrl(uri)) {
              await launchUrl(uri);
            }
          },
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF2C2C2E) : const Color(0xFFE8E8E8),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                // GitHub Icon (using font awesome or custom asset? Default Icons doesn't have github)
                // I'll use code icon as fallback or check if I have FontAwesome.
                // Or just an Icon(Icons.link) if specifically GitHub isn't available?
                // The user asked for "github icon".
                // I will try to find a github icon asset or use a generic "code" icon that looks techy.
                // Assuming no external package like font_awesome_flutter is verified installed, uses Icons.code as safe bet
                // But wait, the user said "embedded, github icon".
                // If I don't have it, I can use an SVG from assets if available?
                // I saw `mobile/assets/images` list. No github icon.
                // I will use `Icons.open_in_new` or `Icons.code` and label it clearly.
                // usage: "GitHub" text in the button?
                // Let's use a generic icon for now and maybe "GitHub" text.
                const Icon(
                  Icons.code, // Placeholder for GitHub icon
                  size: 18,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'View on GitHub',
                    style: DesignSystem.captionSmall.copyWith(
                      color: isDark
                          ? DesignSystem.textPrimaryDark
                          : DesignSystem.textPrimaryLight,
                      fontWeight: FontWeight.w600,
                      decoration: TextDecoration.underline,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildIconButton({
    required IconData icon,
    required bool isDark,
    required VoidCallback onTap,
    Color? color,
  }) {
    return SizedBox(
      width: 36,
      height: 36,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(18),
          child: Center(
            child: Icon(
              icon,
              size: 20,
              color: color ??
                  (isDark ? const Color(0xFF999999) : const Color(0xFF666666)),
            ),
          ),
        ),
      ),
    );
  }

  void _handleSend() {
    if (_inputController.text.trim().isEmpty) return;

    HapticFeedback.mediumImpact();
    final message = _inputController.text.trim();

    _inputController.clear();
    _inputFocusNode.unfocus();

    widget.onSend(message, _chatMode);
  }

  Future<void> _openSourceSelector(bool isDark) async {
    await SourceSelectorSheet.show(
      context: context,
      isDark: isDark,
      webResources: _sourceService.webResources,
      knowledgeBaseResources: _sourceService.knowledgeBaseResources,
      selectedWebUris: _sourceService.selectedWebUris,
      selectedKnowledgeBaseUris: _sourceService.selectedKnowledgeBaseUris,
      sourceService: _sourceService,
      isWebEnabled: _sourceService.isWebEnabled,
      isKnowledgeBaseEnabled: _sourceService.isKnowledgeBaseEnabled,
      isCrawlEnabled: _sourceService.isCrawlEnabled,
      isSummarizerEnabled: _sourceService.isSummarizerEnabled,
    );

    if (mounted) setState(() {});
  }

  // Widget _buildCircleActionButton({
  //   required IconData icon,
  //   required bool isDark,
  //   required VoidCallback onTap,
  // }) {
  //   return GestureDetector(
  //     onTap: () {
  //       HapticFeedback.lightImpact();
  //       onTap();
  //     },
  //     child: Container(
  //       width: 32,
  //       height: 32,
  //       decoration: BoxDecoration(
  //         color: isDark ? const Color(0xFF2C2C2C) : const Color(0xFFE0E0E0),
  //         borderRadius: BorderRadius.circular(16),
  //       ),
  //       child: Center(
  //         child: Icon(
  //           icon,
  //           size: 18,
  //           color: isDark ? const Color(0xFFDDDDDD) : const Color(0xFF666666),
  //         ),
  //       ),
  //     ),
  //   );
  // }

  // void _showAttachmentOptions() {
  //   showModalBottomSheet(
  //     context: context,
  //     backgroundColor: Colors.transparent,
  //     builder: (context) {
  //       final isDark = Theme.of(context).brightness == Brightness.dark;
  //       return Container(
  //         decoration: BoxDecoration(
  //           color: isDark ? const Color(0xFF1E1E1E) : Colors.white,
  //           borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
  //           border: Border(
  //             top: BorderSide(
  //               color: isDark
  //                   ? Colors.white.withOpacity(0.1)
  //                   : Colors.black.withOpacity(0.05),
  //               width: 1,
  //             ),
  //           ),
  //         ),
  //         child: SafeArea(
  //           child: Padding(
  //             padding: const EdgeInsets.all(24.0),
  //             child: Column(
  //               mainAxisSize: MainAxisSize.min,
  //               crossAxisAlignment: CrossAxisAlignment.stretch,
  //               children: [
  //                 Row(
  //                   mainAxisAlignment: MainAxisAlignment.spaceBetween,
  //                   children: [
  //                     Text(
  //                       'Sources',
  //                       style: DesignSystem.titleMedium.copyWith(
  //                         color: isDark
  //                             ? DesignSystem.textPrimaryDark
  //                             : DesignSystem.textPrimaryLight,
  //                         fontWeight: FontWeight.w600,
  //                       ),
  //                     ),
  //                     GestureDetector(
  //                       onTap: () => Navigator.pop(context),
  //                       child: Icon(
  //                         Icons.close,
  //                         color: isDark
  //                             ? DesignSystem.textSecondaryDark
  //                             : DesignSystem.textSecondaryLight,
  //                         size: 20,
  //                       ),
  //                     ),
  //                   ],
  //                 ),
  //                 const SizedBox(height: 24),
  //                 Row(
  //                   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  //                   children: [
  //                     _buildAttachmentOption(
  //                       icon: Icons.image_outlined,
  //                       label: 'Image',
  //                       isDark: isDark,
  //                       onTap: () {},
  //                     ),
  //                     _buildAttachmentOption(
  //                       icon: Icons.camera_alt_outlined,
  //                       label: 'Camera',
  //                       isDark: isDark,
  //                       onTap: () {},
  //                     ),
  //                     _buildAttachmentOption(
  //                       icon: Icons.description_outlined,
  //                       label: 'File',
  //                       isDark: isDark,
  //                       onTap: () {},
  //                     ),
  //                   ],
  //                 ),
  //                 const SizedBox(height: 16),
  //               ],
  //             ),
  //           ),
  //         ),
  //       );
  //     },
  //   );
  // }

  // Widget _buildAttachmentOption({
  //   required IconData icon,
  //   required String label,
  //   required bool isDark,
  //   required VoidCallback onTap,
  // }) {
  //   return GestureDetector(
  //     onTap: () {
  //       Navigator.pop(context);
  //       onTap();
  //       ScaffoldMessenger.of(context).showSnackBar(
  //         SnackBar(content: Text('$label coming soon')),
  //       );
  //     },
  //     child: Column(
  //       children: [
  //         Container(
  //           width: 80,
  //           height: 80,
  //           decoration: BoxDecoration(
  //             color: isDark ? const Color(0xFF2C2C2C) : const Color(0xFFF5F5F5),
  //             borderRadius: BorderRadius.circular(20),
  //           ),
  //           child: Center(
  //             child: Icon(
  //               icon,
  //               size: 32,
  //               color: isDark
  //                   ? DesignSystem.textPrimaryDark
  //                   : DesignSystem.textPrimaryLight,
  //             ),
  //           ),
  //         ),
  //         const SizedBox(height: 8),
  //         Text(
  //           label,
  //           style: DesignSystem.bodySmall.copyWith(
  //             color: isDark
  //                 ? DesignSystem.textSecondaryDark
  //                 : DesignSystem.textSecondaryLight,
  //             fontWeight: FontWeight.w500,
  //           ),
  //         ),
  //       ],
  //     ),
  //   );
  // }

  void _showModeSelection() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) {
        final isDark = Theme.of(context).brightness == Brightness.dark;
        return Container(
          decoration: BoxDecoration(
            color: isDark ? const Color(0xFF1E1E1E) : Colors.white,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
            border: Border(
              top: BorderSide(
                color: isDark
                    ? Colors.white.withOpacity(0.1)
                    : Colors.black.withOpacity(0.05),
                width: 1,
              ),
            ),
          ),
          child: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Choose a mode',
                          style: DesignSystem.titleMedium.copyWith(
                            color: isDark
                                ? DesignSystem.textPrimaryDark
                                : DesignSystem.textPrimaryLight,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        GestureDetector(
                          onTap: () => Navigator.pop(context),
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: BoxDecoration(
                              color: isDark
                                  ? Colors.white.withOpacity(0.1)
                                  : Colors.black.withOpacity(0.05),
                              shape: BoxShape.circle,
                            ),
                            child: Icon(
                              Icons.close,
                              color: isDark
                                  ? DesignSystem.textSecondaryDark
                                  : DesignSystem.textSecondaryLight,
                              size: 16,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  _buildModeTile(
                    icon: Icons.search,
                    title: 'Search Mode',
                    subtitle: 'Quickly find answers to your questions.',
                    isSelected: _chatMode == ChatMode.simpleQa,
                    isDark: isDark,
                    onTap: () {
                      setState(() {
                        _chatMode = ChatMode.simpleQa;
                        widget.onModeChanged?.call(ChatMode.simpleQa);
                      });
                      Navigator.pop(context);
                    },
                  ),
                  // Pro Search Mode - Hidden per request
                  // Pro Search Mode - Hidden as per request
                  // _buildModeTile(
                  //   icon: Icons.manage_search,
                  //   title: 'Pro Search Mode',
                  //   subtitle:
                  //       'Get detailed answers with enhanced search capabilities.',
                  //   isSelected: _chatMode == ChatMode.proSearch,
                  //   isDark: isDark,
                  //   onTap: () {
                  //     setState(() {
                  //       _chatMode = ChatMode.proSearch;
                  //       widget.onModeChanged?.call(ChatMode.proSearch);
                  //     });
                  //     Navigator.pop(context);
                  //   },
                  // ),// ),
                  _buildModeTile(
                    icon: Icons.saved_search,
                    title: 'Research Mode',
                    subtitle:
                        'Conduct in-depth research with comprehensive responses.',
                    isSelected: _chatMode == ChatMode.deepQa,
                    isDark: isDark,
                    onTap: () {
                      setState(() {
                        _chatMode = ChatMode.deepQa;
                        widget.onModeChanged?.call(ChatMode.deepQa);
                      });
                      Navigator.pop(context);
                    },
                  ),
                  // const SizedBox(height: 12),
                  // _buildToggleTile(
                  //   icon: Icons.visibility_off_outlined,
                  //   title: 'Incognito mode',
                  //   subtitle: 'Activity won\'t be saved',
                  //   isDark: isDark,
                  //   value: false,
                  //   onChanged: (val) {
                  //     Navigator.pop(context);
                  //     ScaffoldMessenger.of(context).showSnackBar(
                  //       const SnackBar(
                  //           content: Text('Incognito mode coming soon')),
                  //     );
                  //   },
                  // ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildModeTile({
    required IconData icon,
    required String title,
    required String subtitle,
    required bool isSelected,
    required bool isDark,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 4),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected
              ? DesignSystem.primaryCyan.withOpacity(0.12)
              : (isDark ? const Color(0xFF2C2C2C) : const Color(0xFFF5F5F5)),
          borderRadius: BorderRadius.circular(16),
          border: isSelected
              ? Border.all(color: DesignSystem.primaryCyan, width: 1.5)
              : Border.all(color: Colors.transparent, width: 1.5),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              color: isSelected
                  ? DesignSystem.primaryCyan
                  : (isDark ? Colors.white70 : Colors.black54),
              size: 24,
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        title,
                        style: DesignSystem.bodyLarge.copyWith(
                          fontWeight: FontWeight.w600,
                          color: isDark
                              ? DesignSystem.textPrimaryDark
                              : DesignSystem.textPrimaryLight,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: DesignSystem.bodySmall.copyWith(
                      color: isDark
                          ? DesignSystem.textSecondaryDark
                          : DesignSystem.textSecondaryLight,
                    ),
                  ),
                ],
              ),
            ),
            if (isSelected)
              Icon(
                Icons.check_circle,
                color: DesignSystem.primaryCyan,
                size: 20,
              ),
          ],
        ),
      ),
    );
  }

  // Widget _buildToggleTile({
  //   required IconData icon,
  //   required String title,
  //   required String subtitle,
  //   required bool isDark,
  //   required bool value,
  //   required ValueChanged<bool> onChanged,
  // }) {
  //   return InkWell(
  //     onTap: () {
  //       onChanged(!value);
  //     },
  //     child: Container(
  //       margin: const EdgeInsets.symmetric(vertical: 4),
  //       padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
  //       decoration: BoxDecoration(
  //         color: Colors.transparent,
  //         borderRadius: BorderRadius.circular(16),
  //       ),
  //       child: Row(
  //         children: [
  //           Icon(
  //             icon,
  //             color: isDark ? Colors.white70 : Colors.black54,
  //             size: 24,
  //           ),
  //           const SizedBox(width: 16),
  //           Expanded(
  //             child: Column(
  //               crossAxisAlignment: CrossAxisAlignment.start,
  //               children: [
  //                 Text(
  //                   title,
  //                   style: DesignSystem.bodyLarge.copyWith(
  //                     fontWeight: FontWeight.w600,
  //                     color: isDark
  //                         ? DesignSystem.textPrimaryDark
  //                         : DesignSystem.textPrimaryLight,
  //                   ),
  //                 ),
  //                 const SizedBox(height: 2),
  //                 Text(
  //                   subtitle,
  //                   style: DesignSystem.bodySmall.copyWith(
  //                     color: isDark
  //                         ? DesignSystem.textSecondaryDark
  //                         : DesignSystem.textSecondaryLight,
  //                   ),
  //                 ),
  //               ],
  //             ),
  //           ),
  //           Switch.adaptive(
  //             value: value,
  //             onChanged: onChanged,
  //             activeColor: DesignSystem.primaryCyan,
  //           ),
  //         ],
  //       ),
  //     ),
  //   );
  // }
}
