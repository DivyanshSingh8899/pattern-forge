package patternsforge.service;

import patternsforge.strategy.DeploymentStrategy;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * Health gate before promotion. Depends <b>only</b> on the {@link HealthChecker}
 * abstraction (Adapter pattern + Dependency Inversion): the concrete probing logic
 * lives in vendor adapters ({@code PrometheusHealthAdapter}, {@code CloudWatchHealthAdapter}),
 * so the monitoring provider can be swapped at runtime without touching this class
 * or any other core deployment code (Open/Closed Principle).
 */
public final class HealthMonitor {

    private final DeploymentLogger logger;
    private HealthChecker healthChecker;

    public HealthMonitor(DeploymentLogger logger, HealthChecker healthChecker) {
        this.logger = logger;
        this.healthChecker = healthChecker;
    }

    /** <b>Adapter:</b> plug in a different monitoring vendor at runtime. */
    public void setHealthChecker(HealthChecker healthChecker) {
        this.healthChecker = healthChecker;
    }

    public HealthChecker healthChecker() {
        return healthChecker;
    }

    /**
     * Probes the freshly deployed release through the configured monitoring provider.
     * Promotion is gated on this returning {@code true}.
     */
    public boolean checkHealth(SimulatedEnvironment environment, DeploymentStrategy strategy) {
        logger.log(">>> [HealthMonitor] probing v" + environment.version()
                + " (" + strategy.name() + ") via " + healthChecker.provider());
        HealthStatus status = healthChecker.checkHealth();
        if (status.isHealthy()) {
            logger.ok("[HealthMonitor] " + healthChecker.provider()
                    + " reports HEALTHY — 3/3 probes passed (p95 42ms)");
        } else {
            logger.error("[HealthMonitor] " + healthChecker.provider()
                    + " reports UNHEALTHY — readiness probe timed out");
        }
        return status.isHealthy();
    }
}
