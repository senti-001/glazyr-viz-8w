import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { Cpu, Zap, Activity, ShieldCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TechnologyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />

            <main className="pt-32 pb-24 px-6">
                <div className="mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="mb-16">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Platform
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Our <span className="text-primary">Technology</span>
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

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
