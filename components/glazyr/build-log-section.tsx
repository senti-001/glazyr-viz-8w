"use client"

import { GitCommit, Terminal, Clock, AlertCircle, CheckCircle2 } from "lucide-react"

export const buildLogEntries = [
  {
    date: "2026-11-21 (later)",
    title: "The agent drives: MCP bridge + dogfood",
    badge: "Agent Milestone",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    metrics: [
      { label: "Full MCP Latency", value: "28ms median (10k nodes)" },
      { label: "Tools Deployed", value: "6 MCP tools stdio" },
      { label: "Dogfood Status", value: "Passed: Research + Form" },
    ],
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-3">
          The MCP bridge shipped and was dogfooded the same night. An agent working only through the bridge&apos;s six tools pulled a license out of a Wikipedia infobox, followed an in-text link to another article, then completed a full form submission — text fields, a radio, a checkbox, submit — verified against the server&apos;s echo.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The dogfood caught two real flaws (in-text links carried no clickable id; form controls didn&apos;t carry their labels), both fixed in the filter the same night, and the fixes made the standard view cheaper: <strong className="text-foreground">19,431 &rarr; 15,343 tokens</strong>. Median state read through the full MCP stack: <strong className="text-foreground">28ms</strong> on a 10k-node page.
        </p>
      </>
    ),
  },
  {
    date: "2026-11-21 (later)",
    title: "The token scoreboard",
    badge: "Benchmark Verified",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    metrics: [
      { label: "CDP vs Glazyr (Large)", value: "57,108 vs 15,343 tokens" },
      { label: "Aggressive Filter", value: "10,501 tokens (5.4× drop)" },
      { label: "Fact Retention", value: "9/9 Glazyr vs 6/9 CDP" },
    ],
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-3">
          First token benchmark, CDP vs Glazyr on three real pages. Headline: Wikipedia 57,108 tokens (CDP) vs 15,343 (Glazyr standard) vs 10,501 (aggressive); all nine test facts present in every Glazyr view, zero escalations to raw needed.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          CDP structurally missed three: the accessibility tree carries no link URLs and no form field names. Dumped naively, the raw proto costs 222,534 tokens — the curation layer, not the pipe, is where the savings live.
        </p>
      </>
    ),
  },
  {
    date: "2026-11-21 (later)",
    title: "Perception loop closed: producer live",
    badge: "Core Architecture",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    metrics: [
      { label: "Small Page SHM", value: "0.9µs read" },
      { label: "Link-Dense Page", value: "5.1µs read" },
      { label: "756KB Payload", value: "43µs read" },
    ],
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-3">
          The page-content producer is wired into the patched shell: on page load, the browser extracts its <code className="font-mono text-primary text-xs bg-primary/10 px-1 py-0.5 rounded">AnnotatedPageContent</code> tree (the same pipeline Chrome ships for its own AI features) and writes it into the semantic shared-memory region.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          An external reader verified the full loop — real page content, correct titles and links, in the buffer. First cross-page benchmark: payload reads at <strong className="text-foreground">0.9µs (small page), 5.1µs (link-dense), 43µs (756KB article payload)</strong>.
        </p>
      </>
    ),
  },
  {
    date: "2026-11-21",
    title: "The fork runs, and the buffer is live",
    badge: "Milestone",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    metrics: [
      { label: "Peek Latency", value: "0.8µs p50 (2k samples)" },
      { label: "p95 Tail", value: "1.2µs" },
      { label: "Compositor SHM", value: "32MB Active" },
    ],
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Patched Chromium 158 <code className="font-mono text-primary text-xs bg-primary/10 px-1 py-0.5 rounded">headless_shell</code> now builds and runs on a local workstation (Ryzen 7 5800H, WSL2). The compositor&apos;s shared-memory frame region (32MB) is live: an external process read the frame header — magic, 800×600, stride, live timestamp — at <strong className="text-foreground">0.8µs median over 2,000 reads</strong> (p95 1.2µs).
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The semantic channel was ported from its original Win32 implementation to portable shared memory the same night, wire format unchanged. The cloud build box was retired; the build is fully local now. Next: wire the page-content producer into the semantic buffer.
        </p>
      </>
    ),
  },
  {
    date: "2026-11-20",
    title: "Stock 158 builds; the tree comes home",
    badge: "Build Infrastructure",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    metrics: [
      { label: "Base Upstream", value: "Chromium 158.0.8127.65" },
      { label: "Clean Patches", value: "67 new / 21 upstream" },
      { label: "Environment", value: "Local Workstation" },
    ],
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed">
          Stock Chromium 158.0.8127.65 <code className="font-mono text-primary text-xs bg-primary/10 px-1 py-0.5 rounded">headless_shell</code> built clean. The full source tree moved from cloud to a local workstation; patch census completed: 67 files of new code applied clean, 21 upstream modifications applied clean, 28 conflicts classified (keep / hand-port / drop) before the first local compile.
        </p>
      </>
    ),
  },
  {
    date: "2026-11-18",
    title: "The gate: why a fork at all",
    badge: "Architecture Gate",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    metrics: [
      { label: "CDP Sidecar p50", value: "38.7ms (Budget: 25ms)" },
      { label: "Decision", value: "Thin Chromium Fork" },
      { label: "Fallback", value: "Sidecar for Small Pages" },
    ],
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Before writing fork code, we measured the alternative. A CDP sidecar extracting page state over the DevTools protocol: <strong className="text-foreground">38.7ms median</strong> against a 25ms budget, with latency scaling with page node count — it fails the gate.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          A survey of layout engines found fabricated element coordinates in the fastest candidate, disqualifying it for actions (it remains a read-only tier candidate). Decision: a thin Chromium fork whose compositor publishes state to shared memory. The sidecar stays as the small-page fallback.
        </p>
      </>
    ),
  },
]

export function BuildLogSection() {
  return (
    <section id="build-log" className="py-24 relative overflow-hidden bg-background/50">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1 mb-4 slb-panel">
            <Terminal className="h-3.5 w-3.5 text-primary" />
            <span className="slb-label text-primary text-xs">Truth Pass v2 Addendum (Nov 21, 2026)</span>
          </div>
          <h2 className="slb-header text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            Build Log &amp; Verification
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Rule for this pass: every number on the page must be one we measured on the current fork build. Real workstation logs, verified instrumentation, and active bring-up tracking.
          </p>
        </div>

        {/* Timeline Entries */}
        <div className="space-y-8">
          {buildLogEntries.map((entry) => (
            <article
              key={`${entry.date}-${entry.title}`}
              className="slb-panel p-6 sm:p-8 bg-card/40 backdrop-blur-md relative group border border-border/60 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <GitCommit className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-primary">
                        {entry.date}
                      </span>
                      <span className={`slb-label text-[10px] px-2 py-0.5 border rounded ${entry.badgeColor}`}>
                        {entry.badge}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-0.5">
                      {entry.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Metrics strip for this entry */}
              {entry.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 bg-background/50 p-3 rounded border border-border/40">
                  {entry.metrics.map((m) => (
                    <div key={m.label} className="text-left font-mono">
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">{m.label}</div>
                      <div className="text-sm font-bold text-foreground">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Body */}
              <div className="text-sm sm:text-base">
                {entry.content}
              </div>
            </article>
          ))}
        </div>

        {/* Part 3: What is NOT yet claimable (Truth Pass Principles v2) */}
        <div className="mt-14 slb-panel p-6 sm:p-8 border border-amber-500/30 bg-amber-500/5 relative">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-500 mt-1">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Measurement Integrity: What We Do Not Claim Yet (v2 Updated)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Since the initial truth-pass draft, the semantic pipeline was completed and measured end-to-end (producer &rarr; SHM &rarr; filter &rarr; MCP &rarr; agent), moving token savings and end-to-end semantic latency into verified claimable status. The items below remain strictly unmeasured or on the roadmap:
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground font-mono">
                <li className="flex items-start gap-2 bg-background/40 p-2.5 rounded border border-border/40">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span><del className="opacity-60">Token savings</del> — <strong className="text-emerald-400">Measured &amp; claimable</strong> (3.7×–5.4× fewer tokens on 10k-node page; scoreboard above).</span>
                </li>
                <li className="flex items-start gap-2 bg-background/40 p-2.5 rounded border border-border/40">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span><del className="opacity-60">End-to-end semantic latency</del> — <strong className="text-emerald-400">Measured &amp; claimable</strong> (28ms MCP median on large page; extraction rides page load).</span>
                </li>
                <li className="flex items-start gap-2 bg-background/40 p-2.5 rounded border border-border/40">
                  <span className="text-amber-500 font-bold shrink-0">·</span>
                  <span><strong>Diff-read savings:</strong> Designed, not yet shipped; re-reads of unchanged state currently cost full price.</span>
                </li>
                <li className="flex items-start gap-2 bg-background/40 p-2.5 rounded border border-border/40">
                  <span className="text-amber-500 font-bold shrink-0">·</span>
                  <span><strong>On-demand re-extraction:</strong> Producer currently writes on page load; DOM change command channel is next.</span>
                </li>
                <li className="flex items-start gap-2 bg-background/40 p-2.5 rounded border border-border/40">
                  <span className="text-amber-500 font-bold shrink-0">·</span>
                  <span><strong>Pixel streaming FPS / bandwidth:</strong> Live frame header wired in 32MB SHM; pixel payload streaming pending semantic ship.</span>
                </li>
                <li className="flex items-start gap-2 bg-background/40 p-2.5 rounded border border-border/40">
                  <span className="text-amber-500 font-bold shrink-0">·</span>
                  <span><strong>Link-dense sets (Hacker News):</strong> Test browser hit rate-limit during capture; round 2 pending unblocked run.</span>
                </li>
                <li className="flex items-start gap-2 bg-background/40 p-2.5 rounded border border-border/40 sm:col-span-2">
                  <span className="text-amber-500 font-bold shrink-0">·</span>
                  <span><strong>Customer &amp; uptime figures:</strong> No speculative marketing figures or unmeasured third-party benchmarks.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
