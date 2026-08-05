package patternsforge;

import org.junit.jupiter.api.Test;
import patternsforge.command.BuildCommand;
import patternsforge.command.DeployCommand;
import patternsforge.command.ProvisionCommand;
import patternsforge.command.PromoteCommand;
import patternsforge.command.RollbackCommand;
import patternsforge.command.TestCommand;
import patternsforge.command.VerifyCommand;
import patternsforge.facade.ReleaseManager;
import patternsforge.factory.DeploymentStage;
import patternsforge.factory.StageFactory;

import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;

/** Factory Method: StageFactory creates the correct concrete stage per type. */
class StageFactoryTest {

    private final StageFactory factory = new ReleaseManager().stageFactory();

    @Test
    void createsEveryStageType() {
        assertInstanceOf(BuildCommand.class, factory.create("BUILD"));
        assertInstanceOf(TestCommand.class, factory.create("TEST"));
        assertInstanceOf(ProvisionCommand.class, factory.create("PROVISION"));
        assertInstanceOf(DeployCommand.class, factory.create("DEPLOY"));
        assertInstanceOf(VerifyCommand.class, factory.create("VERIFY"));
        assertInstanceOf(PromoteCommand.class, factory.create("PROMOTE"));
        assertInstanceOf(RollbackCommand.class, factory.create("ROLLBACK"));
    }

    @Test
    void unknownTypeThrows() {
        assertThrows(IllegalArgumentException.class, () -> factory.create("RELEASE"));
    }

    @Test
    void isCaseInsensitive() {
        DeploymentStage stage = factory.create("build");
        assertInstanceOf(BuildCommand.class, stage);
    }
}
