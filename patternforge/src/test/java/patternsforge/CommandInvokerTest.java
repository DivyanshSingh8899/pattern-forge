package patternsforge;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import patternsforge.command.CommandInvoker;
import patternsforge.command.StageFailureException;
import patternsforge.factory.StageFactory;
import patternsforge.factory.StandardStageFactory;
import patternsforge.memento.DeploymentCaretaker;
import patternsforge.observer.DeploymentEngine;
import patternsforge.service.NotificationService;
import patternsforge.service.RollbackManager;
import patternsforge.state.DeploymentContext;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** Command pattern: invoker keeps history and undoes commands in reverse order. */
class CommandInvokerTest {

    private DeploymentLogger logger;
    private SimulatedEnvironment environment;
    private CommandInvoker invoker;
    private StageFactory factory;

    @BeforeEach
    void setUp() {
        logger = new DeploymentLogger();
        DeploymentLogger.clear();
        environment = new SimulatedEnvironment();
        invoker = new CommandInvoker(logger);
        NotificationService notifications = new NotificationService();
        DeploymentContext context = new DeploymentContext(notifications, logger);
        DeploymentEngine engine =
                new DeploymentEngine(context, invoker, notifications, environment, logger);
        RollbackManager rollbackManager =
                new RollbackManager(invoker, new DeploymentCaretaker(), engine, logger);
        factory = new StandardStageFactory(environment, logger, rollbackManager);
    }

    @Test
    void failingCommandThrowsAndStaysOnHistory() {
        environment.setFailurePoint("DEPLOY");
        invoker.execute(factory.create("BUILD"));
        invoker.execute(factory.create("TEST"));
        assertThrows(StageFailureException.class, () -> invoker.execute(factory.create("DEPLOY")));
        assertEquals(3, invoker.size(), "failed command remains on the history stack");
    }

    @Test
    void undoAllCallsUndoInReverseOrder() {
        environment.setFailurePoint("DEPLOY");
        invoker.execute(factory.create("BUILD"));
        invoker.execute(factory.create("TEST"));
        assertThrows(StageFailureException.class, () -> invoker.execute(factory.create("DEPLOY")));

        invoker.undoAll();

        List<String> lines = DeploymentLogger.buffer();
        int dep = indexOf(lines, "undo DEPLOY");
        int tes = indexOf(lines, "undo TEST");
        int bui = indexOf(lines, "undo BUILD");
        assertTrue(dep >= 0 && tes >= 0 && bui >= 0, "all three undo lines present");
        assertTrue(dep < tes && tes < bui, "reverse order: DEPLOY, then TEST, then BUILD");
        assertTrue(invoker.isEmpty(), "history emptied after undoAll");
    }

    @Test
    void retryLastReexecutesMostRecentCommand() {
        environment.setFailurePoint("NONE");
        invoker.execute(factory.create("BUILD"));
        invoker.retryLast();
        assertEquals(1, invoker.size());
    }

    private int indexOf(List<String> lines, String prefix) {
        for (int i = 0; i < lines.size(); i++) {
            if (lines.get(i).contains(prefix)) {
                return i;
            }
        }
        return -1;
    }
}
