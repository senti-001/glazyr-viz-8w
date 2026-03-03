"use client"

import { useEffect, useState } from "react"
import { Coins, TrendingUp, Server, Shield, ExternalLink, Flame } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface TokenomicsData {
    rig_ratio: {
        compute_gb: number
        tokens: string
        rate: string
    }
    treasury: {
        balance: string
        balance_usd: string
        pda_address: string
    }
    yield_split: {
        hardware: number
        burn: number
        developer_dao: number
    }
    hardware_acquisition: {
        target: string
        current_capacity: string
        units_acquired: number
    }
    supply_distribution: {
        hardware_treasury: number
        burn_reserve: number
    }
    last_updated: string
    is_live: boolean
}

export function NeuralTokenomics() {
    const [data, setData] = useState<TokenomicsData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTokenomics() {
            try {
                // TODO: Replace with actual Solana API endpoint when available
                // const response = await fetch("/api/solana-status")

                // Using actual tokenomics specification values
                // Ready for live Solana integration when Treasury PDA wallet is created
                const actualData: TokenomicsData = {
                    rig_ratio: {
                        compute_gb: 1,
                        tokens: "1M",
                        rate: "1GB = 1M $NEURAL"
                    },
                    treasury: {
                        balance: "400M", // 40% of total supply (awaiting wallet creation)
                        balance_usd: "$200,000", // Placeholder valuation
                        pda_address: "TBD" // Awaiting Solana wallet creation
                    },
                    yield_split: {
                        hardware: 70, // 70% to Hardware Treasury
                        burn: 20,     // 20% Burned (deflationary)
                        developer_dao: 10 // 10% to Developer DAO
                    },
                    hardware_acquisition: {
                        target: "NVIDIA RTX 5090",
                        current_capacity: "40GB VRAM",
                        units_acquired: 1 // EC2 Cluster + Local 5090
                    },
                    supply_distribution: {
                        hardware_treasury: 40, // 40% of total supply
                        burn_reserve: 10       // 10% burn reserve
                    },
                    last_updated: new Date().toISOString(),
                    is_live: false // Set to true when connected to Solana
                }

                setData(actualData)
            } catch (err) {
                console.error("Failed to fetch tokenomics data:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchTokenomics()
        const interval = setInterval(fetchTokenomics, 60000) // Update every 60s
        return () => clearInterval(interval)
    }, [])

    if (loading || !data) {
        return (
            <div className="flex h-full items-center justify-center rounded-xl border border-border/50 bg-card p-8">
                <Coins className="h-6 w-6 animate-pulse text-primary" />
                <span className="ml-2 font-mono text-sm text-muted-foreground">Loading Tokenomics...</span>
            </div>
        )
    }

    return (
        <section id="tokenomics" className="border-b border-border/50 py-16 sm:py-24 md:py-32" aria-labelledby="tokenomics-heading">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-12">
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
                        Economic Layer
                    </p>
                    <h2 id="tokenomics-heading" className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                        $NEURAL Tokenomics
                    </h2>
                    <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg max-w-2xl">
                        Agentic Gas for the Browser Fork & Proof of Perception. Every 0.3% fee from network usage flows through the Industrial Yield model.
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <span className={`flex items-center gap-1.5 font-mono text-xs ${data.is_live ? 'text-emerald-500' : 'text-amber-500'}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${data.is_live ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                            {data.is_live ? 'LIVE ON SOLANA' : 'AWAITING TREASURY PDA'}
                        </span>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Rig-Ratio Card */}
                    <div className="rounded-xl border border-border/50 bg-gradient-to-br from-card to-primary/5 p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Server className="h-5 w-5 text-primary" />
                                <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">Rig-Ratio</h3>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-3xl font-bold text-foreground">{data.rig_ratio.rate}</p>
                                <p className="mt-1 font-mono text-xs text-muted-foreground">Compute-to-Token Conversion</p>
                            </div>
                            <div className="rounded-lg border border-border/30 bg-muted/30 p-3">
                                <p className="font-mono text-xs text-muted-foreground">
                                    Every <span className="text-primary font-semibold">1GB VRAM</span> generates{" "}
                                    <span className="text-primary font-semibold">1M $NEURAL</span>
                                </p>
                            </div>
                            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                                <p className="font-mono text-[10px] text-muted-foreground">
                                    Current Capacity: <span className="text-foreground font-semibold">{data.hardware_acquisition.current_capacity}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hardware Treasury Card */}
                    <div className="rounded-xl border border-border/50 bg-gradient-to-br from-card to-emerald-500/5 p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-emerald-500" />
                                <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-emerald-500">Hardware Treasury</h3>
                            </div>
                            {data.treasury.pda_address !== "TBD" && (
                                <a
                                    href={`https://explorer.solana.com/address/${data.treasury.pda_address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            )}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-3xl font-bold text-foreground">{data.treasury.balance}</p>
                                <p className="mt-1 font-mono text-xs text-muted-foreground">
                                    $NEURAL ({data.supply_distribution.hardware_treasury}% of supply)
                                </p>
                            </div>
                            <div className="rounded-lg border border-border/30 bg-muted/30 p-3">
                                <p className="font-mono text-[10px] text-muted-foreground">
                                    PDA: {data.treasury.pda_address}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Supply Distribution */}
                    <div className="rounded-xl border border-border/50 bg-gradient-to-br from-card to-violet-500/5 p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Coins className="h-5 w-5 text-violet-500" />
                                <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-violet-500">Supply Distribution</h3>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-mono text-xs text-muted-foreground">Hardware Treasury</span>
                                        <span className="font-mono text-sm font-bold text-foreground">{data.supply_distribution.hardware_treasury}%</span>
                                    </div>
                                    <Progress value={data.supply_distribution.hardware_treasury} className="h-1.5" />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-mono text-xs text-muted-foreground">Burn Reserve</span>
                                        <span className="font-mono text-sm font-bold text-foreground">{data.supply_distribution.burn_reserve}%</span>
                                    </div>
                                    <Progress value={data.supply_distribution.burn_reserve} className="h-1.5" />
                                </div>
                            </div>
                            <div className="rounded-lg border border-border/30 bg-muted/30 p-3">
                                <p className="font-mono text-[10px] text-muted-foreground">
                                    Asset-backed by physical compute capacity
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Industrial Yield Split - 0.3% Fee */}
                <div className="mt-6 rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                    <div className="mb-6">
                        <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">
                            Industrial Yield: 0.3% Fee Split (70/20/10)
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            The Lease Hook: Every interaction with Neural-Chromium's vision/action subsystem incurs a 0.3% fee, automatically routed on-chain.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Hardware Treasury - 70% */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs text-muted-foreground">Hardware Treasury</span>
                                <span className="font-mono text-lg font-bold text-primary">{data.yield_split.hardware}%</span>
                            </div>
                            <Progress value={data.yield_split.hardware} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                                Funds acquisition of new NVIDIA 5090 rigs and EC2 Big Iron clusters
                            </p>
                        </div>

                        {/* Burn - 20% */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <Flame className="h-3 w-3 text-rose-500" />
                                    <span className="font-mono text-xs text-muted-foreground">Burned</span>
                                </div>
                                <span className="font-mono text-lg font-bold text-rose-500">{data.yield_split.burn}%</span>
                            </div>
                            <Progress value={data.yield_split.burn} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                                Deflationary offset to maintain the Latency Moat as platform scales
                            </p>
                        </div>

                        {/* Developer DAO - 10% */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs text-muted-foreground">Developer DAO</span>
                                <span className="font-mono text-lg font-bold text-emerald-500">{data.yield_split.developer_dao}%</span>
                            </div>
                            <Progress value={data.yield_split.developer_dao} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                                Rewards community developers building browser modules (Action, Privacy, Compute)
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-right">
                    <p className="font-mono text-[9px] text-muted-foreground/60 uppercase">
                        Last Updated: {new Date(data.last_updated).toLocaleString()}
                    </p>
                </div>
            </div>
        </section>
    )
}
