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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for the Speed of AI</h2>
                    <p className="text-xl text-muted-foreground">
                        Stop waiting for screenshots. Give your agents direct-to-GPU frame access with usage-based unit economics.
                    </p>
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
