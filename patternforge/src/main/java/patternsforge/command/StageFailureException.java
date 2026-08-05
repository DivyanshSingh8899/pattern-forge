package patternsforge.command;

/** Thrown when a stage fails. Carries the stage name so the failure chain can react. */
public final class StageFailureException extends RuntimeException {

    private final String stage;

    public StageFailureException(String stage, String reason) {
        super(reason);
        this.stage = stage;
    }

    public String stage() {
        return stage;
    }
}
