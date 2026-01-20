using Xunit;
using Kiyo9w.StoreMind.Core.Contracts;
using System.Text.Json;

namespace Kiyo9w.StoreMind.Tests;

public class PlanTests
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
        WriteIndented = true
    };

    [Theory]
    [InlineData("2026-1-21")]     // Missing leading zero
    [InlineData("21-01-2026")]    // Wrong format
    [InlineData("2026/01/21")]    // Wrong separator
    [InlineData("invalid")]       // Not a date
    [InlineData("")]              // Empty
    public void plan_date_validation_rejects_invalid_formats(string invalidDate)
    {
        var plan = CreateValidPlan(invalidDate);
        var result = plan.Validate();
        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.Contains("Invalid date format"));
    }

    [Fact]
    public void plan_structure_validation_enforces_rules()
    {
        // 1. Valid Plan
        var validPlan = CreateValidPlan("2026-01-21");
        Assert.True(validPlan.Validate().IsValid);

        // 2. No Actions
        var emptyPlan = new Plan("2026-01-21", [], [], []);
        var emptyResult = emptyPlan.Validate();
        Assert.False(emptyResult.IsValid);
        Assert.Contains(emptyResult.Errors, e => e.Contains("at least one action"));

        // 3. Action without evidence
        var invalidAction = new Proposal(
            Type: ProposalType.Alert, 
            Target: new ActionTarget("S", 1), 
            ExpectedImpact: new ExpectedImpact(0,0,0), 
            Confidence: 0.5, 
            Evidence: [], 
            RiskFlags: []);
            
        var badPlan = new Plan("2026-01-21", [], [invalidAction], []);
        var badResult = badPlan.Validate();
        Assert.False(badResult.IsValid);
        Assert.Contains(badResult.Errors, e => e.Contains("missing required evidence pointer"));
    }

    [Fact]
    public void evidence_validation_logic_is_sound()
    {
        // Invalid: No Source
        Assert.False(new Evidence("", DateTime.UtcNow, "ID").IsValid());
        // Invalid: No EntityId
        Assert.False(new Evidence("Source", DateTime.UtcNow, "").IsValid());
        // Valid
        Assert.True(new Evidence("Source", DateTime.UtcNow, "ID").IsValid());
    }

    [Fact]
    public void plan_financial_metrics_aggregate_correctly()
    {
        var plan = CreateValidPlan("2026-01-21");
        
        // Confidence (Average of 0.85 and 0.92) -> 0.885
        Assert.Equal(0.885, plan.ConfidenceScore);
        
        // Margin (5000 + 8000) -> 13000
        Assert.Equal(10500m, plan.TotalExpectedMarginImpact()); // 2500 + 8000 = 10500
        
        // Waste (5000 + 0) -> 5000
        Assert.Equal(5000m, plan.TotalExpectedWasteReduction());
    }

    [Fact]
    public void plan_serialization_and_flow()
    {
        var plan = CreateValidPlan("2026-01-21");
        
        // Serialization
        var json = JsonSerializer.Serialize(plan, JsonOptions);
        var deserialized = JsonSerializer.Deserialize<Plan>(json, JsonOptions);
        Assert.Equal(plan.Date, deserialized!.Date);
        
        // Approval Workflow
        var pending = plan.GetPendingApprovals();
        Assert.All(pending, p => Assert.True(p.RequiresManagerApproval));
        Assert.Equal(2, pending.Count());
    }

    private static Plan CreateValidPlan(string date)
    {
        var evidence = new Evidence("InventorySnapshot", DateTime.UtcNow, "snapshot-2026-01-21");
        
        var action1 = new Proposal(
            Type: ProposalType.DraftMarkdown,
            Target: new ActionTarget("PASTA-001", 30),
            ExpectedImpact: new ExpectedImpact(5000, 2500, -0.05),
            Confidence: 0.85,
            Evidence: [evidence],
            RiskFlags: ["near_expiry"]
        );

        var action2 = new Proposal(
            Type: ProposalType.DraftPo,
            Target: new ActionTarget("GRAIN-005", 100),
            ExpectedImpact: new ExpectedImpact(0, 8000, -0.15),
            Confidence: 0.92,
            Evidence: [evidence],
            RiskFlags: []
        );

        return new Plan(
            Date: date,
            Assumptions: ["Assumption 1"],
            Actions: [action1, action2],
            QuestionsForManager: ["Q1"]
        );
    }
}
