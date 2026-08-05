package patternsforge.model;

/**
 * Lifecycle statuses of a deployment.
 * The {@link patternsforge.state.DeploymentState} implementations map onto these.
 */
public enum DeploymentStatus {
    IDLE,
    BUILDING,
    TESTING,
    PROVISIONING,
    DEPLOYING,
    VERIFYING,
    PROMOTING,
    HEALTHY,
    FAILED,
    ROLLING_BACK,
    ROLLED_BACK
}
