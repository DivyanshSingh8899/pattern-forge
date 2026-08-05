package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Build stage: compiles sources and produces a deployable artifact. */
public final class BuildCommand extends DeploymentStage {

    public BuildCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("BUILD", environment, logger);
    }

    @Override
    public String description() {
        return "compile sources & produce artifact";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("BUILD"));
        String artifact = "patternforge-" + environment.version() + ".jar";
        environment.put("artifact", artifact);
        environment.put("artifactBuilt", Boolean.TRUE);
        return "artifact " + artifact + " built";
    }

    @Override
    protected void revert() {
        environment.put("artifactBuilt", Boolean.FALSE);
        environment.state().remove("artifact");
        logger.log("BUILD undo: artifact deleted from registry");
    }
}
