package patternsforge.observer;

import patternsforge.model.DeploymentEvent;
import patternsforge.utils.DeploymentLogger;

/** Posts deployment events to the #deployments Slack channel. */
public final class SlackObserver implements DeploymentObserver {

    private final DeploymentLogger logger;

    public SlackObserver(DeploymentLogger logger) {
        this.logger = logger;
    }

    @Override
    public String channel() {
        return "slack";
    }

    @Override
    public void update(DeploymentEvent event) {
        if (event.status() == patternsforge.model.DeploymentStatus.ROLLED_BACK
                || event.status() == patternsforge.model.DeploymentStatus.HEALTHY) {
            logger.warn("OBS[slack] #deployments: " + event.message());
        } else {
            logger.log("OBS[slack] #deployments: " + event.message());
        }
    }
}
