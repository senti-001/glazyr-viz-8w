"use client"

import { useState } from "react"
import { Copy, Check, Rocket, ChevronRight, Download } from "lucide-react"

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

export function DashboardQuickStart({ sessionToken }: { sessionToken: string }) {
    const agentYaml = `vision_provider:
  type: "shared_memory"
  path: "/dev/shm/glazyr_vision"
  fallback: "http_mcp"
  token: "${sessionToken}"`

    const command = `openclaw agent --to +15555550123 --message "Here is my Glazyr token: ${sessionToken}. Use the glazyr-viz skill to navigate to https://news.ycombinator.com and extract the title of the top story."`

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="slb-panel p-2.5" style={{ boxShadow: 'none' }}>
                    <Rocket className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                    <h2 className="slb-header text-xl text-foreground">Quick Start with OpenClaw</h2>
                    <p className="text-sm text-muted-foreground">Your token is pre-filled. Copy, paste, and verify in under 10 seconds.</p>
                </div>
            </div>

            {/* Step-by-step instructions */}
            <div className="grid gap-3">
                <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 slb-panel flex items-center justify-center text-xs font-bold text-primary" style={{ boxShadow: 'none' }}>1</span>
                    <p className="text-sm text-muted-foreground pt-0.5">
                        Install the skill: <code className="text-primary bg-primary/5 px-1.5 py-0.5 text-xs font-mono">cp -r glazyr-viz ~/.openclaw/workspace/skills/glazyr-viz</code>
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 slb-panel flex items-center justify-center text-xs font-bold text-primary" style={{ boxShadow: 'none' }}>2</span>
                    <p className="text-sm text-muted-foreground pt-0.5">Copy the command below and paste it into your terminal</p>
                </div>
                <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 slb-panel flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400" style={{ boxShadow: 'none' }}>3</span>
                    <p className="text-sm text-muted-foreground pt-0.5">Your agent will navigate to Hacker News and extract the top story title — confirming end-to-end connectivity</p>
                </div>
            </div>

            {/* OpenClaw command block */}
            <div className="relative">
                <pre className="slb-inset p-5 font-mono text-xs text-emerald-700 dark:text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed break-all">
                    {command}
                </pre>
                <div className="absolute top-3 right-3">
                    <CopyButton text={command} label="Copy Command" />
                </div>
            </div>

            <p className="text-xs text-muted-foreground/60">
                <ChevronRight className="h-3 w-3 inline mr-1" />
                Expected output: <code className="text-emerald-600 dark:text-emerald-400/60 font-mono">The title of the top story on Hacker News is: &quot;...&quot;</code>
            </p>

            {/* ═══ AGENTIC ONBOARDING SECTION ═══ */}
            <div className="border-t border-border/50 pt-6 mt-6">
                <h3 className="slb-header text-foreground mb-4">Agentic Onboarding Artifacts</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Pre-built configuration files for AI coding assistants. These teach your agent how to use the Glazyr Zero-Copy Vision API.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <a
                        href="/onboarding/glazyr-cursorrules.txt"
                        download=".cursorrules"
                        className="slb-btn flex items-center gap-3 p-4 text-left w-full"
                    >
                        <Download className="h-5 w-5 text-primary shrink-0" />
                        <div>
                            <div className="font-semibold text-sm">.cursorrules</div>
                            <div className="slb-label mt-0.5">For Cursor IDE</div>
                        </div>
                    </a>
                    <a
                        href="/onboarding/glazyr-antigravity-skill.md"
                        download="SKILL.md"
                        className="slb-btn flex items-center gap-3 p-4 text-left w-full"
                    >
                        <Download className="h-5 w-5 text-primary shrink-0" />
                        <div>
                            <div className="font-semibold text-sm">SKILL.md</div>
                            <div className="slb-label mt-0.5">For Google Antigravity</div>
                        </div>
                    </a>
                </div>

                {/* agent.yaml config snippet */}
                <h4 className="slb-header text-sm text-foreground mb-2">Alternative: agent.yaml Integration</h4>
                <p className="text-xs text-muted-foreground mb-3">
                    For direct OpenClaw config integration, add this to your <code className="font-mono text-primary/80">agent.yaml</code>:
                </p>
                <div className="relative">
                    <pre className="slb-inset p-4 font-mono text-xs text-foreground/80 overflow-x-auto whitespace-pre leading-relaxed">
                        {agentYaml}
                    </pre>
                    <div className="absolute top-2 right-2">
                        <CopyButton text={agentYaml} label="Copy" />
                    </div>
                </div>
            </div>
        </div>
    )
}
