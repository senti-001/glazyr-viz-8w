"use client"

import { Cpu, Terminal, CheckCircle2, ShieldCheck, Compass, MonitorX } from "lucide-react"

export function McpSection() {
  const tools = [
    { name: "glazyr_status()", desc: "Is the browser up? What is it looking at?" },
    { name: "glazyr_navigate(url)", desc: "Open a page; get the outline first (245 tokens on Wikipedia)" },
    { name: "glazyr_peek(level)", desc: "Read the page the short way (~13–14K tokens, not 100K+)" },
    { name: "glazyr_peek_raw()", desc: "The whole page, unfiltered — for when the short way is not enough" },
    { name: "glazyr_peek_subtree(id)", desc: "Zoom into one part of the page" },
    { name: "glazyr_find(query)", desc: "Find things on the page" },
    { name: "glazyr_click(node_id)", desc: "Click buttons and links" },
    { name: "glazyr_type(node_id, text)", desc: "Fill in fields and forms" },
    { name: "glazyr_scroll(dir, amount)", desc: "Scroll up or down" },
    { name: "glazyr_trace(mode)", desc: "Replay and verify the session — a hash-chained record of everything the agent did" },
  ]

  return (
    <section id="mcp" className="py-24 relative overflow-hidden bg-background/80">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3.5 py-1 mb-4 slb-panel">
            <Compass className="w-4 h-4 text-primary" />
            <span className="slb-label text-primary text-xs">Plain-English Setup</span>
          </div>
          <h2 className="slb-header text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4 text-foreground">
            Set up in about two minutes
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Glazyr plugs into the agent app you already use — Claude Code, Cursor, Claude Desktop,
            Codex, Antigravity. On Windows it runs through WSL, the Linux layer built into Windows.
            No account, nothing to sign up for.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Steps */}
          <div className="lg:col-span-5 space-y-6">
            <div className="slb-panel p-6 border border-border/80 bg-card/40 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">Windows — 3 steps</span>
              </div>
              <ol className="space-y-4 text-sm text-muted-foreground leading-relaxed list-none">
                <li>
                  <strong className="text-foreground">1. Turn on WSL.</strong> Open PowerShell and run{" "}
                  <span className="font-mono text-foreground">wsl --install</span>, then restart your PC.
                  Already have Ubuntu in WSL? Skip this step.
                </li>
                <li>
                  <strong className="text-foreground">2. Paste this into your app&apos;s MCP settings:</strong>
                  <pre className="font-mono text-xs text-foreground/90 bg-background/80 p-4 rounded border border-border/40 overflow-x-auto leading-relaxed mt-2">
{`{
  "mcpServers": {
    "glazyr": {
      "command": "wsl.exe",
      "args": ["-d", "Ubuntu", "--",
               "npx", "-y", "@glazyr/mcp"]
    }
  }
}`}
                  </pre>
                  <span className="text-xs">If your WSL distro has a different name, use that name instead of <span className="font-mono">Ubuntu</span>.</span>
                </li>
                <li>
                  <strong className="text-foreground">3. Restart the app</strong> and ask your agent to open any web page.
                </li>
              </ol>
              <div className="mt-4 p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground space-y-2">
                <p className="flex items-center gap-2 text-primary font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Two things worth knowing
                </p>
                <p>
                  The first run downloads Glazyr&apos;s browser (about 106 MB) — once, automatically.
                  And keep an Ubuntu terminal window open while you work: Windows puts WSL to sleep
                  when it sits idle, and a sleeping WSL pauses Glazyr.
                </p>
              </div>
            </div>

            <div className="slb-panel p-6 border border-border/80 bg-card/40 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">On Linux instead?</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Same idea, one block. Needs Linux x64 and Node 18+:
              </p>
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
            </div>

            <div className="slb-panel p-6 border border-amber-500/30 bg-amber-500/5">
              <div className="flex items-start gap-3">
                <MonitorX className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <h4 className="font-bold text-foreground mb-1">Using a Mac?</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Glazyr does not run on macOS yet — it needs Windows (with WSL) or Linux.
                    We would rather say that plainly than sell you a workaround.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The 10 Tools & No-Repeat-Reads */}
          <div className="lg:col-span-7 space-y-6">
            <div className="slb-panel p-6 border border-border/80 bg-card/40">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" /> What your agent gets: 10 simple tools
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
                    It does not charge you twice for the same page
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    If a page has not changed, Glazyr answers with a short &ldquo;nothing new&rdquo; note
                    instead of the full page again. And when your agent clicks or types, the result
                    comes back in the same breath — no extra read needed. That is how a Wikipedia
                    research task drops from 28–30K tokens to 7,108.
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
