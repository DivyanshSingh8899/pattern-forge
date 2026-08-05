package patternsforge.memento;

import patternsforge.model.EnvironmentSnapshot;

/**
 * <b>Memento.</b> An opaque, immutable token holding a saved {@link EnvironmentSnapshot}
 * (version, configuration, environment variables, timestamp). Only the
 * {@link DeploymentCaretaker} may store and return it.
 */
public final class DeploymentMemento {

    private final EnvironmentSnapshot snapshot;

    DeploymentMemento(EnvironmentSnapshot snapshot) {
        this.snapshot = snapshot;
    }

    EnvironmentSnapshot snapshot() {
        return snapshot;
    }
}
