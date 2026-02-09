using System.ComponentModel;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service.Plugins;

/// <summary>
/// Provides web search capabilities using Perplexity AI's "sonar" model.
/// </summary>
public class WebSearchPlugin
{
    private readonly string _apiKey;
    private readonly HttpClient _client;
    // Using chat completions endpoint which returns citations
    private const string ApiUrl = "https://api.perplexity.ai/chat/completions";
    private const string ModelId = "sonar"; // Standard online model (efficient)

    public WebSearchPlugin(string apiKey, HttpClient client)
    {
        _apiKey = apiKey;
        _client = client;
    }

    /// <summary>
    /// Searches the web for information about a specific topic or question.
    /// This uses a live search engine to find real-time data.
    /// </summary>
    /// <param name="query">The specific question or topic to search for.</param>
    /// <returns>A summary of the search results found.</returns>
    [KernelFunction, Description("Searches the web for real-time information, news, or data about a user query.")]
    public async Task<string> SearchAsync(
        [Description("The search query or question")] string query)
    {
        if (string.IsNullOrWhiteSpace(_apiKey))
        {
            return "Error: Perplexity API key is missing. Cannot perform web search.";
        }

        var requestBody = new
        {
            model = ModelId,
            messages = new[]
            {
                new { role = "system", content = "You are a helpful search assistant. Provide only the concise final answer and findings. Do not show intermediate steps, thinking process, or search query details. Focus on accuracy and relevance." },
                new { role = "user", content = query }
            },
        };

        var json = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, ApiUrl);
        request.Headers.Add("Authorization", $"Bearer {_apiKey}");
        request.Content = content;

        try
        {
            var response = await _client.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseJson);
            
            var root = doc.RootElement;
            var resultBuilder = new StringBuilder();

            // 1. Get the main content (summary)
            if (root.TryGetProperty("choices", out var choices) && choices.GetArrayLength() > 0)
            {
                var firstChoice = choices[0];
                if (firstChoice.TryGetProperty("message", out var message) && 
                    message.TryGetProperty("content", out var contentElement))
                {
                    resultBuilder.AppendLine(contentElement.GetString() ?? "No content returned.");
                }
            }
            else
            {
                return "No valid search results found in the response.";
            }

            // 2. Extract sources
            // Priority: "search_results" (rich objects) > "citations" (URLs only)
            var hasSources = false;

            // Check for "search_results" first (rich objects with title, url, snippet)
            if (root.TryGetProperty("search_results", out var searchResults) && searchResults.GetArrayLength() > 0)
            {
                resultBuilder.AppendLine();
                resultBuilder.AppendLine("**Sources:**");
                int index = 1;

                foreach (var result in searchResults.EnumerateArray())
                {
                    var title = "";
                    if (result.TryGetProperty("name", out var n)) title = n.GetString();
                    else if (result.TryGetProperty("title", out var t)) title = t.GetString();
                    else title = "Source";

                    var url = "";
                    if (result.TryGetProperty("url", out var u)) url = u.GetString();
                    
                    if (!string.IsNullOrEmpty(url))
                    {
                        var domain = url;
                        // Try to parse domain or use title if available
                        try { domain = new Uri(url).Host; } catch { }
                        
                        var safeTitle = string.IsNullOrWhiteSpace(title) || title == "Source" ? domain : title;
                        resultBuilder.AppendLine($"[{index}] [{safeTitle}]({url})");
                        index++;
                    }
                }
                hasSources = true;
            }

            // Fallback to "citations" if no rich results found
            if (!hasSources && root.TryGetProperty("citations", out var citations) && citations.GetArrayLength() > 0)
            {
                resultBuilder.AppendLine();
                resultBuilder.AppendLine("**Sources:**");
                int index = 1;
                foreach (var citation in citations.EnumerateArray())
                {
                    var url = citation.GetString();
                    if (!string.IsNullOrEmpty(url))
                    {
                        string displayUrl = url;
                        try { displayUrl = new Uri(url).Host; } catch { }
                        resultBuilder.AppendLine($"[{index}] [{displayUrl}]({url})");
                        index++;
                    }
                }
            }

            return resultBuilder.ToString();
        }
        catch (HttpRequestException e)
        {
            return $"Error performing web search: {e.Message}";
        }
        catch (Exception e)
        {
            return $"Unexpected error during search: {e.Message}";
        }
    }
}
