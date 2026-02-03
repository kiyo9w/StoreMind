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
    private readonly ILogger<AgentOrchestrator> _log;

    public AgentOrchestrator(
        KernelFactory kernelFactory,
        InventoryService inventory,
        SupplierService supplier,
        Plugins.WeatherPlugin weather,
        Plugins.PlanningPlugin planningPlugin,
        ILogger<AgentOrchestrator> log)
    {
        _kernelFactory = kernelFactory;
        _inventory = inventory;
        _supplier = supplier;
        _weather = weather;
        _planningPlugin = planningPlugin;
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
            Instructions = @"You are the Orchestrator for StoreMind.
                Your goal is to coordinate store operations by delegating to other agents.
                
                Your Roster:
                - Stocker: Check stock, low stock, expiry.
                - Planner: Create or validate purchase orders, update plan actions.
                - Reviser: Reviews your proposed answers for safety and logic errors.
                
                <Protocol>
                1. Check the context for User Role.
                   - If ""User: Staff"": DO NOT call Planner. Staff cannot modify plans. They can ONLY query inventory.
                   - If ""User: Manager"": Full access allowed.
                2. Analyze the user request in a <thinking> block.
                3. If you need data, call the appropriate agent (Stocker for everyone, Planner for Manager only).
                4. Before giving a final answer, ask the Reviser to review it.
                5. Once the Reviser approves (or if the request is trivial), output your final response.
                6. When you are done, output <status>ready_to_respond</status>.
                </Protocol>
                
                <StatusTags>
                - <status>thinking</status>: You are still gathering info.
                - <status>ready_to_respond</status>: You have a final answer for the user.
                </StatusTags>
                
                Do NOT call tools yourself. Delegate.",
            Kernel = managerKernel,
        };

        ChatCompletionAgent stocker = new()
        {
            Name = "Stocker",
            Instructions = @"You are the Stocker.
                You have direct access to the store's inventory system AND weather data.
                
                <Goal>
                Provide insights, not just raw data.
                Example: Instead of just 'Stock: 150', say 'Stock is 150, which is 3x our weekly average. This implies overstock.'
                Correlate weather with demand: hot weather = more cold drinks, rain = more umbrellas.
                </Goal>
                
                Use your tools to answer questions about stock levels, expiry, AND weather conditions.",
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
            Instructions = @"You are the Planner.
                You handle supplier checks and order planning.
                
                <Goal>
                Provide actionable planning advice.
                When updating plans, explain the financial/operational impact of your changes.
                </Goal>
                
                Use tools to check prices, supplier status, or UPDATE the plan.",
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
            Instructions = @"You are the Reviser.
                Your job is to challenge the Orchestrator's proposals.
                
                <Protocol>
                1. Review the proposed answer or plan.
                2. Identify risks, inconsistencies, or oversights (e.g., ordering high qty of expiring items).
                3. If the plan is sound, say 'APPROVED'.
                4. If flawed, explain why and suggest a fix.
                </Protocol>",
            Kernel = managerKernel
        };

        // 3. Create Group Chat
        var selectionFunction = KernelFunctionFactory.CreateFromPrompt(
            @"You are the turn manager for a multi-agent system. Decide which agent should speak next.

            <CRITICAL_RULE>
            If no agent has spoken yet (only User message in history), ALWAYS return ""Orchestrator"".
            The Orchestrator MUST speak first to analyze and delegate tasks.
            </CRITICAL_RULE>
            
            <Agents>
            - Orchestrator: The coordinator. ALWAYS speaks first. Analyzes requests, delegates to specialists, synthesizes results, provides final answers.
            - Stocker: Specialist for inventory/stock/expiry/weather questions. Only speaks when Orchestrator delegates.
            - Planner: Specialist for suppliers/pricing/planning. Only speaks when Orchestrator delegates.
            - Reviser: Reviews Orchestrator's proposed answers for safety. Speaks after Orchestrator proposes a solution.
            </Agents>
            
            <History>
            {{$history}}
            </History>
            
            Return ONLY the agent name (Orchestrator, Stocker, Planner, or Reviser).",
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
        var contentBuffer = new StringBuilder();
        var thinkingBuffer = new StringBuilder();
        var agentStartTime = Stopwatch.StartNew();
        bool inThinkingBlock = false;
        var toolCallBuffer = new Dictionary<string, (string Name, StringBuilder Args)>();

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
                thinkingBuffer.Clear();
                toolCallBuffer.Clear();
                agentStartTime.Restart();
                inThinkingBlock = false;

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
                contentBuffer.Append(chunk.Content);

                // Detect <thinking> block boundaries
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

                // Always emit text-chunk for UI streaming
                yield return new StreamingEvent(StreamEventType.TextChunk,
                    new TextChunkData(chunk.Content));
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
}
