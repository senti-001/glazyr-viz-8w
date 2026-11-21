import { Navbar } from "@/components/glazyr/navbar"
import { Hero } from "@/components/glazyr/hero"
import { BenchmarkShowcase } from "@/components/glazyr/benchmark-showcase"
import { TokenSavings } from "@/components/glazyr/token-savings"
import { McpSection } from "@/components/glazyr/mcp-section"
import { BuildLogSection } from "@/components/glazyr/build-log-section"
import { PricingSection } from "@/components/glazyr/pricing-section"
import { ActivitySkylineSection } from "@/components/glazyr/activity-skyline-section"
import { Footer } from "@/components/glazyr/footer"

export default function GlazyrHome() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BenchmarkShowcase />
        <TokenSavings />
        <McpSection />
        <BuildLogSection />
        <PricingSection />
        <ActivitySkylineSection />
      </main>
      <Footer />
    </>
  )
}

