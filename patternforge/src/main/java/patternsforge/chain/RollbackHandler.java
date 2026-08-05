package patternsforge.chain;

import patternsforge.service.RollbackManager;
import patternsforge.utils.DeploymentLogger;

/**
 * Second link in the failure chain. Can handle any failure: it triggers the
 * {@link RollbackManager}, which undoes every executed command in reverse order
 * (Command) and restores the last snapshot (Memento).
 */
public final class RollbackHandler extends FailureHandler {

    private final RollbackManager rollbackManager;

    public RollbackHandler(RollbackManager rollbackManager, DeploymentLogger logger) {
        super(logger);
        this.rollbackManager = rollbackManager;
    }

    @Override
    protected boolean canHandle(FailureContext context) {
        return context.failedStage() != null;
    }

    @Override
    protected void process(FailureContext context) {
        logger().warn("RollbackHandler taking over — rolling back deployment");
        rollbackManager.rollback(context.failedStage());
    }
}
