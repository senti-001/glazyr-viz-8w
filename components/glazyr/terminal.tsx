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

    const tabLabels = {
        npx: 'MCP Inspector',
        python: 'Python SDK',
        benchmark: 'Live Benchmark'
    };

    const copyCommand = () => {
        navigator.clipboard.writeText(snippets[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="slb-panel overflow-hidden">
            {/* Tab Switcher — Win98 Tab Chrome */}
            <div className="flex border-b border-border/50 bg-background/40">
                {(['npx', 'python', 'benchmark'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`slb-tab ${activeTab === tab ? 'slb-tab-active' : ''}`}
                    >
                        {tabLabels[tab]}
                    </button>
                ))}
            </div>

            {/* Snippet Block — Recessed Inset */}
            <div className="relative group">
                <div className="slb-inset m-3 p-5 font-mono text-sm overflow-x-auto">
                    <pre className="text-left text-foreground/80 leading-relaxed whitespace-pre min-h-[80px]">
                        {snippets[activeTab]}
                    </pre>
                </div>

                <button
                    onClick={copyCommand}
                    className="slb-btn slb-btn-sm absolute right-5 top-5 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy to clipboard"
                >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
        </div>
    );
}
