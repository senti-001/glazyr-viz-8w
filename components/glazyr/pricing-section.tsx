"use client"

import { ShieldCheck, CreditCard, Cpu, Link, Zap } from "lucide-react"

export function PricingSection() {
    const features = [
        {
            icon: <Cpu className="h-5 w-5 text-primary" />,
            title: "Beta Validator",
            description: "Free. Unlimited for proof-of-tech. Help us verify 57 FPS / 7.3ms benchmarks on our Big Iron cluster."
        },
        {
            icon: <Link className="h-5 w-5 text-primary" />,
            title: "Nexus Credits",
            description: "Prepaid Vision. No subscriptions. Pay-as-you-perceive once we move out of Beta."
        },
        {
            icon: <Zap className="h-5 w-5 text-primary" />,
            title: "Hyperscaler Tier",
            description: "Optimized for massive token savings. We only charge when we measurably reduce your API costs."
        },
        {
            icon: <ShieldCheck className="h-5 w-5 text-primary" />,
            title: "Custom — Enterprise",
            description: "Dedicated Big Iron clusters for 24/7 vision-agents. 1.5ms DMA latency and full isolation."
        }
    ]

    return (
        <section id="pricing" className="py-24 relative overflow-hidden text-white bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                        <Cpu className="h-4 w-4" />
                        <span className="text-xs font-mono font-medium uppercase tracking-widest">
                            Compute Unit Economics
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The 10x Compute Advantage</h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                        Stop burning budget on raw pixel arrays. Sovereign agents require structural data semantics delivered at a fraction of the cost.
                    </p>
                </div>

                {/* Unit Economics Comparison */}
                <div className="max-w-4xl mx-auto mb-20 p-8 rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-md relative overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.05)] hover:border-primary/40 hover:shadow-[0_0_80px_rgba(0,229,255,0.1)] transition-all duration-500">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Zap className="w-48 h-48 text-primary" />
                    </div>

                    <h3 className="text-xl font-bold mb-8 relative z-10 text-center sm:text-left">Vision Processing Cost (per 1M frames)</h3>

                    <div className="space-y-6 relative z-10 font-mono">
                        {/* Standard OCR Bar */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-muted-foreground">Standard VLM / OCR</span>
                                <span className="text-red-400 font-bold">~$15,000</span>
                            </div>
                            <div className="w-full h-8 bg-secondary/50 rounded-r-lg overflow-hidden border border-red-500/20">
                                <div className="h-full bg-red-500/20 w-full animate-pulse"></div>
                            </div>
                            <div className="text-xs text-muted-foreground/60 mt-1">Cost metric: ~$0.015 per frame payload</div>
                        </div>

                        {/* Glazyr SHM Bar */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-foreground font-semibold">Glazyr Zero-Copy SHM</span>
                                <span className="text-primary font-bold">~$1,000</span>
                            </div>
                            <div className="w-full h-8 bg-secondary/50 rounded-r-lg overflow-hidden border border-primary/20">
                                <div className="h-full bg-primary/80 w-[6.6%] relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                </div>
                            </div>
                            <div className="text-xs text-primary/60 mt-1">Cost metric: ~$0.001 per structured yield</div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="glass-panel rounded-2xl p-8 transition-all hover:border-primary/30 bg-secondary/50 border border-border">
                            <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 border border-primary/20">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-4 glass-panel px-6 py-4 rounded-full border-primary/20 border bg-secondary/30">
                        <span className="text-primary font-mono font-bold uppercase tracking-tight text-sm">Session Credits Enabled</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-foreground font-medium uppercase tracking-tighter text-xs">USDC Settlement</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
