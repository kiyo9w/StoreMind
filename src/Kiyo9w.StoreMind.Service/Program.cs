using Infisical.Sdk;
using Infisical.Sdk.Model;
using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Service.Endpoints;
using Kiyo9w.StoreMind.Service.Services;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service;

public class Program
{
    public static async Task Main(string[] args)
    {
        // Load secrets from Infisical (production) or environment variables (local dev)
        await LoadSecretsFromInfisical();
        
        var builder = WebApplication.CreateBuilder(args);

        // Add environment variables to configuration
        builder.Configuration.AddEnvironmentVariables();

        // Configuration
        builder.Services.AddOptions<StoreMindOptions>()
            .BindConfiguration(StoreMindOptions.SectionName)
            .PostConfigure(options =>
            {
                // API keys are now set as environment variables by Infisical
                var groqKey = Environment.GetEnvironmentVariable("GROQ_API_KEY");
                var githubKey = Environment.GetEnvironmentVariable("GITHUB_MODELS_API_KEY");
                var openRouterKey = Environment.GetEnvironmentVariable("OPENROUTER_API_KEY");
                var googleKey = Environment.GetEnvironmentVariable("GOOGLE_AI_API_KEY");
                var openAiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");

                if (!string.IsNullOrEmpty(groqKey))
                    options.Models.Groq.ApiKey = groqKey;
                if (!string.IsNullOrEmpty(githubKey))
                    options.Models.GitHubModels.ApiKey = githubKey;
                if (!string.IsNullOrEmpty(openRouterKey))
                    options.Models.OpenRouter.ApiKey = openRouterKey;
                if (!string.IsNullOrEmpty(googleKey))
                    options.Models.GoogleAI.ApiKey = googleKey;
                if (!string.IsNullOrEmpty(openAiKey))
                    options.Models.OpenAI.ApiKey = openAiKey;
            });

        // Enforce Snake Case globally for API responses to match PlanStore requirements
        builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
        {
            options.SerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.SnakeCaseLower;
            options.SerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter(System.Text.Json.JsonNamingPolicy.SnakeCaseUpper));
        });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // CORS
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
                policy.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader());
        });

        // data services (concrete classes, no interfaces needed for demo)
        builder.Services.AddSingleton<InventoryService>();
        builder.Services.AddSingleton<SupplierService>();
        builder.Services.AddHttpClient();

        // local inference


        // plan storage
        builder.Services.AddSingleton<PlanStore>();

        // semantic kernel factory
        builder.Services.AddSingleton<KernelFactory>();

        // default kernel for simple API operations (matches Manager Agent configuration)
        builder.Services.AddTransient(sp => 
            sp.GetRequiredService<KernelFactory>().CreateRouterKernel());

        // Weather plugin
        builder.Services.AddSingleton(sp => 
            new Plugins.WeatherPlugin(sp.GetRequiredService<IHttpClientFactory>().CreateClient()));

        // planning services
        builder.Services.AddScoped<OvernightPlanner>();
        builder.Services.AddScoped<PlanCritic>();
        builder.Services.AddScoped<AgentOrchestrator>();

        builder.Services.AddScoped<Plugins.PlanningPlugin>();

        var app = builder.Build();

        app.UseCors();

        // Enable Swagger in all environments for now
        app.UseSwagger();
        app.UseSwaggerUI();

        if (app.Environment.IsDevelopment())
        {
            // app.UseSwagger(); // Moved out
            // app.UseSwaggerUI(); // Moved out
        }

        // Map Endpoints
        app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }))
           .WithName("HealthCheck")
           .WithOpenApi();

        app.MapManagerEndpoints();
        app.MapStaffEndpoints();

        app.Run();
    }

    /// <summary>
    /// Loads secrets from Infisical Cloud using Machine Identity authentication.
    /// Requires INFISICAL_CLIENT_ID and INFISICAL_CLIENT_SECRET environment variables.
    /// Falls back to existing environment variables if Infisical credentials are not set.
    /// </summary>
    private static async Task LoadSecretsFromInfisical()
    {
        var clientId = Environment.GetEnvironmentVariable("INFISICAL_CLIENT_ID");
        var clientSecret = Environment.GetEnvironmentVariable("INFISICAL_CLIENT_SECRET");

        // Skip Infisical if credentials not provided (local dev with manual env vars)
        if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
        {
            Console.WriteLine("[Secrets] Infisical credentials not found, using environment variables directly");
            return;
        }

        try
        {
            Console.WriteLine("[Secrets] Loading secrets from Infisical...");

            var settings = new InfisicalSdkSettingsBuilder()
                .WithHostUri("https://app.infisical.com")
                .Build();

            var infisicalClient = new InfisicalClient(settings);

            // Authenticate with Machine Identity (Universal Auth)
            await infisicalClient.Auth().UniversalAuth().LoginAsync(clientId, clientSecret);

            // Fetch secrets from the StoreMind project (Production environment)
            var options = new ListSecretsOptions
            {
                SetSecretsAsEnvironmentVariables = true,  // Automatically set as env vars
                EnvironmentSlug = "prod",
                SecretPath = "/",
                ProjectId = "2ecc0762-17ae-4fc4-88af-9eb5cc264f7c",  // StoreMind project ID
            };

            var secrets = await infisicalClient.Secrets().ListAsync(options);

            Console.WriteLine($"[Secrets] Loaded {secrets?.Length ?? 0} secrets from Infisical");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Secrets] Failed to load from Infisical: {ex.Message}");
            Console.WriteLine("[Secrets] Falling back to environment variables");
        }
    }
}
