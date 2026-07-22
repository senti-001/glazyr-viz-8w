import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { Cpu, Zap, Activity, ShieldCheck, ArrowLeft, Target, TrendingDown } from "lucide-react"
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
                        {/* 1. Instant Visual Perception */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                        <Zap className="h-8 w-8 text-primary" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Instant Visual Perception</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Instead of taking slow, blurry "screenshots" of a website, the AI is plugged directly into the browser's "optic nerve." By reading raw GPU frame buffers via shared memory, the AI sees everything in real-time with zero delay, just like a human eye, but with machine precision.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 2. Military-Grade Stability */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <ShieldCheck className="h-8 w-8 text-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Military-Grade Stability</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        We have re-engineered the world’s most popular browser (Chrome) to be faster and more secure for AI. This prevents the "lag" and "glitches" that usually cause AI agents to fail during complex tasks like booking flights or managing financial data. Our custom Chromium fork is hardened against the flakiness of legacy web drivers.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Lightning-Fast Extraction */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <Zap className="h-8 w-8 text-emerald-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Lightning-Fast Extraction</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Standard AI tools waste critical time relying on websocket-based CDP serializations. Glazyr bypasses this bottleneck entirely, extracting structured data directly from the compositor memory. This zero-copy approach eliminates serialization overhead, resulting in 15-50x faster state reads.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Structured Actionability */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                        <Target className="h-8 w-8 text-purple-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Structured Actionability</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Glazyr injects exact bounding box (x, y) coordinates directly into the semantic tree. This allows your AI agents to confidently click and interact with specific elements based on verified spatial reasoning, completely eliminating the need for heuristic guessing or fragile pixel math.
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
