package patternsforge;

import org.junit.jupiter.api.Test;
import patternsforge.memento.DeploymentCaretaker;
import patternsforge.model.EnvironmentSnapshot;
import patternsforge.utils.SimulatedEnvironment;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** Memento pattern: the caretaker restores the exact pre-deployment snapshot. */
class DeploymentCaretakerTest {

    @Test
    void restoreReturnsTheSavedState() {
        SimulatedEnvironment environment = new SimulatedEnvironment();
        DeploymentCaretaker caretaker = new DeploymentCaretaker();

        EnvironmentSnapshot saved = environment.snapshot();
        caretaker.save(saved);

        environment.bumpVersion();
        environment.put("artifactBuilt", Boolean.TRUE);
        environment.config().put("replicas", "9");

        environment.restore(caretaker.restore());

        assertEquals("3.2.0", environment.version().toString(), "version reverted");
        assertEquals("3", environment.config().get("replicas"), "config reverted");
        assertEquals("postgres://db.patternforge.local/forge",
                environment.envVars().get("DATABASE_URL"), "env vars reverted");
    }
}
