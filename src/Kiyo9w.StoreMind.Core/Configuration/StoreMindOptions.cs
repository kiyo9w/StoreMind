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
    /// <summary>OpenAI direct API (api.openai.com)</summary>
    OpenAI,
    /// <summary>Groq Cloud (api.groq.com) - Ultra-fast inference</summary>
    Groq,
    /// <summary>GitHub Models (models.inference.ai.azure.com) - Free tier with o3, gpt-5</summary>
    GitHubModels,
    /// <summary>OpenRouter (openrouter.ai) - Multi-provider gateway with DeepSeek, etc.</summary>
    OpenRouter,
    /// <summary>Google AI Studio (generativelanguage.googleapis.com) - Gemini models</summary>
    GoogleAI
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
    /// <summary>The model ID to use (e.g., "o3", "llama-3.3-70b-versatile")</summary>
    public string ModelId { get; set; } = "";
    
    /// <summary>Which provider serves this model</summary>
    public LlmProvider Provider { get; set; } = LlmProvider.Groq;
}

/// <summary>
/// AI models and provider configurations for different pipeline stages
/// </summary>
public class ModelOptions
{
    // ==========================================
    // Provider Configurations
    // ==========================================
    
    /// <summary>Groq Cloud - Ultra-fast inference for routing and specialists</summary>
    public ProviderConfig Groq { get; set; } = new()
    {
        Endpoint = "https://api.groq.com/openai/v1"
    };
    
    /// <summary>GitHub Models - Free tier access to OpenAI o3, gpt-5 (rate limited)</summary>
    public ProviderConfig GitHubModels { get; set; } = new()
    {
        // Per docs: https://docs.github.com/github-models/prototyping-with-ai-models
        // Endpoint is models.github.ai/inference (NOT models.inference.ai.azure.com)
        Endpoint = "https://models.github.ai/inference"
    };
    
    /// <summary>OpenRouter - Gateway to DeepSeek, Mistral, and many other models</summary>
    public ProviderConfig OpenRouter { get; set; } = new()
    {
        Endpoint = "https://openrouter.ai/api/v1"
    };
    
    /// <summary>Google AI Studio - Gemini models with massive context windows</summary>
    public ProviderConfig GoogleAI { get; set; } = new()
    {
        Endpoint = "https://generativelanguage.googleapis.com/v1beta/openai"
    };
    
    /// <summary>OpenAI Direct - Official OpenAI API (paid)</summary>
    public ProviderConfig OpenAI { get; set; } = new()
    {
        Endpoint = "https://api.openai.com/v1"
    };

    // ==========================================
    // Agent Role Assignments
    // ==========================================
    
    /// <summary>
    /// The "Router" - Fast classification and intent routing.
    /// Recommended: Groq + Llama for instant responses.
    /// </summary>
    public AgentModelConfig Router { get; set; } = new()
    {
        ModelId = "llama-3.3-70b-versatile",
        Provider = LlmProvider.Groq
    };
    
    /// <summary>
    /// The "Context Worker" - Heavy lifting, large document processing.
    /// Recommended: Google Gemini for 1M+ context window.
    /// </summary>
    public AgentModelConfig ContextWorker { get; set; } = new()
    {
        // Using Gemini 2.5 Flash Lite for maximum cost efficiency on high-volume tasks
        ModelId = "gemini-2.5-flash-lite",
        Provider = LlmProvider.GoogleAI
    };
    
    /// <summary>
    /// The "Daily Reasoner" - Good reasoning without strict rate limits.
    /// Recommended: OpenRouter + DeepSeek R1 for chain-of-thought.
    /// </summary>
    public AgentModelConfig Reasoner { get; set; } = new()
    {
        ModelId = "deepseek/deepseek-r1",
        Provider = LlmProvider.OpenRouter
    };
    
    /// <summary>
    /// The "Judge" - Highest reasoning quality, use sparingly (8-12 req/day).
    /// Recommended: GitHub Models + OpenAI o3.
    /// </summary>
    public AgentModelConfig Judge { get; set; } = new()
    {
        // GitHub Models requires "openai/" prefix for OpenAI models
        ModelId = "openai/o3",
        Provider = LlmProvider.GitHubModels
    };
    
    /// <summary>
    /// The "Specialist" - Tool-calling and structured output.
    /// Recommended: Groq + Llama for fast JSON generation.
    /// </summary>
    public AgentModelConfig Specialist { get; set; } = new()
    {
        ModelId = "llama-3.3-70b-versatile",
        Provider = LlmProvider.Groq
    };

    // ==========================================
    // Legacy Properties (Backward Compatibility)
    // ==========================================
    
    /// <summary>[DEPRECATED] Use Groq.ApiKey instead</summary>
    public string GroqApiKey 
    { 
        get => Groq.ApiKey; 
        set => Groq.ApiKey = value; 
    }
    
    /// <summary>[DEPRECATED] Use Groq.Endpoint instead</summary>
    public string GroqEndpoint 
    { 
        get => Groq.Endpoint; 
        set => Groq.Endpoint = value; 
    }
    
    /// <summary>[DEPRECATED] Use OpenAI.ApiKey instead</summary>
    public string OpenAiKey 
    { 
        get => OpenAI.ApiKey; 
        set => OpenAI.ApiKey = value; 
    }
    
    /// <summary>[DEPRECATED] Not used</summary>
    public string AnthropicKey { get; set; } = "";
    
    /// <summary>[DEPRECATED] Use Router.ModelId instead</summary>
    public string ManagerModelId 
    { 
        get => Router.ModelId; 
        set => Router.ModelId = value; 
    }
    
    /// <summary>[DEPRECATED] Use Specialist.ModelId instead</summary>
    public string SpecialistModelId 
    { 
        get => Specialist.ModelId; 
        set => Specialist.ModelId = value; 
    }
    
    /// <summary>[DEPRECATED] Use ContextWorker.ModelId instead</summary>
    public string WorkerModelId 
    { 
        get => ContextWorker.ModelId; 
        set => ContextWorker.ModelId = value; 
    }
    
    /// <summary>[DEPRECATED] Use Reasoner.ModelId instead</summary>
    public string PlannerModel 
    { 
        get => Reasoner.ModelId; 
        set => Reasoner.ModelId = value; 
    }
    
    /// <summary>[DEPRECATED] Use Judge.ModelId instead</summary>
    public string CriticModel 
    { 
        get => Judge.ModelId; 
        set => Judge.ModelId = value; 
    }
}
