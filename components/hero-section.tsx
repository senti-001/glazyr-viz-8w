import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const TerminalNode = dynamic(
  () => import("@/components/terminal-node").then((mod) => mod.TerminalNode),
  { ssr: false }
)

const GITHUB_URL = "https://github.com/senti-001/glazyr-viz"
const agentic_LINK = "https://form.typeform.com/to/sbdm0689"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/50" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative h-48 w-48 transition-transform hover:scale-105 sm:h-64 sm:w-64">
              <Image
                src="/Untitled design (4).png"
                alt="Glazyr Viz Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary sm:mb-6 sm:px-4 sm:py-1.5 sm:text-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Under Active Development
          </div>

          <h1 id="hero-heading" className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            The Agentic Fork:
            <br />
            <span className="text-primary">Foundational Rails for the Agentic Web</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            Glazyr Viz is industrial-grade infrastructure for agentic perception and action.
            Built on Chromium, NATS JetStream, and Solana—this isn't a tool, it's the foundational architecture
            for the Agentic Cloud. Zero-Copy Vision. Phoenix Protocol. Hardware-backed $GLAZYR economics.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Button size="lg" className="w-full gap-2 font-mono text-sm sm:w-auto" asChild>
              <Link href={agentic_LINK} target="_blank" rel="noopener noreferrer">
                <ArrowRight className="h-4 w-4" />
                Initialize Agentic Link
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full gap-2 bg-transparent font-mono text-sm sm:w-auto" asChild>
              <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                View Architecture
              </Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-2xl sm:mt-16 text-left">
          <TerminalNode />
        </div>
      </div>
    </section>
  )
}
