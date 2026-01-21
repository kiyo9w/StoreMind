using System.Text;
using Kiyo9w.StoreMind.Core.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.ML.OnnxRuntimeGenAI;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// local Phi-3 inference via ONNX Runtime for staff Q&A
/// </summary>
public class Phi3Chat : IDisposable
{
    private readonly ModelOptions _options;
    private readonly ILogger<Phi3Chat> _log;
    private Model? _model;
    private Tokenizer? _tokenizer;
    private bool _modelLoadAttempted;

    public Phi3Chat(IOptions<StoreMindOptions> options, ILogger<Phi3Chat> log)
    {
        _options = options.Value.Models;
        _log = log;
    }

    public string Generate(string systemPrompt, string userMessage)
    {
        if (!EnsureModelLoaded())
        {
            return "[Phi-3 model not available - check EdgeModelPath configuration]";
        }

        var prompt = $"<|system|>{systemPrompt}<|end|><|user|>{userMessage}<|end|><|assistant|>";
        var tokens = _tokenizer!.Encode(prompt);

        var generatorParams = new GeneratorParams(_model!);
        generatorParams.SetSearchOption("max_length", 512);

        var output = new StringBuilder();
        using var generator = new Generator(_model!, generatorParams);
        generator.AppendTokenSequences(tokens);

        while (!generator.IsDone())
        {
            generator.GenerateNextToken();

            var sequence = generator.GetSequence(0);
            var newToken = sequence.Slice(sequence.Length - 1, 1);
            output.Append(_tokenizer.Decode(newToken));
        }

        return output.ToString().Trim();
    }

    private bool EnsureModelLoaded()
    {
        if (_model != null) return true;
        if (_modelLoadAttempted) return false;

        _modelLoadAttempted = true;
        var path = _options.EdgeModelPath;

        if (!Directory.Exists(path))
        {
            _log.LogWarning("Phi-3 model not found at {Path}", path);
            return false;
        }

        try
        {
            _log.LogInformation("Loading Phi-3 model from {Path}...", path);
            _model = new Model(path);
            _tokenizer = new Tokenizer(_model);
            _log.LogInformation("Phi-3 model loaded successfully");
            return true;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Failed to load Phi-3 model");
            return false;
        }
    }

    public void Dispose()
    {
        _tokenizer?.Dispose();
        _model?.Dispose();
    }
}
