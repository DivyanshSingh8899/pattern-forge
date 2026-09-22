package patternsforge.facade;

import patternsforge.adapter.CloudWatchClient;
import patternsforge.adapter.CloudWatchHealthAdapter;
import patternsforge.adapter.PrometheusClient;
import patternsforge.adapter.PrometheusHealthAdapter;
import patternsforge.builder.Pipeline;
import patternsforge.builder.PipelineBuilder;
import patternsforge.chain.FailurePipeline;
import patternsforge.command.CommandInvoker;
import patternsforge.factory.StageFactory;
import patternsforge.factory.StandardStageFactory;
import patternsforge.memento.DeploymentCaretaker;
import patternsforge.model.DeploymentResult;
import patternsforge.model.DeploymentStatus;
import patternsforge.model.EnvironmentSnapshot;
import patternsforge.model.ReleaseVersion;
import patternsforge.observer.DashboardObserver;
import patternsforge.observer.DeploymentEngine;
import patternsforge.observer.DeploymentObserver;
import patternsforge.observer.EmailObserver;
import patternsforge.observer.LogObserver;
import patternsforge.observer.SlackObserver;
import patternsforge.service.HealthChecker;
import patternsforge.service.HealthMonitor;
import patternsforge.service.NotificationService;
import patternsforge.service.RollbackManager;
import patternsforge.state.DeploymentContext;
import patternsforge.state.HealthyState;
import patternsforge.strategy.BlueGreenStrategy;
import patternsforge.strategy.DeploymentStrategy;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * <b>Facade.</b> The single entry point for the whole orchestrator. Clients only call
 * {@link #deploy()}; internally the facade wires and drives the {@link Pipeline},
 * {@link CommandInvoker}, {@link DeploymentEngine}, {@link HealthMonitor},
 * {@link RollbackManager}, {@link NotificationService}, {@link DeploymentCaretaker},
 * {@link StageFactory} and the active {@link DeploymentStrategy}.
 *
 * <p>It also exposes the two runtime switches:
 * <ul>
 *   <li>{@link #setStrategy(DeploymentStrategy)} — <b>Strategy</b> pattern.</li>
 *   <li>{@link #setMonitoringProvider(HealthChecker)} — <b>Adapter</b> pattern:
 *       swap Prometheus / CloudWatch monitoring without touching the core.</li>
 * </ul>
 */
public final class ReleaseManager {

    private final DeploymentLogger logger = new DeploymentLogger();
    private final SimulatedEnvironment environment = new SimulatedEnvironment();
    private final NotificationService notifications = new NotificationService();
    private final CommandInvoker invoker = new CommandInvoker(logger);
    private final DeploymentContext context = new DeploymentContext(notifications, logger);
    private final DeploymentEngine engine = new DeploymentEngine(context, invoker, notifications, environment, logger);
    private final DeploymentCaretaker caretaker = new DeploymentCaretaker();
    private final RollbackManager rollbackManager = new RollbackManager(invoker, caretaker, engine, logger);

    private final HealthMonitor healthMonitor;
    private final StageFactory stageFactory;
    private final FailurePipeline failurePipeline;

    private DeploymentStrategy strategy = new BlueGreenStrategy();
    private boolean running = false;

    public ReleaseManager() {
        // Adapter: default monitoring provider is Prometheus behind the HealthChecker interface.
        this.healthMonitor = new HealthMonitor(logger, new PrometheusHealthAdapter(new PrometheusClient(environment)));
        // Strategy: the factory injects a provider lambda so DeployCommand always asks
        // for the currently selected strategy at the moment of execution.
        this.stageFactory = new StandardStageFactory(environment, logger, rollbackManager, () -> strategy);
        this.failurePipeline = new FailurePipeline(logger, rollbackManager, engine);

        engine.setFailurePipeline(failurePipeline);
        notifications.attach(new DashboardObserver(logger));
        notifications.attach(new LogObserver(logger));
        notifications.attach(new EmailObserver(logger));
        notifications.attach(new SlackObserver(logger));
    }

    /** <b>Strategy:</b> swap the deployment algorithm at runtime. */
    public void setStrategy(DeploymentStrategy strategy) {
        this.strategy = strategy;
        environment.put("deploymentStrategy", strategy.name());
        logger.banner(">>> [Strategy] Strategy switched to " + strategy.name()
                + " (" + strategy.summary() + ")");
    }

    public DeploymentStrategy strategy() {
        return strategy;
    }

    /**
     * <b>Adapter:</b> plug in a different monitoring vendor at runtime. The core
     * deployment engine only ever sees the {@link HealthChecker} interface — e.g.
     * <pre>
     *   releaseManager.setMonitoringProvider(new CloudWatchHealthAdapter(new CloudWatchClient(env)));
     * </pre>
     */
    public void setMonitoringProvider(HealthChecker healthChecker) {
        healthMonitor.setHealthChecker(healthChecker);
        logger.banner(">>> [Adapter] Health monitoring switched to " + healthChecker.provider());
    }

    public HealthChecker monitoringProvider() {
        return healthMonitor.healthChecker();
    }

    public void setFailurePoint(String failurePoint) {
        environment.setFailurePoint(failurePoint);
        logger.log(">>> failure point set to " + environment.failurePoint());
    }

    public void attachObserver(DeploymentObserver observer) {
        notifications.attach(observer);
    }

    public SimulatedEnvironment environment() {
        return environment;
    }

    public StageFactory stageFactory() {
        return stageFactory;
    }

    /**
     * The only method clients need. Orchestrates the entire deployment:
     * bump version → save memento snapshot → run pipeline → health gate → promote or roll back.
     */
    public DeploymentResult deploy() {
        if (running) {
            logger.warn("deployment already in progress — request ignored");
            return DeploymentResult.failed(environment.version(), environment.version(),
                    DeploymentStatus.FAILED, "deployment already in progress");
        }
        running = true;
        try {
            ReleaseVersion target = environment.bumpVersion();
            logger.banner("=== DEPLOYMENT v" + target + " STARTED (strategy: " + strategy.name()
                    + ", monitoring: " + healthMonitor.healthChecker().provider() + ") ===");

            // Memento: capture state before anything mutates the environment.
            EnvironmentSnapshot snapshot = environment.snapshot();
            caretaker.save(snapshot);
            logger.log(">>> [Memento] snapshot saved: v" + snapshot.version()
                    + " | " + snapshot.config().size() + " config keys | "
                    + snapshot.envVars().size() + " env vars @ " + snapshot.timestamp());

            // Builder + Factory Method: assemble the pipeline.
            Pipeline pipeline = new PipelineBuilder(stageFactory)
                    .addBuild()
                    .addTest()
                    .addProvision()
                    .addDeploy()
                    .addVerify()
                    .build();
            logger.log(">>> [Builder] pipeline assembled: " + pipeline);

            DeploymentStatus status = engine.run(pipeline);

            if (status == DeploymentStatus.FAILED || status == DeploymentStatus.ROLLED_BACK) {
                running = false;
                return DeploymentResult.failed(target, environment.version(), status,
                        "deployment failed — restored to v" + environment.version());
            }

            // Health verification gates promotion (Adapter: provider-agnostic probe).
            if (!healthMonitor.checkHealth(environment, strategy)) {
                engine.broadcast(DeploymentStatus.FAILED, "Health verification failed for v" + target);
                failurePipeline.handle(new patternsforge.chain.FailureContext(
                        engine, "HEALTH_CHECK", "health verification failed", 0));
                running = false;
                return DeploymentResult.failed(target, environment.version(), DeploymentStatus.ROLLED_BACK,
                        "health check failed — restored to v" + environment.version());
            }

            // Healthy: promote the release.
            try {
                invoker.execute(stageFactory.create("PROMOTE"));
            } catch (patternsforge.command.StageFailureException promoteFailure) {
                logger.error("Promotion failed: " + promoteFailure.getMessage());
                failurePipeline.handle(new patternsforge.chain.FailureContext(
                        engine, "PROMOTE", promoteFailure.getMessage(), 0));
                running = false;
                return DeploymentResult.failed(target, environment.version(), DeploymentStatus.ROLLED_BACK,
                        "promotion failed — restored to v" + environment.version());
            }
            engine.context().transition(new HealthyState());
            engine.broadcast(DeploymentStatus.HEALTHY, "Release v" + target + " is LIVE (promoted)");
            running = false;
            return DeploymentResult.success(target, "release v" + target + " deployed via " + strategy.name()
                    + " (health via " + healthMonitor.healthChecker().provider() + ")");
        } finally {
            running = false;
        }
    }
}
