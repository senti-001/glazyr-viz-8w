import { Globe, Zap, Bot, Code2 } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Visual Cortex",
    description:
      "A low-latency visual backbone that captures frames directly from the browser's compositor and shares them via optimized shared memory for AI agents.",
  },
  {
    icon: Zap,
    title: "NATS JetStream",
    description:
      "High-performance, distributed messaging protocol for bidirectional coordination between agents and the browser runtime.",
  },
  {
    icon: Bot,
    title: "Audio Pipeline & STT",
    description:
      "Integrated audio capture with a dedicated STT return path, enabling real-time voice interaction and multi-modal agentic control.",
  },
  {
    icon: Code2,
    title: "VLM Benchmarking",
    description:
      "Built-in support for real-world benchmarking using state-of-the-art vision models to validate agent performance in complex web environments.",
  },
]

export function OverviewSection() {
  return (
    <section id="overview" className="border-b border-border/50 py-16 sm:py-24 md:py-32" aria-labelledby="overview-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
            Architecture
          </p>
          <h2 id="overview-heading" className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Industrial Infrastructure for Agentic Computing
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Glazyr Viz reimagines the browser as industrial-grade infrastructure for AI agents.
            Every component is designed for high-throughput, low-latency programmatic interaction.
            Powered by NVIDIA 5090 clusters and EC2 Big Iron.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card p-5 transition-colors hover:border-primary/30 hover:bg-card/80 sm:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15 sm:mb-4" aria-hidden="true">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="font-mono text-base font-semibold text-foreground sm:text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
