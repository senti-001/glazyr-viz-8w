import type { Metadata } from "next"
import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { Zap, Cpu, Activity, Gauge, Terminal, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Benchmarks & Methodology - 7.35ms Perception Latency",
    description: "Rigorous benchmark methodology and claim reconciliation for Glazyr Viz. Zero-copy semantic extraction (>100x speedup) and 7.35ms GPU buffer perception loop (15-50x faster).",
    alternates: {
        canonical: "/benchmarks",
    },
    openGraph: {
        title: "Benchmarks & Methodology - 7.35ms Perception Latency | Glazyr Viz",
        description: "Standardized performance benchmarks, empirical methodology, and public claim reconciliation for the Glazyr Viz zero-copy perception engine.",
        url: "https://glazyr.com/benchmarks",
    },
}

export default function BenchmarksPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />

            <main className="pt-32 pb-24 px-6">
                <div className="mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="mb-14">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Platform
                        </Link>
                        <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3.5 py-1 mb-4 slb-panel">
                            <Gauge className="w-4 h-4 text-primary" />
                            <span className="slb-label text-primary">Empirical Performance Standards</span>
                        </div>
                        <h1 className="slb-header text-4xl md:text-5xl tracking-tight mb-4 text-foreground">
                            Benchmarks <span className="text-primary">&amp;</span> Methodology
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            Glazyr&apos;s published performance metrics are derived from two distinct empirical benchmarks.
                            This page documents our measurement methodology, hardware environment, and exact claim reconciliation.
                        </p>
                    </div>

                    {/* Section 1: What We Measure */}
                    <div className="space-y-10 mb-16">
                        <div>
                            <h2 className="slb-header text-2xl md:text-3xl mb-3 flex items-center gap-3">
                                <Activity className="w-6 h-6 text-primary" />
                                What We Measure
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We measure performance across two separate operational boundaries: <strong>data extraction speed</strong> and the <strong>full perception loop</strong>.
                                We label these distinctly across all documentation.
                            </p>
                        </div>

                        {/* Benchmark A */}
                        <div className="slb-panel p-8 border border-border/80">
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded bg-primary/10 text-primary border border-primary/30 text-xs font-mono font-bold uppercase tracking-wider">
                                        Benchmark A
                                    </span>
                                    <h3 className="text-xl font-bold text-foreground">
                                        Semantic Extraction (The &ldquo;&gt;100x&rdquo; Claim)
                                    </h3>
                                </div>
                                <span className="text-xs font-mono text-green-500 font-bold bg-green-500/10 border border-green-500/20 px-2.5 py-1">
                                    Ratio: &gt;100x Speedup (~133x)
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                Measures the elapsed time to obtain the page&apos;s full semantic tree (the structured DOM/AX tree an AI agent reasons over), starting from a fully loaded DOM state and ending with the populated data structure in agent process memory.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-border/60 text-muted-foreground font-mono text-xs uppercase">
                                            <th className="py-3 px-4">System</th>
                                            <th className="py-3 px-4">Method</th>
                                            <th className="py-3 px-4 text-right">Latency Result</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40 font-mono text-xs">
                                        <tr className="text-muted-foreground">
                                            <td className="py-3.5 px-4 font-semibold text-foreground">Playwright / CDP</td>
                                            <td className="py-3.5 px-4">Serialize tree to JSON &amp; transmit over CDP WebSocket</td>
                                            <td className="py-3.5 px-4 text-right text-orange-400">~400 ms</td>
                                        </tr>
                                        <tr className="bg-primary/5 text-foreground font-bold">
                                            <td className="py-3.5 px-4 text-primary">Glazyr Viz</td>
                                            <td className="py-3.5 px-4">Zero-copy read directly from shared memory (SHM)</td>
                                            <td className="py-3.5 px-4 text-right text-green-400">~3.0 ms</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 italic">
                                * Isolated data-extraction measurement: excludes page load, network transit, and LLM inference.
                            </p>
                        </div>

                        {/* Benchmark B */}
                        <div className="slb-panel p-8 border border-border/80">
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded bg-primary/10 text-primary border border-primary/30 text-xs font-mono font-bold uppercase tracking-wider">
                                        Benchmark B
                                    </span>
                                    <h3 className="text-xl font-bold text-foreground">
                                        Perception Loop (The &ldquo;7.35ms&rdquo; and &ldquo;15–50x&rdquo; Claims)
                                    </h3>
                                </div>
                                <span className="text-xs font-mono text-primary font-bold bg-primary/10 border border-primary/20 px-2.5 py-1">
                                    Ratio: 15–50x Faster
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                Measures one complete perception cycle: reading page state directly through the GPU compositor buffer, converted to structured state with deterministic (x, y) action coordinates ready for agent dispatch.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-border/60 text-muted-foreground font-mono text-xs uppercase">
                                            <th className="py-3 px-4">System</th>
                                            <th className="py-3 px-4">Perception Mechanism</th>
                                            <th className="py-3 px-4 text-right">Step Latency</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40 font-mono text-xs">
                                        <tr className="text-muted-foreground">
                                            <td className="py-3.5 px-4 font-semibold text-foreground">Traditional Agents (Playwright / CDP)</td>
                                            <td className="py-3.5 px-4">CDP serialization overhead + heuristic pixel coordinates</td>
                                            <td className="py-3.5 px-4 text-right text-orange-400">120 ms – 400 ms+</td>
                                        </tr>
                                        <tr className="bg-primary/5 text-foreground font-bold">
                                            <td className="py-3.5 px-4 text-primary">Glazyr Viz (Direct GPU Buffer)</td>
                                            <td className="py-3.5 px-4">Direct GPU buffer access + deterministic exact (x, y) targeting</td>
                                            <td className="py-3.5 px-4 text-right text-green-400">7.35 ms</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 italic">
                                * The headline 7.35ms perception figure represents the median GPU buffer perception loop step.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Claim Reconciliation Table */}
                    <div className="mb-16">
                        <h2 className="slb-header text-2xl md:text-3xl mb-3 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                            Claim Reconciliation
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            Every performance claim and metric displayed across glazyr.com correlates to our benchmark tests as reconciled below:
                        </p>

                        <div className="slb-panel overflow-hidden border border-border/80">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-border bg-muted/20 text-muted-foreground font-mono text-xs uppercase">
                                            <th className="py-3.5 px-4">Public Claim</th>
                                            <th className="py-3.5 px-4">Location</th>
                                            <th className="py-3.5 px-4">Benchmark</th>
                                            <th className="py-3.5 px-4">Empirical Basis</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40 font-mono text-xs">
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">7.35 ms Perception</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Homepage Hero, Technology</td>
                                            <td className="py-3.5 px-4 text-primary font-semibold">Benchmark B</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Full perception step, direct GPU buffer access</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">~3.0 ms Extraction</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Homepage</td>
                                            <td className="py-3.5 px-4 text-primary font-semibold">Benchmark A</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Semantic tree read directly from shared memory</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">Over 100x Speedup</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Homepage</td>
                                            <td className="py-3.5 px-4 text-primary font-semibold">Benchmark A</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">~400 ms CDP serialization vs ~3.0 ms SHM read</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">15–50x Faster</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Homepage, Technology</td>
                                            <td className="py-3.5 px-4 text-primary font-semibold">Benchmark B</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">120–400 ms CDP range vs 7.35 ms GPU buffer</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">120 ms – 400 ms+</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Comparison Table</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">A/B Baseline</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Playwright / CDP per-step latency range</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">~4.1 kb Payload / Step</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Comparison Table</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Baseline</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Extracted text payload in traditional CDP stack</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Test Environment */}
                    <div className="mb-16">
                        <h2 className="slb-header text-2xl md:text-3xl mb-3 flex items-center gap-3">
                            <Cpu className="w-6 h-6 text-primary" />
                            Test Environment
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            To maintain scientific rigor and defensibility, our test environment parameters are declared below:
                        </p>

                        <div className="slb-panel p-6 border border-border/80">
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-mono text-xs">
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Machine</dt>
                                    <dd className="text-foreground font-semibold mt-1">[FILL: CPU model / cores]</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">GPU</dt>
                                    <dd className="text-foreground font-semibold mt-1">[FILL: model — GPU buffer path]</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">RAM / OS</dt>
                                    <dd className="text-foreground font-semibold mt-1">[FILL: RAM size / OS distribution]</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Glazyr Build</dt>
                                    <dd className="text-foreground font-semibold mt-1">[FILL: version / commit]</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Chromium Build</dt>
                                    <dd className="text-foreground font-semibold mt-1">[FILL: Chromium version (identical across both systems)]</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Baseline Stack</dt>
                                    <dd className="text-foreground font-semibold mt-1">Playwright [FILL: version], CDP over WebSocket, headless</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Test Fixture</dt>
                                    <dd className="text-foreground font-semibold mt-1">[FILL: URL(s) or local fixture; DOM node count]</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Date Measured</dt>
                                    <dd className="text-foreground font-semibold mt-1">[FILL: Measurement date]</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Section 4: Method */}
                    <div className="mb-16">
                        <h2 className="slb-header text-2xl md:text-3xl mb-3 flex items-center gap-3">
                            <Terminal className="w-6 h-6 text-primary" />
                            Measurement Controls
                        </h2>
                        <div className="slb-panel p-8 border border-border/80 space-y-4 text-sm text-muted-foreground leading-relaxed">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    Each benchmark is run <strong>[FILL: N]</strong> times following <strong>[FILL: warm-up count]</strong> warm-up cycles to allow JIT stabilization and cache warming.
                                </li>
                                <li>
                                    Reported figures represent the <strong>[FILL: median / p95]</strong> latency distribution across valid runs.
                                </li>
                                <li>
                                    Timing triggers begin at <strong>[FILL: exact start event]</strong> and conclude upon <strong>[FILL: exact end event]</strong>, measured via <strong>[FILL: performance.now() / internal profiler]</strong>.
                                </li>
                                <li>
                                    Both test subjects are evaluated sequentially on identical hardware, state, and runtime session back-to-back.
                                </li>
                                <li>
                                    <strong>Explicit Exclusions:</strong> DNS resolution, initial TCP handshake, full document DOM parsing, and remote LLM inference are strictly excluded to isolate pure browser perception and extraction latency.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 5: Reproducibility & Scope */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="slb-panel p-6 border border-border/80">
                            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-primary" /> Reproducibility
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                The terminal comparison referenced across the site is recorded directly on the benchmark environment described above.
                                A standardized benchmark harness is accessible to enterprise evaluators upon request.
                            </p>
                            <a
                                href="https://form.typeform.com/to/xumIGJOz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs font-mono font-bold text-primary hover:underline"
                            >
                                Request Benchmark Harness &rarr;
                            </a>
                        </div>

                        <div className="slb-panel p-6 border border-border/80">
                            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-orange-400" /> What These Numbers Are Not
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                These metrics measure the perception and extraction layer specifically. They are not end-to-end task completion times (which depend on agent planning, LLM tokens, and target site response delays), nor do they represent non-standard browser configurations.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
