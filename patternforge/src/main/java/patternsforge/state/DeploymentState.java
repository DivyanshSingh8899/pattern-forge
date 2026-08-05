package patternsforge.state;

/**
 * <b>State.</b> Represents one deployment lifecycle state. Each concrete state decides
 * what happens when the deployment enters it — no if/else chains anywhere.
 */
public interface DeploymentState {

    String name();

    void handle(DeploymentContext context);
}
