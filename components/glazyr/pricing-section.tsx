"use client"

import { Cpu, Link, Zap, Sparkles } from "lucide-react"

export function PricingSection() {
    const handleBuyCredits = () => {
        // Redirect to dashboard with anchor to the purchase section
        window.location.href = "/dashboard#purchase"
    }

    const tiers = [
        {
            id: "starter",
            icon: <Cpu className="h-5 w-5 text-primary" />,
            title: "Starter",
            price: "$0",
            credits: "2.5k Frames",
            description: "Perfect for testing and prototyping with zero latency overhead.",
            buttonText: "Active Now",
            isFree: true
        },
        {
            id: "developer",
            icon: <Link className="h-5 w-5 text-primary" />,
            title: "Developer",
            price: "$0",
            credits: "100k Frames",
            description: "The Alpha Standard. Scale your agent testing with high-frequency telemetry.",
            buttonText: "Get Started",
            popular: true,
            isFree: true
        },
        {
            id: "pro",
            icon: <Sparkles className="h-5 w-5 text-primary" />,
            title: "Pro",
            price: "$0",
            credits: "300k Frames",
            description: "For high-frequency vision benchmarks and intensive agent loops.",
            buttonText: "Upgrade Now",
            isFree: true
        },
        {
            id: "scale",
            icon: <Zap className="h-5 w-5 text-primary" />,
            title: "Scale",
            price: "$0",
            credits: "1M Frames",
            description: "Enterprise-grade standard for autonomous clusters and production vision.",
            buttonText: "Join Scale",
            isFree: true
        }
    ]

    return (
        <section id="pricing" className="py-24 relative overflow-hidden text-white bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 slb-panel border-primary/20 text-primary mb-6">
                        <Cpu className="h-4 w-4" />
                        <span className="text-xs font-mono font-medium uppercase tracking-widest">
                            Compute Unit Economics
                        </span>
                    </div>
                    <h2 className="slb-header text-3xl md:text-5xl tracking-tight mb-6">The 10x Compute Advantage</h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Stop paying for slow, base64-encoded screenshots. Scale your vision-agents with industrial-grade economics mapped directly to bare-metal compute.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiers.map((t, i) => (
                        <div key={i} className={`slb-panel p-6 relative flex flex-col justify-between transition-all hover:border-primary/50 group ${t.popular ? "slb-panel-highlight z-10 scale-105" : ""}`}>
                            {t.popular && (
                                <div className="absolute top-0 right-0 bg-primary/20 border-l border-b border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                    Recommended
                                </div>
                            )}
                            <div>
                                <div className="mb-6 inline-flex p-3 slb-panel border-primary/20 group-hover:bg-primary/5 transition-colors">
                                    {t.icon}
                                </div>
                                <h3 className="slb-header text-xl mb-1">{t.title}</h3>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-3xl font-bold text-foreground font-mono">{t.price}</span>
                                    {t.price !== "Free" && <span className="text-[10px] text-primary uppercase tracking-widest font-mono">USD</span>}
                                </div>
                                <p className="text-primary text-xs font-mono mb-4">{t.credits}</p>
                                <p className="text-muted-foreground text-[11px] leading-relaxed mb-6 h-12">
                                    {t.description}
                                </p>
                            </div>
                            <button
                                onClick={() => handleBuyCredits()}
                                className={`w-full py-3 text-[10px] font-bold uppercase tracking-widest transition-all ${t.isFree ? "slb-btn opacity-60" : "slb-btn slb-btn-primary"
                                    }`}
                            >
                                {t.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-4 slb-panel px-6 py-4 border-primary/20">
                        <span className="text-primary font-mono font-bold uppercase tracking-tight text-sm">Global, Instant Billing</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="slb-label text-xs border-primary/20 bg-primary/5 text-primary">Pay-as-you-go</span>
                    </div>
                    <p className="max-w-xl mx-auto mt-6 text-sm text-muted-foreground leading-relaxed italic">
                        <span className="text-primary font-bold">[BETA FREE UNLOCKED]</span> During this phase, all compute fees are waived. You only pay for the exact number of frames your AI uses in production, but currently, 100% of the vision tax has been eliminated for our early pioneers.
                    </p>
                </div>
            </div>
        </section>
    )
}
