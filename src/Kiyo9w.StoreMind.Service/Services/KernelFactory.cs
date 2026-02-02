using Kiyo9w.StoreMind.Core.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Factory for creating Semantic Kernel instances with different provider configurations.
/// Supports: Groq, GitHub Models, OpenRouter, Google AI, and OpenAI.
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
    /// Creates a kernel for the Router role (fast classification/routing).
    /// Default: Groq + Llama
    /// </summary>
    public Kernel CreateRouterKernel() =>
        CreateKernel(_options.Models.Router, "Router");

    /// <summary>
    /// Creates a kernel for the Context Worker role (large document processing).
    /// Default: Google AI + Gemini
    /// </summary>
    public Kernel CreateContextWorkerKernel() =>
        CreateKernel(_options.Models.ContextWorker, "ContextWorker");

    /// <summary>
    /// Creates a kernel for the Reasoner role (chain-of-thought reasoning).
    /// Default: OpenRouter + DeepSeek R1
    /// </summary>
    public Kernel CreateReasonerKernel() =>
        CreateKernel(_options.Models.Reasoner, "Reasoner");

    /// <summary>
    /// Creates a kernel for the Judge role (highest quality reasoning, use sparingly).
    /// Default: GitHub Models + OpenAI o3
    /// </summary>
    public Kernel CreateJudgeKernel() =>
        CreateKernel(_options.Models.Judge, "Judge");

    /// <summary>
    /// Creates a kernel for the Specialist role (tool-calling, structured output).
    /// Default: Groq + Llama
    /// </summary>
    public Kernel CreateSpecialistKernel() =>
        CreateKernel(_options.Models.Specialist, "Specialist");

    // ==========================================
    // Legacy Methods (Backward Compatibility)
    // ==========================================

    /// <summary>[DEPRECATED] Use CreateRouterKernel() instead</summary>
    public Kernel CreateManagerKernel() => CreateRouterKernel();

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
    /// [DEPRECATED] Legacy method - auto-detects provider from model ID.
    /// </summary>
    public Kernel CreateKernel(string modelId, string serviceId)
    {
        // Auto-detect provider based on model ID (legacy behavior)
        var provider = DetectProvider(modelId);
        return CreateKernel(modelId, provider, serviceId);
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

        // All supported providers use OpenAI-compatible API format
        builder.AddOpenAIChatCompletion(
            modelId: modelId,
            apiKey: apiKey ?? "",
            endpoint: new Uri(endpoint),
            serviceId: serviceId
        );

        log.LogInformation(
            "Configured kernel '{ServiceId}' with model '{ModelId}' via {Provider} ({Endpoint})",
            serviceId, modelId, providerName, endpoint);
    }

    private (string? apiKey, string endpoint, string name) GetProviderConfig(LlmProvider provider)
    {
        return provider switch
        {
            LlmProvider.Groq => (
                _options.Models.Groq.ApiKey,
                _options.Models.Groq.Endpoint,
                "Groq"
            ),
            LlmProvider.GitHubModels => (
                _options.Models.GitHubModels.ApiKey,
                _options.Models.GitHubModels.Endpoint,
                "GitHub Models"
            ),
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

    /// <summary>
    /// Auto-detect provider from model ID (legacy heuristic).
    /// </summary>
    private LlmProvider DetectProvider(string modelId)
    {
        var model = modelId.ToLowerInvariant();

        // Groq-hosted models
        if (model.Contains("llama") || model.Contains("mixtral") || 
            model.Contains("gemma") || model.Contains("whisper"))
        {
            if (!string.IsNullOrEmpty(_options.Models.Groq.ApiKey))
                return LlmProvider.Groq;
        }

        // GitHub Models (o-series, gpt-5)
        if (model.StartsWith("o1") || model.StartsWith("o3") || model.StartsWith("o4") ||
            model.Contains("gpt-5"))
        {
            if (!string.IsNullOrEmpty(_options.Models.GitHubModels.ApiKey))
                return LlmProvider.GitHubModels;
        }

        // Google Gemini models
        if (model.Contains("gemini"))
        {
            if (!string.IsNullOrEmpty(_options.Models.GoogleAI.ApiKey))
                return LlmProvider.GoogleAI;
        }

        // DeepSeek models (typically via OpenRouter)
        if (model.Contains("deepseek"))
        {
            if (!string.IsNullOrEmpty(_options.Models.OpenRouter.ApiKey))
                return LlmProvider.OpenRouter;
        }

        // Default to OpenAI for gpt-4, gpt-3.5, etc.
        return LlmProvider.OpenAI;
    }
}
