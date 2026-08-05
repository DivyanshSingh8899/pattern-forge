package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Provision stage: allocates simulated compute, storage and network resources. */
public final class ProvisionCommand extends DeploymentStage {

    public ProvisionCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("PROVISION", environment, logger);
    }

    @Override
    public String description() {
        return "allocate compute, storage & network";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("PROVISION"));
        environment.put("resourcesProvisioned", Boolean.TRUE);
        environment.put("cluster", "forge-cluster-a");
        return "3 nodes / 6 vCPU / 12GiB provisioned";
    }

    @Override
    protected void revert() {
        environment.put("resourcesProvisioned", Boolean.FALSE);
        logger.log("PROVISION undo: resources released");
    }
}
