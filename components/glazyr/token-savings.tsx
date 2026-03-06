import { Target, Zap } from "lucide-react"

export function TokenSavings() {
    return (
        <section className="py-20 bg-black text-white relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Stop Paying the Token Tax
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
                        Traditional web agents bleed tokens on every reasoning step. Glazyr Viz’s Zero-Copy Optic Nerve eliminates the overhead.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Traditional CDP Card */}
                    <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                        <div>
                            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-zinc-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Traditional Agents</h3>
                            <p className="text-zinc-500 mb-8">Playwright / CDP</p>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-sm text-zinc-500 mb-1">Payload Per Step</div>
                                    <div className="text-3xl font-mono text-zinc-300">150kb</div>
                                    <div className="text-xs text-zinc-600 mt-1">Raw HTML / Base64</div>
                                </div>
                                <div>
                                    <div className="text-sm text-zinc-500 mb-1">Cost Per Step</div>
                                    <div className="text-3xl font-mono text-red-500/80">~$0.02</div>
                                </div>
                                <div>
                                    <div className="text-sm text-zinc-500 mb-1">Latency</div>
                                    <div className="text-3xl font-mono text-orange-500/80">120ms+</div>
                                    <div className="text-xs text-zinc-600 mt-1">Compositor Hangs</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Glazyr Viz Card */}
                    <div className="p-8 rounded-3xl bg-zinc-950 border border-blue-500/30 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                                <Zap className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-white">Glazyr Viz</h3>
                            <p className="text-blue-400 mb-8">Zero-Copy Optic Nerve</p>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-sm text-zinc-500 mb-1">Payload Per Step</div>
                                    <div className="text-4xl font-mono text-blue-400 font-bold">4kb</div>
                                    <div className="text-xs text-zinc-600 mt-1">vision.json Map</div>
                                </div>
                                <div>
                                    <div className="text-sm text-zinc-500 mb-1">Cost Per Step</div>
                                    <div className="text-4xl font-mono text-green-400 font-bold">~$0.0006</div>
                                </div>
                                <div>
                                    <div className="text-sm text-zinc-500 mb-1">Latency</div>
                                    <div className="text-4xl font-mono text-purple-400 font-bold">7.3ms</div>
                                    <div className="text-xs text-zinc-600 mt-1">Direct GPU Buffer</div>
                                </div>
                            </div>
                        </div>

                        {/* Callout */}
                        <div className="mt-8 pt-8 border-t border-blue-500/10 relative z-10">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-sm font-bold whitespace-nowrap">33x Cheaper</span>
                                <span className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-sm font-bold whitespace-nowrap">16x Faster</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
