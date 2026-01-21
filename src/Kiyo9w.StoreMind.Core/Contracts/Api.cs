using System.Text.Json.Serialization;

/// <summary>
/// API request/response models
/// </summary>
namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// Tier 1 staff query using central inventory data
/// </summary>
public record StaffQuery(string Question, string? StoreId = null);
public record StaffAnswer(string Answer, string Query, long LatencyMs);

/// <summary>
/// Payload to approve or reject a plan
/// </summary>
public record Approval(string ApprovedBy, string? Notes = null);
public record ApprovalResult(bool Success, string Message, string PlanId, string ActionId, string ApprovedBy);

/// <summary>
/// Request to explain reasoning behind a plan
/// </summary>
public record Explain(string Question, string? PlanId = null);
public record Explanation(string Content, string Question, string? PlanId, long LatencyMs);
