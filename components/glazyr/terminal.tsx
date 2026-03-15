"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface TerminalProps {
    sessionToken?: string
}

export function Terminal({ sessionToken = "<API_KEY>" }: TerminalProps) {
    const [activeTab, setActiveTab] = useState<'npx' | 'python' | 'benchmark'>('npx');
    const [copied, setCopied] = useState(false);

    const snippets = {
        npx: `# 1. Run this command\n# 2. In the browser UI, add an 'Authorization' header with your token\nnpx -y @modelcontextprotocol/inspector sse "https://mcp.glazyr.com/mcp/sse"`,
        python: `from mcp.client.sse import SSEClientTransport\n\n# Secure agentic connection\ntransport = SSEClientTransport(\n    url="https://mcp.glazyr.com/mcp/sse",\n    headers={"Authorization": "Bearer ${sessionToken}"}\n)`,
        benchmark: `TOKEN="${sessionToken}"; START=$(date +%s%3N); for i in {1..50}; do curl -s -X POST https://mcp.glazyr.com/mcp/messages -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "peek_vision_buffer", "arguments": {"include_base64": false}}}' > /dev/null; done; END=$(date +%s%3N); awk -v s=$START -v e=$END 'BEGIN { t=(e-s)/1000; printf "\\n[GLAZYR] Benchmark Complete\\nTotal Time: %.3fs\\nThroughput: %.2f FPS\\n", t, 50/t }'`
    };

    const copyCommand = () => {
        navigator.clipboard.writeText(snippets[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Tab Switcher */}
            <div className="flex border-b border-white/5 bg-black/40">
                {(['npx', 'python', 'benchmark'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${activeTab === tab
                            ? 'border-primary text-primary bg-primary/5'
                            : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {tab === 'npx' ? 'MCP Inspector' : tab === 'python' ? 'Python SDK' : 'Live Benchmark'}
                    </button>
                ))}
            </div>

            {/* Snippet Block */}
            <div className="relative group p-6 bg-black/60 font-mono text-sm overflow-x-auto">
                <pre className="text-left text-zinc-300 leading-relaxed whitespace-pre min-h-[80px]">
                    {snippets[activeTab]}
                </pre>

                <button
                    onClick={copyCommand}
                    className="absolute right-4 top-4 p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                    title="Copy to clipboard"
                >
                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </button>
            </div>
        </div>
    );
}
