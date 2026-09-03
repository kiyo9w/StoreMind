import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:insider/core/design_system/design_system.dart';
import 'package:insider/features/app/cubit/manager_mode_cubit.dart';
import 'package:insider/features/chat/data/models/chat_models.dart';
import 'package:insider/features/chat/view/chat_view.dart';
import 'package:insider/features/chat/view/conversation_screen.dart';
import 'package:insider/features/threads/view/threads_screen.dart'; // For ThreadsView
import 'package:insider/features/threads/cubit/threads_cubit.dart';
import 'package:insider/features/plans/view/plans_screen.dart'; // For PlansScreen
import 'package:insider/features/main/view/tablet_navigation_rail.dart';
import 'package:insider/injector/injector.dart';
import 'package:insider/features/chat/view/conversation_history_screen.dart';

class TabletMainScreen extends StatefulWidget {
  const TabletMainScreen({super.key});

  @override
  State<TabletMainScreen> createState() => _TabletMainScreenState();
}

class _TabletMainScreenState extends State<TabletMainScreen> {
  int _selectedIndex = 0;
  String? _activeConversationQuery;
  ChatMode _activeChatMode = ChatMode.simpleQa; // Store the selected mode
  bool _isSidebarExpanded = true; // controls collapsed/expanded state
  bool _showThreadsFullScreen =
      false; // controls full screen threads in portrait
  String? _activeHistoryId;
  String? _activeHistoryTitle;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isPortrait =
        MediaQuery.of(context).orientation == Orientation.portrait;
    final isManager = context.watch<ManagerModeCubit>();

    return BlocProvider(
      create: (context) => Injector.instance<ThreadsCubit>()..getThreads(),
      child: Scaffold(
        backgroundColor:
            isDark ? DesignSystem.backgroundDark : DesignSystem.backgroundLight,
        body: Builder(
          builder: (context) {
            return Row(
              children: [
                // 1. Navigation Rail (Left Sidebar)
                _buildNavigationRail(
                    context, isDark, isPortrait, isManager.state),

                // 2. Threads Sidebar (Middle Column) - only when expanded AND NOT portrait
                if (!isPortrait && _isSidebarExpanded)
                  Container(
                    width: 300,
                    decoration: BoxDecoration(
                      border: Border(
                        right: BorderSide(
                          color: isDark
                              ? DesignSystem.borderDark
                              : DesignSystem.borderLight,
                          width: 0.5,
                        ),
                      ),
                    ),
                    child: ThreadsView(
                      showHeader: false,
                      showFloatingButton: false,
                      onThreadTap: (thread) {
                        setState(() {
                          _activeHistoryId = thread['id'];
                          _activeHistoryTitle = thread['title'];
                          _activeConversationQuery = null;
                        });
                      },
                      onNewChat: () {
                        setState(() {
                          _activeConversationQuery = null;
                          _activeHistoryId = null;
                          _activeChatMode = ChatMode.simpleQa; // Reset mode
                        });
                      },
                    ),
                  ),

                // 3. Main Content Area (Right Column)
                Expanded(
                  child: isPortrait && _showThreadsFullScreen
                      ? ThreadsView(
                          showHeader: false,
                          showFloatingButton: true,
                          onThreadTap: (thread) {
                            setState(() {
                              _showThreadsFullScreen = false;
                              _activeHistoryId = thread['id'];
                              _activeHistoryTitle = thread['title'];
                              _activeConversationQuery = null;
                            });
                          },
                          onNewChat: () {
                            setState(() {
                              _showThreadsFullScreen = false;
                              _activeConversationQuery = null;
                              _activeHistoryId = null;
                              _activeChatMode = ChatMode.simpleQa; // Reset mode
                            });
                          },
                        )
                      : Stack(
                          children: [
                            if (_selectedIndex == 1)
                              Builder(
                                builder: (context) {
                                  debugPrint(
                                      '[TabletMainScreen] Showing PlansScreen (_selectedIndex == 1)');
                                  return const PlansScreen(
                                      showBackButton: false);
                                },
                              )
                            else if (_activeHistoryId != null)
                              ConversationHistoryScreen(
                                key: ValueKey(_activeHistoryId),
                                historyId: _activeHistoryId!,
                                title: _activeHistoryTitle,
                              )
                            else if (_activeConversationQuery != null)
                              ConversationScreen(
                                query: _activeConversationQuery!,
                                chatMode: _activeChatMode, // Pass the mode
                              )
                            else
                              Column(
                                children: [
                                  _buildManagerHeader(context, isDark),
                                  Expanded(
                                    child: ChatView(
                                      onSend: (String message, ChatMode mode) {
                                        FocusScope.of(context)
                                            .unfocus(); // Ensure keyboard is hidden
                                        setState(() {
                                          _activeConversationQuery = message;
                                          _activeHistoryId = null;
                                          _activeChatMode =
                                              mode; // Store the mode
                                        });
                                      },
                                    ),
                                  ),
                                ],
                              ),
                          ],
                        ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }

  Widget _buildNavigationRail(
      BuildContext context, bool isDark, bool isPortrait, bool isManager) {
    return TabletNavigationRail(
      isDark: isDark,
      isPortrait: isPortrait,
      isManager: isManager,
      selectedIndex: _selectedIndex,
      isThreadsActive: isPortrait ? _showThreadsFullScreen : _isSidebarExpanded,
      onLogoTap: () {
        if (isPortrait) {
          setState(() {
            _showThreadsFullScreen = true;
          });
          context.read<ThreadsCubit>().getThreads();
        } else {
          setState(() {
            _isSidebarExpanded = !_isSidebarExpanded;
          });
          if (_isSidebarExpanded) {
            context.read<ThreadsCubit>().getThreads();
          }
        }
      },
      onNewChatTap: () {
        setState(() {
          _selectedIndex = 0; // Switch to Home/Threads tab
          _activeConversationQuery = null; // Reset to new chat
          _activeChatMode = ChatMode.simpleQa; // Reset mode
          if (isPortrait) {
            _showThreadsFullScreen = false; // Hide threads list in portrait
          }
        });
      },
      onHomeTap: () {
        setState(() {
          _selectedIndex = 0;
          if (isPortrait) {
            _showThreadsFullScreen = true;
          } else {
            _isSidebarExpanded = !_isSidebarExpanded;
          }
        });
        if (_selectedIndex == 0) {
          context.read<ThreadsCubit>().getThreads();
        }
      },
      onPlansTap: () {
        debugPrint(
            '[TabletMainScreen] onPlansTap called, isManager: $isManager');
        if (!isManager) {
          debugPrint('[TabletMainScreen] Not manager, returning early');
          return;
        }
        debugPrint('[TabletMainScreen] Setting _selectedIndex to 1');
        setState(() {
          _selectedIndex = 1;
          _activeConversationQuery =
              null; // Clear active conversation to show Plans
          _activeHistoryId = null;
          if (isPortrait) {
            _showThreadsFullScreen = false; // Hide threads if in portrait
          }
        });
        debugPrint(
            '[TabletMainScreen] setState complete, _selectedIndex: $_selectedIndex');
      },
    );
  }

  Widget _buildManagerHeader(BuildContext context, bool isDark) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(
        DesignSystem.spacing20,
        DesignSystem.spacing16,
        DesignSystem.spacing20,
        DesignSystem.spacing8,
      ),
      child: Row(
        children: [
          BlocBuilder<ManagerModeCubit, bool>(
            builder: (context, isManager) {
              return _ManagerStaffToggle(
                isDark: isDark,
                isManager: isManager,
                onChanged: (value) {
                  HapticFeedback.lightImpact();
                  context.read<ManagerModeCubit>().setManagerMode(value);
                },
              );
            },
          ),
        ],
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
            label: 'スタッフ',
            isSelected: !isManager,
            isDark: isDark,
            onTap: () => onChanged(false),
          ),
          _TogglePill(
            label: 'マネージャー',
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
