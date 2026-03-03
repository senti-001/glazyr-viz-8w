"use client"

import { Check, ShieldCheck, Zap } from "lucide-react"

const tiers = [
    {
        name: "LIGHT (Edge)",
        description: "Optimized for high-frequency edge dispersal and low-latency interaction.",
        icon: Zap,
        features: [
            "Lightweight Binary (294MB)",
            "Standard CFI Hardening",
            "ThinLTO Optimization",
            "JWS Signed Manifest",
            "Edge-Native Execution",
        ],
        status: "Production Ready",
    },
    {
        name: "HEAVY (Research)",
        description: "Maximum security isolation for high-stakes intelligence extraction.",
        icon: ShieldCheck,
        features: [
            "Glazyr SBF Isolation",
            "BPF Sandbox Integration",
            "Full Control Flow Integrity",
            "Extended V8 Virtual Cage",
            "Research Benchmarks",
        ],
        status: "Verification Phase",
        highlight: true,
    },
]

export function DistributionManifest() {
    return (
        <section id="manifest" className="bg-slate-900/50 py-16 sm:py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
                        Service Tiers
                    </p>
                    <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                        Glazyr Viz Distribution Manifest
                    </h2>
                    <p className="mt-4 text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
                        Choose the build tier that aligns with your intelligence mission.
                        All binaries are JWS-signed for secure dispersal.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-2">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col rounded-3xl border p-8 shadow-xl transition-all hover:scale-[1.02] ${tier.highlight
                                ? "border-primary bg-slate-900/80 ring-1 ring-primary"
                                : "border-slate-800 bg-slate-950/50"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${tier.highlight ? "bg-primary/20 text-primary" : "bg-slate-800 text-slate-400"}`}>
                                    <tier.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                                    <span className={`text-xs font-mono uppercase tracking-widest ${tier.highlight ? "text-primary" : "text-slate-500"}`}>
                                        {tier.status}
                                    </span>
                                </div>
                            </div>

                            <p className="mt-6 text-slate-400">{tier.description}</p>

                            <ul className="mt-8 space-y-4 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                                        <Check className="h-4 w-4 text-emerald-400" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`mt-10 rounded-xl py-3 px-6 text-sm font-bold transition-colors ${tier.highlight
                                ? "bg-primary text-black hover:bg-primary/90"
                                : "bg-slate-800 text-slate-100 hover:bg-slate-700"
                                }`}>
                                Initialize Distribution
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
