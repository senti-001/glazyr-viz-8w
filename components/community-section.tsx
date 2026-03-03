import Link from "next/link"
import { Github, MessageSquarePlus, Star, GitFork } from "lucide-react"
import { Button } from "@/components/ui/button"

const GITHUB_URL = "https://github.com/senti-001/glazyr-viz"

const cards = [
  {
    icon: Star,
    title: "Star the Repo",
    description:
      "Show your support by starring the Glazyr Viz repository on GitHub. It helps us gain visibility in the AI developer community.",
    href: GITHUB_URL,
    linkLabel: "Star on GitHub",
  },
  {
    icon: MessageSquarePlus,
    title: "Suggest Features",
    description:
      "Have an idea for Glazyr Viz? Submit a feature request through GitHub Issues. Senti will triage and track your suggestion.",
    href: `${GITHUB_URL}/issues`,
    linkLabel: "Open an Issue",
  },
  {
    icon: GitFork,
    title: "Contribute Code",
    description:
      "Fork the repository, make your changes, and submit a pull request. We welcome contributions from AI developers and browser engineers alike.",
    href: GITHUB_URL,
    linkLabel: "Fork & Contribute",
  },
]

export function CommunitySection() {
  return (
    <section id="community" className="border-b border-border/50 py-16 sm:py-24 md:py-32" aria-labelledby="community-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
            Get Involved
          </p>
          <h2 id="community-heading" className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Join the Community
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Glazyr Viz is built in the open. Whether you&apos;re an AI developer, an OpenClaw user, or
            simply curious about agentic computing, there&apos;s a place for you.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="group flex flex-col rounded-xl border border-border/50 bg-card p-5 transition-colors hover:border-primary/30 sm:p-6"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary sm:mb-4" aria-hidden="true">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="font-mono text-base font-semibold text-foreground sm:text-lg">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">{card.description}</p>
              <Button variant="outline" size="sm" className="mt-5 w-fit gap-2 bg-transparent font-mono text-xs sm:mt-6" asChild>
                <Link href={card.href} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5" />
                  {card.linkLabel}
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
