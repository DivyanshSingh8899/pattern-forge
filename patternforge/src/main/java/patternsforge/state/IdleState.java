package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** Initial state — the orchestrator is waiting for a deployment request. */
public final class IdleState implements DeploymentState {

    @Override
    public String name() {
        return "IDLE";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().log(">>> [State] Entering IDLE state");
    }
}
