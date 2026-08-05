import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Check, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CLASS_TABLE, EXECUTION_FLOW, PACKAGES, PATTERNS, type PatternCategory } from "@/lib/patternforge-data";
import { PLANTUML_FILES } from "@/lib/java-sources";
import { ClassDiagram } from "@/components/architecture/ClassDiagram";
import { SequenceDiagram } from "@/components/architecture/SequenceDiagram";
import { CodeViewer } from "@/components/architecture/CodeViewer";

const CATEGORIES: ("All" | PatternCategory)[] = ["All", "Creational", "Structural", "Behavioral"];

function PlantUmlBlock({ name, code, note }: { name: string; code: string; note: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div>
          <p className="font-mono text-[12px] font-medium text-neutral-900">docs/{name}</p>
          <p className="text-[11px] text-neutral-500">{note}</p>
        </div>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1 rounded-sm border border-border px-2 py-1 font-mono text-[10.5px] text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="max-h-[420px] overflow-auto bg-neutral-950 px-4 py-3 font-mono text-[11.5px] leading-[1.6] text-neutral-300">
        {code}
      </pre>
    </div>
  );
}

function PackageTree() {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="border-b border-border px-4 py-2.5">
        <span className="eyebrow">patternsforge/ — package structure</span>
      </div>
      <div className="divide-y divide-border">
        {PACKAGES.map((pkg) => (
          <div key={pkg.name} className="px-4 py-3">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[12.5px] font-semibold text-neutral-900">
                {pkg.name}/
              </span>
              <span className="font-mono text-[11px] text-neutral-500">{pkg.classes.join(", ")}</span>
            </div>
            <p className="mt-1 text-[11.5px] text-neutral-500">{pkg.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Architecture() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const patterns = useMemo(
    () => (category === "All" ? PATTERNS : PATTERNS.filter((p) => p.category === category)),
    [category],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-baseline gap-2">
              <span className="text-[15px] font-semibold tracking-tight">PatternForge</span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:inline">
                architecture
              </span>
            </Link>
            <nav className="hidden items-center gap-5 text-[13px] sm:flex">
              <Link to="/console" className="text-neutral-500 transition-colors hover:text-neutral-900">
                Console
              </Link>
              <span className="font-medium text-neutral-900">Architecture</span>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="eyebrow">PatternForge · Java 17 + Maven</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-900">
          Ten patterns. One self-healing pipeline.
        </h1>
        <p className="mt-3 max-w-2xl text-[13.5px] leading-6 text-neutral-500">
          The complete course deliverable: source code, UML diagrams, pattern explanations,
          a class responsibility table and JUnit tests — all browsable here, all living in
          the <span className="font-mono text-neutral-700">patternforge/</span> Maven project.
        </p>

        <Tabs defaultValue="overview" className="mt-10">
          <TabsList className="mb-8 h-auto flex-wrap justify-start gap-1 rounded-md border border-border bg-background p-1">
            {[
              ["overview", "Overview"],
              ["class", "Class diagram"],
              ["sequence", "Sequence"],
              ["patterns", "Patterns"],
              ["classes", "Classes"],
              ["source", "Source code"],
              ["plantuml", "PlantUML"],
            ].map(([value, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                className="h-8 rounded-sm px-3 text-[12px] data-[state=active]:bg-neutral-900 data-[state=active]:text-neutral-50 data-[state=active]:shadow-none"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ------------------------------------------------ overview */}
          <TabsContent value="overview" className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <PackageTree />
            </div>
            <div className="lg:col-span-5">
              <h2 className="eyebrow">Step-by-step execution</h2>
              <ol className="mt-4 space-y-0">
                {EXECUTION_FLOW.map((s, i) => (
                  <li key={s.step} className="relative pb-6 pl-8 last:pb-0">
                    <span className="absolute left-0 top-0 flex size-6 items-center justify-center rounded-full border border-neutral-300 font-mono text-[10.5px] font-semibold text-neutral-600">
                      {i + 1}
                    </span>
                    <p className="text-[13px] font-medium text-neutral-900">
                      {s.step}
                      <span className="ml-2 font-mono text-[10.5px] text-neutral-400">{s.pattern}</span>
                    </p>
                    <p className="mt-1 text-[12px] leading-5 text-neutral-500">{s.detail}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 rounded-md border border-border bg-card px-4 py-3 text-[12px] leading-5 text-neutral-500">
                Promotion is gated behind health verification by design — the 6th pipeline
                stage only runs after <span className="font-mono text-neutral-700">HealthMonitor</span> passes.
              </p>
            </div>
          </TabsContent>

          {/* ------------------------------------------------ class diagram */}
          <TabsContent value="class">
            <ClassDiagram />
          </TabsContent>

          {/* ------------------------------------------------ sequence */}
          <TabsContent value="sequence">
            <SequenceDiagram />
            <p className="mt-4 text-[12px] leading-5 text-neutral-500">
              The same flow, as PlantUML lifelines, lives in{" "}
              <span className="font-mono text-neutral-700">docs/sequence-diagram.puml</span> (PlantUML tab).
            </p>
          </TabsContent>

          {/* ------------------------------------------------ patterns */}
          <TabsContent value="patterns">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11.5px] font-medium transition-colors",
                    category === c
                      ? "border-neutral-900 bg-neutral-900 text-neutral-50"
                      : "border-border text-neutral-500 hover:border-neutral-400 hover:text-neutral-900",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {patterns.map((p) => (
                <article
                  key={p.name}
                  className="flex flex-col rounded-md border border-border bg-card p-5 transition-colors hover:border-neutral-300"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[15px] font-semibold tracking-tight text-neutral-900">{p.name}</h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-transparent text-[10px]",
                        p.category === "Creational" && "bg-neutral-900 text-neutral-50",
                        p.category === "Structural" && "bg-neutral-200 text-neutral-800",
                        p.category === "Behavioral" && "bg-neutral-100 text-neutral-700",
                      )}
                    >
                      {p.category}
                    </Badge>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-5 text-neutral-600">{p.intent}</p>
                  <dl className="mt-4 space-y-2 border-t border-border pt-3 text-[11.5px] leading-5">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">Key classes</dt>
                      <dd className="mt-0.5 font-mono text-[11px] text-neutral-700">{p.keyClasses}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">In the simulator</dt>
                      <dd className="mt-0.5 text-neutral-600">{p.demo}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">Viva one-liner</dt>
                      <dd className="mt-0.5 text-neutral-600">{p.viva}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </TabsContent>

          {/* ------------------------------------------------ classes */}
          <TabsContent value="classes">
            <div className="overflow-x-auto rounded-md border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[240px] font-mono text-[10.5px] uppercase tracking-[0.15em]">Class</TableHead>
                    <TableHead className="font-mono text-[10.5px] uppercase tracking-[0.15em]">Package</TableHead>
                    <TableHead className="font-mono text-[10.5px] uppercase tracking-[0.15em]">Pattern role</TableHead>
                    <TableHead className="font-mono text-[10.5px] uppercase tracking-[0.15em]">Responsibility</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CLASS_TABLE.map((row) => (
                    <TableRow key={row.className + row.pkg} className="align-top">
                      <TableCell className="font-mono text-[11.5px] font-medium text-neutral-900">{row.className}</TableCell>
                      <TableCell className="font-mono text-[11px] text-neutral-500">{row.pkg}</TableCell>
                      <TableCell className="text-[11.5px] text-neutral-700">{row.pattern}</TableCell>
                      <TableCell className="max-w-md text-[11.5px] leading-5 text-neutral-500">{row.responsibility}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* ------------------------------------------------ source */}
          <TabsContent value="source">
            <CodeViewer />
          </TabsContent>

          {/* ------------------------------------------------ plantuml */}
          <TabsContent value="plantuml" className="space-y-6">
            {PLANTUML_FILES.map((f) => (
              <PlantUmlBlock key={f.name} {...f} />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
