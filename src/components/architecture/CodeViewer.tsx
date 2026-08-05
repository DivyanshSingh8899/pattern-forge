import { useMemo, useState } from "react";
import { Check, Copy, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { JAVA_GROUPS, JAVA_SOURCES } from "@/lib/java-sources";
import { highlightJava } from "@/lib/highlight-java";

function isJava(path: string): boolean {
  return path.endsWith(".java");
}

export function CodeViewer() {
  const [selected, setSelected] = useState(() => JAVA_SOURCES[0]);
  const [copied, setCopied] = useState(false);

  const html = useMemo(
    () => (isJava(selected.path) ? highlightJava(selected.code) : null),
    [selected],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(selected.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };

  const lineCount = selected.code.split("\n").length;

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {/* file tree */}
      <div className="lg:col-span-4">
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="border-b border-border px-4 py-2.5">
            <span className="eyebrow">patternforge/ — Maven project</span>
          </div>
          <div className="max-h-[520px] overflow-y-auto py-2">
            {JAVA_GROUPS.map((group) => (
              <div key={group}>
                <p className="px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                  {group}
                </p>
                {JAVA_SOURCES.filter((s) => s.group === group).map((src) => (
                  <button
                    key={src.path}
                    type="button"
                    onClick={() => setSelected(src)}
                    className={cn(
                      "flex w-full items-center gap-2 px-4 py-1.5 text-left text-[12px] transition-colors",
                      selected.path === src.path
                        ? "bg-neutral-900 text-neutral-50"
                        : "text-neutral-600 hover:bg-neutral-900/[0.04] hover:text-neutral-900",
                    )}
                  >
                    <FileCode2
                      className={cn(
                        "size-3.5 shrink-0",
                        selected.path === src.path ? "text-neutral-400" : "text-neutral-300",
                      )}
                    />
                    <span className="truncate font-mono text-[11px]">{src.path}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* code pane */}
      <div className="lg:col-span-8">
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
            <div className="min-w-0">
              <p className="truncate font-mono text-[12px] font-medium text-neutral-900">
                {selected.path}
              </p>
              <p className="truncate text-[11px] text-neutral-500">{selected.hint}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="font-mono text-[10.5px] tabular text-neutral-400">{lineCount} lines</span>
              <button
                type="button"
                onClick={copy}
                className="flex items-center gap-1 rounded-sm border border-border px-2 py-1 font-mono text-[10.5px] text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
              >
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copied ? "copied" : "copy"}
              </button>
            </div>
          </div>
          <div className="max-h-[520px] overflow-auto bg-neutral-950 px-4 py-3">
            {html ? (
              <pre
                className="font-mono text-[11.5px] leading-[1.65] text-neutral-300"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <pre className="whitespace-pre-wrap font-mono text-[11.5px] leading-[1.65] text-neutral-300">
                {selected.code}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
