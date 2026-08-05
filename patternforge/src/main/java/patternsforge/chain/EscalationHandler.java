package patternsforge.chain;

import patternsforge.model.DeploymentStatus;
import patternsforge.observer.DeploymentEngine;
import patternsforge.utils.DeploymentLogger;

/**
 * Terminal link in the failure chain. Always can handle: the failure is escalated to the
 * on-call engineers through the observer notifications (email / Slack).
 */
public final class EscalationHandler extends FailureHandler {

    private final DeploymentEngine engine;

    public EscalationHandler(DeploymentEngine engine, DeploymentLogger logger) {
        super(logger);
        this.engine = engine;
    }

    @Override
    protected boolean canHandle(FailureContext context) {
        return true;
    }

    @Override
    protected void process(FailureContext context) {
        logger().error("EscalationHandler: escalating to on-call engineer for stage [" + context.failedStage() + "]");
        engine.broadcast(DeploymentStatus.FAILED,
                "Escalated to on-call — deployment of stage " + context.failedStage() + " failed and was rolled back");
    }
}
