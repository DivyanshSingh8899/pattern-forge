package patternsforge.model;

/** Semantic version (major.minor.patch). */
public record ReleaseVersion(int major, int minor, int patch) {

    /** The version the simulated environment starts on. */
    public static ReleaseVersion initial() {
        return new ReleaseVersion(3, 2, 0);
    }

    /** Next patch release (each deployment attempt bumps the patch). */
    public ReleaseVersion nextPatch() {
        return new ReleaseVersion(major, minor, patch + 1);
    }

    @Override
    public String toString() {
        return major + "." + minor + "." + patch;
    }
}
