package patternsforge.observer;

import patternsforge.model.DeploymentEvent;
import patternsforge.utils.DeploymentLogger;

/** Writes every event into the central log stream. */
public final class LogObserver implements DeploymentObserver {

    private final DeploymentLogger logger;

    public LogObserver(DeploymentLogger logger) {
        this.logger = logger;
    }

    @Override
    public String channel() {
        return "log";
    }

    @Override
    public void update(DeploymentEvent event) {
        logger.log("LOG: " + event);
    }
}
