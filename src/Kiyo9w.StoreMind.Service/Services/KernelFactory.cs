using Kiyo9w.StoreMind.Core.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service.Services;

public class KernelFactory(
    IOptions<StoreMindOptions> options,
    IServiceProvider sp,
    ILogger<KernelFactory> log)
{
    private readonly StoreMindOptions _options = options.Value;

    public Kernel CreateManagerKernel() => 
        CreateKernel(_options.Models.ManagerModelId, "Manager");

    public Kernel CreateSpecialistKernel() => 
        CreateKernel(_options.Models.SpecialistModelId, "Specialist");

    public Kernel CreateKernel(string modelId, string serviceId)
    {
        var builder = Kernel.CreateBuilder();

        // 1. Configure AI Verification/Generation Service
        ConfigureService(builder, modelId, serviceId);

        // 2. Add Common Services from DI
        builder.Services.AddSingleton(sp.GetRequiredService<ILoggerFactory>());
        
        // 3. Import Common Plugins (if any) - keeping them minimal here
        // Note: Plugins are usually added by the consumer (AgentOrchestrator) based on role
        // allowing for "Least Privilege" principle.

        return builder.Build();
    }

    private void ConfigureService(IKernelBuilder builder, string modelId, string serviceId)
    {
        // Heuristic to determine provider based on model ID
        // In a real app, this should be explicit in config, but for this demo, we infer.
        bool isGroqModel = modelId.Contains("llama", StringComparison.OrdinalIgnoreCase) || 
                          modelId.Contains("mixtral", StringComparison.OrdinalIgnoreCase) ||
                          modelId.Contains("gemma", StringComparison.OrdinalIgnoreCase);

        bool useGroq = isGroqModel && !string.IsNullOrEmpty(_options.Models.GroqApiKey);
        
        string apiKey = useGroq ? _options.Models.GroqApiKey : _options.Models.OpenAiKey;
        string endpoint = useGroq ? _options.Models.GroqEndpoint : "https://api.openai.com/v1";

        if (string.IsNullOrEmpty(apiKey))
        {
            log.LogWarning("No API Key found for {ServiceId} ({Provider}). Agent may fail.", serviceId, useGroq ? "Groq" : "OpenAI");
        }

        // Add Chat Completion
        builder.AddOpenAIChatCompletion(
            modelId: modelId,
            apiKey: apiKey,
            endpoint: new Uri(endpoint),
            serviceId: serviceId
        );
        
        log.LogInformation("Configured Kernel for {ServiceId} with model {ModelId} via {Provider}", 
            serviceId, modelId, useGroq ? "Groq" : "OpenAI");
    }
}
