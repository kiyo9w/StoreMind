using System.Diagnostics;
using System.Text.Json;
using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Core.Contracts;

using Kiyo9w.StoreMind.Service.Plugins;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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
    private readonly IHttpClientFactory _httpFactory;
    private readonly Plugins.PlanningPlugin _planningPlugin;
    private readonly ILogger<AgentOrchestrator> _log;

    public AgentOrchestrator(
        KernelFactory kernelFactory,
        InventoryService inventory,
        SupplierService supplier,
        IHttpClientFactory httpFactory,
        Plugins.PlanningPlugin planningPlugin,
        ILogger<AgentOrchestrator> log)
    {
        _kernelFactory = kernelFactory;
        _inventory = inventory;
        _supplier = supplier;
        _httpFactory = httpFactory;
        _planningPlugin = planningPlugin;
        _log = log;
    }

    /// <summary>
    /// Process a user message through the agent hierarchy.
    /// Yields AgentTrace events as each agent responds (for real-time SSE streaming).
    /// </summary>
    public async IAsyncEnumerable<AgentTrace> ProcessAsync(
        string userMessage, 
        string? context = null, 
        [System.Runtime.CompilerServices.EnumeratorCancellation] CancellationToken ct = default)
    {
        _log.LogInformation("Processing request: {Message}", userMessage);

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
                You have direct access to the store's inventory system.
                
                <Goal>
                Provide insights, not just raw data.
                Example: Instead of just 'Stock: 150', say 'Stock is 150, which is 3x our weekly average. This implies overstock.'
                </Goal>
                
                Use your tools to answer questions about stock levels, low stock items, and expiry.",
            Kernel = specialistKernel,
            Arguments = new KernelArguments(new OpenAIPromptExecutionSettings() 
            { 
                FunctionChoiceBehavior = FunctionChoiceBehavior.Auto() 
            })
        };
        var invPlugin = new Plugins.Inventory(_inventory);
        stocker.Kernel.Plugins.AddFromObject(invPlugin, "Inventory");

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
            @"Review the conversation and decide which agent should speak next.
            
            <Agents>
            - Orchestrator: Synthesize results, delegate tasks, or provide final answer.
            - Stocker: Pending question about stock/expiry.
            - Planner: Pending question about suppliers/planning.
            - Reviser: Orchestrator just proposed a plan/answer and needs review.
            </Agents>
            
            History:
            {{$history}}
            
            Return ONLY the agent name.",
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

        // 4. Run and yield
        if (!string.IsNullOrEmpty(context))
        {
            userMessage = $"Context:\n{context}\n\nRequest:\n{userMessage}";
        }
        chat.AddChatMessage(new ChatMessageContent(AuthorRole.User, userMessage));

        // helpers
        static string? ExtractThinking(string? content)
        {
            if (string.IsNullOrEmpty(content)) return null;
            var start = content.IndexOf("<thinking>");
            var end = content.IndexOf("</thinking>");
            if (start >= 0 && end > start)
                return content.Substring(start + 10, end - (start + 10)).Trim();
            return null;
        }
        
        static string GetAgentRole(string? name) => name switch
        {
            "Orchestrator" => "Manager",
            "Stocker" => "Specialist",
            "Planner" => "Specialist",
            "Reviser" => "Manager",
            _ => "Unknown"
        };

        await foreach (var response in chat.InvokeAsync(ct))
        {
            _log.LogInformation("[{Agent}]: {Content}", response.AuthorName, response.Content);
            
            yield return new AgentTrace(
                AgentName: response.AuthorName ?? "Unknown",
                Role: GetAgentRole(response.AuthorName),
                Content: response.Content ?? "",
                Timestamp: DateTimeOffset.UtcNow)
            {
                ThinkingContent = ExtractThinking(response.Content),
                ModelUsed = response.AuthorName is "Orchestrator" or "Reviser" 
                    ? "manager-model" 
                    : "specialist-model"
            };
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
