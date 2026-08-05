package patternsforge.chain;

import patternsforge.observer.DeploymentEngine;

/** Failure details passed along the Chain of Responsibility. */
public record FailureContext(DeploymentEngine engine, String failedStage, String reason, int retries) {

    public FailureContext incrementRetries() {
        return new FailureContext(engine, failedStage, reason, retries + 1);
    }
}
