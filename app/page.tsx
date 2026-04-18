import { Navbar } from "@/components/glazyr/navbar"
import { Hero } from "@/components/glazyr/hero"
import { DemoVideo } from "@/components/glazyr/demo-video"
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
        <DemoVideo />
        <TokenSavings />
        <ROICalculator />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
