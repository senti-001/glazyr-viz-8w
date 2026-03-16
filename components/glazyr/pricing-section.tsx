"use client"

import { useState } from "react"
import { ShieldCheck, CreditCard, Cpu, Link, Zap, Loader2, Sparkles } from "lucide-react"
import { useSession } from "next-auth/react"

export function PricingSection() {
    const { data: session } = useSession()
    const [loading, setLoading] = useState<string | null>(null)

    const handleBuyCredits = async (tierId: string) => {
        if (!session) {
            alert("Security Protocol: You must be authenticated to purchase compute credits.")
            return
        }

        setLoading(tierId)
        try {
            const userId = session.user?.id

            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, tierId }),
            })

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error(data.error || "Failed to create checkout session")
            }
        } catch (err) {
            console.error("Checkout Error:", err)
            alert("Payment system temporarily unavailable. Please try again.")
        } finally {
            setLoading(null)
        }
    }

    const tiers = [
        {
            id: "beta",
            icon: <Cpu className="h-5 w-5 text-primary" />,
            title: "Beta Validator",
            price: "$0",
            credits: "10k Free Frames",
            description: "Proof-of-tech. Access industrial-grade browser-vision with zero latency overhead.",
            buttonText: "Active Now",
            isFree: true
        },
        {
            id: "nexus-entry",
            icon: <Link className="h-5 w-5 text-primary" />,
            title: "Nexus Entry",
            price: "$3.00",
            credits: "100k Frames",
            description: "Scale individual agent testing with high-frequency telemetry & optic-nerve parity.",
            buttonText: "Buy Credits"
        },
        {
            id: "developer-pack",
            icon: <Zap className="h-5 w-5 text-primary" />,
            title: "Developer Pack",
            price: "$15.00",
            credits: "500k Frames",
            description: "Production-grade standard for autonomous loops and scaled agentic clusters.",
            buttonText: "Buy Credits",
            popular: true
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tiers.map((t, i) => (
                        <div key={i} className={`slb-panel p-8 relative flex flex-col justify-between ${t.popular ? "slb-panel-highlight z-10 scale-105" : ""}`}>
                            {t.popular && (
                                <div className="absolute top-0 right-0 bg-primary/20 border-l border-b border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                    Most Popular
                                </div>
                            )}
                            <div>
                                <div className="mb-6 inline-flex p-3 slb-panel border-primary/20">
                                    {t.icon}
                                </div>
                                <h3 className="slb-header text-xl mb-1">{t.title}</h3>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <span className="text-3xl font-bold text-foreground">{t.price}</span>
                                    <span className="text-xs text-primary uppercase tracking-widest font-mono">/ {t.credits}</span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                    {t.description}
                                </p>
                            </div>
                            <button
                                onClick={() => !t.isFree && handleBuyCredits(t.id)}
                                disabled={loading !== null}
                                className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all mb-4 ${t.isFree ? "slb-btn" : "slb-btn slb-btn-primary"
                                    } ${loading === t.id ? "opacity-70 cursor-wait" : ""}`}
                            >
                                {loading === t.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : null}
                                {t.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-4 slb-panel px-6 py-4 border-primary/20">
                        <span className="text-primary font-mono font-bold uppercase tracking-tight text-sm">Strategic Tier Settlement</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="slb-label text-xs">USDC Compatible</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
