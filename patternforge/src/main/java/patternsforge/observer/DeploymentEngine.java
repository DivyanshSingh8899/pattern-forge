package patternsforge.observer;

import patternsforge.builder.Pipeline;
import patternsforge.chain.FailureContext;
import patternsforge.chain.FailurePipeline;
import patternsforge.command.CommandInvoker;
import patternsforge.command.StageFailureException;
import patternsforge.factory.DeploymentStage;
import patternsforge.model.DeploymentEvent;
import patternsforge.model.DeploymentStatus;
import patternsforge.model.EnvironmentSnapshot;
import patternsforge.service.NotificationService;
import patternsforge.state.BuildingState;
import patternsforge.state.DeploymentContext;
import patternsforge.state.DeploymentState;
import patternsforge.state.DeployingState;
import patternsforge.state.FailedState;
import patternsforge.state.IdleState;
import patternsforge.state.TestingState;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

import java.time.Instant;

/**
 * <b>Subject (Observer) + orchestrator.</b> Runs the pipeline stage by stage through the
 * {@link CommandInvoker}, transitions the {@link DeploymentContext} between lifecycle
 * states, and broadcasts every status change to all attached observers. Failures are
 * handed to the {@link FailurePipeline} (Chain of Responsibility).
 */
public final class DeploymentEngine {

    private final DeploymentContext context;
    private final CommandInvoker invoker;
    private final NotificationService notifications;
    private final SimulatedEnvironment environment;
    private final DeploymentLogger logger;

    private FailurePipeline failurePipeline;
    private boolean recovered = false;
    private DeploymentStatus status = DeploymentStatus.IDLE;

    public DeploymentEngine(DeploymentContext context,
                            CommandInvoker invoker,
                            NotificationService notifications,
                            SimulatedEnvironment environment,
                            DeploymentLogger logger) {
        this.context = context;
        this.invoker = invoker;
        this.notifications = notifications;
        this.environment = environment;
        this.logger = logger;
    }

    public void setFailurePipeline(FailurePipeline failurePipeline) {
        this.failurePipeline = failurePipeline;
    }

    /** Executes every stage of the pipeline; returns the final status. */
    public DeploymentStatus run(Pipeline pipeline) {
        for (DeploymentStage stage : pipeline.stages()) {
            context.transition(stateFor(stage.name()));
            status = statusFor(stage.name());
            try {
                invoker.execute(stage);
            } catch (StageFailureException failure) {
                logger.error("Stage [" + stage.name() + "] FAILED: " + failure.getMessage());
                failurePipeline.handle(new FailureContext(this, stage.name(), failure.getMessage()));
                if (!recovered) {
                    status = DeploymentStatus.FAILED;
                    return status;
                }
                recovered = false;
            }
        }
        return status;
    }

    /** Called by RetryHandler when a retried stage succeeds. */
    public void markRecovered() {
        this.recovered = true;
    }

    /** Re-executes the last command (used by RetryHandler). */
    public void retryLast() {
        invoker.retryLast();
    }

    /** Restores the environment from a memento snapshot and enters the FAILED state. */
    public void restoreFromMemento(EnvironmentSnapshot snapshot) {
        environment.restore(snapshot);
        context.transition(new FailedState());
        logger.error("SNAPSHOT RESTORED — environment reverted to " + environment.version());
        broadcast(DeploymentStatus.ROLLED_BACK, "Snapshot restored — environment reverted to v" + environment.version());
    }

    public void broadcast(DeploymentStatus newStatus, String message) {
        status = newStatus;
        notifications.broadcast(new DeploymentEvent(newStatus, message, Instant.now()));
    }

    public DeploymentStatus status() {
        return status;
    }

    public DeploymentContext context() {
        return context;
    }

    public CommandInvoker invoker() {
        return invoker;
    }

    private DeploymentState stateFor(String stage) {
        return switch (stage) {
            case "BUILD" -> new BuildingState();
            case "TEST" -> new TestingState();
            case "PROVISION", "DEPLOY", "VERIFY" -> new DeployingState();
            default -> new IdleState();
        };
    }

    private DeploymentStatus statusFor(String stage) {
        return switch (stage) {
            case "BUILD" -> DeploymentStatus.BUILDING;
            case "TEST" -> DeploymentStatus.TESTING;
            case "PROVISION" -> DeploymentStatus.PROVISIONING;
            case "DEPLOY" -> DeploymentStatus.DEPLOYING;
            case "VERIFY" -> DeploymentStatus.VERIFYING;
            default -> status;
        };
    }
}
