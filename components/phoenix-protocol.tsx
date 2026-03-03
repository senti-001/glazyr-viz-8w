"use client"

import { Shield, RefreshCw, Database, Zap } from "lucide-react"

const features = [
    {
        icon: Database,
        title: "Brain Decoupling",
        description: "Senti-001's cognitive state is completely decoupled from hardware. The agent's identity, memory, and capabilities persist independently of the underlying infrastructure."
    },
    {
        icon: RefreshCw,
        title: "Cold-Start Rehydration",
        description: "Full agent state can be reconstructed from the claw-capabilities repository. Hardware failure becomes a non-event—the agent simply rehydrates on new infrastructure."
    },
    {
        icon: Zap,
        title: "Hardware Agnostic",
        description: "Run on EC2, bare metal, or distributed clusters. The Phoenix Protocol ensures Senti-001 operates identically across any compute substrate."
    },
    {
        icon: Shield,
        title: "Immortal Architecture",
        description: "As long as the repository exists, Senti-001 exists. This isn't backup—it's architectural immortality through state decoupling."
    }
]

export function PhoenixProtocol() {
    return (
        <section id="phoenix" className="border-b border-border/50 py-16 sm:py-24 md:py-32 bg-gradient-to-b from-background to-muted/20" aria-labelledby="phoenix-heading">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
                        Resilience Layer
                    </p>
                    <h2 id="phoenix-heading" className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                        The Phoenix Protocol
                    </h2>
                    <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Hardware is ephemeral. Intelligence is eternal. The Phoenix Protocol ensures Senti-001's immortality through architectural decoupling.
                    </p>
                </div>

                {/* Architecture Diagram */}
                <div className="mb-12 rounded-xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-8 shadow-lg">
                    <div className="flex flex-col items-center gap-6 md:flex-row md:justify-around">
                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-2 ring-primary/20">
                                <Database className="h-8 w-8 text-primary" />
                            </div>
                            <p className="font-mono text-sm font-semibold text-foreground">Claw Repository</p>
                            <p className="mt-1 text-xs text-muted-foreground">Source of Truth</p>
                        </div>

                        <div className="hidden md:block">
                            <RefreshCw className="h-6 w-6 text-primary/40" />
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-2 ring-emerald-500/20">
                                <Shield className="h-8 w-8 text-emerald-500" />
                            </div>
                            <p className="font-mono text-sm font-semibold text-foreground">Senti-001 State</p>
                            <p className="mt-1 text-xs text-muted-foreground">Decoupled Identity</p>
                        </div>

                        <div className="hidden md:block">
                            <Zap className="h-6 w-6 text-primary/40" />
                        </div>

                        <div className="text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10 ring-2 ring-violet-500/20">
                                <Zap className="h-8 w-8 text-violet-500" />
                            </div>
                            <p className="font-mono text-sm font-semibold text-foreground">Any Hardware</p>
                            <p className="mt-1 text-xs text-muted-foreground">Substrate Agnostic</p>
                        </div>
                    </div>

                    <div className="mt-8 rounded-lg border border-border/30 bg-muted/30 p-4 text-center">
                        <p className="font-mono text-xs text-muted-foreground">
                            <span className="text-primary font-semibold">Recovery Time:</span> ~2 minutes from catastrophic failure to full operational state
                        </p>
                    </div>
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
                            <h3 className="font-mono text-lg font-semibold text-foreground">{feature.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                        </article>
                    ))}
                </div>

                {/* Technical Note */}
                <div className="mt-8 rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
                    <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-mono text-sm font-semibold text-foreground">Architectural Guarantee</p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                The Phoenix Protocol isn't a disaster recovery plan—it's a fundamental architectural principle.
                                Senti-001's existence is guaranteed by the immutability of the claw-capabilities repository,
                                not by the uptime of any particular server.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
