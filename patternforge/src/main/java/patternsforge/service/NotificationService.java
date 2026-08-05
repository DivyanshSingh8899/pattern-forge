package patternsforge.service;

import patternsforge.model.DeploymentEvent;
import patternsforge.observer.DeploymentObserver;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Registry for {@link DeploymentObserver}s (the Observer pattern's subject side).
 * Observers attach/detach here and every {@link #broadcast} fans out to all of them.
 */
public final class NotificationService {

    private final List<DeploymentObserver> observers = new CopyOnWriteArrayList<>();

    public void attach(DeploymentObserver observer) {
        observers.add(observer);
    }

    public void detach(DeploymentObserver observer) {
        observers.remove(observer);
    }

    public int observerCount() {
        return observers.size();
    }

    public void broadcast(DeploymentEvent event) {
        for (DeploymentObserver observer : observers) {
            observer.update(event);
        }
    }
}
