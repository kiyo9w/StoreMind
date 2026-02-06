using System.Diagnostics;
using System.Text;
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
    private readonly PromptLoader _prompts;
    private readonly ILogger<AgentOrchestrator> _log;

    public AgentOrchestrator(
        KernelFactory kernelFactory,
        InventoryService inventory,
        SupplierService supplier,
        Plugins.WeatherPlugin weather,
        Plugins.PlanningPlugin planningPlugin,
        PromptLoader prompts,
        ILogger<AgentOrchestrator> log)
    {
        _kernelFactory = kernelFactory;
        _inventory = inventory;
        _supplier = supplier;
        _weather = weather;
        _planningPlugin = planningPlugin;
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
        var managerKernel = _kernelFactory.CreateManagerKernel();
        var specialistKernel = _kernelFactory.CreateSpecialistKernel();

        // 2. Define Agents
        ChatCompletionAgent orchestrator = new()
        {
            Name = "Orchestrator",
            Instructions = _prompts.LoadWithTime("orchestrator"),
            Kernel = managerKernel,
        };

        ChatCompletionAgent stocker = new()
        {
            Name = "Stocker",
            Instructions = _prompts.LoadWithTime("stocker"),
            Kernel = specialistKernel,
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
            Kernel = specialistKernel,
            Arguments = new KernelArguments(new OpenAIPromptExecutionSettings() 
            { 
                FunctionChoiceBehavior = FunctionChoiceBehavior.Auto() 
            })
        };
        var supplierPlugin = new Plugins.Supplier(_supplier);
        planner.Kernel.Plugins.AddFromObject(supplierPlugin, "Supplier");
        planner.Kernel.Plugins.AddFromObject(_planningPlugin, "Planning");

        ChatCompletionAgent reviser = new()
        {
            Name = "Reviser",
            Instructions = _prompts.LoadWithTime("reviser"),
            Kernel = managerKernel
        };

        // 3. Create Group Chat
        var selectionFunction = KernelFunctionFactory.CreateFromPrompt(
            _prompts.LoadWithTime("agent-selector"),
            functionName: "SelectAgent",
            description: "Decides which agent speaks next");

        AgentGroupChat chat = new(orchestrator, stocker, planner, reviser)
        {
            ExecutionSettings = new()
            {
                TerminationStrategy = new IntentAwareTerminationStrategy()
                {
                    Agents = [orchestrator],
                    MaximumIterations = 15
                },
                SelectionStrategy = new KernelFunctionSelectionStrategy(selectionFunction, managerKernel)
                {
                    HistoryVariableName = "history",
                    ResultParser = (result) => result.GetValue<string>() ?? "Orchestrator"
                }
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
            _ => "Unknown"
        };

        // Streaming state tracking
        string? currentAgent = null;
        var contentBuffer = new StringBuilder();      // Full content for history
        var userFacingBuffer = new StringBuilder();   // Only user-facing content
        var thinkingBuffer = new StringBuilder();
        var agentStartTime = Stopwatch.StartNew();
        bool inThinkingBlock = false;
        bool inStatusBlock = false;
        bool readyToRespond = false;
        var toolCallBuffer = new Dictionary<string, (string Name, StringBuilder Args)>();
        int stepNumber = 0;
        var pendingToolResults = new List<(string Name, string Args, int Step)>();
        bool toolResultsEmitted = false;

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

                // Start new agent
                currentAgent = agentName;
                contentBuffer.Clear();
                userFacingBuffer.Clear();
                thinkingBuffer.Clear();
                toolCallBuffer.Clear();
                agentStartTime.Restart();
                inThinkingBlock = false;
                inStatusBlock = false;

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
                if (pendingToolResults.Count > 0 && !toolResultsEmitted)
                {
                    var readResults = pendingToolResults.Select(t => 
                        GenerateReadResult(t.Name, t.Args)).ToList();
                    
                    yield return new StreamingEvent(StreamEventType.AgentReadResults,
                        new AgentReadResultsData(agentName, stepNumber - 1, readResults));
                    
                    toolResultsEmitted = true;
                    pendingToolResults.Clear();
                }
                
                contentBuffer.Append(chunk.Content);
                var fullContent = contentBuffer.ToString();

                // Enter thinking block
                if (fullContent.Contains("<thinking>") && !inThinkingBlock)
                {
                    inThinkingBlock = true;
                }
                
                // Exit thinking block - extract and emit thinking content
                if (inThinkingBlock && fullContent.Contains("</thinking>"))
                {
                    var start = fullContent.IndexOf("<thinking>") + 10;
                    var end = fullContent.IndexOf("</thinking>");
                    if (end > start)
                    {
                        var thinking = fullContent.Substring(start, end - start);
                        thinkingBuffer.Clear();
                        thinkingBuffer.Append(thinking);
                        
                        yield return new StreamingEvent(StreamEventType.AgentThinking,
                            new AgentThinkingData(agentName, thinking));
                    }
                    inThinkingBlock = false;
                }

                // Enter status block
                if (fullContent.Contains("<status>") && !inStatusBlock)
                {
                    inStatusBlock = true;
                }
                
                // Exit status block and detect ready_to_respond
                if (inStatusBlock && fullContent.Contains("</status>"))
                {
                    // Check if this is the ready_to_respond signal
                    if (fullContent.Contains("<status>ready_to_respond</status>"))
                    {
                        readyToRespond = true;
                        _log.LogInformation("[{Agent}] is ready to respond - enabling text streaming", agentName);
                    }
                    inStatusBlock = false;
                }

                if (!inThinkingBlock && !inStatusBlock && readyToRespond)
                {
                    // Filter out any inline tags from this chunk
                    var cleanChunk = chunk.Content;
                    
                    // Remove thinking tags if they appear in this chunk
                    cleanChunk = System.Text.RegularExpressions.Regex.Replace(
                        cleanChunk, @"</?thinking>", "");
                    
                    // Remove status tags if they appear in this chunk
                    cleanChunk = System.Text.RegularExpressions.Regex.Replace(
                        cleanChunk, @"<status>[^<]*</status>", "");
                    cleanChunk = System.Text.RegularExpressions.Regex.Replace(
                        cleanChunk, @"</?status>", "");
                    
                    // Only emit if there's content left after filtering
                    if (!string.IsNullOrWhiteSpace(cleanChunk))
                    {
                        userFacingBuffer.Append(cleanChunk);
                        yield return new StreamingEvent(StreamEventType.TextChunk,
                            new TextChunkData(cleanChunk));
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
    private class IntentAwareTerminationStrategy : TerminationStrategy
    {
        protected override Task<bool> ShouldAgentTerminateAsync(Agent agent, IReadOnlyList<ChatMessageContent> history, CancellationToken cancellationToken)
        {
            var lastMessage = history.LastOrDefault();
            if (lastMessage?.AuthorName != "Orchestrator") 
                return Task.FromResult(false);
            
            // Parse Manager's message for explicit signal
            var content = lastMessage.Content?.ToLowerInvariant() ?? "";
            bool isReady = content.Contains("<status>ready_to_respond</status>");
            
            // Fallback: If stuck in a loop (too many turns), terminate
            bool isStuck = history.Count(m => m.AuthorName == "Orchestrator") > 8;
            
            return Task.FromResult(isReady || isStuck);
        }
    }
    // ══════════════════════════════════════════════════════════════
    // TOOL DISPLAY HELPERS
    // ══════════════════════════════════════════════════════════════
    
    private record ToolDisplayInfo(string Query, string Title, string Content, string? Url = null);
    
    private static readonly Dictionary<string, ToolDisplayInfo> ToolDisplayMap = new(StringComparer.OrdinalIgnoreCase)
    {
        ["GetInventorySnapshot"]    = new("What's the current inventory status?",        "Inventory Database",  "Retrieved current inventory snapshot"),
        ["GetLowStockItems"]        = new("What items are running low in stock?",        "Low Stock Alert",     "Found items below safety threshold"),
        ["GetExpiringItems"]        = new("Which items will expire soon?",               "Expiring Items",      "Found items expiring soon"),
        ["SearchItems"]             = new("Searching inventory...",                      "Inventory Search",    "Search results"),
        ["GetSalesVelocity"]        = new("How fast is this product selling?",           "Sales Analysis",      "Sales velocity data"),
        ["GetForecast"]             = new("What's the weather forecast?",                "Weather Forecast",    "Weather data retrieved", "https://api.open-meteo.com"),
        ["GetLeadTime"]             = new("Checking supplier delivery times...",         "Supplier Info",       "Supplier lead times"),
        ["GetTodayPlan"]            = new("Reviewing today's action plan...",            "Action Plan",         "Today's operational plan"),
        ["UpdateActionStatus"]      = new("Updating action status...",                   "Plan Update",         "Action status updated"),
    };
    
    private static ToolDisplayInfo GetToolDisplay(string toolName)
    {
        // Normalize: remove "Async" suffix
        var normalized = toolName.Replace("Async", "");
        
        if (ToolDisplayMap.TryGetValue(normalized, out var info))
            return info;
        
        // Fallback for unknown tools
        var readable = normalized.Replace("Get", "").Replace("_", " ");
        return new ToolDisplayInfo($"Checking {readable}...", readable, $"Retrieved {readable}");
    }
    
    private static List<string> GenerateQueryDescriptions(string toolName, string arguments)
    {
        var display = GetToolDisplay(toolName);
        return [display.Query];
    }
    
    private static ReadResult GenerateReadResult(string toolName, string arguments)
    {
        var display = GetToolDisplay(toolName);
        return new ReadResult(display.Title, display.Url, display.Content);
    }
}
