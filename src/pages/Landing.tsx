import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STAGES } from "@/lib/patternforge-data";

const FAMILIES = [
  {
    title: "Creational",
    note: "How the pipeline is assembled.",
    patterns: [
      { name: "Factory Method", detail: "StageFactory creates every stage without exposing concrete classes." },
      { name: "Builder", detail: "PipelineBuilder assembles the six-stage pipeline fluently." },
    ],
  },
  {
    title: "Structural",
    note: "How subsystems are organised.",
    patterns: [
      { name: "Facade", detail: "ReleaseManager — one deploy() call drives the entire orchestrator." },
    ],
  },
  {
    title: "Behavioral",
    note: "How the pipeline behaves — and heals.",
    patterns: [
      { name: "Command", detail: "Every stage is an undoable command; the invoker keeps history." },
      { name: "Memento", detail: "State is snapshotted before deploy and restored on failure." },
      { name: "Strategy", detail: "Blue-Green, Rolling and Canary are swappable at runtime." },
      { name: "State", detail: "Seven lifecycle states, no if/else chains." },
      { name: "Chain of Responsibility", detail: "Retry → Rollback → Escalate on every failure." },
      { name: "Observer", detail: "Dashboard, email, log and Slack hear every status change." },
    ],
  },
];

const HEAL_STEPS = [
  { n: "01", title: "Snapshot", pattern: "Memento", detail: "Before anything runs, version, config, env vars and timestamp are captured by DeploymentCaretaker." },
  { n: "02", title: "Reverse undo", pattern: "Command", detail: "A failing stage is retried once; if it fails again, CommandInvoker undoes every executed stage — last first." },
  { n: "03", title: "Restore & escalate", pattern: "Chain of Responsibility", detail: "The snapshot is restored and the on-call engineer is paged via email and Slack." },
];

const VIVA = [
  { title: "Runnable Maven project", detail: "Java 17, JUnit 5 — mvn test, mvn exec:java, or IntelliJ / Eclipse." },
  { title: "Tested end-to-end", detail: "Six test classes cover reverse-order undo, snapshot restore and rollback." },
  { title: "Diagrams included", detail: "Class, sequence and package diagrams as PlantUML in docs/." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* nav */}
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-baseline gap-3">
            <span className="text-[16px] font-semibold tracking-tight">PatternForge</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 sm:inline">
              design patterns · ci/cd
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link to="/architecture" className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-900">
              Architecture
            </Link>
            <Link to="/auth" className="text-[13px] text-neutral-500 transition-colors hover:text-neutral-900">
              Sign in
            </Link>
            <Button asChild size="sm" className="h-9 gap-1.5 px-4">
              <Link to="/console">
                Console
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="eyebrow">Ten GoF patterns · one orchestrator</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-neutral-900 md:text-6xl">
              Deployments that
              <br />
              heal themselves.
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-neutral-500">
              PatternForge is a simulated microservice deployment &amp; rollback orchestrator
              for CI/CD pipelines — built to demonstrate every stage of the pipeline, automatic
              reverse-order rollback and snapshot restore, in one runnable Java project.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-2 px-6">
                <Link to="/console">
                  Open the console
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-6">
                <Link to="/architecture">Explore the architecture</Link>
              </Button>
            </div>
          </motion.div>

          {/* pipeline strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-16 rounded-md border border-border bg-card px-5 py-6"
          >
            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
              {STAGES.map((stage, i) => (
                <div key={stage.id} className="flex flex-1 items-center gap-3">
                  <div className="flex-1 rounded-sm border border-neutral-300 px-3 py-2.5 transition-colors hover:border-neutral-800">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-0.5 text-[12.5px] font-medium text-neutral-900">{stage.name}</p>
                  </div>
                  {i < STAGES.length - 1 && (
                    <ArrowRight className="size-3.5 shrink-0 text-neutral-300" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1.5 border-t border-border pt-3.5 text-[11.5px] text-neutral-500">
              <span>
                any stage can fail <span className="font-mono text-neutral-700">→</span>{" "}
                <span className="font-mono text-neutral-700">Retry → Rollback → Escalate</span>
              </span>
              <span>
                promotion gated by <span className="font-mono text-neutral-700">HealthMonitor</span>
              </span>
              <span>
                snapshot restored via <span className="font-mono text-neutral-700">Memento</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* pattern families */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="eyebrow">The pattern map</p>
          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-neutral-900">
            Nine Gang-of-Four patterns, one coherent architecture.
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
            {FAMILIES.map((family) => (
              <div key={family.title} className="bg-card p-6">
                <p className="eyebrow">{family.title}</p>
                <p className="mt-1.5 text-[11.5px] text-neutral-400">{family.note}</p>
                <ul className="mt-5 space-y-4">
                  {family.patterns.map((p) => (
                    <li key={p.name} className="border-l-2 border-neutral-200 pl-3">
                      <p className="text-[13px] font-medium text-neutral-900">{p.name}</p>
                      <p className="mt-0.5 text-[12px] leading-5 text-neutral-500">{p.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how it heals */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="eyebrow">Self-healing, step by step</p>
          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-neutral-900">
            What happens when a stage fails.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HEAL_STEPS.map((s) => (
              <div key={s.n} className="rounded-md border border-border bg-card p-6">
                <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-400">{s.n}</p>
                <p className="mt-2 text-[15px] font-semibold text-neutral-900">{s.title}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400">{s.pattern}</p>
                <p className="mt-3 text-[12.5px] leading-6 text-neutral-500">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* viva / deliverables */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="eyebrow">Built for the viva</p>
          <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-neutral-900">
            Every deliverable, in one place.
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
            {VIVA.map((v) => (
              <div key={v.title} className="bg-card p-6">
                <p className="text-[14px] font-medium text-neutral-900">{v.title}</p>
                <p className="mt-2 text-[12.5px] leading-5 text-neutral-500">{v.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-neutral-900">
            Run a deployment that heals itself.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[13.5px] leading-6 text-neutral-500">
            Break the pipeline on purpose — pick a failure point and watch the chain, the
            snapshot and the observers respond.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="gap-2 px-8">
              <Link to="/console">
                Open the console
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-[11.5px] text-neutral-400 sm:flex-row">
          <span>PatternForge — Self-Healing Microservice Deployment &amp; Rollback Orchestrator</span>
          <span className="font-mono">Java 17 · Maven · 10 GoF patterns</span>
        </div>
      </footer>
    </div>
  );
}
