"use client"

import Image from "next/image"
import { Zap } from "lucide-react"

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Holographic animated background mesh */}
            <div className="absolute inset-0 holographic-bg" aria-hidden="true" />

            {/* Radial glow overlay */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px]" style={{ borderRadius: '50%' }} />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8 slb-panel" style={{ boxShadow: 'none' }}>
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping bg-primary opacity-75" style={{ borderRadius: '50%' }} />
                        <span className="relative inline-flex h-2 w-2 bg-primary" style={{ borderRadius: '50%' }} />
                    </span>
                    <span className="slb-label text-primary">System Online</span>
                </div>

                {/* Logo Orb */}
                <div className="flex justify-center mb-10">
                    <div className="relative">
                        <div className="absolute inset-0 animate-pulse-ring bg-primary/10 scale-150 rounded-full" />
                        <Image
                            src="/images/glazyr-emblem.png"
                            alt="Glazyr"
                            width={120}
                            height={120}
                            className="relative rounded-full glow-cyan"
                            priority
                        />
                    </div>
                </div>

                {/* Headline */}
                <h1 className="slb-header text-2xl sm:text-3xl md:text-4xl tracking-tight text-foreground leading-tight text-balance mb-6">
                    Same web.
                    <br />
                    <span className="text-primary text-3xl md:text-5xl text-balance">92% fewer tokens.</span>
                </h1>

                {/* Subline */}
                <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 text-pretty">
                    Glazyr is a free add-on for your AI agent. Instead of swallowing whole web pages,
                    your agent reads the short version — and still clicks, types, and scrolls like
                    normal. Web work finishes faster, and your token bill shrinks with it.
                </p>

                {/* CTA */}
                <div className="flex flex-col items-center justify-center gap-6 mb-10 w-full max-w-2xl mx-auto">
                    <a
                        href="#mcp"
                        className="slb-btn slb-btn-primary px-10 py-5 text-lg font-bold group relative inline-flex items-center gap-3"
                    >
                        <Zap className="h-6 w-6 fill-current" />
                        Install the MCP Server — Free
                    </a>
                    <p className="slb-label text-primary">
                        Free for local use · No account · No telemetry
                    </p>
                    <p className="text-sm text-muted-foreground">
                        For <strong className="text-foreground">Windows</strong> (through WSL) and <strong className="text-foreground">Linux</strong> · macOS is not supported yet
                    </p>
                </div>

                {/* Metric Strip */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {[
                        { value: "8,775", label: "Tokens — Glazyr, 3 web tasks" },
                        { value: "114,737", label: "Tokens — raw CDP, same tasks" },
                        { value: "13×", label: "Fewer tokens vs CDP (measured)" },
                        { value: "$0", label: "Free · Runs on your machine" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="slb-panel px-4 py-5 text-center transition-all hover:border-primary"
                        >
                            <div className="text-xl sm:text-2xl font-bold text-primary mb-1 font-mono">
                                {stat.value}
                            </div>
                            <div className="slb-label">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
