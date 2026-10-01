namespace Kiyo9w.StoreMind.Service;

public sealed class FixtureSource : IRetailSource
{
    private static readonly DateTimeOffset Epoch = new(2026, 9, 2, 1, 15, 0, TimeSpan.Zero);
    private static readonly IReadOnlyDictionary<string, decimal[]> FollowUps = new Dictionary<string, decimal[]>(StringComparer.Ordinal)
    {
        ["src-001"] = [3, 5],
        ["src-002"] = [14, 8],
        ["src-003"] = [82, 98],
        ["src-004"] = [3, 1],
        ["src-005"] = [2, 4],
        ["src-006"] = [14, 7],
        ["src-007"] = [70, 92],
        ["src-008"] = [2, 1]
    };
    public IReadOnlyList<SourceRecord> Read() =>
    [
        R("src-001", "stockout_signal", "store-001", "Cold brew shelf empty", "On-hand signal conflicts with an empty shelf scan.", 5, 940, .96m, 0, 95, "shelf_photo", 4, "gte"),
        R("src-002", "pickup_breach", "store-001", "Pickup order nearing breach", "A prepaid pickup has exceeded its ready-by promise.", 5, 620, .99m, 14, 75, "handoff_scan", 10, "lte"),
        R("src-003", "planogram_task", "store-001", "Endcap reset incomplete", "Seasonal endcap differs from the signed layout.", 3, 260, .88m, 82, 180, "planogram_photo", 95, "gte"),
        R("src-004", "refund_anomaly", "store-002", "Repeated no-receipt refunds", "Three related no-receipt refunds need a lead review.", 4, 1280, .91m, 3, 140, "receipt_reference", 1, "lte"),
        R("src-005", "stockout_signal", "store-002", "Infant formula shelf gap", "High-confidence shelf gap on a protected staple.", 5, 1540, .98m, 0, 55, "shelf_photo", 3, "gte"),
        R("src-006", "pickup_breach", "store-002", "Chilled pickup staging delay", "Chilled basket has remained unstaged beyond target.", 4, 710, .94m, 14, 115, "handoff_scan", 10, "lte"),
        R("src-007", "planogram_task", "store-003", "Checkout battery display drift", "Checkout display inventory is in the wrong bays.", 2, 180, .82m, 70, 260, "planogram_photo", 90, "gte"),
        R("src-008", "refund_anomaly", "store-003", "High-value appliance return", "Return value and disposition require verification.", 4, 2100, .89m, 2, 200, "receipt_reference", 1, "lte"),
        // Duplicate input demonstrates source-level deduplication.
        R("src-008", "refund_anomaly", "store-003", "High-value appliance return", "duplicate", 4, 2100, .89m, 2, 200, "receipt_reference", 1, "lte")
    ];
    public FollowUpObservation Recheck(string sourceId, int observationIndex)
    {
        if (!FollowUps.TryGetValue(sourceId, out var observations)) throw new ApiException(422, "source_recheck_unavailable", "The originating source cannot provide a follow-up observation.");
        var boundedIndex = Math.Abs(observationIndex % observations.Length);
        return new FollowUpObservation(sourceId, observations[boundedIndex], Epoch.AddMinutes((boundedIndex + 1) * 5), $"fixture://{sourceId}/follow-up/{boundedIndex + 1}");
    }
    private static SourceRecord R(string id, string type, string store, string title, string description, int urgency, decimal impact, decimal confidence, decimal currentMetricValue, int ageMinutes, string proof, decimal target, string direction) =>
        new(id, type, store, title, description, urgency, impact, confidence, currentMetricValue, Epoch.AddMinutes(-ageMinutes), proof, target, direction);
}

public static class ExceptionPolicy
{
    internal static readonly IReadOnlyDictionary<string, (string Name, string District)> Stores = new Dictionary<string, (string, string)>
    { ["store-001"] = ("Juniper Market", "district-01"), ["store-002"] = ("Harbor Market", "district-01"), ["store-003"] = ("Cedar Market", "district-02") };
    public static IReadOnlyList<ExceptionClassPolicy> DefaultPolicies() =>
    [
        new() { Class = "stockout_signal", Label = "Velocity / stockout-risk", ThresholdScore = 0, VolumeBudget = 4, Published = true },
        new() { Class = "pickup_breach", Label = "Pickup promise breach", ThresholdScore = 0, VolumeBudget = 4, Published = true },
        new() { Class = "planogram_task", Label = "Planogram compliance", ThresholdScore = 0, VolumeBudget = 4, Published = true },
        new() { Class = "refund_anomaly", Label = "Refund review", ThresholdScore = 0, VolumeBudget = 4, Published = true }
    ];
    public static List<RetailException> Evaluate(IEnumerable<SourceRecord> records, IReadOnlyList<ExceptionClassPolicy>? policies = null)
    {
        var policyMap = (policies ?? []).ToDictionary(x => x.Class, StringComparer.Ordinal);
        var candidates = records.GroupBy(x => x.SourceId, StringComparer.Ordinal).Select(x => x.First()).Select(ToException)
            .Where(item => !policyMap.TryGetValue(item.SourceType, out var policy) || policy.Published && item.RankScore >= policy.ThresholdScore)
            .GroupBy(x => x.SourceType).SelectMany(group =>
            {
                if (!policyMap.TryGetValue(group.Key, out var policy)) return group;
                return group.OrderByDescending(x => x.RankScore).ThenBy(x => x.Id).Take(Math.Max(policy.VolumeBudget, 0));
            })
            .GroupBy(x => x.StoreId).SelectMany(x => x.OrderByDescending(e => e.RankScore).ThenBy(e => e.Id).Take(4))
            .OrderByDescending(x => x.RankScore).ThenBy(x => x.Id).ToList();
        for (var index = 0; index < candidates.Count; index++)
        {
            var item = candidates[index];
            var threshold = item.Severity switch { "critical" => 570, "high" => 440, "medium" => 300, _ => 0 };
            item.RankExplanation = $"Global rank #{index + 1} of {candidates.Count}. Score {item.RankScore} = urgency {item.UrgencyPoints} ({item.Urgency} × 100) + impact {item.ImpactPoints} (impact ÷ 25, capped at 100, rounded down) + confidence {item.ConfidencePoints} ({item.Confidence:P0} × 50, rounded down) + age {item.AgePoints} (30-minute bands, capped at 10). This is {item.RankScore - threshold} points above the {item.Severity} threshold of {threshold}.";
        }
        return candidates;
    }
    public static int ExpectedCount(IEnumerable<SourceRecord> records, string exceptionClass, ExceptionClassPolicy policy) =>
        records.GroupBy(x => x.SourceId, StringComparer.Ordinal).Select(x => x.First()).Select(ToException)
            .Count(item => item.SourceType == exceptionClass && policy.Published && item.RankScore >= policy.ThresholdScore);
    private static RetailException ToException(SourceRecord x)
    {
        var agePoints = Math.Clamp((int)(new DateTimeOffset(2026, 9, 2, 1, 15, 0, TimeSpan.Zero) - x.ObservedAt).TotalMinutes / 30, 0, 10);
        var urgencyPoints = x.Urgency * 100;
        var impactPoints = Math.Min((int)(x.Impact / 25), 100);
        var confidencePoints = (int)(x.Confidence * 50);
        var score = urgencyPoints + impactPoints + confidencePoints + agePoints;
        var store = Stores[x.StoreId];
        var actions = x.Type switch
        {
            "planogram_task" => new[] { new AllowedAction("reset_display", "Reset display"), new AllowedAction("assign_reset", "Assign reset") },
            "stockout_signal" => [new AllowedAction("replenish_shelf", "Replenish shelf"), new AllowedAction("correct_inventory", "Correct inventory")],
            "pickup_breach" => [new AllowedAction("stage_order", "Stage order"), new AllowedAction("contact_customer", "Contact customer")],
            "refund_anomaly" => [new AllowedAction("review_refund", "Review refund"), new AllowedAction("secure_evidence", "Secure evidence")],
            _ => Array.Empty<AllowedAction>()
        };
        var department = x.Type switch { "stockout_signal" => "grocery", "pickup_breach" => "fulfillment", "planogram_task" => "merchandising", "refund_anomaly" => "returns", _ => "store_operations" };
        var assignment = x.Type switch { "stockout_signal" => "grocery", "pickup_breach" => "pickup", "planogram_task" => "merchandising", "refund_anomaly" => "returns", _ => "store_operations" };
        var location = x.Type switch { "stockout_signal" => "Sales floor · assigned shelf", "pickup_breach" => "Pickup staging", "planogram_task" => "Promotional display", "refund_anomaly" => "Service desk", _ => "Assigned store area" };
        var consequence = x.Type switch { "stockout_signal" => "Shelf availability loss continues and the exception escalates when overdue.", "pickup_breach" => "The customer promise is breached and the district queue is notified.", "planogram_task" => "The display remains non-compliant and escalates to merchandising.", "refund_anomaly" => "The return remains blocked and escalates to district loss prevention.", _ => "The exception escalates to the next authorized owner when overdue." };
        var dueAt = x.ObservedAt.AddMinutes(x.Urgency >= 5 ? 120 : x.Urgency >= 4 ? 180 : 300);
        var scene = x.Type switch { "stockout_signal" or "pickup_breach" => "shelf-gap", "planogram_task" or "refund_anomaly" => "shelf-mismatch", _ => "shelf-gap" };
        var proofLabels = x.RequiredProofType switch
        {
            "shelf_photo" => new[] { "Aisle camera frame", "Associate shelf capture" },
            "planogram_photo" => ["Signed layout comparison", "Associate display capture"],
            "handoff_scan" => ["Staging scan", "Customer handoff scan"],
            "receipt_reference" => ["Register receipt record", "Manager review record"],
            _ => [$"Recorded {x.RequiredProofType.Replace('_', ' ')}"]
        };
        var availableProofs = proofLabels.Select((label, index) => new ProofArtifact(x.RequiredProofType, $"fixture://{x.SourceId}/{x.RequiredProofType}/{index + 1}", $"/assets/fixtures.svg#{scene}", label)).ToArray();
        var roleOwner = $"{char.ToUpperInvariant(department[0])}{department[1..]} department owner";
        return new RetailException { Id = $"exc-{x.SourceId[4..]}", SourceId = x.SourceId, SourceType = x.Type, StoreId = x.StoreId, StoreName = store.Name, DistrictId = store.District, Department = department, AssignmentId = assignment, AssignedOwner = roleOwner, RoleOwner = roleOwner, DueAt = dueAt, ItemLocation = location, InactionConsequence = consequence, Title = x.Title, Description = x.Description, Severity = score >= 570 ? "critical" : score >= 440 ? "high" : score >= 300 ? "medium" : "low", RankScore = score, Urgency = x.Urgency, UrgencyPoints = urgencyPoints, Impact = x.Impact, ImpactPoints = impactPoints, Confidence = x.Confidence, ConfidencePoints = confidencePoints, CurrentMetricValue = x.CurrentMetricValue, ObservedAt = x.ObservedAt, AgePoints = agePoints, RequiredProofType = x.RequiredProofType, AvailableProofs = availableProofs, MetricTarget = x.MetricTarget, MetricDirection = x.MetricDirection, AllowedActions = actions };
    }
}
