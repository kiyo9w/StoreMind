using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Core.Interfaces;
using Kiyo9w.StoreMind.Service.Endpoints;
using Kiyo9w.StoreMind.Service.Services;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configuration
        builder.Services.AddOptions<StoreMindOptions>()
            .BindConfiguration(StoreMindOptions.SectionName);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // CORS
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
                policy.WithOrigins("https://storemind.kiyo9w.dev")
                      .AllowAnyMethod()
                      .AllowAnyHeader());
        });

        // data services
        builder.Services.AddSingleton<IInventory, MockInventoryService>();
        builder.Services.AddSingleton<ISupplier, MockSupplierService>();
        builder.Services.AddHttpClient();

        // local inference


        // plan storage
        builder.Services.AddSingleton<PlanStore>();

        // semantic kernel with OpenAI and plugins
        builder.Services.AddSingleton(sp =>
        {
            var opts = sp.GetRequiredService<IOptions<StoreMindOptions>>().Value;
            var kb = Kernel.CreateBuilder();

            // Add Chat Completion
            if (!string.IsNullOrEmpty(opts.Models.OpenAiKey))
            {
                kb.AddOpenAIChatCompletion("gpt-4o", opts.Models.OpenAiKey);
            }

            var kernel = kb.Build();
            var inventoryPlugin = new Plugins.Inventory(sp.GetRequiredService<IInventory>());
            var supplierPlugin = new Plugins.Supplier(sp.GetRequiredService<ISupplier>());
            var weatherPlugin = new Plugins.WeatherPlugin(sp.GetRequiredService<IHttpClientFactory>().CreateClient());

            kernel.ImportPluginFromObject(inventoryPlugin, "Inventory");
            kernel.ImportPluginFromObject(supplierPlugin, "Supplier");
            kernel.ImportPluginFromObject(weatherPlugin, "Weather");

            return kernel;
        });

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

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // Map Endpoints
        app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }))
           .WithName("HealthCheck")
           .WithOpenApi();

        app.MapManagerEndpoints();

        app.Run();
    }
}
