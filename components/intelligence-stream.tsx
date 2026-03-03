"use client"

import { BookOpen, ExternalLink, ScrollText } from "lucide-react"

export function IntelligenceStream() {
    return (
        <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm flex flex-col h-[400px] sm:h-[500px] md:h-[600px]">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">Intelligence Stream</h3>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-muted-foreground hidden sm:inline">Nightly Ingest Logs</span>
                    <a
                        href="https://neuralchromium.blogspot.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>

            <div className="relative flex-1 rounded-lg border border-border/30 bg-black/20 overflow-hidden group">
                <iframe
                    src="https://neuralchromium.blogspot.com/"
                    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100"
                    title="Glazyr Viz Blogger Feed"
                />

                {/* Overlay for premium feel */}
                <div className="absolute inset-0 pointer-events-none border border-inset border-white/5 rounded-lg" />
            </div>

            <div className="mt-4 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                <ScrollText className="h-3 w-3" />
                <span>Manifesto & Technical Roadmap Archive</span>
            </div>
        </div>
    )
}
