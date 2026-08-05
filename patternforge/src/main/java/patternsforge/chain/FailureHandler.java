package patternsforge.chain;

import patternsforge.utils.DeploymentLogger;

/**
 * <b>Chain of Responsibility.</b> Base handler. Each handler decides whether it can
 * process a failure ({@link #canHandle}); if not, the request is passed to the next
 * handler in the chain.
 */
public abstract class FailureHandler {

    private final DeploymentLogger logger;
    private FailureHandler next;

    protected FailureHandler(DeploymentLogger logger) {
        this.logger = logger;
    }

    /** Links the next handler; returns it for fluent chaining. */
    public FailureHandler setNext(FailureHandler next) {
        this.next = next;
        return next;
    }

    protected FailureHandler next() {
        return next;
    }

    protected DeploymentLogger logger() {
        return logger;
    }

    /** Entry point: process if possible, otherwise delegate downstream. */
    public final void handle(FailureContext context) {
        if (canHandle(context)) {
            logger.warn(getClass().getSimpleName() + " accepted failure at stage [" + context.failedStage() + "]");
            process(context);
        } else if (next != null) {
            logger.warn(getClass().getSimpleName() + " cannot handle — passing to " + next.getClass().getSimpleName());
            next.handle(context);
        } else {
            throw new IllegalStateException("No handler could process the failure");
        }
    }

    protected abstract boolean canHandle(FailureContext context);

    protected abstract void process(FailureContext context);
}
