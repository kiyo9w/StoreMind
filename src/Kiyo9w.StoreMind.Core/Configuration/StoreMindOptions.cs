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
/// AI models for different pipeline stages
/// </summary>
public class ModelOptions
{


    // API keys for cloud models
    public string OpenAiKey { get; set; } = "";
    public string AnthropicKey { get; set; } = "";

    /// <summary>
    /// Model id for RAG and tool retrieval
    /// </summary>
    public string QuerryModel { get; set; } = "phi-3-mini";

    /// <summary>
    /// Model id for the planner
    /// </summary>
    public string PlannerModel { get; set; } = "claude-opus-4.5";

    /// <summary>
    /// Model id for the critic agent
    /// </summary>
    public string CriticModel { get; set; } = "gpt-5.2";
    public string GroqApiKey { get; set; } = "";
    public string GroqEndpoint { get; set; } = "https://api.groq.com/openai/v1";

    public string ManagerModelId { get; set; } = "gpt-5.2";
    public string SpecialistModelId { get; set; } = "llama-3.3-70b-versatile";
    public string WorkerModelId { get; set; } = "qwen-2.5-7b";
}
