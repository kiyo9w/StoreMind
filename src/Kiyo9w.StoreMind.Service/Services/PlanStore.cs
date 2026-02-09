using System.Text.Json;
using System.Text.Json.Serialization;
using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Core.Contracts;
using Microsoft.Extensions.Options;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// JSON file storage for plans with proper snake_case serialization
/// </summary>
public class PlanStore
{
    private readonly string _plansDir;
    
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
        PropertyNameCaseInsensitive = true,
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    public PlanStore(IOptions<StoreMindOptions> options)
    {
        _plansDir = options.Value.Persistence.PlansPath;
    }

    public async Task SaveAsync(Plan plan, Verdict verdict, CancellationToken ct = default)
    {
        Directory.CreateDirectory(_plansDir);
        var file = Path.Combine(_plansDir, $"{plan.Date}.json");
        var data = new PlanFile(plan, verdict, DateTime.UtcNow);
        var json = JsonSerializer.Serialize(data, JsonOptions);
        
        await File.WriteAllTextAsync(file, json, ct);
    }

    public async Task<(Plan Plan, Verdict Verdict)?> LoadAsync(string date, CancellationToken ct = default)
    {
        if (!System.Text.RegularExpressions.Regex.IsMatch(date, @"^\d{4}-\d{2}-\d{2}$"))
            return null;
        
        var file = Path.Combine(_plansDir, $"{date}.json");
        if (!File.Exists(file)) return null;

        try
        {
            var json = await File.ReadAllTextAsync(file, ct);
            var data = JsonSerializer.Deserialize<PlanFile>(json, JsonOptions);
            return data == null ? null : (data.Plan, data.Verdict);
        }
        catch (JsonException)
        {
            return null;
        }
    }

    public IEnumerable<string> ListPlanDates()
    {
        if (!Directory.Exists(_plansDir)) return [];
        return Directory.GetFiles(_plansDir, "*.json")
            .Select(Path.GetFileNameWithoutExtension)
            .Where(n => n != null && !n.EndsWith(".tmp"))
            .Cast<string>()
            .OrderByDescending(d => d);
    }

    private record PlanFile(Plan Plan, Verdict Verdict, DateTime SavedAt);
}
