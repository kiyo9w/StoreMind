

using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Service.Endpoints;

namespace Kiyo9w.StoreMind.Service;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Configuration
        builder.Services.AddOptions<StoreMindOptions>()
            .BindConfiguration(StoreMindOptions.SectionName)
            .ValidateDataAnnotations()
            .ValidateOnStart();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

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
