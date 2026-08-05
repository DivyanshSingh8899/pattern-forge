import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SnapshotState } from "@/hooks/use-deployment-engine";

export function SnapshotPanel({ snapshot }: { snapshot: SnapshotState | null }) {
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="eyebrow">Memento · DeploymentCaretaker</span>
        {snapshot?.restored && (
          <span className="flex items-center gap-1.5 rounded-full border border-amber-600 px-2 py-0.5 text-[10.5px] font-medium text-amber-700">
            <RotateCcw className="size-3" />
            snapshot restored
          </span>
        )}
      </div>
      {!snapshot ? (
        <p className="px-4 py-5 text-xs text-neutral-400">
          No snapshot yet. A snapshot of version, configuration, environment variables and
          timestamp is saved before every deployment.
        </p>
      ) : (
        <div className="divide-y divide-border text-[12px]">
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-neutral-500">Version</span>
            <span className={cn("font-mono tabular", snapshot.restored ? "text-amber-700" : "text-neutral-900")}>
              v{snapshot.version}
            </span>
          </div>
          <div className="px-4 py-2.5">
            <p className="mb-1.5 text-neutral-500">Config ({snapshot.config.length})</p>
            <div className="space-y-1 font-mono text-[11px] text-neutral-700">
              {snapshot.config.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <span className="text-neutral-400">{k}</span>
                  <span className="tabular">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-2.5">
            <p className="mb-1.5 text-neutral-500">Environment ({snapshot.envVars.length})</p>
            <div className="space-y-1 font-mono text-[11px] text-neutral-700">
              {snapshot.envVars.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <span className="text-neutral-400">{k}</span>
                  <span className="truncate pl-6 tabular">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-neutral-500">Saved at</span>
            <span className="font-mono text-[11px] tabular text-neutral-700">{snapshot.timestamp}</span>
          </div>
        </div>
      )}
    </div>
  );
}
