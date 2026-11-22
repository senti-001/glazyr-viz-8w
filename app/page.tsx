import { Navbar } from "@/components/glazyr/navbar"
import { Hero } from "@/components/glazyr/hero"
import { BenchmarkSection } from "@/components/glazyr/benchmark-section"
import { McpSection } from "@/components/glazyr/mcp-section"
import { BuildLogSection } from "@/components/glazyr/build-log-section"
import { PricingSection } from "@/components/glazyr/pricing-section"
import { Footer } from "@/components/glazyr/footer"

export default function GlazyrHome() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BenchmarkSection />
        <McpSection />
        <BuildLogSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
