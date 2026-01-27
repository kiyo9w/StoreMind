using System.Text.Json.Serialization;

namespace Kiyo9w.StoreMind.Core.Contracts;

public record SalesPerformance(
    [property: JsonPropertyName("sku")] string Sku,
    [property: JsonPropertyName("avg_weekly_sales")] double AvgWeeklySales,
    [property: JsonPropertyName("last_week_sales")] int LastWeekSales,
    [property: JsonPropertyName("trend")] string Trend
);
