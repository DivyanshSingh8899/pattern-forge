package patternsforge.factory;

import patternsforge.command.DeploymentCommand;
import patternsforge.command.StageFailureException;
import patternsforge.model.StageResult;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

import java.util.concurrent.TimeUnit;

/**
 * Base class for every pipeline stage.
 *
 * <p><b>Factory Method + Command.</b> Concrete stages are created by
 * {@link StageFactory} and, because a stage <i>is</i> a command, each one implements
 * {@link DeploymentCommand}: {@code execute()} runs the work, {@code undo()} reverts it.
 */
public abstract class DeploymentStage implements DeploymentCommand {

    private final String name;
    protected final SimulatedEnvironment environment;
    protected final DeploymentLogger logger;

    protected DeploymentStage(String name, SimulatedEnvironment environment, DeploymentLogger logger) {
        this.name = name;
        this.environment = environment;
        this.logger = logger;
    }

    public final String name() {
        return name;
    }

    public abstract String description();

    /** Perform the stage's real work (simulated). Returns a detail message. */
    protected abstract String perform();

    /** Undo whatever {@link #perform()} changed in the environment. */
    protected abstract void revert();

    @Override
    public final void execute() {
        logger.stage(name, "start", description());
        long start = System.nanoTime();
        if (environment.shouldFail(name)) {
            String reason = "injected failure at failure point " + environment.failurePoint();
            logger.error(name + " " + reason);
            throw new StageFailureException(name, reason);
        }
        String detail = perform();
        long durationMs = TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - start);
        logger.ok(name + " completed in " + durationMs + "ms — " + detail);
    }

    @Override
    public final void undo() {
        logger.warn("undo " + name + " ...");
        revert();
    }

    /** Convenience for stages that want to return a result without throwing. */
    protected StageResult ok(String message) {
        return StageResult.ok(name, 0L, message);
    }

    protected SimulatedEnvironment environment() {
        return environment;
    }

    protected DeploymentLogger logger() {
        return logger;
    }

    /** Simulated work delay. */
    protected final void sleep(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
