import { Link2, ArrowRight, Shield, Zap, Globe, Code, Wallet, ArrowUpRight, Cpu, Activity } from "lucide-react"

export function AgenticLink() {
  return (
    <section id="agentic-link" className="relative py-32 px-6 overflow-hidden">
      {/* Background elements */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <Link2 className="h-4 w-4" />
            <span className="text-xs font-mono font-medium uppercase tracking-widest">
              Ecosystem Onboarding
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
            The Agentic Link
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Your portal into the Glazyr ecosystem. We provide distinct pathways to ensure engineers and strategic partners get the exact resources needed to deploy autonomous intelligence.
          </p>
        </div>

        {/* Dual Path Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Path A: Developer Portal */}
          <div className="group relative rounded-2xl border border-emerald-500/20 bg-background/50 backdrop-blur-sm p-8 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.15)] overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="w-32 h-32 text-emerald-500" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Globe className="h-6 w-6 text-emerald-500" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Path A
                </span>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4">Developer Portal</h3>
              <p className="text-muted-foreground mb-8 min-h-[80px]">
                Access sub-16ms Zero-Copy Vision tools and high-frequency DMA installation guides for Open Claw and Moltbook agents.
              </p>

              {/* Mini Features */}
              <div className="space-y-4 mb-10">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <Code className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-foreground">POSIX Shared Memory</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-6">Build assistance for the high-speed pipeline.</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-foreground">Open Source Agent UCP</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-6">Deploy reference implementations.</span>
                </div>
              </div>

              <div className="relative group/cmd w-full rounded-xl bg-black/60 border border-emerald-500/20 px-4 py-3 font-mono text-sm shadow-inner overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <span className="text-muted-foreground select-none">$</span>
                    <span className="text-emerald-400 font-semibold select-all">npx -y @modelcontextprotocol/inspector sse "https://mcp.glazyr.com/mcp/sse"</span>
                  </div>
                  <div className="flex shrink-0 items-center justify-center h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-500/70 hover:text-emerald-400 hover:bg-emerald-500/20 cursor-pointer transition-colors" title="Copy to clipboard (Coming soon)">
                    <Code className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Path B: Sovereign Telemetry & Vision Schema */}
          <div className="group relative rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm p-6 sm:p-8 transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_40px_-10px_rgba(66,133,244,0.15)] overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Code className="w-32 h-32 text-primary" />
            </div>

            <div className="relative z-10 flex-grow">
              <div className="flex items-center justify-between mb-8">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex shrink-0 items-center justify-center border border-primary/20">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="hidden sm:inline-block text-[10px] sm:text-xs font-mono font-bold text-red-400 border border-red-500/20 bg-red-500/10 px-2 py-1 rounded">
                    VS OCR: -92% TOKENS
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-primary uppercase tracking-widest px-2 sm:px-3 py-1 rounded-full bg-primary/10 border border-primary/20 whitespace-nowrap">
                    Structured Yield
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4">Vision Schema Output</h3>
              <p className="text-muted-foreground mb-6 min-h-[48px]">
                Zero-copy extraction guarantees clean structural representation.
                INPUT: 1 Frame | YIELD: 177 Structured Tokens.
              </p>

              {/* Code Snippet block */}
              <div className="relative rounded-xl bg-black/80 border border-primary/20 p-4 sm:p-5 font-mono text-[10px] sm:text-xs md:text-sm shadow-inner overflow-hidden mb-2">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
                <pre className="text-emerald-400/90 overflow-x-auto scrollbar-hide">
                  <code>
                    {`{
  "node_id": "div#submit-btn",
  "bounds": [1024, 768, 120, 40],
  "attributes": {
    "role": "button",
    "aria-label": "Execute Pipeline",
    "disabled": false
  },
  "interactive": true,
  "confidence": 0.99
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
