package patternsforge;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import patternsforge.facade.ReleaseManager;
import patternsforge.model.DeploymentResult;
import patternsforge.strategy.BlueGreenStrategy;
import patternsforge.strategy.CanaryStrategy;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** Facade end-to-end: success promotes; failure rolls back and restores the snapshot. */
class ReleaseManagerTest {

    private ReleaseManager releaseManager;

    @BeforeEach
    void setUp() {
        DeploymentLoggerCleanup.clear();
        releaseManager = new ReleaseManager();
    }

    @Test
    void successfulDeploymentPromotesNextVersion() {
        releaseManager.setFailurePoint("NONE");

        DeploymentResult result = releaseManager.deploy();

        assertTrue(result.success());
        assertEquals("3.2.1", releaseManager.environment().version().toString());
        assertEquals("3.2.1", result.attemptedVersion().toString());
    }

    @Test
    void failingDeploymentRollsBackAndRestoresVersion() {
        releaseManager.setFailurePoint("TEST");

        DeploymentResult result = releaseManager.deploy();

        assertFalse(result.success());
        assertEquals("3.2.0", releaseManager.environment().version().toString(),
                "Memento snapshot restored the previous version");
        assertEquals("3.2.1", result.attemptedVersion().toString());
    }

    @Test
    void failingHealthCheckAlsoRollsBack() {
        releaseManager.setFailurePoint("HEALTH");

        DeploymentResult result = releaseManager.deploy();

        assertFalse(result.success());
        assertEquals("3.2.0", releaseManager.environment().version().toString());
    }

    @Test
    void strategyIsChangeableAtRuntime() {
        assertEquals("BLUE_GREEN", releaseManager.strategy().name());
        releaseManager.setStrategy(new CanaryStrategy());
        assertEquals("CANARY", releaseManager.strategy().name());
        releaseManager.setStrategy(new BlueGreenStrategy());
        assertEquals("BLUE_GREEN", releaseManager.strategy().name());
    }

    /** Minimal helper to keep the logger buffer clean between tests. */
    private static final class DeploymentLoggerCleanup {
        static void clear() {
            patternsforge.utils.DeploymentLogger.clear();
        }
    }
}
