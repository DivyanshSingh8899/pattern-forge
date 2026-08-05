package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Promote stage: marks the verified release as stable and serves 100% of traffic. */
public final class PromoteCommand extends DeploymentStage {

    public PromoteCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("PROMOTE", environment, logger);
    }

    @Override
    public String description() {
        return "mark release as stable (100% traffic)";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("PROMOTE"));
        environment.put("promotedVersion", environment.version().toString());
        return "v" + environment.version() + " promoted to stable";
    }

    @Override
    protected void revert() {
        environment.state().remove("promotedVersion");
        logger.log("PROMOTE undo: release demoted to previous stable");
    }
}
