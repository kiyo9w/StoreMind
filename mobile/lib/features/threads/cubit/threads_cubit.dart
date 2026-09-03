import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:insider/core/bloc_core/ui_status.dart';
import 'package:insider/data/repositories/chat/chat_repository.dart';
import 'package:insider/features/threads/cubit/threads_state.dart';
import 'package:injectable/injectable.dart';
import 'package:rest_client/rest_client.dart';

@injectable
class ThreadsCubit extends Cubit<ThreadsState> {
  ThreadsCubit(this._chatRepository) : super(_initialState()) {
    // Initialize with hardcoded threads immediately
  }

  // ignore: unused_field
  final ChatRepository _chatRepository;

  static ThreadsState _initialState() {
    // Hardcoded thread data - retail store related questions
    final now = DateTime.now();
    final history = [
      ChatSnapshot(
        id: 'thread-1',
        title: 'Do we have enough sake for the weekend?',
        date: now.subtract(const Duration(hours: 2)),
        preview: 'Yes, 24 bottles in stock, average weekend sales is 18. Should be fine unless there\'s an event.',
      ),
      ChatSnapshot(
        id: 'thread-2',
        title: 'Where did we put the new shipment of rice crackers?',
        date: now.subtract(const Duration(hours: 5)),
        preview: 'Row 3, back shelf, received Tuesday 2:30 PM, 12 boxes.',
      ),
      ChatSnapshot(
        id: 'thread-3',
        title: 'What items are expiring soon and need markdown?',
        date: now.subtract(const Duration(days: 1)),
        preview: 'SKU #BNT-042 bento boxes (30 units) expire in 18 hours. Suggest 20% markdown - historically sells 2x faster at this discount.',
      ),
      ChatSnapshot(
        id: 'thread-4',
        title: 'Should we order more umbrellas? It\'s supposed to rain this week',
        date: now.subtract(const Duration(days: 2)),
        preview: 'Yes, recommend ordering 50 umbrellas from Supplier A at 4.5\$ each. Rain forecast shows 89% chance Thursday through Saturday, current stock is 12 units.',
      ),
      ChatSnapshot(
        id: 'thread-5',
        title: 'Can you recheck decision #3: ordering 5 boxes of 24 packs of milk 340ml',
        date: now.subtract(const Duration(days: 3)),
        preview: 'Rechecked and adjusted to 10 boxes. Last inventory check showed we almost ran out of stock.',
      ),
      ChatSnapshot(
        id: 'thread-6',
        title: 'What\'s our current inventory level for instant noodles?',
        date: now.subtract(const Duration(days: 4)),
        preview: 'Current stock: 156 units across 12 SKUs. Top sellers are chicken flavor (48 units) and beef flavor (42 units).',
      ),
      ChatSnapshot(
        id: 'thread-7',
        title: 'Which products are running low and need restocking?',
        date: now.subtract(const Duration(days: 7)),
        preview: 'Low stock items: Soy sauce (8 units, reorder point: 20), Rice (12 bags, reorder point: 30), Bread (15 loaves, reorder point: 25).',
      ),
    ];
    // Reverse to show newest first
    final reversedHistory = history.reversed.toList();

    return ThreadsState(
      status: const UIStatus.loadSuccess(),
      threads: reversedHistory,
      filteredThreads: reversedHistory,
      searchQuery: '',
    );
  }

  Future<void> getThreads() async {
    emit(state.copyWith(status: const UIStatus.loading()));
    
    // Hardcoded thread data - retail store related questions
    final now = DateTime.now();
    final history = [
      ChatSnapshot(
        id: 'thread-1',
        title: 'Do we have enough sake for the weekend?',
        date: now.subtract(const Duration(hours: 2)),
        preview: 'Yes, 24 bottles in stock, average weekend sales is 18. Should be fine unless there\'s an event.',
      ),
      ChatSnapshot(
        id: 'thread-2',
        title: 'Where did we put the new shipment of rice crackers?',
        date: now.subtract(const Duration(hours: 5)),
        preview: 'Row 3, back shelf, received Tuesday 2:30 PM, 12 boxes.',
      ),
      ChatSnapshot(
        id: 'thread-3',
        title: 'What items are expiring soon and need markdown?',
        date: now.subtract(const Duration(days: 1)),
        preview: 'SKU #BNT-042 bento boxes (30 units) expire in 18 hours. Suggest 20% markdown - historically sells 2x faster at this discount.',
      ),
      ChatSnapshot(
        id: 'thread-4',
        title: 'Should we order more umbrellas? It\'s supposed to rain this week',
        date: now.subtract(const Duration(days: 2)),
        preview: 'Yes, recommend ordering 50 umbrellas from Supplier A at 4.5\$ each. Rain forecast shows 89% chance Thursday through Saturday, current stock is 12 units.',
      ),
      ChatSnapshot(
        id: 'thread-5',
        title: 'Can you recheck decision #3: ordering 5 boxes of 24 packs of milk 340ml',
        date: now.subtract(const Duration(days: 3)),
        preview: 'Rechecked and adjusted to 10 boxes. Last inventory check showed we almost ran out of stock.',
      ),
      ChatSnapshot(
        id: 'thread-6',
        title: 'What\'s our current inventory level for instant noodles?',
        date: now.subtract(const Duration(days: 4)),
        preview: 'Current stock: 156 units across 12 SKUs. Top sellers are chicken flavor (48 units) and beef flavor (42 units).',
      ),
      ChatSnapshot(
        id: 'thread-7',
        title: 'Which products are running low and need restocking?',
        date: now.subtract(const Duration(days: 7)),
        preview: 'Low stock items: Soy sauce (8 units, reorder point: 20), Rice (12 bags, reorder point: 30), Bread (15 loaves, reorder point: 25).',
      ),
    ];
    // Reverse to show newest first
    final reversedHistory = history.reversed.toList();

    emit(state.copyWith(
      status: const UIStatus.loadSuccess(),
      threads: reversedHistory,
      filteredThreads: reversedHistory,
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
