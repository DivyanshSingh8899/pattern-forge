package patternsforge.strategy;

/** Canary: a small traffic slice is routed to the new version and gradually widened. */
public final class CanaryStrategy implements DeploymentStrategy {

    @Override
    public String name() {
        return "CANARY";
    }

    @Override
    public String summary() {
        return "5% traffic slice first, then widen to 100%";
    }
}
