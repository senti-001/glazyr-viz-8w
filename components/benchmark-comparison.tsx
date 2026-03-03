"use client"

import { BarChart3, TrendingDown, Zap } from "lucide-react"

const metrics = [
    {
        label: "Page Load (TTI)",
        baseline: "198ms",
        hardened: "142ms",
        improvement: "28%",
        icon: Zap,
    },
    {
        label: "JS Execution",
        baseline: "184ms",
        hardened: "110ms",
        improvement: "40%",
        icon: BarChart3,
    },
    {
        label: "Binary Size",
        baseline: "416MB",
        hardened: "294MB",
        improvement: "29%",
        icon: TrendingDown,
    },
]

export function BenchmarkComparison() {
    return (
        <section id="benchmarks" className="py-16 sm:py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
                        Hardened Build excellence
                    </p>
                    <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                        Real-World Performance Benchmarks
                    </h2>
                    <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Glazyr Viz is not just more secure—it's significantly faster. By leveraging ThinLTO and
                        security hardening, we have achieved industry-leading results on GCP Big Iron.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-3">
                    {metrics.map((metric) => (
                        <div key={metric.label} className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <metric.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-tight">{metric.label}</h3>
                                    <p className="text-2xl font-bold text-primary mt-1">{metric.hardened}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                                <div className="text-xs text-muted-foreground uppercase">Baseline: <span className="line-through">{metric.baseline}</span></div>
                                <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
                                    {metric.improvement} Efficiency Gain
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
