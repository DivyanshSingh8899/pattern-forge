package patternsforge.model;

import java.time.Instant;

/**
 * Notification payload pushed to every {@link patternsforge.observer.DeploymentObserver}.
 */
public record DeploymentEvent(DeploymentStatus status, String message, Instant at) {

    @Override
    public String toString() {
        return "[" + status + "] " + message;
    }
}
