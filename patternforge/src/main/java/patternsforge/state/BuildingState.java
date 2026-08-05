package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** The Build stage is executing. */
public final class BuildingState implements DeploymentState {

    @Override
    public String name() {
        return "BUILDING";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().log(">>> [State] Entering BUILDING state");
        context.notify(DeploymentStatus.BUILDING, "Pipeline entered BUILDING state");
    }
}
