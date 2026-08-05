import { useCallback, useEffect, useRef, useState } from "react";
import {
  STAGES,
  STRATEGIES,
  type FailureMode,
  type StageId,
  type StrategyId,
} from "@/lib/patternforge-data";

export type LifecycleId =
  | "idle"
  | "building"
  | "testing"
  | "provisioning"
  | "deploying"
  | "verifying"
  | "promoting"
  | "healthy"
  | "failed"
  | "rolling_back"
  | "restored";

export type StageStatus =
  | "idle"
  | "running"
  | "retrying"
  | "passed"
  | "failed"
  | "undone"
  | "skipped";

export type OverallState = "idle" | "running" | "healthy" | "restored";

export interface StageState {
  id: StageId;
  name: string;
  command: string;
  status: StageStatus;
  durationMs: number;
}

export type LogLevel = "info" | "ok" | "warn" | "err" | "muted";

export interface LogLine {
  id: number;
  time: string;
  level: LogLevel;
  text: string;
}

export type FeedChannel = "dashboard" | "log" | "email" | "slack";
export type FeedKind =
  | "state"
  | "stage"
  | "health"
  | "failure"
  | "retry"
  | "rollback"
  | "restore"
  | "escalate"
  | "promote";

export interface FeedItem {
  id: number;
  time: string;
  channel: FeedChannel;
  kind: FeedKind;
  text: string;
}

export interface SnapshotState {
  version: string;
  config: [string, string][];
  envVars: [string, string][];
  timestamp: string;
  restored: boolean;
}

export interface ChainStep {
  handler: "RetryHandler" | "RollbackHandler" | "EscalationHandler";
  state: "pending" | "active" | "done" | "skipped";
  detail: string;
}

export interface RunRecord {
  id: number;
  version: string;
  ok: boolean;
  strategy: string;
  failure: string;
  restoredTo: string | null;
}

const RUN_STAGES: StageId[] = ["build", "test", "provision", "deploy", "verify"];

const LIFECYCLE_FOR: Record<StageId, LifecycleId> = {
  build: "building",
  test: "testing",
  provision: "provisioning",
  deploy: "deploying",
  verify: "verifying",
  promote: "promoting",
};

const BASE_DURATION: Record<StageId, number> = {
  build: 1050,
  test: 1350,
  provision: 950,
  deploy: 1150,
  verify: 1250,
  promote: 800,
};

const SNAPSHOT_CONFIG: [string, string][] = [
  ["replicas", "3"],
  ["memory", "512m"],
  ["cpu", "250m"],
  ["registry", "registry.patternforge.local"],
];

const SNAPSHOT_ENV: [string, string][] = [
  ["DATABASE_URL", "postgres://db.patternforge.local/forge"],
  ["CACHE_URL", "redis://cache.patternforge.local/0"],
  ["LOG_LEVEL", "INFO"],
];

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function now(): string {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

function nextPatch(version: string): string {
  const [maj, min, pat] = version.split(".").map(Number);
  return `${maj}.${min}.${pat + 1}`;
}

const INITIAL_STAGES: StageState[] = STAGES.map((s) => ({
  id: s.id,
  name: s.name,
  command: s.command,
  status: "idle",
  durationMs: 0,
}));

const INITIAL_CHAIN: ChainStep[] = [
  { handler: "RetryHandler", state: "pending", detail: "Retries the failed stage once" },
  { handler: "RollbackHandler", state: "pending", detail: "Undoes commands in reverse order + restores snapshot" },
  { handler: "EscalationHandler", state: "pending", detail: "Pages the on-call engineer" },
];

let idCounter = 0;
const nextId = () => ++idCounter;

export function useDeploymentEngine() {
  const [version, setVersion] = useState("3.2.0");
  const [strategy, setStrategy] = useState<StrategyId>("blue-green");
  const [failureMode, setFailureMode] = useState<FailureMode>("none");

  const [lifecycle, setLifecycle] = useState<LifecycleId>("idle");
  const [overall, setOverall] = useState<OverallState>("idle");
  const [stages, setStages] = useState<StageState[]>(INITIAL_STAGES);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [snapshot, setSnapshot] = useState<SnapshotState | null>(null);
  const [chain, setChain] = useState<ChainStep[]>(INITIAL_CHAIN);
  const [history, setHistory] = useState<RunRecord[]>([]);
  const [currentRun, setCurrentRun] = useState<RunRecord | null>(null);
  const [running, setRunning] = useState(false);

  const runningRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const pushLog = useCallback((level: LogLevel, text: string) => {
    setLogs((prev) => {
      const next = [...prev, { id: nextId(), time: now(), level, text }];
      return next.length > 300 ? next.slice(next.length - 300) : next;
    });
  }, []);

  const pushFeed = useCallback(
    (channel: FeedChannel, kind: FeedKind, text: string) => {
      setFeed((prev) => {
        const next = [...prev, { id: nextId(), time: now(), channel, kind, text }];
        return next.length > 120 ? next.slice(next.length - 120) : next;
      });
    },
    [],
  );

  const setStage = useCallback((id: StageId, status: StageStatus, durationMs?: number) => {
    setStages((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status, durationMs: durationMs ?? s.durationMs }
          : s,
      ),
    );
  }, []);

  const setChainStep = useCallback(
    (handler: ChainStep["handler"], state: ChainStep["state"], detail: string) => {
      setChain((prev) =>
        prev.map((c) => (c.handler === handler ? { ...c, state, detail } : c)),
      );
    },
    [],
  );

  const deploy = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setRunning(true);

    const strategyMeta = STRATEGIES.find((s) => s.id === strategy)!;
    const target = nextPatch(version);
    const randomFail =
      failureMode === "random"
        ? (RUN_STAGES[Math.floor(Math.random() * RUN_STAGES.length)] as StageId)
        : null;

    // ---- reset for a new run (Builder + Factory assemble the pipeline) ----
    setLifecycle("building");
    setOverall("running");
    setStages(INITIAL_STAGES.map((s) => ({ ...s })));
    setLogs([]);
    setFeed([]);
    setChain(INITIAL_CHAIN.map((c) => ({ ...c })));
    setSnapshot({
      version,
      config: SNAPSHOT_CONFIG,
      envVars: SNAPSHOT_ENV,
      timestamp: now(),
      restored: false,
    });
    setCurrentRun(null);

    pushLog("muted", `>>> [Builder] pipeline assembled: build -> test -> provision -> deploy -> verify`);
    pushLog("info", `>>> [Memento] snapshot saved: v${version} | 4 config keys | 3 env vars @ ${now()}`);
    pushLog("info", `Deployment v${target} started (strategy: ${strategyMeta.className})`);
    pushFeed("dashboard", "state", `Deployment v${target} started via ${strategyMeta.className}`);

    const executed: StageId[] = [];
    let failedStage: StageId | null = null;
    let failedAtHealth = false;

    for (const id of RUN_STAGES) {
      const stage = STAGES.find((s) => s.id === id)!;
      if (!mountedRef.current) return;
      setLifecycle(LIFECYCLE_FOR[id]);
      pushLog("info", `[${stage.name.toUpperCase()}] start  ${strategyMeta.phrases[id] ?? stage.description}`);
      pushFeed("dashboard", "stage", `Stage ${stage.name} started`);

      const shouldFail =
        failureMode === id || (failureMode === "random" && randomFail === id);

      if (shouldFail) {
        await sleep(400);
        if (!mountedRef.current) return;
        setStage(id, "failed");
        pushLog("err", `[${stage.name.toUpperCase()}] FAILED: injected failure at stage ${stage.name}`);
        pushFeed("email", "failure", `Deployment failed at ${stage.name} — initiating failure pipeline`);
        failedStage = id;
        break;
      }

      setStage(id, "running");
      const duration = Math.round(BASE_DURATION[id] * strategyMeta.durationFactor);
      await sleep(duration);
      if (!mountedRef.current) return;
      setStage(id, "passed", duration);
      executed.push(id);
      pushLog("ok", `[${stage.name.toUpperCase()}] ok     completed in ${duration}ms`);
    }

    // ---- health verification ----
    if (!failedStage) {
      setLifecycle("verifying");
      pushLog("info", `>>> [HealthMonitor] probing v${target} (${strategyMeta.className})`);
      if (failureMode === "health") {
        pushLog("err", `[HealthMonitor] probe #2 (readiness) timed out — UNHEALTHY`);
        pushFeed("email", "health", `Health verification FAILED for v${target}`);
        failedAtHealth = true;
      } else {
        pushLog("ok", `[HealthMonitor] 3/3 probes passed — healthy`);
      }
    }

    // ================= FAILURE CHAIN (Chain of Responsibility) =================
    if (failedStage || failedAtHealth) {
      setChainStep("RetryHandler", "active", "Evaluating failure…");
      await sleep(350);

      if (failedAtHealth) {
        setChainStep("RetryHandler", "skipped", "Health failures are not retried — passing downstream");
        pushLog("warn", "RetryHandler cannot handle — passing to RollbackHandler");
      } else if (failedStage) {
        setChainStep("RetryHandler", "active", `Retrying ${failedStage}…`);
        setStage(failedStage, "retrying");
        pushLog("warn", `RetryHandler retrying [${failedStage.toUpperCase()}] (attempt 2)`);
        await sleep(500);
        if (!mountedRef.current) return;
        // failure mode is still armed, so the retry fails too
        setStage(failedStage, "failed");
        pushLog("err", "RetryHandler: retry failed — passing to next handler");
        setChainStep("RetryHandler", "done", "Retry failed — request passed downstream");
      }

      await sleep(300);
      if (!mountedRef.current) return;
      setChainStep("RollbackHandler", "active", "Undoing executed commands in reverse order…");
      setLifecycle("rolling_back");
      pushFeed("email", "rollback", `Rollback initiated — undoing ${executed.length} executed stage(s)`);
      pushLog("warn", `=== ROLLBACK initiated (failure at ${failedStage ?? "HEALTH_CHECK"}) ===`);
      pushLog("warn", `Rolling back ${executed.length} executed command(s) in reverse order`);

      for (let i = executed.length - 1; i >= 0; i--) {
        const id = executed[i];
        await sleep(260);
        if (!mountedRef.current) return;
        setStage(id, "undone");
        pushLog("warn", `undo ${STAGES.find((s) => s.id === id)!.name.toUpperCase()} …`);
      }

      // ---- Memento restore ----
      await sleep(300);
      if (!mountedRef.current) return;
      setSnapshot((prev) => (prev ? { ...prev, restored: true } : prev));
      pushLog("err", `SNAPSHOT RESTORED — environment reverted to v${version}`);
      pushFeed("dashboard", "restore", `Snapshot restored — environment reverted to v${version}`);
      setChainStep("RollbackHandler", "done", "Snapshot restored via DeploymentCaretaker");

      // ---- Escalation ----
      await sleep(300);
      if (!mountedRef.current) return;
      setChainStep("EscalationHandler", "active", "Notifying on-call engineer…");
      pushFeed("slack", "escalate", `#deployments — escalated to on-call: ${failedStage ?? "health check"} failed, v${target} rolled back`);
      pushFeed("email", "escalate", `Escalation: deployment v${target} failed — rolled back to v${version}`);
      pushLog("err", `EscalationHandler: escalating to on-call engineer for stage [${failedStage ?? "HEALTH_CHECK"}]`);
      await sleep(250);
      if (!mountedRef.current) return;
      setChainStep("EscalationHandler", "done", "On-call engineer notified");

      setLifecycle("restored");
      setOverall("restored");
      const record: RunRecord = {
        id: nextId(),
        version: target,
        ok: false,
        strategy: strategyMeta.name,
        failure: failedStage ?? "health",
        restoredTo: version,
      };
      setCurrentRun(record);
      setHistory((prev) => [record, ...prev].slice(0, 12));
      pushLog("err", `=== DEPLOYMENT FAILED — restored to v${version} ===`);

      runningRef.current = false;
      setRunning(false);
      return;
    }

    // ================= SUCCESS: promote =================
    setLifecycle("promoting");
    const promote = STAGES.find((s) => s.id === "promote")!;
    pushLog("info", `[PROMOTE] start  ${strategyMeta.phrases.promote ?? promote.description}`);
    setStage("promote", "running");
    await sleep(BASE_DURATION.promote);
    if (!mountedRef.current) return;
    setStage("promote", "passed", BASE_DURATION.promote);
    pushLog("ok", `[PROMOTE] ok     v${target} promoted to stable`);

    setLifecycle("healthy");
    setOverall("healthy");
    setVersion(target);
    pushFeed("dashboard", "promote", `Release v${target} is LIVE (promoted)`);
    pushFeed("slack", "promote", `#deployments — v${target} promoted via ${strategyMeta.name}`);
    pushLog("ok", `=== DEPLOYMENT SUCCESSFUL — release v${target} live via ${strategyMeta.name} ===`);

    const record: RunRecord = {
      id: nextId(),
      version: target,
      ok: true,
      strategy: strategyMeta.name,
      failure: "none",
      restoredTo: null,
    };
    setCurrentRun(record);
    setHistory((prev) => [record, ...prev].slice(0, 12));

    runningRef.current = false;
    setRunning(false);
  }, [strategy, failureMode, version, pushLog, pushFeed, setStage, setChainStep]);

  const reset = useCallback(() => {
    setLifecycle("idle");
    setOverall("idle");
    setStages(INITIAL_STAGES.map((s) => ({ ...s })));
    setLogs([]);
    setFeed([]);
    setSnapshot(null);
    setChain(INITIAL_CHAIN.map((c) => ({ ...c })));
    setHistory([]);
    setCurrentRun(null);
    setVersion("3.2.0");
  }, []);

  return {
    lifecycle,
    overall,
    stages,
    logs,
    feed,
    snapshot,
    chain,
    history,
    currentRun,
    running,
    version,
    nextTarget: nextPatch(version),
    strategy,
    failureMode,
    setStrategy,
    setFailureMode,
    deploy,
    reset,
  };
}
