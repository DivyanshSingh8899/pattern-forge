package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** The Test stage is executing. */
public final class TestingState implements DeploymentState {

    @Override
    public String name() {
        return "TESTING";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().log(">>> [State] Entering TESTING state");
        context.notify(DeploymentStatus.TESTING, "Pipeline entered TESTING state");
    }
}
