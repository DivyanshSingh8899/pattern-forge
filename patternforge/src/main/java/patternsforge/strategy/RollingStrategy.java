package patternsforge.strategy;

import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Rolling: instances are updated in batches; capacity never drops below minimum. */
public final class RollingStrategy implements DeploymentStrategy {

    private static final String[] BATCHES = {"batch 1/3", "batch 2/3", "batch 3/3"};

    @Override
    public String name() {
        return "ROLLING";
    }

    @Override
    public String summary() {
        return "batch-by-batch instance update — capacity never drops";
    }

    @Override
    public String deploy(SimulatedEnvironment environment, DeploymentLogger logger) {
        String version = environment.version().toString();
        logger.log("[Strategy] ROLLING     drain & update instances batch by batch");
        for (String batch : BATCHES) {
            logger.log("[Strategy] ROLLING     " + batch + " rolled to v" + version + " (capacity held)");
        }
        environment.put("deploymentStrategy", name());
        environment.put("deployedVersion", version);
        return "v" + version + " rolled out in 3 batches";
    }
}
