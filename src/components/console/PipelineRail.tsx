import { cn } from "@/lib/utils";
import type { StageState } from "@/hooks/use-deployment-engine";

const STATUS_META: Record<
  StageState["status"],
  { label: string; dot: string; text: string; chip: string }
> = {
  idle: { label: "pending", dot: "bg-neutral-300", text: "text-neutral-400", chip: "" },
  running: { label: "running", dot: "bg-neutral-900 animate-pulse", text: "text-neutral-900", chip: "border-neutral-900 text-neutral-900" },
  retrying: { label: "retry 2", dot: "bg-amber-500 animate-pulse", text: "text-amber-700", chip: "border-amber-600 text-amber-700" },
  passed: { label: "passed", dot: "bg-emerald-600", text: "text-emerald-700", chip: "border-emerald-600 text-emerald-700" },
  failed: { label: "failed", dot: "bg-red-600", text: "text-red-700", chip: "border-red-600 text-red-700" },
  undone: { label: "undone", dot: "bg-neutral-400", text: "text-neutral-500", chip: "border-neutral-400 text-neutral-500" },
  skipped: { label: "skipped", dot: "bg-neutral-300", text: "text-neutral-400", chip: "" },
};

export function PipelineRail({ stages }: { stages: StageState[] }) {
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="eyebrow">Pipeline · StageFactory + CommandInvoker</span>
        <span className="text-[11px] tabular text-muted-foreground">
          {stages.filter((s) => s.status === "passed").length}/6
        </span>
      </div>
      <ol className="divide-y divide-border">
        {stages.map((stage, index) => {
          const meta = STATUS_META[stage.status];
          const isUndone = stage.status === "undone";
          return (
            <li
              key={stage.id}
              className={cn(
                "group flex items-center gap-4 px-4 py-3 transition-colors",
                stage.status === "running" || stage.status === "retrying"
                  ? "bg-neutral-900/[0.03]"
                  : "hover:bg-neutral-900/[0.015]",
              )}
            >
              <span className="w-6 shrink-0 text-[11px] tabular text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                <span className={cn("absolute h-2.5 w-2.5 rounded-full", meta.dot)} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "text-[13px] font-medium text-neutral-900",
                      isUndone && "line-through decoration-neutral-400",
                    )}
                  >
                    {stage.name}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-400">
                    {stage.command}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {stage.durationMs > 0 && (
                  <span className="font-mono text-[11px] tabular text-neutral-400">
                    {stage.durationMs}ms
                  </span>
                )}
                <span
                  className={cn(
                    "min-w-[4.5rem] rounded-full border px-2 py-0.5 text-center text-[10.5px] font-medium",
                    meta.chip || "border-border text-muted-foreground",
                  )}
                >
                  {meta.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
