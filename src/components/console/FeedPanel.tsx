import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { FeedChannel, FeedItem } from "@/hooks/use-deployment-engine";

const CHANNEL_META: Record<FeedChannel, { tag: string; cls: string }> = {
  dashboard: { tag: "DASH", cls: "border-neutral-800 text-neutral-800" },
  log: { tag: "LOG", cls: "border-neutral-400 text-neutral-500" },
  email: { tag: "MAIL", cls: "border-red-700 text-red-700" },
  slack: { tag: "SLACK", cls: "border-amber-700 text-amber-700" },
};

const KIND_DOT: Record<FeedItem["kind"], string> = {
  state: "bg-neutral-400",
  stage: "bg-neutral-700",
  health: "bg-neutral-900",
  failure: "bg-red-600",
  retry: "bg-amber-500",
  rollback: "bg-red-600",
  restore: "bg-amber-600",
  escalate: "bg-red-700",
  promote: "bg-emerald-600",
};

export function FeedPanel({ feed }: { feed: FeedItem[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [feed.length]);

  return (
    <div className="flex h-full flex-col rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="eyebrow">Observer fan-out · NotificationService</span>
        <span className="text-[11px] tabular text-muted-foreground">{feed.length} events</span>
      </div>
      <div className="max-h-64 flex-1 overflow-y-auto px-4 py-2">
        {feed.length === 0 && (
          <p className="py-6 text-center text-xs text-neutral-400">
            Observers attached — dashboard, email, log, slack.
            <br />
            They will light up when a deployment runs.
          </p>
        )}
        <ul className="space-y-2.5">
          {feed.map((item) => {
            const channel = CHANNEL_META[item.channel];
            return (
              <li key={item.id} className="flex items-start gap-2.5 text-[12px] leading-5">
                <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", KIND_DOT[item.kind])} />
                <span
                  className={cn(
                    "mt-px shrink-0 rounded-sm border px-1.5 py-px font-mono text-[9.5px] font-semibold tracking-wide",
                    channel.cls,
                  )}
                >
                  {channel.tag}
                </span>
                <span className="min-w-0 flex-1 text-neutral-700">{item.text}</span>
                <span className="shrink-0 font-mono text-[10px] tabular text-neutral-400">{item.time}</span>
              </li>
            );
          })}
        </ul>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
