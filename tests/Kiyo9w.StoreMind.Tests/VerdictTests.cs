using Xunit;
using Kiyo9w.StoreMind.Core.Contracts;
using System.Text.Json;

namespace Kiyo9w.StoreMind.Tests;

public class VerdictTests
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
        WriteIndented = true
    };

    [Fact]
    public void verdict_logic_handles_outcomes_correctly()
    {
        // 1. Approve
        var approval = new Verdict(VerdictType.Approve, [], []);
        Assert.True(approval.IsApproved);
        Assert.Equal(VerdictType.Approve, approval.Outcome);

        // 2. Revise with issues
        var issues = new[] { new BlockingIssue(0, "Issue", "Pol-1") };
        var revise = new Verdict(VerdictType.Revise, issues, []);
        
        Assert.False(revise.IsApproved);
        Assert.Equal(VerdictType.Revise, revise.Outcome);
        Assert.NotEmpty(revise.BlockingIssues);
        
        // 3. Metadata
        Assert.NotEqual(default, revise.IssuedAt);
    }

    [Fact]
    public void verdict_serialization_policy_is_snake_case()
    {
        // Arrange
        var verdict = new Verdict(
            Outcome: VerdictType.Revise,
            BlockingIssues: [new BlockingIssue(0, "Test issue", "Policy-001")],
            SuggestedPatch: [new JsonPatchOp("replace", "/path", 123)]
        );

        // Act
        var json = JsonSerializer.Serialize(verdict, JsonOptions);
        var deserialized = JsonSerializer.Deserialize<Verdict>(json, JsonOptions);

        // Assert - Round trip
        Assert.NotNull(deserialized);
        Assert.Equal(verdict.Outcome, deserialized.Outcome);
        Assert.Equal(verdict.BlockingIssues.Count, deserialized.BlockingIssues.Count);
        
        // Assert - Naming policy
        Assert.Contains("action_index", json);
        Assert.Contains("policy_ref", json);
        Assert.Contains("blocking_issues", json);
    }
}
