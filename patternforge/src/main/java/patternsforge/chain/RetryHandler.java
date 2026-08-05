package patternsforge.chain;

import patternsforge.command.StageFailureException;
import patternsforge.utils.DeploymentLogger;

/**
 * First link in the failure chain. Retries the failed stage once. Health-check failures
 * are not retried (they are handled by the next link). If the retry also fails, the
 * request is passed to the {@link RollbackHandler}.
 */
public final class RetryHandler extends FailureHandler {

    private static final int MAX_RETRIES = 1;

    public RetryHandler(DeploymentLogger logger) {
        super(logger);
    }

    @Override
    protected boolean canHandle(FailureContext context) {
        return context.retries() < MAX_RETRIES && !"HEALTH_CHECK".equals(context.failedStage());
    }

    @Override
    protected void process(FailureContext context) {
        logger().warn("RetryHandler retrying [" + context.failedStage() + "] (attempt " + (context.retries() + 2) + ")");
        try {
            context.engine().retryLast();
            logger().ok("RetryHandler: retry succeeded — pipeline continues");
            context.engine().markRecovered();
        } catch (StageFailureException retryFailure) {
            logger().error("RetryHandler: retry failed (" + retryFailure.getMessage() + ")");
            next().handle(context.incrementRetries());
        }
    }
}
