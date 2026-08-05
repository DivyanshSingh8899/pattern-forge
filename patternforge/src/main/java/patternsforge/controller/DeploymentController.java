package patternsforge.controller;

import patternsforge.facade.ReleaseManager;
import patternsforge.model.DeploymentResult;
import patternsforge.strategy.BlueGreenStrategy;
import patternsforge.strategy.CanaryStrategy;
import patternsforge.strategy.RollingStrategy;
import patternsforge.utils.DeploymentLogger;

import java.util.Scanner;

/**
 * Accepts user choices (strategy, failure point) and delegates the work to the
 * {@link ReleaseManager} facade. Also exposes {@link #runScenario} for demos and tests.
 */
public final class DeploymentController {

    private static final String[] FAILURE_POINTS =
            {"NONE", "RANDOM", "BUILD", "TEST", "PROVISION", "DEPLOY", "VERIFY", "PROMOTE", "HEALTH"};

    private final ReleaseManager releaseManager;
    private final DeploymentLogger logger;
    private final Scanner scanner = new Scanner(System.in);

    public DeploymentController(ReleaseManager releaseManager, DeploymentLogger logger) {
        this.releaseManager = releaseManager;
        this.logger = logger;
    }

    public DeploymentController(ReleaseManager releaseManager) {
        this(releaseManager, new DeploymentLogger());
    }

    /** Interactive console session. */
    public void interactiveSession() {
        logger.banner("=== PatternForge — Deployment Console ===");
        while (true) {
            System.out.println();
            System.out.println("1) Blue-Green   2) Rolling   3) Canary");
            System.out.print("Choose deployment strategy [1-3, q=quit] -> ");
            String choice = scanner.nextLine().trim();
            if (choice.equalsIgnoreCase("q")) {
                break;
            }
            switch (choice) {
                case "1" -> releaseManager.setStrategy(new BlueGreenStrategy());
                case "2" -> releaseManager.setStrategy(new RollingStrategy());
                case "3" -> releaseManager.setStrategy(new CanaryStrategy());
                default -> {
                    logger.warn("invalid choice, keeping " + releaseManager.strategy().name());
                }
            }

            System.out.print("Failure point " + String.join("/", FAILURE_POINTS) + " -> ");
            String point = scanner.nextLine().trim().toUpperCase();
            releaseManager.setFailurePoint(point.isEmpty() ? "NONE" : point);

            DeploymentResult result = releaseManager.deploy();
            printResult(result);
        }
    }

    /** Scripted scenario for {@code --demo} and tests. */
    public DeploymentResult runScenario(String strategyName, String failurePoint) {
        releaseManager.setFailurePoint(failurePoint);
        switch (strategyName.toUpperCase()) {
            case "ROLLING" -> releaseManager.setStrategy(new RollingStrategy());
            case "CANARY" -> releaseManager.setStrategy(new CanaryStrategy());
            default -> releaseManager.setStrategy(new BlueGreenStrategy());
        }
        DeploymentResult result = releaseManager.deploy();
        printResult(result);
        return result;
    }

    private void printResult(DeploymentResult result) {
        if (result.success()) {
            logger.ok("=== DEPLOYMENT SUCCESSFUL — " + result.summary() + " ===");
        } else {
            logger.error("=== DEPLOYMENT FAILED — " + result.summary() + " ===");
        }
    }
}
