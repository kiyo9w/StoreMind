namespace Kiyo9w.StoreMind.Service.Services;

/// <summary>
/// Background service that randomizes mock data daily before the overnight planner runs.
/// Schedules at 1:55 AM (5 minutes before the 2:00 AM planner).
/// </summary>
public class DataRandomizerService : BackgroundService
{
    private readonly SeedDataService _seedData;
    private readonly ILogger<DataRandomizerService> _log;
    
    private TimeOnly _scheduledTime = new(1, 55);
    private volatile bool _enabled = true;
    private DateTime _lastRunDate = DateTime.MinValue;

    public DataRandomizerService(
        SeedDataService seedData,
        ILogger<DataRandomizerService> log)
    {
        _seedData = seedData;
        _log = log;
    }

    public void SetSchedule(TimeOnly time, bool enabled)
    {
        _scheduledTime = time;
        _enabled = enabled;
        _log.LogInformation("Randomizer schedule updated: {Time}, Enabled: {Enabled}", time, enabled);
    }

    public (TimeOnly Time, bool Enabled, DateTime? NextRun) GetScheduleInfo()
    {
        var nextRun = CalculateNextRun();
        return (_scheduledTime, _enabled, _enabled ? nextRun : null);
    }

    /// <summary>
    /// Force a randomization run (for testing via API)
    /// </summary>
    public void ForceRandomize()
    {
        _log.LogInformation("Force randomization triggered");
        _seedData.ApplyRandomization(DateTime.Today);
        _lastRunDate = DateTime.Today;
    }

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        _log.LogInformation("Data randomizer service started. Schedule: {Time}", _scheduledTime);

        while (!ct.IsCancellationRequested)
        {
            try
            {
                if (!_enabled)
                {
                    await Task.Delay(TimeSpan.FromMinutes(1), ct);
                    continue;
                }

                var now = DateTime.Now;
                var nextRun = CalculateNextRun();
                var delay = nextRun - now;

                if (delay > TimeSpan.Zero)
                {
                    _log.LogDebug("Next data randomization at {Time}", nextRun);
                    
                    while (delay > TimeSpan.Zero && !ct.IsCancellationRequested && _enabled)
                    {
                        var waitTime = delay > TimeSpan.FromMinutes(5)
                            ? TimeSpan.FromMinutes(5)
                            : delay;

                        await Task.Delay(waitTime, ct);
                        
                        nextRun = CalculateNextRun();
                        delay = nextRun - DateTime.Now;
                    }
                }

                if (!_enabled || ct.IsCancellationRequested)
                    continue;

                // Skip if already ran today
                if (_lastRunDate.Date == DateTime.Today)
                {
                    await Task.Delay(TimeSpan.FromMinutes(1), ct);
                    continue;
                }

                // Run randomization
                _seedData.ApplyRandomization(DateTime.Today);
                _lastRunDate = DateTime.Today;

                _log.LogInformation("Daily data randomization completed for {Date}", DateTime.Today.ToString("yyyy-MM-dd"));

                await Task.Delay(TimeSpan.FromMinutes(1), ct);
            }
            catch (OperationCanceledException) when (ct.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "Error in data randomizer loop");
                await Task.Delay(TimeSpan.FromMinutes(5), ct);
            }
        }
    }

    private DateTime CalculateNextRun()
    {
        var now = DateTime.Now;
        var todayRun = now.Date + _scheduledTime.ToTimeSpan();
        return now < todayRun ? todayRun : todayRun.AddDays(1);
    }
}
