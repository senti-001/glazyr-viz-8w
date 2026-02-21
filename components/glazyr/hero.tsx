"use client"

import Image from "next/image"
import { ArrowRight, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium text-primary">System Online</span>
        </div>

        {/* Logo Orb */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 rounded-full animate-pulse-ring bg-primary/10 scale-150" />
            <Image
              src="/images/glazyr-emblem.png"
              alt="Glazyr Viz"
              width={120}
              height={120}
              className="relative rounded-full glow-cyan"
              priority
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight text-balance mb-6">
          The Sovereign
          <br />
          <span className="text-primary">Agentic Platform</span>
        </h1>

        {/* Subline */}
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 text-pretty">
          Consolidating telemetry, bounties, and intelligence into a unified
          AI-driven command center. Where sovereignty meets proactive interaction.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pulse"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all glow-cyan-subtle"
          >
            <Zap className="h-4 w-4" />
            View Pulse
          </a>
          <a
            href="#sovereign-link"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-8 py-3.5 text-base font-semibold text-secondary-foreground hover:bg-secondary/80 hover:border-primary/30 transition-all"
          >
            Sovereign Link
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Metric Strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: "99.97%", label: "Uptime" },
            { value: "< 12ms", label: "Latency" },
            { value: "24/7", label: "Intelligence" },
            { value: "Active", label: "Big Iron" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-panel rounded-xl px-4 py-5 text-center glass-panel-hover transition-all"
            >
              <div className="text-2xl font-bold text-primary mb-1 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
