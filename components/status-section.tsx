"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

import statusData from "@/data/status.json"

const milestones = statusData.milestones as { label: string, status: "complete" | "in-progress" | "pending" }[]

export function StatusSection() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(statusData.progress), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="status" className="border-b border-border/50 py-16 sm:py-24 md:py-32" aria-labelledby="status-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
            Build Status
          </p>
          <h2 id="status-heading" className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Development Progress
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Glazyr Viz is under active development. Track our progress as we build the
            agentic web runtime from the ground up.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl sm:mt-16">
          <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between sm:mb-6">
              <div>
                <h3 className="font-mono text-xs font-semibold text-foreground sm:text-sm">Overall Progress</h3>
                <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">STT & Audio Pipeline</p>
              </div>
              <span className="font-mono text-xl font-bold text-primary sm:text-2xl" aria-label={`${progress} percent complete`}>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" aria-label="Build progress" />

            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4" aria-label="Development milestones">
              {milestones.map((milestone) => (
                <li key={milestone.label} className="flex items-start gap-3">
                  {milestone.status === "complete" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" aria-hidden="true" />
                  ) : milestone.status === "in-progress" ? (
                    <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-primary sm:h-5 sm:w-5" aria-hidden="true" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40 sm:h-5 sm:w-5" aria-hidden="true" />
                  )}
                  <span
                    className={
                      milestone.status === "pending"
                        ? "text-sm text-muted-foreground/60"
                        : milestone.status === "in-progress"
                          ? "text-sm font-medium text-foreground"
                          : "text-sm text-muted-foreground"
                    }
                  >
                    {milestone.label}
                    {milestone.status === "complete" && <span className="sr-only"> (completed)</span>}
                    {milestone.status === "in-progress" && <span className="sr-only"> (in progress)</span>}
                    {milestone.status === "pending" && <span className="sr-only"> (pending)</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
