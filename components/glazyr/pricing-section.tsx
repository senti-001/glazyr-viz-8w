"use client"

import { Cpu, Link, Zap, Sparkles } from "lucide-react"

export function PricingSection() {
    const handleBuyCredits = () => {
        // Redirect to dashboard with anchor to the purchase section
        window.location.href = "/dashboard#purchase"
    }

    const tiers = [
        {
            id: "enterprise",
            icon: <Zap className="h-5 w-5 text-primary" />,
            title: "B2B Enterprise",
            price: "CONTACT",
            credits: "Unlimited Vision",
            description: "Industrial-grade vision scaling for autonomous clusters and high-frequency agents.",
            buttonText: "Inquire Now",
            isFree: false
        }
    ]

    const handleInquiry = () => {
        window.open("https://form.typeform.com/to/sbdm0689", "_blank")
    }

    return (
        <section id="pricing" className="py-24 relative overflow-hidden text-white bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 slb-panel border-primary/20 text-primary mb-6">
                        <Cpu className="h-4 w-4" />
                        <span className="text-xs font-mono font-medium uppercase tracking-widest">
                            B2B Token Savings
                        </span>
                    </div>
                    <h2 className="slb-header text-3xl md:text-5xl tracking-tight mb-6">Scale Your Agentic Economy</h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        The consumer beta has concluded. Glazyr Viz is now pivoting to exclusive B2B infrastructure, delivering 90%+ token savings for industrial LLM vision workflows.
                    </p>
                </div>

                <div className="max-w-lg mx-auto">
                    {tiers.map((t, i) => (
                        <div key={i} className={`slb-panel p-10 relative flex flex-col justify-between transition-all border-primary/50 bg-primary/5`}>
                            <div className="absolute top-0 right-0 bg-primary/20 border-l border-b border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2">
                                Enterprise Ready
                            </div>
                            <div className="text-center">
                                <div className="mb-8 inline-flex p-4 slb-panel border-primary/20 bg-primary/10">
                                    {t.icon}
                                </div>
                                <h3 className="slb-header text-2xl mb-2">{t.title}</h3>
                                <div className="flex items-center justify-center gap-2 mb-6">
                                    <span className="text-4xl font-bold text-foreground font-mono">{t.price}</span>
                                </div>
                                <p className="text-primary text-sm font-mono mb-6">{t.credits}</p>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                    {t.description}
                                </p>
                            </div>
                            <button
                                onClick={() => handleInquiry()}
                                className="slb-btn slb-btn-primary w-full py-4 text-xs font-bold uppercase tracking-widest"
                            >
                                {t.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-4 slb-panel px-8 py-4 border-primary/20">
                        <span className="text-primary font-mono font-bold uppercase tracking-tight text-sm">Industrial Scaling</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="slb-label text-xs border-primary/20 bg-primary/5 text-primary">SLA Guaranteed</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
