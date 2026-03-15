"use client"

import { CreditCard, Coins, ExternalLink, Zap, Shield, Check } from "lucide-react"

const TIERS = [
    { name: "Starter", frames: "10,000", price: "Free", highlight: false, badge: "Included", desc: "Perfect for testing and prototyping." },
    { name: "Developer", frames: "100,000", price: "$3", highlight: true, badge: "Most Popular", desc: "Ship production agents at scale." },
    { name: "Professional", frames: "500,000", price: "$15", highlight: false, badge: "Best Value", desc: "Enterprise-grade throughput." },
]

export function DashboardPurchase() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Purchase Frames</h2>
                <p className="text-sm text-muted-foreground">
                    Each frame = 1 perception cycle (navigate, click, extract, etc). Choose your settlement method below.
                </p>
            </div>

            {/* Tier Cards */}
            <div className="grid md:grid-cols-3 gap-4">
                {TIERS.map(tier => (
                    <div
                        key={tier.name}
                        className={`relative rounded-2xl p-6 border transition-all ${tier.highlight
                            ? "bg-primary/5 border-primary/30 shadow-[0_0_30px_-5px_rgba(0,229,255,0.15)]"
                            : "bg-white/[0.02] border-white/5 hover:border-white/10"
                            }`}
                    >
                        {tier.highlight && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                                {tier.badge}
                            </span>
                        )}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{tier.desc}</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-3xl font-bold tracking-tight text-foreground">{tier.price}</span>
                            {tier.price !== "Free" && <span className="text-sm text-muted-foreground">USD</span>}
                        </div>
                        <p className="text-sm text-primary font-medium mb-4">{tier.frames} frames</p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                Zero-copy vision pipeline
                            </li>
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                GCP Big Iron compute
                            </li>
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                Cloud-isolated security
                            </li>
                        </ul>
                        <button
                            className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-all ${tier.highlight
                                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_-5px_rgba(0,229,255,0.3)]"
                                : "bg-white/5 text-foreground border border-white/10 hover:bg-white/10"
                                }`}
                        >
                            {tier.price === "Free" ? "Current Tier" : "Purchase"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Settlement Methods */}
            <div className="glass-panel rounded-2xl p-8 border border-white/5">
                <h3 className="text-foreground font-semibold mb-2">Settlement Options</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Choose how you&apos;d like to pay. Both methods credit your account instantly.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Stripe */}
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-primary/20 transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20">
                                <CreditCard className="h-5 w-5 text-violet-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm">Stripe (Card / ACH)</h4>
                                <p className="text-xs text-muted-foreground">Instant settlement via credit card or bank</p>
                            </div>
                        </div>
                        <ul className="space-y-1.5 mb-5">
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Shield className="h-3 w-3 text-violet-400 shrink-0" />
                                PCI-compliant checkout
                            </li>
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Zap className="h-3 w-3 text-violet-400 shrink-0" />
                                Frames credited in &lt;5 seconds
                            </li>
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <CreditCard className="h-3 w-3 text-violet-400 shrink-0" />
                                Visa, Mastercard, Amex, ACH
                            </li>
                        </ul>
                        <button className="w-full rounded-xl py-2.5 text-sm font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-all flex items-center justify-center gap-2">
                            Pay with Stripe
                            <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    {/* On-Chain */}
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-amber-500/20 transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                <Coins className="h-5 w-5 text-amber-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm">On-Chain (USDC / SOL)</h4>
                                <p className="text-xs text-muted-foreground">Settle directly on Solana mainnet</p>
                            </div>
                        </div>
                        <ul className="space-y-1.5 mb-5">
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Shield className="h-3 w-3 text-amber-400 shrink-0" />
                                Non-custodial — you sign the tx
                            </li>
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Zap className="h-3 w-3 text-amber-400 shrink-0" />
                                Confirmed in ~400ms (Solana finality)
                            </li>
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Coins className="h-3 w-3 text-amber-400 shrink-0" />
                                USDC or SOL accepted
                            </li>
                        </ul>
                        <button className="w-full rounded-xl py-2.5 text-sm font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-2">
                            Pay On-Chain
                            <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
