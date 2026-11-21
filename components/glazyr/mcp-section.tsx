"use client"

import { Cpu, Terminal, CheckCircle2, ArrowRight, ShieldCheck, Compass } from "lucide-react"

export function McpSection() {
  const tools = [
    { name: "glazyr_peek(level)", desc: "Filtered page state (light, standard, aggressive) with layout geometry" },
    { name: "glazyr_peek_raw()", desc: "Unfiltered state; immediate safety escalation path" },
    { name: "glazyr_navigate(url)", desc: "Navigates and returns immediate extracted page state" },
    { name: "glazyr_click(node_id)", desc: "Clicks element by DOM id; auto-scrolls into view using layout geometry" },
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
          <h2 className="slb-header text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            How Agents Connect: Native MCP Bridge
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Glazyr ships as an MCP server: peek, navigate, click, type, scroll — six tools, one config block. The browser launches and manages itself; the agent just reads state and acts on node ids. In our own dogfood runs, an agent completed a research click-through and a full form submission (text fields, radio, checkbox, submit) through these tools alone, with a token meter reporting every read.
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
      "command": "wsl.exe",
      "args": [
        "-d", "glazyr-internal",
        "-u", "root", "--",
        "/root/glazyr-bridge/venv/bin/python",
        "/root/glazyr-bridge/glazyr_mcp.py"
      ]
    }
  }
}`}
            </pre>
            <div className="mt-4 p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <p className="flex items-center gap-2 text-primary font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Zero Host Dependencies
              </p>
              Spawned over stdio by any MCP client (Claude Desktop, Cursor, or autonomous agent loops).
            </div>
          </div>

          {/* Right: The 6 Tools & Dogfood Verification */}
          <div className="lg:col-span-7 space-y-6">
            <div className="slb-panel p-6 border border-border/80 bg-card/40">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" /> The 6 Core Perception &amp; Action Tools
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
                    Nov 21 Dogfood Verification Passed
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Working exclusively through these six tools, an autonomous agent completed a research click-through (extracting license from Wikipedia infobox, navigating via in-text link) followed by a complete form submission (text fields, radio, checkbox, submit) verified against the server&apos;s echo. State reads landed in <strong>28ms median</strong> on a 10,247-node page with active token metering.
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
