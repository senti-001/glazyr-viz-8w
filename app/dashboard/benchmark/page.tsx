"use client"

import { useState } from "react"
import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { Activity, ArrowRight, Server, Search, Globe, Zap, FileJson } from "lucide-react"

export default function BenchmarkDashboard() {
    const [url, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState("")
    const [showDebug, setShowDebug] = useState(false)

    const presets = [
        "https://news.ycombinator.com",
        "https://en.wikipedia.org/wiki/Main_Page",
        "http://127.0.0.1:8081/slow.html",
        "https://example.com"
    ]

    const runBenchmark = async (targetUrl: string) => {
        if (!targetUrl) return
        setUrl(targetUrl)
        setIsLoading(true)
        setError("")
        setResult(null)

        try {
            const res = await fetch("/api/benchmark", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: targetUrl, debug: showDebug })
            })
            
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Benchmark failed")
            
            setResult(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen holographic-bg text-foreground font-sans">
            <Navbar />
            <main className="pt-32 pb-24 px-6">
                <div className="mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="slb-header text-3xl md:text-5xl tracking-tight mb-4 flex items-center gap-3">
                            <Activity className="h-10 w-10 text-primary" />
                            Glazyr <span className="text-primary">Zero-Copy Benchmark</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Evaluate token savings and latency for the autonomous vision pipeline.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="slb-panel p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 w-full relative">
                            <Globe className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                            <input 
                                type="url" 
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter target URL..." 
                                className="w-full bg-background/50 border border-border/50 rounded-md py-3 pl-10 pr-4 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && runBenchmark(url)}
                            />
                        </div>
                        <button 
                            onClick={() => runBenchmark(url)}
                            disabled={isLoading || !url}
                            className="slb-btn slb-btn-primary whitespace-nowrap w-full md:w-auto flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Analyzing...</span>
                            ) : (
                                <>Run Benchmark <ArrowRight className="h-4 w-4" /></>
                            )}
                        </button>
                    </div>

                    {/* Presets */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {presets.map(preset => (
                            <button
                                key={preset}
                                onClick={() => runBenchmark(preset)}
                                className="text-xs slb-label bg-secondary/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors cursor-pointer border border-border/50"
                            >
                                {preset}
                            </button>
                        ))}
                        <label className="text-xs slb-label ml-auto flex items-center gap-2 cursor-pointer border border-border/50 hover:bg-primary/10 transition-colors">
                            <input type="checkbox" checked={showDebug} onChange={(e) => setShowDebug(e.target.checked)} className="accent-primary" />
                            Debug Mode
                        </label>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 mb-8">
                            <h3 className="font-bold flex items-center gap-2"><Server className="h-4 w-4" /> Connection Error</h3>
                            <p className="mt-1 opacity-80">{error}</p>
                        </div>
                    )}

                    {/* Results */}
                    {result && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="slb-panel p-6 bg-gradient-to-br from-card to-card/50">
                                    <div className="text-muted-foreground text-sm font-bold tracking-wider mb-2 flex items-center gap-2 uppercase">
                                        <FileJson className="h-4 w-4" /> Raw HTML Size
                                    </div>
                                    <div className="text-4xl font-mono">
                                        {Number(result.html_bytes).toLocaleString()} <span className="text-base text-muted-foreground tracking-normal">B</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-3">Standard Playwright Payload</div>
                                </div>

                                <div className="slb-panel p-6 bg-gradient-to-br from-card to-emerald-500/5 border-emerald-500/20">
                                    <div className="text-emerald-500 text-sm font-bold tracking-wider mb-2 flex items-center gap-2 uppercase">
                                        <Zap className="h-4 w-4" /> Glazyr Semantic Context
                                    </div>
                                    <div className="text-4xl font-mono text-emerald-400">
                                        {Number(result.context_bytes).toLocaleString()} <span className="text-base text-emerald-500/50 tracking-normal">B</span>
                                    </div>
                                    <div className="text-xs text-emerald-500/70 mt-3 font-bold">
                                        {result.token_efficiency} Token Compression
                                    </div>
                                </div>

                                <div className="slb-panel p-6 bg-gradient-to-br from-card to-primary/5 border-primary/20">
                                    <div className="text-primary text-sm font-bold tracking-wider mb-2 flex items-center gap-2 uppercase">
                                        <Server className="h-4 w-4" /> Savings Multiplier
                                    </div>
                                    <div className="text-4xl font-mono text-primary">
                                        {result.playwright?.savings_multiplier}x
                                    </div>
                                    <div className="text-xs text-primary/70 mt-3 font-bold">
                                        Vs. Standard Scraping
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Stats */}
                            <div className="slb-panel overflow-hidden">
                                <div className="bg-background/40 border-b border-border/50 p-4 font-bold tracking-widest text-xs text-muted-foreground uppercase">
                                    Performance Metrics
                                </div>
                                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Status</div>
                                        <div className="font-mono text-emerald-400 text-sm">{result.status}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Zero-Copy Latency</div>
                                        <div className="font-mono text-foreground text-sm">{result.latency_ms || "N/A"} ms</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Time (Client)</div>
                                        <div className="font-mono text-foreground text-sm">{result.total_ms || "N/A"} ms</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Status Code</div>
                                        <div className="font-mono text-foreground text-sm">{result.status_code}</div>
                                    </div>
                                </div>
                                
                                {result.semantic_preview && (
                                    <div className="border-t border-border/50 bg-background/20 p-4">
                                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Search className="h-3 w-3" /> Semantic Preview
                                        </div>
                                        <pre className="text-xs font-mono text-foreground/80 overflow-x-auto p-4 bg-background/50 rounded border border-border/50 max-h-64">
                                            {JSON.stringify(result.semantic_preview, null, 2)}
                                        </pre>
                                    </div>
                                )}
                                
                                {showDebug && result.diagnostics && (
                                    <div className="border-t border-border/50 bg-background/20 p-4">
                                        <div className="text-xs text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Activity className="h-3 w-3" /> Diagnostics Payload
                                        </div>
                                        <pre className="text-xs font-mono text-primary/80 overflow-x-auto p-4 bg-primary/5 rounded border border-primary/20 max-h-96">
                                            {JSON.stringify(result.diagnostics, null, 2)}
                                        </pre>
                                    </div>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
