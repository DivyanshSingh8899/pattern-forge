package patternsforge.builder;

import patternsforge.factory.DeploymentStage;
import patternsforge.factory.StageFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * <b>Builder.</b> Constructs a {@link Pipeline} step by step with a fluent API:
 * <pre>
 *   Pipeline pipeline = new PipelineBuilder(factory)
 *       .addBuild().addTest().addProvision().addDeploy().addVerify().build();
 * </pre>
 * Stage objects themselves are created by the {@link StageFactory} (Factory Method).
 */
public final class PipelineBuilder {

    private final List<DeploymentStage> stages = new ArrayList<>();
    private final StageFactory factory;

    public PipelineBuilder(StageFactory factory) {
        this.factory = factory;
    }

    public PipelineBuilder addBuild() {
        stages.add(factory.create("BUILD"));
        return this;
    }

    public PipelineBuilder addTest() {
        stages.add(factory.create("TEST"));
        return this;
    }

    public PipelineBuilder addProvision() {
        stages.add(factory.create("PROVISION"));
        return this;
    }

    public PipelineBuilder addDeploy() {
        stages.add(factory.create("DEPLOY"));
        return this;
    }

    public PipelineBuilder addVerify() {
        stages.add(factory.create("VERIFY"));
        return this;
    }

    public PipelineBuilder addPromote() {
        stages.add(factory.create("PROMOTE"));
        return this;
    }

    /** Append an already-created stage. */
    public PipelineBuilder add(DeploymentStage stage) {
        stages.add(stage);
        return this;
    }

    public Pipeline build() {
        return new Pipeline(stages);
    }
}
