"use client"

import { BarChart3, ShieldCheck, AlertCircle } from "lucide-react"

export function BenchmarkSection() {
  return (
    <section id="benchmarks" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1 mb-4 slb-panel">
            <BarChart3 className="w-3.5 h-3.5 text-primary" />
            <span className="slb-label text-primary text-xs">Four-Stack Comparison</span>
          </div>
          <h2 className="slb-header text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4 text-foreground">
            Measured: tokens to complete the same 3 tasks
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Same three tasks driven end-to-end through four stacks, counting every token served to the agent. All four stacks completed all three tasks.
          </p>
        </div>

        {/* Benchmark Table */}
        <div className="slb-panel p-4 sm:p-6 border border-border/80 bg-card/40 backdrop-blur-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse font-mono min-w-[580px]">
              <thead>
                <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                  <th className="py-3.5 px-3 font-semibold text-foreground">Flow</th>
                  <th className="py-3.5 px-3 text-right text-primary font-bold">Glazyr</th>
                  <th className="py-3.5 px-3 text-right">Raw CDP</th>
                  <th className="py-3.5 px-3 text-right">Playwright MCP</th>
                  <th className="py-3.5 px-3 text-right">Text extraction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs sm:text-sm">
                <tr>
                  <td className="py-3 px-3 font-semibold text-foreground">Wikipedia &rarr; Blink</td>
                  <td className="py-3 px-3 text-right font-bold text-primary">7,108</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">65,891</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">71,266</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">6,804</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-foreground">httpbin form</td>
                  <td className="py-3 px-3 text-right font-bold text-primary">1,296</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">2,112</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">2,666</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">226*</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-foreground">python.org fact</td>
                  <td className="py-3 px-3 text-right font-bold text-primary">371</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">46,734</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">57,061</td>
                  <td className="py-3 px-3 text-right text-muted-foreground">6,370</td>
                </tr>
                <tr className="border-t-2 border-border font-bold bg-primary/5">
                  <td className="py-3.5 px-3 text-foreground">Total</td>
                  <td className="py-3.5 px-3 text-right text-primary text-base">8,775</td>
                  <td className="py-3.5 px-3 text-right text-foreground">114,737</td>
                  <td className="py-3.5 px-3 text-right text-foreground">130,993</td>
                  <td className="py-3.5 px-3 text-right text-foreground">13,400</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Method line */}
          <div className="mt-4 pt-4 border-t border-border/40 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Same three tasks driven end-to-end through four stacks, counting every token served to the agent. All four stacks completed all three tasks. *Text extraction&apos;s form round works only because that form is static HTML — it cannot act on JS-driven pages. Full report and drivers:{" "}
              <a
                href="https://github.com/mcpmessenger/glazyr-mcp/blob/main/benchmarks/comparison-2026-11-21.md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold text-primary underline hover:text-primary/80 transition-colors"
              >
                https://github.com/mcpmessenger/glazyr-mcp/blob/main/benchmarks/comparison-2026-11-21.md
              </a>
            </p>
          </div>
        </div>

        {/* Honest Framing Callout */}
        <div className="slb-panel p-4 sm:p-5 border border-primary/20 bg-primary/5 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Honest framing:</strong> extraction wins the Wikipedia round (6,804 vs 7,108); the win is zoom + action. Text extraction cannot click or act on dynamic JavaScript pages, whereas Glazyr delivers interactive node IDs with layout geometry while cutting tokens 13× vs CDP and 15× vs Playwright MCP.
          </div>
        </div>
      </div>
    </section>
  )
}
