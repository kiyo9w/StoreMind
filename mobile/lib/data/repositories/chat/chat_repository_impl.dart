import 'dart:async';
import 'dart:convert';

import 'package:eventflux/eventflux.dart';
import 'package:flutter/foundation.dart';
import 'package:insider/configs/app_config.dart';
import 'package:insider/core/keys/app_keys.dart';
import 'package:insider/data/repositories/chat/chat_repository.dart';
import 'package:insider/features/chat/data/models/chat_models.dart';
import 'package:insider/utils/string_utils.dart';

import 'package:insider/injector/injector.dart';
import 'package:insider/services/local_storage_service/local_storage_service.dart';
import 'package:rest_client/rest_client.dart' as rc;
// ignore: depend_on_referenced_packages
import 'package:retrofit/retrofit.dart';

class ChatRepositoryImpl implements ChatRepository {
  ChatRepositoryImpl({
    required rc.WorkflowClient workflowClient,
  }) : _workflowClient = workflowClient;

  final rc.WorkflowClient _workflowClient;

  @override
  Stream<ChatStreamEvent> streamChat(ChatRequest request) {
    // Use unified chat completions endpoint for Simple QA
    return _handleStream(
      () => _workflowClient.chatCompletions(_mapRequest(request)),
      path: '/api/v1/chat/completions',
      request: request,
    );
  }

  @override
  Stream<ChatStreamEvent> streamDeepQa(ChatRequest request) {
    // Use unified chat completions endpoint for Deep QA
    return _handleStream(
      () => _workflowClient.chatCompletions(_mapRequest(request)),
      path: '/api/v1/chat/completions',
      request: request,
    );
  }

  @override
  Stream<ChatStreamEvent> streamProSearch(ChatRequest request) {
    return _handleStream(
      () => _workflowClient.chatCompletions(_mapRequest(request)),
      path: '/api/v1/chat/completions',
      request: request,
    );
  }

  @override
  Stream<ChatStreamEvent> chatCompletions(ChatRequest request) {
    return _handleStream(
      () => _workflowClient.chatCompletions(_mapRequest(request)),
      path: '/api/v1/chat/completions',
      request: request,
    );
  }

  @override
  Future<List<rc.ChatSnapshot>> getChatHistory({
    int limit = 50,
    int offset = 0,
  }) async {
    final response = await _workflowClient.getChatHistory(
      limit: limit,
      offset: offset,
    );
    return response.snapshots;
  }

  @override
  Future<rc.ChatHistoryResponse> getChatHistoryDetail(String historyId) {
    return _workflowClient.getChatHistoryDetail(historyId);
  }

  @override
  Future<void> deleteChatHistory(String historyId) {
    return _workflowClient.deleteChatHistory(historyId);
  }

  /// StoreMind Manager chat - connects to multi-agent council with plan context
  @override
  Stream<ChatStreamEvent> streamManagerChat({
    required String message,
    required String planDate,
  }) {
    final controller = StreamController<ChatStreamEvent>();
    final eventQueue = <String>[];
    Timer? processTimer;
    StreamSubscription? upstreamSubscription;
    bool isCancelled = false;

    void processQueue(Timer timer) {
      if (isCancelled || controller.isClosed) {
        timer.cancel();
        return;
      }

      if (eventQueue.isNotEmpty) {
        final data = eventQueue.removeAt(0);
        final trimmedData = data.trim();

        if (trimmedData == '[DONE]' || trimmedData == 'data: [DONE]') {
          controller.add(const ChatStreamEvent.done());
          processTimer?.cancel();
          controller.close();
          return;
        }

        try {
          final json = jsonDecode(data) as Map<String, dynamic>;
          final transformed = _transformApiResponse(json);
          if (transformed != null) {
            final isStreamDone = transformed['_stream_done'] == true;

            // If there's content alongside stream_done, emit data first
            if (transformed.containsKey('content') ||
                transformed.containsKey('agent_response')) {
              if (!controller.isClosed) {
                debugPrint('[SSE Manager] Emitting: ${transformed.keys}');
                controller.add(ChatStreamEvent.data(transformed));
              }
            }

            if (isStreamDone) {
              debugPrint('[SSE Manager] Stream done');
              controller.add(const ChatStreamEvent.done());
              processTimer?.cancel();
              controller.close();
              return;
            }
          }
        } catch (e) {
          if (data.contains('[DONE]')) {
            controller.add(const ChatStreamEvent.done());
            processTimer?.cancel();
            controller.close();
          } else if (!controller.isClosed) {
            controller.add(ChatStreamEvent.error('Parse error: $e'));
          }
        }
      }
    }

    processTimer =
        Timer.periodic(const Duration(milliseconds: 10), processQueue);

    const path = '/api/manager/chat';
    final body = {
      'message': message,
      'plan_date': planDate,
    };

    debugPrint('[SSE] Manager Chat - Connecting to $path');
    debugPrint('[SSE] Request Body: ${jsonEncode(body)}');

    _connectEventFlux(
      path: path,
      body: body,
      onData: (data) {
        if (!isCancelled && !controller.isClosed) {
          eventQueue.add(data);
        }
      },
      onError: (e) {
        if (!isCancelled && !controller.isClosed) {
          String errorMessage = 'Connection error';
          if (e is EventFluxException) {
            errorMessage = e.message ?? 'Unknown error';
          }
          controller
              .add(ChatStreamEvent.error('Manager chat error: $errorMessage'));
        }
      },
      onDone: () {
        debugPrint('[SSE] Manager chat connection closed');
        Future.delayed(const Duration(milliseconds: 500), () {
          if (eventQueue.isEmpty && !controller.isClosed && !isCancelled) {
            controller.add(const ChatStreamEvent.done());
            processTimer?.cancel();
            controller.close();
          }
        });
      },
      onSubscription: (subscription) {
        upstreamSubscription = subscription;
      },
    );

    controller.onCancel = () {
      debugPrint('[SSE] Manager chat cancelled');
      isCancelled = true;
      processTimer?.cancel();
      upstreamSubscription?.cancel();
    };

    return controller.stream;
  }

  /// StoreMind Staff chat - connects to Stocker agent only (read-only inventory)
  @override
  Stream<ChatStreamEvent> streamStaffChat({
    required String message,
  }) {
    final controller = StreamController<ChatStreamEvent>();
    final eventQueue = <String>[];
    Timer? processTimer;
    StreamSubscription? upstreamSubscription;
    bool isCancelled = false;

    void processQueue(Timer timer) {
      if (isCancelled || controller.isClosed) {
        timer.cancel();
        return;
      }

      if (eventQueue.isNotEmpty) {
        final data = eventQueue.removeAt(0);
        final trimmedData = data.trim();

        if (trimmedData == '[DONE]' || trimmedData == 'data: [DONE]') {
          controller.add(const ChatStreamEvent.done());
          processTimer?.cancel();
          controller.close();
          return;
        }

        try {
          final json = jsonDecode(data) as Map<String, dynamic>;
          final transformed = _transformApiResponse(json);
          if (transformed != null) {
            final isStreamDone = transformed['_stream_done'] == true;

            // If there's content alongside stream_done, emit data first
            if (transformed.containsKey('content') ||
                transformed.containsKey('agent_response')) {
              if (!controller.isClosed) {
                debugPrint('[SSE Staff] Emitting: ${transformed.keys}');
                controller.add(ChatStreamEvent.data(transformed));
              }
            }

            if (isStreamDone) {
              debugPrint('[SSE Staff] Stream done');
              controller.add(const ChatStreamEvent.done());
              processTimer?.cancel();
              controller.close();
              return;
            }
          }
        } catch (e) {
          if (data.contains('[DONE]')) {
            controller.add(const ChatStreamEvent.done());
            processTimer?.cancel();
            controller.close();
          } else if (!controller.isClosed) {
            controller.add(ChatStreamEvent.error('Parse error: $e'));
          }
        }
      }
    }

    processTimer =
        Timer.periodic(const Duration(milliseconds: 10), processQueue);

    const path = '/api/staff/chat';
    final body = {
      'message': message,
    };

    debugPrint('[SSE] Staff Chat - Connecting to $path');
    debugPrint('[SSE] Request Body: ${jsonEncode(body)}');

    _connectEventFlux(
      path: path,
      body: body,
      onData: (data) {
        if (!isCancelled && !controller.isClosed) {
          eventQueue.add(data);
        }
      },
      onError: (e) {
        if (!isCancelled && !controller.isClosed) {
          String errorMessage = 'Connection error';
          if (e is EventFluxException) {
            errorMessage = e.message ?? 'Unknown error';
          }
          controller
              .add(ChatStreamEvent.error('Staff chat error: $errorMessage'));
        }
      },
      onDone: () {
        debugPrint('[SSE] Staff chat connection closed');
        Future.delayed(const Duration(milliseconds: 500), () {
          if (eventQueue.isEmpty && !controller.isClosed && !isCancelled) {
            controller.add(const ChatStreamEvent.done());
            processTimer?.cancel();
            controller.close();
          }
        });
      },
      onSubscription: (subscription) {
        upstreamSubscription = subscription;
      },
    );

    controller.onCancel = () {
      debugPrint('[SSE] Staff chat cancelled');
      isCancelled = true;
      processTimer?.cancel();
      upstreamSubscription?.cancel();
    };

    return controller.stream;
  }

  Stream<ChatStreamEvent> _handleStream(
    Future<HttpResponse<dynamic>> Function() call, {
    required String path,
    required ChatRequest request,
  }) {
    final controller = StreamController<ChatStreamEvent>();
    final eventQueue = <String>[];
    Timer? processTimer;
    StreamSubscription? upstreamSubscription;
    bool isCancelled = false;

    void processQueue(Timer timer) {
      if (isCancelled || controller.isClosed) {
        timer.cancel();
        return;
      }

      if (eventQueue.isNotEmpty) {
        final data = eventQueue.removeAt(0);

        // Check for various done markers
        final trimmedData = data.trim();
        if (trimmedData == '[DONE]' ||
            trimmedData == 'data: [DONE]' ||
            trimmedData.isEmpty) {
          // Skip empty data, handle [DONE]
          if (trimmedData == '[DONE]' || trimmedData == 'data: [DONE]') {
            controller.add(const ChatStreamEvent.done());
            processTimer?.cancel();
            controller.close();
          }
          return;
        }

        try {
          final json = jsonDecode(data) as Map<String, dynamic>;
          final transformed = _transformApiResponse(json);
          if (transformed != null) {
            final isStreamDone = transformed['_stream_done'] == true;

            // If there's content alongside stream_done, emit data first
            if (transformed.containsKey('content') ||
                transformed.containsKey('agent_response')) {
              if (!controller.isClosed) {
                debugPrint('[SSE Generic] Emitting: ${transformed.keys}');
                controller.add(ChatStreamEvent.data(transformed));
              }
            }

            if (isStreamDone) {
              debugPrint('[SSE Generic] Stream done');
              controller.add(const ChatStreamEvent.done());
              processTimer?.cancel();
              controller.close();
              return;
            }
          }
        } catch (e) {
          // Could be malformed JSON or [DONE] marker - check again
          if (data.contains('[DONE]')) {
            controller.add(const ChatStreamEvent.done());
            processTimer?.cancel();
            controller.close();
            return;
          }
          if (!controller.isClosed) {
            controller.add(ChatStreamEvent.error('Parse error: $e'));
          }
        }
      }
    }

    processTimer =
        Timer.periodic(const Duration(milliseconds: 10), processQueue);

    // Map to rest_client ChatRequest to ensure proper serialization (includes provider field)
    final mappedRequest = _mapRequest(request);

    // Connect using EventFlux
    debugPrint('[SSE] Connecting to $path');
    debugPrint('[SSE] Request Body: ${jsonEncode(mappedRequest.toJson())}');

    _connectEventFlux(
      path: path,
      body: mappedRequest.toJson(),
      onData: (data) {
        if (!isCancelled && !controller.isClosed) {
          final decoded = data.replaceAllMapped(
            RegExp(r'\\u([0-9a-fA-F]{4})'),
            (match) =>
                String.fromCharCode(int.parse(match.group(1)!, radix: 16)),
          );
          debugPrint('[SSE] Received Event: $decoded');
          eventQueue.add(data);
        }
      },
      onError: (e) {
        if (e is EventFluxException) {
          debugPrint('[SSE] Error: ${e.message}');
        } else {
          debugPrint('[SSE] Error: $e');
        }
        if (!isCancelled && !controller.isClosed) {
          String errorMessage = e.toString();
          if (e is EventFluxException) {
            final rawMessage = e.message ?? e.toString();
            if (rawMessage.contains('429')) {
              errorMessage = 'Server is busy, please try again later.';
            } else if (rawMessage.contains('500')) {
              errorMessage = 'Server error, please try again later.';
            } else if (rawMessage.contains('401')) {
              errorMessage = 'Session expired, please login again.';
            } else {
              errorMessage = 'Connection error, please check your network.';
            }
          }
          controller.add(ChatStreamEvent.error('Stream error: $errorMessage'));
        }
      },
      onDone: () {
        debugPrint('[SSE] Connection closed');
        // Connection closed - wait for queue to drain
        // The [DONE] event in the queue will handle proper closure
        // Only force close if queue is empty and no [DONE] was received
        Future.delayed(const Duration(milliseconds: 500), () {
          if (eventQueue.isEmpty && !controller.isClosed && !isCancelled) {
            // No [DONE] event received, emit done and close
            debugPrint(
                '[SSE] Force closing controller (empty queue, no [DONE])');
            controller.add(const ChatStreamEvent.done());
            processTimer?.cancel();
            controller.close();
          }
        });
      },
      onSubscription: (subscription) {
        upstreamSubscription = subscription;
      },
    );

    controller.onCancel = () {
      debugPrint('[SSE] Controller cancelled');
      isCancelled = true;
      processTimer?.cancel();
      upstreamSubscription?.cancel();
    };

    return controller.stream;
  }

  Future<void> _connectEventFlux({
    required String path,
    required Map<String, dynamic> body,
    required Function(String) onData,
    required Function(dynamic) onError,
    required Function() onDone,
    Function(StreamSubscription)? onSubscription,
  }) async {
    final storage = Injector.instance<LocalStorageService>();
    final token = await storage.getString(key: AppKeys.accessTokenKey);

    // Construct full URL since EventFlux might need it (or relative if we use base)
    // Assuming AppConfig.baseUrl has the host.
    final url = '${AppConfig.baseUrl}$path';

    EventFlux.instance.connect(
      EventFluxConnectionType.post,
      url,
      header: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        if (token != null) 'Authorization': 'Bearer $token',
        if (token != null) 'cookie': 'sessionid=$token',
      },
      body: body,
      onSuccessCallback: (EventFluxResponse? response) {
        final subscription = response?.stream?.listen(
          (eventData) {
            // EventFlux parses SSE format:
            // - eventData.event contains the event type (from "event:" line)
            // - eventData.data contains the data content (from "data:" line)
            //
            // We need to combine them into a single JSON object that
            // _transformApiResponse can process.
            final eventType = eventData.event;
            final rawData = eventData.data;

            debugPrint('[SSE EventFlux] Event: $eventType, Data: $rawData');

            // Wrap the event type and data together so _transformApiResponse
            // can access both
            if (rawData.isNotEmpty) {
              try {
                final dataJson = jsonDecode(rawData);
                // Create a combined object with event type and data
                final combined = jsonEncode({
                  'event': eventType,
                  'data': dataJson,
                });
                onData(combined);
              } catch (e) {
                // If data isn't valid JSON, pass it through as-is
                // (e.g., for [DONE] markers)
                debugPrint('[SSE EventFlux] Non-JSON data: $rawData');
                onData(rawData);
              }
            }
          },
          onError: (e) {
            onError(e);
          },
          onDone: () {
            onDone();
          },
        );

        if (subscription != null && onSubscription != null) {
          onSubscription(subscription);
        }
      },
      onError: (e) {
        onError(e);
      },
    );
  }

  Map<String, dynamic>? _transformApiResponse(Map<String, dynamic> json) {
    final event = json['event'] as String?;
    final data = json['data'] as Map<String, dynamic>?;

    if (data == null) return null;

    switch (event) {
      case 'text-chunk':
      case 'StreamEvent.TEXT_CHUNK':
        var text = data['text'] as String?;
        if (text != null && text.isNotEmpty) {
          // ══════════════════════════════════════════════════════════════════
          // FRONTEND FALLBACK FILTER
          // Strip any internal content that may have leaked from backend.
          // The backend should already filter these, but this is a safety net.
          // ══════════════════════════════════════════════════════════════════
          text = StringUtils.stripInternalTags(text);

          // Remove agent annotations like (stocker), (planner), (reviser)
          // These indicate internal agent-to-agent communication
          text = text.replaceAll(RegExp(r'\([Ss]tocker\)'), '');
          text = text.replaceAll(RegExp(r'\([Pp]lanner\)'), '');
          text = text.replaceAll(RegExp(r'\([Rr]eviser\)'), '');
          text = text.replaceAll(RegExp(r'\([Oo]rchestrator\)'), '');

          // Remove "Waiting for..." internal status messages
          text = text.replaceAll(RegExp(r'Waiting for [^.]+\.\.\.'), '');

          // Remove "Please wait while I..." internal messages
          text = text.replaceAll(RegExp(r'Please wait while I [^.]+\.'), '');

          // Remove leaked control phrases that LLMs sometimes output as plain text
          text = text.replaceAll('ready_to_respond', '');

          // Only drop the chunk if it becomes completely empty after cleanup
          // (preserve leading/trailing whitespace — they separate words in streaming)
          if (text.isEmpty) return null;
          return {'content': text};
        }
        return null;
      case 'related-queries':
      case 'StreamEvent.RELATED_QUERIES':
        final queries = data['related_queries'] as List?;
        if (queries != null && queries.isNotEmpty) {
          return {'related_queries': queries};
        }
        return null;
      case 'search-results':
      case 'StreamEvent.SEARCH_RESULTS':
        final resultsJson = data['results'] as List?;
        final images = (data['images'] as List?)?.cast<String>();

        if (resultsJson == null || resultsJson.isEmpty) {
          // Even if no results, we might have images
          if (images != null && images.isNotEmpty) {
            return {
              'event_type': 'search-results',
              'images': images,
            };
          }
          return null;
        }

        final results = resultsJson
            .whereType<Map<String, dynamic>>()
            .map(
              (e) => SearchResult(
                title: (e['title'] ?? '').toString(),
                url: (e['url'] ?? '').toString(),
                content: (e['content'] ?? '').toString(),
              ),
            )
            .where((r) => r.url.isNotEmpty || r.title.isNotEmpty)
            .toList();

        if (results.isEmpty) {
          if (images != null && images.isNotEmpty) {
            return {
              'event_type': 'search-results',
              'images': images,
            };
          }
          return null;
        }

        return {
          'sources': results.map(_toSourcePayload).toList(),
          'event_type': 'search-results',
          'agent_response': {
            'event_type': 'search-results',
            'step_number': 0,
            'steps_details': [
              {
                'step_number': 0,
                'step': 'Searching',
                'results': resultsJson,
                'status': 'completed',
              }
            ]
          },
          if (images != null && images.isNotEmpty) 'images': images,
        };
      case 'agent-call-tool':
      case 'StreamEvent.AGENT_CALL_TOOL':
        return {
          'agent_response': {
            'event_type': 'agent-call-tool',
            'steps_details': [
              {
                'step_number': 0,
                'step': 'Processing',
                'status': 'current',
              }
            ]
          }
        };
      case 'begin-stream':
      case 'StreamEvent.BEGIN_STREAM':
        final sessionId = data['session_id'] as String?;
        final planDate = data['plan_date'] as String?;
        return {
          'response_started': true,
          if (sessionId != null) 'session_id': sessionId,
          if (planDate != null) 'plan_date': planDate,
        };
      // StoreMind multi-agent council events
      // Note: Backend sends snake_case keys (agent_name, tool_name, etc.)
      case 'agent-start':
      case 'StreamEvent.AGENT_START':
        // Support both snake_case (backend) and camelCase (legacy)
        final agentName =
            (data['agent_name'] ?? data['agentName']) as String? ?? 'Agent';
        final role = data['role'] as String? ?? 'Specialist';

        return {
          'agent_response': {
            'event_type': 'agent-start',
            'agent_name': agentName,
            'role': role,
            // Create initial step for beautiful UI dropdown
            'steps_details': [
              {
                'step_number': 0,
                'step': '$agentName is thinking...',
                'status': 'current',
                'thought': null,
              }
            ],
          }
        };

      case 'agent-thinking':
      case 'StreamEvent.AGENT_THINKING':
        final agentName = (data['agent_name'] ?? data['agentName']) as String?;
        final content = data['content'] as String?;

        if (content != null && content.isNotEmpty) {
          return {
            'agent_response': {
              'event_type': 'agent-thinking',
              'agent_name': agentName,
              'content': content, // Pass as content for thinking step
              'steps_details': [
                {
                  'step_number': 0,
                  'step': '$agentName is thinking...',
                  'status': 'current',
                  'thought': content,
                }
              ],
            }
          };
        }
        return null;

      case 'agent-end':
      case 'StreamEvent.AGENT_END':
        // Support both snake_case and camelCase
        final agentName = (data['agent_name'] ?? data['agentName']) as String?;
        final latencyMs = (data['latency_ms'] ?? data['latencyMs']) as int?;
        final role = data['role'] as String?;
        final fullContent =
            (data['full_content'] ?? data['fullContent']) as String?;

        return {
          'agent_end': {
            'agent_name': agentName,
            'role': role,
            'latency_ms': latencyMs,
            'full_content': fullContent,
          },
          'agent_response': {
            'event_type': 'agent-end',
            'agent_name': agentName,
            'full_content': fullContent,
            'steps_details': [
              {
                'step_number': 0,
                'step': '$agentName completed',
                'status': 'completed',
              }
            ],
          }
        };

      case 'tool-call':
      case 'StreamEvent.TOOL_CALL':
        // Support both snake_case and camelCase
        final agentName = (data['agent_name'] ?? data['agentName']) as String?;
        final toolName = (data['tool_name'] ?? data['toolName']) as String?;
        final arguments = data['arguments'] as String?;
        final callId = (data['call_id'] ?? data['callId']) as String?;

        // Format tool name nicely
        final formattedToolName =
            toolName?.replaceAll('-', ' ').replaceAll('_', ' ') ?? 'Tool';

        return {
          'tool_call': {
            'agent_name': agentName,
            'tool_name': toolName,
            'arguments': arguments,
            'call_id': callId,
          },
          // Also create agent step for beautiful dropdown
          'agent_response': {
            'event_type': 'tool-call',
            'agent_name': agentName,
            'steps_details': [
              {
                'step_number': 0,
                'step': 'Using $formattedToolName',
                'status': 'current',
                'tool_name': toolName,
              }
            ],
          }
        };

      // NOTE: 'tool-result' case intentionally omitted — backend never emits
      // tool-result events. Tool completion is detected implicitly when text
      // content arrives after tool calls.

      case 'error':
      case 'StreamEvent.ERROR':
        return {'error': data['message']};

      case 'agent-step':
        // Legacy event support - keeping for backward compatibility if needed
        final stepNumber = data['step_number'] as int? ?? 0;
        final agentName = data['agent_name'] as String? ?? 'Agent';
        final role = data['role'] as String? ?? 'Unknown';
        final content = data['content'] as String? ?? '';
        final thought = data['thought'] as String?;
        final status = data['status'] as String? ?? 'working';

        // Map agent status to UI status
        String uiStatus;
        switch (status) {
          case 'thinking':
            uiStatus = 'current';
            break;
          case 'reviewing':
            uiStatus = 'current';
            break;
          case 'working':
          default:
            uiStatus = 'completed';
        }

        return {
          // Include content at top level for direct UI display
          if (content.isNotEmpty) 'content': content,
          'agent_response': {
            'event_type': 'agent-step',
            'step_number': stepNumber,
            'agent_name': agentName,
            'role': role,
            'steps_details': [
              {
                'step_number': stepNumber,
                'step': agentName,
                'status': uiStatus,
                'thought': thought ?? content,
              }
            ],
          },
        };
      case 'stream-end':
      case 'StreamEvent.STREAM_END':
        // Extract final reply from stream-end event and signal completion
        var reply = data['reply'] as String?;
        final conversation = data['conversation'] as Map<String, dynamic>?;
        final updatedPlan = data['updated_plan'] as Map<String, dynamic>?;
        final actionModified = data['action_modified'] as String?;

        final result = <String, dynamic>{
          '_stream_done': true,
        };

        // Clean reply content with shared tag filter (safety net)
        if (reply != null && reply.isNotEmpty) {
          reply = StringUtils.stripInternalTags(reply).trim();
        }

        // If there's a reply in the stream-end, include it for rendering
        // This happens when backend sends final response in stream-end event
        if (reply != null &&
            reply.isNotEmpty &&
            reply != 'I encountered an error processing your request.') {
          result['content'] = reply;
        } else if (conversation != null) {
          // Check if there are traces with content to extract
          final traces = conversation['traces'] as List?;
          if (traces != null && traces.isNotEmpty) {
            // Find the last non-error trace with content
            for (var i = traces.length - 1; i >= 0; i--) {
              final trace = traces[i] as Map<String, dynamic>?;
              if (trace != null) {
                final role = trace['role'] as String?;
                final traceContent = trace['content'] as String?;
                if (role != 'Error' &&
                    traceContent != null &&
                    traceContent.isNotEmpty) {
                  // Clean trace content with shared tag filter
                  final cleanTrace =
                      StringUtils.stripInternalTags(traceContent).trim();
                  if (cleanTrace.isNotEmpty) {
                    result['content'] = cleanTrace;
                    break;
                  }
                }
              }
            }
          }
        }

        // Include plan update info if available (for Manager mode)
        if (updatedPlan != null) {
          result['updated_plan'] = updatedPlan;
          result['plan_updated'] = true;
        }
        if (actionModified != null) {
          result['action_modified'] = actionModified;
        }

        // Include conversation metadata
        if (conversation != null) {
          result['conversation_metadata'] = {
            'session_id': conversation['session_id'],
            'duration_ms': conversation['duration_ms'],
            'agent_contributions': conversation['agent_contributions'],
          };
        }

        return result;
      // Handle deep_qa agent events
      case 'agent-query-plan':
      case 'StreamEvent.AGENT_QUERY_PLAN':
        final steps = data['steps'] as List?;
        if (steps != null && steps.isNotEmpty) {
          return {
            'agent_response': {
              'event_type': 'agent-query-plan',
              'steps': steps,
            },
          };
        }
        return null;
      case 'agent-plan-delta':
      case 'StreamEvent.AGENT_PLAN_DELTA':
        final steps = data['steps'] as List?;
        if (steps != null && steps.isNotEmpty) {
          return {
            'agent_response': {
              'event_type': 'agent-plan-delta',
              'steps': steps,
            },
          };
        }
        return null;
      case 'agent-search-queries':
      case 'StreamEvent.AGENT_SEARCH_QUERIES':
        final queries = data['queries'] as List?;
        final stepNumber = data['step_number'] as int?;
        if (queries != null && queries.isNotEmpty) {
          return {
            'agent_response': {
              'event_type': 'agent-search-queries',
              'step_number': stepNumber,
              'queries': queries,
              'steps_details': [
                {
                  'step_number': stepNumber ?? 0,
                  'step': 'Searching',
                  'queries': queries,
                  'status': 'current',
                },
              ],
            },
          };
        }
        return null;
      case 'agent-read-results':
      case 'StreamEvent.AGENT_READ_RESULTS':
        final resultsJson = data['results'] as List?;
        final stepNumber = data['step_number'] as int?;
        final images = (data['images'] as List?)?.cast<String>();

        debugPrint(
            '[SSE Transform] agent-read-results: images=${images?.length ?? 0}');
        if (images != null && images.isNotEmpty) {
          debugPrint('[SSE Transform] Images found: $images');
        }

        if (resultsJson != null && resultsJson.isNotEmpty) {
          final results = resultsJson
              .whereType<Map<String, dynamic>>()
              .map(
                (e) => SearchResult(
                  title: (e['title'] ?? '').toString(),
                  url: (e['url'] ?? '').toString(),
                  content: (e['content'] ?? '').toString(),
                ),
              )
              .where((r) => r.title.isNotEmpty || r.content.isNotEmpty)
              .toList();

          return {
            'agent_response': {
              'event_type': 'agent-read-results',
              'step_number': stepNumber,
              'steps_details': [
                {
                  'step_number': stepNumber ?? 0,
                  'step': 'Reading',
                  'results': resultsJson,
                  'images': images,
                  'status': 'current',
                },
              ],
            },
            // Also emit sources for citation support
            if (results.isNotEmpty)
              'sources': results.map(_toSourcePayload).toList(),
            // Emit images separately for UI
            if (images != null && images.isNotEmpty) 'images': images,
          };
        }
        return null;
      case 'agent-understand-results':
      case 'StreamEvent.AGENT_UNDERSTAND_RESULTS':
        final text = data['text'] as String?;
        final stepNumber = data['step_number'] as int?;
        if (text != null && text.isNotEmpty) {
          return {
            'agent_response': {
              'event_type': 'agent-understand-results',
              'step_number': stepNumber,
              'thought':
                  text, // Pass thought directly for easier handling or inside steps_details
              'steps_details': [
                {
                  'step_number': stepNumber ?? 0,
                  // The step name might be needed for the model mapping if we were using it,
                  // but here we are constructing a raw map for the Cubit/UI.
                  'step': 'Thinking',
                  'status': 'current',
                  'thought': text,
                },
              ],
            },
          };
        }
        return null;
      case 'agent-finish':
      case 'StreamEvent.AGENT_FINISH':
        return {
          'agent_response': {
            'event_type': 'agent-finish',
          },
        };

      case 'final-response':
      case 'StreamEvent.FINAL_RESPONSE':
        // final-response contains the complete message, but we already
        // streamed it via text-chunk, so we can skip it
        return null;
      default:
        return data;
    }
  }

  Map<String, dynamic> _toSourcePayload(SearchResult result) {
    final title = result.title.trim();
    final url = result.url.trim();
    final content = result.content.trim();

    final sourceName = _sourceNameFromUrl(url);

    return {
      'title': title.isNotEmpty ? title : sourceName,
      'url': url,
      if (content.isNotEmpty) 'snippet': content,
      'content': content,
      'source': sourceName,
    };
  }

  String _sourceNameFromUrl(String url) {
    if (url.startsWith('rag://dataset/')) {
      return 'Dataset';
    }

    try {
      final uri = Uri.parse(url);
      if (uri.host.isNotEmpty) {
        return uri.host;
      }
    } catch (_) {
      // ignore parse errors
    }

    return url;
  }

  rc.ChatRequest _mapRequest(ChatRequest request) {
    return rc.ChatRequest(
      messages: request.messages.map(_mapChatMessage).toList(),
      conversationId: request.conversationId,
      threadId: request.threadId,
      workflowConfig: _mapWorkflowConfig(request.workflowConfig),
      reportStyle: _mapReportStyle(request.reportStyle),
      intraInfoConfig: _mapIntraInfoConfig(request.intraInfoConfig),
      extraInfoConfig: _mapExtraInfoConfig(request.extraInfoConfig),
      mode: _mapChatMode(request.mode),
      provider: request.mode == ChatMode.proSearch ? 'perplexity' : null,
    );
  }

  rc.ChatMode? _mapChatMode(ChatMode? mode) {
    if (mode == null) return null;
    switch (mode) {
      case ChatMode.simpleQa:
        return rc.ChatMode.simpleQa;
      case ChatMode.deepQa:
        return rc.ChatMode.deepQa;
      case ChatMode.proSearch:
        return rc.ChatMode.provider;
    }
  }

  rc.ChatMessage _mapChatMessage(ChatMessage message) {
    return rc.ChatMessage(
      content: message.content,
      role: _mapMessageRole(message.role),
      relatedQueries: message.relatedQueries,
      sources: message.sources?.map(_mapSearchResult).toList(),
      images: message.images,
      isErrorMessage: message.isErrorMessage,
      agentResponse: message.agentResponse != null
          ? _mapAgentResponse(message.agentResponse!)
          : null,
    );
  }

  rc.MessageRole _mapMessageRole(MessageRole role) {
    switch (role) {
      case MessageRole.user:
        return rc.MessageRole.user;
      case MessageRole.assistant:
        return rc.MessageRole.assistant;
    }
  }

  rc.SearchResult _mapSearchResult(SearchResult result) {
    return rc.SearchResult(
      title: result.title,
      url: result.url,
      content: result.content,
    );
  }

  rc.AgentSearchFullResponse _mapAgentResponse(
      AgentSearchFullResponse response) {
    return rc.AgentSearchFullResponse(
      steps: response.steps,
      stepsDetails: response.stepsDetails.map(_mapAgentSearchStep).toList(),
    );
  }

  rc.AgentSearchStep _mapAgentSearchStep(AgentSearchStep step) {
    return rc.AgentSearchStep(
      stepNumber: step.stepNumber,
      step: step.step,
      queries: step.queries,
      results: step.results?.map(_mapSearchResult).toList(),
      status: _mapAgentStepStatus(step.status),
    );
  }

  rc.AgentSearchStepStatus _mapAgentStepStatus(String status) {
    switch (status) {
      case 'done':
        return rc.AgentSearchStepStatus.done;
      case 'current':
        return rc.AgentSearchStepStatus.current;
      default:
        return rc.AgentSearchStepStatus.defaultValue;
    }
  }

  rc.WorkflowConfig? _mapWorkflowConfig(WorkflowConfig? config) {
    if (config == null) return null;
    return rc.WorkflowConfig(
      debug: config.debug,
      maxPlanIterations: config.maxPlanIterations,
      maxStepNum: config.maxStepNum,
      autoAcceptedPlan: config.autoAcceptedPlan,
      enableBackgroundInvestigation: config.enableBackgroundInvestigation,
    );
  }

  rc.ReportStyle? _mapReportStyle(ReportStyle? style) {
    if (style == null) return null;
    switch (style) {
      case ReportStyle.academic:
        return rc.ReportStyle.academic;
      case ReportStyle.popularScience:
        return rc.ReportStyle.popularScience;
      case ReportStyle.news:
        return rc.ReportStyle.news;
      case ReportStyle.socialMedia:
        return rc.ReportStyle.socialMedia;
      case ReportStyle.strategicInvestment:
        return rc.ReportStyle.strategicInvestment;
    }
  }

  rc.IntraInfoConfig? _mapIntraInfoConfig(IntraInfoConfig? config) {
    if (config == null) return null;
    return rc.IntraInfoConfig(
      enabled: config.enabled,
      maxResults: config.maxResults,
      resources: config.resources.map(_mapResource).toList(),
    );
  }

  rc.ExtraInfoConfig? _mapExtraInfoConfig(ExtraInfoConfig? config) {
    if (config == null) return null;
    return rc.ExtraInfoConfig(
      enabled: config.enabled,
      maxResults: config.maxResults,
      resources: config.resources.map(_mapResource).toList(),
    );
  }

  rc.Resource _mapResource(Resource resource) {
    return rc.Resource(
      uri: resource.uri,
      title: resource.title,
      description: resource.description ?? '',
    );
  }
}
