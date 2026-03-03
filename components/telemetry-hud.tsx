"use client"

import { useEffect, useState } from "react"
import { HardDrive, Cpu, Activity, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface TelemetryData {
    disk: {
        used: string
        total: string
        percentage: number
    }
    cpu: {
        usage: number
        model: string
    }
    gpu?: {
        vram_used: string
        vram_total: string
        vram_percentage: number
        model: string
    }
    runtime: {
        status: string
        uptime: string
        version: string
    }
    last_updated: string
}

export function TelemetryHud() {
    const [data, setData] = useState<TelemetryData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchTelemetry() {
            try {
                const response = await fetch("/telemetry.json")
                if (!response.ok) {
                    throw new Error("Failed to fetch telemetry data")
                }
                const json = await response.ok ? await response.json() : null
                setData(json)
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred")
            } finally {
                setLoading(false)
            }
        }

        fetchTelemetry()
        const interval = setInterval(fetchTelemetry, 30000) // Update every 30s
        return () => clearInterval(interval)
    }, [])

    if (loading && !data) {
        return (
            <div className="flex h-full items-center justify-center rounded-xl border border-border/50 bg-card p-8">
                <Activity className="h-6 w-6 animate-pulse text-primary" />
                <span className="ml-2 font-mono text-sm text-muted-foreground">Initializing Telemetry...</span>
            </div>
        )
    }

    if (error || !data) {
        return (
            <div className="flex h-full items-center justify-center rounded-xl border border-border/50 bg-card p-8 text-destructive">
                <span className="font-mono text-sm">Telemetry Offline: {error || "Data missing"}</span>
            </div>
        )
    }

    return (
        <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm h-full">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">Runtime Telemetry</h3>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                {/* CPU Usage */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">CPU Usage</span>
                        </div>
                        <span className="font-mono text-sm font-bold">{data.cpu.usage}%</span>
                    </div>
                    <Progress value={data.cpu.usage} className="h-1.5" />
                    <p className="truncate font-mono text-[10px] text-muted-foreground">{data.cpu.model}</p>
                </div>

                {/* Disk Usage */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Disk Space</span>
                        </div>
                        <span className="font-mono text-sm font-bold">{data.disk.used} / {data.disk.total}</span>
                    </div>
                    <Progress value={data.disk.percentage} className="h-1.5" />
                    <p className="font-mono text-[10px] text-muted-foreground">{data.disk.percentage}% capacity utilized</p>
                </div>

                {/* GPU/VRAM Usage */}
                {data.gpu && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Cpu className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">VRAM</span>
                            </div>
                            <span className="font-mono text-sm font-bold">{data.gpu.vram_used} / {data.gpu.vram_total}</span>
                        </div>
                        <Progress value={data.gpu.vram_percentage} className="h-1.5" />
                        <p className="font-mono text-[10px] text-muted-foreground">{data.gpu.model}</p>
                    </div>
                )}
            </div>

            <div className="mt-8 grid gap-4 border-t border-border/50 pt-6 font-mono text-xs sm:grid-cols-2">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Runtime Status</span>
                    <span className="capitalize text-emerald-500">{data.runtime.status}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="text-foreground">{data.runtime.uptime}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span className="text-foreground">{data.runtime.version}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Activity</span>
                    <span className="text-foreground">Zero-Copy Ingest</span>
                </div>
            </div>

            <div className="mt-4 text-right">
                <p className="font-mono text-[9px] text-muted-foreground/60 uppercase">
                    Last Check: {new Date(data.last_updated).toLocaleTimeString()}
                </p>
            </div>
        </div>
    )
}
