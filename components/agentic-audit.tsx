"use client"

import { useEffect, useState } from "react"

interface AgenticAuditData {
    rig_ratio: number
    treasury_balance: string
    vram_pool: string
    is_live: boolean
}

export function AgenticAudit() {
    const [data, setData] = useState<AgenticAuditData | null>(null)

    useEffect(() => {
        async function fetchAuditData() {
            try {
                // TODO: Replace with actual Solana API endpoint
                // const response = await fetch("/api/agentic-audit")

                // Using actual specification values
                const auditData: AgenticAuditData = {
                    rig_ratio: 1.0, // 1GB VRAM / 1M $NEURAL
                    treasury_balance: "400M $NEURAL",
                    vram_pool: "40GB",
                    is_live: false // Set to true when connected to Solana
                }

                setData(auditData)
            } catch (err) {
                console.error("Failed to fetch system audit data:", err)
            }
        }

        fetchAuditData()
        const interval = setInterval(fetchAuditData, 60000) // Update every 60s
        return () => clearInterval(interval)
    }, [])

    if (!data) return null

    return (
        <div className="border-t border-border/50 bg-muted/30 py-2">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${data.is_live ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                        <span className="hidden sm:inline">System Audit:</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60">Rig-Ratio:</span>
                        <span className="font-semibold text-foreground">{data.rig_ratio}</span>
                    </div>
                    <div className="hidden sm:block text-muted-foreground/40">|</div>
                    <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60">Treasury PDA:</span>
                        <span className="font-semibold text-foreground">{data.treasury_balance}</span>
                    </div>
                    <div className="hidden sm:block text-muted-foreground/40">|</div>
                    <div className="flex items-center gap-1">
                        <span className="text-muted-foreground/60">VRAM Pool:</span>
                        <span className="font-semibold text-foreground">{data.vram_pool}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
