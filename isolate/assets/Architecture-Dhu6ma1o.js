import{j as e}from"./framer-motion-CRk4231t.js";import{r as d,L as b}from"./react-vendor-twUPT20K.js";import{C as D,a as k,B as j}from"./badge-DeQsBVhY.js";import{m as O,L,T as N,C as M}from"./radix-ui-BjBb3b4l.js";import{c as r}from"./utils-Bg5jHSpt.js";import{P as S,E as w,C as P,b as F}from"./patternforge-data-DntO6Vt4.js";import{c as I}from"./index-DXF9zo42.js";import"./charts-CJlyb3mD.js";const T=[["path",{d:"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35",key:"1wthlu"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"m5 16-3 3 3 3",key:"331omg"}],["path",{d:"m9 22 3-3-3-3",key:"lsp7cz"}]],B=I("file-code-corner",T);function A({className:n,...a}){return e.jsx(O,{"data-slot":"tabs",className:r("flex flex-col gap-2",n),...a})}function H({className:n,...a}){return e.jsx(L,{"data-slot":"tabs-list",className:r("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",n),...a})}function V({className:n,...a}){return e.jsx(N,{"data-slot":"tabs-trigger",className:r("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",n),...a})}function m({className:n,...a}){return e.jsx(M,{"data-slot":"tabs-content",className:r("flex-1 outline-none",n),...a})}function U({className:n,...a}){return e.jsx("div",{"data-slot":"table-container",className:"relative w-full overflow-x-auto",children:e.jsx("table",{"data-slot":"table",className:r("w-full caption-bottom text-sm",n),...a})})}function G({className:n,...a}){return e.jsx("thead",{"data-slot":"table-header",className:r("[&_tr]:border-b",n),...a})}function Y({className:n,...a}){return e.jsx("tbody",{"data-slot":"table-body",className:r("[&_tr:last-child]:border-0",n),...a})}function x({className:n,...a}){return e.jsx("tr",{"data-slot":"table-row",className:r("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",n),...a})}function u({className:n,...a}){return e.jsx("th",{"data-slot":"table-head",className:r("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",n),...a})}function v({className:n,...a}){return e.jsx("td",{"data-slot":"table-cell",className:r("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",n),...a})}const q=`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>edu.university.patternforge</groupId>
  <artifactId>patternforge</artifactId>
  <version>1.0.0</version>
  <packaging>jar</packaging>

  <name>PatternForge</name>
  <description>
    Self-Healing Microservice Deployment &amp; Rollback Orchestrator for CI/CD Pipelines.
    A university Design Patterns course project demonstrating 10 Gang of Four patterns
    in a single real-world architecture.
  </description>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.release>17</maven.compiler.release>
    <junit.version>5.10.2</junit.version>
  </properties>

  <dependencies>
    <!-- Testing -->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>\${junit.version}</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.2.5</version>
      </plugin>
      <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>exec-maven-plugin</artifactId>
        <version>3.2.0</version>
        <configuration>
          <mainClass>patternsforge.main.PatternForgeApplication</mainClass>
        </configuration>
      </plugin>
    </plugins>
  </build>
</project>
`,_=`# PatternForge

**A Self-Healing Microservice Deployment & Rollback Orchestrator for CI/CD Pipelines**

A university Design Patterns (Gang of Four) course project. PatternForge **simulates** a CI/CD
deployment pipeline — Build → Run Tests → Provision Resources → Deploy Service → Health
Verification → Promote Release — with automatic reverse-order rollback, snapshot restoration
and real-time notifications when any stage fails. Nothing is deployed to Kubernetes or Docker;
a \`SimulatedEnvironment\` stands in for the infrastructure.

## Design Patterns Implemented (10)

| # | Pattern | Family | Where it lives |
|---|---------|--------|----------------|
| 1 | Factory Method | Creational | \`factory.StageFactory\`, \`factory.DeploymentStage\` |
| 2 | Builder | Creational | \`builder.PipelineBuilder\`, \`builder.Pipeline\` |
| 3 | Facade | Structural | \`facade.ReleaseManager\` |
| 4 | Command | Behavioral (main) | \`command.*\`, \`command.CommandInvoker\` |
| 5 | Memento | Behavioral | \`memento.DeploymentCaretaker\`, \`memento.DeploymentMemento\` |
| 6 | Strategy | Behavioral | \`strategy.DeploymentStrategy\` + Blue-Green / Rolling / Canary |
| 7 | State | Behavioral | \`state.*\` (7 lifecycle states) |
| 8 | Chain of Responsibility | Behavioral | \`chain.*\` (Retry → Rollback → Escalate) |
| 9 | Observer | Behavioral | \`observer.*\` (Dashboard / Email / Log / Slack) |
| 10 | Singleton (idiomatic) | Creational | static logger buffer & observer registry |

## How the pipeline fails safely

1. The user picks a **deployment strategy** (Strategy).
2. \`PipelineBuilder\` assembles the pipeline; \`StageFactory\` creates every stage (Factory Method).
3. \`ReleaseManager\` (Facade) is the single entry point: \`releaseManager.deploy()\`.
4. Before execution a **Memento snapshot** (version, config, env vars, timestamp) is saved.
5. \`CommandInvoker\` executes each \`DeploymentCommand\`; \`DeploymentEngine\` (Subject) broadcasts
   every state change to the **Observers**.
6. If a stage fails, the **Chain of Responsibility** takes over:
   - \`RetryHandler\` retries the failed stage once;
   - \`RollbackHandler\` asks the invoker to \`undoAll()\` — \`undo()\` is called on every executed
     command in **reverse order** — then restores the **Memento snapshot**;
   - \`EscalationHandler\` notifies the on-call engineers.
7. Health verification gates promotion. If the release is healthy it is promoted and the
   observers are notified; otherwise the same chain rolls everything back.

## Project layout

\`\`\`
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
    │   ├── state/       DeploymentState, DeploymentContext, Idle/.../RollbackState
    │   ├── observer/    DeploymentEngine (Subject), Dashboard/Email/Log/SlackObserver
    │   ├── chain/       FailureHandler, RetryHandler, RollbackHandler, EscalationHandler
    │   ├── memento/     DeploymentMemento, DeploymentCaretaker
    │   ├── facade/      ReleaseManager
    │   ├── service/     HealthMonitor, RollbackManager, NotificationService
    │   └── utils/       SimulatedEnvironment, DeploymentLogger
    └── test/java/patternsforge/   JUnit 5 test suite
\`\`\`

## Build & run (Java 17 + Maven)

\`\`\`bash
mvn clean test          # run the JUnit suite
mvn compile             # compile
mvn exec:java           # interactive console
mvn exec:java -Dexec.args="--demo"   # scripted success + failure demo
\`\`\`

Or open the folder in IntelliJ IDEA / Eclipse as a Maven project and run
\`patternsforge.main.PatternForgeApplication\`.

## Sample console output (excerpt)

\`\`\`
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
\`\`\`

## SOLID & clean architecture notes

- **S**ingle responsibility: every class has one job (invoker executes, caretaker stores…).
- **O**pen/closed: new stages (Factory), strategies and observers extend without modifying core.
- **L**iskov: concrete stages/strategies/states are interchangeable via interfaces.
- **I**nterface segregation: \`DeploymentCommand\`, \`DeploymentStrategy\`, \`DeploymentObserver\`,
  \`DeploymentState\`, \`FailureHandler\` are minimal.
- **D**ependency inversion: \`ReleaseManager\` (facade) depends on abstractions, not concretions.

## Viva checklist

- Point at \`ReleaseManager.deploy()\` for the Facade; \`CommandInvoker.undoAll()\` for the Command
  auto-rollback; \`DeploymentCaretaker.save/restore\` for Memento; \`FailurePipeline\` for the chain;
  \`DeploymentContext.transition\` for State; \`NotificationService.broadcast\` for Observer;
  \`ReleaseManager.setStrategy\` for runtime Strategy switching.
`,E=`@startuml class-diagram
title PatternForge — UML Class Diagram
skinparam shadowing false
skinparam monochrome true
skinparam classAttributeIconSize 0
skinparam defaultFontName "Helvetica"

package "patternsforge.facade" {
  class ReleaseManager {
    + deploy() : DeploymentResult
    + setStrategy(s : DeploymentStrategy) : void
    + setFailurePoint(p : String) : void
    + attachObserver(o : DeploymentObserver) : void
  }
}

package "patternsforge.builder" {
  class PipelineBuilder {
    + addBuild() : PipelineBuilder
    + addTest() : PipelineBuilder
    + addProvision() : PipelineBuilder
    + addDeploy() : PipelineBuilder
    + addVerify() : PipelineBuilder
    + addPromote() : PipelineBuilder
    + build() : Pipeline
  }
  class Pipeline {
    + stages() : List<DeploymentStage>
  }
}

package "patternsforge.command" {
  interface DeploymentCommand {
    + execute() : void
    + undo() : void
  }
  abstract class DeploymentStage {
    + name() : String
    + description() : String
  }
  class CommandInvoker {
    - history : Deque<DeploymentCommand>
    + execute(c : DeploymentCommand) : void
    + retryLast() : void
    + undoAll() : void
  }
  class BuildCommand
  class TestCommand
  class ProvisionCommand
  class DeployCommand
  class VerifyCommand
  class PromoteCommand
  class RollbackCommand
}

package "patternsforge.strategy" {
  interface DeploymentStrategy {
    + name() : String
    + summary() : String
  }
  class BlueGreenStrategy
  class RollingStrategy
  class CanaryStrategy
}

package "patternsforge.state" {
  interface DeploymentState {
    + name() : String
    + handle(ctx : DeploymentContext) : void
  }
  class DeploymentContext
  class IdleState
  class BuildingState
  class TestingState
  class DeployingState
  class HealthyState
  class FailedState
  class RollbackState
}

package "patternsforge.observer" {
  class DeploymentEngine {
    + run(p : Pipeline) : DeploymentStatus
    + broadcast(s : DeploymentStatus, m : String) : void
  }
  interface DeploymentObserver {
    + update(e : DeploymentEvent) : void
  }
  class DashboardObserver
  class EmailObserver
  class LogObserver
  class SlackObserver
}

package "patternsforge.chain" {
  abstract class FailureHandler {
    + setNext(h : FailureHandler) : FailureHandler
    + handle(ctx : FailureContext) : void
  }
  class RetryHandler
  class RollbackHandler
  class EscalationHandler
}

package "patternsforge.memento" {
  class DeploymentCaretaker {
    + save(s : EnvironmentSnapshot) : void
    + restore() : EnvironmentSnapshot
  }
  class DeploymentMemento
}

ReleaseManager --> Pipeline
ReleaseManager --> CommandInvoker
ReleaseManager --> DeploymentEngine
ReleaseManager --> HealthMonitor
ReleaseManager --> RollbackManager
ReleaseManager --> NotificationService
ReleaseManager --> DeploymentCaretaker
ReleaseManager --> DeploymentStrategy
ReleaseManager ..> StageFactory : creates

PipelineBuilder ..> Pipeline : <<build>>
Pipeline o-- DeploymentStage
DeploymentStage ..|> DeploymentCommand
BuildCommand --|> DeploymentStage
TestCommand --|> DeploymentStage
ProvisionCommand --|> DeploymentStage
DeployCommand --|> DeploymentStage
VerifyCommand --|> DeploymentStage
PromoteCommand --|> DeploymentStage
RollbackCommand --|> DeploymentStage
CommandInvoker o-- DeploymentCommand

DeploymentStrategy <|.. BlueGreenStrategy
DeploymentStrategy <|.. RollingStrategy
DeploymentStrategy <|.. CanaryStrategy

DeploymentContext o-- DeploymentState
DeploymentState <|.. IdleState
DeploymentState <|.. BuildingState
DeploymentState <|.. TestingState
DeploymentState <|.. DeployingState
DeploymentState <|.. HealthyState
DeploymentState <|.. FailedState
DeploymentState <|.. RollbackState

DeploymentEngine *-- DeploymentObserver
DeploymentObserver <|.. DashboardObserver
DeploymentObserver <|.. EmailObserver
DeploymentObserver <|.. LogObserver
DeploymentObserver <|.. SlackObserver

FailureHandler <|-- RetryHandler
FailureHandler <|-- RollbackHandler
FailureHandler <|-- EscalationHandler
FailureHandler o-- FailureHandler : next

DeploymentCaretaker ..> DeploymentMemento
DeploymentMemento ..> EnvironmentSnapshot
NotificationService o-- DeploymentObserver

@enduml
`,C=`@startuml sequence-diagram
title PatternForge — Deployment & Automatic Rollback Sequence
skinparam shadowing false
skinparam monochrome true
skinparam defaultFontName "Helvetica"

actor "User" as U
participant "DeploymentController" as C
participant "ReleaseManager" as RM
participant "DeploymentCaretaker" as CT
participant "CommandInvoker" as INV
participant "DeploymentEngine" as ENG
participant "HealthMonitor" as HM
participant "FailurePipeline" as CHAIN
participant "NotificationService" as NS
participant "Observers" as OBS

U -> C : select(strategy, failurePoint)
C -> RM : deploy()
RM -> RM : setStrategy(strategy)
RM -> ENG : broadcast(DEPLOYING)
RM -> CT : save(environment.snapshot())
activate CT
CT --> RM : DeploymentMemento
deactivate CT

RM -> ENG : run(pipeline)
activate ENG

loop each stage in pipeline
  ENG -> ENG : context.transition(state)
  ENG -> INV : execute(stage)
  activate INV
  INV -> stage : execute()
  alt healthy stage
    stage --> INV : StageResult(ok)
  else failing stage
    stage --> INV : throws StageFailureException
    INV --> ENG : failure
    ENG -> CHAIN : handle(failure)
    activate CHAIN
    CHAIN -> CHAIN : RetryHandler (retries once)
    alt retry succeeds
      CHAIN --> ENG : recovered — continue
    else retry fails
      CHAIN -> CHAIN : RollbackHandler
      CHAIN -> INV : undoAll()  // undo() in reverse order
      deactivate INV
      CHAIN -> CT : restore()
      CT --> CHAIN : EnvironmentSnapshot
      CHAIN -> ENG : restoreFromMemento(snapshot)
      CHAIN -> CHAIN : EscalationHandler
      CHAIN --> ENG : rolled back
    end
    deactivate CHAIN
  end
  INV -> NS : broadcast(status)
  NS -> OBS : update(event)
end

ENG -> HM : checkHealth(env, strategy)
HM --> ENG : healthy / unhealthy

alt healthy
  ENG -> INV : execute(PromoteCommand)
  NS -> OBS : HEALTHY — release promoted
else unhealthy
  ENG -> CHAIN : handle(health failure)
  CHAIN -> CHAIN : RollbackHandler → undoAll() → restore()
  NS -> OBS : ROLLED_BACK + escalation alert
end

ENG --> RM : DeploymentStatus
RM --> C : DeploymentResult
C --> U : summary
@enduml
`,R=`@startuml package-diagram
title PatternForge — Package Diagram
skinparam shadowing false
skinparam monochrome true
skinparam defaultFontName "Helvetica"

package "patternsforge" {
  package "main" {
    [PatternForgeApplication]
  }
  package "controller" {
    [DeploymentController]
  }
  package "facade" {
    [ReleaseManager]
  }

  package "model" {
    [DeploymentStatus] <<enum>>
    [StageResult] <<record>>
    [EnvironmentSnapshot] <<record>>
    [ReleaseVersion] <<record>>
    [DeploymentEvent] <<record>>
    [DeploymentResult] <<record>>
  }

  package "factory" {
    [DeploymentStage] <<abstract>>
    [StageFactory] <<abstract>>
    [StandardStageFactory]
  }

  package "builder" {
    [PipelineBuilder]
    [Pipeline]
  }

  package "command" {
    [DeploymentCommand] <<interface>>
    [CommandInvoker]
    [BuildCommand]
    [TestCommand]
    [ProvisionCommand]
    [DeployCommand]
    [VerifyCommand]
    [PromoteCommand]
    [RollbackCommand]
    [StageFailureException]
  }

  package "strategy" {
    [DeploymentStrategy] <<interface>>
    [BlueGreenStrategy]
    [RollingStrategy]
    [CanaryStrategy]
  }

  package "state" {
    [DeploymentState] <<interface>>
    [DeploymentContext]
    [IdleState]
    [BuildingState]
    [TestingState]
    [DeployingState]
    [HealthyState]
    [FailedState]
    [RollbackState]
  }

  package "observer" {
    [DeploymentEngine]
    [DeploymentObserver] <<interface>>
    [DashboardObserver]
    [EmailObserver]
    [LogObserver]
    [SlackObserver]
  }

  package "chain" {
    [FailureHandler] <<abstract>>
    [RetryHandler]
    [RollbackHandler]
    [EscalationHandler]
    [FailureContext] <<record>>
  }

  package "memento" {
    [DeploymentCaretaker]
    [DeploymentMemento]
  }

  package "service" {
    [HealthMonitor]
    [RollbackManager]
    [NotificationService]
  }

  package "utils" {
    [SimulatedEnvironment]
    [DeploymentLogger]
  }
}

main ..> controller : uses
controller ..> facade : uses
facade ..> builder : builds
facade ..> factory : creates stages
facade ..> command : executes
facade ..> strategy : picks algorithm
facade ..> state : tracks lifecycle
facade ..> observer : notifies
facade ..> chain : handles failures
facade ..> memento : saves/restores
facade ..> service : health, rollback, notifications
facade ..> utils : simulates infra
@enduml
`,K=`package patternsforge.main;

import patternsforge.controller.DeploymentController;
import patternsforge.facade.ReleaseManager;
import patternsforge.utils.DeploymentLogger;

/**
 * PatternForge — Self-Healing Microservice Deployment &amp; Rollback Orchestrator.
 *
 * <p>Entry point. Run with {@code --demo} for a scripted success + failure run, or
 * without arguments for the interactive console.
 *
 * <pre>
 *   mvn exec:java                       (interactive)
 *   mvn exec:java -Dexec.args="--demo"  (scripted demo)
 * </pre>
 */
public final class PatternForgeApplication {

    private PatternForgeApplication() {
    }

    public static void main(String[] args) {
        DeploymentLogger logger = new DeploymentLogger();
        logger.banner("================================================================");
        logger.banner("  PatternForge v1.0.0");
        logger.banner("  Self-Healing Microservice Deployment & Rollback Orchestrator");
        logger.banner("  GoF Design Patterns course project — 10 patterns, 1 pipeline");
        logger.banner("================================================================");
        logger.log("observers attached: dashboard, log, email, slack");

        ReleaseManager releaseManager = new ReleaseManager();
        DeploymentController controller = new DeploymentController(releaseManager, logger);

        if (args.length > 0 && args[0].equals("--demo")) {
            controller.runScenario("BLUE_GREEN", "NONE");
            System.out.println();
            controller.runScenario("CANARY", "TEST");
            return;
        }
        controller.interactiveSession();
    }
}
`,z=`package patternsforge.controller;

import patternsforge.facade.ReleaseManager;
import patternsforge.model.DeploymentResult;
import patternsforge.strategy.BlueGreenStrategy;
import patternsforge.strategy.CanaryStrategy;
import patternsforge.strategy.RollingStrategy;
import patternsforge.utils.DeploymentLogger;

import java.util.Scanner;

/**
 * Accepts user choices (strategy, failure point) and delegates the work to the
 * {@link ReleaseManager} facade. Also exposes {@link #runScenario} for demos and tests.
 */
public final class DeploymentController {

    private static final String[] FAILURE_POINTS =
            {"NONE", "RANDOM", "BUILD", "TEST", "PROVISION", "DEPLOY", "VERIFY", "PROMOTE", "HEALTH"};

    private final ReleaseManager releaseManager;
    private final DeploymentLogger logger;
    private final Scanner scanner = new Scanner(System.in);

    public DeploymentController(ReleaseManager releaseManager, DeploymentLogger logger) {
        this.releaseManager = releaseManager;
        this.logger = logger;
    }

    public DeploymentController(ReleaseManager releaseManager) {
        this(releaseManager, new DeploymentLogger());
    }

    /** Interactive console session. */
    public void interactiveSession() {
        logger.banner("=== PatternForge — Deployment Console ===");
        while (true) {
            System.out.println();
            System.out.println("1) Blue-Green   2) Rolling   3) Canary");
            System.out.print("Choose deployment strategy [1-3, q=quit] -> ");
            String choice = scanner.nextLine().trim();
            if (choice.equalsIgnoreCase("q")) {
                break;
            }
            switch (choice) {
                case "1" -> releaseManager.setStrategy(new BlueGreenStrategy());
                case "2" -> releaseManager.setStrategy(new RollingStrategy());
                case "3" -> releaseManager.setStrategy(new CanaryStrategy());
                default -> {
                    logger.warn("invalid choice, keeping " + releaseManager.strategy().name());
                }
            }

            System.out.print("Failure point " + String.join("/", FAILURE_POINTS) + " -> ");
            String point = scanner.nextLine().trim().toUpperCase();
            releaseManager.setFailurePoint(point.isEmpty() ? "NONE" : point);

            DeploymentResult result = releaseManager.deploy();
            printResult(result);
        }
    }

    /** Scripted scenario for {@code --demo} and tests. */
    public DeploymentResult runScenario(String strategyName, String failurePoint) {
        releaseManager.setFailurePoint(failurePoint);
        switch (strategyName.toUpperCase()) {
            case "ROLLING" -> releaseManager.setStrategy(new RollingStrategy());
            case "CANARY" -> releaseManager.setStrategy(new CanaryStrategy());
            default -> releaseManager.setStrategy(new BlueGreenStrategy());
        }
        DeploymentResult result = releaseManager.deploy();
        printResult(result);
        return result;
    }

    private void printResult(DeploymentResult result) {
        if (result.success()) {
            logger.ok("=== DEPLOYMENT SUCCESSFUL — " + result.summary() + " ===");
        } else {
            logger.error("=== DEPLOYMENT FAILED — " + result.summary() + " ===");
        }
    }
}
`,J=`package patternsforge.model;

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
`,W=`package patternsforge.model;

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
`,X=`package patternsforge.model;

/** Outcome of a single pipeline stage. */
public record StageResult(String stage, boolean success, long durationMs, String message) {

    public static StageResult ok(String stage, long durationMs, String message) {
        return new StageResult(stage, true, durationMs, message);
    }

    public static StageResult fail(String stage, String message) {
        return new StageResult(stage, false, 0L, message);
    }
}
`,$=`package patternsforge.model;

/**
 * Lifecycle statuses of a deployment.
 * The {@link patternsforge.state.DeploymentState} implementations map onto these.
 */
public enum DeploymentStatus {
    IDLE,
    BUILDING,
    TESTING,
    PROVISIONING,
    DEPLOYING,
    VERIFYING,
    PROMOTING,
    HEALTHY,
    FAILED,
    ROLLING_BACK,
    ROLLED_BACK
}
`,Z=`package patternsforge.model;

import java.time.Instant;

/**
 * Notification payload pushed to every {@link patternsforge.observer.DeploymentObserver}.
 */
public record DeploymentEvent(DeploymentStatus status, String message, Instant at) {

    @Override
    public String toString() {
        return "[" + status + "] " + message;
    }
}
`,Q=`package patternsforge.model;

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
`,ee=`package patternsforge.factory;

import patternsforge.command.DeploymentCommand;
import patternsforge.command.StageFailureException;
import patternsforge.model.StageResult;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

import java.util.concurrent.TimeUnit;

/**
 * Base class for every pipeline stage.
 *
 * <p><b>Factory Method + Command.</b> Concrete stages are created by
 * {@link StageFactory} and, because a stage <i>is</i> a command, each one implements
 * {@link DeploymentCommand}: {@code execute()} runs the work, {@code undo()} reverts it.
 */
public abstract class DeploymentStage implements DeploymentCommand {

    private final String name;
    protected final SimulatedEnvironment environment;
    protected final DeploymentLogger logger;

    protected DeploymentStage(String name, SimulatedEnvironment environment, DeploymentLogger logger) {
        this.name = name;
        this.environment = environment;
        this.logger = logger;
    }

    public final String name() {
        return name;
    }

    public abstract String description();

    /** Perform the stage's real work (simulated). Returns a detail message. */
    protected abstract String perform();

    /** Undo whatever {@link #perform()} changed in the environment. */
    protected abstract void revert();

    @Override
    public final void execute() {
        logger.stage(name, "start", description());
        long start = System.nanoTime();
        if (environment.shouldFail(name)) {
            String reason = "injected failure at failure point " + environment.failurePoint();
            logger.error(name + " " + reason);
            throw new StageFailureException(name, reason);
        }
        String detail = perform();
        long durationMs = TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - start);
        logger.ok(name + " completed in " + durationMs + "ms — " + detail);
    }

    @Override
    public final void undo() {
        logger.warn("undo " + name + " ...");
        revert();
    }

    /** Convenience for stages that want to return a result without throwing. */
    protected StageResult ok(String message) {
        return StageResult.ok(name, 0L, message);
    }

    protected SimulatedEnvironment environment() {
        return environment;
    }

    protected DeploymentLogger logger() {
        return logger;
    }

    /** Simulated work delay. */
    protected final void sleep(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
`,ne=`package patternsforge.factory;

/**
 * <b>Factory Method.</b> Declares the factory method {@link #createStage(String)}.
 * Concrete factories (e.g. {@link StandardStageFactory}) decide which concrete stage
 * class is instantiated for a given stage type.
 */
public abstract class StageFactory {

    /** Public entry point — delegates to the Factory Method. */
    public DeploymentStage create(String type) {
        return createStage(type.toUpperCase());
    }

    /**
     * The Factory Method. Subclasses override this to return a specific
     * {@link DeploymentStage} implementation.
     */
    protected abstract DeploymentStage createStage(String type);
}
`,te=`package patternsforge.factory;

import patternsforge.command.BuildCommand;
import patternsforge.command.CommandInvoker;
import patternsforge.command.DeployCommand;
import patternsforge.command.ProvisionCommand;
import patternsforge.command.PromoteCommand;
import patternsforge.command.RollbackCommand;
import patternsforge.command.TestCommand;
import patternsforge.command.VerifyCommand;
import patternsforge.service.RollbackManager;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * Concrete {@link StageFactory} — the Factory Method implementation that maps a stage
 * type to a concrete {@link DeploymentStage} subclass.
 */
public final class StandardStageFactory extends StageFactory {

    private final SimulatedEnvironment environment;
    private final DeploymentLogger logger;
    private final RollbackManager rollbackManager;

    public StandardStageFactory(SimulatedEnvironment environment,
                                DeploymentLogger logger,
                                RollbackManager rollbackManager) {
        this.environment = environment;
        this.logger = logger;
        this.rollbackManager = rollbackManager;
    }

    @Override
    protected DeploymentStage createStage(String type) {
        return switch (type) {
            case "BUILD" -> new BuildCommand(environment, logger);
            case "TEST" -> new TestCommand(environment, logger);
            case "PROVISION" -> new ProvisionCommand(environment, logger);
            case "DEPLOY" -> new DeployCommand(environment, logger);
            case "VERIFY" -> new VerifyCommand(environment, logger);
            case "PROMOTE" -> new PromoteCommand(environment, logger);
            case "ROLLBACK" -> new RollbackCommand(environment, logger, rollbackManager);
            default -> throw new IllegalArgumentException("Unknown stage type: " + type);
        };
    }
}
`,ae=`package patternsforge.builder;

import patternsforge.factory.DeploymentStage;

import java.util.List;

/** An ordered, immutable pipeline of {@link DeploymentStage}s. */
public final class Pipeline {

    private final List<DeploymentStage> stages;

    public Pipeline(List<DeploymentStage> stages) {
        this.stages = List.copyOf(stages);
    }

    public List<DeploymentStage> stages() {
        return stages;
    }

    public int size() {
        return stages.size();
    }

    @Override
    public String toString() {
        return stages.stream().map(s -> s.name().toLowerCase()).reduce((a, b) -> a + " -> " + b).orElse("(empty)");
    }
}
`,re=`package patternsforge.builder;

import patternsforge.factory.DeploymentStage;
import patternsforge.factory.StageFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * <b>Builder.</b> Constructs a {@link Pipeline} step by step with a fluent API:
 * <pre>
 *   Pipeline pipeline = new PipelineBuilder(factory)
 *       .addBuild().addTest().addProvision().addDeploy().addVerify().build();
 * </pre>
 * Stage objects themselves are created by the {@link StageFactory} (Factory Method).
 */
public final class PipelineBuilder {

    private final List<DeploymentStage> stages = new ArrayList<>();
    private final StageFactory factory;

    public PipelineBuilder(StageFactory factory) {
        this.factory = factory;
    }

    public PipelineBuilder addBuild() {
        stages.add(factory.create("BUILD"));
        return this;
    }

    public PipelineBuilder addTest() {
        stages.add(factory.create("TEST"));
        return this;
    }

    public PipelineBuilder addProvision() {
        stages.add(factory.create("PROVISION"));
        return this;
    }

    public PipelineBuilder addDeploy() {
        stages.add(factory.create("DEPLOY"));
        return this;
    }

    public PipelineBuilder addVerify() {
        stages.add(factory.create("VERIFY"));
        return this;
    }

    public PipelineBuilder addPromote() {
        stages.add(factory.create("PROMOTE"));
        return this;
    }

    /** Append an already-created stage. */
    public PipelineBuilder add(DeploymentStage stage) {
        stages.add(stage);
        return this;
    }

    public Pipeline build() {
        return new Pipeline(stages);
    }
}
`,oe=`package patternsforge.command;

/**
 * <b>Command (main pattern).</b> Every deployment stage is represented as a command:
 * {@code execute()} performs the work, {@code undo()} reverts it. The
 * {@link CommandInvoker} keeps history and can undo all executed commands in reverse order.
 */
public interface DeploymentCommand {

    void execute();

    void undo();
}
`,ie=`package patternsforge.command;

/** Thrown when a stage fails. Carries the stage name so the failure chain can react. */
public final class StageFailureException extends RuntimeException {

    private final String stage;

    public StageFailureException(String stage, String reason) {
        super(reason);
        this.stage = stage;
    }

    public String stage() {
        return stage;
    }
}
`,se=`package patternsforge.command;

import patternsforge.utils.DeploymentLogger;

import java.util.ArrayDeque;
import java.util.Deque;

/**
 * <b>Command Invoker.</b> Maintains a {@link Deque} history of executed commands.
 * When a command fails, {@link #undoAll()} automatically calls {@code undo()} on every
 * executed command <b>in reverse order</b> — the last executed stage is undone first.
 *
 * <p>The reverse-order undo is triggered by the rollback subsystem (Chain of
 * Responsibility) so that a single retry (RetryHandler) can still be attempted before
 * a full rollback is performed.
 */
public final class CommandInvoker {

    private final Deque<DeploymentCommand> history = new ArrayDeque<>();
    private final DeploymentLogger logger;

    public CommandInvoker(DeploymentLogger logger) {
        this.logger = logger;
    }

    /** Executes a command and pushes it onto the history stack. */
    public void execute(DeploymentCommand command) {
        history.push(command);
        logger.log("executing " + displayName(command));
        command.execute();
    }

    /** Re-executes the most recent command (used by RetryHandler). */
    public void retryLast() {
        if (history.isEmpty()) {
            throw new IllegalStateException("No command to retry");
        }
        logger.warn("retrying " + displayName(history.peek()));
        history.peek().execute();
    }

    /**
     * <b>Automatic reverse-order undo.</b> Pops every executed command off the stack
     * and calls {@code undo()} — last executed, first undone.
     */
    public void undoAll() {
        logger.warn("Rolling back " + history.size() + " executed command(s) in reverse order");
        while (!history.isEmpty()) {
            history.pop().undo();
        }
    }

    public int size() {
        return history.size();
    }

    public boolean isEmpty() {
        return history.isEmpty();
    }

    private String displayName(DeploymentCommand command) {
        return command.getClass().getSimpleName();
    }
}
`,le=`package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Build stage: compiles sources and produces a deployable artifact. */
public final class BuildCommand extends DeploymentStage {

    public BuildCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("BUILD", environment, logger);
    }

    @Override
    public String description() {
        return "compile sources & produce artifact";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("BUILD"));
        String artifact = "patternforge-" + environment.version() + ".jar";
        environment.put("artifact", artifact);
        environment.put("artifactBuilt", Boolean.TRUE);
        return "artifact " + artifact + " built";
    }

    @Override
    protected void revert() {
        environment.put("artifactBuilt", Boolean.FALSE);
        environment.state().remove("artifact");
        logger.log("BUILD undo: artifact deleted from registry");
    }
}
`,pe=`package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Test stage: executes the unit &amp; integration suite against the new artifact. */
public final class TestCommand extends DeploymentStage {

    public TestCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("TEST", environment, logger);
    }

    @Override
    public String description() {
        return "execute unit & integration suite";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("TEST"));
        int tests = 42 + (int) (Math.random() * 10);
        environment.put("testsPassed", tests);
        return tests + " tests passed, 0 failures";
    }

    @Override
    protected void revert() {
        environment.state().remove("testsPassed");
        logger.log("TEST undo: test reports discarded");
    }
}
`,ce=`package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Provision stage: allocates simulated compute, storage and network resources. */
public final class ProvisionCommand extends DeploymentStage {

    public ProvisionCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("PROVISION", environment, logger);
    }

    @Override
    public String description() {
        return "allocate compute, storage & network";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("PROVISION"));
        environment.put("resourcesProvisioned", Boolean.TRUE);
        environment.put("cluster", "forge-cluster-a");
        return "3 nodes / 6 vCPU / 12GiB provisioned";
    }

    @Override
    protected void revert() {
        environment.put("resourcesProvisioned", Boolean.FALSE);
        logger.log("PROVISION undo: resources released");
    }
}
`,me=`package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Deploy stage: rolls the artifact out onto the simulated fleet. */
public final class DeployCommand extends DeploymentStage {

    public DeployCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("DEPLOY", environment, logger);
    }

    @Override
    public String description() {
        return "roll out artifact per deployment strategy";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("DEPLOY"));
        environment.put("deployedVersion", environment.version().toString());
        environment.put("deploymentStrategy", environment.state().getOrDefault("deploymentStrategy", "BLUE_GREEN"));
        return "v" + environment.version() + " deployed (" + environment.state().get("deploymentStrategy") + ")";
    }

    @Override
    protected void revert() {
        environment.state().remove("deployedVersion");
        logger.log("DEPLOY undo: router switched back to previous fleet");
    }
}
`,ge=`package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Verify stage: probes liveness, readiness and latency of the new fleet. */
public final class VerifyCommand extends DeploymentStage {

    public VerifyCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("VERIFY", environment, logger);
    }

    @Override
    public String description() {
        return "probe liveness, readiness & latency";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("VERIFY"));
        environment.put("verified", Boolean.TRUE);
        return "3/3 probes passed, p95 latency 42ms";
    }

    @Override
    protected void revert() {
        environment.put("verified", Boolean.FALSE);
        logger.log("VERIFY undo: smoke traffic stopped");
    }
}
`,de=`package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/** Promote stage: marks the verified release as stable and serves 100% of traffic. */
public final class PromoteCommand extends DeploymentStage {

    public PromoteCommand(SimulatedEnvironment environment, DeploymentLogger logger) {
        super("PROMOTE", environment, logger);
    }

    @Override
    public String description() {
        return "mark release as stable (100% traffic)";
    }

    @Override
    protected String perform() {
        sleep(environment.stageDurationMs("PROMOTE"));
        environment.put("promotedVersion", environment.version().toString());
        return "v" + environment.version() + " promoted to stable";
    }

    @Override
    protected void revert() {
        environment.state().remove("promotedVersion");
        logger.log("PROMOTE undo: release demoted to previous stable");
    }
}
`,ue=`package patternsforge.command;

import patternsforge.factory.DeploymentStage;
import patternsforge.service.RollbackManager;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * Rollback stage: exists so the {@link patternsforge.factory.StageFactory} can create a
 * "ROLLBACK" stage on demand. Its {@code execute()} hands over to the
 * {@link RollbackManager}, which undoes every executed command in reverse order and
 * restores the last memento snapshot.
 */
public final class RollbackCommand extends DeploymentStage {

    private final RollbackManager rollbackManager;

    public RollbackCommand(SimulatedEnvironment environment,
                           DeploymentLogger logger,
                           RollbackManager rollbackManager) {
        super("ROLLBACK", environment, logger);
        this.rollbackManager = rollbackManager;
    }

    @Override
    public String description() {
        return "undo every executed stage & restore snapshot";
    }

    @Override
    protected String perform() {
        rollbackManager.rollback(this);
        return "rollback completed";
    }

    @Override
    protected void revert() {
        logger.log("ROLLBACK undo: nothing to undo");
    }
}
`,ve=`package patternsforge.strategy;

/**
 * <b>Strategy.</b> Encapsulates a deployment algorithm behind a common interface so the
 * algorithm can be changed at runtime (see
 * {@link patternsforge.facade.ReleaseManager#setStrategy(DeploymentStrategy)}).
 */
public interface DeploymentStrategy {

    String name();

    /** One-line description shown in the console. */
    String summary();
}
`,ye=`package patternsforge.strategy;

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
`,fe=`package patternsforge.strategy;

/** Rolling: instances are updated in batches; capacity never drops below minimum. */
public final class RollingStrategy implements DeploymentStrategy {

    @Override
    public String name() {
        return "ROLLING";
    }

    @Override
    public String summary() {
        return "batch-by-batch instance update — capacity never drops";
    }
}
`,he=`package patternsforge.strategy;

/** Canary: a small traffic slice is routed to the new version and gradually widened. */
public final class CanaryStrategy implements DeploymentStrategy {

    @Override
    public String name() {
        return "CANARY";
    }

    @Override
    public String summary() {
        return "5% traffic slice first, then widen to 100%";
    }
}
`,be=`package patternsforge.state;

/**
 * <b>State.</b> Represents one deployment lifecycle state. Each concrete state decides
 * what happens when the deployment enters it — no if/else chains anywhere.
 */
public interface DeploymentState {

    String name();

    void handle(DeploymentContext context);
}
`,Se=`package patternsforge.state;

import patternsforge.model.DeploymentEvent;
import patternsforge.model.DeploymentStatus;
import patternsforge.service.NotificationService;
import patternsforge.utils.DeploymentLogger;

import java.time.Instant;

/**
 * The <b>State</b> context. Holds the current {@link DeploymentState} and delegates
 * lifecycle changes to it. Observers are notified through the {@link NotificationService}.
 */
public final class DeploymentContext {

    private DeploymentState state = new IdleState();
    private final NotificationService notifications;
    private final DeploymentLogger logger;

    public DeploymentContext(NotificationService notifications, DeploymentLogger logger) {
        this.notifications = notifications;
        this.logger = logger;
    }

    /** Moves the deployment into {@code next} and lets the state act on entry. */
    public void transition(DeploymentState next) {
        this.state = next;
        next.handle(this);
    }

    public String stateName() {
        return state.name();
    }

    /** Broadcast a lifecycle event to every observer. */
    public void notify(DeploymentStatus status, String message) {
        notifications.broadcast(new DeploymentEvent(status, message, Instant.now()));
    }

    public DeploymentLogger logger() {
        return logger;
    }
}
`,xe=`package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** Initial state — the orchestrator is waiting for a deployment request. */
public final class IdleState implements DeploymentState {

    @Override
    public String name() {
        return "IDLE";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().log(">>> [State] Entering IDLE state");
    }
}
`,De=`package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** The Build stage is executing. */
public final class BuildingState implements DeploymentState {

    @Override
    public String name() {
        return "BUILDING";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().log(">>> [State] Entering BUILDING state");
        context.notify(DeploymentStatus.BUILDING, "Pipeline entered BUILDING state");
    }
}
`,ke=`package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** The Test stage is executing. */
public final class TestingState implements DeploymentState {

    @Override
    public String name() {
        return "TESTING";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().log(">>> [State] Entering TESTING state");
        context.notify(DeploymentStatus.TESTING, "Pipeline entered TESTING state");
    }
}
`,Ee=`package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** Provision, Deploy and Verify stages all run inside this state. */
public final class DeployingState implements DeploymentState {

    @Override
    public String name() {
        return "DEPLOYING";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().log(">>> [State] Entering DEPLOYING state");
        context.notify(DeploymentStatus.DEPLOYING, "Pipeline entered DEPLOYING state");
    }
}
`,Ce=`package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** The release passed health verification and was promoted. */
public final class HealthyState implements DeploymentState {

    @Override
    public String name() {
        return "HEALTHY";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().ok(">>> [State] Entering HEALTHY state — release is live");
        context.notify(DeploymentStatus.HEALTHY, "Release is live and serving traffic");
    }
}
`,Re=`package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** Terminal state after a failed deployment; the snapshot has been restored. */
public final class FailedState implements DeploymentState {

    @Override
    public String name() {
        return "FAILED";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().error(">>> [State] Entering FAILED state");
    }
}
`,je=`package patternsforge.state;

import patternsforge.model.DeploymentStatus;

/** Reverse-order undo and snapshot restore are executing. */
public final class RollbackState implements DeploymentState {

    @Override
    public String name() {
        return "ROLLBACK";
    }

    @Override
    public void handle(DeploymentContext context) {
        context.logger().warn(">>> [State] Entering ROLLBACK state");
        context.notify(DeploymentStatus.ROLLING_BACK, "Rollback initiated — undoing executed stages");
    }
}
`,Oe=`package patternsforge.observer;

import patternsforge.builder.Pipeline;
import patternsforge.chain.FailureContext;
import patternsforge.chain.FailurePipeline;
import patternsforge.command.CommandInvoker;
import patternsforge.command.StageFailureException;
import patternsforge.factory.DeploymentStage;
import patternsforge.model.DeploymentEvent;
import patternsforge.model.DeploymentStatus;
import patternsforge.model.EnvironmentSnapshot;
import patternsforge.service.NotificationService;
import patternsforge.state.BuildingState;
import patternsforge.state.DeploymentContext;
import patternsforge.state.DeploymentState;
import patternsforge.state.DeployingState;
import patternsforge.state.FailedState;
import patternsforge.state.IdleState;
import patternsforge.state.TestingState;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

import java.time.Instant;

/**
 * <b>Subject (Observer) + orchestrator.</b> Runs the pipeline stage by stage through the
 * {@link CommandInvoker}, transitions the {@link DeploymentContext} between lifecycle
 * states, and broadcasts every status change to all attached observers. Failures are
 * handed to the {@link FailurePipeline} (Chain of Responsibility).
 */
public final class DeploymentEngine {

    private final DeploymentContext context;
    private final CommandInvoker invoker;
    private final NotificationService notifications;
    private final SimulatedEnvironment environment;
    private final DeploymentLogger logger;

    private FailurePipeline failurePipeline;
    private boolean recovered = false;
    private DeploymentStatus status = DeploymentStatus.IDLE;

    public DeploymentEngine(DeploymentContext context,
                            CommandInvoker invoker,
                            NotificationService notifications,
                            SimulatedEnvironment environment,
                            DeploymentLogger logger) {
        this.context = context;
        this.invoker = invoker;
        this.notifications = notifications;
        this.environment = environment;
        this.logger = logger;
    }

    public void setFailurePipeline(FailurePipeline failurePipeline) {
        this.failurePipeline = failurePipeline;
    }

    /** Executes every stage of the pipeline; returns the final status. */
    public DeploymentStatus run(Pipeline pipeline) {
        for (DeploymentStage stage : pipeline.stages()) {
            context.transition(stateFor(stage.name()));
            status = statusFor(stage.name());
            try {
                invoker.execute(stage);
            } catch (StageFailureException failure) {
                logger.error("Stage [" + stage.name() + "] FAILED: " + failure.getMessage());
                failurePipeline.handle(new FailureContext(this, stage.name(), failure.getMessage()));
                if (!recovered) {
                    status = DeploymentStatus.FAILED;
                    return status;
                }
                recovered = false;
            }
        }
        return status;
    }

    /** Called by RetryHandler when a retried stage succeeds. */
    public void markRecovered() {
        this.recovered = true;
    }

    /** Re-executes the last command (used by RetryHandler). */
    public void retryLast() {
        invoker.retryLast();
    }

    /** Restores the environment from a memento snapshot and enters the FAILED state. */
    public void restoreFromMemento(EnvironmentSnapshot snapshot) {
        environment.restore(snapshot);
        context.transition(new FailedState());
        logger.error("SNAPSHOT RESTORED — environment reverted to " + environment.version());
        broadcast(DeploymentStatus.ROLLED_BACK, "Snapshot restored — environment reverted to v" + environment.version());
    }

    public void broadcast(DeploymentStatus newStatus, String message) {
        status = newStatus;
        notifications.broadcast(new DeploymentEvent(newStatus, message, Instant.now()));
    }

    public DeploymentStatus status() {
        return status;
    }

    public DeploymentContext context() {
        return context;
    }

    public CommandInvoker invoker() {
        return invoker;
    }

    private DeploymentState stateFor(String stage) {
        return switch (stage) {
            case "BUILD" -> new BuildingState();
            case "TEST" -> new TestingState();
            case "PROVISION", "DEPLOY", "VERIFY" -> new DeployingState();
            default -> new IdleState();
        };
    }

    private DeploymentStatus statusFor(String stage) {
        return switch (stage) {
            case "BUILD" -> DeploymentStatus.BUILDING;
            case "TEST" -> DeploymentStatus.TESTING;
            case "PROVISION" -> DeploymentStatus.PROVISIONING;
            case "DEPLOY" -> DeploymentStatus.DEPLOYING;
            case "VERIFY" -> DeploymentStatus.VERIFYING;
            default -> status;
        };
    }
}
`,Le=`package patternsforge.observer;

import patternsforge.model.DeploymentEvent;

/**
 * <b>Observer.</b> Implementations receive every deployment event pushed by the
 * {@link DeploymentEngine} (the subject).
 */
public interface DeploymentObserver {

    /** Human-readable channel name, e.g. "dashboard". */
    String channel();

    void update(DeploymentEvent event);
}
`,Ne=`package patternsforge.observer;

import patternsforge.model.DeploymentEvent;
import patternsforge.utils.DeploymentLogger;

/** Renders events to the operator dashboard (stdout in the simulation). */
public final class DashboardObserver implements DeploymentObserver {

    private final DeploymentLogger logger;

    public DashboardObserver(DeploymentLogger logger) {
        this.logger = logger;
    }

    @Override
    public String channel() {
        return "dashboard";
    }

    @Override
    public void update(DeploymentEvent event) {
        logger.log("DASHBOARD: " + event.message());
    }
}
`,Me=`package patternsforge.observer;

import patternsforge.model.DeploymentEvent;
import patternsforge.utils.DeploymentLogger;

/** Emails on-call engineers for important (failure / rollback) events. */
public final class EmailObserver implements DeploymentObserver {

    private final DeploymentLogger logger;

    public EmailObserver(DeploymentLogger logger) {
        this.logger = logger;
    }

    @Override
    public String channel() {
        return "email";
    }

    @Override
    public void update(DeploymentEvent event) {
        if (event.status().name().contains("FAIL") || event.status() == patternsforge.model.DeploymentStatus.ROLLING_BACK) {
            logger.error("OBS[email]: " + event);
        } else {
            logger.log("OBS[email]: " + event);
        }
    }
}
`,we=`package patternsforge.observer;

import patternsforge.model.DeploymentEvent;
import patternsforge.utils.DeploymentLogger;

/** Writes every event into the central log stream. */
public final class LogObserver implements DeploymentObserver {

    private final DeploymentLogger logger;

    public LogObserver(DeploymentLogger logger) {
        this.logger = logger;
    }

    @Override
    public String channel() {
        return "log";
    }

    @Override
    public void update(DeploymentEvent event) {
        logger.log("LOG: " + event);
    }
}
`,Pe=`package patternsforge.observer;

import patternsforge.model.DeploymentEvent;
import patternsforge.utils.DeploymentLogger;

/** Posts deployment events to the #deployments Slack channel. */
public final class SlackObserver implements DeploymentObserver {

    private final DeploymentLogger logger;

    public SlackObserver(DeploymentLogger logger) {
        this.logger = logger;
    }

    @Override
    public String channel() {
        return "slack";
    }

    @Override
    public void update(DeploymentEvent event) {
        if (event.status() == patternsforge.model.DeploymentStatus.ROLLED_BACK
                || event.status() == patternsforge.model.DeploymentStatus.HEALTHY) {
            logger.warn("OBS[slack] #deployments: " + event.message());
        } else {
            logger.log("OBS[slack] #deployments: " + event.message());
        }
    }
}
`,Fe=`package patternsforge.chain;

import patternsforge.observer.DeploymentEngine;

/** Failure details passed along the Chain of Responsibility. */
public record FailureContext(DeploymentEngine engine, String failedStage, String reason, int retries) {

    public FailureContext incrementRetries() {
        return new FailureContext(engine, failedStage, reason, retries + 1);
    }
}
`,Ie=`package patternsforge.chain;

import patternsforge.utils.DeploymentLogger;

/**
 * <b>Chain of Responsibility.</b> Base handler. Each handler decides whether it can
 * process a failure ({@link #canHandle}); if not, the request is passed to the next
 * handler in the chain.
 */
public abstract class FailureHandler {

    private final DeploymentLogger logger;
    private FailureHandler next;

    protected FailureHandler(DeploymentLogger logger) {
        this.logger = logger;
    }

    /** Links the next handler; returns it for fluent chaining. */
    public FailureHandler setNext(FailureHandler next) {
        this.next = next;
        return next;
    }

    protected FailureHandler next() {
        return next;
    }

    protected DeploymentLogger logger() {
        return logger;
    }

    /** Entry point: process if possible, otherwise delegate downstream. */
    public final void handle(FailureContext context) {
        if (canHandle(context)) {
            logger.warn(getClass().getSimpleName() + " accepted failure at stage [" + context.failedStage() + "]");
            process(context);
        } else if (next != null) {
            logger.warn(getClass().getSimpleName() + " cannot handle — passing to " + next.getClass().getSimpleName());
            next.handle(context);
        } else {
            throw new IllegalStateException("No handler could process the failure");
        }
    }

    protected abstract boolean canHandle(FailureContext context);

    protected abstract void process(FailureContext context);
}
`,Te=`package patternsforge.chain;

import patternsforge.command.StageFailureException;
import patternsforge.utils.DeploymentLogger;

/**
 * First link in the failure chain. Retries the failed stage once. Health-check failures
 * are not retried (they are handled by the next link). If the retry also fails, the
 * request is passed to the {@link RollbackHandler}.
 */
public final class RetryHandler extends FailureHandler {

    private static final int MAX_RETRIES = 1;

    public RetryHandler(DeploymentLogger logger) {
        super(logger);
    }

    @Override
    protected boolean canHandle(FailureContext context) {
        return context.retries() < MAX_RETRIES && !"HEALTH_CHECK".equals(context.failedStage());
    }

    @Override
    protected void process(FailureContext context) {
        logger().warn("RetryHandler retrying [" + context.failedStage() + "] (attempt " + (context.retries() + 2) + ")");
        try {
            context.engine().retryLast();
            logger().ok("RetryHandler: retry succeeded — pipeline continues");
            context.engine().markRecovered();
        } catch (StageFailureException retryFailure) {
            logger().error("RetryHandler: retry failed (" + retryFailure.getMessage() + ")");
            next().handle(context.incrementRetries());
        }
    }
}
`,Be=`package patternsforge.chain;

import patternsforge.service.RollbackManager;
import patternsforge.utils.DeploymentLogger;

/**
 * Second link in the failure chain. Can handle any failure: it triggers the
 * {@link RollbackManager}, which undoes every executed command in reverse order
 * (Command) and restores the last snapshot (Memento).
 */
public final class RollbackHandler extends FailureHandler {

    private final RollbackManager rollbackManager;

    public RollbackHandler(RollbackManager rollbackManager, DeploymentLogger logger) {
        super(logger);
        this.rollbackManager = rollbackManager;
    }

    @Override
    protected boolean canHandle(FailureContext context) {
        return context.failedStage() != null;
    }

    @Override
    protected void process(FailureContext context) {
        logger().warn("RollbackHandler taking over — rolling back deployment");
        rollbackManager.rollback(context.failedStage());
    }
}
`,Ae=`package patternsforge.chain;

import patternsforge.model.DeploymentStatus;
import patternsforge.observer.DeploymentEngine;
import patternsforge.utils.DeploymentLogger;

/**
 * Terminal link in the failure chain. Always can handle: the failure is escalated to the
 * on-call engineers through the observer notifications (email / Slack).
 */
public final class EscalationHandler extends FailureHandler {

    private final DeploymentEngine engine;

    public EscalationHandler(DeploymentEngine engine, DeploymentLogger logger) {
        super(logger);
        this.engine = engine;
    }

    @Override
    protected boolean canHandle(FailureContext context) {
        return true;
    }

    @Override
    protected void process(FailureContext context) {
        logger().error("EscalationHandler: escalating to on-call engineer for stage [" + context.failedStage() + "]");
        engine.broadcast(DeploymentStatus.FAILED,
                "Escalated to on-call — deployment of stage " + context.failedStage() + " failed and was rolled back");
    }
}
`,He=`package patternsforge.chain;

import patternsforge.observer.DeploymentEngine;
import patternsforge.service.RollbackManager;
import patternsforge.utils.DeploymentLogger;

/**
 * Assembles the failure-handling chain: <b>RetryHandler → RollbackHandler →
 * EscalationHandler</b>. Clients only call {@link #handle(FailureContext)} on the head
 * of the chain.
 */
public final class FailurePipeline {

    private final FailureHandler head;

    public FailurePipeline(DeploymentLogger logger,
                           RollbackManager rollbackManager,
                           DeploymentEngine engine) {
        RetryHandler retry = new RetryHandler(logger);
        RollbackHandler rollback = new RollbackHandler(rollbackManager, logger);
        EscalationHandler escalate = new EscalationHandler(engine, logger);
        retry.setNext(rollback);
        rollback.setNext(escalate);
        this.head = retry;
    }

    public void handle(FailureContext context) {
        head.handle(context);
    }
}
`,Ve=`package patternsforge.memento;

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
`,Ue=`package patternsforge.memento;

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
`,Ge=`package patternsforge.facade;

import patternsforge.builder.Pipeline;
import patternsforge.builder.PipelineBuilder;
import patternsforge.chain.FailurePipeline;
import patternsforge.command.CommandInvoker;
import patternsforge.factory.StageFactory;
import patternsforge.factory.StandardStageFactory;
import patternsforge.memento.DeploymentCaretaker;
import patternsforge.model.DeploymentResult;
import patternsforge.model.DeploymentStatus;
import patternsforge.model.EnvironmentSnapshot;
import patternsforge.model.ReleaseVersion;
import patternsforge.observer.DashboardObserver;
import patternsforge.observer.DeploymentEngine;
import patternsforge.observer.DeploymentObserver;
import patternsforge.observer.EmailObserver;
import patternsforge.observer.LogObserver;
import patternsforge.observer.SlackObserver;
import patternsforge.service.HealthMonitor;
import patternsforge.service.NotificationService;
import patternsforge.service.RollbackManager;
import patternsforge.state.DeploymentContext;
import patternsforge.state.HealthyState;
import patternsforge.strategy.BlueGreenStrategy;
import patternsforge.strategy.DeploymentStrategy;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * <b>Facade.</b> The single entry point for the whole orchestrator. Clients only call
 * {@link #deploy()}; internally the facade wires and drives the {@link Pipeline},
 * {@link CommandInvoker}, {@link DeploymentEngine}, {@link HealthMonitor},
 * {@link RollbackManager}, {@link NotificationService}, {@link DeploymentCaretaker},
 * {@link StageFactory} and the active {@link DeploymentStrategy}.
 */
public final class ReleaseManager {

    private final DeploymentLogger logger = new DeploymentLogger();
    private final SimulatedEnvironment environment = new SimulatedEnvironment();
    private final NotificationService notifications = new NotificationService();
    private final CommandInvoker invoker = new CommandInvoker(logger);
    private final DeploymentContext context = new DeploymentContext(notifications, logger);
    private final DeploymentEngine engine = new DeploymentEngine(context, invoker, notifications, environment, logger);
    private final DeploymentCaretaker caretaker = new DeploymentCaretaker();
    private final RollbackManager rollbackManager = new RollbackManager(invoker, caretaker, engine, logger);
    private final StageFactory stageFactory = new StandardStageFactory(environment, logger, rollbackManager);
    private final FailurePipeline failurePipeline = new FailurePipeline(logger, rollbackManager, engine);
    private final HealthMonitor healthMonitor = new HealthMonitor(logger);

    private DeploymentStrategy strategy = new BlueGreenStrategy();
    private boolean running = false;

    public ReleaseManager() {
        engine.setFailurePipeline(failurePipeline);
        notifications.attach(new DashboardObserver(logger));
        notifications.attach(new LogObserver(logger));
        notifications.attach(new EmailObserver(logger));
        notifications.attach(new SlackObserver(logger));
    }

    /** <b>Strategy:</b> swap the deployment algorithm at runtime. */
    public void setStrategy(DeploymentStrategy strategy) {
        this.strategy = strategy;
        environment.put("deploymentStrategy", strategy.name());
        logger.banner(">>> [Strategy] Strategy switched to " + strategy.name() + " (" + strategy.summary() + ")");
    }

    public DeploymentStrategy strategy() {
        return strategy;
    }

    public void setFailurePoint(String failurePoint) {
        environment.setFailurePoint(failurePoint);
        logger.log(">>> failure point set to " + environment.failurePoint());
    }

    public void attachObserver(DeploymentObserver observer) {
        notifications.attach(observer);
    }

    public SimulatedEnvironment environment() {
        return environment;
    }

    public StageFactory stageFactory() {
        return stageFactory;
    }

    /**
     * The only method clients need. Orchestrates the entire deployment:
     * bump version → save memento snapshot → run pipeline → health gate → promote or roll back.
     */
    public DeploymentResult deploy() {
        if (running) {
            logger.warn("deployment already in progress — request ignored");
            return DeploymentResult.failed(environment.version(), environment.version(),
                    DeploymentStatus.FAILED, "deployment already in progress");
        }
        running = true;
        try {
            ReleaseVersion previous = environment.version();
            ReleaseVersion target = environment.bumpVersion();
            logger.banner("=== DEPLOYMENT v" + target + " STARTED (strategy: " + strategy.name() + ") ===");

            // Memento: capture state before anything mutates the environment.
            EnvironmentSnapshot snapshot = environment.snapshot();
            caretaker.save(snapshot);
            logger.log(">>> [Memento] snapshot saved: v" + snapshot.version()
                    + " | " + snapshot.config().size() + " config keys | "
                    + snapshot.envVars().size() + " env vars @ " + snapshot.timestamp());

            // Builder + Factory Method: assemble the pipeline.
            Pipeline pipeline = new PipelineBuilder(stageFactory)
                    .addBuild()
                    .addTest()
                    .addProvision()
                    .addDeploy()
                    .addVerify()
                    .build();
            logger.log(">>> [Builder] pipeline assembled: " + pipeline);

            DeploymentStatus status = engine.run(pipeline);

            if (status == DeploymentStatus.FAILED || status == DeploymentStatus.ROLLED_BACK) {
                running = false;
                return DeploymentResult.failed(target, environment.version(), status,
                        "deployment failed — restored to v" + environment.version());
            }

            // Health verification gates promotion.
            if (!healthMonitor.checkHealth(environment, strategy)) {
                engine.broadcast(DeploymentStatus.FAILED, "Health verification failed for v" + target);
                failurePipeline.handle(new patternsforge.chain.FailureContext(
                        engine, "HEALTH_CHECK", "health verification failed", 0));
                running = false;
                return DeploymentResult.failed(target, environment.version(), DeploymentStatus.ROLLED_BACK,
                        "health check failed — restored to v" + environment.version());
            }

            // Healthy: promote the release.
            try {
                invoker.execute(stageFactory.create("PROMOTE"));
            } catch (patternsforge.command.StageFailureException promoteFailure) {
                logger.error("Promotion failed: " + promoteFailure.getMessage());
                failurePipeline.handle(new patternsforge.chain.FailureContext(
                        engine, "PROMOTE", promoteFailure.getMessage(), 0));
                running = false;
                return DeploymentResult.failed(target, environment.version(), DeploymentStatus.ROLLED_BACK,
                        "promotion failed — restored to v" + environment.version());
            }
            engine.context().transition(new HealthyState());
            engine.broadcast(DeploymentStatus.HEALTHY, "Release v" + target + " is LIVE (promoted)");
            running = false;
            return DeploymentResult.success(target, "release v" + target + " deployed via " + strategy.name());
        } finally {
            running = false;
        }
    }
}
`,Ye=`package patternsforge.service;

import patternsforge.strategy.DeploymentStrategy;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

/**
 * Simulated health verification: probes liveness, readiness and latency after the deploy
 * stage. Promotion is gated on {@link #checkHealth} returning {@code true}.
 */
public final class HealthMonitor {

    private final DeploymentLogger logger;

    public HealthMonitor(DeploymentLogger logger) {
        this.logger = logger;
    }

    public boolean checkHealth(SimulatedEnvironment environment, DeploymentStrategy strategy) {
        logger.log(">>> [HealthMonitor] probing v" + environment.version() + " (" + strategy.name() + ")");
        boolean healthy = !environment.shouldFail("HEALTH");
        if (healthy) {
            logger.ok("[HealthMonitor] 3/3 probes passed — healthy (p95 42ms)");
        } else {
            logger.error("[HealthMonitor] probe #2 (readiness) timed out — UNHEALTHY");
        }
        return healthy;
    }
}
`,qe=`package patternsforge.service;

import patternsforge.command.CommandInvoker;
import patternsforge.memento.DeploymentCaretaker;
import patternsforge.observer.DeploymentEngine;
import patternsforge.state.RollbackState;
import patternsforge.utils.DeploymentLogger;

/**
 * Coordinates a rollback: enters the ROLLBACK state, asks the {@link CommandInvoker} to
 * undo every executed command in reverse order (Command pattern) and restores the last
 * memento snapshot (Memento pattern).
 */
public final class RollbackManager {

    private final CommandInvoker invoker;
    private final DeploymentCaretaker caretaker;
    private final DeploymentEngine engine;
    private final DeploymentLogger logger;

    public RollbackManager(CommandInvoker invoker,
                           DeploymentCaretaker caretaker,
                           DeploymentEngine engine,
                           DeploymentLogger logger) {
        this.invoker = invoker;
        this.caretaker = caretaker;
        this.engine = engine;
        this.logger = logger;
    }

    public void rollback(String failedStage) {
        logger.error("=== ROLLBACK initiated (failure at " + failedStage + ") ===");
        engine.context().transition(new RollbackState());
        invoker.undoAll();
        engine.restoreFromMemento(caretaker.restore());
        logger.error("=== ROLLBACK COMPLETE — deployment restored ===");
    }
}
`,_e=`package patternsforge.service;

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
`,Ke=`package patternsforge.utils;

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
`,ze=`package patternsforge.utils;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 * Console logger with ANSI colors. Every line is also appended to a static buffer so
 * JUnit tests can assert on the execution order (e.g. reverse-order undo).
 */
public final class DeploymentLogger {

    public static final String RESET = "\\u001B[0m";
    public static final String GREEN = "\\u001B[32m";
    public static final String YELLOW = "\\u001B[33m";
    public static final String RED = "\\u001B[31m";
    public static final String CYAN = "\\u001B[36m";
    public static final String GRAY = "\\u001B[90m";
    public static final String BOLD = "\\u001B[1m";

    private static final DateTimeFormatter TIME = DateTimeFormatter.ofPattern("HH:mm:ss");
    private static final List<String> BUFFER = new ArrayList<>();

    /** Clears the static buffer (call at the start of every test). */
    public static void clear() {
        BUFFER.clear();
    }

    public static List<String> buffer() {
        return List.copyOf(BUFFER);
    }

    public void log(String message) {
        println(GRAY, message);
    }

    public void ok(String message) {
        println(GREEN, message);
    }

    public void warn(String message) {
        println(YELLOW, message);
    }

    public void error(String message) {
        println(RED, message);
    }

    public void banner(String message) {
        println(BOLD + CYAN, message);
    }

    /** [STAGE] phase  detail — e.g. [BUILD] start compile sources. */
    public void stage(String stage, String phase, String detail) {
        println(GRAY, String.format("[%-9s] %-7s %s", stage, phase, detail));
    }

    private void println(String color, String message) {
        String line = "[" + LocalTime.now().format(TIME) + "] " + message;
        System.out.println(color + line + RESET);
        BUFFER.add(message);
    }
}
`,Je=`package patternsforge;

import org.junit.jupiter.api.Test;
import patternsforge.builder.Pipeline;
import patternsforge.builder.PipelineBuilder;
import patternsforge.command.BuildCommand;
import patternsforge.command.DeployCommand;
import patternsforge.command.ProvisionCommand;
import patternsforge.command.PromoteCommand;
import patternsforge.command.TestCommand;
import patternsforge.command.VerifyCommand;
import patternsforge.factory.DeploymentStage;
import patternsforge.factory.StageFactory;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** Builder pattern: the fluent PipelineBuilder assembles stages in order. */
class PipelineBuilderTest {

    @Test
    void buildsPipelineInDeclaredOrder() {
        DeploymentLogger logger = new DeploymentLogger();
        SimulatedEnvironment env = new SimulatedEnvironment();
        StageFactory factory = new StageFactory() {
            @Override
            protected DeploymentStage createStage(String type) {
                return switch (type) {
                    case "BUILD" -> new BuildCommand(env, logger);
                    case "TEST" -> new TestCommand(env, logger);
                    case "PROVISION" -> new ProvisionCommand(env, logger);
                    case "DEPLOY" -> new DeployCommand(env, logger);
                    case "VERIFY" -> new VerifyCommand(env, logger);
                    case "PROMOTE" -> new PromoteCommand(env, logger);
                    default -> throw new IllegalArgumentException(type);
                };
            }
        };

        Pipeline pipeline = new PipelineBuilder(factory)
                .addBuild()
                .addTest()
                .addProvision()
                .addDeploy()
                .addVerify()
                .addPromote()
                .build();

        List<String> names = pipeline.stages().stream().map(DeploymentStage::name).toList();
        assertEquals(List.of("BUILD", "TEST", "PROVISION", "DEPLOY", "VERIFY", "PROMOTE"), names);
        assertEquals(6, pipeline.size());
    }
}
`,We=`package patternsforge;

import org.junit.jupiter.api.Test;
import patternsforge.command.BuildCommand;
import patternsforge.command.DeployCommand;
import patternsforge.command.ProvisionCommand;
import patternsforge.command.PromoteCommand;
import patternsforge.command.RollbackCommand;
import patternsforge.command.TestCommand;
import patternsforge.command.VerifyCommand;
import patternsforge.facade.ReleaseManager;
import patternsforge.factory.DeploymentStage;
import patternsforge.factory.StageFactory;

import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;

/** Factory Method: StageFactory creates the correct concrete stage per type. */
class StageFactoryTest {

    private final StageFactory factory = new ReleaseManager().stageFactory();

    @Test
    void createsEveryStageType() {
        assertInstanceOf(BuildCommand.class, factory.create("BUILD"));
        assertInstanceOf(TestCommand.class, factory.create("TEST"));
        assertInstanceOf(ProvisionCommand.class, factory.create("PROVISION"));
        assertInstanceOf(DeployCommand.class, factory.create("DEPLOY"));
        assertInstanceOf(VerifyCommand.class, factory.create("VERIFY"));
        assertInstanceOf(PromoteCommand.class, factory.create("PROMOTE"));
        assertInstanceOf(RollbackCommand.class, factory.create("ROLLBACK"));
    }

    @Test
    void unknownTypeThrows() {
        assertThrows(IllegalArgumentException.class, () -> factory.create("RELEASE"));
    }

    @Test
    void isCaseInsensitive() {
        DeploymentStage stage = factory.create("build");
        assertInstanceOf(BuildCommand.class, stage);
    }
}
`,Xe=`package patternsforge;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import patternsforge.command.CommandInvoker;
import patternsforge.command.StageFailureException;
import patternsforge.factory.StageFactory;
import patternsforge.factory.StandardStageFactory;
import patternsforge.memento.DeploymentCaretaker;
import patternsforge.observer.DeploymentEngine;
import patternsforge.service.NotificationService;
import patternsforge.service.RollbackManager;
import patternsforge.state.DeploymentContext;
import patternsforge.utils.DeploymentLogger;
import patternsforge.utils.SimulatedEnvironment;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** Command pattern: invoker keeps history and undoes commands in reverse order. */
class CommandInvokerTest {

    private DeploymentLogger logger;
    private SimulatedEnvironment environment;
    private CommandInvoker invoker;
    private StageFactory factory;

    @BeforeEach
    void setUp() {
        logger = new DeploymentLogger();
        DeploymentLogger.clear();
        environment = new SimulatedEnvironment();
        invoker = new CommandInvoker(logger);
        NotificationService notifications = new NotificationService();
        DeploymentContext context = new DeploymentContext(notifications, logger);
        DeploymentEngine engine =
                new DeploymentEngine(context, invoker, notifications, environment, logger);
        RollbackManager rollbackManager =
                new RollbackManager(invoker, new DeploymentCaretaker(), engine, logger);
        factory = new StandardStageFactory(environment, logger, rollbackManager);
    }

    @Test
    void failingCommandThrowsAndStaysOnHistory() {
        environment.setFailurePoint("DEPLOY");
        invoker.execute(factory.create("BUILD"));
        invoker.execute(factory.create("TEST"));
        assertThrows(StageFailureException.class, () -> invoker.execute(factory.create("DEPLOY")));
        assertEquals(3, invoker.size(), "failed command remains on the history stack");
    }

    @Test
    void undoAllCallsUndoInReverseOrder() {
        environment.setFailurePoint("DEPLOY");
        invoker.execute(factory.create("BUILD"));
        invoker.execute(factory.create("TEST"));
        assertThrows(StageFailureException.class, () -> invoker.execute(factory.create("DEPLOY")));

        invoker.undoAll();

        List<String> lines = DeploymentLogger.buffer();
        int dep = indexOf(lines, "undo DEPLOY");
        int tes = indexOf(lines, "undo TEST");
        int bui = indexOf(lines, "undo BUILD");
        assertTrue(dep >= 0 && tes >= 0 && bui >= 0, "all three undo lines present");
        assertTrue(dep < tes && tes < bui, "reverse order: DEPLOY, then TEST, then BUILD");
        assertTrue(invoker.isEmpty(), "history emptied after undoAll");
    }

    @Test
    void retryLastReexecutesMostRecentCommand() {
        environment.setFailurePoint("NONE");
        invoker.execute(factory.create("BUILD"));
        invoker.retryLast();
        assertEquals(1, invoker.size());
    }

    private int indexOf(List<String> lines, String prefix) {
        for (int i = 0; i < lines.size(); i++) {
            if (lines.get(i).contains(prefix)) {
                return i;
            }
        }
        return -1;
    }
}
`,$e=`package patternsforge;

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
`,Ze=`package patternsforge;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import patternsforge.facade.ReleaseManager;
import patternsforge.model.DeploymentEvent;
import patternsforge.model.DeploymentStatus;
import patternsforge.observer.DeploymentObserver;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** Observer pattern: every attached observer receives deployment events. */
class ObserverTest {

    private ReleaseManager releaseManager;
    private CountingObserver observer;

    static final class CountingObserver implements DeploymentObserver {
        final List<DeploymentStatus> received = new ArrayList<>();

        @Override
        public String channel() {
            return "test";
        }

        @Override
        public void update(DeploymentEvent event) {
            received.add(event.status());
        }
    }

    @BeforeEach
    void setUp() {
        releaseManager = new ReleaseManager();
        observer = new CountingObserver();
        releaseManager.attachObserver(observer);
    }

    @Test
    void observersReceiveHealthyEventOnSuccess() {
        releaseManager.setFailurePoint("NONE");
        var result = releaseManager.deploy();

        assertTrue(result.success());
        assertFalse(observer.received.isEmpty(), "observer received at least one event");
        assertTrue(observer.received.contains(DeploymentStatus.HEALTHY));
    }

    @Test
    void observersReceiveRollbackEventsOnFailure() {
        releaseManager.setFailurePoint("TEST");
        var result = releaseManager.deploy();

        assertFalse(result.success());
        assertTrue(observer.received.contains(DeploymentStatus.ROLLING_BACK));
        assertTrue(observer.received.contains(DeploymentStatus.ROLLED_BACK));
    }
}
`,Qe=`package patternsforge;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import patternsforge.facade.ReleaseManager;
import patternsforge.model.DeploymentResult;
import patternsforge.strategy.BlueGreenStrategy;
import patternsforge.strategy.CanaryStrategy;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** Facade end-to-end: success promotes; failure rolls back and restores the snapshot. */
class ReleaseManagerTest {

    private ReleaseManager releaseManager;

    @BeforeEach
    void setUp() {
        DeploymentLoggerCleanup.clear();
        releaseManager = new ReleaseManager();
    }

    @Test
    void successfulDeploymentPromotesNextVersion() {
        releaseManager.setFailurePoint("NONE");

        DeploymentResult result = releaseManager.deploy();

        assertTrue(result.success());
        assertEquals("3.2.1", releaseManager.environment().version().toString());
        assertEquals("3.2.1", result.attemptedVersion().toString());
    }

    @Test
    void failingDeploymentRollsBackAndRestoresVersion() {
        releaseManager.setFailurePoint("TEST");

        DeploymentResult result = releaseManager.deploy();

        assertFalse(result.success());
        assertEquals("3.2.0", releaseManager.environment().version().toString(),
                "Memento snapshot restored the previous version");
        assertEquals("3.2.1", result.attemptedVersion().toString());
    }

    @Test
    void failingHealthCheckAlsoRollsBack() {
        releaseManager.setFailurePoint("HEALTH");

        DeploymentResult result = releaseManager.deploy();

        assertFalse(result.success());
        assertEquals("3.2.0", releaseManager.environment().version().toString());
    }

    @Test
    void strategyIsChangeableAtRuntime() {
        assertEquals("BLUE_GREEN", releaseManager.strategy().name());
        releaseManager.setStrategy(new CanaryStrategy());
        assertEquals("CANARY", releaseManager.strategy().name());
        releaseManager.setStrategy(new BlueGreenStrategy());
        assertEquals("BLUE_GREEN", releaseManager.strategy().name());
    }

    /** Minimal helper to keep the logger buffer clean between tests. */
    private static final class DeploymentLoggerCleanup {
        static void clear() {
            patternsforge.utils.DeploymentLogger.clear();
        }
    }
}
`,h=[{group:"root",path:"pom.xml",code:q,hint:"Java 17 · Maven · JUnit 5 · exec plugin"},{group:"root",path:"README.md",code:_,hint:"Project readme, pattern table, run instructions"},{group:"docs",path:"docs/class-diagram.puml",code:E,hint:"UML class diagram (PlantUML)"},{group:"docs",path:"docs/sequence-diagram.puml",code:C,hint:"Deploy & rollback sequence diagram"},{group:"docs",path:"docs/package-diagram.puml",code:R,hint:"Package structure diagram"},{group:"main",path:"main/PatternForgeApplication.java",code:K,hint:"Entry point — mvn exec:java"},{group:"controller",path:"controller/DeploymentController.java",code:z,hint:"Strategy + failure-point selection"},{group:"facade",path:"facade/ReleaseManager.java",code:Ge,hint:"★ Facade — deploy() drives everything"},{group:"model",path:"model/DeploymentStatus.java",code:$,hint:"Lifecycle enum"},{group:"model",path:"model/StageResult.java",code:X,hint:"Stage outcome record"},{group:"model",path:"model/EnvironmentSnapshot.java",code:W,hint:"★ Memento payload"},{group:"model",path:"model/ReleaseVersion.java",code:J,hint:"Semver value type"},{group:"model",path:"model/DeploymentEvent.java",code:Z,hint:"★ Observer payload"},{group:"model",path:"model/DeploymentResult.java",code:Q,hint:"Facade result record"},{group:"factory",path:"factory/StageFactory.java",code:ne,hint:"★ Factory Method declaration"},{group:"factory",path:"factory/StandardStageFactory.java",code:te,hint:"★ Factory Method implementation"},{group:"factory",path:"factory/DeploymentStage.java",code:ee,hint:"Abstract stage base (implements Command)"},{group:"builder",path:"builder/PipelineBuilder.java",code:re,hint:"★ Builder — fluent add*().build()"},{group:"builder",path:"builder/Pipeline.java",code:ae,hint:"Builder product"},{group:"command",path:"command/DeploymentCommand.java",code:oe,hint:"★ Command interface"},{group:"command",path:"command/CommandInvoker.java",code:se,hint:"★ Command history + reverse undoAll()"},{group:"command",path:"command/BuildCommand.java",code:le,hint:"Concrete stage command"},{group:"command",path:"command/TestCommand.java",code:pe,hint:"Concrete stage command"},{group:"command",path:"command/ProvisionCommand.java",code:ce,hint:"Concrete stage command"},{group:"command",path:"command/DeployCommand.java",code:me,hint:"Concrete stage command"},{group:"command",path:"command/VerifyCommand.java",code:ge,hint:"Concrete stage command"},{group:"command",path:"command/PromoteCommand.java",code:de,hint:"Concrete stage command"},{group:"command",path:"command/RollbackCommand.java",code:ue,hint:"Triggers RollbackManager"},{group:"command",path:"command/StageFailureException.java",code:ie,hint:"Failure control flow"},{group:"strategy",path:"strategy/DeploymentStrategy.java",code:ve,hint:"★ Strategy interface"},{group:"strategy",path:"strategy/BlueGreenStrategy.java",code:ye,hint:"Strategy implementation"},{group:"strategy",path:"strategy/RollingStrategy.java",code:fe,hint:"Strategy implementation"},{group:"strategy",path:"strategy/CanaryStrategy.java",code:he,hint:"Strategy implementation"},{group:"state",path:"state/DeploymentState.java",code:be,hint:"★ State interface"},{group:"state",path:"state/DeploymentContext.java",code:Se,hint:"★ State context — transitions"},{group:"state",path:"state/IdleState.java",code:xe,hint:"Concrete state"},{group:"state",path:"state/BuildingState.java",code:De,hint:"Concrete state"},{group:"state",path:"state/TestingState.java",code:ke,hint:"Concrete state"},{group:"state",path:"state/DeployingState.java",code:Ee,hint:"Covers provision/deploy/verify"},{group:"state",path:"state/HealthyState.java",code:Ce,hint:"Concrete state"},{group:"state",path:"state/FailedState.java",code:Re,hint:"Concrete state"},{group:"state",path:"state/RollbackState.java",code:je,hint:"Concrete state"},{group:"observer",path:"observer/DeploymentEngine.java",code:Oe,hint:"★ Subject + orchestrator"},{group:"observer",path:"observer/DeploymentObserver.java",code:Le,hint:"★ Observer interface"},{group:"observer",path:"observer/DashboardObserver.java",code:Ne,hint:"Observer implementation"},{group:"observer",path:"observer/EmailObserver.java",code:Me,hint:"Observer implementation"},{group:"observer",path:"observer/LogObserver.java",code:we,hint:"Observer implementation"},{group:"observer",path:"observer/SlackObserver.java",code:Pe,hint:"Observer implementation"},{group:"chain",path:"chain/FailureHandler.java",code:Ie,hint:"★ Chain base class"},{group:"chain",path:"chain/RetryHandler.java",code:Te,hint:"★ Link 1 — retry once"},{group:"chain",path:"chain/RollbackHandler.java",code:Be,hint:"★ Link 2 — undo + restore"},{group:"chain",path:"chain/EscalationHandler.java",code:Ae,hint:"★ Link 3 — page on-call"},{group:"chain",path:"chain/FailurePipeline.java",code:He,hint:"Assembles the chain"},{group:"chain",path:"chain/FailureContext.java",code:Fe,hint:"Failure payload"},{group:"memento",path:"memento/DeploymentCaretaker.java",code:Ue,hint:"★ Caretaker — save/restore"},{group:"memento",path:"memento/DeploymentMemento.java",code:Ve,hint:"★ Memento token"},{group:"service",path:"service/HealthMonitor.java",code:Ye,hint:"Health gate before promote"},{group:"service",path:"service/RollbackManager.java",code:qe,hint:"Coordinates undo + restore"},{group:"service",path:"service/NotificationService.java",code:_e,hint:"★ Observer registry"},{group:"utils",path:"utils/SimulatedEnvironment.java",code:Ke,hint:"K8s stand-in + failure injection"},{group:"utils",path:"utils/DeploymentLogger.java",code:ze,hint:"Colour console + test buffer"},{group:"test",path:"test/…/PipelineBuilderTest.java",code:Je,hint:"JUnit — builder order"},{group:"test",path:"test/…/StageFactoryTest.java",code:We,hint:"JUnit — factory types"},{group:"test",path:"test/…/CommandInvokerTest.java",code:Xe,hint:"JUnit — reverse-order undo"},{group:"test",path:"test/…/DeploymentCaretakerTest.java",code:$e,hint:"JUnit — snapshot restore"},{group:"test",path:"test/…/ObserverTest.java",code:Ze,hint:"JUnit — observer fan-out"},{group:"test",path:"test/…/ReleaseManagerTest.java",code:Qe,hint:"JUnit — end-to-end rollback"}],en=Array.from(new Set(h.map(n=>n.group))),nn=[{name:"class-diagram.puml",code:E,note:"Full class diagram — every pattern relationship"},{name:"sequence-diagram.puml",code:C,note:"Deploy + automatic rollback lifelines"},{name:"package-diagram.puml",code:R,note:"Package structure with dependencies"}];function o({x:n,y:a,w:i,h:t,name:s,stereo:l,dashed:p}){return e.jsxs("g",{children:[e.jsx("rect",{x:n,y:a,width:i,height:t,rx:3,fill:"var(--card)",stroke:l?"#a3a3a3":"#c9c9c9",strokeDasharray:p?"4 3":void 0}),l&&e.jsx("text",{x:n+i/2,y:a+14,textAnchor:"middle",fontSize:8.5,fill:"#868686",fontFamily:"inherit",children:l}),e.jsx("text",{x:n+i/2,y:l?a+28:a+18,textAnchor:"middle",fontSize:10.5,fontWeight:500,fill:"#1c1c1c",fontFamily:"ui-monospace, monospace",children:s})]})}const g="url(#pf-arrow)";function tn(){return e.jsxs("svg",{viewBox:"0 0 920 790",className:"h-auto w-full",role:"img","aria-label":"PatternForge simplified class diagram",children:[e.jsxs("defs",{children:[e.jsx("marker",{id:"pf-arrow",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"6.5",markerHeight:"6.5",orient:"auto-start-reverse",children:e.jsx("path",{d:"M 0 0 L 10 5 L 0 10 z",fill:"#8b8b8b"})}),e.jsx("marker",{id:"pf-arrow-dashed",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"6.5",markerHeight:"6.5",orient:"auto-start-reverse",children:e.jsx("path",{d:"M 0 0 L 10 5 L 0 10 z",fill:"#a3a3a3"})})]}),e.jsx(o,{x:60,y:16,w:120,h:36,name:"DeploymentController"}),e.jsx(o,{x:400,y:12,w:420,h:52,name:"ReleaseManager",stereo:"« Facade » — deploy()"}),e.jsx("line",{x1:180,y1:34,x2:392,y2:34,stroke:"#8b8b8b",markerEnd:g}),[{cx:120,cy:100},{cx:280,cy:100},{cx:460,cy:100},{cx:640,cy:100},{cx:830,cy:100}].map(n=>e.jsx("line",{x1:610,y1:66,x2:n.cx,y2:n.cy-6,stroke:"#a6a6a6",markerEnd:g},n.cx)),e.jsx(o,{x:60,y:100,w:120,h:44,name:"Pipeline"}),e.jsx(o,{x:220,y:100,w:120,h:44,name:"CommandInvoker"}),e.jsx(o,{x:395,y:100,w:130,h:44,name:"HealthMonitor"}),e.jsx(o,{x:565,y:100,w:150,h:44,name:"RollbackManager"}),e.jsx(o,{x:760,y:100,w:140,h:44,name:"NotificationService"}),[{cx:145,cy:170},{cx:355,cy:170},{cx:570,cy:170},{cx:795,cy:170}].map(n=>e.jsx("line",{x1:610,y1:66,x2:n.cx,y2:n.cy-6,stroke:"#a6a6a6",markerEnd:g},n.cx)),e.jsx(o,{x:60,y:170,w:170,h:44,name:"DeploymentCaretaker",stereo:"« Memento »"}),e.jsx(o,{x:270,y:170,w:170,h:44,name:"DeploymentStrategy",stereo:"« Strategy »"}),e.jsx(o,{x:480,y:170,w:180,h:44,name:"StageFactory",stereo:"« Factory Method »"}),e.jsx(o,{x:700,y:170,w:190,h:44,name:"DeploymentEngine",stereo:"« Subject / Observer »"}),e.jsx(o,{x:60,y:330,w:250,h:46,name:"DeploymentCommand",stereo:"« interface »"}),e.jsx(o,{x:60,y:404,w:250,h:46,name:"DeploymentStage",stereo:"« abstract »",dashed:!0}),e.jsx("line",{x1:185,y1:378,x2:185,y2:398,stroke:"#a3a3a3",strokeDasharray:"4 3",markerEnd:"url(#pf-arrow-dashed)"}),["BuildCommand","TestCommand","ProvisionCommand","DeployCommand","VerifyCommand","PromoteCommand","RollbackCommand"].map((n,a)=>e.jsxs("g",{children:[e.jsx("line",{x1:318,y1:427+a*48,x2:352,y2:427+a*48,stroke:"#a3a3a3",markerEnd:g}),e.jsx(o,{x:356,y:406+a*48,w:150,h:42,name:n})]},n)),e.jsx(o,{x:600,y:330,w:280,h:46,name:"DeploymentObserver",stereo:"« interface »"}),e.jsx("line",{x1:830,y1:146,x2:830,y2:324,stroke:"#a6a6a6",markerEnd:g}),[{name:"DashboardObserver",y:406},{name:"EmailObserver",y:454},{name:"LogObserver",y:502},{name:"SlackObserver",y:550}].map(n=>e.jsxs("g",{children:[e.jsx("line",{x1:738,y1:378,x2:738,y2:n.y-2,stroke:"#a6a6a6",markerEnd:g}),e.jsx(o,{x:600,y:n.y,w:276,h:40,name:n.name})]},n.name)),e.jsx("text",{x:60,y:768,fontSize:9.5,fill:"#8b8b8b",fontFamily:"ui-monospace, monospace",children:"simplified class map — State, Chain & Builder relationships omitted for legibility (see PlantUML tab)"})]})}const an=[{from:"Controller",to:"ReleaseManager",text:"deploy()",group:"success"},{from:"ReleaseManager",to:"ReleaseManager",text:"setStrategy(strategy) — Strategy",group:"success"},{from:"ReleaseManager",to:"DeploymentCaretaker",text:"save(environment.snapshot()) — Memento",group:"success"},{from:"ReleaseManager",to:"DeploymentEngine",text:"run(pipeline)",group:"success"},{from:"DeploymentEngine",to:"CommandInvoker",text:"execute(stage) × 5 — Command",group:"success",dashed:!0},{from:"CommandInvoker",to:"Build…VerifyCommand",text:"execute() / undo()",group:"success",dashed:!0},{from:"DeploymentEngine",to:"DeploymentContext",text:"transition(State) — State",group:"success"},{from:"NotificationService",to:"Observers",text:"broadcast(event) × 4 — Observer",group:"success",dashed:!0},{from:"DeploymentEngine",to:"HealthMonitor",text:"checkHealth(env, strategy)",group:"success"},{from:"HealthMonitor",to:"ReleaseManager",text:"healthy → promote  |  unhealthy ↓",group:"failure"},{from:"ReleaseManager",to:"FailurePipeline",text:"handle(failure) — Chain of Responsibility",group:"failure"},{from:"FailurePipeline",to:"RetryHandler",text:"retry once — fails again",group:"failure"},{from:"FailurePipeline",to:"RollbackManager",text:"rollback(stage)",group:"failure"},{from:"RollbackManager",to:"CommandInvoker",text:"undoAll() — reverse order",group:"failure"},{from:"RollbackManager",to:"DeploymentCaretaker",text:"restore() → snapshot",group:"failure"},{from:"FailurePipeline",to:"EscalationHandler",text:"page on-call engineer",group:"failure"},{from:"NotificationService",to:"Observers",text:"ROLLED_BACK + escalation",group:"failure"}];function rn(n){return n==="Controller"?"border-neutral-400 text-neutral-500":n==="ReleaseManager"?"border-neutral-900 text-neutral-900":"border-neutral-300 text-neutral-500"}function on(){return e.jsxs("div",{className:"overflow-x-auto rounded-md border border-border bg-card",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-border px-4 py-2.5",children:[e.jsx("span",{className:"eyebrow",children:"Deploy → verify → rollback sequence"}),e.jsxs("div",{className:"flex items-center gap-3 text-[10.5px] text-neutral-500",children:[e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-neutral-900"})," success path"]}),e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-red-600"})," failure path"]})]})]}),e.jsxs("div",{className:"min-w-[560px] px-4 py-4",children:[e.jsx("div",{className:"mb-4 flex items-end justify-between border-b border-border pb-3",children:["Controller","ReleaseManager","Caretaker","Invoker","Engine","HealthMonitor","Chain","Observers"].map(n=>e.jsx("span",{className:r("w-24 rounded-sm border bg-background px-1 py-1 text-center font-mono text-[9.5px] font-medium",rn(n)),children:n},n))}),e.jsx("ol",{className:"space-y-1",children:an.map((n,a)=>e.jsxs("li",{className:"flex items-center gap-3 py-1 text-[12px]",children:[e.jsx("span",{className:r("w-28 shrink-0 text-right font-mono text-[10.5px]",n.group==="failure"?"text-red-700":"text-neutral-600"),children:n.from}),e.jsxs("span",{className:"shrink-0 text-neutral-400",children:["—",n.dashed?" -":"—",">"]}),e.jsx("span",{className:r("w-32 shrink-0 font-mono text-[10.5px]",n.group==="failure"?"text-red-700":"text-neutral-800"),children:n.to}),e.jsx("span",{className:"min-w-0 flex-1 border-b border-dotted border-neutral-200 pb-0.5 text-[11.5px] text-neutral-500",children:n.text})]},a))})]})]})}const sn="abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|record|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while|null|true|false",ln=new RegExp(["(\\/\\*[\\s\\S]*?\\*\\/)","(\\/\\/[^\\n]*)",'("(?:[^"\\\\\\n]|\\\\.)*")',"('(?:[^'\\\\\\n]|\\\\.)*')","(@[A-Za-z_][\\w.]*)",`(\\b(?:${sn})\\b)`,"(\\b\\d[\\d_]*(?:\\.\\d+)?[fLdD]?\\b)"].join("|"),"g"),pn=["code-token-comment","code-token-comment","code-token-string","code-token-string","code-token-annotation","code-token-keyword","code-token-number"];function f(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function cn(n){let a="",i=0,t;const s=new RegExp(ln.source,"g");for(;(t=s.exec(n))!==null;){a+=f(n.slice(i,t.index));let l="code-token-keyword";for(let p=1;p<=7;p++)if(t[p]!==void 0){l=pn[p-1];break}a+=`<span class="${l}">${f(t[0])}</span>`,i=t.index+t[0].length}return a+=f(n.slice(i)),a}function mn(n){return n.endsWith(".java")}function gn(){const[n,a]=d.useState(()=>h[0]),[i,t]=d.useState(!1),s=d.useMemo(()=>mn(n.path)?cn(n.code):null,[n]),l=async()=>{try{await navigator.clipboard.writeText(n.code),t(!0),setTimeout(()=>t(!1),1400)}catch{}},p=n.code.split(`
`).length;return e.jsxs("div",{className:"grid gap-4 lg:grid-cols-12",children:[e.jsx("div",{className:"lg:col-span-4",children:e.jsxs("div",{className:"overflow-hidden rounded-md border border-border bg-card",children:[e.jsx("div",{className:"border-b border-border px-4 py-2.5",children:e.jsx("span",{className:"eyebrow",children:"patternforge/ — Maven project"})}),e.jsx("div",{className:"max-h-[520px] overflow-y-auto py-2",children:en.map(y=>e.jsxs("div",{children:[e.jsx("p",{className:"px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400",children:y}),h.filter(c=>c.group===y).map(c=>e.jsxs("button",{type:"button",onClick:()=>a(c),className:r("flex w-full items-center gap-2 px-4 py-1.5 text-left text-[12px] transition-colors",n.path===c.path?"bg-neutral-900 text-neutral-50":"text-neutral-600 hover:bg-neutral-900/[0.04] hover:text-neutral-900"),children:[e.jsx(B,{className:r("size-3.5 shrink-0",n.path===c.path?"text-neutral-400":"text-neutral-300")}),e.jsx("span",{className:"truncate font-mono text-[11px]",children:c.path})]},c.path))]},y))})]})}),e.jsx("div",{className:"lg:col-span-8",children:e.jsxs("div",{className:"overflow-hidden rounded-md border border-border bg-card",children:[e.jsxs("div",{className:"flex items-center justify-between gap-3 border-b border-border px-4 py-2.5",children:[e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"truncate font-mono text-[12px] font-medium text-neutral-900",children:n.path}),e.jsx("p",{className:"truncate text-[11px] text-neutral-500",children:n.hint})]}),e.jsxs("div",{className:"flex shrink-0 items-center gap-3",children:[e.jsxs("span",{className:"font-mono text-[10.5px] tabular text-neutral-400",children:[p," lines"]}),e.jsxs("button",{type:"button",onClick:l,className:"flex items-center gap-1 rounded-sm border border-border px-2 py-1 font-mono text-[10.5px] text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900",children:[i?e.jsx(D,{className:"size-3"}):e.jsx(k,{className:"size-3"}),i?"copied":"copy"]})]})]}),e.jsx("div",{className:"max-h-[520px] overflow-auto bg-neutral-950 px-4 py-3",children:s?e.jsx("pre",{className:"font-mono text-[11.5px] leading-[1.65] text-neutral-300",dangerouslySetInnerHTML:{__html:s}}):e.jsx("pre",{className:"whitespace-pre-wrap font-mono text-[11.5px] leading-[1.65] text-neutral-300",children:n.code})})]})})]})}const dn=["All","Creational","Structural","Behavioral"];function un({name:n,code:a,note:i}){const[t,s]=d.useState(!1),l=async()=>{try{await navigator.clipboard.writeText(a),s(!0),setTimeout(()=>s(!1),1400)}catch{}};return e.jsxs("div",{className:"overflow-hidden rounded-md border border-border bg-card",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-border px-4 py-2.5",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"font-mono text-[12px] font-medium text-neutral-900",children:["docs/",n]}),e.jsx("p",{className:"text-[11px] text-neutral-500",children:i})]}),e.jsxs("button",{type:"button",onClick:l,className:"flex items-center gap-1 rounded-sm border border-border px-2 py-1 font-mono text-[10.5px] text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900",children:[t?e.jsx(D,{className:"size-3"}):e.jsx(k,{className:"size-3"}),t?"copied":"copy"]})]}),e.jsx("pre",{className:"max-h-[420px] overflow-auto bg-neutral-950 px-4 py-3 font-mono text-[11.5px] leading-[1.6] text-neutral-300",children:a})]})}function vn(){return e.jsxs("div",{className:"overflow-hidden rounded-md border border-border bg-card",children:[e.jsx("div",{className:"border-b border-border px-4 py-2.5",children:e.jsx("span",{className:"eyebrow",children:"patternsforge/ — package structure"})}),e.jsx("div",{className:"divide-y divide-border",children:F.map(n=>e.jsxs("div",{className:"px-4 py-3",children:[e.jsxs("div",{className:"flex flex-wrap items-baseline gap-x-3 gap-y-1",children:[e.jsxs("span",{className:"font-mono text-[12.5px] font-semibold text-neutral-900",children:[n.name,"/"]}),e.jsx("span",{className:"font-mono text-[11px] text-neutral-500",children:n.classes.join(", ")})]}),e.jsx("p",{className:"mt-1 text-[11.5px] text-neutral-500",children:n.note})]},n.name))})]})}function En(){const[n,a]=d.useState("All"),i=d.useMemo(()=>n==="All"?S:S.filter(t=>t.category===n),[n]);return e.jsxs("div",{className:"min-h-screen bg-background text-foreground",children:[e.jsx("header",{className:"sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-sm",children:e.jsx("div",{className:"mx-auto flex h-14 max-w-6xl items-center justify-between px-6",children:e.jsxs("div",{className:"flex items-center gap-8",children:[e.jsxs(b,{to:"/",className:"flex items-baseline gap-2",children:[e.jsx("span",{className:"text-[15px] font-semibold tracking-tight",children:"PatternForge"}),e.jsx("span",{className:"hidden font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:inline",children:"architecture"})]}),e.jsxs("nav",{className:"hidden items-center gap-5 text-[13px] sm:flex",children:[e.jsx(b,{to:"/console",className:"text-neutral-500 transition-colors hover:text-neutral-900",children:"Console"}),e.jsx("span",{className:"font-medium text-neutral-900",children:"Architecture"})]})]})})}),e.jsxs("main",{className:"mx-auto max-w-6xl px-6 py-10",children:[e.jsx("p",{className:"eyebrow",children:"PatternForge · Java 17 + Maven"}),e.jsx("h1",{className:"mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-900",children:"Ten patterns. One self-healing pipeline."}),e.jsxs("p",{className:"mt-3 max-w-2xl text-[13.5px] leading-6 text-neutral-500",children:["The complete course deliverable: source code, UML diagrams, pattern explanations, a class responsibility table and JUnit tests — all browsable here, all living in the ",e.jsx("span",{className:"font-mono text-neutral-700",children:"patternforge/"})," Maven project."]}),e.jsxs(A,{defaultValue:"overview",className:"mt-10",children:[e.jsx(H,{className:"mb-8 h-auto flex-wrap justify-start gap-1 rounded-md border border-border bg-background p-1",children:[["overview","Overview"],["class","Class diagram"],["sequence","Sequence"],["patterns","Patterns"],["classes","Classes"],["source","Source code"],["plantuml","PlantUML"]].map(([t,s])=>e.jsx(V,{value:t,className:"h-8 rounded-sm px-3 text-[12px] data-[state=active]:bg-neutral-900 data-[state=active]:text-neutral-50 data-[state=active]:shadow-none",children:s},t))}),e.jsxs(m,{value:"overview",className:"grid gap-10 lg:grid-cols-12",children:[e.jsx("div",{className:"lg:col-span-7",children:e.jsx(vn,{})}),e.jsxs("div",{className:"lg:col-span-5",children:[e.jsx("h2",{className:"eyebrow",children:"Step-by-step execution"}),e.jsx("ol",{className:"mt-4 space-y-0",children:w.map((t,s)=>e.jsxs("li",{className:"relative pb-6 pl-8 last:pb-0",children:[e.jsx("span",{className:"absolute left-0 top-0 flex size-6 items-center justify-center rounded-full border border-neutral-300 font-mono text-[10.5px] font-semibold text-neutral-600",children:s+1}),e.jsxs("p",{className:"text-[13px] font-medium text-neutral-900",children:[t.step,e.jsx("span",{className:"ml-2 font-mono text-[10.5px] text-neutral-400",children:t.pattern})]}),e.jsx("p",{className:"mt-1 text-[12px] leading-5 text-neutral-500",children:t.detail})]},t.step))}),e.jsxs("p",{className:"mt-6 rounded-md border border-border bg-card px-4 py-3 text-[12px] leading-5 text-neutral-500",children:["Promotion is gated behind health verification by design — the 6th pipeline stage only runs after ",e.jsx("span",{className:"font-mono text-neutral-700",children:"HealthMonitor"})," passes."]})]})]}),e.jsx(m,{value:"class",children:e.jsx(tn,{})}),e.jsxs(m,{value:"sequence",children:[e.jsx(on,{}),e.jsxs("p",{className:"mt-4 text-[12px] leading-5 text-neutral-500",children:["The same flow, as PlantUML lifelines, lives in"," ",e.jsx("span",{className:"font-mono text-neutral-700",children:"docs/sequence-diagram.puml"})," (PlantUML tab)."]})]}),e.jsxs(m,{value:"patterns",children:[e.jsx("div",{className:"mb-6 flex flex-wrap items-center gap-2",children:dn.map(t=>e.jsx("button",{type:"button",onClick:()=>a(t),className:r("rounded-full border px-3 py-1 text-[11.5px] font-medium transition-colors",n===t?"border-neutral-900 bg-neutral-900 text-neutral-50":"border-border text-neutral-500 hover:border-neutral-400 hover:text-neutral-900"),children:t},t))}),e.jsx("div",{className:"grid gap-4 md:grid-cols-2",children:i.map(t=>e.jsxs("article",{className:"flex flex-col rounded-md border border-border bg-card p-5 transition-colors hover:border-neutral-300",children:[e.jsxs("div",{className:"flex items-baseline justify-between gap-3",children:[e.jsx("h3",{className:"text-[15px] font-semibold tracking-tight text-neutral-900",children:t.name}),e.jsx(j,{variant:"outline",className:r("border-transparent text-[10px]",t.category==="Creational"&&"bg-neutral-900 text-neutral-50",t.category==="Structural"&&"bg-neutral-200 text-neutral-800",t.category==="Behavioral"&&"bg-neutral-100 text-neutral-700"),children:t.category})]}),e.jsx("p",{className:"mt-2 text-[12.5px] leading-5 text-neutral-600",children:t.intent}),e.jsxs("dl",{className:"mt-4 space-y-2 border-t border-border pt-3 text-[11.5px] leading-5",children:[e.jsxs("div",{children:[e.jsx("dt",{className:"font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400",children:"Key classes"}),e.jsx("dd",{className:"mt-0.5 font-mono text-[11px] text-neutral-700",children:t.keyClasses})]}),e.jsxs("div",{children:[e.jsx("dt",{className:"font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400",children:"In the simulator"}),e.jsx("dd",{className:"mt-0.5 text-neutral-600",children:t.demo})]}),e.jsxs("div",{children:[e.jsx("dt",{className:"font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400",children:"Viva one-liner"}),e.jsx("dd",{className:"mt-0.5 text-neutral-600",children:t.viva})]})]})]},t.name))})]}),e.jsx(m,{value:"classes",children:e.jsx("div",{className:"overflow-x-auto rounded-md border border-border bg-card",children:e.jsxs(U,{children:[e.jsx(G,{children:e.jsxs(x,{className:"hover:bg-transparent",children:[e.jsx(u,{className:"w-[240px] font-mono text-[10.5px] uppercase tracking-[0.15em]",children:"Class"}),e.jsx(u,{className:"font-mono text-[10.5px] uppercase tracking-[0.15em]",children:"Package"}),e.jsx(u,{className:"font-mono text-[10.5px] uppercase tracking-[0.15em]",children:"Pattern role"}),e.jsx(u,{className:"font-mono text-[10.5px] uppercase tracking-[0.15em]",children:"Responsibility"})]})}),e.jsx(Y,{children:P.map(t=>e.jsxs(x,{className:"align-top",children:[e.jsx(v,{className:"font-mono text-[11.5px] font-medium text-neutral-900",children:t.className}),e.jsx(v,{className:"font-mono text-[11px] text-neutral-500",children:t.pkg}),e.jsx(v,{className:"text-[11.5px] text-neutral-700",children:t.pattern}),e.jsx(v,{className:"max-w-md text-[11.5px] leading-5 text-neutral-500",children:t.responsibility})]},t.className+t.pkg))})]})})}),e.jsx(m,{value:"source",children:e.jsx(gn,{})}),e.jsx(m,{value:"plantuml",className:"space-y-6",children:nn.map(t=>e.jsx(un,{...t},t.name))})]})]})]})}export{En as default};
