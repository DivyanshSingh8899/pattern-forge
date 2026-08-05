package patternsforge.state;

import patternsforge.model.DeploymentEvent;
import patternsforge.model.DeploymentStatus;
import patternsforge.service.NotificationService;
import patternsforge.utils.DeploymentLogger;

import java.time.Instant;

/**
 * The <b>State</b> context. Holds the current {@link DeploymentState} and delegates
 * lifecycle changes to it. Observers are notified through the {@link NotificationService}.
 */
public final class DeploymentContext {

    private DeploymentState state = new IdleState();
    private final NotificationService notifications;
    private final DeploymentLogger logger;

    public DeploymentContext(NotificationService notifications, DeploymentLogger logger) {
        this.notifications = notifications;
        this.logger = logger;
    }

    /** Moves the deployment into {@code next} and lets the state act on entry. */
    public void transition(DeploymentState next) {
        this.state = next;
        next.handle(this);
    }

    public String stateName() {
        return state.name();
    }

    /** Broadcast a lifecycle event to every observer. */
    public void notify(DeploymentStatus status, String message) {
        notifications.broadcast(new DeploymentEvent(status, message, Instant.now()));
    }

    public DeploymentLogger logger() {
        return logger;
    }
}
