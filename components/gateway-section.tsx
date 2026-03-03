import { TelemetryHud } from "./telemetry-hud"
import { BuildLedger } from "./build-ledger"
import { IntelligenceStream } from "./intelligence-stream"
import { InvestorConcierge } from "./investor-concierge"

export function GatewaySection() {
    return (
        <section id="gateway" className="border-b border-border/50 py-16 sm:py-24 md:py-32" aria-labelledby="gateway-heading">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-12">
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
                        Phase 2: Live Integration
                    </p>
                    <h2 id="gateway-heading" className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                        The Investor & Commerce Gateway
                    </h2>
                    <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg max-w-2xl">
                        Experience real-time telemetry, verify chronological development activity, and engage with our
                        AI-driven investment portal.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Top Row: Telemetry (Larger) and Build Ledger */}
                    <div className="lg:col-span-2">
                        <TelemetryHud />
                    </div>
                    <div className="lg:col-span-1">
                        <BuildLedger />
                    </div>

                    {/* Bottom Row: Intelligence Stream (Full Width or almost full) and Small Concierge */}
                    <div className="lg:col-span-2">
                        <IntelligenceStream />
                    </div>
                    <div className="lg:col-span-1">
                        <InvestorConcierge />
                    </div>
                </div>
            </div>
        </section>
    )
}
