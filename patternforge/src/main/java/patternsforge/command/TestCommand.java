package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Test stage: executes the unit &amp; integration suite against the new artifact. */
public final class TestCommand extends DeploymentStage {

    public TestCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("TEST", environment, logger);
    }

    @Override
    public String description() {
        return "execute unit & integration suite";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("TEST"));
        int tests = 42 + (int) (Math.random() * 10);
        environment.put("testsPassed", tests);
        return tests + " tests passed, 0 failures";
    }

    @Override
    protected void revert() {
        environment.state().remove("testsPassed");
        logger.log("TEST undo: test reports discarded");
    }
}
