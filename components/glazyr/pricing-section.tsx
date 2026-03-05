"use client"

import { ShieldCheck, CreditCard, Cpu, Link } from "lucide-react"

export function PricingSection() {
    const features = [
        {
            icon: <Cpu className="h-5 w-5 text-primary" />,
            title: "Free — Community",
            description: "10,000 Frames / 200ms Latency. Perfect for local dev, testing vision-agents, and community builders."
        },
        {
            icon: <Link className="h-5 w-5 text-primary" />,
            title: "$8/mo — Nexus",
            description: "400,000 Frames / 7.35ms Latency. High-performance vision hosted on our Big Iron GCP cluster."
        },
        {
            icon: <Zap className="h-5 w-5 text-primary" />,
            title: "57 FPS — Optic Surge",
            description: "Verified stability for 30,000+ active entities. Zero jitter, hardware-level frame synchronization."
        },
        {
            icon: <ShieldCheck className="h-5 w-5 text-primary" />,
            title: "Custom — Enterprise",
            description: "Multi-Region clusters with 1.5ms DMA latency. Dedicated Big Iron instances with full isolation."
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
