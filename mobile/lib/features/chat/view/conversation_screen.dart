import 'dart:async';

import 'package:uuid/uuid.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/cupertino.dart';
import 'package:go_router/go_router.dart';
import 'package:insider/core/design_system/design_system.dart';
import 'package:insider/features/chat/data/models/chat_models.dart';
import 'package:insider/features/chat/data/source_service.dart';
import 'package:insider/features/chat/view/conversation_message.dart';
import 'package:insider/features/chat/view/widgets/assistant_message.dart';
import 'package:insider/features/chat/view/widgets/conversation_input.dart';
import 'package:insider/features/chat/view/widgets/source_selector_sheet.dart';
import 'package:insider/features/chat/view/widgets/sources_bottom_sheet.dart';
import 'package:insider/features/chat/view/widgets/user_message.dart';
import 'package:insider/data/repositories/chat/chat_repository.dart';
import 'package:insider/injector/injector.dart';
import 'package:insider/utils/string_utils.dart';

class ConversationScreen extends StatefulWidget {
  final String query;
  final ChatMode chatMode;

  /// StoreMind: Manager mode enables accessing multi-agent council with plan context
  final bool isManager;

  /// StoreMind: Plan date for manager chat context (format: yyyy-MM-dd)
  final String? planDate;

  const ConversationScreen({
    super.key,
    required this.query,
    this.chatMode = ChatMode.simpleQa,
    this.isManager = false,
    this.planDate,
  });

  @override
  State<ConversationScreen> createState() => _ConversationScreenState();
}

class _ConversationScreenState extends State<ConversationScreen> {
  final ScrollController _scrollController = ScrollController();
  final TextEditingController _inputController = TextEditingController();
  final FocusNode _inputFocusNode = FocusNode();
  bool _showScrollDownButton = false;
  bool _isSearching = false;
  bool _isReading = false;
  int _readingCount = 0;
  final List<String> _searchQueries = [];
  StreamSubscription? _streamSubscription;
  final SourceService _sourceService = SourceService.instance;
  late final ChatRepository _chatRepository;
  bool _showImagesView = false;

  // Track conversation history
  late String _conversationId;
  late String _threadId;
  final List<ChatMessage> _conversationHistory = [];

  // Message list for UI display
  final List<ConversationMessage> _messages = [];
  String? _currentStreamingMessageId;
  ChatMode _chatMode = ChatMode.simpleQa;

  // Agent step tracking for deep_qa mode
  List<AgentStep> _currentAgentSteps = [];
  List<String>? _currentQueryPlan;
  List<String> _currentImages = [];

  // ═══════════════════════════════════════════════════════════════════════════
  // SSE STREAMING STATE - New event types for token-by-token streaming
  // ═══════════════════════════════════════════════════════════════════════════
  String? _currentAgentName;
  String? _currentAgentRole;
  bool _isAgentThinking = false;
  String _thinkingContent = '';
  String? _currentToolName;
  bool _isToolRunning = false;

  // Tool call tracking
  List<Map<String, dynamic>> _activeToolCalls = [];

  // Plan update tracking (for Manager mode)
  Map<String, dynamic>? _updatedPlan;
  String? _actionModified;
  bool _planWasUpdated = false;

  @override
  void initState() {
    super.initState();
    _chatMode = widget.chatMode;
    debugPrint('[ConversationScreen] initState - chatMode: $_chatMode');
    _scrollController.addListener(_onScroll);
    _inputController.addListener(_onInputChanged);
    _chatRepository = Injector.instance<ChatRepository>();
    _sourceService.ensureRemoteResourcesLoaded().then((_) {
      if (mounted) setState(() {});
    });
    _startConversation();
  }

  void _onInputChanged() {
    setState(() {
      // Update UI when input changes (for send button state)
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _inputController.dispose();
    _inputFocusNode.dispose();
    _streamSubscription?.cancel();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollController.hasClients) {
      final position = _scrollController.position;
      final maxScroll = position.maxScrollExtent;
      final currentScroll = position.pixels;
      // Show button when user is NOT at the bottom (more than 100px from bottom)
      final showButton = (maxScroll - currentScroll) > 100;
      if (showButton != _showScrollDownButton) {
        setState(() => _showScrollDownButton = showButton);
      }
    }
  }

  void _scrollToBottom({bool force = false}) {
    if (!_scrollController.hasClients) return;

    final position = _scrollController.position;
    final maxScroll = position.maxScrollExtent;
    final currentScroll = position.pixels;

    final isNearBottom = (maxScroll - currentScroll) < 100;

    if (force || isNearBottom) {
      _scrollController.animateTo(
        maxScroll,
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOut,
      );
    }
  }

  void _startConversation() {
    _conversationId = const Uuid().v4();
    _threadId = const Uuid().v4();

    // Add initial user message to history and UI
    final userMessage = ChatMessage(
      content: widget.query,
      role: MessageRole.user,
    );
    _conversationHistory.clear();
    _conversationHistory.add(userMessage);

    // Add user message to UI
    _messages.add(ConversationMessage(
      id: 'msg_${DateTime.now().millisecondsSinceEpoch}',
      content: widget.query,
      role: MessageRole.user,
      images: const [],
    ));

    _sendMessage(userMessage.content);
  }

  void _sendMessage(String query) {
    // Prevent sending while already streaming
    if (_currentStreamingMessageId != null) return;

    // Set streaming ID early to prevent race conditions with rapid taps
    final assistantMessageId =
        'msg_${DateTime.now().millisecondsSinceEpoch}_asst';
    _currentStreamingMessageId = assistantMessageId;

    // Cancel previous stream if any
    _streamSubscription?.cancel();

    // Clear related queries from the last assistant message
    // This ensures suggestions disappear when a new question is asked
    if (_messages.isNotEmpty) {
      for (int i = _messages.length - 1; i >= 0; i--) {
        if (_messages[i].role == MessageRole.assistant) {
          final msg = _messages[i];
          if (msg.relatedQueries != null && msg.relatedQueries!.isNotEmpty) {
            setState(() {
              _messages[i] = ConversationMessage(
                id: msg.id,
                content: msg.content,
                role: msg.role,
                isStreaming: msg.isStreaming,
                relatedQueries: null, // Clear related questions
                sourcesCount: msg.sourcesCount,
                sources: msg.sources,
                agentSteps: msg.agentSteps,
                queryPlan: msg.queryPlan,
              );
            });
          }
          break; // Only clear the last one
        }
      }
    }

    // Add user message to history and UI (if not already added)
    if (_messages.isEmpty ||
        _messages.last.role != MessageRole.user ||
        _messages.last.content != query) {
      final userMessage = ChatMessage(
        content: query,
        role: MessageRole.user,
      );
      _conversationHistory.add(userMessage);

      // Add user message to UI
      setState(() {
        _messages.add(ConversationMessage(
          id: 'msg_${DateTime.now().millisecondsSinceEpoch}_user',
          content: query,
          role: MessageRole.user,
          images: const [],
        ));
      });
    }

    // Auto scroll to show new user message
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _scrollToBottom(force: true);
    });

    // Backend will provide sources dynamically, no need to pre-populate
    setState(() {
      // Reset agent steps for new message
      _currentAgentSteps = [];
      _currentQueryPlan = null;
      _currentImages = [];

      _messages.add(ConversationMessage(
        id: assistantMessageId,
        content: '',
        role: MessageRole.assistant,
        isStreaming: true,
        sources: const [], // Backend will provide sources
        sourcesCount: 0,
        images: const [],
      ));
      _isSearching = false;
      _isReading = false;
      _searchQueries.clear();
    });

    // Create request with full conversation history
    // Let backend decide all workflow constraints, configs, and styles
    debugPrint(
        '[ConversationScreen] _sendMessage - chatMode: $_chatMode, isManager: ${widget.isManager}, planDate: ${widget.planDate}');

    // Use the appropriate stream based on mode
    // StoreMind: Manager mode routes to multi-agent council with plan context
    final Stream<ChatStreamEvent> stream;
    if (widget.isManager && widget.planDate != null) {
      // StoreMind Manager mode - use multi-agent council with plan context
      debugPrint('[ConversationScreen] Using StoreMind streamManagerChat');
      stream = _chatRepository.streamManagerChat(
        message: query,
        planDate: widget.planDate!,
      );
    } else {
      // StoreMind: Staff mode - routes to Stocker agent
      debugPrint('[ConversationScreen] Using StoreMind streamStaffChat');
      stream = _chatRepository.streamStaffChat(
        message: query,
      );
    }

    _streamSubscription = stream.listen(
      (event) {
        if (event is DataEvent) {
          _handleStreamData(event.data);
        } else if (event is ErrorEvent) {
          _handleStreamError(event.message);
        } else if (event is DoneEvent) {
          _handleStreamDone();
        }
      },
      onError: (error) {
        final errorStr = error.toString();
        if (errorStr.contains('Connection refused') ||
            errorStr.contains('connection error')) {
          // Show error in chat instead of simulating
          if (_currentStreamingMessageId != null) {
            final messageIndex =
                _messages.indexWhere((m) => m.id == _currentStreamingMessageId);
            if (messageIndex != -1) {
              setState(() {
                _messages[messageIndex] = ConversationMessage(
                  id: _messages[messageIndex].id,
                  content:
                      'Connection failed. Please check your internet connection.',
                  role: _messages[messageIndex].role,
                  isStreaming: false,
                  isError: true,
                  images: _messages[messageIndex].images,
                );
                _currentStreamingMessageId = null;
              });
            }
          }
        } else {
          // Update current streaming message with error
          if (_currentStreamingMessageId != null) {
            final messageIndex =
                _messages.indexWhere((m) => m.id == _currentStreamingMessageId);
            if (messageIndex != -1) {
              setState(() {
                _messages[messageIndex] = ConversationMessage(
                  id: _messages[messageIndex].id,
                  content: error.toString(),
                  role: _messages[messageIndex].role,
                  isStreaming: false,
                  isError: true,
                  images: _messages[messageIndex].images,
                );
                _currentStreamingMessageId = null;
              });
            }
          }
        }
      },
      onDone: () {
        // Stream closed - ensure we finalize the message if not already done
        // This is a safety net in case DoneEvent wasn't received
        if (_currentStreamingMessageId != null && mounted) {
          _handleStreamDone();
        }
      },
    );
  }

  void _handleStreamData(Map<String, dynamic> data) {
    if (_currentStreamingMessageId == null) return;

    final messageIndex =
        _messages.indexWhere((m) => m.id == _currentStreamingMessageId);
    if (messageIndex == -1) return;

    // Handle response started flag (from begin-stream event)
    if (data.containsKey('response_started')) {
      setState(() {
        _isSearching = false;
        _isReading = false;
        // Reset tool calls and plan update state for new stream
        _activeToolCalls = [];
        _updatedPlan = null;
        _actionModified = null;
        _planWasUpdated = false;
      });
    }

    // Handle error events
    if (data.containsKey('error')) {
      final errorMessage = data['error'] as String?;
      _handleStreamError(errorMessage ?? 'An unknown error occurred');
      return;
    }

    // Handle tool call events
    if (data.containsKey('tool_call')) {
      final toolCall = data['tool_call'] as Map<String, dynamic>?;
      if (toolCall != null) {
        setState(() {
          _currentToolName = toolCall['tool_name'] as String?;
          _currentAgentName =
              toolCall['agent_name'] as String? ?? _currentAgentName;
          _isToolRunning = true;
          // Add to active tool calls
          _activeToolCalls.add({
            ...toolCall,
            'is_running': true,
          });
        });
        debugPrint(
            '[SSE] Tool call: ${toolCall['tool_name']} by ${toolCall['agent_name']}');
      }
    }

    // Handle tool result events
    // NOTE: Backend never emits tool-result events (uses agent-read-results
    // instead). Tool completion is detected implicitly when text content
    // arrives after tool calls.

    // Handle agent end events — latency logging only.
    // Full handling (storing full_content, marking steps) is done in
    // _handleAgentResponse → case 'agent-end'.
    if (data.containsKey('agent_end')) {
      final agentEnd = data['agent_end'] as Map<String, dynamic>?;
      if (agentEnd != null) {
        final latencyMs = agentEnd['latency_ms'];
        debugPrint(
            '[SSE] Agent ${agentEnd['agent_name']} ended (${latencyMs}ms)');
      }
    }

    // Handle plan update from stream-end
    if (data.containsKey('plan_updated') && data['plan_updated'] == true) {
      setState(() {
        _planWasUpdated = true;
        _updatedPlan = data['updated_plan'] as Map<String, dynamic>?;
        _actionModified = data['action_modified'] as String?;
      });
      debugPrint('[SSE] Plan was updated! Action modified: $_actionModified');
    }

    if (data.containsKey('agent_response')) {
      final agentResponse = data['agent_response'] as Map<String, dynamic>?;
      if (agentResponse != null) {
        _handleAgentResponse(agentResponse);
      }
    }

    if (data.containsKey('content')) {
      final content = data['content'] as String?;
      if (content != null && content.isNotEmpty) {
        // If this content came from a stream-end event (fallback reply),
        // only use it if no streaming content was received yet.
        // This prevents duplicating text that was already streamed via
        // text-chunk events.
        final isStreamDone = data['_stream_done'] == true;
        final currentMessage = _messages[messageIndex];
        if (isStreamDone && currentMessage.content.isNotEmpty) {
          debugPrint(
            '[SSE] Skipping stream-end content (already have streaming content)',
          );
        } else {
          setState(() {
            _messages[messageIndex] = ConversationMessage(
              id: currentMessage.id,
              content: currentMessage.content + content,
              role: currentMessage.role,
              isStreaming: true,
              relatedQueries: currentMessage.relatedQueries,
              sourcesCount: currentMessage.sourcesCount,
              sources: currentMessage.sources,
              agentSteps: currentMessage.agentSteps,
              queryPlan: currentMessage.queryPlan,
              images: currentMessage.images,
              planUpdated: _planWasUpdated,
              actionModified: _actionModified,
            );
            _isSearching = false;
            _isReading = false;

            // Auto-complete tool steps when content arrives
            // (Backend doesn't send tool-result events - tool completion is
            // implicit when the agent starts responding with text)
            if (_isToolRunning) {
              _isToolRunning = false;
              _currentToolName = null;
              // Mark all tool/searching steps as done
              for (int i = 0; i < _currentAgentSteps.length; i++) {
                final step = _currentAgentSteps[i];
                if (step.status == AgentStepStatus.searching ||
                    step.status == AgentStepStatus.pending) {
                  _currentAgentSteps[i] = step.copyWith(
                    status: AgentStepStatus.done,
                  );
                }
              }
              _updateMessageAgentSteps(messageIndex);
            }
          });
          _scrollToBottom();
        }
      }
    }

    if (data.containsKey('sources')) {
      final sources = data['sources'] as List?;
      if (sources != null) {
        setState(() {
          final currentMessage = _messages[messageIndex];
          final mergedSources =
              _dedupeSources([...(currentMessage.sources ?? []), ...sources]);
          _messages[messageIndex] = ConversationMessage(
            id: currentMessage.id,
            content: currentMessage.content,
            role: currentMessage.role,
            isStreaming: currentMessage.isStreaming,
            relatedQueries: currentMessage.relatedQueries,
            sourcesCount: mergedSources.length,
            sources: mergedSources,
            agentSteps: currentMessage.agentSteps,
            queryPlan: currentMessage.queryPlan,
            images: currentMessage.images,
            planUpdated: currentMessage.planUpdated,
            actionModified: currentMessage.actionModified,
          );
        });
      }
    }

    if (data.containsKey('images')) {
      final images = data['images'] as List?;
      if (images != null) {
        setState(() {
          final currentMessage = _messages[messageIndex];
          final newImages = images.cast<String>();
          final mergedImages = [..._currentImages, ...newImages];
          _currentImages = mergedImages.toSet().toList(); // Dedupe images

          _messages[messageIndex] = ConversationMessage(
            id: currentMessage.id,
            content: currentMessage.content,
            role: currentMessage.role,
            isStreaming: currentMessage.isStreaming,
            relatedQueries: currentMessage.relatedQueries,
            sourcesCount: currentMessage.sourcesCount,
            sources: currentMessage.sources,
            agentSteps: currentMessage.agentSteps,
            queryPlan: currentMessage.queryPlan,
            images: List.from(_currentImages),
            planUpdated: currentMessage.planUpdated,
            actionModified: currentMessage.actionModified,
          );
        });
      }
    }

    if (data.containsKey('related_queries')) {
      final queries = data['related_queries'] as List?;
      if (queries != null && queries.isNotEmpty) {
        setState(() {
          final currentMessage = _messages[messageIndex];
          _messages[messageIndex] = ConversationMessage(
            id: currentMessage.id,
            content: currentMessage.content,
            role: currentMessage.role,
            isStreaming: currentMessage.isStreaming,
            relatedQueries: queries.cast<String>(),
            sourcesCount: currentMessage.sourcesCount,
            // Preserve already merged sources so the bottom sheet has data.
            sources: currentMessage.sources,
            agentSteps: currentMessage.agentSteps,
            queryPlan: currentMessage.queryPlan,
            images: currentMessage.images,
            planUpdated: currentMessage.planUpdated,
            actionModified: currentMessage.actionModified,
          );
        });
      }
    }
  }

  void _handleAgentResponse(Map<String, dynamic> agentResponse) {
    if (_currentStreamingMessageId == null) return;

    final messageIndex =
        _messages.indexWhere((m) => m.id == _currentStreamingMessageId);
    if (messageIndex == -1) return;

    final eventType = agentResponse['event_type'] as String?;

    // Handle different agent event types
    switch (eventType) {
      case 'agent-query-plan':
        final steps = agentResponse['steps'] as List?;
        if (steps != null && steps.isNotEmpty) {
          setState(() {
            _currentQueryPlan = steps.cast<String>();
            // Initialize agent steps from query plan
            _currentAgentSteps = steps.asMap().entries.map((entry) {
              return AgentStep(
                stepNumber: entry.key,
                title: entry.value.toString(),
                status: entry.key == 0
                    ? AgentStepStatus.searching
                    : AgentStepStatus.pending,
              );
            }).toList();
            _updateMessageAgentSteps(messageIndex);
          });
        }
        break;

      case 'agent-plan-delta':
        final steps = agentResponse['steps'] as List?;
        if (steps != null && steps.isNotEmpty) {
          setState(() {
            final newSteps = steps.cast<String>();

            // Append to existing plan
            if (_currentQueryPlan == null) {
              _currentQueryPlan = newSteps;
            } else {
              _currentQueryPlan!.addAll(newSteps);
            }

            // Append to agent steps
            final startIdx = _currentAgentSteps.length;
            final newAgentSteps = newSteps.asMap().entries.map((entry) {
              return AgentStep(
                stepNumber: startIdx + entry.key,
                title: entry.value.toString(),
                status: AgentStepStatus.pending,
              );
            }).toList();

            _currentAgentSteps.addAll(newAgentSteps);
            _updateMessageAgentSteps(messageIndex);
          });
        }
        break;

      case 'agent-search-queries':
        final queries = agentResponse['queries'] as List?;
        final stepNumber = agentResponse['step_number'] as int? ?? 0;
        if (queries != null && queries.isNotEmpty) {
          setState(() {
            _isSearching = true;
            _isReading = false;
            _searchQueries.clear();
            _searchQueries.addAll(queries.cast<String>());

            // Update or create the step
            _updateAgentStep(
              stepNumber,
              queries: queries.cast<String>(),
              status: AgentStepStatus.searching,
            );
            _updateMessageAgentSteps(messageIndex);
          });
        }
        break;

      case 'agent-read-results':
        final stepsDetails = agentResponse['steps_details'] as List?;
        final stepNumber = agentResponse['step_number'] as int? ?? 0;
        if (stepsDetails != null && stepsDetails.isNotEmpty) {
          final latestStep = stepsDetails.last as Map<String, dynamic>;
          final results = latestStep['results'] as List?;
          if (results != null && results.isNotEmpty) {
            setState(() {
              _isSearching = false;
              _isReading = true;

              // Get existing results for this step to merge with
              List<AgentStepResult> existingResults = [];
              if (_currentAgentSteps.length > stepNumber) {
                existingResults = _currentAgentSteps[stepNumber].results;
              }

              // Convert new results to AgentStepResult
              final newStepResults = results.whereType<Map>().map((r) {
                final url = r['url']?.toString() ?? '';
                return AgentStepResult(
                  title: r['title']?.toString() ?? 'Source',
                  url: url,
                  content: r['content']?.toString(),
                  favicon: url.isNotEmpty ? _getFaviconUrl(url) : null,
                );
              }).toList();

              // Merge and deduplicate results
              final Map<String, AgentStepResult> mergedMap = {};
              for (var result in existingResults) {
                mergedMap[result.url] = result;
              }
              for (var result in newStepResults) {
                mergedMap[result.url] = result;
              }
              final mergedResults = mergedMap.values.toList();

              _readingCount = mergedResults.length;

              _updateAgentStep(
                stepNumber,
                results: mergedResults,
                status: AgentStepStatus.reading,
              );
              _updateMessageAgentSteps(messageIndex);
            });
          }
        }
        break;

      case 'agent-understand-results':
        final thought = agentResponse['thought'] as String?;
        final stepNumber = agentResponse['step_number'] as int? ?? 0;
        if (thought != null && thought.isNotEmpty) {
          setState(() {
            // Check if we need to append
            String currentThought = '';
            if (_currentAgentSteps.length > stepNumber) {
              currentThought = _currentAgentSteps[stepNumber].thought ?? '';
            }

            _updateAgentStep(
              stepNumber,
              thought: currentThought + thought,
              status: AgentStepStatus.thinking,
              // Using reading for now as it usually happens during analysis
            );
            _updateMessageAgentSteps(messageIndex);
          });
        }
        break;

      case 'agent-finish':
        setState(() {
          _isSearching = false;
          _isReading = false;
          // Mark all steps as done
          _currentAgentSteps = _currentAgentSteps.map((step) {
            return step.copyWith(status: AgentStepStatus.done);
          }).toList();
          _updateMessageAgentSteps(messageIndex);
        });
        break;

      case 'search-results':
        final stepsDetails = agentResponse['steps_details'] as List?;
        final stepNumber = agentResponse['step_number'] as int? ?? 0;
        if (stepsDetails != null && stepsDetails.isNotEmpty) {
          final latestStep = stepsDetails.last as Map<String, dynamic>;
          final results = latestStep['results'] as List?;
          if (results != null && results.isNotEmpty) {
            setState(() {
              _isSearching = false;
              _isReading = true;

              // Get existing results for this step to merge with
              List<AgentStepResult> existingResults = [];
              if (_currentAgentSteps.length > stepNumber) {
                existingResults = _currentAgentSteps[stepNumber].results;
              }

              // Convert new results to AgentStepResult
              final newStepResults = results.whereType<Map>().map((r) {
                final url = r['url']?.toString() ?? '';
                return AgentStepResult(
                  title: r['title']?.toString() ?? 'Source',
                  url: url,
                  content: r['content']?.toString(),
                  favicon: url.isNotEmpty ? _getFaviconUrl(url) : null,
                );
              }).toList();

              // Merge and deduplicate results
              final Map<String, AgentStepResult> mergedMap = {};
              for (var result in existingResults) {
                mergedMap[result.url] = result;
              }
              for (var result in newStepResults) {
                mergedMap[result.url] = result;
              }
              final mergedResults = mergedMap.values.toList();

              _readingCount = mergedResults.length;

              _updateAgentStep(
                stepNumber,
                results: mergedResults,
                status: AgentStepStatus.reading,
              );
              _updateMessageAgentSteps(messageIndex);
            });
          }
        }
        break;

      case 'agent-call-tool':
        final stepsDetails = agentResponse['steps_details'] as List?;
        final stepNumber = agentResponse['step_number'] as int? ?? 0;
        if (stepsDetails != null && stepsDetails.isNotEmpty) {
          final latestStep = stepsDetails.last as Map<String, dynamic>;
          final stepName = latestStep['step'] as String? ?? 'Processing';

          setState(() {
            _updateAgentStep(
              stepNumber,
              thought:
                  stepName, // Use thought field to show the "Processing" action
              status: AgentStepStatus.pending,
            );
            _updateMessageAgentSteps(messageIndex);
          });
        }
        break;

      // StoreMind multi-agent council events
      case 'agent-step':
        final stepsDetails = agentResponse['steps_details'] as List?;
        final stepNumber = agentResponse['step_number'] as int? ?? 0;
        final agentName = agentResponse['agent_name'] as String? ?? 'Agent';

        if (stepsDetails != null && stepsDetails.isNotEmpty) {
          final latestStep = stepsDetails.last as Map<String, dynamic>;
          final stepTitle = latestStep['step'] as String? ?? agentName;
          final thought = latestStep['thought'] as String?;
          final status = latestStep['status'] as String?;

          setState(() {
            // Determine agent step status
            AgentStepStatus stepStatus;
            switch (status) {
              case 'current':
                stepStatus = AgentStepStatus.thinking;
                break;
              case 'completed':
                stepStatus = AgentStepStatus.done;
                break;
              default:
                stepStatus = AgentStepStatus.pending;
            }

            _updateAgentStep(
              stepNumber,
              thought: thought,
              status: stepStatus,
            );

            // Also update the step title if we have one
            if (_currentAgentSteps.length > stepNumber) {
              _currentAgentSteps[stepNumber] =
                  _currentAgentSteps[stepNumber].copyWith(title: stepTitle);
            }

            _updateMessageAgentSteps(messageIndex);
          });
        }
        break;

      // ═══════════════════════════════════════════════════════════════════════
      // NEW SSE STREAMING EVENTS (Token-by-token streaming support)
      // ═══════════════════════════════════════════════════════════════════════

      case 'agent-start':
        // Agent begins responding - create agent step for beautiful dropdown
        final agentName = agentResponse['agent_name'] as String?;
        final role = agentResponse['role'] as String?;
        setState(() {
          _currentAgentName = agentName;
          _currentAgentRole = role;
          _isAgentThinking = true;
          _thinkingContent = '';
          _isToolRunning = false;
          _currentToolName = null;

          // Create initial agent step so ExpertSearchPreview renders
          final stepIndex = _currentAgentSteps.length;
          _updateAgentStep(
            stepIndex,
            title: '${agentName ?? 'Agent'} is thinking...',
            status: AgentStepStatus.thinking,
            agentName: agentName,
            agentRole: role,
          );
          _updateMessageAgentSteps(messageIndex);
        });
        debugPrint('[SSE] Agent started: $agentName ($role)');
        break;

      case 'agent-thinking':
        // Chain-of-thought content streaming - accumulate thinking
        final content = agentResponse['content'] as String?;
        final agentName = agentResponse['agent_name'] as String?;
        if (content != null && content.isNotEmpty) {
          setState(() {
            _currentAgentName = agentName ?? _currentAgentName;
            _isAgentThinking = true;
            _thinkingContent += content;

            // Update Agent Steps for history
            // Find the last step that belongs to this agent and is still thinking
            int stepIndex = -1;
            for (int i = _currentAgentSteps.length - 1; i >= 0; i--) {
              if (_currentAgentSteps[i].agentName == _currentAgentName &&
                  _currentAgentSteps[i].status == AgentStepStatus.thinking) {
                stepIndex = i;
                break;
              }
            }
            if (stepIndex < 0) {
              stepIndex = _currentAgentSteps.length; // New step
            }

            _updateAgentStep(
              stepIndex,
              title: '考え中…',
              thought: (_currentAgentSteps.length > stepIndex
                      ? (_currentAgentSteps[stepIndex].thought ?? '')
                      : '') +
                  content,
              status: AgentStepStatus.thinking,
              agentName: _currentAgentName,
            );
            _updateMessageAgentSteps(messageIndex);
          });
        }
        break;

      case 'agent-end':
        // Agent finished responding - store full_content and mark steps as done
        final agentName = agentResponse['agent_name'] as String?;
        final fullContent = agentResponse['full_content'] as String?;
        debugPrint('[SSE] Agent ended: $agentName');
        setState(() {
          _isAgentThinking = false;
          _thinkingContent = '';

          // If this agent has reasoning content, store it in the first
          // thinking step so it's visible in the thinking dropdown/bottom sheet
          if (fullContent != null && fullContent.trim().isNotEmpty) {
            // Clean status/thinking tags from full_content for display
            final cleanContent =
                StringUtils.stripInternalTags(fullContent).trim();

            if (cleanContent.isNotEmpty) {
              // Find the thinking step for THIS agent specifically
              int thinkingStepIdx = _currentAgentSteps.indexWhere(
                (s) =>
                    s.agentName == agentName &&
                    s.status == AgentStepStatus.thinking,
              );
              if (thinkingStepIdx < 0) {
                // Fallback: find ANY step belonging to this agent
                thinkingStepIdx = _currentAgentSteps.lastIndexWhere(
                  (s) => s.agentName == agentName,
                );
              }
              if (thinkingStepIdx >= 0) {
                final existingThought =
                    _currentAgentSteps[thinkingStepIdx].thought;
                // Only overwrite if there was no agent-thinking content already
                if (existingThought == null || existingThought.isEmpty) {
                  _currentAgentSteps[thinkingStepIdx] =
                      _currentAgentSteps[thinkingStepIdx].copyWith(
                    thought: cleanContent,
                  );
                }
              }
            }
          }

          // Mark only steps belonging to THIS agent as done (not all steps)
          for (int i = 0; i < _currentAgentSteps.length; i++) {
            if (_currentAgentSteps[i].agentName == agentName &&
                _currentAgentSteps[i].status != AgentStepStatus.done) {
              _currentAgentSteps[i] = _currentAgentSteps[i].copyWith(
                status: AgentStepStatus.done,
              );
            }
          }
          _updateMessageAgentSteps(messageIndex);
        });
        break;

      case 'tool-call':
        // Agent is calling a tool - show tool indicator in beautiful dropdown
        final toolName = agentResponse['tool_name'] as String?;
        final agentName = agentResponse['agent_name'] as String?;

        // Format tool name nicely (remove prefixes and convert to readable)
        String formattedTool = toolName ?? 'Tool';
        if (formattedTool.contains('-')) {
          formattedTool = formattedTool.split('-').last;
        }
        formattedTool = formattedTool
            .replaceAllMapped(
              RegExp(r'([A-Z])'),
              (m) => ' ${m.group(1)}',
            )
            .trim();

        setState(() {
          _currentToolName = toolName;
          _currentAgentName = agentName ?? _currentAgentName;
          _isToolRunning = true;

          // Create new step for tool use - use searching status for active animation
          final stepIndex = _currentAgentSteps.length;
          _updateAgentStep(
            stepIndex,
            title: '$formattedTool を使用中…',
            toolName: toolName,
            status:
                AgentStepStatus.searching, // Use searching for active shimmer
            agentName: _currentAgentName,
          );
          _updateMessageAgentSteps(messageIndex);
        });
        debugPrint('[SSE] Tool call: $toolName by $agentName');
        break;

      // NOTE: 'tool-result' case intentionally omitted — backend never emits
      // tool-result events. Tool completion is detected implicitly when text
      // content arrives after tool calls (see _handleStreamData).

      default:
        // Fallback to legacy handling for backward compatibility
        final stepsDetails = agentResponse['steps_details'] as List?;
        if (stepsDetails != null && stepsDetails.isNotEmpty) {
          final latestStep = stepsDetails.last as Map<String, dynamic>;
          final status = latestStep['status'] as String?;

          if (status == 'current') {
            final queries = latestStep['queries'] as List?;
            final results = latestStep['results'] as List?;

            if (queries != null && queries.isNotEmpty) {
              setState(() {
                _isSearching = true;
                _isReading = false;
                _searchQueries.clear();
                _searchQueries.addAll(queries.cast<String>());
              });
            }

            if (results != null && results.isNotEmpty) {
              setState(() {
                _isSearching = false;
                _isReading = true;
                _readingCount = results.length;
              });
            }
          }
        }
    }
  }

  void _updateAgentStep(
    int stepNumber, {
    String? title,
    List<String>? queries,
    List<AgentStepResult>? results,
    AgentStepStatus? status,
    String? thought,
    String? toolName,
    String? toolArgs,
    String? toolResult,
    String? agentName,
    String? agentRole,
  }) {
    // Ensure we have enough steps
    while (_currentAgentSteps.length <= stepNumber) {
      _currentAgentSteps.add(AgentStep(
        stepNumber: _currentAgentSteps.length,
        title: _currentQueryPlan != null &&
                _currentQueryPlan!.length > _currentAgentSteps.length
            ? _currentQueryPlan![_currentAgentSteps.length]
            : 'ステップ ${_currentAgentSteps.length + 1}',
      ));
    }

    final currentStep = _currentAgentSteps[stepNumber];
    _currentAgentSteps[stepNumber] = currentStep.copyWith(
      title: title ?? currentStep.title,
      queries: queries ?? currentStep.queries,
      results: results ?? currentStep.results,
      status: status ?? currentStep.status,
      thought: thought ?? currentStep.thought,
      toolName: toolName ?? currentStep.toolName,
      toolArgs: toolArgs ?? currentStep.toolArgs,
      toolResult: toolResult ?? currentStep.toolResult,
      agentName: agentName ?? currentStep.agentName,
      agentRole: agentRole ?? currentStep.agentRole,
    );

    // Mark previous steps as done
    for (int i = 0; i < stepNumber; i++) {
      if (_currentAgentSteps[i].status != AgentStepStatus.done) {
        _currentAgentSteps[i] = _currentAgentSteps[i].copyWith(
          status: AgentStepStatus.done,
        );
      }
    }
  }

  void _updateMessageAgentSteps(int messageIndex) {
    if (messageIndex < 0 || messageIndex >= _messages.length) return;

    final currentMessage = _messages[messageIndex];
    // Aggregate sources from all steps (replaces, not merges, to prevent
    // duplicate accumulation since this method is called on every step change)
    final allStepResults = _currentAgentSteps
        .expand((step) => step.results)
        .map((result) => {
              'title': result.title,
              'url': result.url,
              'content': result.content,
              'favicon': result.favicon,
            })
        .toList();

    // Merge with any sources that came from 'sources' key (not from steps)
    // Use step results as the authoritative source list
    final mergedSources = _dedupeSources(allStepResults);

    _messages[messageIndex] = ConversationMessage(
      id: currentMessage.id,
      content: currentMessage.content,
      role: currentMessage.role,
      isStreaming: currentMessage.isStreaming,
      relatedQueries: currentMessage.relatedQueries,
      sourcesCount: mergedSources.length,
      sources: mergedSources,
      agentSteps: List.from(_currentAgentSteps),
      queryPlan: _currentQueryPlan,
      images: currentMessage.images,
    );
  }

  String _getFaviconUrl(String url) {
    try {
      if (url.startsWith('rag://')) return '';

      final uri = Uri.parse(url);
      if (uri.scheme != 'http' && uri.scheme != 'https') return '';

      return 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${Uri.encodeComponent(url)}&size=128';
    } catch (_) {
      return '';
    }
  }

  void _handleStreamError(String message) {
    if (_currentStreamingMessageId != null) {
      final messageIndex =
          _messages.indexWhere((m) => m.id == _currentStreamingMessageId);
      if (messageIndex != -1) {
        setState(() {
          _messages[messageIndex] = ConversationMessage(
            id: _messages[messageIndex].id,
            content: message.replaceFirst('Stream error: ', ''),
            role: _messages[messageIndex].role,
            isStreaming: false,
            isError: true,
          );
          _isSearching = false;
          _isReading = false;
          _currentStreamingMessageId = null;
        });
      }
    }
  }

  void _handleStreamDone() {
    if (_currentStreamingMessageId == null) return;

    final messageIndex =
        _messages.indexWhere((m) => m.id == _currentStreamingMessageId);
    if (messageIndex == -1) return;

    setState(() {
      _isSearching = false;
      _isReading = false;
      _isAgentThinking = false;
      _isToolRunning = false;
      _currentToolName = null;

      // Mark message as no longer streaming, preserve agent steps and plan update info
      final currentMessage = _messages[messageIndex];
      _messages[messageIndex] = ConversationMessage(
        id: currentMessage.id,
        content: currentMessage.content,
        role: currentMessage.role,
        isStreaming: false,
        relatedQueries: currentMessage.relatedQueries,
        sourcesCount: currentMessage.sourcesCount,
        sources: currentMessage.sources,
        agentSteps: currentMessage.agentSteps,
        queryPlan: currentMessage.queryPlan,
        images: currentMessage.images,
        planUpdated: _planWasUpdated,
        actionModified: _actionModified,
      );

      // Add assistant response to conversation history
      if (currentMessage.content.isNotEmpty) {
        final assistantMessage = ChatMessage(
          content: currentMessage.content,
          role: MessageRole.assistant,
          relatedQueries: currentMessage.relatedQueries,
        );
        _conversationHistory.add(assistantMessage);
      }

      _currentStreamingMessageId = null;

      // Clear tool calls after stream ends
      _activeToolCalls = [];
    });
  }

  void _stopGeneration() {
    _streamSubscription?.cancel();

    setState(() {
      // Defensively clear streaming state for ALL messages to prevent "infinite shimmer"
      // if the ID tracking got out of sync.
      for (int i = 0; i < _messages.length; i++) {
        if (_messages[i].isStreaming) {
          final msg = _messages[i];
          _messages[i] = ConversationMessage(
            id: msg.id,
            content: msg.content,
            role: msg.role,
            isStreaming: false,
            relatedQueries: msg.relatedQueries,
            sourcesCount: msg.sourcesCount,
            sources: msg.sources,
            agentSteps: msg.agentSteps,
            queryPlan: msg.queryPlan,
            images: msg.images,
          );
        }
      }

      _currentStreamingMessageId = null;
      _isSearching = false;
      _isReading = false;
    });
  }

  void _handleSendMessage() {
    final query = _inputController.text.trim();
    if (query.isEmpty) return;

    HapticFeedback.mediumImpact();
    _inputController.clear();
    FocusScope.of(context).unfocus();
    _sendMessage(query);

    // Auto scroll to bottom after sending
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _scrollToBottom(force: true);
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: () {
        // Dismiss keyboard when tapping outside input field
        _inputFocusNode.unfocus();
      },
      child: Scaffold(
        backgroundColor:
            isDark ? DesignSystem.backgroundDark : DesignSystem.backgroundLight,
        body: SafeArea(
          child: Stack(
            children: [
              Column(
                children: [
                  _buildAppBar(context, isDark),
                  Expanded(
                    child: _showImagesView
                        ? _buildImagesView(isDark)
                        : SingleChildScrollView(
                            controller: _scrollController,
                            padding: const EdgeInsets.only(bottom: 80),
                            child: ConstrainedBox(
                              constraints: BoxConstraints(
                                minWidth: MediaQuery.of(context).size.width,
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  // Display all messages in conversation
                                  ..._messages.map((message) =>
                                      _buildMessage(message, isDark)),
                                  const SizedBox(height: 20),
                                ],
                              ),
                            ),
                          ),
                  ),
                  if (!_showImagesView)
                    ConversationInput(
                      isDark: isDark,
                      controller: _inputController,
                      focusNode: _inputFocusNode,
                      chatMode: _chatMode,
                      isStreaming: _currentStreamingMessageId != null,
                      hasCustomSelection: _sourceService.hasCustomSelection,
                      onSend: _handleSendMessage,
                      onStop: _stopGeneration,
                      onOpenSourceSelector: () {
                        HapticFeedback.lightImpact();
                        _openSourceSelector(isDark);
                      },
                      onAttach: () {
                        HapticFeedback.lightImpact();
                        _showAttachmentOptions();
                      },
                      onChangeModel: () {},
                      onModeChanged: (mode) {
                        debugPrint(
                            '[ConversationScreen] onModeChanged - from: $_chatMode to: $mode');
                        setState(() {
                          _chatMode = mode;
                        });
                      },
                    ),
                ],
              ),
              if (_showScrollDownButton && !_showImagesView)
                Positioned(
                  right: 16,
                  bottom: 100,
                  child: _buildScrollDownButton(isDark),
                ),
            ],
          ),
        ),
      ),
    );
  }

  void _showAttachmentOptions() {
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
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Sources',
                        style: DesignSystem.titleMedium.copyWith(
                          color: isDark
                              ? DesignSystem.textPrimaryDark
                              : DesignSystem.textPrimaryLight,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      GestureDetector(
                        onTap: () => Navigator.pop(context),
                        child: Icon(
                          Icons.close,
                          color: isDark
                              ? DesignSystem.textSecondaryDark
                              : DesignSystem.textSecondaryLight,
                          size: 20,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildAttachmentOption(
                        icon: Icons.image_outlined,
                        label: '画像',
                        isDark: isDark,
                        onTap: () {},
                      ),
                      _buildAttachmentOption(
                        icon: Icons.camera_alt_outlined,
                        label: 'カメラ',
                        isDark: isDark,
                        onTap: () {},
                      ),
                      _buildAttachmentOption(
                        icon: Icons.description_outlined,
                        label: 'ファイル',
                        isDark: isDark,
                        onTap: () {},
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildAttachmentOption({
    required IconData icon,
    required String label,
    required bool isDark,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: () {
        Navigator.pop(context);
        onTap();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('$label coming soon')),
        );
      },
      child: Column(
        children: [
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              color: isDark ? const Color(0xFF2C2C2C) : const Color(0xFFF5F5F5),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Center(
              child: Icon(
                icon,
                size: 32,
                color: isDark
                    ? DesignSystem.textPrimaryDark
                    : DesignSystem.textPrimaryLight,
              ),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            label,
            style: DesignSystem.bodySmall.copyWith(
              color: isDark
                  ? DesignSystem.textSecondaryDark
                  : DesignSystem.textSecondaryLight,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAppBar(BuildContext context, bool isDark) {
    // Collect all images from messages
    final allImages = <String>[];
    for (final message in _messages) {
      if (message.images != null && message.images!.isNotEmpty) {
        allImages.addAll(message.images!);
      }
    }
    final hasImages = allImages.isNotEmpty;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: [
          GestureDetector(
            onTap: () {
              HapticFeedback.lightImpact();
              context.pop();
            },
            child: Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isDark
                    ? DesignSystem.backgroundDarkElevated
                    : DesignSystem.backgroundLightElevated,
              ),
              child: Icon(
                Icons.arrow_back,
                size: 20,
                color: isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
              ),
            ),
          ),
          const Spacer(),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            decoration: BoxDecoration(
              color: isDark
                  ? DesignSystem.backgroundDarkElevated
                  : DesignSystem.backgroundLightElevated,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (hasImages) ...[
                  GestureDetector(
                    onTap: () {
                      HapticFeedback.lightImpact();
                      setState(() {
                        _showImagesView = !_showImagesView;
                      });
                    },
                    child: Container(
                      padding: const EdgeInsets.all(4),
                      decoration: _showImagesView
                          ? BoxDecoration(
                              color: DesignSystem.primaryCyan.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(8),
                            )
                          : null,
                      child: Icon(
                        Icons.image_outlined,
                        size: 20,
                        color: _showImagesView
                            ? DesignSystem.primaryCyan
                            : (isDark
                                ? DesignSystem.iconDark
                                : DesignSystem.iconLight),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                ],
                // Icon(
                //   Icons.ios_share,
                //   size: 20,
                //   color:
                //       isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
                // ),
                // const SizedBox(width: 16),
                // Icon(
                //   Icons.bookmark_outline,
                //   size: 20,
                //   color:
                //       isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
                // ),
                // const SizedBox(width: 16),
                // Icon(
                //   Icons.more_horiz,
                //   size: 20,
                //   color:
                //       isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
                // ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessage(ConversationMessage message, bool isDark) {
    final sourceCount = _sourceCountForMessage(message);

    if (message.role == MessageRole.user) {
      return UserMessage(
        message: message,
        isDark: isDark,
      );
    }

    // Check if this is the currently streaming message
    final isCurrentlyStreaming = message.id == _currentStreamingMessageId;

    return AssistantMessage(
      message: message,
      isDark: isDark,
      sourceCount: sourceCount,
      onSourcesTap: (filterIndices) {
        _showSourcesBottomSheet(
          context,
          message.sources,
          sourceCount,
          isDark,
          filterIndices: filterIndices,
        );
      },
      onRelatedQuestionTap: _sendMessage,
      isSearching: _isSearching,
      isReading: _isReading,
      readingCount: _readingCount,
      searchQueries: _searchQueries,
      onRetry: () => _handleRetry(message.id),
      // New SSE streaming state for agent activity indicator
      currentAgentName: isCurrentlyStreaming ? _currentAgentName : null,
      currentAgentRole: isCurrentlyStreaming ? _currentAgentRole : null,
      isAgentThinking: isCurrentlyStreaming && _isAgentThinking,
      thinkingContent: isCurrentlyStreaming ? _thinkingContent : null,
      currentToolName: isCurrentlyStreaming ? _currentToolName : null,
      isToolRunning: isCurrentlyStreaming && _isToolRunning,
      // Plan update callback for Manager mode
      onPlanUpdateTap:
          message.planUpdated ? () => _handlePlanUpdateTap() : null,
    );
  }

  void _handlePlanUpdateTap() {
    // Navigate back to show updated plan
    // The plan will be refreshed when the user goes back to the plan screen
    HapticFeedback.mediumImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(
              Icons.check_circle_outline_rounded,
              color: Colors.white,
              size: 20,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                _actionModified != null
                    ? 'Plan updated! Action $_actionModified was modified.'
                    : 'Plan has been updated.',
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ),
        backgroundColor: const Color(0xFF3B82F6),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: const EdgeInsets.all(16),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  void _handleRetry(String assistantMessageId) {
    // Find the assistant message index
    final index = _messages.indexWhere((m) => m.id == assistantMessageId);
    if (index == -1) return;

    // Find the preceding user message
    if (index > 0 && _messages[index - 1].role == MessageRole.user) {
      final userQuery = _messages[index - 1].content;

      // Remove the failed assistant message (and potentially the user message if we want to "animate" it again,
      // but usually we just replace the assistant message or restart stream).
      // Logic: _sendMessage appends a new assistant placeholder.
      // If we are retrying, we should probably remove the failed message and call _sendMessage.

      setState(() {
        _messages.removeAt(index);
      });

      _sendMessage(userQuery);
    }
  }

  int _sourceCountForMessage(ConversationMessage message) {
    // Prefer actual source list length, then provided count, otherwise 0.
    final listCount = message.sources?.length ?? 0;
    if (listCount > 0) return listCount;
    return message.sourcesCount ?? 0;
  }

  List<dynamic> _dedupeSources(List<dynamic> sources) {
    final Map<String, dynamic> seen = {};
    var fallbackIndex = 0;

    for (final source in sources) {
      String? url;
      String? title;
      dynamic storageSource = source;

      if (source is Map) {
        url = source['url']?.toString();
        title = source['title']?.toString();
      } else if (source is SearchResult) {
        url = source.url;
        title = source.title;
        storageSource = source.toJson(); // Normalize to Map for UI widgets
      }

      if (url != null && url.isNotEmpty) {
        // Normalize URL by removing trailing slash for better deduplication
        if (url.endsWith('/')) {
          url = url.substring(0, url.length - 1);
        }

        // Use composite key to allow same URL with different titles (e.g. different sections)
        // This prevents aggressive deduplication that breaks citation indices (e.g. [1], [2] pointing to same URL)
        final compositeKey = '$url|${title ?? ''}';

        // If we already have this exact source, only overwrite if the new one has a favicon and the old one doesn't
        if (seen.containsKey(compositeKey)) {
          final oldSource = seen[compositeKey];
          final oldFavicon = oldSource is Map ? oldSource['favicon'] : null;
          final newFavicon =
              storageSource is Map ? storageSource['favicon'] : null;

          if (oldFavicon == null && newFavicon != null) {
            seen[compositeKey] = storageSource;
          }
        } else {
          seen[compositeKey] = storageSource;
        }
        continue;
      }

      // For url-less entries, deduplicate by title+content composite key
      // (prevents tool results with null URLs from multiplying)
      String? content;
      if (source is Map) {
        title = source['title']?.toString();
        content = source['content']?.toString();
      }
      final fallbackKey = 'no-url|${title ?? ''}|${content ?? fallbackIndex}';
      if (!seen.containsKey(fallbackKey)) {
        seen[fallbackKey] = source;
      }
      fallbackIndex++;
    }

    return seen.values.toList();
  }

  void _showSourcesBottomSheet(
    BuildContext context,
    List<dynamic>? sources,
    int sourceCount,
    bool isDark, {
    List<int>? filterIndices,
  }) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => SourcesBottomSheet(
        sources: sources,
        sourceCount: sourceCount,
        isDark: isDark,
        filterIndices: filterIndices,
      ),
    );
  }

  Widget _buildImagesView(bool isDark) {
    // Collect all images from all messages
    final allImages = <String>[];
    for (final message in _messages) {
      if (message.images != null && message.images!.isNotEmpty) {
        allImages.addAll(message.images!);
      }
    }

    if (allImages.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.image_outlined,
              size: 64,
              color: isDark ? Colors.grey[600] : Colors.grey[400],
            ),
            const SizedBox(height: 16),
            Text(
              'No images yet',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w500,
                color: isDark ? Colors.grey[500] : Colors.grey[600],
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Images from the conversation will appear here',
              style: TextStyle(
                fontSize: 14,
                color: isDark ? Colors.grey[600] : Colors.grey[500],
              ),
            ),
          ],
        ),
      );
    }

    return GridView.builder(
      padding: const EdgeInsets.all(20),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        childAspectRatio: 1,
      ),
      itemCount: allImages.length,
      itemBuilder: (context, index) {
        return GestureDetector(
          onTap: () {
            _showFullImage(context, allImages[index], isDark);
          },
          child: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Image.network(
              allImages[index],
              fit: BoxFit.cover,
              loadingBuilder: (context, child, loadingProgress) {
                if (loadingProgress == null) return child;
                return Container(
                  color: isDark
                      ? const Color(0xFF2C2C2C)
                      : const Color(0xFFF5F5F5),
                  child: Center(
                    child: CircularProgressIndicator(
                      value: loadingProgress.expectedTotalBytes != null
                          ? loadingProgress.cumulativeBytesLoaded /
                              loadingProgress.expectedTotalBytes!
                          : null,
                      color: DesignSystem.primaryCyan,
                    ),
                  ),
                );
              },
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  color: isDark
                      ? const Color(0xFF2C2C2C)
                      : const Color(0xFFF5F5F5),
                  child: Icon(
                    Icons.broken_image_outlined,
                    size: 48,
                    color: isDark ? Colors.grey[600] : Colors.grey[400],
                  ),
                );
              },
            ),
          ),
        );
      },
    );
  }

  void _showFullImage(BuildContext context, String imageUrl, bool isDark) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => Scaffold(
          backgroundColor: Colors.black,
          appBar: AppBar(
            backgroundColor: Colors.transparent,
            elevation: 0,
            leading: IconButton(
              icon: const Icon(Icons.close, color: Colors.white),
              onPressed: () => Navigator.pop(context),
            ),
          ),
          body: Center(
            child: InteractiveViewer(
              child: Image.network(
                imageUrl,
                fit: BoxFit.contain,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildScrollDownButton(bool isDark) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        _scrollToBottom(force: true);
      },
      child: Container(
        width: 44,
        height: 44,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          color: isDark
              ? DesignSystem.backgroundDarkElevated
              : DesignSystem.backgroundLightElevated,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Icon(
          CupertinoIcons.arrow_down,
          color: isDark ? DesignSystem.iconDark : DesignSystem.iconLight,
          size: 24,
        ),
      ),
    );
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

    // Refresh UI to reflect changes made in the sheet
    if (mounted) setState(() {});
  }
}
