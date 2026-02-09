using System.ComponentModel;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service.Plugins;

/// <summary>
/// Weather plugin using Open-Meteo API (no API key required)
/// </summary>
public class WeatherPlugin
{
    private readonly HttpClient _http;
    
    // Default: Tokyo, Japan
    private const double DefaultLatitude = 35.6895;
    private const double DefaultLongitude = 139.6917;

    public WeatherPlugin(HttpClient? httpClient = null)
    {
        _http = httpClient ?? new HttpClient();
        // Open-Meteo requires a User-Agent header
        if (_http.DefaultRequestHeaders.UserAgent.Count == 0)
        {
            _http.DefaultRequestHeaders.Add("User-Agent", "StoreMind-Demo/1.0");
        }
    }

    [KernelFunction("GetForecast")]
    [Description("Gets the current weather forecast including temperature, humidity, and rain probability. Useful for deciding whether to stock umbrellas, cold drinks, or rain gear.")]
    public async Task<WeatherForecast> GetForecastAsync(
        [Description("Latitude (default: Tokyo)")] double? latitude = null,
        [Description("Longitude (default: Tokyo)")] double? longitude = null,
        CancellationToken ct = default)
    {
        var lat = latitude ?? DefaultLatitude;
        var lon = longitude ?? DefaultLongitude;
        
        var url = FormattableString.Invariant($"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}") +
                  "&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m" +
                  "&hourly=temperature_2m,rain&forecast_days=2";

        try
        {
            var response = await _http.GetFromJsonAsync<OpenMeteoResponse>(url, ct);
            
            if (response?.Current == null)
                return new WeatherForecast("Unable to fetch weather", 0, 0, false);

            // Check if rain is expected in the next 24 hours
            var rainExpected = response.Hourly?.Rain?.Take(24).Any(r => r > 0.5) ?? false;
            
            return new WeatherForecast(
                Summary: rainExpected 
                    ? $"Rain expected. Current: {response.Current.Temperature}°C, Humidity: {response.Current.Humidity}%"
                    : $"Clear weather. Current: {response.Current.Temperature}°C, Humidity: {response.Current.Humidity}%",
                TemperatureCelsius: response.Current.Temperature,
                HumidityPercent: response.Current.Humidity,
                RainExpected: rainExpected
            );
        }
        catch (Exception)
        {
            // Fallback for simulation/demo stability if API fails (e.g. strict firewall or network issues)
            return new WeatherForecast("Simulated Winter (API Unavailable)", 8, 45, false);
        }
    }
}

public record WeatherForecast(
    string Summary,
    double TemperatureCelsius,
    int HumidityPercent,
    bool RainExpected);

// Open-Meteo API response models
internal class OpenMeteoResponse
{
    [JsonPropertyName("current")]
    public CurrentWeather? Current { get; set; }
    
    [JsonPropertyName("hourly")]
    public HourlyWeather? Hourly { get; set; }
}

internal class CurrentWeather
{
    [JsonPropertyName("temperature_2m")]
    public double Temperature { get; set; }
    
    [JsonPropertyName("relative_humidity_2m")]
    public int Humidity { get; set; }
    
    [JsonPropertyName("rain")]
    public double Rain { get; set; }
    
    [JsonPropertyName("wind_speed_10m")]
    public double WindSpeed { get; set; }
}

internal class HourlyWeather
{
    [JsonPropertyName("temperature_2m")]
    public List<double>? Temperature { get; set; }
    
    [JsonPropertyName("rain")]
    public List<double>? Rain { get; set; }
}
