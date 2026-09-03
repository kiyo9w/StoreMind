import 'package:insider/features/chat/data/models/chat_models.dart';

/// Represents an agent search step for deep_qa mode
class AgentStep {
  final int stepNumber;
  final String title;
  final List<String> queries;
  final List<AgentStepResult> results;
  final AgentStepStatus status;
  final String? thought;
  final String? toolName;
  final String? toolArgs;
  final String? toolResult;

  /// The agent that owns this step (e.g. "Orchestrator", "Stocker", "Planner", "Reviser")
  final String? agentName;

  /// The agent's role label (e.g. "マネージャー", "Specialist")
  final String? agentRole;

  const AgentStep({
    required this.stepNumber,
    required this.title,
    this.queries = const [],
    this.results = const [],
    this.status = AgentStepStatus.pending,
    this.thought,
    this.toolName,
    this.toolArgs,
    this.toolResult,
    this.agentName,
    this.agentRole,
  });

  AgentStep copyWith({
    int? stepNumber,
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
    return AgentStep(
      stepNumber: stepNumber ?? this.stepNumber,
      title: title ?? this.title,
      queries: queries ?? this.queries,
      results: results ?? this.results,
      status: status ?? this.status,
      thought: thought ?? this.thought,
      toolName: toolName ?? this.toolName,
      toolArgs: toolArgs ?? this.toolArgs,
      toolResult: toolResult ?? this.toolResult,
      agentName: agentName ?? this.agentName,
      agentRole: agentRole ?? this.agentRole,
    );
  }
}

enum AgentStepStatus { pending, searching, reading, thinking, done }

/// Represents a search result within an agent step
class AgentStepResult {
  final String title;
  final String url;
  final String? content;
  final String? favicon;

  const AgentStepResult({
    required this.title,
    required this.url,
    this.content,
    this.favicon,
  });
}

class ConversationMessage {
  final String id;
  final String content;
  final MessageRole role;
  final bool isStreaming;
  final List<String>? relatedQueries;
  final int? sourcesCount;
  final List<dynamic>? sources;
  final List<AgentStep>? agentSteps;
  final bool isError;
  final List<String>? queryPlan;
  final List<String>? images;

  /// Whether the plan was updated as a result of this message (Manager mode)
  final bool planUpdated;

  /// The action ID that was modified in the plan (Manager mode)
  final String? actionModified;

  /// Metadata about the conversation (session_id, duration_ms, etc.)
  final Map<String, dynamic>? conversationMetadata;

  ConversationMessage({
    required this.id,
    required this.content,
    required this.role,
    this.isStreaming = false,
    this.isError = false,
    this.relatedQueries,
    this.sourcesCount,
    this.sources,
    this.agentSteps,
    this.queryPlan,
    this.images,
    this.planUpdated = false,
    this.actionModified,
    this.conversationMetadata,
  });

  /// Creates a copy of this message with some fields changed
  ConversationMessage copyWith({
    String? id,
    String? content,
    MessageRole? role,
    bool? isStreaming,
    bool? isError,
    List<String>? relatedQueries,
    int? sourcesCount,
    List<dynamic>? sources,
    List<AgentStep>? agentSteps,
    List<String>? queryPlan,
    List<String>? images,
    bool? planUpdated,
    String? actionModified,
    Map<String, dynamic>? conversationMetadata,
  }) {
    return ConversationMessage(
      id: id ?? this.id,
      content: content ?? this.content,
      role: role ?? this.role,
      isStreaming: isStreaming ?? this.isStreaming,
      isError: isError ?? this.isError,
      relatedQueries: relatedQueries ?? this.relatedQueries,
      sourcesCount: sourcesCount ?? this.sourcesCount,
      sources: sources ?? this.sources,
      agentSteps: agentSteps ?? this.agentSteps,
      queryPlan: queryPlan ?? this.queryPlan,
      images: images ?? this.images,
      planUpdated: planUpdated ?? this.planUpdated,
      actionModified: actionModified ?? this.actionModified,
      conversationMetadata: conversationMetadata ?? this.conversationMetadata,
    );
  }
}
