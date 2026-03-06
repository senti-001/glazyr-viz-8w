"use client"

import { Cpu, Activity, Network, Server, Layers, ArrowUpRight, Shield } from "lucide-react"

const capabilities = [
  {
    icon: Activity,
    title: "110ms Sensory Audit",
    description:
      "Perception cycles verified at 110ms, executing parallel audits of visually dense web applications without breaking stealth.",
  },
  {
    icon: Network,
    title: "Zero-Copy SHM Buffer",
    description:
      "Frames extracted directly from the GPU compositor via POSIX Shared Memory, bypassing network encodes for sub-10ms capture.",
  },
  {
    icon: Layers,
    title: "Intelligence Consolidation",
    description:
      "Merging raw frame bytes and DOM semantics into a unified context pipeline for instantaneous evaluation.",
  },
  {
    icon: Server,
    title: "High-Frequency Telemetry",
    description:
      "Continuous runtime monitoring via Redis pub/sub routing, yielding a sustained 177 TPS (Tokens Per Second).",
  },
  {
    icon: Shield,
    title: "Hardened Execution",
    description:
      "Leveraging ThinLTO and CFI hardening for a 40% boost in JS execution and ironclad environment security.",
  },
]

export function IntelligenceHub() {
  return (
    <section id="intelligence" className="relative py-24 px-6">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/3 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <Cpu className="h-5 w-5 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-widest">
            Core Architecture
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
          Sovereign Agent Environment
        </h2>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          The Senti execution environment is built for pure autonomous action.
          Zero-latency perception and continuous DMA pipeline streaming.
        </p>

        {/* Telemetry Pulse Overlay (Orb Replacement) */}
        <div className="w-full max-w-sm mt-8 mb-16 p-5 rounded-2xl border border-primary/20 bg-background/60 shadow-inner overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
          <div className="flex justify-between items-center mb-3 relative z-10">
            <span className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest">
              Telemetry Pulse
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              11.4ms AVG
            </span>
          </div>
          <div className="relative z-10">
            <svg
              className="w-full h-16 overflow-visible"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-primary/30"
                points="0,15 5,12 10,18 15,14 20,8 25,11 30,19 35,16 40,7 45,12 50,10 55,14 60,6 65,11 70,17 75,12 80,9 85,15 90,5 95,8 100,12"
              />
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary drop-shadow-[0_0_8px_rgba(66,133,244,0.8)]"
                style={{
                  strokeDasharray: '300',
                  strokeDashoffset: '0',
                  animation: 'typing 4s linear infinite'
                }}
                points="0,15 5,12 10,18 15,14 20,8 25,11 30,19 35,16 40,7 45,12 50,10 55,14 60,6 65,11 70,17 75,12 80,9 85,15 90,5 95,8 100,12"
              />
            </svg>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes typing {
              from { stroke-dashoffset: 300; }
              to { stroke-dashoffset: 0; }
            }
          `}} />
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="glass-panel glass-panel-hover rounded-xl p-6 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <cap.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Badges */}
        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-5">
            Powered By
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                name: "ElevenLabs",
                desc: "Conversational AI Widget",
                tag: "agent_6101khj3773z",
              },
              {
                name: "Typeform",
                desc: "Agentic Link Handshake",
                tag: "xumIGJOz",
              },
              {
                name: "Glazyr Core",
                desc: "Senti Intelligence Engine",
                tag: "v2.4.1-stable",
              },
            ].map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between rounded-lg bg-secondary/30 p-4 hover:bg-secondary/50 transition-all group cursor-pointer"
              >
                <div>
                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {integration.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {integration.desc}
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground/60 mt-1">
                    {integration.tag}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
