package patternsforge.adapter;

import patternsforge.service.HealthChecker;
import patternsforge.service.HealthStatus;

/**
 * <b>Adapter (class/object adapter) for Prometheus.</b> Implements PatternForge's
 * {@link HealthChecker} interface by translating its vendor-specific calls into
 * {@link PrometheusClient} calls:
 *
 * <pre>
 *   checkHealth() → queryCPUUsage() + queryErrorRate() → threshold decision
 * </pre>
 *
 * <p>The core deployment engine sees only the {@code HealthChecker} interface —
 * it never imports {@code PrometheusClient}.
 */
public final class PrometheusHealthAdapter implements HealthChecker {

    /** Thresholds at which the simulated Prometheus metrics count as unhealthy. */
    private static final double MAX_CPU_PERCENT = 80.0;
    private static final double MAX_ERROR_RATE = 0.05;

    private final PrometheusClient client;

    public PrometheusHealthAdapter(PrometheusClient client) {
        this.client = client;
    }

    @Override
    public HealthStatus checkHealth() {
        double cpu = client.queryCPUUsage();
        double errorRate = client.queryErrorRate();
        boolean healthy = cpu <= MAX_CPU_PERCENT && errorRate <= MAX_ERROR_RATE;
        return healthy ? HealthStatus.HEALTHY : HealthStatus.UNHEALTHY;
    }

    @Override
    public String provider() {
        return "PROMETHEUS";
    }

    /** Detail for console output — derived from the last vendor queries. */
    public String describe() {
        return String.format("cpu=%.1f%% errorRate=%.3f", client.queryCPUUsage(), client.queryErrorRate());
    }
}
