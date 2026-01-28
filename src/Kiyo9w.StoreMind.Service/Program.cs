using Kiyo9w.StoreMind.Core.Configuration;
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

        // Enforce Snake Case globally for API responses to match PlanStore requirements
        builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
            options.SerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.SnakeCaseLower);

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
            sp.GetRequiredService<KernelFactory>().CreateManagerKernel());

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
