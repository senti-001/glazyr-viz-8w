"use client"

import * as React from "react"
import ContributionSkyline, { ContributionDay } from "@/components/ui/contribution-skyline"
import { Activity, Terminal, RefreshCw } from "lucide-react"

export function ActivitySkylineSection() {
  const [data, setData] = React.useState<ContributionDay[] | undefined>(undefined)
  const [loading, setLoading] = React.useState(true)
  const [liveUser, setLiveUser] = React.useState<string>("mcpmessenger")
  const [totalCount, setTotalCount] = React.useState<number | null>(null)
  const [selectedPalette, setSelectedPalette] = React.useState<"ocean" | "github" | "ember" | "grape">("ocean")

  const fetchLiveContributions = React.useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/github/contributions?username=${encodeURIComponent(liveUser)}`)
      if (!res.ok) throw new Error("Failed to load contributions")
      const result = await res.json()
      if (result.days && Array.isArray(result.days)) {
        setData(result.days)
        setTotalCount(result.totalContributions ?? null)
      }
    } catch (err) {
      console.warn("Could not fetch live GitHub contributions, displaying fallback view:", err)
    } finally {
      setLoading(false)
    }
  }, [liveUser])

  React.useEffect(() => {
    fetchLiveContributions()
  }, [fetchLiveContributions])

  return (
    <section id="activity" className="py-24 relative overflow-hidden bg-background text-foreground border-t border-border/50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Badge & Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 slb-panel border-primary/20 text-primary mb-6 rounded-full text-xs font-mono font-medium uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Agentic Activity</span>
          </div>

          <h2 className="slb-header text-3xl md:text-5xl tracking-tight mb-4 text-foreground">
            Contribution Skyline
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Live telemetry & repository commits visualized in an isometric 3D skyline. Drag to orbit, explore daily activity spikes, or switch between 2D heat map and 3D terrain.
          </p>

          {/* Palette Selector Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-muted-foreground mr-1 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" /> Theme:
            </span>
            {(["ocean", "github", "ember", "grape"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPalette(p)}
                className={`px-2.5 py-1 rounded-md capitalize transition-colors font-mono ${
                  selectedPalette === p
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={fetchLiveContributions}
              title="Refresh live data"
              className="ml-2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* 3D Skyline Canvas Card */}
        <div className="relative mx-auto w-full max-w-5xl rounded-2xl bg-card/60 backdrop-blur-sm border border-border/80 shadow-2xl p-2 sm:p-4">
          <ContributionSkyline
            data={data}
            palette={selectedPalette}
            defaultView="3d"
            orbit={true}
            heightScale={1.15}
            duration={1200}
            title={
              <div className="flex items-center gap-2 font-medium">
                <Activity className="w-4 h-4 text-primary animate-pulse" />
                <span>
                  {loading ? (
                    "Syncing live commits..."
                  ) : totalCount !== null ? (
                    <>
                      <strong className="font-semibold text-foreground">{totalCount.toLocaleString()}</strong> contributions by{" "}
                      <span className="font-mono text-primary">@{liveUser}</span>
                    </>
                  ) : (
                    "Annual Activity"
                  )}
                </span>
              </div>
            }
            className="border-0 shadow-none bg-transparent"
          />
        </div>
      </div>
    </section>
  )
}
