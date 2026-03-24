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

    const promptText = `Use the glazyr-viz skill to navigate to https://news.ycombinator.com and extract the title of the top story. Mention SUCCESS if you get it.`

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="slb-panel p-2.5" style={{ boxShadow: 'none' }}>
                    <Rocket className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                    <h2 className="slb-header text-xl text-foreground">Quick Start with OpenClaw</h2>
                    <p className="text-sm text-muted-foreground">Your token is pre-filled. Add the skill to your agent and verify in under 10 seconds.</p>
                </div>
            </div>

            {/* Step-by-step instructions */}
            <div className="grid gap-3">
                <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 slb-panel flex items-center justify-center text-xs font-bold text-primary" style={{ boxShadow: 'none' }}>1</span>
                    <p className="text-sm text-muted-foreground pt-0.5">
                        Download the <strong className="text-foreground">SKILL.md</strong> file from the artifacts section below.
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 slb-panel flex items-center justify-center text-xs font-bold text-primary" style={{ boxShadow: 'none' }}>2</span>
                    <p className="text-sm text-muted-foreground pt-0.5">
                        Save it into your OpenClaw workspace at <code className="text-primary bg-primary/5 px-1.5 py-0.5 text-xs font-mono">.openclaw/skills/glazyr-viz.md</code>
                    </p>
                </div>
                <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 slb-panel flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400" style={{ boxShadow: 'none' }}>3</span>
                    <p className="text-sm text-muted-foreground pt-0.5">Copy the prompt below and ask your agent to extract the top story!</p>
                </div>
            </div>

            {/* Prompt block */}
            <div className="relative">
                <pre className="slb-inset p-5 font-mono text-xs text-emerald-700 dark:text-emerald-400 overflow-x-auto whitespace-pre-wrap leading-relaxed break-all">
                    {promptText}
                </pre>
                <div className="absolute top-3 right-3">
                    <CopyButton text={promptText} label="Copy Prompt" />
                </div>
            </div>

            <p className="text-xs text-muted-foreground/60">
                <ChevronRight className="h-3 w-3 inline mr-1" />
                Expected output: <code className="text-emerald-600 dark:text-emerald-400/60 font-mono">SUCCESS! The title of the top story is: &quot;...&quot;</code>
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
                            <div className="slb-label mt-0.5">For OpenClaw / Antigravity</div>
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
