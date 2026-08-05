import { ArrowDown, Check, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChainStep } from "@/hooks/use-deployment-engine";

const STATE_META: Record<
  ChainStep["state"],
  { ring: string; label: string; labelCls: string }
> = {
  pending: { ring: "border-border text-neutral-400", label: "armed", labelCls: "text-neutral-400" },
  active: { ring: "border-neutral-900 text-neutral-900", label: "handling", labelCls: "text-neutral-900" },
  done: { ring: "border-emerald-600 text-emerald-700", label: "handled", labelCls: "text-emerald-700" },
  skipped: { ring: "border-dashed border-neutral-300 text-neutral-400", label: "passed on", labelCls: "text-neutral-400" },
};

export function ChainPanel({ chain }: { chain: ChainStep[] }) {
  const anyActive = chain.some((c) => c.state === "active" || c.state === "done");
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="eyebrow">Failure chain · Chain of Responsibility</span>
        {!anyActive && <span className="text-[10.5px] text-neutral-400">idle</span>}
      </div>
      <ol className="px-4 py-3">
        {chain.map((step, index) => {
          const meta = STATE_META[step.state];
          return (
            <li key={step.handler} className="relative">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold transition-colors",
                    meta.ring,
                    step.state === "active" && "animate-pulse",
                  )}
                >
                  {step.state === "done" ? <Check className="size-3.5" /> : <CircleDashed className="size-3.5" />}
                </span>
                <div className="flex-1 py-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[12px] font-medium text-neutral-900">
                      {step.handler}
                    </span>
                    <span className={cn("text-[10px] font-medium uppercase tracking-wide", meta.labelCls)}>
                      {meta.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-4 text-neutral-500">{step.detail}</p>
                </div>
              </div>
              {index < chain.length - 1 && (
                <div className="flex items-center gap-3">
                  <div className="flex w-6 justify-center">
                    <ArrowDown className="size-3 text-neutral-300" />
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
