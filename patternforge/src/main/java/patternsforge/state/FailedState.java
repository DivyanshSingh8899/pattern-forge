package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** Terminal state after a failed deployment; the snapshot has been restored. */
public final class FailedState implements DeploymentState {

    @Override
    public String name() {
        return "FAILED";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().error(">>> [State] Entering FAILED state");
    }
}
