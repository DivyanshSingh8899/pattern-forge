package patternsforge.main;

import patternsforge.controller.DeploymentController;
import patternsforge.facade.ReleaseManager;
import patternsforge.utils.DeploymentLogger;

/**
 * PatternForge — Self-Healing Microservice Deployment &amp; Rollback Orchestrator.
 *
 * <p>Entry point. Run with {@code --demo} for a scripted success + failure run, or
 * without arguments for the interactive console.
 *
 * <pre>
 *   mvn exec:java                       (interactive)
 *   mvn exec:java -Dexec.args="--demo"  (scripted demo)
 * </pre>
 */
public final class PatternForgeApplication {

    private PatternForgeApplication() {
    }

    public static void main(String[] args) {
        DeploymentLogger logger = new DeploymentLogger();
        logger.banner("================================================================");
        logger.banner("  PatternForge v1.0.0");
        logger.banner("  Self-Healing Microservice Deployment & Rollback Orchestrator");
        logger.banner("  GoF Design Patterns course project — 10 patterns, 1 pipeline");
        logger.banner("================================================================");
        logger.log("observers attached: dashboard, log, email, slack");

        ReleaseManager releaseManager = new ReleaseManager();
        DeploymentController controller = new DeploymentController(releaseManager, logger);

        if (args.length > 0 && args[0].equals("--demo")) {
            controller.runScenario("BLUE_GREEN", "NONE");
            System.out.println();
            controller.runScenario("CANARY", "TEST");
            return;
        }
        controller.interactiveSession();
    }
}
