package patternsforge.utils;

import patternsforge.model.EnvironmentSnapshot;
import patternsforge.model.ReleaseVersion;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Random;

/**
 * Simulated deployment target. Replaces Kubernetes/Docker so the course project can
 * run anywhere. Tracks the current release version, configuration, environment variables
 * and a mutable stage state map, and can inject failures at a chosen pipeline stage.
 */
public final class SimulatedEnvironment {

    private static final String[] FAILURE_POINTS = {
            "NONE", "RANDOM", "BUILD", "TEST", "PROVISION", "DEPLOY", "VERIFY", "PROMOTE", "HEALTH"
    };

    private ReleaseVersion version = ReleaseVersion.initial();
    private String failurePoint = "NONE";
    private boolean randomCoinFlipped = false;
    private boolean randomShouldFail = false;

    private final Map<String, String> config = new LinkedHashMap<>();
    private final Map<String, String> envVars = new LinkedHashMap<>();
    private final Map<String, Object> state = new LinkedHashMap<>();
    private final Random random = new Random(42L);

    public SimulatedEnvironment() {
        config.put("replicas", "3");
        config.put("memory", "512m");
        config.put("cpu", "250m");
        config.put("registry", "registry.patternforge.local");
        envVars.put("DATABASE_URL", "postgres://db.patternforge.local/forge");
        envVars.put("CACHE_URL", "redis://cache.patternforge.local/0");
        envVars.put("LOG_LEVEL", "INFO");
    }

    // ---------------------------------------------------------------- version

    public ReleaseVersion version() {
        return version;
    }

    /** Each deployment attempt targets the next patch version. */
    public ReleaseVersion bumpVersion() {
        version = version.nextPatch();
        return version;
    }

    // ------------------------------------------------------------ failure injection

    public void setFailurePoint(String failurePoint) {
        String point = failurePoint.toUpperCase();
        for (String candidate : FAILURE_POINTS) {
            if (candidate.equals(point)) {
                this.failurePoint = point;
                return;
            }
        }
        throw new IllegalArgumentException("Unknown failure point: " + failurePoint);
    }

    public String failurePoint() {
        return failurePoint;
    }

    /** True if the given stage should fail on this run. */
    public boolean shouldFail(String stage) {
        return switch (failurePoint) {
            case "NONE" -> false;
            case "RANDOM" -> randomFailure();
            default -> failurePoint.equalsIgnoreCase(stage);
        };
    }

    private boolean randomFailure() {
        if (!randomCoinFlipped) {
            randomCoinFlipped = true;
            randomShouldFail = random.nextBoolean();
        }
        return randomShouldFail;
    }

    /** Simulated work duration for a stage. */
    public long stageDurationMs(String stage) {
        return 220 + random.nextInt(320);
    }

    // ------------------------------------------------------------- shared state

    public Map<String, Object> state() {
        return state;
    }

    public void put(String key, Object value) {
        state.put(key, value);
    }

    // --------------------------------------------------------------- snapshot

    /** Memento support: capture an immutable snapshot of the environment. */
    public EnvironmentSnapshot snapshot() {
        return new EnvironmentSnapshot(
                version,
                new LinkedHashMap<>(config),
                new LinkedHashMap<>(envVars),
                Instant.now());
    }

    /** Memento support: restore the environment from a snapshot. */
    public void restore(EnvironmentSnapshot snapshot) {
        version = snapshot.version();
        config.clear();
        config.putAll(snapshot.config());
        envVars.clear();
        envVars.putAll(snapshot.envVars());
    }

    public Map<String, String> config() {
        return config;
    }

    public Map<String, String> envVars() {
        return envVars;
    }
}
