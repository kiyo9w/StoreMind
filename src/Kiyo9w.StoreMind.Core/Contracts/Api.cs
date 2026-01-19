using System.Text.Json.Serialization;

/// <summary>
/// Container for API request/response models used in the REST API
/// </summary>
namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// Request for the staff assistant (Tier 1) using central inventory data
/// </summary>
public record StaffQuery(string Question, string? StoreId = null);
public record StaffAnswer(string Answer, string Query, long LatencyMs);

/// <summary>
/// Request payload to approve or reject a proposed plan/action
/// </summary>
public record Approval(string ApprovedBy, string? Notes = null);
public record ApprovalResult(bool Success, string Message, string PlanId, string ActionId, string ApprovedBy);

/// <summary>
/// Request to explain the reasoning behind a specific plan or action
/// </summary>
public record Explain(string Question, string? PlanId = null);
public record Explanation(string Explanation, string Question, string? PlanId, long LatencyMs);
