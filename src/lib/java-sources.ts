/**
 * Imports the real files of the Maven project under `patternforge/` (Vite `?raw`)
 * so the Architecture page renders the actual source — one source of truth.
 */

import pomXml from "../../patternforge/pom.xml?raw";
import readmeMd from "../../patternforge/README.md?raw";
import classDiagramPuml from "../../patternforge/docs/class-diagram.puml?raw";
import sequenceDiagramPuml from "../../patternforge/docs/sequence-diagram.puml?raw";
import packageDiagramPuml from "../../patternforge/docs/package-diagram.puml?raw";

import appMain from "../../patternforge/src/main/java/patternsforge/main/PatternForgeApplication.java?raw";
import controller from "../../patternforge/src/main/java/patternsforge/controller/DeploymentController.java?raw";

import mReleaseVersion from "../../patternforge/src/main/java/patternsforge/model/ReleaseVersion.java?raw";
import mEnvironmentSnapshot from "../../patternforge/src/main/java/patternsforge/model/EnvironmentSnapshot.java?raw";
import mStageResult from "../../patternforge/src/main/java/patternsforge/model/StageResult.java?raw";
import mDeploymentStatus from "../../patternforge/src/main/java/patternsforge/model/DeploymentStatus.java?raw";
import mDeploymentEvent from "../../patternforge/src/main/java/patternsforge/model/DeploymentEvent.java?raw";
import mDeploymentResult from "../../patternforge/src/main/java/patternsforge/model/DeploymentResult.java?raw";

import fDeploymentStage from "../../patternforge/src/main/java/patternsforge/factory/DeploymentStage.java?raw";
import fStageFactory from "../../patternforge/src/main/java/patternsforge/factory/StageFactory.java?raw";
import fStandardStageFactory from "../../patternforge/src/main/java/patternsforge/factory/StandardStageFactory.java?raw";

import bPipeline from "../../patternforge/src/main/java/patternsforge/builder/Pipeline.java?raw";
import bPipelineBuilder from "../../patternforge/src/main/java/patternsforge/builder/PipelineBuilder.java?raw";

import cDeploymentCommand from "../../patternforge/src/main/java/patternsforge/command/DeploymentCommand.java?raw";
import cStageFailureException from "../../patternforge/src/main/java/patternsforge/command/StageFailureException.java?raw";
import cCommandInvoker from "../../patternforge/src/main/java/patternsforge/command/CommandInvoker.java?raw";
import cBuild from "../../patternforge/src/main/java/patternsforge/command/BuildCommand.java?raw";
import cTest from "../../patternforge/src/main/java/patternsforge/command/TestCommand.java?raw";
import cProvision from "../../patternforge/src/main/java/patternsforge/command/ProvisionCommand.java?raw";
import cDeploy from "../../patternforge/src/main/java/patternsforge/command/DeployCommand.java?raw";
import cVerify from "../../patternforge/src/main/java/patternsforge/command/VerifyCommand.java?raw";
import cPromote from "../../patternforge/src/main/java/patternsforge/command/PromoteCommand.java?raw";
import cRollback from "../../patternforge/src/main/java/patternsforge/command/RollbackCommand.java?raw";

import aPrometheusClient from "../../patternforge/src/main/java/patternsforge/adapter/PrometheusClient.java?raw";
import aPrometheusAdapter from "../../patternforge/src/main/java/patternsforge/adapter/PrometheusHealthAdapter.java?raw";
import aCloudWatchClient from "../../patternforge/src/main/java/patternsforge/adapter/CloudWatchClient.java?raw";
import aCloudWatchAdapter from "../../patternforge/src/main/java/patternsforge/adapter/CloudWatchHealthAdapter.java?raw";

import sDeploymentStrategy from "../../patternforge/src/main/java/patternsforge/strategy/DeploymentStrategy.java?raw";
import sBlueGreen from "../../patternforge/src/main/java/patternsforge/strategy/BlueGreenStrategy.java?raw";
import sRolling from "../../patternforge/src/main/java/patternsforge/strategy/RollingStrategy.java?raw";
import sCanary from "../../patternforge/src/main/java/patternsforge/strategy/CanaryStrategy.java?raw";

import stDeploymentState from "../../patternforge/src/main/java/patternsforge/state/DeploymentState.java?raw";
import stDeploymentContext from "../../patternforge/src/main/java/patternsforge/state/DeploymentContext.java?raw";
import stIdle from "../../patternforge/src/main/java/patternsforge/state/IdleState.java?raw";
import stBuilding from "../../patternforge/src/main/java/patternsforge/state/BuildingState.java?raw";
import stTesting from "../../patternforge/src/main/java/patternsforge/state/TestingState.java?raw";
import stDeploying from "../../patternforge/src/main/java/patternsforge/state/DeployingState.java?raw";
import stHealthy from "../../patternforge/src/main/java/patternsforge/state/HealthyState.java?raw";
import stFailed from "../../patternforge/src/main/java/patternsforge/state/FailedState.java?raw";
import stRollback from "../../patternforge/src/main/java/patternsforge/state/RollbackState.java?raw";

import oDeploymentEngine from "../../patternforge/src/main/java/patternsforge/observer/DeploymentEngine.java?raw";
import oDeploymentObserver from "../../patternforge/src/main/java/patternsforge/observer/DeploymentObserver.java?raw";
import oDashboard from "../../patternforge/src/main/java/patternsforge/observer/DashboardObserver.java?raw";
import oEmail from "../../patternforge/src/main/java/patternsforge/observer/EmailObserver.java?raw";
import oLog from "../../patternforge/src/main/java/patternsforge/observer/LogObserver.java?raw";
import oSlack from "../../patternforge/src/main/java/patternsforge/observer/SlackObserver.java?raw";

import chFailureContext from "../../patternforge/src/main/java/patternsforge/chain/FailureContext.java?raw";
import chFailureHandler from "../../patternforge/src/main/java/patternsforge/chain/FailureHandler.java?raw";
import chRetry from "../../patternforge/src/main/java/patternsforge/chain/RetryHandler.java?raw";
import chRollback from "../../patternforge/src/main/java/patternsforge/chain/RollbackHandler.java?raw";
import chEscalate from "../../patternforge/src/main/java/patternsforge/chain/EscalationHandler.java?raw";
import chPipeline from "../../patternforge/src/main/java/patternsforge/chain/FailurePipeline.java?raw";

import meMemento from "../../patternforge/src/main/java/patternsforge/memento/DeploymentMemento.java?raw";
import meCaretaker from "../../patternforge/src/main/java/patternsforge/memento/DeploymentCaretaker.java?raw";

import faReleaseManager from "../../patternforge/src/main/java/patternsforge/facade/ReleaseManager.java?raw";

import svHealthChecker from "../../patternforge/src/main/java/patternsforge/service/HealthChecker.java?raw";
import svHealthStatus from "../../patternforge/src/main/java/patternsforge/service/HealthStatus.java?raw";
import svHealthMonitor from "../../patternforge/src/main/java/patternsforge/service/HealthMonitor.java?raw";
import svRollbackManager from "../../patternforge/src/main/java/patternsforge/service/RollbackManager.java?raw";
import svNotificationService from "../../patternforge/src/main/java/patternsforge/service/NotificationService.java?raw";

import uSimulatedEnvironment from "../../patternforge/src/main/java/patternsforge/utils/SimulatedEnvironment.java?raw";
import uDeploymentLogger from "../../patternforge/src/main/java/patternsforge/utils/DeploymentLogger.java?raw";

import tPipelineBuilder from "../../patternforge/src/test/java/patternsforge/PipelineBuilderTest.java?raw";
import tStageFactory from "../../patternforge/src/test/java/patternsforge/StageFactoryTest.java?raw";
import tCommandInvoker from "../../patternforge/src/test/java/patternsforge/CommandInvokerTest.java?raw";
import tCaretaker from "../../patternforge/src/test/java/patternsforge/DeploymentCaretakerTest.java?raw";
import tObserver from "../../patternforge/src/test/java/patternsforge/ObserverTest.java?raw";
import tReleaseManager from "../../patternforge/src/test/java/patternsforge/ReleaseManagerTest.java?raw";
import tAdapter from "../../patternforge/src/test/java/patternsforge/HealthCheckerAdapterTest.java?raw";
import tStrategy from "../../patternforge/src/test/java/patternsforge/StrategyTest.java?raw";

export interface JavaSource {
  /** Group label shown in the file tree. */
  group: string;
  /** Display path. */
  path: string;
  code: string;
  /** Suggested "why to read this" hint. */
  hint: string;
}

export const JAVA_SOURCES: JavaSource[] = [
  { group: "root", path: "pom.xml", code: pomXml, hint: "Java 17 · Maven · JUnit 5 · exec plugin" },
  { group: "root", path: "README.md", code: readmeMd, hint: "Project readme, pattern table, run instructions" },
  { group: "docs", path: "docs/class-diagram.puml", code: classDiagramPuml, hint: "UML class diagram (PlantUML)" },
  { group: "docs", path: "docs/sequence-diagram.puml", code: sequenceDiagramPuml, hint: "Deploy & rollback sequence diagram" },
  { group: "docs", path: "docs/package-diagram.puml", code: packageDiagramPuml, hint: "Package structure diagram" },
  { group: "main", path: "main/PatternForgeApplication.java", code: appMain, hint: "Entry point — mvn exec:java" },
  { group: "controller", path: "controller/DeploymentController.java", code: controller, hint: "Strategy + failure-point selection" },
  { group: "facade", path: "facade/ReleaseManager.java", code: faReleaseManager, hint: "★ Facade — deploy() drives everything" },
  { group: "adapter", path: "adapter/PrometheusClient.java", code: aPrometheusClient, hint: "Adaptee — incompatible vendor API (metrics)" },
  { group: "adapter", path: "adapter/PrometheusHealthAdapter.java", code: aPrometheusAdapter, hint: "★ Adapter — implements HealthChecker" },
  { group: "adapter", path: "adapter/CloudWatchClient.java", code: aCloudWatchClient, hint: "Adaptee — incompatible vendor API (lookups)" },
  { group: "adapter", path: "adapter/CloudWatchHealthAdapter.java", code: aCloudWatchAdapter, hint: "★ Adapter — implements HealthChecker" },
  { group: "model", path: "model/DeploymentStatus.java", code: mDeploymentStatus, hint: "Lifecycle enum" },
  { group: "model", path: "model/StageResult.java", code: mStageResult, hint: "Stage outcome record" },
  { group: "model", path: "model/EnvironmentSnapshot.java", code: mEnvironmentSnapshot, hint: "★ Memento payload" },
  { group: "model", path: "model/ReleaseVersion.java", code: mReleaseVersion, hint: "Semver value type" },
  { group: "model", path: "model/DeploymentEvent.java", code: mDeploymentEvent, hint: "★ Observer payload" },
  { group: "model", path: "model/DeploymentResult.java", code: mDeploymentResult, hint: "Facade result record" },
  { group: "factory", path: "factory/StageFactory.java", code: fStageFactory, hint: "★ Factory Method declaration" },
  { group: "factory", path: "factory/StandardStageFactory.java", code: fStandardStageFactory, hint: "★ Factory Method implementation" },
  { group: "factory", path: "factory/DeploymentStage.java", code: fDeploymentStage, hint: "Abstract stage base (implements Command)" },
  { group: "builder", path: "builder/PipelineBuilder.java", code: bPipelineBuilder, hint: "★ Builder — fluent add*().build()" },
  { group: "builder", path: "builder/Pipeline.java", code: bPipeline, hint: "Builder product" },
  { group: "command", path: "command/DeploymentCommand.java", code: cDeploymentCommand, hint: "★ Command interface" },
  { group: "command", path: "command/CommandInvoker.java", code: cCommandInvoker, hint: "★ Command history + reverse undoAll()" },
  { group: "command", path: "command/BuildCommand.java", code: cBuild, hint: "Concrete stage command" },
  { group: "command", path: "command/TestCommand.java", code: cTest, hint: "Concrete stage command" },
  { group: "command", path: "command/ProvisionCommand.java", code: cProvision, hint: "Concrete stage command" },
  { group: "command", path: "command/DeployCommand.java", code: cDeploy, hint: "Concrete stage command" },
  { group: "command", path: "command/VerifyCommand.java", code: cVerify, hint: "Concrete stage command" },
  { group: "command", path: "command/PromoteCommand.java", code: cPromote, hint: "Concrete stage command" },
  { group: "command", path: "command/RollbackCommand.java", code: cRollback, hint: "Triggers RollbackManager" },
  { group: "command", path: "command/StageFailureException.java", code: cStageFailureException, hint: "Failure control flow" },
  { group: "strategy", path: "strategy/DeploymentStrategy.java", code: sDeploymentStrategy, hint: "★ Strategy interface" },
  { group: "strategy", path: "strategy/BlueGreenStrategy.java", code: sBlueGreen, hint: "Strategy implementation" },
  { group: "strategy", path: "strategy/RollingStrategy.java", code: sRolling, hint: "Strategy implementation" },
  { group: "strategy", path: "strategy/CanaryStrategy.java", code: sCanary, hint: "Strategy implementation" },
  { group: "state", path: "state/DeploymentState.java", code: stDeploymentState, hint: "★ State interface" },
  { group: "state", path: "state/DeploymentContext.java", code: stDeploymentContext, hint: "★ State context — transitions" },
  { group: "state", path: "state/IdleState.java", code: stIdle, hint: "Concrete state" },
  { group: "state", path: "state/BuildingState.java", code: stBuilding, hint: "Concrete state" },
  { group: "state", path: "state/TestingState.java", code: stTesting, hint: "Concrete state" },
  { group: "state", path: "state/DeployingState.java", code: stDeploying, hint: "Covers provision/deploy/verify" },
  { group: "state", path: "state/HealthyState.java", code: stHealthy, hint: "Concrete state" },
  { group: "state", path: "state/FailedState.java", code: stFailed, hint: "Concrete state" },
  { group: "state", path: "state/RollbackState.java", code: stRollback, hint: "Concrete state" },
  { group: "observer", path: "observer/DeploymentEngine.java", code: oDeploymentEngine, hint: "★ Subject + orchestrator" },
  { group: "observer", path: "observer/DeploymentObserver.java", code: oDeploymentObserver, hint: "★ Observer interface" },
  { group: "observer", path: "observer/DashboardObserver.java", code: oDashboard, hint: "Observer implementation" },
  { group: "observer", path: "observer/EmailObserver.java", code: oEmail, hint: "Observer implementation" },
  { group: "observer", path: "observer/LogObserver.java", code: oLog, hint: "Observer implementation" },
  { group: "observer", path: "observer/SlackObserver.java", code: oSlack, hint: "Observer implementation" },
  { group: "chain", path: "chain/FailureHandler.java", code: chFailureHandler, hint: "★ Chain base class" },
  { group: "chain", path: "chain/RetryHandler.java", code: chRetry, hint: "★ Link 1 — retry once" },
  { group: "chain", path: "chain/RollbackHandler.java", code: chRollback, hint: "★ Link 2 — undo + restore" },
  { group: "chain", path: "chain/EscalationHandler.java", code: chEscalate, hint: "★ Link 3 — page on-call" },
  { group: "chain", path: "chain/FailurePipeline.java", code: chPipeline, hint: "Assembles the chain" },
  { group: "chain", path: "chain/FailureContext.java", code: chFailureContext, hint: "Failure payload" },
  { group: "memento", path: "memento/DeploymentCaretaker.java", code: meCaretaker, hint: "★ Caretaker — save/restore" },
  { group: "memento", path: "memento/DeploymentMemento.java", code: meMemento, hint: "★ Memento token" },
  { group: "service", path: "service/HealthChecker.java", code: svHealthChecker, hint: "★ Adapter target — vendor-agnostic interface" },
  { group: "service", path: "service/HealthStatus.java", code: svHealthStatus, hint: "Probe outcome enum" },
  { group: "service", path: "service/HealthMonitor.java", code: svHealthMonitor, hint: "Health gate — depends only on HealthChecker" },
  { group: "service", path: "service/RollbackManager.java", code: svRollbackManager, hint: "Coordinates undo + restore" },
  { group: "service", path: "service/NotificationService.java", code: svNotificationService, hint: "★ Observer registry" },
  { group: "utils", path: "utils/SimulatedEnvironment.java", code: uSimulatedEnvironment, hint: "K8s stand-in + failure injection" },
  { group: "utils", path: "utils/DeploymentLogger.java", code: uDeploymentLogger, hint: "Colour console + test buffer" },
  { group: "test", path: "test/…/PipelineBuilderTest.java", code: tPipelineBuilder, hint: "JUnit — builder order" },
  { group: "test", path: "test/…/StageFactoryTest.java", code: tStageFactory, hint: "JUnit — factory types" },
  { group: "test", path: "test/…/CommandInvokerTest.java", code: tCommandInvoker, hint: "JUnit — reverse-order undo" },
  { group: "test", path: "test/…/DeploymentCaretakerTest.java", code: tCaretaker, hint: "JUnit — snapshot restore" },
  { group: "test", path: "test/…/ObserverTest.java", code: tObserver, hint: "JUnit — observer fan-out" },
  { group: "test", path: "test/…/ReleaseManagerTest.java", code: tReleaseManager, hint: "JUnit — end-to-end rollback" },
  { group: "test", path: "test/…/HealthCheckerAdapterTest.java", code: tAdapter, hint: "JUnit — adapter swap + vendor translation" },
  { group: "test", path: "test/…/StrategyTest.java", code: tStrategy, hint: "JUnit — runtime strategy switching" },
];

export const JAVA_GROUPS: string[] = Array.from(
  new Set(JAVA_SOURCES.map((s) => s.group)),
);

export interface PlantUmlFile {
  name: string;
  code: string;
  note: string;
}

export const PLANTUML_FILES: PlantUmlFile[] = [
  { name: "class-diagram.puml", code: classDiagramPuml, note: "Full class diagram — every pattern relationship" },
  { name: "sequence-diagram.puml", code: sequenceDiagramPuml, note: "Deploy + automatic rollback lifelines" },
  { name: "package-diagram.puml", code: packageDiagramPuml, note: "Package structure with dependencies" },
];
