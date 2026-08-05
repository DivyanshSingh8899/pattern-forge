package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** Provision, Deploy and Verify stages all run inside this state. */
public final class DeployingState implements DeploymentState {

    @Override
    public String name() {
        return "DEPLOYING";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().log(">>> [State] Entering DEPLOYING state");
        context.notify(DeploymentStatus.DEPLOYING, "Pipeline entered DEPLOYING state");
    }
}
