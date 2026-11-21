"use client"

import { Target, Zap, Coins, CheckCircle2, AlertTriangle } from "lucide-react"

export function TokenSavings() {
  return (
    <section id="scoreboard" className="py-24 relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3.5 py-1 mb-4 slb-panel">
            <Coins className="w-4 h-4 text-primary" />
            <span className="slb-label text-primary text-xs">Measured Benchmark &amp; Token Scoreboard</span>
          </div>
          <h2 className="slb-header text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            State Reads Are the Token Bill
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every AI agent that browses pays for every serialized token on every reasoning step. Here is what we measured on identical pages on our local workstation testbed.
          </p>
        </div>

        {/* Comparison Cards: CDP vs Glazyr */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Traditional CDP Card */}
          <div className="slb-panel p-6 sm:p-8 flex flex-col justify-between border border-border/80">
            <div>
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="slb-header text-2xl mb-1 text-foreground">CDP Accessibility Fetch</h3>
              <p className="text-muted-foreground mb-6 text-xs sm:text-sm font-mono">DevTools Protocol (measured Nov 21)</p>

              <div className="space-y-5">
                <div>
                  <div className="slb-label text-xs mb-1">Tree Fetch Latency</div>
                  <div className="text-2xl sm:text-3xl font-mono text-orange-500 dark:text-orange-400 font-bold">19ms – 1,521ms</div>
                  <div className="text-xs text-muted-foreground mt-1">19ms small form, 1,521ms large article; scales hard with page size</div>
                </div>
                <div>
                  <div className="slb-label text-xs mb-1">Payload (Large Article)</div>
                  <div className="text-2xl sm:text-3xl font-mono text-orange-500 dark:text-orange-400 font-bold">57,108 tokens</div>
                  <div className="text-xs text-muted-foreground mt-1">Wikipedia Chromium article (10,247 nodes)</div>
                </div>
                <div>
                  <div className="slb-label text-xs mb-1">Semantic Completeness</div>
                  <div className="text-sm font-semibold text-muted-foreground">Missing URLs &amp; Field Names</div>
                  <div className="text-xs text-muted-foreground mt-1">AX tree omits link targets and form names; agents pay extra queries to recover them</div>
                </div>
                <div>
                  <div className="slb-label text-xs mb-1">Actionability</div>
                  <div className="text-sm font-semibold text-orange-400">Heuristic / Guessed Pixels</div>
                  <div className="text-xs text-muted-foreground mt-1">Model guess or coordinate estimation from visual screenshot</div>
                </div>
              </div>
            </div>
          </div>

          {/* Glazyr Card */}
          <div className="slb-panel slb-panel-highlight p-6 sm:p-8 flex flex-col justify-between border border-primary/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="slb-header text-2xl mb-1 text-primary">Glazyr Filtered SHM</h3>
              <p className="text-primary/80 mb-6 text-xs sm:text-sm font-mono">Chromium 158 Fork + MCP (measured Nov 21)</p>

              <div className="space-y-5">
                <div>
                  <div className="slb-label text-xs mb-1">State Read Latency</div>
                  <div className="text-2xl sm:text-3xl font-mono text-green-500 dark:text-green-400 font-bold">0.9–43µs SHM · 28ms MCP</div>
                  <div className="text-xs text-muted-foreground mt-1">43µs shared memory buffer peek; 28ms median through full MCP stack on large page</div>
                </div>
                <div>
                  <div className="slb-label text-xs mb-1">Payload (Large Article)</div>
                  <div className="text-2xl sm:text-3xl font-mono text-green-500 dark:text-green-400 font-bold">15,343 / 10,501 tokens</div>
                  <div className="text-xs text-muted-foreground mt-1">3.7× cheaper (standard) to 5.4× cheaper (aggressive); 9/9 facts preserved</div>
                </div>
                <div>
                  <div className="slb-label text-xs mb-1">Semantic Completeness</div>
                  <div className="text-sm font-semibold text-primary">Native URLs, Field Names &amp; Layout</div>
                  <div className="text-xs text-muted-foreground mt-1">Link URLs and form field names native in memory; zero round trips needed</div>
                </div>
                <div>
                  <div className="slb-label text-xs mb-1">Actionability</div>
                  <div className="text-sm font-semibold text-green-400">Node ID + Layout Engine Geometry</div>
                  <div className="text-xs text-muted-foreground mt-1">Direct node targeting with coordinates from the browser&apos;s own layout renderer</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="slb-label px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[11px]">3.7×–5.4× Token Reduction</span>
                <span className="slb-label px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary text-[11px]">28ms Median MCP Latency</span>
                <span className="slb-label px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary text-[11px]">9/9 Facts Preserved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Token Scoreboard Section */}
        <div className="slb-panel p-6 sm:p-8 border border-border/80 bg-card/30 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-border/40">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Token Cost Scoreboard &amp; Fact Preservation
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Measured on Nov 21 with tiktoken <code className="font-mono text-primary text-xs">cl100k_base</code> across identical pages and tasks.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="slb-label text-xs px-3 py-1 bg-primary/10 border border-primary/30 text-primary">
                10-Task Verified Testbed
              </span>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-sm border-collapse font-mono">
              <thead>
                <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                  <th className="py-3 px-3">Test Page</th>
                  <th className="py-3 px-3 text-right">CDP AX Tree</th>
                  <th className="py-3 px-3 text-right text-muted-foreground/60">Proto Naive</th>
                  <th className="py-3 px-3 text-right text-primary font-bold">Glazyr Standard</th>
                  <th className="py-3 px-3 text-right text-emerald-400 font-bold">Glazyr Aggressive</th>
                  <th className="py-3 px-3 text-right">Fact Presence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs">
                <tr>
                  <td className="py-3 px-3 font-semibold text-foreground">example.com</td>
                  <td className="py-3 px-3 text-right text-orange-400">880</td>
                  <td className="py-3 px-3 text-right text-muted-foreground/50">670</td>
                  <td className="py-3 px-3 text-right text-primary font-semibold">393</td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-bold">327</td>
                  <td className="py-3 px-3 text-right text-emerald-400">9/9 (CDP: 6/9)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-foreground">httpbin form</td>
                  <td className="py-3 px-3 text-right text-orange-400">542</td>
                  <td className="py-3 px-3 text-right text-muted-foreground/50">1,420</td>
                  <td className="py-3 px-3 text-right text-primary font-semibold">370</td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-bold">370</td>
                  <td className="py-3 px-3 text-right text-emerald-400">9/9 (CDP: 6/9)</td>
                </tr>
                <tr className="bg-primary/5">
                  <td className="py-3.5 px-3 font-bold text-foreground">Wikipedia (Chromium, 10,247 nodes)</td>
                  <td className="py-3.5 px-3 text-right text-orange-400 font-bold">57,108</td>
                  <td className="py-3.5 px-3 text-right text-muted-foreground/50">222,534</td>
                  <td className="py-3.5 px-3 text-right text-primary font-bold">15,343</td>
                  <td className="py-3.5 px-3 text-right text-emerald-400 font-bold">10,501</td>
                  <td className="py-3.5 px-3 text-right text-emerald-400 font-bold">9/9 (CDP: 6/9)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Transparent Caveat / Curation layer insight */}
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed bg-background/50 p-4 rounded border border-border/40">
            <p>
              <strong className="text-foreground">State reads are the token bill.</strong> On a large article page (Wikipedia&apos;s Chromium article, 10,247 nodes), a CDP accessibility-tree dump costs <strong className="text-foreground">57,108 tokens</strong>. Glazyr&apos;s filtered view of the same page: <strong className="text-primary font-mono">15,343 tokens</strong> at the standard level, <strong className="text-emerald-400 font-mono">10,501</strong> at aggressive — <strong>3.7× to 5.4× cheaper</strong>, with every fact our test tasks needed still present.
            </p>
            <p>
              The filter also carries data the accessibility tree doesn&apos;t have at all: link URLs and form field names are native here, so agents don&apos;t pay extra queries to recover them.
            </p>
            <div className="flex items-start gap-2 pt-2 border-t border-border/30 text-amber-500/90">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-xs">
                <strong>One honest caveat we publish ourselves:</strong> dumped raw, the browser&apos;s proto is <em>worse</em> than CDP (222,534 tokens vs 57,108 tokens). The savings live in the curation layer — that&apos;s the product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
