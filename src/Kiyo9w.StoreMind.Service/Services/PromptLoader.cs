using System.Reflection;
using System.Text.RegularExpressions;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Loads prompt templates from embedded markdown files and interpolates variables.
/// </summary>
public class PromptLoader
{
    private readonly Dictionary<string, string> _cache = new();
    private readonly string _promptsPath;

    public PromptLoader()
    {
        // Prompts folder is relative to the assembly location
        var assemblyDir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!;
        _promptsPath = Path.Combine(assemblyDir, "Prompts");
    }

    /// <summary>
    /// Load a prompt by name (e.g., "orchestrator" loads orchestrator.md)
    /// </summary>
    public string Load(string promptName, Dictionary<string, string>? variables = null)
    {
        var template = LoadTemplate(promptName);
        return Interpolate(template, variables);
    }

    /// <summary>
    /// Load with CURRENT_TIME automatically set to now
    /// </summary>
    public string LoadWithTime(string promptName, Dictionary<string, string>? extraVariables = null)
    {
        var variables = new Dictionary<string, string>
        {
            ["CURRENT_TIME"] = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss 'UTC'")
        };
        
        if (extraVariables != null)
        {
            foreach (var (key, value) in extraVariables)
                variables[key] = value;
        }

        return Load(promptName, variables);
    }

    private string LoadTemplate(string promptName)
    {
        if (_cache.TryGetValue(promptName, out var cached))
            return cached;

        var filePath = Path.Combine(_promptsPath, $"{promptName}.md");
        
        if (!File.Exists(filePath))
            throw new FileNotFoundException($"Prompt file not found: {filePath}");

        var content = File.ReadAllText(filePath);
        
        // Strip YAML frontmatter (everything between --- and ---)
        content = Regex.Replace(content, @"^---\s*\n.*?\n---\s*\n", "", RegexOptions.Singleline);
        
        _cache[promptName] = content;
        return content;
    }

    private static string Interpolate(string template, Dictionary<string, string>? variables)
    {
        if (variables == null || variables.Count == 0)
            return template;

        foreach (var (key, value) in variables)
        {
            template = template.Replace($"{{{{ {key} }}}}", value);
            template = template.Replace($"{{{{{key}}}}}", value);
        }

        return template;
    }
}
