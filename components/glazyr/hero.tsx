"use client"

import Image from "next/image"
import { Zap, Copy, Check } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"

const BigIronTicker = dynamic(
    () => import("@/components/glazyr/big-iron-ticker").then((mod) => mod.BigIronTicker),
    { ssr: false }
)

export function Hero() {
    const [activeTab, setActiveTab] = useState<'npx' | 'python' | 'typescript'>('npx');
    const [copied, setCopied] = useState(false);

    const snippets = {
        npx: 'npx -y @modelcontextprotocol/inspector sse "https://mcp.glazyr.com/mcp/sse"',
        python: 'from mcp.client.sse import SSEClientTransport\n\ntransport = SSEClientTransport(url="https://mcp.glazyr.com/mcp/sse")',
        typescript: 'import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";\n\nconst transport = new SSEClientTransport(new URL("https://mcp.glazyr.com/mcp/sse"));'
    };

    const copyCommand = () => {
        navigator.clipboard.writeText(snippets[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background radial glow */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="text-xs font-medium text-primary">System Online</span>
                </div>

                {/* Logo Orb */}
                <div className="flex justify-center mb-10">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full animate-pulse-ring bg-primary/10 scale-150" />
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

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight text-balance mb-6">
                    The Zero-Copy
                    <br />
                    <span className="text-primary">Optic Nerve for AI</span>
                </h1>

                {/* Subline */}
                <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 text-pretty">
                    Cut out the slow, expensive screenshot loop. Glazyr Viz gives your AI agents <strong>direct access to the browser's shared memory (SHM) buffer</strong>. See the DOM render instantly at 57 FPS with zero network overhead.
                </p>

                {/* High-Conversion CTA Funnel */}
                <div className="flex flex-col items-center justify-center gap-6 mb-10 w-full max-w-2xl mx-auto">
                    <Link
                        href="/auth/signin"
                        className="group relative inline-flex items-center gap-3 rounded-2xl bg-primary px-10 py-5 text-lg font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_var(--primary-glow)] hover:shadow-[0_0_60px_-5px_var(--primary-glow)]"
                    >
                        <Zap className="h-6 w-6 fill-current" />
                        Get Your API Key
                        <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <p className="text-sm text-muted-foreground font-mono uppercase tracking-[0.2em]">
                        1,000,000 FREE CREDITS on register
                    </p>
                </div>

                {/* Clean Value Proposition */}
                <div className="mt-12 md:mt-16 mx-auto max-w-2xl text-center">
                    <p className="text-base md:text-lg text-muted-foreground font-medium">
                        A browser built strictly for AI agents.<br className="hidden sm:block" />
                        <span className="text-primary glow-cyan-subtle">Maximum speed. Maximum token efficiency.</span>
                    </p>
                </div>

                {/* Metric Strip */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                    {[
                        { value: "7.3ms", label: "Shared Memory Fetch" },
                        { value: "0x", label: "Base64 Encoding" },
                        { value: "Hardened", label: "NATS Bridge" },
                        { value: "Stealth", label: "Anti-Bot Core" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="glass-panel rounded-xl px-4 py-5 text-center transition-all hover:bg-primary/5"
                        >
                            <div className="text-2xl font-bold text-primary mb-1 font-mono">
                                {stat.value}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-widest">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
