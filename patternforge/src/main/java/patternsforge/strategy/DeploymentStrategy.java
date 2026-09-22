package patternsforge.strategy;

import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * <b>Strategy.</b> Encapsulates a deployment algorithm behind a common interface so the
 * algorithm can be swapped at runtime
 * (see {@link patternsforge.facade.ReleaseManager#setStrategy(DeploymentStrategy)}).
 *
 * <p>The pipeline's DEPLOY stage ({@code DeployCommand}) calls
 * {@link #deploy(SimulatedEnvironment, DeploymentLogger)} through this abstraction —
 * it never references a concrete strategy. Adding a new rollout algorithm
 * (e.g. {@code RecreateStrategy}) requires no change to the deployment engine
 * (Open/Closed Principle).
 */
public interface DeploymentStrategy {

    String name();

    /** One-line description shown in the console. */
    String summary();

    /**
     * Executes the strategy-specific rollout of the version currently staged in the
     * simulated environment.
     *
     * @param environment the simulated deployment target
     * @param logger      console logger
     * @return a detail line for the stage log
     */
    String deploy(SimulatedEnvironment environment, DeploymentLogger logger);
}
