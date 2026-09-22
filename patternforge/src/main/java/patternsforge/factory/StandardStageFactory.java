package patternsforge.factory;

import patternsforge.command.BuildCommand;
import patternsforge.command.CommandInvoker;
import patternsforge.command.DeployCommand;
import patternsforge.command.ProvisionCommand;
import patternsforge.command.PromoteCommand;
import patternsforge.command.RollbackCommand;
import patternsforge.command.TestCommand;
import patternsforge.command.VerifyCommand;
import patternsforge.service.RollbackManager;
import patternsforge.strategy.StrategyProvider;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * Concrete {@link StageFactory} — the Factory Method implementation that maps a stage
 * type to a concrete {@link DeploymentStage} subclass.
 *
 * <p>The factory injects the {@link StrategyProvider} into {@link DeployCommand}, so the
 * DEPLOY stage always executes whatever {@code DeploymentStrategy} is active at the
 * moment of execution — which is what makes runtime strategy switching possible.
 */
public final class StandardStageFactory extends StageFactory {

    private final SimulatedEnvironment environment;
    private final DeploymentLogger logger;
    private final RollbackManager rollbackManager;
    private final StrategyProvider strategyProvider;

    public StandardStageFactory(SimulatedEnvironment environment,
                                DeploymentLogger logger,
                                RollbackManager rollbackManager,
                                StrategyProvider strategyProvider) {
        this.environment = environment;
        this.logger = logger;
        this.rollbackManager = rollbackManager;
        this.strategyProvider = strategyProvider;
    }

    @Override
    protected DeploymentStage createStage(String type) {
        return switch (type) {
            case "BUILD" -> new BuildCommand(environment, logger);
            case "TEST" -> new TestCommand(environment, logger);
            case "PROVISION" -> new ProvisionCommand(environment, logger);
            case "DEPLOY" -> new DeployCommand(environment, logger, strategyProvider);
            case "VERIFY" -> new VerifyCommand(environment, logger);
            case "PROMOTE" -> new PromoteCommand(environment, logger);
            case "ROLLBACK" -> new RollbackCommand(environment, logger, rollbackManager);
            default -> throw new IllegalArgumentException("Unknown stage type: " + type);
        };
    }
}
