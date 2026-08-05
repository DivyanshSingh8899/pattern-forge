package patternsforge.command;

/**
 * <b>Command (main pattern).</b> Every deployment stage is represented as a command:
 * {@code execute()} performs the work, {@code undo()} reverts it. The
 * {@link CommandInvoker} keeps history and can undo all executed commands in reverse order.
 */
public interface DeploymentCommand {

    void execute();

    void undo();
}
