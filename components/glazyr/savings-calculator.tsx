"use client"

import { useState } from "react"
import { Calculator, Coins, Clock, TreePine } from "lucide-react"

// Measured, Nov 2026, the Mieruka suite — same 4 web tasks end-to-end
// through three stacks (runs: github.com/mcpmessenger/mieruka):
// Glazyr 52,790 tokens vs raw CDP 3,885,586 tokens.
const GLAZYR_SHARE = 52790 / 3885586 // ~0.0136 of the tokens
const CDP_TOKENS_PER_TASK = 3885586 / 4 // ~971,397 tokens per web task the old way
// Rough, published mid-range estimates — labeled as such in the footnotes.
const WH_PER_1K_TOKENS = 0.25
const CO2_G_PER_KWH = 380
const KG_CO2_PER_TREE_YEAR = 21

function compact(n: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n)
}
function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n < 10 ? 2 : 0 })
}

export function SavingsCalculator() {
  const [mode, setMode] = useState<"tokens" | "bill">("bill")
  const [bill, setBill] = useState(200)
  const [tokens, setTokens] = useState(20_000_000)
  const [pricePerM, setPricePerM] = useState(10)
  const [webShare, setWebShare] = useState(40) // percent
  const [minutesPerTask, setMinutesPerTask] = useState(5)

  const monthlyTokens = mode === "tokens" ? tokens : (bill / pricePerM) * 1_000_000
  const webTokens = monthlyTokens * (webShare / 100)
  const glazyrWebTokens = webTokens * GLAZYR_SHARE
  const tokensSaved = webTokens - glazyrWebTokens
  const dollarsSavedMonth = (tokensSaved / 1_000_000) * pricePerM
  const tasks = webTokens / CDP_TOKENS_PER_TASK
  const hoursSavedMonth = (tasks * minutesPerTask * 0.5) / 60
  const kwhYear = ((tokensSaved * 12) / 1000) * WH_PER_1K_TOKENS / 1000
  const co2KgYear = (kwhYear * CO2_G_PER_KWH) / 1000
  const treesYear = co2KgYear / KG_CO2_PER_TREE_YEAR
  const barToday = 100
  const barGlazyr = Math.max(2, (glazyrWebTokens / Math.max(webTokens, 1)) * 100)

  const inputCls =
    "w-full bg-background/80 border border-border/60 rounded px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:border-primary"
  const labelCls = "slb-label text-[11px] text-muted-foreground block mb-1.5"

  return (
    <section id="savings" className="py-24 relative overflow-hidden bg-background/80">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3.5 py-1 mb-4 slb-panel">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="slb-label text-primary text-xs">The Savings Story</span>
          </div>
          <h2 className="slb-header text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4 text-foreground">
            Save tokens. Save time. Save trees.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every time your agent opens a web page the usual way, it pays for the whole page — 3,885,586 tokens for four ordinary tasks in our benchmark. Glazyr hands it the short
            version instead. Here is what that is worth to you:
          </p>
        </div>

        {/* Story cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="slb-panel p-5 border border-border/80 bg-card/40">
            <Coins className="w-5 h-5 text-primary mb-3" />
            <h3 className="font-bold text-foreground mb-1">Save tokens</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              52,790 tokens instead of 3,885,586 for the same four web tasks — measured, not promised.
              That is 74&times; fewer than raw CDP and 5.9&times; fewer than Playwright MCP.
            </p>
          </div>
          <div className="slb-panel p-5 border border-border/80 bg-card/40">
            <Clock className="w-5 h-5 text-primary mb-3" />
            <h3 className="font-bold text-foreground mb-1">Save time</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Less for the model to chew through means shorter reads, fewer retries, and web tasks
              that finish in fewer turns. Your agent stops narrating page dumps and gets to the point.
            </p>
          </div>
          <div className="slb-panel p-5 border border-border/80 bg-card/40">
            <TreePine className="w-5 h-5 text-primary mb-3" />
            <h3 className="font-bold text-foreground mb-1">Save trees</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every token you do not process is compute that never runs — less electricity, less
              CO&#8322;. Small per task, real at scale. The calculator ballparks it below.
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div className="slb-panel p-6 sm:p-8 border border-border/80 bg-card/40 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inputs */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className={labelCls}>Start from</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMode("bill")}
                    className={`px-3 py-2 text-sm font-bold border rounded transition-colors ${mode === "bill" ? "bg-primary text-primary-foreground border-primary" : "border-border/60 text-muted-foreground hover:text-foreground"}`}
                  >
                    My monthly bill
                  </button>
                  <button
                    onClick={() => setMode("tokens")}
                    className={`px-3 py-2 text-sm font-bold border rounded transition-colors ${mode === "tokens" ? "bg-primary text-primary-foreground border-primary" : "border-border/60 text-muted-foreground hover:text-foreground"}`}
                  >
                    My token usage
                  </button>
                </div>
              </div>

              {mode === "bill" ? (
                <div>
                  <label className={labelCls} htmlFor="calc-bill">Monthly AI bill (USD)</label>
                  <input
                    id="calc-bill"
                    type="number"
                    min={0}
                    value={bill}
                    onChange={(e) => setBill(Math.max(0, Number(e.target.value) || 0))}
                    className={inputCls}
                  />
                </div>
              ) : (
                <div>
                  <label className={labelCls} htmlFor="calc-tokens">Tokens per month</label>
                  <input
                    id="calc-tokens"
                    type="number"
                    min={0}
                    step={1000000}
                    value={tokens}
                    onChange={(e) => setTokens(Math.max(0, Number(e.target.value) || 0))}
                    className={inputCls}
                  />
                </div>
              )}

              <div>
                <label className={labelCls} htmlFor="calc-price">Your model&apos;s price per 1M tokens</label>
                <select
                  id="calc-price"
                  value={pricePerM}
                  onChange={(e) => setPricePerM(Number(e.target.value))}
                  className={inputCls}
                >
                  <option value={3}>$3 — smaller / efficient models</option>
                  <option value={10}>$10 — typical frontier blend</option>
                  <option value={25}>$25 — premium, output-heavy work</option>
                </select>
              </div>

              <div>
                <label className={labelCls} htmlFor="calc-share">
                  Share of your agent&apos;s work that is web browsing: <span className="text-primary font-bold">{webShare}%</span>
                </label>
                <input
                  id="calc-share"
                  type="range"
                  min={5}
                  max={95}
                  step={5}
                  value={webShare}
                  onChange={(e) => setWebShare(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: "var(--primary)" }}
                />
              </div>

              <div>
                <label className={labelCls} htmlFor="calc-mins">
                  Minutes a web task usually keeps your agent busy: <span className="text-primary font-bold">{minutesPerTask} min</span>
                </label>
                <input
                  id="calc-mins"
                  type="range"
                  min={1}
                  max={15}
                  step={1}
                  value={minutesPerTask}
                  onChange={(e) => setMinutesPerTask(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: "var(--primary)" }}
                />
              </div>
            </div>

            {/* Outputs */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded bg-background/60 border border-border/50">
                  <div className="slb-label text-[11px] mb-1">Tokens saved / month</div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary font-mono">{compact(tokensSaved)}</div>
                  <div className="text-xs text-muted-foreground mt-1">of {compact(webTokens)} web tokens</div>
                </div>
                <div className="p-4 rounded bg-background/60 border border-border/50">
                  <div className="slb-label text-[11px] mb-1">Money saved</div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary font-mono">{money(dollarsSavedMonth)}<span className="text-sm text-muted-foreground">/mo</span></div>
                  <div className="text-xs text-muted-foreground mt-1">{money(dollarsSavedMonth * 12)} a year</div>
                </div>
                <div className="p-4 rounded bg-background/60 border border-border/50">
                  <div className="slb-label text-[11px] mb-1">Agent time saved / month</div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary font-mono">{hoursSavedMonth.toFixed(1)}<span className="text-sm text-muted-foreground"> hrs</span></div>
                  <div className="text-xs text-muted-foreground mt-1">across ~{compact(tasks)} web tasks</div>
                </div>
                <div className="p-4 rounded bg-background/60 border border-border/50">
                  <div className="slb-label text-[11px] mb-1">Trees&apos; worth of CO&#8322; / year</div>
                  <div className="text-2xl sm:text-3xl font-bold text-primary font-mono">~{treesYear < 0.1 ? treesYear.toFixed(2) : compact(treesYear)}</div>
                  <div className="text-xs text-muted-foreground mt-1">{compact(co2KgYear)} kg CO&#8322; not emitted</div>
                </div>
              </div>

              {/* Comparison bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Your agent today (web tokens / month)</span>
                    <span className="font-mono text-foreground">{compact(webTokens)}</span>
                  </div>
                  <div className="h-4 bg-background/80 border border-border/50 rounded overflow-hidden">
                    <div className="h-full bg-muted-foreground/50" style={{ width: `${barToday}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">With Glazyr</span>
                    <span className="font-mono text-primary font-bold">{compact(glazyrWebTokens)}</span>
                  </div>
                  <div className="h-4 bg-background/80 border border-border/50 rounded overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${barGlazyr}%` }} />
                  </div>
                </div>
              </div>

              <p className="mt-6 text-[11px] text-muted-foreground leading-relaxed">
                How we figure it: the token cut (98.6%) is our measured 4-task benchmark vs raw CDP —
                full report in the Benchmark section below. Time credits only half of each task&apos;s
                minutes as saved; conservative on purpose. Energy uses a rough mid-range estimate of
                0.25 Wh per 1,000 tokens, 380 g CO&#8322; per kWh, and ~21 kg of CO&#8322; absorbed by
                one tree in a year. Estimates for illustration — your mileage will vary, the token
                math will not.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
