package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** The release passed health verification and was promoted. */
public final class HealthyState implements DeploymentState {

    @Override
    public String name() {
        return "HEALTHY";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().ok(">>> [State] Entering HEALTHY state — release is live");
        context.notify(DeploymentStatus.HEALTHY, "Release is live and serving traffic");
    }
}
