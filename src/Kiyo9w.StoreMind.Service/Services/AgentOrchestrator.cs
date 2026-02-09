using System.Collections.Concurrent;
using System.Diagnostics;
using System.Text.Json;
using System.Text;
using System.Text.RegularExpressions;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Service.Plugins;
using Microsoft.Extensions.Logging;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.Agents.Chat;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Runs the multi-agent loop.
/// - Orchestrator: Delegates tasks (GPT-5.2)
/// - Stocker/Planner: Tool execution (Llama 3.3 70B)
/// - Reviser: Checks for errors
/// </summary>
public class AgentOrchestrator
{
    private readonly KernelFactory _kernelFactory;
    private readonly InventoryService _inventory;
    private readonly SupplierService _supplier;
    private readonly Plugins.WeatherPlugin _weather;
    private readonly Plugins.PlanningPlugin _planningPlugin;
    private readonly Plugins.WebSearchPlugin _webSearch;
    private readonly PromptLoader _prompts;
    private readonly ILogger<AgentOrchestrator> _log;

    public AgentOrchestrator(
        KernelFactory kernelFactory,
        InventoryService inventory,
        SupplierService supplier,
        Plugins.WeatherPlugin weather,
        Plugins.PlanningPlugin planningPlugin,
        Plugins.WebSearchPlugin webSearch,
        PromptLoader prompts,
        ILogger<AgentOrchestrator> log)
    {
        _kernelFactory = kernelFactory;
        _inventory = inventory;
        _supplier = supplier;
        _weather = weather;
        _planningPlugin = planningPlugin;
        _webSearch = webSearch;
        _prompts = prompts;
        _log = log;
    }

    /// <summary>
    /// Process a user message with token-by-token streaming.
    /// Yields StreamingEvent objects for real-time SSE emission.
    /// </summary>
    public async IAsyncEnumerable<StreamingEvent> ProcessStreamingAsync(
        string userMessage,
        string? context = null,
        [System.Runtime.CompilerServices.EnumeratorCancellation] CancellationToken ct = default)
    {
        _log.LogInformation("Processing streaming request: {Message}", userMessage);

        // 1. Create Kernels
        var orchestratorKernel = _kernelFactory.CreateOrchestratorKernel();
        var stockerKernel = _kernelFactory.CreateStockerKernel();
        var plannerKernel = _kernelFactory.CreatePlannerKernel();
        var reviserKernel = _kernelFactory.CreateReviserKernel();
        var reporterKernel = _kernelFactory.CreateReporterKernel();
        
        // Attach tool result capture filter to intercept function outputs
        var resultFilter = new ToolResultCaptureFilter();
        orchestratorKernel.FunctionInvocationFilters.Add(resultFilter);
        stockerKernel.FunctionInvocationFilters.Add(resultFilter);
        plannerKernel.FunctionInvocationFilters.Add(resultFilter);
        
        // Initialize agent state for tracking execution progress
        var agentState = new AgentState();

        // 2. Define Agents
        ChatCompletionAgent orchestrator = new()
        {
            Name = "Orchestrator",
            Instructions = _prompts.LoadWithTime("orchestrator"),
            Kernel = orchestratorKernel,
        };

        ChatCompletionAgent stocker = new()
        {
            Name = "Stocker",
            Instructions = _prompts.LoadWithTime("stocker"),
            Kernel = stockerKernel,
            Arguments = new KernelArguments(new OpenAIPromptExecutionSettings() 
            { 
                FunctionChoiceBehavior = FunctionChoiceBehavior.Auto() 
            })
        };
        var invPlugin = new Plugins.Inventory(_inventory);
        stocker.Kernel.Plugins.AddFromObject(invPlugin, "Inventory");
        stocker.Kernel.Plugins.AddFromObject(_weather, "Weather");

        ChatCompletionAgent planner = new()
        {
            Name = "Planner",
            Instructions = _prompts.LoadWithTime("planner"),
            Kernel = plannerKernel,
            Arguments = new KernelArguments(new OpenAIPromptExecutionSettings() 
            { 
                FunctionChoiceBehavior = FunctionChoiceBehavior.Auto() 
            })
        };
        var supplierPlugin = new Plugins.Supplier(_supplier);
        planner.Kernel.Plugins.AddFromObject(supplierPlugin, "Supplier");
        planner.Kernel.Plugins.AddFromObject(_planningPlugin, "Planning");
        planner.Kernel.Plugins.AddFromObject(_webSearch, "WebSearch");

        ChatCompletionAgent reviser = new()
        {
            Name = "Reviser",
            Instructions = _prompts.LoadWithTime("reviser"),
            Kernel = reviserKernel,
            Arguments = new KernelArguments(new OpenAIPromptExecutionSettings() 
            { 
                FunctionChoiceBehavior = FunctionChoiceBehavior.None() 
            })
        };

        ChatCompletionAgent reporter = new()
        {
            Name = "Reporter",
            Instructions = _prompts.LoadWithTime("reporter"),
            Kernel = reporterKernel,
            Arguments = new KernelArguments(new OpenAIPromptExecutionSettings() 
            { 
                FunctionChoiceBehavior = FunctionChoiceBehavior.None() 
            })
        };

        // 3. Create Group Chat with deterministic routing
        AgentGroupChat chat = new(orchestrator, stocker, planner, reviser, reporter)
        {
            ExecutionSettings = new()
            {
                TerminationStrategy = new IntentAwareTerminationStrategy()
                {
                    Agents = [reporter],
                    MaximumIterations = 15
                },
                SelectionStrategy = new OrchestratorDrivenSelectionStrategy()
            }
        };

        // 4. Add user message
        if (!string.IsNullOrEmpty(context))
        {
            userMessage = $"Context:\n{context}\n\nRequest:\n{userMessage}";
        }
        chat.AddChatMessage(new ChatMessageContent(AuthorRole.User, userMessage));

        // Helper to get agent role
        static string GetAgentRole(string? name) => name switch
        {
            "Orchestrator" => "Manager",
            "Stocker" => "Specialist",
            "Planner" => "Specialist",
            "Reviser" => "Manager",
            "Reporter" => "Reporter",
            _ => "Unknown"
        };

        // Streaming state tracking
        string? currentAgent = null;
        var contentBuffer = new StringBuilder();      // Full content for history
        var userFacingBuffer = new StringBuilder();   // Only user-facing content
        var thinkingBuffer = new StringBuilder();
        var agentStartTime = Stopwatch.StartNew();
        var toolCallBuffer = new Dictionary<string, (string Name, StringBuilder Args)>();
        int stepNumber = 0;
        var pendingToolResults = new List<(string Name, string Args, int Step)>();
        bool toolResultsEmitted = false;
        bool inThinkingBlock = false;  // Track if we're inside <thinking>...</thinking>

        // 5. Stream token-by-token
        await foreach (var chunk in chat.InvokeStreamingAsync(ct))
        {
            var agentName = chunk.AuthorName ?? "Unknown";

            // Agent change detection - emit end for previous, start for new
            if (agentName != currentAgent)
            {
                // Emit end event for previous agent
                if (currentAgent != null)
                {
                    _log.LogInformation("[{Agent}] completed: {Length} chars", currentAgent, contentBuffer.Length);
                    yield return new StreamingEvent(StreamEventType.AgentEnd,
                        new AgentEndData(
                            currentAgent,
                            GetAgentRole(currentAgent),
                            contentBuffer.ToString(),
                            thinkingBuffer.Length > 0 ? thinkingBuffer.ToString() : null,
                            agentStartTime.ElapsedMilliseconds));
                }

                currentAgent = agentName;
                contentBuffer.Clear();
                userFacingBuffer.Clear();
                thinkingBuffer.Clear();
                toolCallBuffer.Clear();
                agentStartTime.Restart();
                pendingToolResults.Clear();
                toolResultsEmitted = false;
                inThinkingBlock = false;  // Reset thinking state for new agent

                _log.LogInformation("[{Agent}] started", agentName);
                yield return new StreamingEvent(StreamEventType.AgentStart,
                    new AgentStartData(agentName, GetAgentRole(agentName)));
            }

            // Tool call detection via Items collection
            var toolCalls = chunk.Items.OfType<StreamingFunctionCallUpdateContent>();
            foreach (var tc in toolCalls)
            {
                var callId = tc.CallId ?? Guid.NewGuid().ToString();
                
                // Track new tool calls
                if (!string.IsNullOrEmpty(tc.Name) && !toolCallBuffer.ContainsKey(callId))
                {
                    toolCallBuffer[callId] = (tc.Name, new StringBuilder());
                    _log.LogInformation("[{Agent}] calling tool: {Tool}", agentName, tc.Name);
                    
                    // Emit tool-call event
                    yield return new StreamingEvent(StreamEventType.ToolCall,
                        new ToolCallData(agentName, tc.Name, tc.Arguments ?? "", callId));

                    var queryDescriptions = GenerateQueryDescriptions(tc.Name, tc.Arguments ?? "");
                    if (queryDescriptions.Count > 0)
                    {
                        yield return new StreamingEvent(StreamEventType.AgentSearchQueries,
                            new AgentSearchQueriesData(agentName, stepNumber, queryDescriptions));
                    }

                    pendingToolResults.Add((tc.Name, tc.Arguments ?? "", stepNumber));
                    toolResultsEmitted = false;
                    stepNumber++;
                }
                
                // Accumulate arguments if streaming
                if (toolCallBuffer.TryGetValue(callId, out var buf))
                {
                    buf.Args.Append(tc.Arguments ?? "");
                }
            }

            // Text content processing
            if (!string.IsNullOrEmpty(chunk.Content))
            {
                // Flush pending tool results on first text after tool calls
                if (pendingToolResults.Count > 0 && !toolResultsEmitted)
                {
                    var fullQueryDescriptions = new List<string>();
                    var readResults = new List<ReadResult>();
                    
                    foreach (var t in pendingToolResults)
                    {
                        var fullArgs = ResolveFullArgs(t.Name, toolCallBuffer) ?? t.Args;
                        fullQueryDescriptions.AddRange(GenerateQueryDescriptions(t.Name, fullArgs));
                        
                        resultFilter.Results.TryGetValue(t.Name, out var capturedResult);
                        var observation = capturedResult;
                        if (!string.IsNullOrEmpty(capturedResult))
                        {
                            observation = await SummarizeToolResultAsync(t.Name, capturedResult, ct);
                            agentState.Observations.Add($"[{t.Name}]: {observation}");
                        }
                        readResults.Add(GenerateReadResult(t.Name, fullArgs, observation));
                    }
                    
                    if (fullQueryDescriptions.Count > 0)
                    {
                        yield return new StreamingEvent(StreamEventType.AgentSearchQueries,
                            new AgentSearchQueriesData(agentName, stepNumber - 1, fullQueryDescriptions));
                    }
                    yield return new StreamingEvent(StreamEventType.AgentReadResults,
                        new AgentReadResultsData(agentName, stepNumber - 1, readResults));
                    
                    toolResultsEmitted = true;
                    pendingToolResults.Clear();
                    resultFilter.Results.Clear();
                }
                
                contentBuffer.Append(chunk.Content);
                var fullContent = contentBuffer.ToString();
                
                // Track thinking block state across streaming chunks
                if (fullContent.Contains("<thinking>") && !fullContent.Contains("</thinking>"))
                {
                    inThinkingBlock = true;
                    thinkingBuffer.Append(chunk.Content);
                    continue;
                }
                else if (inThinkingBlock)
                {
                    thinkingBuffer.Append(chunk.Content);
                    if (fullContent.Contains("</thinking>"))
                    {
                        inThinkingBlock = false;
                    }
                    continue;
                }
                
                var role = GetAgentRole(agentName);
                if (role != "Reporter")
                {
                    userFacingBuffer.Append(StripInternalTags(chunk.Content));
                    continue;
                }
                
                var cleanChunk = StripInternalTags(chunk.Content);
                
                if (!string.IsNullOrWhiteSpace(cleanChunk))
                {
                    userFacingBuffer.Append(cleanChunk);
                    if (cleanChunk.Length <= 8)
                    {
                        yield return new StreamingEvent(StreamEventType.TextChunk,
                            new TextChunkData(cleanChunk));
                    }
                    else
                    {
                        var rng = Random.Shared;
                        var pos = 0;
                        while (pos < cleanChunk.Length)
                        {
                            var tokenLen = rng.Next(2, 7);
                            tokenLen = Math.Min(tokenLen, cleanChunk.Length - pos);
                            var token = cleanChunk.Substring(pos, tokenLen);
                            yield return new StreamingEvent(StreamEventType.TextChunk,
                                new TextChunkData(token));
                            pos += tokenLen;
                        }
                    }
                }
            }
        }

        // Emit final agent end
        if (currentAgent != null)
        {
            _log.LogInformation("[{Agent}] completed (final): {Length} chars", currentAgent, contentBuffer.Length);
            yield return new StreamingEvent(StreamEventType.AgentEnd,
                new AgentEndData(
                    currentAgent,
                    GetAgentRole(currentAgent),
                    contentBuffer.ToString(),
                    thinkingBuffer.Length > 0 ? thinkingBuffer.ToString() : null,
                    agentStartTime.ElapsedMilliseconds));
        }
    }

    /// <summary>
    /// Custom termination strategy.
    /// Terminates when the Manager agent outputs the specific status tag.
    /// </summary>
    /// <summary>
    /// Deterministic agent routing driven by the Orchestrator's output.
    /// Flow: User → Orchestrator → (Stocker|Planner via <delegate> tag) → Reviser → Orchestrator (final)
    /// No LLM call needed — pure logic.
    /// </summary>
    /// <summary>
    /// Routes agents based on conversation flow:
    /// - Specialist just spoke → Reviser (always review)
    /// - Reviser just spoke → Orchestrator (synthesize final answer)
    /// - Orchestrator spoke → parse natural language to detect delegation to Stocker/Planner
    /// - Default → Orchestrator
    /// </summary>
    private class OrchestratorDrivenSelectionStrategy : SelectionStrategy
    {
        protected override Task<Agent> SelectAgentAsync(
            IReadOnlyList<Agent> agents,
            IReadOnlyList<ChatMessageContent> history,
            CancellationToken cancellationToken)
        {
            var lastMessage = history.LastOrDefault();
            var lastAuthor = lastMessage?.AuthorName;

            string nextName = lastAuthor switch
            {
                // Specialist just spoke → always send to Reviser
                "Stocker" or "Planner" => "Reviser",

                // Reviser just spoke → send to Reporter for final answer synthesis
                "Reviser" => "Reporter",

                // Reporter just spoke → terminate (handled by termination strategy)
                "Reporter" => "Reporter",

                // Orchestrator spoke → check if it mentioned a specialist
                "Orchestrator" => DetectDelegation(lastMessage?.Content),

                // Default (User message, first turn, etc.) → Orchestrator
                _ => "Orchestrator",
            };

            var agent = agents.FirstOrDefault(a => a.Name == nextName)
                       ?? agents.First(a => a.Name == "Orchestrator");
            return Task.FromResult(agent);
        }

        /// <summary>
        /// Detects whether the Orchestrator's message mentions a specialist by name.
        /// The Orchestrator naturally says things like "I'll ask Stocker" or "Let me check with Planner".
        /// If a specialist is mentioned, route to them. Otherwise the Orchestrator is answering
        /// directly and termination will handle the rest.
        /// </summary>
        private static string DetectDelegation(string? content)
        {
            if (string.IsNullOrEmpty(content)) return "Orchestrator";

            // Check for specialist names in the Orchestrator's natural language output
            bool mentionsStocker = content.Contains("Stocker", StringComparison.OrdinalIgnoreCase);
            bool mentionsPlanner = content.Contains("Planner", StringComparison.OrdinalIgnoreCase);

            // If both are mentioned, prefer Stocker first (Planner can follow)
            if (mentionsStocker) return "Stocker";
            if (mentionsPlanner) return "Planner";

            return "Orchestrator";
        }
    }

    private class IntentAwareTerminationStrategy : TerminationStrategy
    {
        protected override Task<bool> ShouldAgentTerminateAsync(Agent agent, IReadOnlyList<ChatMessageContent> history, CancellationToken cancellationToken)
        {
            var lastMessage = history.LastOrDefault();
            
            // Terminate after Reporter speaks - it's the final answer
            if (lastMessage?.AuthorName == "Reporter") 
                return Task.FromResult(true);
            
            // Also check Orchestrator's status tag for simple queries
            if (lastMessage?.AuthorName == "Orchestrator")
            {
                var content = lastMessage.Content?.ToLowerInvariant() ?? "";
                if (content.Contains("<status>ready_to_respond</status>"))
                    return Task.FromResult(true);
            }
            
            // Fallback: If stuck in a loop (too many turns), terminate
            bool isStuck = history.Count > 20;
            
            return Task.FromResult(isStuck);
        }
    }
    
    // ══════════════════════════════════════════════════════════════
    // EXECUTION STATE & FILTERS
    // ══════════════════════════════════════════════════════════════
    
    /// <summary>
    /// Intercepts function invocations to capture tool execution results.
    /// Results are stored keyed by "PluginName-FunctionName" to match tc.Name from SK streaming.
    /// </summary>
    private sealed class ToolResultCaptureFilter : IFunctionInvocationFilter
    {
        public ConcurrentDictionary<string, string> Results { get; } = new();
        
        public async Task OnFunctionInvocationAsync(
            FunctionInvocationContext context, 
            Func<FunctionInvocationContext, Task> next)
        {
            await next(context);
            
            // Serialize result as JSON instead of .ToString() to avoid raw CLR type names
            // (e.g. "System.Collections.Generic.List`1[...]" for List<InventoryItem>)
            string serialized;
            try
            {
                var value = context.Result?.GetValue<object>();
                serialized = value switch
                {
                    null => string.Empty,
                    string s => s,
                    _ => JsonSerializer.Serialize(value)
                };
            }
            catch (Exception ex)
            {
                // Log the serialization failure for debugging — fall back to ToString()
                System.Diagnostics.Debug.WriteLine(
                    $"[ToolResultCaptureFilter] JSON serialization failed for {context.Function.PluginName}-{context.Function.Name}: {ex.Message}");
                serialized = context.Result?.ToString() ?? string.Empty;
            }
            
            // Key by PluginName-FunctionName to match tc.Name from SK streaming
            var key = string.IsNullOrEmpty(context.Function.PluginName)
                ? context.Function.Name
                : $"{context.Function.PluginName}-{context.Function.Name}";
            Results[key] = serialized;
        }
    }
    
    /// <summary>
    /// Tracks agent execution state across the conversation.
    /// Maintains plan progress, step index, and collected observations.
    /// </summary>
    private sealed class AgentState
    {
        /// <summary>Current execution plan (JSON or structured description).</summary>
        public string? CurrentPlan { get; set; }
        
        /// <summary>Zero-based index of the current step in the plan.</summary>
        public int StepIndex { get; set; }
        
        /// <summary>Collected observations from tool executions.</summary>
        public List<string> Observations { get; } = new();
        
        /// <summary>Number of planning iterations completed.</summary>
        public int PlanIterations { get; set; }
        
        /// <summary>Returns a concise status summary for debugging.</summary>
        public string GetStatusSummary() => 
            $"Step {StepIndex + 1}, Observations: {Observations.Count}, Iterations: {PlanIterations}";
    }
    
    /// <summary>
    /// Summarizes raw tool output into a concise observation.
    /// Uses a fast model (Router kernel) for minimal latency.
    /// </summary>
    private async Task<string> SummarizeToolResultAsync(
        string toolName, 
        string rawResult, 
        CancellationToken ct)
    {
        // Skip summarization for short results
        if (string.IsNullOrEmpty(rawResult) || rawResult.Length < 200)
        {
            return rawResult;
        }
        
        try
        {
            var kernel = _kernelFactory.CreateSummarizerKernel();
            var prompt = $"""
                Summarize this {toolName} result in 1-2 sentences. Focus on key data points.
                Keep numbers and important values. Be concise.
                
                Result:
                {rawResult[..Math.Min(2000, rawResult.Length)]}
                """;
            
            var result = await kernel.InvokePromptAsync(prompt, cancellationToken: ct);
            return result.ToString();
        }
        catch
        {
            // Fallback to truncated raw result on any error
            return rawResult.Length > 500 
                ? rawResult[..500] + "..." 
                : rawResult;
        }
    }
    
    // ══════════════════════════════════════════════════════════════
    // TAG CLEANUP (precompiled, shared across backend)
    // ══════════════════════════════════════════════════════════════
    
    private static readonly Regex ThinkingTagPair = new(@"<thinking>.*?</thinking>", RegexOptions.Compiled | RegexOptions.Singleline);
    private static readonly Regex ThinkingTagSingle = new(@"</?thinking>", RegexOptions.Compiled);
    private static readonly Regex StatusTagPair = new(@"<status>.*?</status>", RegexOptions.Compiled | RegexOptions.Singleline);
    private static readonly Regex StatusTagSingle = new(@"</?status[^>]*>", RegexOptions.Compiled);
    /// <summary>
    /// Strips all &lt;status&gt; and &lt;thinking&gt; blocks (including content) from text.
    /// Used by both the streaming loop and endpoint reply extraction.
    /// </summary>
    public static string StripInternalTags(string text)
    {
        text = ThinkingTagPair.Replace(text, "");
        text = ThinkingTagSingle.Replace(text, "");
        text = StatusTagPair.Replace(text, "");
        text = StatusTagSingle.Replace(text, "");
        text = text.Replace("status>", ""); // orphaned fragment
        text = text.Replace("thinking>", ""); // orphaned fragment
        return text;
    }
    
    // ══════════════════════════════════════════════════════════════
    // TOOL DISPLAY HELPERS
    // ══════════════════════════════════════════════════════════════
    
    private record ToolDisplayInfo(string Query, string Title, string Content, string? Url = null);
    
    private static readonly Dictionary<string, (string Title, string Content)> ToolTitleMap = new(StringComparer.OrdinalIgnoreCase)
    {
        ["Inventory-GetInventorySnapshot"] = ("Inventory Database",   "Retrieved full inventory snapshot"),
        ["Inventory-GetLowStockItems"]     = ("Low Stock Alert",      "Found items below safety threshold"),
        ["Inventory-GetExpiringItems"]     = ("Expiring Items",       "Found items expiring soon"),
        ["Inventory-SearchItems"]          = ("Inventory Search",     "Search results"),
        ["Inventory-GetSalesVelocity"]     = ("Sales Analysis",       "Sales velocity data"),
        ["Weather-GetForecast"]            = ("Weather Forecast",     "Weather data retrieved"),
        ["Supplier-GetSupplierPrice"]      = ("Supplier Price",       "Retrieved supplier pricing"),
        ["Supplier-GetWarehouseStock"]     = ("Warehouse Stock",      "Retrieved warehouse availability"),
        ["Planning-GetCurrentPlan"]        = ("Action Plan",          "Today's operational plan"),
        ["Planning-UpdateAction"]          = ("Plan Update",          "Action status updated"),
        ["Planning-ApprovePlan"]           = ("Plan Approval",        "Plan approved"),
        ["Planning-CritiquePlan"]          = ("Plan Critique",        "Plan critique generated"),
    };
    
    private static ToolDisplayInfo GetToolDisplay(string toolName, string arguments)
    {
        if (!ToolTitleMap.TryGetValue(toolName, out var info))
        {
            // Generate readable fallback from tool name (e.g. "Inventory-SearchItems" -> "Search Items")
            var funcName = toolName.Contains('-') ? toolName.Split('-').Last() : toolName;
            var readable = System.Text.RegularExpressions.Regex.Replace(funcName, @"([A-Z])", " $1").Trim();
            readable = readable.Replace("Get ", "").Trim();
            info = (readable, $"Retrieved {readable}");
        }

        // Generate query string
        string queryText = $"Checking {info.Title}...";
        
        if (info.Title.Contains("Search") || info.Title.Contains("Forecast"))
        {
            try
            {
                using var doc = JsonDocument.Parse(arguments);
                if (doc.RootElement.TryGetProperty("query", out var q))
                {
                    queryText = $"Searching for '{q}'...";
                }
                else if (doc.RootElement.TryGetProperty("itemId", out var i))
                {
                    queryText = $"Analyzing item '{i}'...";
                }
            }
            catch 
            {
            }
        }

        return new ToolDisplayInfo(queryText, info.Title, info.Content);
    }
    
    /// <summary>
    /// Resolves the fully-accumulated arguments for a tool from the streaming buffer.
    /// Returns null if no match found (caller should fall back to partial args).
    /// </summary>
    private static string? ResolveFullArgs(
        string toolName, 
        Dictionary<string, (string Name, StringBuilder Args)> toolCallBuffer)
    {
        foreach (var kvp in toolCallBuffer)
        {
            if (kvp.Value.Name == toolName)
                return kvp.Value.Args.ToString();
        }
        return null;
    }
    
    private static List<string> GenerateQueryDescriptions(string toolName, string arguments)
    {
        var display = GetToolDisplay(toolName, arguments);
        return [display.Query];
    }
    
    private static ReadResult GenerateReadResult(string toolName, string arguments, string? actualResult = null)
    {
        var display = GetToolDisplay(toolName, arguments);
        return new ReadResult(display.Title, display.Url, actualResult ?? display.Content);
    }
}
