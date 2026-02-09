using System.ComponentModel.DataAnnotations;

namespace Kiyo9w.StoreMind.Core.Configuration;

/// <summary>
/// Main config settings for the storemind app
/// </summary>
public class StoreMindOptions
{
    public const string SectionName = "StoreMind";

    /// <summary>
    /// The specific store id this instance runs
    /// </summary>
    [Required]
    public string StoreId { get; set; } = "store-001";

    public PersistenceOptions Persistence { get; set; } = new();
    public OrchestrationOptions Orchestration { get; set; } = new();
    public ModelOptions Models { get; set; } = new();
}



/// <summary>
/// File paths for saving plans and logs
/// </summary>
public class PersistenceOptions
{
    public string BasePath { get; set; } = "./data";
    public string PlansPath { get; set; } = "./data/plans";
    public string LogsPath { get; set; } = "./logs";
}

/// <summary>
/// Limits and timeouts for the agent loop
/// </summary>
public class OrchestrationOptions
{
    /// <summary>
    /// Max planning loops before forcing a stop
    /// </summary>
    public int MaxIterations { get; set; } = 3;

    /// <summary>
    /// Limit on tool calls
    /// </summary>
    public int MaxToolCalls { get; set; } = 10;
    public int TimeoutSeconds { get; set; } = 60;
}

/// <summary>
/// Supported LLM providers
/// </summary>
public enum LlmProvider
{
    /// <summary>OpenRouter (openrouter.ai) - Multi-provider gateway with DeepSeek, etc.</summary>
    OpenRouter,
    /// <summary>Google AI direct API</summary>
    GoogleAI,
    /// <summary>OpenAI direct API</summary>
    OpenAI
}

/// <summary>
/// Configuration for a specific LLM provider
/// </summary>
public class ProviderConfig
{
    /// <summary>API key for authentication</summary>
    public string ApiKey { get; set; } = "";
    
    /// <summary>Base endpoint URL for the provider</summary>
    public string Endpoint { get; set; } = "";
    
    /// <summary>Whether this provider is enabled</summary>
    public bool Enabled { get; set; } = true;
}

/// <summary>
/// Configuration for an agent role's model assignment
/// </summary>
public class AgentModelConfig
{
    /// <summary>The model ID to use (e.g., "google/gemini-2.0-flash-001")</summary>
    public string ModelId { get; set; } = "";
    
    /// <summary>Which provider serves this model</summary>
    public LlmProvider Provider { get; set; } = LlmProvider.OpenRouter;
}

/// <summary>
/// AI models and provider configurations for different pipeline stages
/// </summary>
public class ModelOptions
{
    // ==========================================
    // Provider Configurations
    // ==========================================
    
    /// <summary>OpenRouter - Gateway to DeepSeek, Mistral, and many other models</summary>
    public ProviderConfig OpenRouter { get; set; } = new()
    {
        Endpoint = "https://openrouter.ai/api/v1"
    };

    /// <summary>Google AI - For direct Gemini access if needed</summary>
    public ProviderConfig GoogleAI { get; set; } = new()
    {
        Endpoint = "https://generativelanguage.googleapis.com/v1beta/openai"
    };

    /// <summary>OpenAI - For direct OpenAI access if needed</summary>
    public ProviderConfig OpenAI { get; set; } = new()
    {
        Endpoint = "https://api.openai.com/v1"
    };

    // ==========================================
    // Agent Role Assignments
    // ==========================================

    /// <summary>
    /// Configuration for the Orchestrator agent (The Boss).
    /// Typically a fast, smart model (e.g., Gemini Flash).
    /// </summary>
    public AgentModelConfig Orchestrator { get; set; } = new() { ModelId = "google/gemini-2.0-flash-001", Provider = LlmProvider.OpenRouter };

    /// <summary>
    /// Configuration for the Planner agent.
    /// Typically a high-reasoning/tool-use model (e.g., Llama 3.3).
    /// </summary>
    public AgentModelConfig Planner { get; set; } = new() { ModelId = "meta-llama/llama-3.3-70b-instruct", Provider = LlmProvider.OpenRouter };

    /// <summary>
    /// Configuration for the Stocker agent.
    /// Typically a high-reasoning/tool-use model (e.g., Llama 3.3).
    /// </summary>
    public AgentModelConfig Stocker { get; set; } = new() { ModelId = "meta-llama/llama-3.3-70b-instruct", Provider = LlmProvider.OpenRouter };

    /// <summary>
    /// Configuration for the Reviser agent (Critic/Judge).
    /// Typically a high-quality model for final validation (e.g., GPT-5.2/4o).
    /// </summary>
    public AgentModelConfig Reviser { get; set; } = new() { ModelId = "openai/gpt-4o", Provider = LlmProvider.OpenRouter };

    /// <summary>
    /// Configuration for the Summarizer agent (Context reduction).
    /// Typically a fast, high-context model (e.g., Gemini Flash).
    /// </summary>
    public AgentModelConfig Summarizer { get; set; } = new() { ModelId = "google/gemini-2.0-flash-001", Provider = LlmProvider.OpenRouter };

    /// <summary>
    /// Configuration for the Reporter agent (Final answer synthesis).
    /// Fast model that writes user-facing responses based on specialist outputs.
    /// </summary>
    public AgentModelConfig Reporter { get; set; } = new() { ModelId = "google/gemini-2.0-flash-001", Provider = LlmProvider.OpenRouter };

}
