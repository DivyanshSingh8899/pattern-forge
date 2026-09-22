package patternsforge.adapter;

import patternsforge.utils.SimulatedEnvironment;

/**
 * <b>Simulated external API #2 (incompatible).</b> A third-party AWS CloudWatch client.
 * Its API is string/lookup-oriented and has nothing in common with PatternForge's
 * {@code HealthChecker} interface:
 *
 * <ul>
 *   <li>{@link #getMetric(String)} returns a raw metric value by vendor name</li>
 *   <li>{@link #getServiceStatus()} returns a vendor-specific status string</li>
 * </ul>
 *
 * <p>There is no {@code checkHealth()} method — the {@link CloudWatchHealthAdapter}
 * is what makes this vendor usable by the core deployment engine.
 */
public final class CloudWatchClient {

    private final SimulatedEnvironment environment;

    public CloudWatchClient(SimulatedEnvironment environment) {
        this.environment = environment;
    }

    /** Raw CloudWatch metric lookup (unit-less value keyed by vendor metric name). */
    public double getMetric(String metricName) {
        return switch (metricName) {
            case "CPUUtilization" -> environment.shouldFail("HEALTH") ? 96.1 : 38.4;
            case "HTTP5xx" -> environment.shouldFail("HEALTH") ? 127.0 : 3.0;
            case "P95Latency" -> environment.shouldFail("HEALTH") ? 8800.0 : 420.0;
            default -> 0.0;
        };
    }

    /** Vendor-specific service status string ("OK" / "ALARM" / "INSUFFICIENT_DATA"). */
    public String getServiceStatus() {
        return environment.shouldFail("HEALTH") ? "ALARM" : "OK";
    }
}
