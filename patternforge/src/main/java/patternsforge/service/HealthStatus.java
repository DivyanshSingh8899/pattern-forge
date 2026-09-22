package patternsforge.service;

/** Outcome of a health probe, reported by any {@link HealthChecker} implementation. */
public enum HealthStatus {
    HEALTHY,
    UNHEALTHY;

    public boolean isHealthy() {
        return this == HEALTHY;
    }
}
