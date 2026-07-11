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

export function DashboardKeyring({ sessionToken }: { sessionToken?: string }) {
    const [keys, setKeys] = useState<{ id: string; key: string; createdAt: string }[]>([])
    const [loading, setLoading] = useState(true)

    const fetchKeys = async () => {
        try {
            const res = await fetch("/api/keys")
            const data = await res.json()
            if (data.keys) setKeys(data.keys)
        } finally {
            setLoading(false)
        }
    }

    useState(() => {
        fetchKeys()
    })

    const handleGenerate = async () => {
        await fetch("/api/keys", { method: "POST" })
        fetchKeys()
    }

    const handleDelete = async (id: string) => {
        await fetch(`/api/keys?id=${id}`, { method: "DELETE" })
        fetchKeys()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="slb-header text-foreground text-xl">API Keys</h3>
                <button
                    onClick={handleGenerate}
                    className="slb-btn slb-btn-primary px-4 py-2 text-sm font-bold tracking-widest"
                >
                    Generate New Key
                </button>
            </div>
            
            {loading ? (
                <p className="text-muted-foreground text-sm">Loading keys...</p>
            ) : keys.length === 0 ? (
                <p className="text-muted-foreground text-sm">No API keys found. Generate one to get started.</p>
            ) : (
                <div className="space-y-3">
                    {keys.map((k) => (
                        <div key={k.id} className="slb-inset p-4 flex items-center justify-between">
                            <div className="font-mono text-sm text-primary">{k.key}</div>
                            <div className="flex items-center gap-2">
                                <CopyButton text={k.key} />
                                <button onClick={() => handleDelete(k.id)} className="slb-btn slb-btn-sm text-red-500 border-red-500/20 hover:bg-red-500/10">Revoke</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
