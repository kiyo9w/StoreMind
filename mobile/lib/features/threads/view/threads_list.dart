import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:insider/core/bloc_core/ui_status.dart';
import 'package:insider/core/design_system/design_system.dart';
import 'package:insider/features/threads/cubit/threads_cubit.dart';
import 'package:insider/features/threads/cubit/threads_state.dart';
import 'package:rest_client/rest_client.dart' as rc;

class ThreadsList extends StatelessWidget {
  const ThreadsList({
    super.key,
    required this.isDark,
    this.onThreadTap,
  });

  final bool isDark;
  final Function(Map<String, String>)? onThreadTap;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ThreadsCubit, ThreadsState>(
      builder: (context, state) {
        return state.status.when(
          initial: () => const SizedBox.shrink(),
          loading: () => const Center(child: CircularProgressIndicator()),
          loadFailed: (message) => Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.error_outline,
                  color: DesignSystem.error,
                  size: 48,
                ),
                const SizedBox(height: 16),
                Text(
                  'スレッドを読み込めませんでした',
                  style: DesignSystem.titleMedium.copyWith(
                    color: isDark ? Colors.white : Colors.black,
                  ),
                ),
                const SizedBox(height: 8),
                TextButton(
                  onPressed: () {
                    context.read<ThreadsCubit>().getThreads();
                  },
                  child: const Text('再試行'),
                ),
              ],
            ),
          ),
          loadSuccess: (message) {
            final threads = state.filteredThreads;
            // If we have a search query but no results, show a specific message
            // If we have no threads at all (and no search query), show the empty state
            final isSearching = state.searchQuery.isNotEmpty;

            if (threads.isEmpty) {
              if (isSearching) {
                return Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.search_off,
                        size: 48,
                        color: isDark ? Colors.white54 : Colors.black45,
                      ),
                      const SizedBox(height: 16),
                      Text(
                        '結果が見つかりません',
                        style: DesignSystem.titleMedium.copyWith(
                          color: isDark ? Colors.white : Colors.black,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '別のキーワードで検索してください',
                        style: DesignSystem.bodyMedium.copyWith(
                          color: isDark ? Colors.white54 : Colors.black54,
                        ),
                      ),
                    ],
                  ),
                );
              }

              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.chat_bubble_outline,
                    size: 48,
                    color: isDark ? Colors.white54 : Colors.black45,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    '会話はまだありません',
                    style: DesignSystem.titleMedium.copyWith(
                      color: isDark ? Colors.white : Colors.black,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Start a new search to see your history here',
                    style: DesignSystem.bodyMedium.copyWith(
                      color: isDark ? Colors.white54 : Colors.black54,
                    ),
                  ),
                ],
              );
            }

            return RefreshIndicator(
              onRefresh: () async {
                await context.read<ThreadsCubit>().getThreads();
                // Re-apply search if needed, but getThreads resets it in our current impl
                // which is fine as per plan.
              },
              child: ListView.builder(
                padding: EdgeInsets.zero,
                itemCount: threads.length,
                itemBuilder: (context, index) {
                  final thread = threads[index];
                  return _ThreadItem(
                    thread: thread,
                    isDark: isDark,
                  );
                },
              ),
            );
          },
        );
      },
    );
  }
}

class _ThreadItem extends StatelessWidget {
  const _ThreadItem({
    required this.thread,
    required this.isDark,
  });

  final rc.ChatSnapshot thread;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        // No navigation, just visual feedback
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    thread.title,
                    style: DesignSystem.titleMedium.copyWith(
                      color: isDark ? Colors.white : Colors.black,
                      fontWeight: FontWeight.w600,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  _formatDate(thread.date),
                  style: DesignSystem.bodySmall.copyWith(
                    color: isDark ? Colors.white38 : Colors.black38,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              thread.preview,
              style: DesignSystem.bodyMedium.copyWith(
                color: isDark ? Colors.white70 : Colors.black87,
                height: 1.4,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final difference = now.difference(date);

    if (difference.inDays == 0) {
      if (difference.inHours > 0) {
        return '${difference.inHours}h';
      } else if (difference.inMinutes > 0) {
        return '${difference.inMinutes}m';
      } else {
        return 'now';
      }
    } else if (difference.inDays < 7) {
      return '${difference.inDays}d';
    } else {
      return '${date.month}/${date.day}';
    }
  }
}
