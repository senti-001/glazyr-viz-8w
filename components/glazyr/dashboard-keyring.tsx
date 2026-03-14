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
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground px-3 py-1.5 text-xs font-semibold transition-all"
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
                    <h3 className="text-foreground font-semibold">Your API Key</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Active</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    This key grants your agents access to the Glazyr network. Keep it secret — treat it like a password.
                </p>
                <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-3 font-mono text-sm overflow-hidden flex items-center justify-between min-w-0">
                        <span className="truncate mr-4 text-primary/90">
                            {visible ? sessionToken : "•".repeat(Math.min(sessionToken.length || 32, 48))}
                        </span>
                        <button
                            onClick={() => setVisible(!visible)}
                            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
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
                <h3 className="text-foreground font-semibold mb-2">Connect Your Agent</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Your key is pre-filled below. Pick your environment and copy the command.
                </p>

                {/* Tab bar */}
                <div className="flex gap-1 mb-3 border-b border-white/5 pb-2">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === tab
                                ? "bg-primary/15 text-primary border border-primary/30"
                                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                }`}
                        >
                            {icons[tab]}
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Command block */}
                <div className="relative">
                    <pre className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
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
                    <h3 className="text-foreground font-semibold">Your API Key</h3>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground bg-white/5 border border-white/10 px-2 py-0.5 rounded">Not Available</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                    Sign in to generate your personal API key. It will appear here automatically once you register.
                </p>
                <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted/20 border border-dashed border-border rounded-lg px-4 py-3 font-mono text-sm text-muted-foreground/40 select-none">
                        {"•".repeat(48)}
                    </div>
                    <Link
                        href="/auth/signin"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shrink-0 whitespace-nowrap"
                    >
                        Register →
                    </Link>
                </div>
            </div>
            <div>
                <h3 className="text-foreground font-semibold mb-2">Connect Your Agent</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Once you register, your key will be pre-filled in the commands below — ready to copy and run.
                </p>
                <div className="flex gap-1 mb-3 border-b border-white/5 pb-2">
                    {TABS.map(tab => (
                        <div key={tab} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground/40 border border-white/5">
                            {tab}
                        </div>
                    ))}
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 font-mono text-xs text-muted-foreground/30 leading-relaxed select-none">
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
