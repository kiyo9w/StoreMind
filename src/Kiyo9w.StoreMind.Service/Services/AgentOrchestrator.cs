using System.Text.Json;
using Kiyo9w.StoreMind.Core.Configuration;

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

    public async Task<string> ProcessAsync(string userMessage, string? context = null, CancellationToken ct = default)
    {
        _log.LogInformation("Creating agent hierarchy for request: {Message}", userMessage);

        // 1. Create Kernels for the different tiers
        // Manager
        var managerKernel = _kernelFactory.CreateManagerKernel();

        // Specialists
        var specialistKernel = _kernelFactory.CreateSpecialistKernel();

        // 2. Define Agents

        // Orchestrator
        // Delegates to other agents, does not call tools directly.
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

        // Stocker
        // Has direct access to inventory tools.
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
        
        // Add Plugins
        var invPlugin = new Kiyo9w.StoreMind.Service.Plugins.Inventory(_inventory);
        stocker.Kernel.Plugins.AddFromObject(invPlugin, "Inventory");

        // Planner
        // Has access to supplier and planning logic
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
        var supplierPlugin = new Kiyo9w.StoreMind.Service.Plugins.Supplier(_supplier);
        planner.Kernel.Plugins.AddFromObject(supplierPlugin, "Supplier");
        planner.Kernel.Plugins.AddFromObject(_planningPlugin, "Planning");

        // Reviser
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
        // Define selection strategy: Manager decides who speaks next.
        
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

        // 4. Run the loop
        if (!string.IsNullOrEmpty(context))
        {
            chat.AddChatMessage(new ChatMessageContent(AuthorRole.System, $"Current Context: {context}"));
        }
        chat.AddChatMessage(new ChatMessageContent(AuthorRole.User, userMessage));

        string finalResponse = string.Empty;

        try 
        {
            await foreach (var response in chat.InvokeAsync(ct))
            {
                _log.LogInformation("[{Agent}]: {Content}", response.AuthorName, response.Content);
                
                // Capture the latest message from the manager as the potential final response
                if (response.AuthorName == orchestrator.Name)
                {
                    finalResponse = response.Content ?? "";
                }
            }
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Error during agent orchestration");
            finalResponse = "I encountered an error trying to process your request. Please check the logs.";
        }

        // Strip status tags from final response
        if (finalResponse.Contains("<status>"))
        {
            finalResponse = System.Text.RegularExpressions.Regex.Replace(finalResponse, @"<status>.*?</status>", "", System.Text.RegularExpressions.RegexOptions.Singleline).Trim();
        }

        return finalResponse;
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
