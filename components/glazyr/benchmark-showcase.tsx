"use client"

export function BenchmarkShowcase() {
    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="slb-header text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4 text-foreground">
                        Architecture Validation
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        See the difference of the <span className="text-primary font-semibold">WebDriver Tax</span>. Watch as Glazyr&apos;s zero-copy shared memory architecture bypasses traditional CDP extraction latency and serialization bloat.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Semantic Extraction Benchmark */}
                    <div className="flex flex-col gap-6">
                        <div className="slb-panel p-2 md:p-4 bg-black/40 backdrop-blur-sm relative group overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            
                            <div className="relative aspect-video rounded-sm overflow-hidden border border-primary/20 bg-black shadow-2xl group cursor-pointer">
                                <video 
                                    src="/true.mp4" 
                                    className="w-full h-full object-contain"
                                    controls
                                    preload="metadata"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-3 tracking-tight text-foreground">Semantic Extraction Latency</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We measured the incumbent approach ourselves. A CDP accessibility-tree fetch — the way agent frameworks read pages today — took <strong>19ms on a small form page and 1,521ms on a large article page</strong>, scaling with page size. Glazyr&apos;s browser writes its page-content tree directly into shared memory, where another process reads it in <strong>0.9–43 microseconds</strong> depending on payload size. Through the full MCP stack an agent actually uses, a filtered state read on the large page lands in <strong>28ms median</strong> — about 50× faster than the CDP fetch, with the remaining time spent curating the tree, not moving it.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
