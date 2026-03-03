import { Navbar } from "@/components/glazyr/navbar"
import { Hero } from "@/components/glazyr/hero"
import { TelemetryDashboard } from "@/components/glazyr/telemetry-dashboard"
import { IntelligenceHub } from "@/components/glazyr/intelligence-hub"
import { AgenticLink } from "@/components/glazyr/agentic-link"
import { PricingSection } from "@/components/glazyr/pricing-section"
import { Footer } from "@/components/glazyr/footer"

export default function GlazyrHome() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TelemetryDashboard />
        <PricingSection />
        <IntelligenceHub />
        <AgenticLink />
      </main>
      <Footer />
    </>
  )
}
