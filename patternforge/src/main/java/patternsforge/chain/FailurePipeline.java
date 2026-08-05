package patternsforge.chain;

import patternsforge.observer.DeploymentEngine;
import patternsforge.service.RollbackManager;
import patternsforge.utils.DeploymentLogger;

/**
 * Assembles the failure-handling chain: <b>RetryHandler → RollbackHandler →
 * EscalationHandler</b>. Clients only call {@link #handle(FailureContext)} on the head
 * of the chain.
 */
public final class FailurePipeline {

    private final FailureHandler head;

    public FailurePipeline(DeploymentLogger logger,
                           RollbackManager rollbackManager,
                           DeploymentEngine engine) {
        RetryHandler retry = new RetryHandler(logger);
        RollbackHandler rollback = new RollbackHandler(rollbackManager, logger);
        EscalationHandler escalate = new EscalationHandler(engine, logger);
        retry.setNext(rollback);
        rollback.setNext(escalate);
        this.head = retry;
    }

    public void handle(FailureContext context) {
        head.handle(context);
    }
}
