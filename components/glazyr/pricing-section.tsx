"use client"

import { Mail, Terminal } from "lucide-react"

export function PricingSection() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-background text-foreground border-t border-border/50">
            <div className="container mx-auto px-6 text-center max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 slb-panel border-primary/20 text-primary mb-6 text-xs font-mono font-medium uppercase tracking-widest">
                    <Terminal className="h-4 w-4" />
                    <span>The Deal</span>
                </div>
                <h2 className="slb-header text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground mb-4">
                    Free. Local. Yours.
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                    Glazyr&apos;s local MCP server is free. It runs entirely on your machine — your agent, your browser, no Glazyr account, no telemetry, nothing phones home. One command installs it, and your agent gets zero-copy page perception at a fraction of the token cost. A hosted tier may come later; the local tool is free, full stop.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="mailto:will@glazyr.com"
                        className="slb-btn slb-btn-primary px-8 py-4 text-base font-bold inline-flex items-center gap-3 group"
                    >
                        <Mail className="h-5 w-5" />
                        <span>will@glazyr.com</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
