"use client"

import { useState } from "react"

export function BenchmarkShowcase() {
    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="slb-header text-4xl md:text-5xl tracking-tight leading-tight mb-6">
                        Architecture Validation
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Undeniable visual proof of the <span className="text-primary font-semibold">WebDriver Tax</span>. Watch as Glazyr's zero-copy architecture obliterates traditional CDP extraction latency and bandwidth bloat.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                    
                    {/* Semantic Extraction Benchmark */}
                    <div className="flex flex-col gap-6">
                        <div className="flex-1 slb-panel p-2 md:p-4 bg-black/40 backdrop-blur-sm relative group overflow-hidden">
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
                            <h3 className="text-2xl font-semibold mb-3 tracking-tight">Semantic Extraction Latency</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                A raw, unedited terminal race. While traditional CDP (Playwright) takes ~400ms to serialize and transmit JSON over WebSockets, Glazyr reads the exact same semantic tree directly from shared memory in <strong>~3.0ms</strong>. Over a 100x speedup in pure data extraction.
                            </p>
                        </div>
                    </div>

                    {/* WebGL Bandwidth Benchmark */}
                    <div className="flex flex-col gap-6">
                        <div className="flex-1 slb-panel p-2 md:p-4 bg-black/40 backdrop-blur-sm relative group overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            
                            <div className="relative aspect-video rounded-sm overflow-hidden border border-primary/20 bg-black shadow-2xl group cursor-pointer">
                                <video 
                                    src="/webGL.mp4" 
                                    className="w-full h-full object-contain"
                                    controls
                                    preload="metadata"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-3 tracking-tight">Vision Bandwidth (WebGL)</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Streaming live pixels. Traditional CDP struggles to maintain 4 FPS while racking up massive bandwidth bloat (20MB+). Glazyr's Direct Memory Access (DMA) sustains a fluid 13+ FPS using a fraction of the bandwidth (~0.1MB).
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
