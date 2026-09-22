package patternsforge;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import patternsforge.adapter.CloudWatchClient;
import patternsforge.adapter.CloudWatchHealthAdapter;
import patternsforge.adapter.PrometheusClient;
import patternsforge.adapter.PrometheusHealthAdapter;
import patternsforge.facade.ReleaseManager;
import patternsforge.model.DeploymentResult;
import patternsforge.service.HealthChecker;
import patternsforge.service.HealthStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Adapter pattern: Prometheus and CloudWatch expose incompatible vendor APIs, yet both
 * become usable by the core deployment engine through their {@code HealthChecker}
 * adapters — and the provider can be swapped at runtime without modifying any core class.
 */
class HealthCheckerAdapterTest {

    private ReleaseManager releaseManager;

    @BeforeEach
    void setUp() {
        DeploymentLoggerCleanup.clear();
        releaseManager = new ReleaseManager();
    }

    @Test
    void prometheusAdapterImplementsHealthChecker() {
        HealthChecker checker = new PrometheusHealthAdapter(new PrometheusClient(releaseManager.environment()));

        assertInstanceOf(HealthChecker.class, checker);
        assertEquals("PROMETHEUS", checker.provider());
        assertEquals(HealthStatus.HEALTHY, checker.checkHealth(), "healthy environment → HEALTHY");
    }

    @Test
    void cloudWatchAdapterImplementsHealthChecker() {
        HealthChecker checker = new CloudWatchHealthAdapter(new CloudWatchClient(releaseManager.environment()));

        assertInstanceOf(HealthChecker.class, checker);
        assertEquals("CLOUDWATCH", checker.provider());
        assertEquals(HealthStatus.HEALTHY, checker.checkHealth(), "healthy environment → HEALTHY");
    }

    @Test
    void adaptersReportUnhealthyWhenHealthFails() {
        releaseManager.setFailurePoint("HEALTH");

        HealthChecker prometheus = new PrometheusHealthAdapter(new PrometheusClient(releaseManager.environment()));
        HealthChecker cloudWatch = new CloudWatchHealthAdapter(new CloudWatchClient(releaseManager.environment()));

        assertEquals(HealthStatus.UNHEALTHY, prometheus.checkHealth(), "cpu 97.5% / errors 43% breach thresholds");
        assertEquals(HealthStatus.UNHEALTHY, cloudWatch.checkHealth(), "ALARM status breaches the status check");
    }

    @Test
    void monitoringProviderIsSwappableAtRuntime() {
        assertEquals("PROMETHEUS", releaseManager.monitoringProvider().provider(),
                "Prometheus adapter is the default provider");

        releaseManager.setMonitoringProvider(
                new CloudWatchHealthAdapter(new CloudWatchClient(releaseManager.environment())));

        assertEquals("CLOUDWATCH", releaseManager.monitoringProvider().provider(),
                "provider swapped without modifying the deployment engine");
    }

    @Test
    void cloudWatchBackedDeploymentSucceedsEndToEnd() {
        releaseManager.setMonitoringProvider(
                new CloudWatchHealthAdapter(new CloudWatchClient(releaseManager.environment())));
        releaseManager.setFailurePoint("NONE");

        DeploymentResult result = releaseManager.deploy();

        assertTrue(result.success());
        assertTrue(result.summary().contains("CLOUDWATCH"), "summary reflects the active adapter");
    }

    @Test
    void cloudWatchBackedDeploymentRollsBackOnUnhealthyFleet() {
        releaseManager.setMonitoringProvider(
                new CloudWatchHealthAdapter(new CloudWatchClient(releaseManager.environment())));
        releaseManager.setFailurePoint("HEALTH");

        DeploymentResult result = releaseManager.deploy();

        assertFalse(result.success());
        assertEquals("3.2.0", releaseManager.environment().version().toString(),
                "memento snapshot restored the previous version");
    }

    /** Minimal helper to keep the logger buffer clean between tests. */
    private static final class DeploymentLoggerCleanup {
        static void clear() {
            patternsforge.utils.DeploymentLogger.clear();
        }
    }
}
