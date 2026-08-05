package patternsforge.observer;

import patternsforge.model.DeploymentEvent;
import patternsforge.utils.DeploymentLogger;

/** Renders events to the operator dashboard (stdout in the simulation). */
public final class DashboardObserver implements DeploymentObserver {

    private final DeploymentLogger logger;

    public DashboardObserver(DeploymentLogger logger) {
        this.logger = logger;
    }

    @Override
    public String channel() {
        return "dashboard";
    }

    @Override
    public void update(DeploymentEvent event) {
        logger.log("DASHBOARD: " + event.message());
    }
}
