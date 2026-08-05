import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LogLine } from "@/hooks/use-deployment-engine";

const LEVEL_CLASS: Record<LogLine["level"], string> = {
  info: "text-neutral-300",
  ok: "text-emerald-400",
  warn: "text-amber-400",
  err: "text-red-400",
  muted: "text-neutral-500",
};

export function LogPanel({ logs }: { logs: LogLine[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [logs.length]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(
        logs.map((l) => `[${l.time}] ${l.text}`).join("\n"),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-neutral-800 bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2.5">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-500">
          deployment.log
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10.5px] tabular text-neutral-600">
            {logs.length} lines
          </span>
          <button
            type="button"
            onClick={copy}
            disabled={logs.length === 0}
            className="flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-[10.5px] text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200 disabled:opacity-40"
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            {copied ? "copied" : "copy"}
          </button>
        </div>
      </div>
      <div className="h-56 overflow-y-auto px-4 py-3 font-mono text-[12px] leading-[1.7]">
        {logs.length === 0 && (
          <p className="text-neutral-600">
            $ patternforge --console
            <br />
            <span className="text-neutral-500">waiting for a deployment…</span>
          </p>
        )}
        {logs.map((line) => (
          <div key={line.id} className={cn("whitespace-pre-wrap break-words", LEVEL_CLASS[line.level])}>
            <span className="mr-2 select-none text-neutral-700">{line.time}</span>
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
