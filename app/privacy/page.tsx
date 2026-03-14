import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { Shield, Lock, Eye, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />

            <main className="pt-32 pb-24 px-6">
                <div className="mx-auto max-w-4xl">
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
                            Privacy <span className="text-primary">&</span> Intelligence
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Glazyr Viz is built on the principle of **Zero-Copy Privacy**. We provide the optic nerve for agents without ever compromising the integrity of the host environment.
                        </p>
                    </div>

                    {/* Policy Sections */}
                    <div className="space-y-12">

                        {/* 1. Zero-Copy Perception */}
                        <section className="glass-panel rounded-2xl p-8 border border-primary/20 bg-primary/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                                    <Eye className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold">Zero-Copy Perception</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Unlike traditional agentic scrapers that exfiltrate screenshots to third-party VLMs, Glazyr Viz operates directly within the Chromium Viz subsystem.
                            </p>
                            <ul className="grid md:grid-cols-2 gap-4">
                                <li className="flex items-start gap-2 text-sm">
                                    <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span>No pixel data leaves the secure memory buffer.</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm">
                                    <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span>Analysis and extraction is processed locally on our secure servers.</span>
                                </li>
                            </ul>
                        </section>

                        {/* 2. Intelligence Telemetry */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <Shield className="h-6 w-6 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-bold">Intelligence Telemetry</h2>
                            </div>
                            <div className="prose prose-invert max-w-none text-muted-foreground">
                                <p>
                                    We collect high-frequency performance metrics (FPS, Latency, Throughput) to maintain the platform's 7.35ms benchmark targets. This metadata is strictly decoupled from the actual content of your agent's interactions.
                                </p>
                                <p className="mt-4">
                                    External integrations receive only the necessary data required for autonomous action. We do not store or replay your agent's sensitive session data.
                                </p>
                            </div>
                        </section>

                        {/* 3. Authentication & Identity */}
                        <section className="glass-panel rounded-2xl p-8 border border-white/5 mb-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                                    <Lock className="h-6 w-6 text-indigo-400" />
                                </div>
                                <h2 className="text-2xl font-bold">Authentication & Identity</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                To secure your compute environment and economic ledger, Glazyr Viz utilizes NextAuth (Auth.js) for Zero-Trust identity verification.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-foreground font-semibold mb-2">OAuth Providers</h3>
                                    <p className="text-sm text-muted-foreground">
                                        When you authenticate via GitHub or Google, we collect only your primary email address, public profile name, and unique provider ID. This data is strictly used to provision your secure Senti-001 or Senti_002 compute namespaces.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-foreground font-semibold mb-2">Session Persistence</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Your active session tokens are cryptographically signed and stored in our isolated Upstash Redis ledger. We do not sell, share, or market your identity data to third parties.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Payments & Settlement */}
                        <section className="glass-panel rounded-2xl p-8 border border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                    <Lock className="h-6 w-6 text-emerald-400" />
                                </div>
                                <h2 className="text-2xl font-bold">Payments & Settlement</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Glazyr Credits can be acquired via two distinct pathways, each governed by high-security standards:
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-foreground font-semibold mb-2">Fiat Pathway (Stripe)</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Processed via Stripe's encrypted payment mesh. We do not store credit card information on our servers. Webhooks trigger immediate credit allocation in our high-priority Redis ledger.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-foreground font-semibold mb-2">On-Chain Pathway (Solana/Base)</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Direct USDC settlement on the blockchain. Your wallet address is used solely for transaction verification and proof-of-perception settlement.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 5. Agent Compute & Telemetry Tracking */}
                        <section className="glass-panel rounded-2xl p-8 border border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                    <Zap className="h-6 w-6 text-orange-400" />
                                </div>
                                <h2 className="text-2xl font-bold">Agent Compute & Telemetry Tracking</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                We operate a Zero-Trust architecture for all agent-driven perception requests. We do not track anonymized IP addresses; instead, your compute usage is tied directly to your verified NextAuth session.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-foreground font-semibold mb-2">How Usage is Tracked</h3>
                                    <p className="text-sm text-muted-foreground">
                                        When your agent executes a command, our systems validate your identity. Real-time usage and token savings are aggregated and displayed within your Developer Dashboard.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-foreground font-semibold mb-2">Developer Compute Keys</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Once authenticated, you can generate an active session token from your Developer Dashboard. You must pass this token via the Authorization header to connect your agent to the live network. For example: <code className="text-primary bg-primary/10 px-1 py-0.5 rounded">npx -y @modelcontextprotocol/inspector sse "https://mcp.glazyr.com/mcp/sse" --header "Authorization: Bearer &lt;token&gt;"</code>.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 6. Data Rights */}
                        <section className="pt-8 border-t border-border/50">
                            <h2 className="text-xl font-bold mb-4 uppercase tracking-widest text-primary/80">Developer Rights</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                As a user of the Agentic Fork, you retain absolute ownership of the prompts and logic executed by your agents. We provide the rails; you own the results. For audit requests or data purging, contact <code className="text-primary">support@glazyr.com</code>.
                            </p>
                            <p className="text-[10px] text-muted-foreground/40 mt-8 font-mono">
                                LAST_UPDATED: 2026.03.11_V1.2.0_OAUTH_INTEGRATION
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
