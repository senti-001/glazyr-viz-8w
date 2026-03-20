"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface TerminalProps {
    sessionToken?: string
}

export function Terminal({ sessionToken = "<API_KEY>" }: TerminalProps) {
    const [activeTab, setActiveTab] = useState<'npx' | 'python' | 'benchmark' | 'curl'>('npx');
    const [copied, setCopied] = useState(false);

    const snippets = {
        npx: `npx -y @modelcontextprotocol/inspector --transport sse --server-url "https://mcp.glazyr.com/mcp/sse" --header "Authorization: Bearer ${sessionToken}"`,
        python: `# Save as glazyr_test.py and run: python glazyr_test.py\nimport asyncio\nfrom mcp.client.sse import sse_client\nfrom mcp.client.session import ClientSession\n\nasync def run():\n    headers = {"Authorization": "Bearer ${sessionToken}"}\n    async with sse_client("https://mcp.glazyr.com/mcp/sse", headers=headers) as (r, w):\n        async with ClientSession(r, w) as s:\n            await s.initialize()\n            print("✅ Connection Verified!")\n\nif __name__ == "__main__": asyncio.run(run())`,
        benchmark: `# [POWERSHELL] Save and run:\n# .\\glazyr_benchmark.ps1\n\n# [BASH/WSL] Run directly:\nTOKEN="${sessionToken}"; START=$(date +%s%3N); for i in {1..50}; do curl -s -X POST https://mcp.glazyr.com/mcp/messages -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": "peek_vision_buffer", "arguments": {"include_base64": false}}}' > /dev/null; done; END=$(date +%s%3N); awk -v s=$START -v e=$END 'BEGIN { t=(e-s)/1000; printf "\\n[GLAZYR] Benchmark Complete\\nTotal Time: %.3fs\\nThroughput: %.2f FPS\\n", t, 50/t }'`,
        curl: `curl -N https://mcp.glazyr.com/mcp/sse \\\n  -H "Authorization: Bearer ${sessionToken}" \\\n  -H "Accept: text/event-stream"`
    };

    const tabLabels = {
        npx: 'MCP Inspector',
        python: 'Python SDK',
        benchmark: 'Live Benchmark',
        curl: 'Raw SSE (curl)'
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
                {(['npx', 'python', 'benchmark', 'curl'] as const).map((tab) => (
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
            <div className="slb-inset m-3 relative group">
                <div className="p-5 font-mono text-sm overflow-x-auto">
                    <pre className="text-left text-foreground/80 leading-relaxed whitespace-pre min-h-[80px]">
                        {snippets[activeTab]}
                    </pre>
                </div>

                <button
                    onClick={copyCommand}
                    className="slb-btn slb-btn-sm absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    title="Copy to clipboard"
                >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
        </div>
    );
}
