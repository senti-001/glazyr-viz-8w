import { Navbar } from "@/components/glazyr/navbar"
import { Hero } from "@/components/glazyr/hero"
import { TelemetryDashboard } from "@/components/glazyr/telemetry-dashboard"
import { BountyBoard } from "@/components/glazyr/bounty-board"
import { IntelligenceHub } from "@/components/glazyr/intelligence-hub"
import { SovereignLink } from "@/components/glazyr/sovereign-link"
import { AiOrb } from "@/components/glazyr/ai-orb"
import { Footer } from "@/components/glazyr/footer"

export default function GlazyrHome() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TelemetryDashboard />
        <BountyBoard />
        <IntelligenceHub />
        <SovereignLink />
      </main>
      <Footer />
      <AiOrb />
    </>
  )
}
