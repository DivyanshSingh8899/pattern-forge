package patternsforge.strategy;

/**
 * <b>Strategy.</b> Encapsulates a deployment algorithm behind a common interface so the
 * algorithm can be changed at runtime (see
 * {@link patternsforge.facade.ReleaseManager#setStrategy(DeploymentStrategy)}).
 */
public interface DeploymentStrategy {

    String name();

    /** One-line description shown in the console. */
    String summary();
}
