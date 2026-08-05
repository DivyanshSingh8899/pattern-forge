package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Deploy stage: rolls the artifact out onto the simulated fleet. */
public final class DeployCommand extends DeploymentStage {

    public DeployCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("DEPLOY", environment, logger);
    }

    @Override
    public String description() {
        return "roll out artifact per deployment strategy";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("DEPLOY"));
        environment.put("deployedVersion", environment.version().toString());
        environment.put("deploymentStrategy", environment.state().getOrDefault("deploymentStrategy", "BLUE_GREEN"));
        return "v" + environment.version() + " deployed (" + environment.state().get("deploymentStrategy") + ")";
    }

    @Override
    protected void revert() {
        environment.state().remove("deployedVersion");
        logger.log("DEPLOY undo: router switched back to previous fleet");
    }
}
