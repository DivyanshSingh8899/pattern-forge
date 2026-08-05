package patternsforge.model;

import java.time.Instant;
import java.util.Map;

/**
 * Immutable copy of the environment at a point in time.
 * Used by the {@link patternsforge.memento.DeploymentMemento} to restore state.
 */
public record EnvironmentSnapshot(
        ReleaseVersion version,
        Map<String, String> config,
        Map<String, String> envVars,
        Instant timestamp) {
}
