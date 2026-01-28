using System.Text.Json.Serialization;

namespace Kiyo9w.StoreMind.Core.Contracts;

public record SalesPerformance(
    string Sku,
    double AvgWeeklySales,
    int LastWeekSales,
    string Trend
);
