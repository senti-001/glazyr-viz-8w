"use client"

export function DemoVideo() {
    return (
        <section className="py-24 relative overflow-hidden bg-background/50">
            {/* Background accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] pointer-events-none" style={{ borderRadius: '50%' }} />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="slb-header text-4xl md:text-5xl tracking-tight leading-tight mb-6">
                        Glazyr Viz: The Optic Nerve for AI
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        <span className="text-primary font-semibold">Stop sending pixels. Start sending perception.</span> We bypassed the &quot;WebDriver Tax&quot; by hooking AI agents directly into Chromium’s shared memory—delivering <span className="text-foreground font-bold">7.3ms vision at 57+ FPS</span> with 99% less bandwidth than traditional CDP.
                    </p>
                </div>

                {/* Video Wrapper — Cinematic Panel */}
                <div className="max-w-5xl mx-auto">
                    <div className="slb-panel p-2 md:p-4 bg-black/40 backdrop-blur-sm relative group overflow-hidden">
                        {/* Interactive Glow */}
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        <div className="relative aspect-video rounded-sm overflow-hidden border border-primary/20 bg-black shadow-2xl">
                            <iframe 
                                width="100%" 
                                height="100%" 
                                src="https://www.youtube.com/embed/Es7A1aTxexw?si=Q7kywfhosKjEA3J8" 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerPolicy="strict-origin-when-cross-origin" 
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>

                        {/* Bottom Branding / Metadata Overlay */}
                        <div className="mt-4 flex items-center justify-between px-2">
                            <div className="flex items-center gap-4">
                                <span className="slb-label text-[10px] text-primary/60 tracking-widest uppercase">Source: Big Iron Node v7.0</span>
                                <span className="slb-label text-[10px] text-primary/60 tracking-widest uppercase">DMA: Enabled</span>
                            </div>
                            <div className="hidden sm:block text-right">
                                <div className="text-[10px] font-mono text-muted-foreground/40 leading-none">LATENCY: 7.35ms | THROUGHPUT: 57.2 FPS</div>
                                <div className="text-[11px] font-mono text-muted-foreground/80 mt-2 leading-none italic">
                                    Note: Visual fluidity is limited by 60Hz screen encoding. Raw Vision DMA telemetry is reflected live in the terminal.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
