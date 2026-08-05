package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.service.RollbackManager;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * Rollback stage: exists so the {@link patternsforge.factory.StageFactory} can create a
 * "ROLLBACK" stage on demand. Its {@code execute()} hands over to the
 * {@link RollbackManager}, which undoes every executed command in reverse order and
 * restores the last memento snapshot.
 */
public final class RollbackCommand extends DeploymentStage {

    private final RollbackManager rollbackManager;

    public RollbackCommand(SimulatedEnvironment environment,
                           DeploymentLogger logger,
                           RollbackManager rollbackManager) {
        super("ROLLBACK", environment, logger);
        this.rollbackManager = rollbackManager;
    }

    @Override
    public String description() {
        return "undo every executed stage & restore snapshot";
    }

    @Override
    protected String perform() {
        rollbackManager.rollback(this);
        return "rollback completed";
    }

    @Override
    protected void revert() {
        logger.log("ROLLBACK undo: nothing to undo");
    }
}
