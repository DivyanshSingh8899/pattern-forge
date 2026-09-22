package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.strategy.DeploymentStrategy;
import patternsforge.strategy.StrategyProvider;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * Deploy stage: rolls the artifact out onto the simulated fleet through the active
 * {@link DeploymentStrategy} (Strategy pattern). The command depends only on the
 * {@link StrategyProvider} abstraction, so the rollout algorithm can be swapped at
 * runtime without modifying this command or the deployment engine.
 */
public final class DeployCommand extends DeploymentStage {

    private final StrategyProvider strategyProvider;

    public DeployCommand(SimulatedEnvironment environment,
                         DeploymentLogger logger,
                         StrategyProvider strategyProvider) {
        super("DEPLOY", environment, logger);
        this.strategyProvider = strategyProvider;
    }

    @Override
    public String description() {
        return "roll out artifact per deployment strategy";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("DEPLOY"));
        DeploymentStrategy strategy = strategyProvider.current();
        return strategy.deploy(environment, logger);
    }

    @Override
    protected void revert() {
        environment.state().remove("deployedVersion");
        logger.log("DEPLOY undo: router switched back to previous fleet");
    }
}
