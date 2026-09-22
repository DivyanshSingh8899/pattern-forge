package patternsforge.strategy;

import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Canary: a small traffic slice is routed to the new version and gradually widened. */
public final class CanaryStrategy implements DeploymentStrategy {

    private static final int[] TRAFFIC_STEPS = {5, 25, 100};

    @Override
    public String name() {
        return "CANARY";
    }

    @Override
    public String summary() {
        return "5% traffic slice first, then widen to 100%";
    }

    @Override
    public String deploy(SimulatedEnvironment environment, DeploymentLogger logger) {
        String version = environment.version().toString();
        logger.log("[Strategy] CANARY      deploy canary pod for v" + version);
        for (int step : TRAFFIC_STEPS) {
            logger.log("[Strategy] CANARY      widening traffic slice to " + step + "%");
        }
        environment.put("deploymentStrategy", name());
        environment.put("deployedVersion", version);
        return "v" + version + " canary promoted 5% -> 25% -> 100%";
    }
}
