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

                        {/* 3. Cost-Effective Intelligence */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <TrendingDown className="h-8 w-8 text-emerald-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Cost-Effective Intelligence</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Standard AI tools waste money by reading thousands of lines of "junk code" on every webpage. Glazyr filters out the noise, sending only the essential structured context (vision.json) to the AI. This maximizes your Smart Data Ratio, making your agents 33x cheaper to run and 16x faster to respond.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Unstoppable Browsing */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                        <Lock className="h-8 w-8 text-purple-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Unstoppable Browsing</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Many websites try to block AI bots. Glazyr makes your AI agents invisible to these security systems by making them behave exactly like a real human user. By using direct memory access (DMA) pixel injection and disabling standard WebDriver artifacts, your agents can access restricted sites without being flagged.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 5. The Canvas & WebGL Advantage */}
                        <section className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                        <Activity className="h-8 w-8 text-amber-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">The Canvas & WebGL Advantage</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        Traditional DOM scrapers break entirely on complex React apps, maps, or WebGL environments. While other tools see a blank box when they look at a financial chart, Glazyr sees the actual data being rendered on the screen. We merge the Accessibility Tree (for semantic identification) with Zero-Copy Vision (for spatial reasoning) to interpret visually rich interfaces that break generic agents.
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
