package patternsforge.service;

import patternsforge.command.CommandInvoker;
import patternsforge.memento.DeploymentCaretaker;
import patternsforge.observer.DeploymentEngine;
import patternsforge.state.RollbackState;
import patternsforge.utils.DeploymentLogger;

/**
 * Coordinates a rollback: enters the ROLLBACK state, asks the {@link CommandInvoker} to
 * undo every executed command in reverse order (Command pattern) and restores the last
 * memento snapshot (Memento pattern).
 */
public final class RollbackManager {

    private final CommandInvoker invoker;
    private final DeploymentCaretaker caretaker;
    private final DeploymentEngine engine;
    private final DeploymentLogger logger;

    public RollbackManager(CommandInvoker invoker,
                           DeploymentCaretaker caretaker,
                           DeploymentEngine engine,
                           DeploymentLogger logger) {
        this.invoker = invoker;
        this.caretaker = caretaker;
        this.engine = engine;
        this.logger = logger;
    }

    public void rollback(String failedStage) {
        logger.error("=== ROLLBACK initiated (failure at " + failedStage + ") ===");
        engine.context().transition(new RollbackState());
        invoker.undoAll();
        engine.restoreFromMemento(caretaker.restore());
        logger.error("=== ROLLBACK COMPLETE — deployment restored ===");
    }
}
