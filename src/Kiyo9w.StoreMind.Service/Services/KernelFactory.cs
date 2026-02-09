using Kiyo9w.StoreMind.Core.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Factory for creating Semantic Kernel instances.
/// Refactored to use OpenRouter as the primary provider.
/// </summary>
public class KernelFactory(
    IOptions<StoreMindOptions> options,
    IServiceProvider sp,
    ILogger<KernelFactory> log)
{
    private readonly StoreMindOptions _options = options.Value;

    // ==========================================
    // Role-Based Kernel Creation
    // ==========================================

    /// <summary>
    /// Creates a kernel for the Orchestrator agent.
    /// Target: Gemini 3.0 Flash (via OpenRouter)
    /// </summary>
    public Kernel CreateOrchestratorKernel() =>
        CreateKernel(_options.Models.Orchestrator, "Orchestrator");

    /// <summary>
    /// Creates a kernel for the Planner agent.
    /// Target: Llama 3.3 70B (via OpenRouter)
    /// </summary>
    public Kernel CreatePlannerKernel() =>
        CreateKernel(_options.Models.Planner, "Planner");

    /// <summary>
    /// Creates a kernel for the Stocker agent.
    /// Target: Llama 3.3 70B (via OpenRouter)
    /// </summary>
    public Kernel CreateStockerKernel() =>
        CreateKernel(_options.Models.Stocker, "Stocker");

    /// <summary>
    /// Creates a kernel for the Reviser agent.
    /// </summary>
    public Kernel CreateReviserKernel() =>
        CreateKernel(_options.Models.Reviser, "Reviser");

    /// <summary>
    /// Creates a kernel for the Summarizer agent.
    /// Target: Gemini 3.0 Flash (via OpenRouter)
    /// </summary>
    public Kernel CreateSummarizerKernel() =>
        CreateKernel(_options.Models.Summarizer, "Summarizer");

    /// <summary>
    /// Creates a kernel for the Reporter agent.
    /// Target: Gemini 3.0 Flash (via OpenRouter)
    /// </summary>
    public Kernel CreateReporterKernel() =>
        CreateKernel(_options.Models.Reporter, "Reporter");

    // ==========================================
    // Core Kernel Building
    // ==========================================

    /// <summary>
    /// Creates a kernel using explicit agent model configuration.
    /// </summary>
    public Kernel CreateKernel(AgentModelConfig config, string serviceId)
    {
        var builder = Kernel.CreateBuilder();

        // 1. Configure AI Service based on provider
        ConfigureProvider(builder, config.Provider, config.ModelId, serviceId);

        // 2. Add Common Services from DI
        builder.Services.AddSingleton(sp.GetRequiredService<ILoggerFactory>());

        return builder.Build();
    }

    /// <summary>
    /// Creates a kernel with explicit model and provider specification.
    /// </summary>
    public Kernel CreateKernel(string modelId, LlmProvider provider, string serviceId)
    {
        var config = new AgentModelConfig { ModelId = modelId, Provider = provider };
        return CreateKernel(config, serviceId);
    }

    /// <summary>
    /// [DEPRECATED] Legacy method - defaults to OpenRouter.
    /// </summary>
    public Kernel CreateKernel(string modelId, string serviceId)
    {
        // Default to OpenRouter for everything now to simplify
        return CreateKernel(modelId, LlmProvider.OpenRouter, serviceId);
    }

    // ==========================================
    // Provider Configuration
    // ==========================================

    private void ConfigureProvider(IKernelBuilder builder, LlmProvider provider, string modelId, string serviceId)
    {
        var (apiKey, endpoint, providerName) = GetProviderConfig(provider);

        if (string.IsNullOrEmpty(apiKey))
        {
            log.LogWarning(
                "No API key configured for {Provider}. Agent '{ServiceId}' with model '{ModelId}' may fail. " +
                "Set the key via environment variable or appsettings.",
                providerName, serviceId, modelId);
        }

        var httpClient = new HttpClient();
        
        if (provider == LlmProvider.OpenRouter)
        {
            httpClient.DefaultRequestHeaders.Add("HTTP-Referer", "https://storemind.kiyow.dev");
            httpClient.DefaultRequestHeaders.Add("X-Title", "StoreMind");
        }

        builder.AddOpenAIChatCompletion(
            modelId: modelId,
            apiKey: apiKey ?? "",
            httpClient: httpClient,
            endpoint: new Uri(endpoint),
            serviceId: serviceId
        );

        log.LogInformation(
            "Configured kernel '{ServiceId}' with model '{ModelId}' via {Provider}",
            serviceId, modelId, providerName);
    }

    private (string? apiKey, string endpoint, string name) GetProviderConfig(LlmProvider provider)
    {
        return provider switch
        {
            LlmProvider.OpenRouter => (
                _options.Models.OpenRouter.ApiKey,
                _options.Models.OpenRouter.Endpoint,
                "OpenRouter"
            ),
            LlmProvider.GoogleAI => (
                _options.Models.GoogleAI.ApiKey,
                _options.Models.GoogleAI.Endpoint,
                "Google AI"
            ),
            LlmProvider.OpenAI => (
                _options.Models.OpenAI.ApiKey,
                _options.Models.OpenAI.Endpoint,
                "OpenAI"
            ),
            _ => throw new ArgumentException($"Unsupported provider: {provider}", nameof(provider))
        };
    }
}
