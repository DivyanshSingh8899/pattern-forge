package patternsforge.model;

/** Outcome of a single pipeline stage. */
public record StageResult(String stage, boolean success, long durationMs, String message) {

    public static StageResult ok(String stage, long durationMs, String message) {
        return new StageResult(stage, true, durationMs, message);
    }

    public static StageResult fail(String stage, String message) {
        return new StageResult(stage, false, 0L, message);
    }
}
