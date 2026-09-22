package patternsforge.adapter;

import patternsforge.service.HealthChecker;
import patternsforge.service.HealthStatus;

/**
 * <b>Adapter for AWS CloudWatch.</b> Implements PatternForge's {@link HealthChecker}
 * interface by translating its vendor-specific calls into
 * {@link CloudWatchClient} calls:
 *
 * <pre>
 *   checkHealth() → getMetric("CPUUtilization" / "HTTP5xx" / "P95Latency")
 *                 + getServiceStatus() → threshold decision
 * </pre>
 *
 * <p>The core deployment engine sees only the {@code HealthChecker} interface —
 * it never imports {@code CloudWatchClient}.
 */
public final class CloudWatchHealthAdapter implements HealthChecker {

    /** Thresholds for the simulated CloudWatch metrics. */
    private static final double MAX_CPU_PERCENT = 80.0;
    private static final double MAX_HTTP_5XX = 20.0;
    private static final double MAX_P95_LATENCY_MS = 2000.0;

    private final CloudWatchClient client;

    public CloudWatchHealthAdapter(CloudWatchClient client) {
        this.client = client;
    }

    @Override
    public HealthStatus checkHealth() {
        String status = client.getServiceStatus();
        double cpu = client.getMetric("CPUUtilization");
        double http5xx = client.getMetric("HTTP5xx");
        double p95 = client.getMetric("P95Latency");
        boolean healthy = "OK".equals(status)
                && cpu <= MAX_CPU_PERCENT
                && http5xx <= MAX_HTTP_5XX
                && p95 <= MAX_P95_LATENCY_MS;
        return healthy ? HealthStatus.HEALTHY : HealthStatus.UNHEALTHY;
    }

    @Override
    public String provider() {
        return "CLOUDWATCH";
    }

    /** Detail for console output — derived from the last vendor lookups. */
    public String describe() {
        return String.format("cpu=%.1f%% http5xx=%.1f p95=%.0fms status=%s",
                client.getMetric("CPUUtilization"),
                client.getMetric("HTTP5xx"),
                client.getMetric("P95Latency"),
                client.getServiceStatus());
    }
}
