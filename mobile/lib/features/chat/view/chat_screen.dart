import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:insider/core/design_system/design_system.dart';
import 'package:insider/features/app/cubit/manager_mode_cubit.dart';
import 'package:insider/features/chat/view/conversation_screen.dart';
import 'package:insider/features/chat/view/chat_view.dart';
import 'package:insider/features/chat/data/models/chat_models.dart';
import 'package:insider/features/plans/view/plans_screen.dart';
import 'package:insider/router/app_router.dart';

/// Chat Screen - Main AI interaction interface with stunning input design
class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  ChatMode _chatMode = ChatMode.simpleQa;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor:
          isDark ? DesignSystem.backgroundDark : DesignSystem.backgroundLight,
      body: SafeArea(
        child: Column(
          children: [
            _buildAppBar(context, isDark),
            Expanded(
              child: ChatView(
                chatMode: _chatMode,
                onModeChanged: (mode) {
                  setState(() {
                    _chatMode = mode;
                  });
                },
                onSend: (message, mode) {
                  _handleSend(message, mode);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAppBar(BuildContext context, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: DesignSystem.spacing16,
        vertical: DesignSystem.spacing12,
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: () {
              context.go(AppRouter.threadsPath);
            },
            child: Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isDark
                    ? DesignSystem.backgroundDarkElevated
                    : DesignSystem.backgroundLightElevated,
                border: Border.all(
                  color: isDark
                      ? DesignSystem.borderDark
                      : DesignSystem.borderLight,
                  width: 1,
                ),
              ),
              child: Icon(
                Icons.person_outline,
                size: 22,
                color: isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
              ),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: BlocBuilder<ManagerModeCubit, bool>(
              builder: (context, isManager) {
                return Align(
                  alignment: Alignment.center,
                  child: _ManagerStaffToggle(
                    isDark: isDark,
                    isManager: isManager,
                    onChanged: (value) {
                      HapticFeedback.lightImpact();
                      context.read<ManagerModeCubit>().setManagerMode(value);
                    },
                  ),
                );
              },
            ),
          ),
          BlocBuilder<ManagerModeCubit, bool>(
            builder: (context, isManager) {
              if (!isManager) return const SizedBox.shrink();
              return GestureDetector(
                onTap: () {
                  debugPrint(
                      '[ChatScreen] Plan icon tapped, navigating to ${AppRouter.plansPath}');
                  // Use push instead of go to ensure PlansScreen is shown
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => const PlansScreen(),
                    ),
                  );
                },
                child: Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: isDark
                        ? DesignSystem.backgroundDarkElevated
                        : DesignSystem.backgroundLightElevated,
                    border: Border.all(
                      color: isDark
                          ? DesignSystem.borderDark
                          : DesignSystem.borderLight,
                      width: 1,
                    ),
                  ),
                  child: Icon(
                    Icons.assignment_outlined,
                    size: 22,
                    color:
                        isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  void _handleSend(String message, ChatMode mode) {
    FocusScope.of(context).unfocus(); // Ensure keyboard is hidden
    final isManager = context.read<ManagerModeCubit>().state;
    final today = DateTime.now().toIso8601String().split('T').first;

    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => ConversationScreen(
          query: message,
          chatMode: mode,
          isManager: isManager,
          planDate: isManager ? today : null,
        ),
      ),
    );
  }
}

class _ManagerStaffToggle extends StatelessWidget {
  const _ManagerStaffToggle({
    required this.isDark,
    required this.isManager,
    required this.onChanged,
  });

  final bool isDark;
  final bool isManager;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: isDark
            ? DesignSystem.backgroundDarkElevated
            : DesignSystem.backgroundLightElevated,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: isDark
              ? DesignSystem.borderDark.withOpacity(0.6)
              : DesignSystem.borderLight.withOpacity(0.7),
          width: 0.5,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _TogglePill(
            label: 'Staff',
            isSelected: !isManager,
            isDark: isDark,
            onTap: () => onChanged(false),
          ),
          _TogglePill(
            label: 'Manager',
            isSelected: isManager,
            isDark: isDark,
            onTap: () => onChanged(true),
          ),
        ],
      ),
    );
  }
}

class _TogglePill extends StatelessWidget {
  const _TogglePill({
    required this.label,
    required this.isSelected,
    required this.isDark,
    required this.onTap,
  });

  final String label;
  final bool isSelected;
  final bool isDark;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? (isDark ? Colors.white : Colors.black)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(
          label,
          style: DesignSystem.bodySmall.copyWith(
            color: isSelected
                ? (isDark ? Colors.black : Colors.white)
                : (isDark
                    ? DesignSystem.textSecondaryDark
                    : DesignSystem.textSecondaryLight),
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
