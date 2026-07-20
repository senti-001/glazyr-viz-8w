import { Navbar } from "@/components/glazyr/navbar"
import { Hero } from "@/components/glazyr/hero"
import { BenchmarkShowcase } from "@/components/glazyr/benchmark-showcase"
import { TokenSavings } from "@/components/glazyr/token-savings"
import { ROICalculator } from "@/components/glazyr/roi-calculator"
import { PricingSection } from "@/components/glazyr/pricing-section"
import { Footer } from "@/components/glazyr/footer"

export default function GlazyrHome() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BenchmarkShowcase />
        <TokenSavings />
        <ROICalculator />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
