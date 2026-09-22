package patternsforge.strategy;

/**
 * Supplies the currently selected {@link DeploymentStrategy}. The stage factory hands
 * this provider to {@code DeployCommand}, so the pipeline always executes whatever
 * strategy the client chose — even if it is swapped between deployments.
 *
 * <p>{@code ReleaseManager} implements this with a lambda over its mutable
 * {@code strategy} field, which is what makes runtime switching possible without the
 * engine holding a reference to the facade.
 */
@FunctionalInterface
public interface StrategyProvider {

    /** @return the strategy that is active right now. */
    DeploymentStrategy current();
}
