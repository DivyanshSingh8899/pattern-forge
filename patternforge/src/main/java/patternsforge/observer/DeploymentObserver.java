package patternsforge.observer;

import patternsforge.model.DeploymentEvent;

/**
 * <b>Observer.</b> Implementations receive every deployment event pushed by the
 * {@link DeploymentEngine} (the subject).
 */
public interface DeploymentObserver {

    /** Human-readable channel name, e.g. "dashboard". */
    String channel();

    void update(DeploymentEvent event);
}
