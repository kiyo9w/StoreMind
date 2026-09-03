import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:insider/core/bloc_core/ui_status.dart';
import 'package:insider/data/repositories/chat/chat_repository.dart';
import 'package:insider/features/threads/cubit/threads_state.dart';
import 'package:injectable/injectable.dart';
import 'package:rest_client/rest_client.dart';

@injectable
class ThreadsCubit extends Cubit<ThreadsState> {
  ThreadsCubit(this._chatRepository) : super(_initialState());

  // ignore: unused_field
  final ChatRepository _chatRepository;

  static List<ChatSnapshot> _demoThreads() {
    final now = DateTime.now();
    return [
      ChatSnapshot(
        id: 'thread-1',
        title: '週末の日本酒は足りていますか？',
        date: now.subtract(const Duration(hours: 2)),
        preview: '在庫は24本、週末平均販売は18本です。イベントがなければ足りる見込みです。',
      ),
      ChatSnapshot(
        id: 'thread-2',
        title: '新しい煎餅の入荷はどこに置きましたか？',
        date: now.subtract(const Duration(hours: 5)),
        preview: '3列目の奥棚、火曜14:30受領、12箱です。',
      ),
      ChatSnapshot(
        id: 'thread-3',
        title: 'まもなく期限切れで値下げが必要な商品は？',
        date: now.subtract(const Duration(days: 1)),
        preview: 'SKU #BNT-042 弁当30点は18時間で期限切れ。20%値下げを推奨します。',
      ),
      ChatSnapshot(
        id: 'thread-4',
        title: '今週雨予報ですが、傘を追加発注すべきですか？',
        date: now.subtract(const Duration(days: 2)),
        preview: '仕入先Aから傘50本の発注を推奨。在庫は12本です。',
      ),
      ChatSnapshot(
        id: 'thread-5',
        title: '決定3：牛乳340ml 24本入り5箱の発注を再確認してください',
        date: now.subtract(const Duration(days: 3)),
        preview: '再確認の結果、10箱に調整しました。在庫切れ寸前でした。',
      ),
      ChatSnapshot(
        id: 'thread-6',
        title: '即席麺の現在庫はどれくらいですか？',
        date: now.subtract(const Duration(days: 4)),
        preview: '現在庫156点、12SKU。上位は鶏48点、牛42点です。',
      ),
      ChatSnapshot(
        id: 'thread-7',
        title: '補充が必要な欠品気味の商品はどれですか？',
        date: now.subtract(const Duration(days: 7)),
        preview: '醤油8点、米12袋、パン15斤が発注点を下回っています。',
      ),
    ].reversed.toList();
  }

  static ThreadsState _initialState() {
    final history = _demoThreads();
    return ThreadsState(
      status: const UIStatus.loadSuccess(),
      threads: history,
      filteredThreads: history,
      searchQuery: '',
    );
  }

  Future<void> getThreads() async {
    emit(state.copyWith(status: const UIStatus.loading()));
    final history = _demoThreads();
    emit(state.copyWith(
      status: const UIStatus.loadSuccess(),
      threads: history,
      filteredThreads: history,
      searchQuery: '',
    ));
  }

  void searchThreads(String query) {
    if (query.isEmpty) {
      emit(state.copyWith(
        filteredThreads: state.threads,
        searchQuery: query,
      ));
      return;
    }

    final lowercaseQuery = query.toLowerCase();
    final filtered = state.threads.where((thread) {
      return thread.title.toLowerCase().contains(lowercaseQuery) ||
          thread.preview.toLowerCase().contains(lowercaseQuery);
    }).toList();

    emit(state.copyWith(
      filteredThreads: filtered,
      searchQuery: query,
    ));
  }
}
