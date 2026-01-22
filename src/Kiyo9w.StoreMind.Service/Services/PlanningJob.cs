using Kiyo9w.StoreMind.Core.Configuration;
using Microsoft.Extensions.Options;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// background service that runs the planning loop on schedule
/// </summary>
public class PlanningJob : BackgroundService
{
    private readonly OvernightPlanner _planner;
    private readonly PlanCritic _critic;
    private readonly PlanStore _store;
    private readonly StoreMindOptions _options;
    private readonly ILogger<PlanningJob> _log;

    // for demo: also allow manual trigger via this flag
    private static TaskCompletionSource<bool>? _manualTrigger;

    public PlanningJob(
        OvernightPlanner planner,
        PlanCritic critic,
        PlanStore store,
        IOptions<StoreMindOptions> options,
        ILogger<PlanningJob> log)
    {
        _planner = planner;
        _critic = critic;
        _store = store;
        _options = options.Value;
        _log = log;
    }

    /// <summary>
    /// allows manual trigger from API endpoint
    /// </summary>
    public static void TriggerNow()
    {
        _manualTrigger?.TrySetResult(true);
        _manualTrigger = new TaskCompletionSource<bool>();
    }

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        _manualTrigger = new TaskCompletionSource<bool>();
        _log.LogInformation("Planning job started, will run at 2:00 AM daily or on manual trigger");

        while (!ct.IsCancellationRequested)
        {
            try
            {
                // calculate next run time (2 AM)
                var now = DateTime.Now;
                var nextRun = now.Date.AddHours(2);
                if (now.Hour >= 2)
                    nextRun = nextRun.AddDays(1);

                var delay = nextRun - now;
                _log.LogInformation("Next scheduled run at {NextRun} (in {Hours:F1} hours)",
                    nextRun, delay.TotalHours);

                // wait for either scheduled time or manual trigger
                using var cts = CancellationTokenSource.CreateLinkedTokenSource(ct);
                var delayTask = Task.Delay(delay, cts.Token);
                var triggerTask = _manualTrigger?.Task ?? Task.Delay(Timeout.Infinite, ct);

                var completed = await Task.WhenAny(delayTask, triggerTask);

                if (ct.IsCancellationRequested) break;

                // reset manual trigger for next time
                _manualTrigger = new TaskCompletionSource<bool>();

                // run the planning loop
                await RunPlanningLoopAsync(ct);
            }
            catch (OperationCanceledException) when (ct.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "Planning job failed, will retry on next schedule");
                await Task.Delay(TimeSpan.FromMinutes(5), ct);
            }
        }

        _log.LogInformation("Planning job stopped");
    }

    private async Task RunPlanningLoopAsync(CancellationToken ct)
    {
        _log.LogInformation("=== Starting planning loop ===");

        try
        {
            // generate plan
            var plan = await _planner.GeneratePlanAsync(ct: ct);
            _log.LogInformation("Plan generated: {PlanId} with {Actions} actions",
                plan.PlanId, plan.Actions.Count);

            // critique plan
            var verdict = await _critic.CritiqueAsync(plan, ct);
            _log.LogInformation("Verdict: {Outcome}, blocking issues: {Issues}",
                verdict.Outcome, verdict.BlockingIssues.Count);

            // save regardless of verdict (for review)
            await _store.SaveAsync(plan, verdict, ct);
            _log.LogInformation("Plan saved to store");

            if (verdict.IsApproved)
            {
                _log.LogInformation("Plan approved and ready for manager review");
            }
            else
            {
                _log.LogWarning("Plan has issues that need attention:");
                foreach (var issue in verdict.BlockingIssues)
                {
                    _log.LogWarning("  - Action[{Index}]: {Reason}", issue.ActionIndex, issue.Reason);
                }
            }
        }
        catch (Exception ex)
        {
            _log.LogError(ex, "Planning loop failed");
            throw;
        }

        _log.LogInformation("=== Planning loop complete ===");
    }
}
