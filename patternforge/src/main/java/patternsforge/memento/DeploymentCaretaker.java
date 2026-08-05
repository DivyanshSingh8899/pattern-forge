package patternsforge.memento;

import patternsforge.model.EnvironmentSnapshot;

/**
 * <b>Caretaker.</b> Stores the most recent {@link DeploymentMemento} before a deployment
 * starts and hands the snapshot back when a rollback needs to restore state.
 */
public final class DeploymentCaretaker {

    private DeploymentMemento memento;

    public void save(EnvironmentSnapshot snapshot) {
        this.memento = new DeploymentMemento(snapshot);
    }

    public EnvironmentSnapshot restore() {
        if (memento == null) {
            throw new IllegalStateException("No snapshot has been saved");
        }
        return memento.snapshot();
    }

    public boolean hasSnapshot() {
        return memento != null;
    }
}
