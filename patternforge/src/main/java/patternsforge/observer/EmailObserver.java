package patternsforge.observer;

import patternsforge.model.DeploymentEvent;
import patternsforge.utils.DeploymentLogger;

/** Emails on-call engineers for important (failure / rollback) events. */
public final class EmailObserver implements DeploymentObserver {

    private final DeploymentLogger logger;

    public EmailObserver(DeploymentLogger logger) {
        this.logger = logger;
    }

    @Override
    public String channel() {
        return "email";
    }

    @Override
    public void update(DeploymentEvent event) {
        if (event.status().name().contains("FAIL") || event.status() == patternsforge.model.DeploymentStatus.ROLLING_BACK) {
            logger.error("OBS[email]: " + event);
        } else {
            logger.log("OBS[email]: " + event);
        }
    }
}
