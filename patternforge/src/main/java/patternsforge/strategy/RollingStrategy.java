package patternsforge.strategy;

/** Rolling: instances are updated in batches; capacity never drops below minimum. */
public final class RollingStrategy implements DeploymentStrategy {

    @Override
    public String name() {
        return "ROLLING";
    }

    @Override
    public String summary() {
        return "batch-by-batch instance update — capacity never drops";
    }
}
