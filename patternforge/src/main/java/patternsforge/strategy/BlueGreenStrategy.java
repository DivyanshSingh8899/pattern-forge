package patternsforge.strategy;

/** Blue-green: two identical fleets; a router flips from blue to green once green is verified. */
public final class BlueGreenStrategy implements DeploymentStrategy {

    @Override
    public String name() {
        return "BLUE_GREEN";
    }

    @Override
    public String summary() {
        return "two identical fleets — router flips to green once verified";
    }
}
