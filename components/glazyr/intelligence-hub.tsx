"use client"

import { Brain, Sparkles, MessageSquare, Phone, Layers, ArrowUpRight, Shield } from "lucide-react"

const capabilities = [
  {
    icon: MessageSquare,
    title: "Voice & Text Chat",
    description:
      "Powered by the mission-current Glazyr training (Senti). Natural conversational AI for real-time assistance.",
  },
  {
    icon: Phone,
    title: "Proactive Callback Cascade",
    description:
      "High-intent users trigger the Agentic Link, initiating the proactive AI callback cascade via SMS/Voice.",
  },
  {
    icon: Layers,
    title: "Intelligence Consolidation",
    description:
      "Merging telemetry, bounties, and intelligence into a single unified command interface.",
  },
  {
    icon: Sparkles,
    title: "Adaptive Learning",
    description:
      "Senti continuously adapts to interaction patterns, improving response quality with each engagement.",
  },
  {
    icon: Shield,
    title: "Hardened Execution",
    description:
      "Leveraging ThinLTO and CFI hardening for a 40% boost in JS execution and ironclad security.",
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
          <Brain className="h-5 w-5 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-widest">
            AI Concierge
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
          Agentic Intelligence Hub
        </h2>
        <p className="text-muted-foreground max-w-xl mb-12 leading-relaxed">
          Meet Senti - the AI core powering every interaction across Glazyr.
          Available as a floating Orb, always ready to engage.
        </p>

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
