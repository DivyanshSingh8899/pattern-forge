# PatternForge

**A Self-Healing Microservice Deployment & Rollback Orchestrator for CI/CD Pipelines**

A university Design Patterns (Gang of Four) course project. PatternForge **simulates** a CI/CD
deployment pipeline — Build → Run Tests → Provision Resources → Deploy Service → Health
Verification → Promote Release — with automatic reverse-order rollback, snapshot restoration
and real-time notifications when any stage fails. Nothing is deployed to Kubernetes or Docker;
a `SimulatedEnvironment` stands in for the infrastructure.

## Design Patterns Implemented (10)

| # | Pattern | Family | Where it lives |
|---|---------|--------|----------------|
| 1 | Factory Method | Creational | `factory.StageFactory`, `factory.DeploymentStage` |
| 2 | Builder | Creational | `builder.PipelineBuilder`, `builder.Pipeline` |
| 3 | Facade | Structural | `facade.ReleaseManager` |
| 4 | Adapter | Structural | `service.HealthChecker` + `adapter.PrometheusHealthAdapter`, `adapter.CloudWatchHealthAdapter` |
| 5 | Command | Behavioral (main) | `command.*`, `command.CommandInvoker` |
| 6 | Memento | Behavioral | `memento.DeploymentCaretaker`, `memento.DeploymentMemento` |
| 7 | Strategy | Behavioral | `strategy.DeploymentStrategy` + Blue-Green / Rolling / Canary |
| 8 | State | Behavioral | `state.*` (7 lifecycle states) |
| 9 | Chain of Responsibility | Behavioral | `chain.*` (Retry → Rollback → Escalate) |
| 10 | Observer | Behavioral | `observer.*` (Dashboard / Email / Log / Slack) |
| + | Singleton (idiomatic) | Creational | static logger buffer & observer registry |

## Adapter: swappable health monitoring

The deployment core depends **only** on the `service.HealthChecker` interface — never on a
monitoring vendor. Two simulated third-party APIs with intentionally incompatible methods
are bridged by adapters:

```
                 HealthChecker  (PatternForge interface)
                 checkHealth() / provider()
                      ▲                ▲
        PrometheusHealthAdapter    CloudWatchHealthAdapter
                      │                │
           PrometheusClient      CloudWatchClient
           queryCPUUsage()       getMetric("CPUUtilization")
           queryErrorRate()      getServiceStatus()
```

- `PrometheusClient` exposes metric-oriented calls (`queryCPUUsage()`, `queryErrorRate()`);
  `PrometheusHealthAdapter` translates them into a healthy/unhealthy verdict with thresholds.
- `CloudWatchClient` exposes lookup-oriented calls (`getMetric(name)`, `getServiceStatus()`);
  `CloudWatchHealthAdapter` maps `OK`/`ALARM` plus CPU/5xx/p95 metrics onto the same verdict.
- `ReleaseManager.setMonitoringProvider(HealthChecker)` swaps the vendor **at runtime** —
  the engine, the pipeline and the health gate change zero lines (Open/Closed + Dependency Inversion).

## How the pipeline fails safely

1. The user picks a **deployment strategy** (Strategy).
2. `PipelineBuilder` assembles the pipeline; `StageFactory` creates every stage (Factory Method).
3. `ReleaseManager` (Facade) is the single entry point: `releaseManager.deploy()`.
4. Before execution a **Memento snapshot** (version, config, env vars, timestamp) is saved.
5. `CommandInvoker` executes each `DeploymentCommand`; `DeploymentEngine` (Subject) broadcasts
   every state change to the **Observers**.
6. If a stage fails, the **Chain of Responsibility** takes over:
   - `RetryHandler` retries the failed stage once;
   - `RollbackHandler` asks the invoker to `undoAll()` — `undo()` is called on every executed
     command in **reverse order** — then restores the **Memento snapshot**;
   - `EscalationHandler` notifies the on-call engineers.
7. Health verification gates promotion. `HealthMonitor` probes through the active
   **`HealthChecker` adapter** (Prometheus by default, CloudWatch via
   `setMonitoringProvider`). If the release is healthy it is promoted and the
   observers are notified; otherwise the same chain rolls everything back.

## Project layout

```
patternforge/
├── pom.xml
├── README.md
└── docs/
│   ├── class-diagram.puml
│   ├── sequence-diagram.puml
│   └── package-diagram.puml
└── src/
    ├── main/java/patternsforge/
    │   ├── main/        PatternForgeApplication   (entry point)
    │   ├── controller/  DeploymentController     (user interaction)
    │   ├── model/       DeploymentStatus, StageResult, EnvironmentSnapshot, ...
    │   ├── factory/     StageFactory, DeploymentStage
    │   ├── builder/     PipelineBuilder, Pipeline
    │   ├── command/     DeploymentCommand, CommandInvoker, Build/Test/.../RollbackCommand
    │   ├── strategy/    DeploymentStrategy, BlueGreenStrategy, RollingStrategy, CanaryStrategy
    │   ├── adapter/     PrometheusClient/Adapter, CloudWatchClient/Adapter
    │   ├── state/       DeploymentState, DeploymentContext, Idle/.../RollbackState
    │   ├── observer/    DeploymentEngine (Subject), Dashboard/Email/Log/SlackObserver
    │   ├── chain/       FailureHandler, RetryHandler, RollbackHandler, EscalationHandler
    │   ├── memento/     DeploymentMemento, DeploymentCaretaker
    │   ├── facade/      ReleaseManager
    │   ├── service/     HealthChecker, HealthMonitor, RollbackManager, NotificationService
    │   └── utils/       SimulatedEnvironment, DeploymentLogger
    └── test/java/patternsforge/   JUnit 5 test suite
```

## Build & run (Java 17 + Maven)

```bash
mvn clean test          # run the JUnit suite
mvn compile             # compile
mvn exec:java           # interactive console
mvn exec:java -Dexec.args="--demo"   # scripted success + failure demo
```

Or open the folder in IntelliJ IDEA / Eclipse as a Maven project and run
`patternsforge.main.PatternForgeApplication`.

## Sample console output (excerpt)

```
[PatternForge] ==========================================================
[PatternForge]  PatternForge v1.0.0 — Self-Healing Deployment Orchestrator
...
1) Blue-Green   2) Rolling   3) Canary        -> 1
Failure point [NONE/RANDOM/BUILD/TEST/PROVISION/DEPLOY/VERIFY/PROMOTE/HEALTH] -> TEST
>>> [Strategy] Strategy switched to BLUE_GREEN
=== DEPLOYMENT v3.2.1 STARTED (strategy: BLUE_GREEN) ===
>>> [Memento] snapshot saved: v3.2.0 | 4 config keys | 3 env vars @ 09:41:02
>>> [State] Entering BUILDING state
[BUILD]    start  compile sources & produce artifact
[BUILD]    ok     artifact patternforge-3.2.1.jar built in 312ms
>>> [State] Entering TESTING state
[TEST]     start  execute unit & integration suite
[TEST]     ERROR  injected failure at failure point TEST
[TEST]     FAILED: injected failure at failure point TEST
[RetryHandler] retrying TEST (attempt 2)
[TEST]     ERROR  injected failure at failure point TEST
[RetryHandler] retry failed — passing to next handler
[RollbackHandler] taking over — rolling back deployment
>>> [State] Entering ROLLING_BACK state
Rolling back 2 executed command(s) in reverse order
undo BUILD ...
undo TEST ...
SNAPSHOT RESTORED — environment reverted to v3.2.0
[EscalationHandler] escalation required — notifying on-call engineer
[OBS:email] DEPLOYMENT FAILED on stage TEST — v3.2.1 rolled back to v3.2.0
=== DEPLOYMENT FAILED — restored to v3.2.0 ===
```

## SOLID & clean architecture notes

- **S**ingle responsibility: every class has one job (invoker executes, caretaker stores…).
- **O**pen/closed: new stages (Factory), strategies, observers **and monitoring adapters** extend without modifying core.
- **L**iskov: concrete stages/strategies/states are interchangeable via interfaces.
- **I**nterface segregation: `DeploymentCommand`, `DeploymentStrategy`, `DeploymentObserver`,
  `DeploymentState`, `FailureHandler` are minimal.
- **D**ependency inversion: `ReleaseManager` (facade) depends on abstractions, not concretions; the health gate depends only on `HealthChecker`, never on a vendor client.

## Viva checklist

- Point at `ReleaseManager.deploy()` for the Facade; `CommandInvoker.undoAll()` for the Command
  auto-rollback; `DeploymentCaretaker.save/restore` for Memento; `FailurePipeline` for the chain;
  `DeploymentContext.transition` for State; `NotificationService.broadcast` for Observer;
  `ReleaseManager.setStrategy` for runtime Strategy switching; `ReleaseManager.setMonitoringProvider`
  for runtime Adapter swapping (`PrometheusHealthAdapter` / `CloudWatchHealthAdapter`).
