import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { Cpu, Zap, Activity, ShieldCheck, ArrowLeft, Lock, TrendingDown } from "lucide-react"
import Link from "next/link"

export default function TechnologyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />

            <main className="pt-32 pb-24 px-6">
                <div className="mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="mb-16">

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Technology
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Under the hood of Glazyr Viz lies a proprietary architecture built for high-throughput, low-latency agentic perception.
                        </p>
                    </div>

                    <div className="grid gap-12">
                        {/* 1. Zero-Copy Pipeline */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <Zap className="h-8 w-8 text-primary" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Zero-Copy Vision Pipeline</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Traditional browser automation relies on extracting, encoding, and transmitting Base64 screenshots over bloated WebSocket protocols. This introduces hundreds of milliseconds of latency and massive memory overhead.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Glazyr Viz bypasses this entirely. We tap directly into the native Chromium Viz subsystem, allowing your agents to interact with the raw memory layer seamlessly without expensive data copying.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 2. Big Iron NATS Infrastructure */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <Cpu className="h-8 w-8 text-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Distributed Big Iron Compute</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Agent workloads are structurally distinct from human traffic. They require massive, sustained burst capability. Our dedicated GCP "Big Iron" infrastructure is orchestrated specifically for these AI-driven interaction loops.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        By utilizing high-performance **NATS JetStream** clusters rather than generic HTTP APIs, we guarantee ultra-low latency message delivery and robust telemetry streaming directly to your control loops.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Secure Ephemeral Contexts */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <ShieldCheck className="h-8 w-8 text-emerald-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Secure Ephemeral Contexts</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Under a Zero-Trust architecture, no agent session data persists longer than the compute frame. As soon as the transaction is complete, the associated memory states are aggressively purged.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        User sessions and ledger balances are isolated within distinct, namespace-mapped Upstash Redis databases, ensuring cryptographic separation of workloads.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Open Protocol, Managed Infrastructure */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                        <Lock className="h-8 w-8 text-purple-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Open Protocol, Managed Infrastructure</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Collaboration is at the heart of the AI agent space. We believe that how agents talk to web browsers should be an open standard, which is why our MCP integrations and developer SDKs are completely accessible.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        So, what exactly are you paying for when you buy Glazyr Frames? You are buying access to the bleeding-edge engine. We have extensively patched the core Chromium source tree to build a custom, headless vehicle that reads directly from the Viz shared memory buffer. When you consume a Frame, you are utilizing our proprietary Big Iron compute clusters—infrastructure orchestrated specifically to maintain this impossible latency at scale. We handle the heavy lifting of the hacked engine, so your agents can just perceive and act.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 5. The Economics of Scale */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                        <TrendingDown className="h-8 w-8 text-amber-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">The Brutal Math of Token Burn</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Traditional browser automation forces your LLMs to analyze massive, multi-megabyte Base64 screenshots. Every single frame you send to a model like Claude 3.5 Sonnet or GPT-4o burns thousands of expensive multimodal tokens context window. If your agent requires 50 iterations to solve a complex workflow, that single task just cost you dollars, not cents.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Our Zero-Copy pipeline completely circumvents this financial dead end. Instead of an image, Glazyr delivers mathematically precise DOM coordinates and structured context telemetry under 15KB. This drops your LLM token consumption by an entire order of magnitude. If you are running high-frequency data extraction loops or fleets of autonomous agents, the raw API token savings offset the cost of our infrastructure in hours. You stop paying for empty pixels, and start paying only for pure logical reasoning.
                                    </p>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
