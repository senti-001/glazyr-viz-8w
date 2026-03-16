import { Target, Zap } from "lucide-react"

export function TokenSavings() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="slb-header text-4xl md:text-5xl tracking-tight leading-tight mb-6">
                        Stop Paying the Token Tax
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Traditional web agents bleed tokens on every reasoning step. Glazyr Viz’s Zero-Copy Optic Nerve eliminates the overhead.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Traditional CDP Card */}
                    <div className="slb-panel p-8 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <h3 className="slb-header text-2xl mb-2">Traditional Agents</h3>
                            <p className="text-muted-foreground mb-8 text-sm">Playwright / CDP</p>

                            <div className="space-y-6">
                                <div>
                                    <div className="slb-label text-xs mb-1">Payload Per Step</div>
                                    <div className="text-3xl font-mono text-foreground opacity-90">150kb</div>
                                    <div className="text-xs text-muted-foreground mt-1">Raw HTML / Base64</div>
                                </div>
                                <div>
                                    <div className="slb-label text-xs mb-1">Cost Per Step</div>
                                    <div className="text-3xl font-mono text-destructive">~$0.02</div>
                                </div>
                                <div>
                                    <div className="slb-label text-xs mb-1">Latency</div>
                                    <div className="text-3xl font-mono text-orange-500 dark:text-orange-400">120ms+</div>
                                    <div className="text-xs text-muted-foreground mt-1">Compositor Hangs</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Glazyr Viz Card */}
                    <div className="slb-panel slb-panel-highlight p-8 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="slb-header text-2xl mb-2 text-primary">Glazyr Viz</h3>
                            <p className="text-primary/80 mb-8 text-sm">Zero-Copy Optic Nerve</p>

                            <div className="space-y-6">
                                <div>
                                    <div className="slb-label text-xs mb-1">Payload Per Step</div>
                                    <div className="text-4xl font-mono text-primary font-bold">4kb</div>
                                    <div className="text-xs text-muted-foreground mt-1">vision.json Map</div>
                                </div>
                                <div>
                                    <div className="slb-label text-xs mb-1">Cost Per Step</div>
                                    <div className="text-4xl font-mono text-green-500 dark:text-green-400 font-bold">~$0.0006</div>
                                </div>
                                <div>
                                    <div className="slb-label text-xs mb-1">Latency</div>
                                    <div className="text-4xl font-mono text-primary font-bold">7.3ms</div>
                                    <div className="text-xs text-muted-foreground mt-1">Direct GPU Buffer</div>
                                </div>
                            </div>
                        </div>

                        {/* Callout */}
                        <div className="mt-8 pt-6 border-t border-border/50 relative z-10">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="slb-label px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">33x Cheaper</span>
                                <span className="slb-label px-3 py-1 bg-primary/10 border border-primary/20 text-primary">16x Faster</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
