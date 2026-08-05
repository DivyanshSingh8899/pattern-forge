import { Link, useNavigate } from "react-router";
import { Loader2, Play, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useDeploymentEngine, type LifecycleId } from "@/hooks/use-deployment-engine";
import { FAILURE_MODES, STRATEGIES } from "@/lib/patternforge-data";
import { PipelineRail } from "@/components/console/PipelineRail";
import { SnapshotPanel } from "@/components/console/SnapshotPanel";
import { ChainPanel } from "@/components/console/ChainPanel";
import { FeedPanel } from "@/components/console/FeedPanel";
import { LogPanel } from "@/components/console/LogPanel";
import { cn } from "@/lib/utils";

const LIFECYCLE_META: Record<LifecycleId, { label: string; cls: string }> = {
  idle: { label: "IDLE", cls: "border-border text-neutral-500" },
  building: { label: "BUILDING", cls: "border-neutral-900 text-neutral-900" },
  testing: { label: "TESTING", cls: "border-neutral-900 text-neutral-900" },
  provisioning: { label: "PROVISIONING", cls: "border-neutral-900 text-neutral-900" },
  deploying: { label: "DEPLOYING", cls: "border-neutral-900 text-neutral-900" },
  verifying: { label: "VERIFYING", cls: "border-neutral-900 text-neutral-900" },
  promoting: { label: "PROMOTING", cls: "border-neutral-900 text-neutral-900" },
  healthy: { label: "HEALTHY", cls: "border-emerald-700 text-emerald-700" },
  failed: { label: "FAILED", cls: "border-red-700 text-red-700" },
  rolling_back: { label: "ROLLING BACK", cls: "border-amber-600 text-amber-700" },
  restored: { label: "ROLLED BACK", cls: "border-red-700 text-red-700" },
};

export default function Console() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const engine = useDeploymentEngine();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const lifecycle = LIFECYCLE_META[engine.lifecycle];
  const strategyMeta = STRATEGIES.find((s) => s.id === engine.strategy)!;
  const failureLabel =
    FAILURE_MODES.find((f) => f.id === engine.failureMode)?.label ?? "No failure";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* top bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-baseline gap-2">
              <span className="text-[15px] font-semibold tracking-tight">PatternForge</span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:inline">
                v1.0.0
              </span>
            </Link>
            <nav className="hidden items-center gap-5 text-[13px] sm:flex">
              <span className="font-medium text-neutral-900">Console</span>
              <Link to="/architecture" className="text-neutral-500 transition-colors hover:text-neutral-900">
                Architecture
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-[12px] text-neutral-500 md:inline">
              {user?.name ?? "operator"}
            </span>
            <Button variant="ghost" size="sm" className="h-8 text-[12px]" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* page header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Deployment console · release pipeline</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
              Deploy. Verify. Heal.
            </h1>
            <p className="mt-2 max-w-xl text-[13.5px] leading-6 text-neutral-500">
              A simulated self-healing orchestrator. Pick a rollout strategy and a failure
              point, then watch the Command invoker, the failure chain and the observers react.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Select
              value={engine.strategy}
              onValueChange={(v) => engine.setStrategy(v as typeof engine.strategy)}
              disabled={engine.running}
            >
              <SelectTrigger className="h-9 w-[150px] text-[12.5px]" size="default">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STRATEGIES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={engine.failureMode}
              onValueChange={(v) => engine.setFailureMode(v as typeof engine.failureMode)}
              disabled={engine.running}
            >
              <SelectTrigger className="h-9 w-[150px] text-[12.5px]" size="default">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FAILURE_MODES.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="h-9 gap-2 px-5"
              onClick={() => engine.deploy()}
              disabled={engine.running}
            >
              {engine.running ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Play className="size-4" />
              )}
              {engine.running ? "Deploying…" : `Deploy v${engine.nextTarget}`}
            </Button>
            <Button variant="ghost" size="icon" className="size-9" onClick={engine.reset} title="Reset">
              <RotateCcw className="size-4" />
            </Button>
          </div>
        </div>

        {/* status strip */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <Badge variant="outline" className={cn("font-mono text-[11px] tracking-wide", lifecycle.cls)}>
            {lifecycle.label}
          </Badge>
          <span className="font-mono text-[11.5px] tabular text-neutral-500">
            active v{engine.version}
          </span>
          <span className="h-3 w-px bg-border" />
          <span className="text-[11.5px] text-neutral-500">
            strategy: <span className="font-mono text-neutral-700">{strategyMeta.className}</span>
          </span>
          <span className="text-[11.5px] text-neutral-500">
            failure: <span className="font-mono text-neutral-700">{failureLabel}</span>
          </span>
          {engine.history.length > 0 && (
            <>
              <span className="h-3 w-px bg-border" />
              <div className="flex flex-wrap items-center gap-1.5">
                {engine.history.map((run) => (
                  <span
                    key={run.id}
                    className={cn(
                      "rounded-sm border px-1.5 py-0.5 font-mono text-[10.5px] tabular",
                      run.ok
                        ? "border-emerald-600/50 text-emerald-700"
                        : "border-red-600/50 text-red-700",
                    )}
                    title={`${run.strategy} · ${run.failure}`}
                  >
                    v{run.version}
                    {run.ok ? " ✓" : run.restoredTo ? ` → v${run.restoredTo} ✕` : " ✕"}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* strategy summary line */}
        <p className="mt-4 max-w-2xl text-[12.5px] leading-5 text-neutral-500">
          <span className="font-mono text-neutral-700">{strategyMeta.className}</span> —{" "}
          {strategyMeta.summary}
        </p>

        {/* main grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <PipelineRail stages={engine.stages} />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            <SnapshotPanel snapshot={engine.snapshot} />
            <ChainPanel chain={engine.chain} />
          </div>
          <div className="lg:col-span-7">
            <LogPanel logs={engine.logs} />
          </div>
          <div className="lg:col-span-5">
            <FeedPanel feed={engine.feed} />
          </div>
        </div>

        {/* footer note */}
        <p className="mt-10 border-t border-border pt-6 text-[11.5px] leading-5 text-neutral-400">
          Every panel maps to a Gang-of-Four pattern: pipeline = <span className="font-mono">Command + Factory Method</span>,
          snapshot = <span className="font-mono">Memento</span>, chain = <span className="font-mono">Chain of Responsibility</span>,
          feed = <span className="font-mono">Observer</span>, lifecycle badge = <span className="font-mono">State</span>,
          strategy selector = <span className="font-mono">Strategy</span>. The same flow runs in the Java project —{" "}
          <Link to="/architecture" className="text-neutral-700 underline underline-offset-2 hover:text-neutral-900">
            browse the architecture
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
