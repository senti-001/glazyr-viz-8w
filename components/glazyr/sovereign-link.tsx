"use client"

import { Link2, ArrowRight, Shield, Zap, Globe } from "lucide-react"

export function SovereignLink() {
  return (
    <section id="sovereign-link" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Link2 className="h-5 w-5 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-widest">
                  Investment & Onboarding
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight text-balance">
                The Sovereign Link
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
                High-intent users - investors, partners, and builders - enter the
                Sovereign Link to initiate a direct connection with Glazyr. This
                triggers our proactive AI callback cascade, seamlessly
                transitioning from web to mobile.
              </p>

              {/* Features */}
              <div className="flex flex-col gap-4 mb-8">
                {[
                  {
                    icon: Shield,
                    text: "Encrypted end-to-end handshake protocol",
                  },
                  {
                    icon: Zap,
                    text: "Instant AI callback within 60 seconds",
                  },
                  {
                    icon: Globe,
                    text: "Web-to-mobile sovereign transition",
                  },
                ].map((feat) => (
                  <div key={feat.text} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <feat.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-foreground">{feat.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all glow-cyan"
              >
                Initiate Handshake
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Visual Panel */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-64 h-64 rounded-full border border-primary/10 flex items-center justify-center animate-pulse-ring">
                  <div className="w-48 h-48 rounded-full border border-primary/20 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-primary/30 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center glow-cyan">
                        <Link2 className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute top-4 -right-4 glass-panel rounded-lg px-3 py-2 text-xs">
                  <span className="text-primary font-mono">SMS</span>
                </div>
                <div className="absolute -bottom-2 -left-4 glass-panel rounded-lg px-3 py-2 text-xs">
                  <span className="text-primary font-mono">Voice</span>
                </div>
                <div className="absolute top-1/2 -right-8 glass-panel rounded-lg px-3 py-2 text-xs">
                  <span className="text-primary font-mono">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
