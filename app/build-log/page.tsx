import type { Metadata } from "next"
import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { BuildLogSection } from "@/components/glazyr/build-log-section"
import { ArrowLeft, Terminal, ShieldCheck } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Build Log & Truth Pass v2 - Chromium 158 Fork",
  description:
    "Engineering build log and verified performance metrics for Glazyr: Chromium 158 headless_shell fork, zero-copy shared memory buffer peek (0.9–43µs), 28ms median MCP state read, and token scoreboard (3.7×–5.4× cheaper).",
  alternates: {
    canonical: "/build-log",
  },
  openGraph: {
    title: "Build Log & Truth Pass v2 | Glazyr",
    description:
      "Every number measured on the current Chromium 158 fork build. Verified logs, empirical benchmarks, MCP bridge dogfood, and token scoreboard.",
    url: "https://glazyr.com/build-log",
  },
}

export default function BuildLogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      <main className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Back link & Top Badge */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Overview
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1 slb-panel">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span className="slb-label text-primary text-xs">Nov 21, 2026 Truth Pass v2</span>
              </div>
              <div className="inline-flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 slb-panel">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="slb-label text-emerald-500 text-xs">Measured Fork Build</span>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-12">
            <h1 className="slb-header text-4xl sm:text-5xl tracking-tight mb-4 text-foreground">
              Engineering <span className="text-primary">Build Log</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Rule for this pass: every number on the page must be one we measured on the current fork build. Anything not yet measured is labeled as in-progress or cut. Pricing and positioning are untouched — this record documents technical claims and active bring-up.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <BuildLogSection />
      </main>

      <Footer />
    </div>
  )
}
