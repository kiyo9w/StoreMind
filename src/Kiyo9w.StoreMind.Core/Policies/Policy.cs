namespace Kiyo9w.StoreMind.Core.Policies;

/// <summary>
/// The lifecycle state of a proposed action
/// </summary>
public enum ApprovalState
{
    Draft,
    PendingReview,
    Approved,
    Rejected,
    Executed,
    Cancelled
}
