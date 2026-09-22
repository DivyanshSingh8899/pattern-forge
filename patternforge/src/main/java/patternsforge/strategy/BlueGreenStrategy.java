package patternsforge.strategy;

import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Blue-green: two identical fleets; a router flips from blue to green once green is verified. */
public final class BlueGreenStrategy implements DeploymentStrategy {

    @Override
    public String name() {
        return "BLUE_GREEN";
    }

    @Override
    public String summary() {
        return "two identical fleets — router flips to green once verified";
    }

    @Override
    public String deploy(SimulatedEnvironment environment, DeploymentLogger logger) {
        String version = environment.version().toString();
        logger.log("[Strategy] BLUE_GREEN  stand-up green fleet for v" + version);
        logger.log("[Strategy] BLUE_GREEN  smoke-test green fleet (idle traffic)");
        logger.log("[Strategy] BLUE_GREEN  flip router: blue -> green");
        environment.put("deploymentStrategy", name());
        environment.put("deployedVersion", version);
        return "v" + version + " routed 100% to green fleet";
    }
}
