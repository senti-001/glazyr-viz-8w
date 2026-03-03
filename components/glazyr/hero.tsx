"use client"

import Image from "next/image"
import { ArrowRight, Zap } from "lucide-react"
import dynamic from "next/dynamic"

const TerminalNode = dynamic(
    () => import("@/components/glazyr/terminal-node").then((mod) => mod.TerminalNode),
    { ssr: false }
)

const BigIronTicker = dynamic(
    () => import("@/components/glazyr/big-iron-ticker").then((mod) => mod.BigIronTicker),
    { ssr: false }
)

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background radial glow */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-xs font-medium text-primary">System Online</span>
                </div>

                {/* Logo Orb */}
                <div className="flex justify-center mb-10">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full animate-pulse-ring bg-primary/10 scale-150" />
                        <Image
                            src="/images/glazyr-emblem.png"
                            alt="Glazyr Viz"
                            width={120}
                            height={120}
                            className="relative rounded-full glow-cyan"
                            priority
                        />
                    </div>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight text-balance mb-6">
                    The High-Performance
                    <br />
                    <span className="text-primary">Browser for Agents</span>
                </h1>

                {/* Subline */}
                <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 text-pretty">
                    Autonomous systems require <strong>110ms Sensory Audits</strong>. See what the agent sees, instantly. Unlimited parallelism and built-in Anti-Bot Stealth.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="#pricing"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all glow-cyan-subtle"
                    >
                        <Zap className="h-4 w-4" />
                        Start Now
                    </a>
                    <a
                        href="#agentic-link"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-8 py-3.5 text-base font-semibold text-secondary-foreground hover:bg-secondary/80 hover:border-primary/30 transition-all"
                    >
                        Watch Proof
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                {/* Interactive Terminal */}
                <div className="mt-16 mx-auto max-w-2xl space-y-8">
                    <BigIronTicker />
                    <TerminalNode />
                </div>

                {/* Metric Strip */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                    {[
                        { value: "110ms", label: "Sensory Audit" },
                        { value: "Usage-Based", label: "Unit Economics" },
                        { value: "Hardened", label: "CI/CD Pipeline" },
                        { value: "Stealth", label: "Anti-Bot Core" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="glass-panel rounded-xl px-4 py-5 text-center transition-all hover:bg-primary/5"
                        >
                            <div className="text-2xl font-bold text-primary mb-1 font-mono">
                                {stat.value}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-widest">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
