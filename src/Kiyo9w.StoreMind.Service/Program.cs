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

        // data services
        // TODO

        // local inference
        builder.Services.AddSingleton<Phi3Chat>();

        // plan storage
        builder.Services.AddSingleton<PlanStore>();

        // semantic kernel with OpenAI and plugins
        builder.Services.AddSingleton(sp =>
        {
            var opts = sp.GetRequiredService<IOptions<StoreMindOptions>>().Value;
            var kb = Kernel.CreateBuilder();

            // add OpenAI chat completion (used for both planner and critic)
            if (!string.IsNullOrEmpty(opts.Models.OpenAiKey))
            {
                kb.AddOpenAIChatCompletion("gpt-4o", opts.Models.OpenAiKey);
            }

            var kernel = kb.Build();

            // add plugins
            // TODO

            return kernel;
        });

        // planning services
        builder.Services.AddSingleton<OvernightPlanner>();
        builder.Services.AddSingleton<PlanCritic>();

        // background job
        builder.Services.AddHostedService<PlanningJob>();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // Map Endpoints
        app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }))
           .WithName("HealthCheck")
           .WithOpenApi();

        app.MapStaffEndpoints();
        app.MapPlanningEndpoints();
        app.MapManagerEndpoints();

        app.Run();
    }
}
