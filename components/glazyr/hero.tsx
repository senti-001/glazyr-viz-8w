"use client"

import Image from "next/image"
import { Zap, Copy, Check } from "lucide-react"
import { useState } from "react"
import dynamic from "next/dynamic"

const BigIronTicker = dynamic(
    () => import("@/components/glazyr/big-iron-ticker").then((mod) => mod.BigIronTicker),
    { ssr: false }
)

export function Hero() {
    const [activeTab, setActiveTab] = useState<'python' | 'typescript'>('python');
    const [copied, setCopied] = useState(false);

    const snippets = {
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
                <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 text-pretty">
                    Autonomous systems require <strong>7.35ms Zero-Copy latency</strong>. See what the agent sees, instantly. Unlimited parallelism and built-in Anti-Bot Stealth.
                </p>

                {/* Interactive MCP CTA */}
                <div className="flex flex-col items-center justify-center gap-6 mb-10 w-full max-w-2xl mx-auto">
                    <div className="relative w-full group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-primary rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                        <div className="relative bg-zinc-950/80 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl overflow-hidden text-left">
                            <div className="flex items-center border-b border-white/5 bg-white/5 px-4 py-2 gap-4">
                                <button
                                    onClick={() => setActiveTab('python')}
                                    className={`text-xs font-semibold tracking-wide transition-colors ${activeTab === 'python' ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    Python
                                </button>
                                <button
                                    onClick={() => setActiveTab('typescript')}
                                    className={`text-xs font-semibold tracking-wide transition-colors ${activeTab === 'typescript' ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    TypeScript
                                </button>
                            </div>
                            <div className="flex items-start justify-between p-4 md:p-5" aria-label={`Glazyr Viz Integration Command: ${snippets[activeTab]}`}>
                                <div className="sr-only">
                                    To connect to the Glazyr VisionEngine MCP, run this command:
                                    npx -y @modelcontextprotocol/inspector sse "https://mcp.glazyr.com/mcp/sse"
                                </div>
                                <pre className="text-[10px] sm:text-xs md:text-sm font-mono text-zinc-300 overflow-x-auto w-full leading-relaxed" title="NPM MCP Transport Command">
                                    <code className="language-typescript">{snippets[activeTab]}</code>
                                </pre>
                                <button
                                    onClick={copyCommand}
                                    className="ml-3 sm:ml-4 p-2 sm:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white transition-all focus:outline-none flex-shrink-0 group/btn"
                                    aria-label="Copy snippet"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />}
                                </button>
                            </div>
                        </div>
                        {/* Floating Tooltip instruction */}
                        <div className="absolute -top-3 right-4 sm:-right-4 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                            Integrate Now
                        </div>
                    </div>

                    <a
                        href="#agentic-link"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-8 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all glow-cyan-subtle"
                    >
                        <Zap className="h-4 w-4" />
                        Explore Infrastructure
                    </a>
                </div>

                {/* Technical Specs Footer */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-muted-foreground/60 tracking-widest uppercase">
                    <span>TARGET_ENV: GCE_N2_STANDARD_8</span>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-primary/30" />
                    <span>ARCH: CASCADE_LAKE</span>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-primary/30" />
                    <span>VIZ_SUBSYSTEM: ZERO_COPY_DMA</span>
                </div>

                {/* System Ticker */}
                <div className="mt-10 md:mt-16 mx-auto max-w-2xl space-y-8">
                    <BigIronTicker />
                </div>

                {/* Metric Strip */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                    {[
                        { value: "7.3ms", label: "Zero-Copy" },
                        { value: "Free", label: "Beta Validator" },
                        { value: "Hardened", label: "CI/CD Pipeline" },
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
