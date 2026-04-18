"use client"

import { useState } from "react"
import { Calculator, Activity, Sparkles } from "lucide-react"

export function ROICalculator() {
    const [agents, setAgents] = useState<number>(100)

    // Benchmark assumption: ~$36.50 per agent per month for traditional CDP stack/Browserbase
    const legacyCost = Math.round(agents * 36.50)
    
    // Glazyr Tiers:
    // 0-49: $299 (Starter)
    // 50-249: $499 (Pro)
    // 250-499: $1499 
    // 500+: $3999 (Enterprise)
    let glazyrCost = 0
    if (agents < 50) {
        glazyrCost = 299
    } else if (agents < 250) {
        glazyrCost = 499
    } else if (agents < 500) {
        glazyrCost = 1499
    } else {
        glazyrCost = 3999
    }

    const savings = Math.max(0, legacyCost - glazyrCost)

    return (
        <section id="roi-calculator" className="py-24 relative overflow-hidden text-white bg-background border-t border-primary/10">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
                    {/* Input Controls */}
                    <div className="w-full md:w-1/2 p-8 slb-panel border-primary/20 bg-primary/5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 slb-panel border-primary/20 text-primary mb-8">
                            <Calculator className="h-4 w-4" />
                            <span className="text-xs font-mono font-medium uppercase tracking-widest">
                                Savings Estimator
                            </span>
                        </div>
                        <h3 className="slb-header text-2xl mb-8 tracking-tight">Configure Your Fleet</h3>
                        
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Concurrent Agents</label>
                                <span className="text-xl font-bold font-mono text-primary bg-primary/10 px-3 py-1 rounded slb-panel border-primary/20">{agents}</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="1000"
                                step="10"
                                value={agents}
                                onChange={(e) => setAgents(parseInt(e.target.value))}
                                className="w-full slb-slider"
                                style={{ accentColor: '#00ffcc' }}
                            />
                            <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
                                <span>10</span>
                                <span>1000+</span>
                            </div>
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className="w-full md:w-1/2">
                        <div className="relative slb-panel border-primary/40 bg-zinc-900/80 p-8 overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
                            
                            <h4 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Monthly Projection
                            </h4>
                            
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Legacy CDP Architecture</p>
                                    <div className="flex items-end gap-1">
                                        <span className="text-2xl font-mono text-red-400 strike-through line-through opacity-70">${legacyCost.toLocaleString()}</span>
                                    </div>
                                </div>
                                
                                <div className="h-px w-full bg-zinc-800" />
                                
                                <div>
                                    <p className="text-xs text-primary mb-1 uppercase tracking-wider">Glazyr SHM License</p>
                                    <div className="flex items-end gap-1">
                                        <span className="text-4xl font-mono font-bold text-white">${glazyrCost.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="relative mt-8 pt-6 border-t border-primary/20">
                                    <div className="absolute top-0 right-0 p-2 bg-primary/20 border-l border-b border-primary/30">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                    </div>
                                    <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Estimated Savings</p>
                                    <p className="text-4xl md:text-5xl font-mono font-bold text-primary">
                                        ${savings.toLocaleString()} <span className="text-lg text-primary/70">/mo</span>
                                    </p>
                                    <p className="mt-2 text-xs text-muted-foreground">Based on Playwright/Browserbase baseline</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Custom slider styles for standard Webkit visually fitting the app */}
            <style jsx>{`
                .slb-slider {
                    -webkit-appearance: none;
                    background: rgba(0, 255, 204, 0.1);
                    height: 6px;
                    border-radius: 3px;
                    outline: none;
                }
                .slb-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: #00ffcc;
                    border: 2px solid #000;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
                }
            `}</style>
        </section>
    )
}
