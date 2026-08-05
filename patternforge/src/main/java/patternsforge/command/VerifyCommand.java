package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Verify stage: probes liveness, readiness and latency of the new fleet. */
public final class VerifyCommand extends DeploymentStage {

    public VerifyCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("VERIFY", environment, logger);
    }

    @Override
    public String description() {
        return "probe liveness, readiness & latency";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("VERIFY"));
        environment.put("verified", Boolean.TRUE);
        return "3/3 probes passed, p95 latency 42ms";
    }

    @Override
    protected void revert() {
        environment.put("verified", Boolean.FALSE);
        logger.log("VERIFY undo: smoke traffic stopped");
    }
}
