namespace Kiyo9w.StoreMind.Core.Contracts;

/// <summary>
/// Phases of the deep overnight planning workflow
/// </summary>
public enum PlanPhase
{
    DataGathering,
    Analysis,
    Proposing,
    Reviewing,
    Revising,
    Complete
}

/// <summary>
/// Progress update from the deep planning workflow
/// </summary>
public record PlanningProgress(
    PlanPhase Phase,
    int Iteration,
    string Message,
    Plan? FinalPlan = null);

/// <summary>
/// An observation gathered during analysis iterations
/// </summary>
public record Observation(
    string Question,
    string Answer,
    string Summary,
    DateTimeOffset Timestamp);

/// <summary>
/// An analysis question to be answered during planning
/// </summary>
public record AnalysisQuestion(string Text);
