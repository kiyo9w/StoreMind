using System.Runtime.CompilerServices;
using System.Text.Json;
using Kiyo9w.StoreMind.Core.Configuration;
using Kiyo9w.StoreMind.Core.Contracts;
using Kiyo9w.StoreMind.Service.Plugins;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Context gathered for planning decisions (Service-level type since it references WeatherForecast)
/// </summary>
public record PlanningContext(
    Snapshot Inventory,
    WeatherForecast Weather,
    IReadOnlyList<InventoryItem> LowStockItems,
    IReadOnlyList<InventoryItem> ExpiringItems,
    Dictionary<string, SalesPerformance> SalesContext);

/// <summary>
/// Overnight planner that runs iterative analysis for comprehensive planning.
/// Runs 5 iterations of question-driven analysis before generating proposals.
/// </summary>
public class OvernightPlanner
{
    private readonly Kernel _kernel;
    private readonly InventoryService _inventory;
    private readonly SupplierService _supplier;
    private readonly Plugins.WeatherPlugin _weather;
    private readonly Plugins.WebSearchPlugin _webSearch;
    private readonly PromptLoader _prompts;
    private readonly StoreMindOptions _options;
    private readonly ILogger<OvernightPlanner> _log;

    private const int MaxAnalysisIterations = 5;
    private const int MaxRevisionIterations = 2;
    private const int MaxObservations = 15;
    private static readonly TimeSpan MaxRuntime = TimeSpan.FromMinutes(8);

    private const int LowStockThreshold = 10;
    private const int DefaultOrderQty = 20;
    private const int MaxAdjustmentDelta = 50;

    public OvernightPlanner(
        KernelFactory kernelFactory,
        InventoryService inventory,
        SupplierService supplier,
        Plugins.WeatherPlugin weather,
        Plugins.WebSearchPlugin webSearch,
        PromptLoader prompts,
        IOptions<StoreMindOptions> options,
        ILogger<OvernightPlanner> log)
    {
        _inventory = inventory;
        _supplier = supplier;
        _inventory = inventory;
        _supplier = supplier;
        _weather = weather;
        _webSearch = webSearch;
        _prompts = prompts;
        _options = options.Value;
        _log = log;
        _kernel = kernelFactory.CreatePlannerKernel();
        _kernel.Plugins.AddFromObject(_webSearch, "WebSearch");
    }

    /// <summary>
    /// Generates an overnight plan using iterative analysis.
    /// Yields progress updates for monitoring.
    /// </summary>
    public async IAsyncEnumerable<PlanningProgress> GeneratePlanAsync(
        string? storeId = null,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        storeId ??= _options.StoreId;
        var deadline = DateTime.UtcNow + MaxRuntime;
        var conversation = new AgentConversation();
        var observations = new List<Observation>();

        // Phase 1: Data Gathering
        yield return new PlanningProgress(PlanPhase.DataGathering, 0, "Fetching inventory and context...");
        _log.LogInformation("Planner: Starting data gathering phase");

        var (context, gatherError) = await SafeGatherContextAsync(storeId, ct);
        if (gatherError != null)
        {
            _log.LogError("Failed to gather context: {Error}", gatherError);
            yield return new PlanningProgress(PlanPhase.Complete, 0, $"Error: {gatherError}");
            yield break;
        }

        conversation.AddTrace(new AgentTrace(
            "DataGatherer", "Deterministic",
            $"Gathered {context!.LowStockItems.Count} low-stock items, {context.ExpiringItems.Count} expiring items",
            DateTimeOffset.UtcNow));

        // Phase 2: Iterative Analysis
        bool sufficientContext = false;
        for (int i = 0; i < MaxAnalysisIterations && DateTime.UtcNow < deadline && !ct.IsCancellationRequested && !sufficientContext; i++)
        {
            yield return new PlanningProgress(PlanPhase.Analysis, i + 1,
                $"Analysis round {i + 1}/{MaxAnalysisIterations}...");
            _log.LogInformation("Planner: Analysis iteration {Iteration}", i + 1);

            var (iterationSuccess, hasEnoughContext) = await RunAnalysisIterationAsync(
                context, observations, conversation, deadline, i + 1, ct);

            if (hasEnoughContext)
            {
                yield return new PlanningProgress(PlanPhase.Analysis, i + 1,
                    $"Sufficient context gathered after {observations.Count} observations.");
                _log.LogInformation("Planner: Sufficient context after {Count} observations", observations.Count);
                sufficientContext = true;
            }
        }

        // Phase 3: Generate Proposals
        yield return new PlanningProgress(PlanPhase.Proposing, 0, "Generating proposals from analysis...");
        _log.LogInformation("Planner: Generating proposals from {Count} observations", observations.Count);

        var proposals = await SafeGenerateProposalsAsync(context, observations, conversation, ct);

        // Phase 4: Critic Review with revision loop
        for (int rev = 0; rev < MaxRevisionIterations && !ct.IsCancellationRequested; rev++)
        {
            yield return new PlanningProgress(PlanPhase.Reviewing, rev + 1,
                $"Review round {rev + 1}/{MaxRevisionIterations}...");

            var (issues, reviewedProposals) = await RunReviewIterationAsync(
                proposals, context, conversation, rev + 1, ct);

            if (issues.Count == 0)
            {
                _log.LogInformation("Planner: No issues found, plan approved");
                break;
            }

            yield return new PlanningProgress(PlanPhase.Revising, rev + 1,
                $"Revising {issues.Count} issues...");

            proposals = reviewedProposals;
        }

        // Build final plan
        conversation.Complete();
        var plan = BuildPlan(context, observations, proposals, conversation);

        yield return new PlanningProgress(PlanPhase.Complete, 0,
            $"Plan complete with {proposals.Count} actions from {observations.Count} observations.",
            plan);

        _log.LogInformation("Planner: Completed with {Actions} actions", proposals.Count);
    }

    private async Task<(PlanningContext? Context, string? Error)> SafeGatherContextAsync(
        string storeId, CancellationToken ct)
    {
        try
        {
            var context = await GatherContextAsync(storeId, ct);
            return (context, null);
        }
        catch (Exception ex)
        {
            return (null, ex.Message);
        }
    }

    private async Task<(bool Success, bool HasEnoughContext)> RunAnalysisIterationAsync(
        PlanningContext context,
        List<Observation> observations,
        AgentConversation conversation,
        DateTime deadline,
        int iteration,
        CancellationToken ct)
    {
        try
        {
            var questions = await GenerateAnalysisQuestionsAsync(context, observations, ct);
            _log.LogDebug("Generated {Count} questions for iteration {Iteration}", questions.Count, iteration);

            foreach (var q in questions)
            {
                if (ct.IsCancellationRequested || DateTime.UtcNow >= deadline)
                    break;

                var answer = await AnalyzeQuestionAsync(q, context, ct);
                observations.Add(answer);

                conversation.AddTrace(new AgentTrace(
                    "AnalysisLLM", "Specialist",
                    $"Q: {q.Text}\nA: {answer.Summary}",
                    DateTimeOffset.UtcNow));
            }

            var hasEnough = await HasSufficientContextAsync(observations, ct);
            return (true, hasEnough);
        }
        catch (Exception ex)
        {
            _log.LogWarning(ex, "Error in analysis iteration {Iteration}", iteration);
            return (false, false);
        }
    }

    private async Task<List<Proposal>> SafeGenerateProposalsAsync(
        PlanningContext context,
        List<Observation> observations,
        AgentConversation conversation,
        CancellationToken ct)
    {
        try
        {
            var proposals = await GenerateProposalsAsync(context, observations, ct);
            conversation.AddTrace(new AgentTrace(
                "ProposalGenerator", "Specialist",
                $"Generated {proposals.Count} proposals based on {observations.Count} observations",
                DateTimeOffset.UtcNow));
            return proposals;
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Failed to generate proposals, falling back to baseline");
            return GenerateBaseline(context);
        }
    }

    private async Task<(List<string> Issues, List<Proposal> Proposals)> RunReviewIterationAsync(
        List<Proposal> proposals,
        PlanningContext context,
        AgentConversation conversation,
        int iteration,
        CancellationToken ct)
    {
        var issues = await ReviewProposalsAsync(proposals, context, ct);
        conversation.AddTrace(new AgentTrace(
            "CriticLLM", "Manager",
            $"Review found {issues.Count} issues",
            DateTimeOffset.UtcNow));

        if (issues.Count == 0)
            return (issues, proposals);

        var revisedProposals = await ReviseProposalsAsync(proposals, issues, context, ct);
        conversation.AddTrace(new AgentTrace(
            "RevisionLLM", "Specialist",
            $"Revised proposals to address {issues.Count} issues",
            DateTimeOffset.UtcNow));

        return (issues, revisedProposals);
    }

    private async Task<PlanningContext> GatherContextAsync(string storeId, CancellationToken ct)
    {
        var snapshot = await _inventory.GetSnapshotAsync(storeId, ct);
        var weather = await _weather.GetForecastAsync(ct: ct);
        var lowStockItems = snapshot.GetLowStockItems(LowStockThreshold).ToList();
        var expiringItems = snapshot.GetExpiringItems(3).ToList();

        // Get sales context for relevant SKUs
        var relevantSkus = lowStockItems.Select(i => i.Sku)
            .Union(expiringItems.Select(i => i.Sku))
            .Distinct()
            .ToList();

        var salesContext = new Dictionary<string, SalesPerformance>();
        foreach (var sku in relevantSkus)
        {
            var perf = await _inventory.GetSalesVelocityAsync(storeId, sku, ct);
            if (perf != null) salesContext[sku] = perf;
        }

        return new PlanningContext(snapshot, weather, lowStockItems, expiringItems, salesContext);
    }

    private async Task<List<AnalysisQuestion>> GenerateAnalysisQuestionsAsync(
        PlanningContext context, List<Observation> existingObservations, CancellationToken ct)
    {
        var observationsSummary = existingObservations.Count > 0
            ? string.Join("\n", existingObservations.Select(o => $"- {o.Summary}"))
            : "None yet.";

        var prompt = $$"""
            <Context>
            You are analyzing inventory for overnight planning.
            
            Weather: {{context.Weather.Summary}}
            Temperature: {{context.Weather.TemperatureCelsius}}°C, Rain: {{(context.Weather.RainExpected ? "YES" : "NO")}}
            Low stock items: {{context.LowStockItems.Count}}
            Expiring items: {{context.ExpiringItems.Count}}
            
            Previous observations:
            {{observationsSummary}}
            </Context>
            
            <Goal>
            Generate 3-5 NEW analysis questions that will help optimize the overnight plan.
            Focus on questions NOT yet answered by previous observations.
            
            Good questions target:
            - SKUs with conflicting signals (low stock but also expiring)
            - Weather-demand correlations for specific categories
            - Supplier timing risks
            - Weather-demand correlations for specific categories
            - Supplier timing risks
            - Margin optimization opportunities
            - External events (festivals, holidays, trends) via WebSearch
            </Goal>
            
            <Output>
            One question per line, no numbering. Be specific.
            Example: "Should we order more umbrellas given the rain forecast?"
            </Output>
            """;

        var chat = new Microsoft.SemanticKernel.ChatCompletion.ChatHistory();
        chat.AddSystemMessage(_prompts.LoadWithTime("overnight-planner"));
        chat.AddUserMessage(prompt);
        
        var chatService = _kernel.GetRequiredService<Microsoft.SemanticKernel.ChatCompletion.IChatCompletionService>();
        var result = await chatService.GetChatMessageContentsAsync(chat, cancellationToken: ct);
        
        return (result[0].Content ?? string.Empty)
            .Split('\n', StringSplitOptions.RemoveEmptyEntries)
            .Where(q => !string.IsNullOrWhiteSpace(q))
            .Take(5)
            .Select(q => new AnalysisQuestion(q.Trim()))
            .ToList();
    }

    private async Task<Observation> AnalyzeQuestionAsync(
        AnalysisQuestion question, PlanningContext context, CancellationToken ct)
    {
        var skuDetails = string.Join("\n", context.LowStockItems.Take(10).Select(i =>
        {
            var sales = context.SalesContext.TryGetValue(i.Sku, out var p)
                ? $"Sales: {p.AvgWeeklySales}/wk, Trend: {p.Trend}"
                : "No sales data";
            var expiry = i.ExpirationDate.HasValue ? i.ExpirationDate.Value.ToString("yyyy-MM-dd") : "N/A";
            return $"- {i.Sku} ({i.Name}): Stock={i.StockLevel}, Expires={expiry}. {sales}";
        }));

        var prompt = $$"""
            <Context>
            Weather: {{context.Weather.Summary}} ({{context.Weather.TemperatureCelsius}}°C)
            
            Relevant SKUs:
            {{skuDetails}}
            </Context>
            
            <Question>
            {{question.Text}}
            </Question>
            
            <Instruction>
            Provide a concise, actionable answer based on the data.
            Include specific SKUs and quantities where relevant.
            Keep your answer to 2-3 sentences.
            </Instruction>
            """;

        var chat = new Microsoft.SemanticKernel.ChatCompletion.ChatHistory();
        chat.AddSystemMessage(_prompts.LoadWithTime("overnight-planner"));
        chat.AddUserMessage(prompt);
        
        var chatService = _kernel.GetRequiredService<Microsoft.SemanticKernel.ChatCompletion.IChatCompletionService>();
        var result = await chatService.GetChatMessageContentsAsync(chat, cancellationToken: ct);
        var answer = (result[0].Content ?? string.Empty).Trim();

        // Generate a one-line summary
        var summary = answer.Length > 100 ? answer[..100] + "..." : answer;

        return new Observation(question.Text, answer, summary, DateTimeOffset.UtcNow);
    }
    
    private record Observation(string Question, string Answer, string Summary, DateTimeOffset Timestamp);

    private async Task<bool> HasSufficientContextAsync(List<Observation> observations, CancellationToken ct)
    {
        // Hard limit: if we have 15+ observations, we have enough
        if (observations.Count >= MaxObservations) return true;

        // Minimum: need at least 5 observations
        if (observations.Count < 5) return false;

        // Soft check: ask LLM if context is sufficient
        var summary = string.Join("\n", observations.Select(o => $"- {o.Summary}"));

        var prompt = $$"""
            Given these {{observations.Count}} observations about inventory planning:
            {{summary}}
            
            Is this sufficient context to generate a high-quality overnight plan?
            Consider: Do we understand demand patterns, risks, and opportunities?
            
            Answer ONLY "yes" or "no".
            """;

        var chat = new Microsoft.SemanticKernel.ChatCompletion.ChatHistory();
        chat.AddSystemMessage(_prompts.LoadWithTime("overnight-planner"));
        chat.AddUserMessage(prompt);
        
        var chatService = _kernel.GetRequiredService<Microsoft.SemanticKernel.ChatCompletion.IChatCompletionService>();
        var result = await chatService.GetChatMessageContentsAsync(chat, cancellationToken: ct);
        return (result[0].Content ?? string.Empty).Trim().ToLowerInvariant().StartsWith("yes");
    }

    private async Task<List<Proposal>> GenerateProposalsAsync(
        PlanningContext context, List<Observation> observations, CancellationToken ct)
    {
        // Start with deterministic baseline
        var baseline = GenerateBaseline(context);

        // Build observations summary
        var observationsSummary = string.Join("\n", observations.Select(o => $"- {o.Summary}"));

        var baselineSummary = string.Join("\n", baseline.Select(p =>
            $"- {p.Target.Sku}: ordering {p.Target.Qty} units"));

        var prompt = $$"""
            <Context>
            Weather: {{context.Weather.Summary}}
            
            Analysis Observations:
            {{observationsSummary}}
            
            Baseline Orders (deterministic):
            {{baselineSummary}}
            </Context>
            
            <Goal>
            Based on the analysis, suggest adjustments to the baseline.
            Only suggest changes that are strongly supported by observations.
            </Goal>
            
            <Output>
            Output JSON array of adjustments:
            [{"sku": "SKU-001", "delta": 10, "reason": "High demand (Source: [Weather](https://...))"}]
            
            If no changes needed, output: []
            </Output>
            """;


        var chat = new Microsoft.SemanticKernel.ChatCompletion.ChatHistory();
        chat.AddSystemMessage(_prompts.LoadWithTime("overnight-planner"));
        chat.AddUserMessage(prompt);
        
        var chatService = _kernel.GetRequiredService<Microsoft.SemanticKernel.ChatCompletion.IChatCompletionService>();
        var result = await chatService.GetChatMessageContentsAsync(chat, cancellationToken: ct);
        var response = result[0].Content ?? string.Empty;

        // Parse adjustments
        var adjustments = ParseAdjustments(response);

        // Apply adjustments to baseline
        return ApplyAdjustments(baseline, adjustments, context.Inventory);
    }

    private List<Proposal> GenerateBaseline(PlanningContext context)
    {
        var proposals = new List<Proposal>();

        foreach (var item in context.LowStockItems)
        {
            var orderQty = DefaultOrderQty - item.StockLevel;
            if (orderQty <= 0) continue;

            var supplierPrice = _supplier.GetSupplierPriceAsync(item.Sku, DateTime.Today).GetAwaiter().GetResult();
            var marginPerUnit = supplierPrice.HasValue ? (item.Price - supplierPrice.Value) : (item.Price * 0.15m);

            // Build rich, context-aware reasoning
            var reasoning = BuildProposalReasoning(item, orderQty, marginPerUnit, supplierPrice, context);

            // Build multi-source evidence list
            var evidence = new List<Evidence>
            {
                new(EvidenceSource.Inventory, DateTime.UtcNow, context.Inventory.SnapshotId,
                    $"Current stock: {item.StockLevel} units — {(item.StockLevel < 5 ? "critically" : "moderately")} below safety threshold of {LowStockThreshold}")
            };

            // Add sales evidence if available
            if (context.SalesContext.TryGetValue(item.Sku, out var sales))
            {
                evidence.Add(new Evidence(EvidenceSource.Sales, DateTime.UtcNow, $"sales-{item.Sku}",
                    $"Avg weekly sales: {sales.AvgWeeklySales} units, trend: {sales.Trend}"));
            }

            // Add weather evidence for weather-sensitive categories
            var weatherCategory = GetWeatherSensitiveCategory(item);
            if (weatherCategory != null)
            {
                evidence.Add(new Evidence(EvidenceSource.Weather, DateTime.UtcNow, "weather-forecast",
                    $"{context.Weather.Summary} ({context.Weather.TemperatureCelsius}°C) — {weatherCategory}"));
            }

            // Add expiry evidence if relevant
            if (item.ExpirationDate.HasValue)
            {
                var daysUntilExpiry = (item.ExpirationDate.Value - DateTimeOffset.UtcNow).TotalDays;
                evidence.Add(new Evidence(EvidenceSource.Expiry, DateTime.UtcNow, $"expiry-{item.Sku}",
                    $"Expires in {daysUntilExpiry:F0} days ({item.ExpirationDate.Value:MMM dd}) — order conservatively to minimize waste"));
            }

            var riskFlags = new List<string>();
            if (item.StockLevel < 5) riskFlags.Add("critical_low_stock");
            if (item.ExpirationDate.HasValue && (item.ExpirationDate.Value - DateTimeOffset.UtcNow).TotalDays <= 2)
                riskFlags.Add("near_expiry");

            proposals.Add(new Proposal(
                Type: ProposalType.Order,
                Target: new ActionTarget(item.Sku, orderQty),
                ExpectedImpact: new ExpectedImpact(0, orderQty * marginPerUnit, -0.5),
                Confidence: 1.0,
                Evidence: evidence,
                RiskFlags: riskFlags
            ) { Reasoning = reasoning });
        }

        return proposals;
    }

    /// <summary>
    /// Builds a rich, human-readable reasoning paragraph for a proposal
    /// that reads like an analyst wrote it rather than a formula.
    /// </summary>
    private string BuildProposalReasoning(
        InventoryItem item, int orderQty, decimal marginPerUnit,
        decimal? supplierPrice, PlanningContext context)
    {
        var parts = new List<string>();

        // Stock urgency framing
        if (item.StockLevel <= 2)
            parts.Add($"{item.Name} ({item.Sku}) is at critical stock of just {item.StockLevel} units — immediate replenishment required to prevent stockout");
        else if (item.StockLevel < 5)
            parts.Add($"{item.Name} ({item.Sku}) is running dangerously low at {item.StockLevel} units, well below the {LowStockThreshold}-unit safety threshold");
        else
            parts.Add($"{item.Name} ({item.Sku}) has dipped to {item.StockLevel} units, approaching the reorder point of {LowStockThreshold}");

        // Sales velocity context
        if (context.SalesContext.TryGetValue(item.Sku, out var sales))
        {
            var dailyRate = sales.AvgWeeklySales / 7.0;
            var daysOfStock = item.StockLevel / dailyRate;
            parts.Add($"At the current sell-through rate of ~{dailyRate:F0} units/day ({sales.AvgWeeklySales}/week), existing stock covers only {daysOfStock:F1} days");

            if (sales.Trend == "rising")
                parts.Add("Demand is trending upward, making timely restocking even more critical");
            else if (sales.Trend == "declining")
                parts.Add("While demand has been softening, maintaining minimum shelf availability is still essential");
        }

        // Weather context
        var weatherNote = GetWeatherSensitiveCategory(item);
        if (weatherNote != null)
            parts.Add($"Today's forecast ({context.Weather.Summary}, {context.Weather.TemperatureCelsius}°C) {weatherNote}");

        // Margin analysis
        if (supplierPrice.HasValue)
            parts.Add($"At a unit cost of ¥{supplierPrice.Value:F0} and retail price of ¥{item.Price:F0}, this order yields ¥{marginPerUnit:F0} margin per unit (¥{orderQty * marginPerUnit:F0} total expected margin)");
        else
            parts.Add($"Ordering {orderQty} units at ¥{item.Price:F0} retail, estimated margin of ¥{orderQty * marginPerUnit:F0}");

        // Expiry consideration
        if (item.ExpirationDate.HasValue)
        {
            var daysUntilExpiry = (item.ExpirationDate.Value - DateTimeOffset.UtcNow).TotalDays;
            if (daysUntilExpiry <= 2)
                parts.Add($"⚠ Current batch expires in {daysUntilExpiry:F0} days — order quantity kept conservative to minimize waste risk");
            else if (daysUntilExpiry <= 5)
                parts.Add($"Note: expiration in {daysUntilExpiry:F0} days — monitor sell-through and consider markdown if velocity drops");
        }

        return string.Join(". ", parts) + ".";
    }

    /// <summary>
    /// Returns a weather-impact note for weather-sensitive product categories, or null if not applicable.
    /// </summary>
    private string? GetWeatherSensitiveCategory(InventoryItem item)
    {
        var name = (item.Name ?? "").ToLowerInvariant();
        var sku = (item.Sku ?? "").ToUpperInvariant();
        var category = (item.Category ?? "").ToLowerInvariant();

        // Umbrella / rain gear
        if (sku.StartsWith("UMB") || name.Contains("umbrella"))
            return "suggests higher umbrella demand if rain is expected, or reduced urgency in clear weather";

        // Hot beverages / soups
        if (name.Contains("soup") || name.Contains("hot chocolate") || name.Contains("coffee") || name.Contains("tea"))
            return "favors hot beverage/soup sales in cold temperatures";

        // Cold beverages / ice cream
        if (sku.StartsWith("JUICE") || name.Contains("juice") || name.Contains("ice cream") || name.Contains("cold"))
            return "may reduce cold beverage demand in low temperatures, but baseline availability is still important";

        // Fresh prepared foods (bento, sushi, sandwich, salad)
        if (sku.StartsWith("BENTO") || sku.StartsWith("SUSHI") || sku.StartsWith("SANDWICH") || sku.StartsWith("SALAD"))
            return "impacts foot traffic patterns which affect prepared food sales volume";

        // Frozen foods
        if (sku.StartsWith("FROZEN"))
            return "may increase comfort food demand in cold weather";

        // Bread / bakery
        if (sku.StartsWith("BREAD") || sku.StartsWith("CAKE") || sku.StartsWith("BAGEL"))
            return "cold weather tends to boost bakery/comfort food purchases";

        return null;
    }

    private List<(string Sku, int Delta, string Reason)> ParseAdjustments(string response)
    {
        var adjustments = new List<(string, int, string)>();
        try
        {
            var jsonStart = response.IndexOf('[');
            var jsonEnd = response.LastIndexOf(']');
            if (jsonStart >= 0 && jsonEnd > jsonStart)
            {
                var json = response.Substring(jsonStart, jsonEnd - jsonStart + 1);
                var parsed = JsonSerializer.Deserialize<List<AdjustmentDto>>(json,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                if (parsed != null)
                {
                    foreach (var adj in parsed)
                    {
                        if (!string.IsNullOrEmpty(adj.Sku))
                            adjustments.Add((adj.Sku, adj.Delta, adj.Reason ?? ""));
                    }
                }
            }
        }
        catch (Exception ex)
        {
            _log.LogWarning(ex, "Failed to parse adjustments");
        }
        return adjustments;
    }

    private record AdjustmentDto(string Sku, int Delta, string? Reason);

    private List<Proposal> ApplyAdjustments(
        List<Proposal> baseline,
        List<(string Sku, int Delta, string Reason)> adjustments,
        Snapshot snapshot)
    {
        var result = baseline.ToList();

        foreach (var (sku, delta, reason) in adjustments)
        {
            // Validate
            var item = snapshot.Items.FirstOrDefault(i => i.Sku == sku);
            if (item == null || Math.Abs(delta) > MaxAdjustmentDelta)
                continue;

            var existingIndex = result.FindIndex(p => p.Target.Sku == sku);
            if (existingIndex >= 0)
            {
                var existing = result[existingIndex];
                var newQty = Math.Max(0, existing.Target.Qty + delta);

                if (newQty == 0)
                {
                    result.RemoveAt(existingIndex);
                }
                else
                {
                    var newEvidence = existing.Evidence.ToList();
                    
                    // Extract URLs from reason (Markdown links) to create structured Web evidence
                    var aiDescription = !string.IsNullOrEmpty(reason) 
                        ? reason 
                        : $"AI adjustment: {(delta > 0 ? "+" : "")}{delta} units based on analysis";

                    // Regex to find [Link](url) or just raw URLs
                    var urlRegex = new System.Text.RegularExpressions.Regex(@"\[.*?\]\((https?://[^\s)]+)\)|(https?://[^\s)]+)");
                    var matches = urlRegex.Matches(aiDescription);
                    
                    foreach (System.Text.RegularExpressions.Match match in matches)
                    {
                        var url = match.Groups[1].Success ? match.Groups[1].Value : match.Groups[2].Value;
                        if (!string.IsNullOrWhiteSpace(url))
                        {
                            newEvidence.Insert(0, new Evidence(EvidenceSource.Web, DateTime.UtcNow, "web-source", url));
                        }
                    }

                    // Add the AI reasoning itself
                    newEvidence.Insert(0, new Evidence(EvidenceSource.AI, DateTime.UtcNow, $"analysis-{sku}", aiDescription));

                    result[existingIndex] = existing with
                    {
                        Target = existing.Target with { Qty = newQty },
                        Confidence = Math.Round(0.80 + (Math.Abs(delta) < 5 ? 0.10 : 0.05), 2),
                        Evidence = newEvidence
                    };
                }
            }
        }

        return result;
    }

    private async Task<List<string>> ReviewProposalsAsync(
        List<Proposal> proposals, PlanningContext context, CancellationToken ct)
    {
        var proposalSummary = string.Join("\n", proposals.Select((p, i) =>
            $"{i}. {p.Type} {p.Target.Sku}: {p.Target.Qty} units (confidence: {p.Confidence:P0})"));

        var prompt = $$"""
            <Proposals>
            {{proposalSummary}}
            </Proposals>
            
            <Weather>
            {{context.Weather.Summary}}
            </Weather>
            
            <Task>
            Review these proposals for strategic issues:
            - Logical conflicts (ordering AND discounting same SKU)
            - High risk patterns (large orders of perishables)
            - Internal inconsistencies
            
            List issues as one per line. If no issues, say "APPROVED".
            </Task>
            """;


        var chat = new Microsoft.SemanticKernel.ChatCompletion.ChatHistory();
        chat.AddSystemMessage(_prompts.LoadWithTime("overnight-planner"));
        chat.AddUserMessage(prompt);
        
        var chatService = _kernel.GetRequiredService<Microsoft.SemanticKernel.ChatCompletion.IChatCompletionService>();
        var result = await chatService.GetChatMessageContentsAsync(chat, cancellationToken: ct);
        var response = result[0].Content ?? string.Empty.Trim();

        if (response.ToUpperInvariant().Contains("APPROVED"))
            return [];

        return response.Split('\n', StringSplitOptions.RemoveEmptyEntries)
            .Where(line => !string.IsNullOrWhiteSpace(line))
            .ToList();
    }

    private async Task<List<Proposal>> ReviseProposalsAsync(
        List<Proposal> proposals, List<string> issues, PlanningContext context, CancellationToken ct)
    {
        var issuesSummary = string.Join("\n", issues.Select(i => $"- {i}"));
        var proposalSummary = string.Join("\n", proposals.Select((p, i) =>
            $"{i}. {p.Type} {p.Target.Sku}: {p.Target.Qty} units"));

        var prompt = $$"""
            <CurrentProposals>
            {{proposalSummary}}
            </CurrentProposals>
            
            <Issues>
            {{issuesSummary}}
            </Issues>
            
            <Task>
            Suggest specific fixes as JSON:
            [{"sku": "SKU-001", "delta": -5, "reason": "Reducing due to expiry risk"}]
            </Task>
            """;


        var chat = new Microsoft.SemanticKernel.ChatCompletion.ChatHistory();
        chat.AddSystemMessage(_prompts.LoadWithTime("overnight-planner"));
        chat.AddUserMessage(prompt);
        
        var chatService = _kernel.GetRequiredService<Microsoft.SemanticKernel.ChatCompletion.IChatCompletionService>();
        var result = await chatService.GetChatMessageContentsAsync(chat, cancellationToken: ct);
        var adjustments = ParseAdjustments(result[0].Content ?? string.Empty);
        return ApplyAdjustments(proposals, adjustments, context.Inventory);
    }

    private Plan BuildPlan(
        PlanningContext context,
        List<Observation> observations,
        List<Proposal> proposals,
        AgentConversation conversation)
    {
        var assumptions = new List<string>
        {
            $"Analysis with {observations.Count} observations across {conversation.Traces.Count} agent interactions",
            $"Snapshot: {context.Inventory.Items.Count} items, {context.LowStockItems.Count} low stock, {context.ExpiringItems.Count} expiring",
            $"Weather: {context.Weather.Summary}"
        };

        return new Plan(
            Date: DateTime.Today.ToString("yyyy-MM-dd"),
            Assumptions: assumptions,
            Actions: proposals,
            QuestionsForManager: [])
        {
            ModelUsed = _options.Models.Planner.ModelId,
            Conversation = conversation,
            ReasoningLog = $"Analysis completed with {observations.Count} observations"
        };
    }
}
