"use client"

import { useState } from "react"
import { Copy, Check, Eye, EyeOff, Terminal, Code2, Braces } from "lucide-react"
import Link from "next/link"

const TABS = ["MCP Inspector", "curl", "Python"] as const
type Tab = typeof TABS[number]

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
    const [copied, setCopied] = useState(false)
    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    return (
        <button
            onClick={handleCopy}
            className="slb-btn slb-btn-sm slb-btn-primary inline-flex items-center gap-1.5"
        >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : label}
        </button>
    )
}

// ——— Shared B2B Success View ———
function BetaSuccessView() {
    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="slb-header text-foreground text-xl">Beta Snapshot: SUCCESS</h3>
                    <span className="slb-label text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 font-bold">Closed / Scaling</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    The Glazyr Viz consumer beta has concluded after reaching our target engagement metrics with 55 early adopters. Individual API keys have been deactivated as we pivot to <strong className="text-foreground">exclusive B2B Enterprise infrastructure</strong>.
                </p>
                <div className="slb-inset p-6 bg-primary/5 border-dashed border-primary/30 text-center">
                    <p className="text-xs font-mono text-primary uppercase mb-4 tracking-widest">Enterprise Access Required</p>
                    <button
                        onClick={() => window.open("https://form.typeform.com/to/sbdm0689", "_blank")}
                        className="slb-btn slb-btn-primary px-8 py-3 text-sm font-bold uppercase tracking-widest"
                    >
                        Request Enterprise Migration
                    </button>
                </div>
            </div>
        </div>
    )
}

// ——— Main export ———
export function DashboardKeyring({ sessionToken }: { sessionToken?: string }) {
    return <BetaSuccessView />
}
