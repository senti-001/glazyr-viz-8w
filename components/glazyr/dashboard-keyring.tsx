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

// ——— Logged-in view ———
function KeyringAuthenticated({ sessionToken }: { sessionToken: string }) {
    const [visible, setVisible] = useState(false)
    const [activeTab, setActiveTab] = useState<Tab>("MCP Inspector")

    const commands: Record<Tab, string> = {
        "MCP Inspector": `npx -y @modelcontextprotocol/inspector \\
  --header "Authorization: Bearer ${sessionToken}" \\
  sse https://mcp.glazyr.com/mcp/sse`,
        "curl": `curl -N https://mcp.glazyr.com/mcp/sse \\
  -H "Authorization: Bearer ${sessionToken}" \\
  -H "Accept: text/event-stream"`,
        "Python": `import httpx

headers = {
    "Authorization": "Bearer ${sessionToken}",
    "Accept": "text/event-stream",
}

with httpx.stream("GET", "https://mcp.glazyr.com/mcp/sse", headers=headers) as r:
    for line in r.iter_lines():
        print(line)`,
    }

    const icons: Record<Tab, React.ReactNode> = {
        "MCP Inspector": <Terminal className="h-3.5 w-3.5" />,
        "curl": <Code2 className="h-3.5 w-3.5" />,
        "Python": <Braces className="h-3.5 w-3.5" />,
    }

    return (
        <div className="space-y-8">
            {/* Token row */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="slb-header text-foreground">Your API Key</h3>
                    <span className="slb-label text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5">Active</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    This key grants your agents access to the Glazyr network. Keep it secret — treat it like a password.
                </p>
                <div className="flex items-center gap-2">
                    <div className="flex-1 slb-inset px-4 py-3 font-mono text-sm overflow-hidden flex items-center justify-between min-w-0">
                        <span className="truncate mr-4 text-primary">
                            {visible ? sessionToken : "•".repeat(Math.min(sessionToken.length || 32, 48))}
                        </span>
                        <button
                            onClick={() => setVisible(!visible)}
                            className="slb-btn slb-btn-sm"
                            title="Toggle visibility"
                        >
                            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    <CopyButton text={sessionToken} label="Copy Key" />
                </div>
            </div>

            {/* Command tabs */}
            <div>
                <h3 className="slb-header text-foreground mb-2">Connect Your Agent</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Your key is pre-filled below. Pick your environment and copy the command.
                </p>

                {/* Tab bar — Win98 style */}
                <div className="flex gap-0 mb-0 border-b border-border/50">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`slb-tab inline-flex items-center gap-1.5 ${activeTab === tab ? 'slb-tab-active' : ''}`}
                        >
                            {icons[tab]}
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Command block — Recessed inset */}
                <div className="relative">
                    <pre className="slb-inset p-4 font-mono text-xs text-foreground/80 overflow-x-auto whitespace-pre leading-relaxed">
                        {commands[activeTab]}
                    </pre>
                    <div className="absolute top-2 right-2">
                        <CopyButton text={commands[activeTab]} label="Copy" />
                    </div>
                </div>
            </div>
        </div>
    )
}

// ——— Locked / unauthenticated view ———
function KeyringLocked() {
    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="slb-header text-foreground">Your API Key</h3>
                    <span className="slb-label text-muted-foreground bg-muted/50 border border-border px-2 py-0.5">Not Available</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    Sign in to generate your personal API key. It will appear here automatically once you register.
                </p>
                <div className="flex items-center gap-2">
                    <div className="flex-1 slb-inset px-4 py-3 font-mono text-sm text-muted-foreground/40 select-none border-dashed">
                        {"•".repeat(48)}
                    </div>
                    <Link
                        href="/auth/signin"
                        className="slb-btn slb-btn-primary px-4 py-3 text-sm font-semibold shrink-0 whitespace-nowrap"
                    >
                        Register →
                    </Link>
                </div>
            </div>
            <div>
                <h3 className="slb-header text-foreground mb-2">Connect Your Agent</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Once you register, your key will be pre-filled in the commands below — ready to copy and run.
                </p>
                <div className="flex gap-0 mb-0 border-b border-border/50">
                    {TABS.map(tab => (
                        <div key={tab} className="slb-tab text-muted-foreground/40">
                            {tab}
                        </div>
                    ))}
                </div>
                <div className="slb-inset p-4 font-mono text-xs text-muted-foreground/30 leading-relaxed select-none">
                    <span># Sign in to unlock your pre-filled connection commands</span>
                </div>
            </div>
        </div>
    )
}

// ——— Main export ———
export function DashboardKeyring({ sessionToken }: { sessionToken?: string }) {
    if (!sessionToken || sessionToken === "TOKEN_NOT_FOUND") {
        return <KeyringLocked />
    }
    return <KeyringAuthenticated sessionToken={sessionToken} />
}
