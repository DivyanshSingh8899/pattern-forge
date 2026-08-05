package patternsforge.service;

import patternsforge.strategy.DeploymentStrategy;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * Simulated health verification: probes liveness, readiness and latency after the deploy
 * stage. Promotion is gated on {@link #checkHealth} returning {@code true}.
 */
public final class HealthMonitor {

    private final DeploymentLogger logger;

    public HealthMonitor(DeploymentLogger logger) {
        this.logger = logger;
    }

    public boolean checkHealth(SimulatedEnvironment environment, DeploymentStrategy strategy) {
        logger.log(">>> [HealthMonitor] probing v" + environment.version() + " (" + strategy.name() + ")");
        boolean healthy = !environment.shouldFail("HEALTH");
        if (healthy) {
            logger.ok("[HealthMonitor] 3/3 probes passed — healthy (p95 42ms)");
        } else {
            logger.error("[HealthMonitor] probe #2 (readiness) timed out — UNHEALTHY");
        }
        return healthy;
    }
}
