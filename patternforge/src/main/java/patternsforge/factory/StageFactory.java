package patternsforge.factory;

/**
 * <b>Factory Method.</b> Declares the factory method {@link #createStage(String)}.
 * Concrete factories (e.g. {@link StandardStageFactory}) decide which concrete stage
 * class is instantiated for a given stage type.
 */
public abstract class StageFactory {

    /** Public entry point — delegates to the Factory Method. */
    public DeploymentStage create(String type) {
        return createStage(type.toUpperCase());
    }

    /**
     * The Factory Method. Subclasses override this to return a specific
     * {@link DeploymentStage} implementation.
     */
    protected abstract DeploymentStage createStage(String type);
}
