package patternsforge.command;

import patternsforge.utils.DeploymentLogger;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * <b>Command Invoker.</b> Maintains a {@link Deque} history of executed commands.
 * When a command fails, {@link #undoAll()} automatically calls {@code undo()} on every
 * executed command <b>in reverse order</b> — the last executed stage is undone first.
 *
 * <p>The reverse-order undo is triggered by the rollback subsystem (Chain of
 * Responsibility) so that a single retry (RetryHandler) can still be attempted before
 * a full rollback is performed.
 */
public final class CommandInvoker {

    private final Deque<DeploymentCommand> history = new ArrayDeque<>();
    private final DeploymentLogger logger;

    public CommandInvoker(DeploymentLogger logger) {
        this.logger = logger;
    }

    /** Executes a command and pushes it onto the history stack. */
    public void execute(DeploymentCommand command) {
        history.push(command);
        logger.log("executing " + displayName(command));
        command.execute();
    }

    /** Re-executes the most recent command (used by RetryHandler). */
    public void retryLast() {
        if (history.isEmpty()) {
            throw new IllegalStateException("No command to retry");
        }
        logger.warn("retrying " + displayName(history.peek()));
        history.peek().execute();
    }

    /**
     * <b>Automatic reverse-order undo.</b> Pops every executed command off the stack
     * and calls {@code undo()} — last executed, first undone.
     */
    public void undoAll() {
        logger.warn("Rolling back " + history.size() + " executed command(s) in reverse order");
        while (!history.isEmpty()) {
            history.pop().undo();
        }
    }

    public int size() {
        return history.size();
    }

    public boolean isEmpty() {
        return history.isEmpty();
    }

    private String displayName(DeploymentCommand command) {
        return command.getClass().getSimpleName();
    }
}
