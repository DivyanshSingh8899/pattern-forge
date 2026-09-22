package patternsforge;

import org.junit.jupiter.api.Test;
import patternsforge.command.DeployCommand;
import patternsforge.factory.DeploymentStage;
import patternsforge.factory.StageFactory;
import patternsforge.strategy.BlueGreenStrategy;
import patternsforge.strategy.CanaryStrategy;
import patternsforge.strategy.DeploymentStrategy;
import patternsforge.strategy.RollingStrategy;
import patternsforge.strategy.StrategyProvider;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Strategy pattern: the three rollout algorithms are interchangeable
 * {@code DeploymentStrategy} implementations and the deploy stage always executes
 * whatever strategy the {@link StrategyProvider} reports at the moment of execution —
 * which is what makes runtime switching possible without changing the engine.
 */
class StrategyTest {

    @Test
    void strategiesAreNamedAndDescribed() {
        assertEquals("BLUE_GREEN", new BlueGreenStrategy().name());
        assertEquals("ROLLING", new RollingStrategy().name());
        assertEquals("CANARY", new CanaryStrategy().name());

        for (DeploymentStrategy strategy : new DeploymentStrategy[]{
                new BlueGreenStrategy(), new RollingStrategy(), new CanaryStrategy()}) {
            assertTrue(strategy.summary() != null && !strategy.summary().isBlank(),
                    strategy.name() + " has a summary");
        }
    }

    @Test
    void everyStrategyDeploysTheStagedVersion() {
        patternsforge.utils.SimulatedEnvironment environment = new patternsforge.utils.SimulatedEnvironment();
        patternsforge.utils.DeploymentLogger logger = new patternsforge.utils.DeploymentLogger();
        patternsforge.utils.DeploymentLogger.clear();
        environment.bumpVersion(); // v3.2.1

        for (DeploymentStrategy strategy : new DeploymentStrategy[]{
                new BlueGreenStrategy(), new RollingStrategy(), new CanaryStrategy()}) {
            String detail = strategy.deploy(environment, logger);
            assertTrue(detail.contains("3.2.1"),
                    strategy.name() + " reports the staged version");
            assertEquals("3.2.1", environment.state().get("deployedVersion"),
                    strategy.name() + " staged its version for the deploy stage");
        }
    }

    @Test
    void deployCommandExecutesWhicheverStrategyIsActiveRightNow() {
        // Manual wiring (mirrors StandardStageFactory): the command holds a provider,
        // not a concrete strategy — so the active algorithm can change under it.
        patternsforge.utils.SimulatedEnvironment environment = new patternsforge.utils.SimulatedEnvironment();
        patternsforge.utils.DeploymentLogger logger = new patternsforge.utils.DeploymentLogger();
        patternsforge.utils.DeploymentLogger.clear();

        DeploymentStrategy[] active = {new BlueGreenStrategy()};
        StrategyProvider provider = () -> active[0];
        DeploymentStage deploy = new DeployCommand(environment, logger, provider);

        active[0] = new BlueGreenStrategy();
        deploy.execute();
        assertEquals("BLUE_GREEN", environment.state().get("deploymentStrategy"));

        active[0] = new CanaryStrategy(); // swapped at runtime, same command object
        deploy.execute();
        assertEquals("CANARY", environment.state().get("deploymentStrategy"));

        active[0] = new RollingStrategy();
        deploy.execute();
        assertEquals("ROLLING", environment.state().get("deploymentStrategy"));
    }

    @Test
    void facadeFactoryCreatesDeployStageBackedByTheRuntimeStrategy() {
        patternsforge.utils.DeploymentLogger.clear();
        ReleaseManager releaseManager = new patternsforge.facade.ReleaseManager();
        StageFactory factory = releaseManager.stageFactory();

        DeploymentStage stage = factory.create("DEPLOY");
        assertEquals(DeployCommand.class, stage.getClass());

        releaseManager.setStrategy(new CanaryStrategy());
        releaseManager.setFailurePoint("NONE");
        var result = releaseManager.deploy();
        assertTrue(result.success());
        assertEquals("CANARY", releaseManager.environment().state().get("deploymentStrategy"));
    }
}
