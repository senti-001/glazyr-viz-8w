"use client"

import { useEffect, useState } from "react"

export function BigIronTicker() {
    const [metrics, setMetrics] = useState([
        { label: "Vision Latency", value: "11ms", trend: "stable" },
        { label: "Token Yield", value: "177 TPS", trend: "up" },
        { label: "Compute Cost", value: "$0.001/frame", trend: "neutral" },
        { label: "SHM Buffer", value: "Zero-Copy", trend: "active" },
        { label: "Base Treasury", value: "0x104A...B01", trend: "synced" },
        { label: "VLM Solving", value: "reCAPTCHA v3", trend: "active" },
    ])

    return (
        <div className="w-full overflow-hidden border-y border-primary/10 bg-primary/5 py-2 backdrop-blur-sm">
            <div className="flex animate-ticker whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex shrink-0 items-center">
                        {metrics.map((metric, index) => (
                            <div
                                key={`${i}-${index}`}
                                className="mx-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary/70"
                            >
                                <span className="text-primary/40">•</span>
                                <span className="font-bold text-primary">{metric.label}:</span>
                                <span className="text-foreground">{metric.value}</span>
                                {metric.trend === "up" && <span className="text-green-500">↑</span>}
                                {metric.trend === "stable" && <span className="text-blue-500">→</span>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
