"use client"

import { useState } from "react"
import { Copy, Check, Rocket, ChevronRight } from "lucide-react"

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
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground px-3 py-1.5 text-xs font-semibold transition-all"
        >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : label}
        </button>
    )
}

export function DashboardQuickStart({ sessionToken }: { sessionToken: string }) {
    const command = `openclaw agent --to +15555550123 --message "Here is my Glazyr token: ${sessionToken}. Use the glazyr-viz skill to navigate to https://news.ycombinator.com and extract the title of the top story."`

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Rocket className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-foreground">Quick Start with OpenClaw</h2>
                    <p className="text-sm text-muted-foreground">Your token is pre-filled. Copy, paste, and verify in under 10 seconds.</p>
                </div>
            </div>

            {/* Step-by-step instructions */}
            <div className="grid gap-3">
                <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">1</span>
                    <p className="text-sm text-muted-foreground pt-0.5">
                        Install the skill: <code className="text-primary/80 bg-primary/5 px-1.5 py-0.5 rounded text-xs">cp -r glazyr-viz ~/.openclaw/workspace/skills/glazyr-viz</code>
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">2</span>
                    <p className="text-sm text-muted-foreground pt-0.5">Copy the command below and paste it into your terminal</p>
                </div>
                <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-emerald-400">3</span>
                    <p className="text-sm text-muted-foreground pt-0.5">Your agent will navigate to Hacker News and extract the top story title — confirming end-to-end connectivity</p>
                </div>
            </div>

            {/* Command block */}
            <div className="relative">
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/20 via-emerald-500/20 to-primary/20 blur-sm" />
                <pre className="relative bg-[#0a0a0a] border border-white/10 rounded-xl p-5 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed break-all">
                    {command}
                </pre>
                <div className="absolute top-3 right-3">
                    <CopyButton text={command} label="Copy Command" />
                </div>
            </div>

            <p className="text-xs text-muted-foreground/60">
                <ChevronRight className="h-3 w-3 inline mr-1" />
                Expected output: <code className="text-emerald-400/60">The title of the top story on Hacker News is: &quot;...&quot;</code>
            </p>
        </div>
    )
}
