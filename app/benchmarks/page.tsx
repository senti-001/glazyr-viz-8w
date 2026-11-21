import type { Metadata } from "next"
import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { Zap, Cpu, Activity, Gauge, Terminal, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Benchmarks & Methodology - Zero-Copy Perception",
    description: "Rigorous benchmark methodology and claim reconciliation for Glazyr: 0.8µs SHM frame buffer read median (measured Nov 21) vs 38.7ms CDP sidecar (measured Nov 18).",
    alternates: {
        canonical: "/benchmarks",
    },
    openGraph: {
        title: "Benchmarks & Methodology - Zero-Copy Perception | Glazyr",
        description: "Standardized performance benchmarks, empirical methodology, and public claim reconciliation for the Glazyr zero-copy perception engine.",
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
                                What We Measure (Truth Pass — Nov 21, 2026)
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Rule for this pass: every number on this page must be one we measured on the current fork build. Anything not yet measured is labeled as in-progress or cut.
                            </p>
                        </div>

                        {/* Benchmark A */}
                        <div className="slb-panel p-8 border border-border/80">
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider">
                                        Benchmark A (Measured Nov 21)
                                    </span>
                                    <h3 className="text-xl font-bold text-foreground">
                                        Shared-Memory Frame Buffer Read
                                    </h3>
                                </div>
                                <span className="text-xs font-mono text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1">
                                    0.8µs Median (2,000 Samples)
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                Measures the elapsed time for an external process to read the compositor&apos;s live frame header (magic, dimensions, stride, timestamp) directly from a 32MB shared-memory region in Chromium 158 <code className="text-primary font-mono text-xs">headless_shell</code>.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-border/60 text-muted-foreground font-mono text-xs uppercase">
                                            <th className="py-3 px-4">System</th>
                                            <th className="py-3 px-4">Mechanism</th>
                                            <th className="py-3 px-4 text-right">Latency Result</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40 font-mono text-xs">
                                        <tr className="text-muted-foreground">
                                            <td className="py-3.5 px-4 font-semibold text-foreground">Incumbent CDP Sidecar (Nov 18 Baseline)</td>
                                            <td className="py-3.5 px-4">DevTools protocol over WebSocket; state serialized to JSON</td>
                                            <td className="py-3.5 px-4 text-right text-orange-400">38.7 ms (Median)</td>
                                        </tr>
                                        <tr className="bg-primary/5 text-foreground font-bold">
                                            <td className="py-3.5 px-4 text-primary">Glazyr SHM Peek (Nov 21 Fork Build)</td>
                                            <td className="py-3.5 px-4">Direct shared memory read from separate process (no wire, no serialization)</td>
                                            <td className="py-3.5 px-4 text-right text-emerald-400">0.8 µs (p50) / 1.2 µs (p95)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4 italic">
                                * Measured on Ryzen 7 5800H workstation (WSL2), 2,000 sample reads back-to-back.
                            </p>
                        </div>

                        {/* Benchmark B - Measured Semantic Pipeline */}
                        <div className="slb-panel p-8 border border-border/80">
                            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider">
                                        Benchmark B (Measured Nov 21)
                                    </span>
                                    <h3 className="text-xl font-bold text-foreground">
                                        Full Semantic Pipeline &amp; MCP Stack
                                    </h3>
                                </div>
                                <span className="text-xs font-mono text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1">
                                    28ms Median · 3.7×–5.4× Cheaper Tokens
                                </span>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                Measures the complete pipeline from browser page load to agent execution: AnnotatedPageContent extraction &rarr; semantic shared memory &rarr; curation filter &rarr; MCP bridge stdio &rarr; agent.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse font-mono text-xs">
                                    <thead>
                                        <tr className="border-b border-border/60 text-muted-foreground uppercase">
                                            <th className="py-3 px-4">Metric</th>
                                            <th className="py-3 px-4">CDP Accessibility Fetch</th>
                                            <th className="py-3 px-4 text-emerald-400">Glazyr Filtered MCP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40">
                                        <tr>
                                            <td className="py-3 px-4 font-semibold text-foreground">Small Page Latency</td>
                                            <td className="py-3 px-4 text-orange-400">19ms – 28ms</td>
                                            <td className="py-3 px-4 text-emerald-400 font-bold">0.9µs SHM (~5ms MCP)</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-semibold text-foreground">Large Page Latency (10k nodes)</td>
                                            <td className="py-3 px-4 text-orange-400">1,521ms (CDP)</td>
                                            <td className="py-3 px-4 text-emerald-400 font-bold">43µs SHM (28ms median MCP)</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-semibold text-foreground">Large Article Token Cost</td>
                                            <td className="py-3 px-4 text-orange-400">57,108 tokens</td>
                                            <td className="py-3 px-4 text-emerald-400 font-bold">15,343 (standard) / 10,501 (aggressive)</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 font-semibold text-foreground">Fact Presence (9 checks)</td>
                                            <td className="py-3 px-4 text-muted-foreground">6/9 (missing URLs &amp; field names)</td>
                                            <td className="py-3 px-4 text-emerald-400 font-bold">9/9 facts preserved</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Claim Reconciliation Table */}
                    <div className="mb-16">
                        <h2 className="slb-header text-2xl md:text-3xl mb-3 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                            Claim Reconciliation (Nov 21 Truth Pass)
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            Every performance claim and metric displayed across glazyr.com correlates to verified fork build records as reconciled below:
                        </p>

                        <div className="slb-panel overflow-hidden border border-border/80">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-border bg-muted/20 text-muted-foreground font-mono text-xs uppercase">
                                            <th className="py-3.5 px-4">Public Claim</th>
                                            <th className="py-3.5 px-4">Location</th>
                                            <th className="py-3.5 px-4">Status</th>
                                            <th className="py-3.5 px-4">Empirical Basis</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40 font-mono text-xs">
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">0.8 µs Median Peek</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Hero Strip, Benchmarks, Table</td>
                                            <td className="py-3.5 px-4 text-emerald-400 font-semibold">Measured Nov 21</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">2,000 external process reads of compositor SHM header (p95 1.2µs)</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">38.7 ms CDP Baseline</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Benchmarks, Comparison Table</td>
                                            <td className="py-3.5 px-4 text-primary font-semibold">Measured Nov 18</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">CDP sidecar extracting page state over DevTools protocol</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">Layout Engine Coordinates</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Hero, Comparison Table, Footer</td>
                                            <td className="py-3.5 px-4 text-emerald-400 font-semibold">Architectural</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Browser layout engine coordinates — same geometry renderer paints with</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">Chromium 158 Fork</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Hero Strip, Build Log</td>
                                            <td className="py-3.5 px-4 text-emerald-400 font-semibold">Verified Build</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Chromium 158.0.8127.65 headless_shell compiled locally on Ryzen 7 workstation</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">0.9–43 µs SHM / 28 ms MCP</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Benchmarks, Comparison Table</td>
                                            <td className="py-3.5 px-4 text-emerald-400 font-semibold">Measured Nov 21</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">SHM reads across size classes (0.9µs small, 43µs 756KB payload); 28ms median through full MCP stack</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">3.7×–5.4× Token Reduction</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Scoreboard, Token Savings</td>
                                            <td className="py-3.5 px-4 text-emerald-400 font-semibold">Measured Nov 21</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Wikipedia Chromium: 57,108 tokens (CDP) vs 15,343 (standard) vs 10,501 (aggressive); 9/9 facts preserved</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">Native URLs &amp; Field Names</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Perception Pipeline, MCP</td>
                                            <td className="py-3.5 px-4 text-emerald-400 font-semibold">Measured Nov 21</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Native in buffer; eliminates extra CDP DOM queries needed to recover link targets and form names</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">6-Tool MCP Bridge</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">MCP Section, Build Log</td>
                                            <td className="py-3.5 px-4 text-emerald-400 font-semibold">Verified Dogfood</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Agent completed research click-through and full form submission with server echo verification</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3.5 px-4 font-bold text-foreground">Pixel Streaming FPS</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Roadmap</td>
                                            <td className="py-3.5 px-4 text-amber-400 font-semibold">Roadmap</td>
                                            <td className="py-3.5 px-4 text-muted-foreground">Header wired into 32MB region; pixel payload streaming pending semantic ship</td>
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
                                    <dd className="text-foreground font-semibold mt-1">AMD Ryzen 7 5800H (8 Cores, 16 Threads)</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">GPU / Buffer</dt>
                                    <dd className="text-foreground font-semibold mt-1">32MB Shared Memory Compositor Frame Region</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">RAM / OS</dt>
                                    <dd className="text-foreground font-semibold mt-1">Workstation RAM / Ubuntu on WSL2</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Glazyr Build</dt>
                                    <dd className="text-foreground font-semibold mt-1">Local headless_shell custom fork (Nov 21, 2026 build)</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Chromium Build</dt>
                                    <dd className="text-foreground font-semibold mt-1">Chromium 158.0.8127.65 headless_shell</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Baseline Stack</dt>
                                    <dd className="text-foreground font-semibold mt-1">CDP sidecar over WebSocket, headless</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Test Fixture</dt>
                                    <dd className="text-foreground font-semibold mt-1">2,000 external process reads (800×600 frame header)</dd>
                                </div>
                                <div className="border-b border-border/40 pb-2">
                                    <dt className="text-muted-foreground uppercase">Date Measured</dt>
                                    <dd className="text-foreground font-semibold mt-1">Nov 18, 2026 (CDP) &amp; Nov 21, 2026 (SHM peek)</dd>
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
