import { Navbar } from "@/components/glazyr/navbar"
import { Hero } from "@/components/glazyr/hero"
import { TokenSavings } from "@/components/glazyr/token-savings"
import { PricingSection } from "@/components/glazyr/pricing-section"
import { Footer } from "@/components/glazyr/footer"

export default function GlazyrHome() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TokenSavings />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
