package patternsforge.model;

/** Summary returned by {@link patternsforge.facade.ReleaseManager#deploy()}. */
public record DeploymentResult(
        boolean success,
        ReleaseVersion attemptedVersion,
        ReleaseVersion activeVersion,
        DeploymentStatus status,
        String summary) {

    public static DeploymentResult success(ReleaseVersion promoted, String summary) {
        return new DeploymentResult(true, promoted, promoted, DeploymentStatus.HEALTHY, summary);
    }

    public static DeploymentResult failed(ReleaseVersion attempted, ReleaseVersion active,
                                          DeploymentStatus status, String summary) {
        return new DeploymentResult(false, attempted, active, status, summary);
    }
}
