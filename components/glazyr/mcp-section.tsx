"use client"

import { Cpu, Terminal, CheckCircle2, ShieldCheck, Compass } from "lucide-react"

export function McpSection() {
  const tools = [
    { name: "glazyr_status()", desc: "Check browser state, active process, and memory region status" },
    { name: "glazyr_navigate(url)", desc: "Navigate; returns summary first (245 tokens on Wikipedia)" },
    { name: "glazyr_peek(level)", desc: "Filtered page state (~13–14K tokens standard with sibling collapse)" },
    { name: "glazyr_peek_raw()", desc: "Unfiltered state; immediate safety escalation path" },
    { name: "glazyr_peek_subtree(id)", desc: "Focused zoom into specific container or element subtree" },
    { name: "glazyr_find(query)", desc: "Search page structure for matching nodes or text" },
    { name: "glazyr_click(node_id)", desc: "Click by DOM node id; auto-scrolls using layout geometry" },
    { name: "glazyr_type(node_id, text)", desc: "Direct element focus + text typing" },
    { name: "glazyr_scroll(dir, amount)", desc: "Scrolls viewport in specified direction" },
  ]

  return (
    <section id="mcp" className="py-24 relative overflow-hidden bg-background/80">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3.5 py-1 mb-4 slb-panel">
            <Compass className="w-4 h-4 text-primary" />
            <span className="slb-label text-primary text-xs">Standardized Agent Interface</span>
          </div>
          <h2 className="slb-header text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4 text-foreground">
            How Agents Connect: Native MCP Bridge (v0.2.2)
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Glazyr ships as an MCP server: status, peek, peek_raw, peek_subtree, find, navigate, click, type, scroll — nine tools, one config block. The browser launches and manages itself; the agent reads curated state, zooms into subtrees, and acts on node ids.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Client Config */}
          <div className="lg:col-span-5 slb-panel p-6 border border-border/80 bg-card/40 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">Client Configuration</span>
              </div>
              <span className="slb-label text-[10px] text-muted-foreground font-mono">claude_desktop_config.json</span>
            </div>
            <pre className="font-mono text-xs text-foreground/90 bg-background/80 p-4 rounded border border-border/40 overflow-x-auto leading-relaxed">
{`{
  "mcpServers": {
    "glazyr": {
      "command": "npx",
      "args": ["-y", "@glazyr/mcp"]
    }
  }
}`}
            </pre>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Requires Linux x64 and Node 18+. The browser bundle (~106 MB) downloads automatically on first run.
            </p>
            <div className="mt-4 p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground space-y-2">
              <p className="flex items-center gap-2 text-primary font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Summary-First Navigation
              </p>
              <p>
                Navigate now returns an outline map (URL, counts, heading outline — <strong>245 tokens</strong> on Wikipedia) instead of the whole territory. Sibling collapse drops standard view to ~13–14K tokens.
              </p>
            </div>
          </div>

          {/* Right: The 9 Tools & Dogfood Verification */}
          <div className="lg:col-span-7 space-y-6">
            <div className="slb-panel p-6 border border-border/80 bg-card/40">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" /> The 9 Perception &amp; Action Tools
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tools.map((t) => (
                  <div key={t.name} className="p-3 rounded bg-background/50 border border-border/40 font-mono text-xs">
                    <div className="text-primary font-bold">{t.name}</div>
                    <div className="text-muted-foreground text-[11px] mt-1">{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="slb-panel p-6 border border-emerald-500/30 bg-emerald-500/5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <h4 className="font-bold text-foreground mb-1">
                    Unchanged-State Stubs &amp; Asserted Action Acks
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Repeat reads of unchanged state return a short stub rather than paying full token price. Click and type acknowledgments carry their asserted result inline, beating dogfood baselines across research flows (Wikipedia research 28–30K &rarr; 7,108 tokens; find-a-fact 18,451 &rarr; 371 tokens).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
