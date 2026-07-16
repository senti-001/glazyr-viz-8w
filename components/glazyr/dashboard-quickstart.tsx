"use client"

import { useState, useEffect } from "react"
import { Copy, Check, Rocket, Terminal, Code2, Play, Key } from "lucide-react"

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
            className="slb-btn slb-btn-sm slb-btn-outline inline-flex items-center gap-1.5 bg-background hover:bg-muted"
        >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : label}
        </button>
    )
}

export function DashboardQuickStart() {
    const [apiKey, setApiKey] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchKeys = async () => {
            try {
                const res = await fetch("/api/keys")
                const data = await res.json()
                if (data.keys && data.keys.length > 0) {
                    setApiKey(data.keys[0].key) // Use the first available API key
                }
            } finally {
                setLoading(false)
            }
        }
        fetchKeys()
    }, [])

    if (loading) {
        return <div className="text-muted-foreground animate-pulse p-4">Loading integration settings...</div>
    }

    if (!apiKey) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <Key className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">API Key Required</h2>
                        <p className="text-muted-foreground mt-1">Generate an API key in the Keyring above to unlock your Quick Start instructions.</p>
                    </div>
                </div>
            </div>
        )
    }

    const npmInstallCommand = `npx @glazyr/mcp-server init --key=${apiKey}`
    const testScript = `import { Glazyr } from '@glazyr/sdk';

// Initialize with your actual API key
const client = new Glazyr({ apiKey: '${apiKey}' });

// Launch an agent to extract data
const result = await client.agent.run({
  url: 'https://news.ycombinator.com',
  task: 'Extract the top 3 story titles'
});

console.log(result);`

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Rocket className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Quick Start Guide</h2>
                    <p className="text-muted-foreground mt-1">Get your Glazyr Vision agents running locally in under 2 minutes.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Step 1 */}
                <div className="relative pl-10 min-w-0">
                    <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm">
                        1
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                            <Terminal className="h-4 w-4 text-muted-foreground" />
                            Install the MCP Server
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">
                            Initialize the Glazyr Model Context Protocol server in your local project. Your API Key is securely injected.
                        </p>
                        <div className="relative rounded-lg bg-muted/50 border border-border">
                            <div className="overflow-x-auto p-4 pr-28">
                                <code className="text-foreground font-mono text-sm whitespace-pre">{npmInstallCommand}</code>
                            </div>
                            <div className="absolute right-2 top-2">
                                <CopyButton text={npmInstallCommand} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative pl-10 min-w-0">
                    <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm">
                        2
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                            <Code2 className="h-4 w-4 text-muted-foreground" />
                            Run your first Agentic Task
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">
                            Use the Glazyr SDK to launch a zero-copy vision agent locally and execute a workflow on any website.
                        </p>
                        <div className="relative rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-50">
                            <div className="overflow-x-auto p-4 pr-32">
                                <pre className="font-mono text-sm">
                                    <code>{testScript}</code>
                                </pre>
                            </div>
                            <div className="absolute right-2 top-2">
                                <CopyButton text={testScript} label="Copy Code" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative pl-10 min-w-0">
                    <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold shadow-sm">
                        3
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                            <Play className="h-4 w-4 text-muted-foreground" />
                            Watch it live
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Run your script. You can monitor the agent's real-time vision feed and DOM interactions locally in the <a href="/dashboard/sessions" className="text-primary font-semibold hover:underline">Live Sessions Inspector</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
