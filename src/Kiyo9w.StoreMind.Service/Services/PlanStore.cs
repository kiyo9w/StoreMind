using System.Text.Json;
using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Core.Contracts;
using Microsoft.Extensions.Options;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// simple JSON file storage for plans
/// </summary>
public class PlanStore
{
    private readonly string _plansDir;
    private readonly JsonSerializerOptions _jsonOptions = new() { WriteIndented = true };

    public PlanStore(IOptions<StoreMindOptions> options)
    {
        _plansDir = options.Value.Persistence.PlansPath;
    }

    public async Task SaveAsync(Plan plan, Verdict verdict, CancellationToken ct = default)
    {
        Directory.CreateDirectory(_plansDir);
        var file = Path.Combine(_plansDir, $"{plan.Date}.json");
        var data = new PlanFile(plan, verdict, DateTime.UtcNow);
        var json = JsonSerializer.Serialize(data, _jsonOptions);
        await File.WriteAllTextAsync(file, json, ct);
    }

    public async Task<(Plan Plan, Verdict Verdict)?> LoadAsync(string date, CancellationToken ct = default)
    {
        var file = Path.Combine(_plansDir, $"{date}.json");
        if (!File.Exists(file)) return null;

        var json = await File.ReadAllTextAsync(file, ct);
        var data = JsonSerializer.Deserialize<PlanFile>(json);
        return data == null ? null : (data.Plan, data.Verdict);
    }

    public IEnumerable<string> ListPlanDates()
    {
        if (!Directory.Exists(_plansDir)) return [];
        return Directory.GetFiles(_plansDir, "*.json")
            .Select(Path.GetFileNameWithoutExtension)
            .Where(n => n != null)
            .Cast<string>()
            .OrderByDescending(d => d);
    }

    private record PlanFile(Plan Plan, Verdict Verdict, DateTime SavedAt);
}
