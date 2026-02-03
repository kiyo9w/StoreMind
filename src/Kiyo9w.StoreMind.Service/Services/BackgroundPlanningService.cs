using Kiyo9w.StoreMind.Core.Contracts;

namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Background service that runs overnight planning on a configurable schedule.
/// Uses OvernightPlanner for comprehensive iterative analysis.
/// </summary>
public class BackgroundPlanningService : BackgroundService
{
    private readonly IServiceProvider _services;
    private readonly ILogger<BackgroundPlanningService> _log;
    
    private TimeOnly _scheduledTime = new(2, 0); // Default 2:00 AM
    private volatile bool _enabled = true;

    public BackgroundPlanningService(
        IServiceProvider services,
        ILogger<BackgroundPlanningService> log)
    {
        _services = services;
        _log = log;
    }

    /// <summary>
    /// Update the schedule configuration
    /// </summary>
    public void SetSchedule(TimeOnly time, bool enabled)
    {
        _scheduledTime = time;
        _enabled = enabled;
        _log.LogInformation("Schedule updated: {Time}, Enabled: {Enabled}", time, enabled);
    }

    /// <summary>
    /// Get current schedule information
    /// </summary>
    public (TimeOnly Time, bool Enabled, DateTime? NextRun) GetScheduleInfo()
    {
        var nextRun = CalculateNextRun();
        return (_scheduledTime, _enabled, _enabled ? nextRun : null);
    }

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        _log.LogInformation("Background planning service started. Schedule: {Time}, Enabled: {Enabled}",
            _scheduledTime, _enabled);

        while (!ct.IsCancellationRequested)
        {
            try
            {
                if (!_enabled)
                {
                    // Check every minute when disabled
                    await Task.Delay(TimeSpan.FromMinutes(1), ct);
                    continue;
                }

                var now = DateTime.Now;
                var nextRun = CalculateNextRun();
                var delay = nextRun - now;

                if (delay > TimeSpan.Zero)
                {
                    _log.LogInformation("Next planning run scheduled for {Time} (in {Hours:F1} hours)",
                        nextRun, delay.TotalHours);

                    // Wait until scheduled time, checking periodically for cancellation
                    while (delay > TimeSpan.Zero && !ct.IsCancellationRequested && _enabled)
                    {
                        var waitTime = delay > TimeSpan.FromMinutes(5)
                            ? TimeSpan.FromMinutes(5)
                            : delay;

                        await Task.Delay(waitTime, ct);
                        
                        // Recalculate in case schedule changed
                        nextRun = CalculateNextRun();
                        delay = nextRun - DateTime.Now;
                    }
                }

                if (!_enabled || ct.IsCancellationRequested)
                    continue;

                // Run overnight planning
                await RunPlanningAsync(ct);

                // After running, wait a bit before calculating next run
                // This prevents immediate re-runs if the job completes quickly
                await Task.Delay(TimeSpan.FromMinutes(1), ct);
            }
            catch (OperationCanceledException) when (ct.IsCancellationRequested)
            {
                _log.LogInformation("Background planning service shutting down");
                break;
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "Error in background planning loop");
                // Wait before retrying
                await Task.Delay(TimeSpan.FromMinutes(5), ct);
            }
        }
    }

    private DateTime CalculateNextRun()
    {
        var now = DateTime.Now;
        var todayRun = now.Date + _scheduledTime.ToTimeSpan();
        
        // If we've passed today's scheduled time, schedule for tomorrow
        return now < todayRun ? todayRun : todayRun.AddDays(1);
    }

    private async Task RunPlanningAsync(CancellationToken ct)
    {
        _log.LogInformation("Starting overnight planning run at {Time}", DateTime.Now);
        var sw = System.Diagnostics.Stopwatch.StartNew();

        try
        {
            using var scope = _services.CreateScope();
            var planner = scope.ServiceProvider.GetRequiredService<OvernightPlanner>();
            var critic = scope.ServiceProvider.GetRequiredService<PlanCritic>();
            var store = scope.ServiceProvider.GetRequiredService<PlanStore>();

            Plan? finalPlan = null;

            // Run deep planning with progress logging
            await foreach (var progress in planner.GeneratePlanAsync(ct: ct))
            {
                _log.LogInformation("[{Phase}:{Iteration}] {Message}",
                    progress.Phase, progress.Iteration, progress.Message);

                if (progress.FinalPlan != null)
                    finalPlan = progress.FinalPlan;
            }

            if (finalPlan != null)
            {
                // Run critic review
                var verdict = await critic.CritiqueAsync(finalPlan, ct);

                // Save plan
                await store.SaveAsync(finalPlan, verdict);

                sw.Stop();
                _log.LogInformation(
                    "Overnight planning completed in {Elapsed:F1} minutes. Plan: {PlanId}, Actions: {Actions}, Approved: {Approved}",
                    sw.Elapsed.TotalMinutes,
                    finalPlan.PlanId,
                    finalPlan.Actions.Count,
                    verdict.IsApproved);
            }
            else
            {
                _log.LogWarning("Overnight planning produced no final plan");
            }
        }
        catch (Exception ex)
        {
            sw.Stop();
            _log.LogError(ex, "Overnight planning failed after {Elapsed:F1} minutes", sw.Elapsed.TotalMinutes);
        }
    }
}
