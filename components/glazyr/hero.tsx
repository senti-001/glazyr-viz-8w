"use client"

import Image from "next/image"
import { Zap } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"

const BigIronTicker = dynamic(
    () => import("@/components/glazyr/big-iron-ticker").then((mod) => mod.BigIronTicker),
    { ssr: false }
)

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Holographic animated background mesh */}
            <div className="absolute inset-0 holographic-bg" aria-hidden="true" />

            {/* Radial glow overlay */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px]" style={{ borderRadius: '50%' }} />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                {/* Status Badge — rigid Win98 */}
                <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8 slb-panel" style={{ boxShadow: 'none' }}>
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping bg-primary opacity-75" style={{ borderRadius: '50%' }} />
                        <span className="relative inline-flex h-2 w-2 bg-primary" style={{ borderRadius: '50%' }} />
                    </span>
                    <span className="slb-label text-primary">System Online</span>
                </div>

                {/* Logo Orb */}
                <div className="flex justify-center mb-10">
                    <div className="relative">
                        <div className="absolute inset-0 animate-pulse-ring bg-primary/10 scale-150 rounded-full" />
                        <Image
                            src="/images/glazyr-emblem.png"
                            alt="Glazyr Viz"
                            width={120}
                            height={120}
                            className="relative rounded-full glow-cyan"
                            priority
                        />
                    </div>
                </div>

                {/* Headline — Y2K Monospace */}
                <h1 className="slb-header text-4xl sm:text-5xl md:text-7xl tracking-tight text-foreground leading-tight text-balance mb-6 uppercase">
                    Don&apos;t Waste
                    <br />
                    Intelligence on
                    <br />
                    <span className="text-primary text-6xl md:text-8xl">Screenshots</span>
                </h1>

                {/* Subline */}
                <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 text-pretty">
                    Cut out the slow, expensive screenshot loop. Glazyr Viz gives your AI agents <strong className="text-foreground">direct access to the browser&apos;s shared memory (SHM) buffer</strong>. See the DOM render instantly at 57 FPS with zero network overhead.
                </p>

                {/* CTA — Skeuomorphic Primary Button */}
                <div className="flex flex-col items-center justify-center gap-6 mb-10 w-full max-w-2xl mx-auto">
                    <Link
                        href="/auth/signin"
                        className="slb-btn slb-btn-primary px-10 py-5 text-lg font-bold group relative"
                    >
                        <Zap className="h-6 w-6 fill-current" />
                        Get Your API Key
                    </Link>
                    <p className="slb-label text-primary">
                        5,000 FREE FRAMES on register
                    </p>
                </div>

                {/* Metric Strip — SLB Panels */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {[
                        { value: "7.3ms", label: "Shared Memory Fetch" },
                        { value: "0x", label: "Base64 Encoding" },
                        { value: "Hardened", label: "NATS Bridge" },
                        { value: "Stealth", label: "Anti-Bot Core" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="slb-panel px-4 py-5 text-center transition-all hover:border-primary"
                        >
                            <div className="text-2xl font-bold text-primary mb-1 font-mono">
                                {stat.value}
                            </div>
                            <div className="slb-label">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
