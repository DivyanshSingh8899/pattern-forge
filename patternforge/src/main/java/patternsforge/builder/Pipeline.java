package patternsforge.builder;

import patternsforge.factory.DeploymentStage;

import java.util.List;

/** An ordered, immutable pipeline of {@link DeploymentStage}s. */
public final class Pipeline {

    private final List<DeploymentStage> stages;

    public Pipeline(List<DeploymentStage> stages) {
        this.stages = List.copyOf(stages);
    }

    public List<DeploymentStage> stages() {
        return stages;
    }

    public int size() {
        return stages.size();
    }

    @Override
    public String toString() {
        return stages.stream().map(s -> s.name().toLowerCase()).reduce((a, b) -> a + " -> " + b).orElse("(empty)");
    }
}
