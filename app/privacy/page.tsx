import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { Shield, Lock, Eye, Zap, Scale, FileText, UserCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen holographic-bg text-foreground font-sans">
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
                        <h1 className="slb-header text-4xl md:text-6xl tracking-tight mb-6">
                            Privacy <span className="text-primary">&amp;</span> Intelligence
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Glazyr Viz is built on the principle of <strong className="text-foreground">Zero-Copy Privacy</strong>. We provide the optic nerve for agents without ever compromising the integrity of the host environment.
                        </p>
                        <div className="slb-inset inline-block px-4 py-2 mt-4">
                            <span className="slb-label">Effective Date: March 15, 2026 &bull; Last Updated: March 15, 2026 &bull; Version 2.0.0</span>
                        </div>
                    </div>

                    {/* Policy Sections */}
                    <div className="space-y-8">

                        {/* 1. Scope & Applicability */}
                        <section className="slb-panel p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="slb-panel p-3" style={{ boxShadow: 'none' }}>
                                    <Scale className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="slb-header text-2xl">Scope &amp; Applicability</h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                                <p>
                                    This Privacy Policy applies to all users of the Glazyr Viz platform (&quot;Platform&quot;), operated by <strong className="text-foreground">MAGNETAR SENTIENT L.L.C.</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;). It covers all products, services, and APIs provided via <code className="text-primary font-mono">glazyr.com</code>, <code className="text-primary font-mono">mcp.glazyr.com</code>, and associated infrastructure.
                                </p>
                                <p>
                                    This policy is designed to comply with applicable United States state-level data privacy legislation, including the Iowa Consumer Data Protection Act (ICDPA, effective January 1, 2025), the California Consumer Privacy Act (CCPA/CPRA), and other 2025/2026 state privacy laws.
                                </p>
                            </div>
                        </section>

                        {/* 2. Zero-Copy Perception */}
                        <section className="slb-panel slb-panel-highlight p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="slb-panel p-3" style={{ boxShadow: 'none' }}>
                                    <Eye className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="slb-header text-2xl">Zero-Copy Perception Architecture</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                                Unlike traditional agentic scrapers that exfiltrate screenshots to third-party VLMs, Glazyr Viz operates directly within the Chromium Viz subsystem. Our architecture is designed with privacy as a foundational principle:
                            </p>
                            <ul className="grid md:grid-cols-2 gap-4">
                                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span>Pixel data is processed within the secure POSIX shared memory buffer (<code className="text-primary font-mono">/dev/shm</code>) and is never transmitted to external third parties.</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span>Semantic chunking reduces the raw frame to a 461-byte context payload (98.7% token reduction) prior to any LLM inference.</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span>Visual analysis is processed on our secure GCP &quot;Big Iron&quot; infrastructure. Raw pixel data does not leave this controlled environment.</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span>For remote deployments, the Binary WebSocket channel uses zstd compression with end-to-end encryption.</span>
                                </li>
                            </ul>
                        </section>

                        {/* 3. Data Categories Collected */}
                        <section className="slb-panel p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="slb-panel p-3" style={{ boxShadow: 'none' }}>
                                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="slb-header text-2xl">Data Categories Collected</h2>
                            </div>
                            <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
                                <p>We collect the following categories of personal data, strictly limited to what is necessary for platform operation:</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-2">Identity Data</h4>
                                        <p className="text-xs">Public profile name, primary email address, and unique provider ID from OAuth providers (GitHub, Google). Used to provision your secure compute namespace.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-2">Session &amp; Authentication Data</h4>
                                        <p className="text-xs">Cryptographically signed session tokens stored in our isolated Upstash Redis ledger. Used for Zero-Trust identity verification.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-2">Performance Telemetry</h4>
                                        <p className="text-xs">FPS, latency, throughput, and frame count metrics. Strictly decoupled from interaction content. Used to maintain 7.35ms benchmark targets.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-2">Payment Data</h4>
                                        <p className="text-xs">Fiat: processed via Stripe (PCI-compliant, we never store card data). On-chain: wallet address for USDC transaction verification only.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-2">Visual Frame Metadata</h4>
                                        <p className="text-xs">Frame sequence IDs, resolution, and timestamp data. Raw visual content is processed ephemerally and not persistently stored.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-2">Analytics Data</h4>
                                        <p className="text-xs">Google Analytics collects standard web analytics (page views, session duration, device type). Governed by Google&apos;s privacy policy. You may opt out via browser settings.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 4. Purpose of Processing */}
                        <section className="slb-panel p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="slb-panel p-3" style={{ boxShadow: 'none' }}>
                                    <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h2 className="slb-header text-2xl">Purpose of Processing</h2>
                            </div>
                            <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                                <p>We process your data exclusively for the following purposes:</p>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2"><Zap className="h-3 w-3 text-primary shrink-0 mt-1" /><span><strong className="text-foreground">Platform Operation:</strong> Authenticating users, provisioning compute resources, executing agent commands, and delivering vision extraction results.</span></li>
                                    <li className="flex items-start gap-2"><Zap className="h-3 w-3 text-primary shrink-0 mt-1" /><span><strong className="text-foreground">Billing &amp; Settlement:</strong> Processing payments via Stripe and on-chain settlement, tracking frame consumption against your account balance.</span></li>
                                    <li className="flex items-start gap-2"><Zap className="h-3 w-3 text-primary shrink-0 mt-1" /><span><strong className="text-foreground">Performance Optimization:</strong> Aggregating telemetry to maintain sub-16ms latency benchmarks and system reliability.</span></li>
                                    <li className="flex items-start gap-2"><Zap className="h-3 w-3 text-primary shrink-0 mt-1" /><span><strong className="text-foreground">Security &amp; Compliance:</strong> Monitoring for unauthorized access, enforcing rate limits, and maintaining audit logs.</span></li>
                                </ul>
                                <p className="mt-4"><strong className="text-foreground">We do not use your data for:</strong> AI model training, targeted advertising, behavioral profiling, or sale to third parties.</p>
                            </div>
                        </section>

                        {/* 5. Consumer Rights (ICDPA) */}
                        <section className="slb-panel slb-panel-highlight p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="slb-panel p-3" style={{ boxShadow: 'none' }}>
                                    <UserCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h2 className="slb-header text-2xl">Your Rights Under State Privacy Law</h2>
                            </div>
                            <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
                                <p>Under the Iowa Consumer Data Protection Act (ICDPA), California Consumer Privacy Act (CCPA/CPRA), and other applicable state privacy laws, you have the following rights:</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Right to Confirm</h4>
                                        <p className="text-xs">You may confirm whether we are processing your personal data.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Right to Access</h4>
                                        <p className="text-xs">You may request a copy of the personal data we hold about you.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Right to Delete</h4>
                                        <p className="text-xs">You may request permanent deletion of your personal data from our systems.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Right to Portability</h4>
                                        <p className="text-xs">You may obtain a portable copy of the data you have provided to us.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Right to Opt-Out of Sale</h4>
                                        <p className="text-xs">You may opt out of the sale of your personal data. <strong className="text-foreground">We do not sell personal data.</strong></p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Right to Opt-Out of Targeted Advertising</h4>
                                        <p className="text-xs">You may opt out of targeted advertising. <strong className="text-foreground">We do not engage in targeted advertising.</strong></p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 6. DSAR Instructions */}
                        <section className="slb-panel p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="slb-panel p-3" style={{ boxShadow: 'none' }}>
                                    <Lock className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                                </div>
                                <h2 className="slb-header text-2xl">Data Subject Access Requests (DSAR)</h2>
                            </div>
                            <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
                                <p>To exercise any of the rights described above, submit a request to:</p>
                                <div className="slb-inset p-6 text-center">
                                    <p className="slb-header text-lg text-primary mb-2">support@glazyr.com</p>
                                    <p className="text-xs">MAGNETAR SENTIENT L.L.C. &bull; DSAR Processing Department</p>
                                </div>
                                <p>We will verify your identity using the email address associated with your OAuth provider. Requests will be processed within <strong className="text-foreground">45 days</strong>. Under the ICDPA, if we are unable to comply, we will provide a written explanation and you may appeal the decision.</p>
                                <p>Under Iowa law, controllers have a <strong className="text-foreground">90-day cure period</strong> to remediate identified violations before enforcement action. We are committed to prompt resolution of all privacy concerns.</p>
                            </div>
                        </section>

                        {/* 7. Data Security */}
                        <section className="slb-panel p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="slb-panel p-3" style={{ boxShadow: 'none' }}>
                                    <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="slb-header text-2xl">Data Security &amp; Breach Notification</h2>
                            </div>
                            <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
                                <p>We implement reasonable administrative, technical, and physical data security practices proportionate to the volume and nature of the data processed:</p>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2"><Shield className="h-3 w-3 text-primary shrink-0 mt-1" /><span><strong className="text-foreground">Chromium Hardening:</strong> ThinLTO/CFI hardened Chromium Viz compositor with restricted memory access patterns.</span></li>
                                    <li className="flex items-start gap-2"><Shield className="h-3 w-3 text-primary shrink-0 mt-1" /><span><strong className="text-foreground">Transport Security:</strong> zstd-compressed Binary WebSocket with TLS 1.3 for all remote frame transmission.</span></li>
                                    <li className="flex items-start gap-2"><Shield className="h-3 w-3 text-primary shrink-0 mt-1" /><span><strong className="text-foreground">Session Isolation:</strong> Cryptographically signed tokens stored in isolated Upstash Redis with per-user namespacing.</span></li>
                                    <li className="flex items-start gap-2"><Shield className="h-3 w-3 text-primary shrink-0 mt-1" /><span><strong className="text-foreground">Infrastructure:</strong> GCP &quot;Big Iron&quot; compute with VPC isolation, IAM-restricted access, and automated security patching.</span></li>
                                </ul>
                                <p className="border-t border-border/50 pt-4 mt-4">
                                    <strong className="text-foreground">Breach Notification:</strong> Under Iowa Code Chapter 715C, any security breach compromising the personal information of 500 or more Iowa residents will be reported to the Consumer Protection Division Director within five business days of notifying affected individuals.
                                </p>
                            </div>
                        </section>

                        {/* 8. Third-Party Disclosures */}
                        <section className="slb-panel p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="slb-panel p-3" style={{ boxShadow: 'none' }}>
                                    <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h2 className="slb-header text-2xl">Third-Party Services</h2>
                            </div>
                            <div className="text-muted-foreground text-sm leading-relaxed">
                                <p className="mb-4">We integrate with the following third-party service providers. Each operates under their own privacy policies:</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Stripe</h4>
                                        <p className="text-xs">Fiat payment processing. PCI-DSS Level 1 compliant. We never store payment card data.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">GitHub / Google OAuth</h4>
                                        <p className="text-xs">Authentication providers. We receive only public profile name, email, and provider ID.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Google Cloud Platform</h4>
                                        <p className="text-xs">Compute infrastructure for the &quot;Big Iron&quot; vision pipeline. Data stays within GCP VPC boundaries.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Upstash Redis</h4>
                                        <p className="text-xs">Session and ledger storage. Encrypted at rest and in transit. Per-user namespace isolation.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Google Analytics</h4>
                                        <p className="text-xs">Standard web analytics. You can opt out via browser settings or the Google Analytics Opt-out Browser Add-on.</p>
                                    </div>
                                    <div className="slb-inset p-4">
                                        <h4 className="slb-header text-foreground text-sm mb-1">Base Network (Coinbase)</h4>
                                        <p className="text-xs">On-chain USDC settlement via the x402 protocol. Wallet addresses are used only for transaction verification.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 9. Opt-Out Mechanisms */}
                        <section className="slb-panel slb-panel-highlight p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="slb-panel p-3" style={{ boxShadow: 'none' }}>
                                    <UserCheck className="h-6 w-6 text-primary" />
                                </div>
                                <h2 className="slb-header text-2xl">Opt-Out Mechanisms</h2>
                            </div>
                            <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
                                <p>You may exercise the following opt-out rights at any time:</p>
                                <div className="grid md:grid-cols-1 gap-3">
                                    <div className="slb-inset p-4 flex items-start gap-3">
                                        <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="slb-header text-foreground text-sm mb-1">Performance Telemetry</h4>
                                            <p className="text-xs">Email <code className="text-primary font-mono">support@glazyr.com</code> with subject &quot;OPT-OUT TELEMETRY&quot; to disable aggregated performance metric collection for your account.</p>
                                        </div>
                                    </div>
                                    <div className="slb-inset p-4 flex items-start gap-3">
                                        <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="slb-header text-foreground text-sm mb-1">Google Analytics</h4>
                                            <p className="text-xs">Install the <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a> or enable &quot;Do Not Track&quot; in your browser settings.</p>
                                        </div>
                                    </div>
                                    <div className="slb-inset p-4 flex items-start gap-3">
                                        <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="slb-header text-foreground text-sm mb-1">Account Deletion</h4>
                                            <p className="text-xs">Email <code className="text-primary font-mono">support@glazyr.com</code> with subject &quot;DELETE ACCOUNT&quot; to permanently delete all data associated with your account, including session tokens, credit balance, and telemetry history.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 10. Developer Rights */}
                        <section className="pt-8 border-t border-border/50">
                            <h2 className="slb-header text-xl text-primary/80 uppercase tracking-widest mb-4">Developer Rights</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                As a user of the Glazyr Viz platform, you retain absolute ownership of the prompts, logic, and outputs produced by your agents. We provide the infrastructure; you own the results. For audit requests, data export, or account purging, contact <code className="text-primary font-mono">support@glazyr.com</code>.
                            </p>
                            <div className="slb-inset inline-block px-4 py-2 mt-6">
                                <span className="slb-label">LAST UPDATED: 2026.03.15 V2.0.0 ICDPA_COMPLIANCE</span>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
