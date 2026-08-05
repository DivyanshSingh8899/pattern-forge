package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** Reverse-order undo and snapshot restore are executing. */
public final class RollbackState implements DeploymentState {

    @Override
    public String name() {
        return "ROLLBACK";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().warn(">>> [State] Entering ROLLBACK state");
        context.notify(DeploymentStatus.ROLLING_BACK, "Rollback initiated — undoing executed stages");
    }
}
