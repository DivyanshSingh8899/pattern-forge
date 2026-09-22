package patternsforge.service;

/**
 * <b>HealthChecker — the target abstraction of the Adapter pattern.</b>
 *
 * <p>The PatternForge deployment engine depends ONLY on this interface, never on a
 * concrete monitoring vendor. External monitoring systems with incompatible APIs
 * (Prometheus, CloudWatch, ...) are plugged in through the adapters in the
 * {@code patternsforge.adapter} package, so the monitoring provider can be swapped
 * at runtime without modifying any core deployment code
 * (Open/Closed Principle + Dependency Inversion Principle).
 */
public interface HealthChecker {

    /** Probes the simulated service through the underlying monitoring provider. */
    HealthStatus checkHealth();

    /** Name of the monitoring provider behind this checker (for console output). */
    String provider();
}
