package patternsforge;

import org.junit.jupiter.api.Test;
import patternsforge.builder.Pipeline;
import patternsforge.builder.PipelineBuilder;
import patternsforge.command.BuildCommand;
import patternsforge.command.DeployCommand;
import patternsforge.command.ProvisionCommand;
import patternsforge.command.PromoteCommand;
import patternsforge.command.TestCommand;
import patternsforge.command.VerifyCommand;
import patternsforge.factory.DeploymentStage;
import patternsforge.factory.StageFactory;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** Builder pattern: the fluent PipelineBuilder assembles stages in order. */
class PipelineBuilderTest {

    @Test
    void buildsPipelineInDeclaredOrder() {
        DeploymentLogger logger = new DeploymentLogger();
        SimulatedEnvironment env = new SimulatedEnvironment();
        StageFactory factory = new StageFactory() {
            @Override
            protected DeploymentStage createStage(String type) {
                return switch (type) {
                    case "BUILD" -> new BuildCommand(env, logger);
                    case "TEST" -> new TestCommand(env, logger);
                    case "PROVISION" -> new ProvisionCommand(env, logger);
                    case "DEPLOY" -> new DeployCommand(env, logger, () -> new patternsforge.strategy.BlueGreenStrategy());
                    case "VERIFY" -> new VerifyCommand(env, logger);
                    case "PROMOTE" -> new PromoteCommand(env, logger);
                    default -> throw new IllegalArgumentException(type);
                };
            }
        };

        Pipeline pipeline = new PipelineBuilder(factory)
                .addBuild()
                .addTest()
                .addProvision()
                .addDeploy()
                .addVerify()
                .addPromote()
                .build();

        List<String> names = pipeline.stages().stream().map(DeploymentStage::name).toList();
        assertEquals(List.of("BUILD", "TEST", "PROVISION", "DEPLOY", "VERIFY", "PROMOTE"), names);
        assertEquals(6, pipeline.size());
    }
}
