using System.Text.Json.Serialization;

/// <summary>
/// API request/response models
/// </summary>
namespace Kiyo9w.StoreMind.Core.Contracts;


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

/// <summary>
/// Request to revise an action's quantity
/// </summary>
public record ReviseRequest(decimal NewQuantity, string RevisedBy, string? Reason = null);
public record ReviseResult(bool Success, Proposal? Action, Verdict? Verdict, string? Error);

/// <summary>
/// Request to reject an action
/// </summary>
public record RejectRequest(string RejectedBy, string? Reason = null);
public record RejectResult(bool Success, string ActionId, string? Error);

/// <summary>
/// Manager chat request for conversational plan revision
/// </summary>
public record ManagerChatRequest(string Message, string PlanDate);
public record ManagerChatResponse(string Reply, Plan? UpdatedPlan, string? ActionModified);
