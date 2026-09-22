package patternsforge.adapter;

import patternsforge.utils.SimulatedEnvironment;

/**
 * <b>Simulated external API #1 (incompatible).</b> A third-party Prometheus client.
 * Its API is metric-oriented and has nothing in common with PatternForge's
 * {@code HealthChecker} interface:
 *
 * <ul>
 *   <li>{@link #queryCPUUsage()} returns a raw CPU percentage</li>
 *   <li>{@link #queryErrorRate()} returns a raw HTTP 5xx error ratio</li>
 * </ul>
 *
 * <p>There is no {@code checkHealth()} method — the {@link PrometheusHealthAdapter}
 * is what makes this vendor usable by the core deployment engine.
 */
public final class PrometheusClient {

    private final SimulatedEnvironment environment;

    public PrometheusClient(SimulatedEnvironment environment) {
        this.environment = environment;
    }

    /** Raw PromQL-style query: average CPU usage of the new fleet, in percent. */
    public double queryCPUUsage() {
        return environment.shouldFail("HEALTH") ? 97.5 : 41.0;
    }

    /** Raw PromQL-style query: HTTP 5xx error ratio of the new fleet, 0.0–1.0. */
    public double queryErrorRate() {
        return environment.shouldFail("HEALTH") ? 0.43 : 0.002;
    }
}
