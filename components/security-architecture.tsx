"use client"

import { Eye, Zap, Network, Shield } from "lucide-react"

const features = [
    {
        icon: Eye,
        title: "Zero-Copy Vision",
        description: "Direct-from-VRAM frame access eliminates memory copy overhead. The Visual Cortex reads pixel data directly from GPU memory, achieving sub-millisecond latency for agentic perception.",
        technical: "Bypasses traditional framebuffer copies by mapping GPU memory directly into agent address space"
    },
    {
        icon: Shield,
        title: "The Phoenix Protocol",
        description: "Hardware-agnostic resilience through complete brain decoupling. Agent state persists independently of infrastructure, enabling ~2 minute recovery from catastrophic failure.",
        technical: "State rehydration from claw-capabilities repository ensures architectural immortality"
    },
    {
        icon: Network,
        title: "x402 Protocol",
        description: "Network-layer automation for agent-to-web transactions. The x402 protocol handles authentication, session management, and transaction signing at the protocol level.",
        technical: "Eliminates manual interaction overhead by automating web transaction flows for agentic systems"
    },
    {
        icon: Zap,
        title: "Agentic Runtime",
        description: "Complete control over the browser execution environment. No sandboxing, no permission prompts—just direct access to the web platform for maximum agentic capability.",
        technical: "Fork-level modifications enable capabilities impossible in standard Chromium builds"
    }
]

export function SecurityArchitecture() {
    return (
        <section
            id="architecture"
            className="border-b border-border/50 py-16 sm:py-24 md:py-32"
            aria-labelledby="architecture-heading"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
                        Technical Foundation
                    </p>
                    <h2
                        id="architecture-heading"
                        className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
                    >
                        Security & Architecture
                    </h2>
                    <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                        The Agentic Fork implements fundamental architectural innovations that enable true agentic capabilities at the browser level.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {features.map((feature) => (
                        <article
                            key={feature.title}
                            className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-mono text-lg font-semibold text-foreground">
                                {feature.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                {feature.description}
                            </p>
                            <div className="mt-4 rounded-lg border border-border/30 bg-muted/30 p-3">
                                <p className="font-mono text-xs text-muted-foreground">
                                    {feature.technical}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Technical Highlight */}
                <div className="mt-8 rounded-xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Zap className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-mono text-lg font-semibold text-foreground">
                                The Latency Moat
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Zero-Copy Vision + Agentic Runtime = sub-10ms perception-to-action latency.
                                This performance envelope is architecturally impossible for browser extensions or
                                automation frameworks. The fork-level approach creates a fundamental competitive moat.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono">
                                <div>
                                    <span className="text-muted-foreground">Traditional Automation:</span>
                                    <span className="ml-2 text-foreground font-semibold">~500ms</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Neural-Chromium:</span>
                                    <span className="ml-2 text-primary font-semibold">&lt;10ms</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
