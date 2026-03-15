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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                        <Cpu className="h-4 w-4" />
                        <span className="text-xs font-mono font-medium uppercase tracking-widest">
                            Compute Unit Economics
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The 10x Compute Advantage</h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
                        Stop paying for slow, base64-encoded screenshots. Scale your vision-agents with industrial-grade economics mapped directly to bare-metal compute.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tiers.map((t, i) => (
                        <div key={i} className={`glass-panel rounded-2xl p-8 transition-all hover:border-primary/30 bg-secondary/50 border border-border group relative ${t.popular ? "ring-2 ring-primary/40 scale-105 z-10" : ""}`}>
                            {t.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                {t.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-1">{t.title}</h3>
                            <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-2xl font-bold text-primary">{t.price}</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">/ {t.credits}</span>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                {t.description}
                            </p>
                            <button
                                onClick={() => !t.isFree && handleBuyCredits(t.id)}
                                disabled={loading !== null}
                                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${t.isFree
                                    ? "bg-transparent border-muted-foreground/30 text-muted-foreground hover:border-primary/50 hover:text-primary"
                                    : "bg-primary/10 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
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
                    <div className="inline-flex items-center gap-4 glass-panel px-6 py-4 rounded-full border-primary/20 border bg-secondary/30">
                        <span className="text-primary font-mono font-bold uppercase tracking-tight text-sm">Strategic Tier Settlement</span>
                        <span className="text-muted-foreground">|</span>
                        <span className="text-foreground font-medium uppercase tracking-tighter text-xs">USDC Compatible</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
