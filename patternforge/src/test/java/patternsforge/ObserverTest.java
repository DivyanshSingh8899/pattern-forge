package patternsforge;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import patternsforge.facade.ReleaseManager;
import patternsforge.model.DeploymentEvent;
import patternsforge.model.DeploymentStatus;
import patternsforge.observer.DeploymentObserver;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** Observer pattern: every attached observer receives deployment events. */
class ObserverTest {

    private ReleaseManager releaseManager;
    private CountingObserver observer;

    static final class CountingObserver implements DeploymentObserver {
        final List<DeploymentStatus> received = new ArrayList<>();

        @Override
        public String channel() {
            return "test";
        }

        @Override
        public void update(DeploymentEvent event) {
            received.add(event.status());
        }
    }

    @BeforeEach
    void setUp() {
        releaseManager = new ReleaseManager();
        observer = new CountingObserver();
        releaseManager.attachObserver(observer);
    }

    @Test
    void observersReceiveHealthyEventOnSuccess() {
        releaseManager.setFailurePoint("NONE");
        var result = releaseManager.deploy();

        assertTrue(result.success());
        assertFalse(observer.received.isEmpty(), "observer received at least one event");
        assertTrue(observer.received.contains(DeploymentStatus.HEALTHY));
    }

    @Test
    void observersReceiveRollbackEventsOnFailure() {
        releaseManager.setFailurePoint("TEST");
        var result = releaseManager.deploy();

        assertFalse(result.success());
        assertTrue(observer.received.contains(DeploymentStatus.ROLLING_BACK));
        assertTrue(observer.received.contains(DeploymentStatus.ROLLED_BACK));
    }
}
