import { cn } from "@/lib/utils";

interface Msg {
  from: string;
  to: string;
  text: string;
  group?: "success" | "failure";
  dashed?: boolean;
}

const MESSAGES: Msg[] = [
  { from: "Controller", to: "ReleaseManager", text: "deploy()", group: "success" },
  { from: "ReleaseManager", to: "ReleaseManager", text: "setStrategy(strategy) — Strategy", group: "success" },
  { from: "ReleaseManager", to: "DeploymentCaretaker", text: "save(environment.snapshot()) — Memento", group: "success" },
  { from: "ReleaseManager", to: "DeploymentEngine", text: "run(pipeline)", group: "success" },
  { from: "DeploymentEngine", to: "CommandInvoker", text: "execute(stage) × 5 — Command", group: "success", dashed: true },
  { from: "CommandInvoker", to: "Build…VerifyCommand", text: "execute() / undo()", group: "success", dashed: true },
  { from: "DeploymentEngine", to: "DeploymentContext", text: "transition(State) — State", group: "success" },
  { from: "NotificationService", to: "Observers", text: "broadcast(event) × 4 — Observer", group: "success", dashed: true },
  { from: "DeploymentEngine", to: "HealthMonitor", text: "checkHealth(env, strategy)", group: "success" },
  { from: "HealthMonitor", to: "ReleaseManager", text: "healthy → promote  |  unhealthy ↓", group: "failure" },
  { from: "ReleaseManager", to: "FailurePipeline", text: "handle(failure) — Chain of Responsibility", group: "failure" },
  { from: "FailurePipeline", to: "RetryHandler", text: "retry once — fails again", group: "failure" },
  { from: "FailurePipeline", to: "RollbackManager", text: "rollback(stage)", group: "failure" },
  { from: "RollbackManager", to: "CommandInvoker", text: "undoAll() — reverse order", group: "failure" },
  { from: "RollbackManager", to: "DeploymentCaretaker", text: "restore() → snapshot", group: "failure" },
  { from: "FailurePipeline", to: "EscalationHandler", text: "page on-call engineer", group: "failure" },
  { from: "NotificationService", to: "Observers", text: "ROLLED_BACK + escalation", group: "failure" },
];

function actorCls(name: string): string {
  if (name === "Controller") return "border-neutral-400 text-neutral-500";
  if (name === "ReleaseManager") return "border-neutral-900 text-neutral-900";
  return "border-neutral-300 text-neutral-500";
}

export function SequenceDiagram() {
  return (
    <div className="overflow-x-auto rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="eyebrow">Deploy → verify → rollback sequence</span>
        <div className="flex items-center gap-3 text-[10.5px] text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" /> success path
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600" /> failure path
          </span>
        </div>
      </div>
      <div className="min-w-[560px] px-4 py-4">
        <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
          {["Controller", "ReleaseManager", "Caretaker", "Invoker", "Engine", "HealthMonitor", "Chain", "Observers"].map(
            (a) => (
              <span
                key={a}
                className={cn(
                  "w-24 rounded-sm border bg-background px-1 py-1 text-center font-mono text-[9.5px] font-medium",
                  actorCls(a),
                )}
              >
                {a}
              </span>
            ),
          )}
        </div>
        <ol className="space-y-1">
          {MESSAGES.map((m, i) => (
            <li key={i} className="flex items-center gap-3 py-1 text-[12px]">
              <span
                className={cn(
                  "w-28 shrink-0 text-right font-mono text-[10.5px]",
                  m.group === "failure" ? "text-red-700" : "text-neutral-600",
                )}
              >
                {m.from}
              </span>
              <span className="shrink-0 text-neutral-400">—{m.dashed ? " -" : "—"}&gt;</span>
              <span
                className={cn(
                  "w-32 shrink-0 font-mono text-[10.5px]",
                  m.group === "failure" ? "text-red-700" : "text-neutral-800",
                )}
              >
                {m.to}
              </span>
              <span className="min-w-0 flex-1 border-b border-dotted border-neutral-200 pb-0.5 text-[11.5px] text-neutral-500">
                {m.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
