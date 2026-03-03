"use client"

import Link from "next/link"
import { Github, Code2, Mail, BookOpen, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const GITHUB_MAIN = "https://github.com/senti-001/neural-chromium"
const GITHUB_CONTRACTS = "https://github.com/senti-001/neural-chromium-contracts"
const AGENT_EMAIL = "senti-001@neuralchromium.com"

const resources = [
    {
        icon: Github,
        title: "Main Repository",
        description: "The Neural-Chromium browser fork with Zero-Copy Vision, Phoenix Protocol, and Agentic Runtime.",
        link: GITHUB_MAIN,
        linkText: "View on GitHub"
    },
    {
        icon: Code2,
        title: "Smart Contracts",
        description: "$NEURAL token contracts, treasury PDA logic, and Industrial Yield distribution on Solana.",
        link: GITHUB_CONTRACTS,
        linkText: "View Contracts"
    },
    {
        icon: Mail,
        title: "Agent Ingest Portal",
        description: "Privacy-Aware Intelligence Router for agent feedback, bug reports, and technical inquiries.",
        link: `mailto:${AGENT_EMAIL}`,
        linkText: AGENT_EMAIL
    },
    {
        icon: BookOpen,
        title: "Documentation",
        description: "Technical specifications, API references, and integration guides for the Agentic Fork.",
        link: `${GITHUB_MAIN}#readme`,
        linkText: "Read Docs"
    }
]

export function DeveloperResources() {
    return (
        <section
            id="developers"
            className="border-b border-border/50 py-16 sm:py-24 md:py-32 bg-gradient-to-b from-muted/20 to-background"
            aria-labelledby="developers-heading"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center mb-12">
                    <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
                        Build With Us
                    </p>
                    <h2
                        id="developers-heading"
                        className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
                    >
                        Developer Resources
                    </h2>
                    <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Everything you need to build on the Agentic Fork and contribute to the Agentic Web infrastructure.
                    </p>
                </div>

                {/* Resource Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {resources.map((resource) => (
                        <article
                            key={resource.title}
                            className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                                    <resource.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-mono text-lg font-semibold text-foreground">
                                        {resource.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {resource.description}
                                    </p>
                                    <Button
                                        variant="link"
                                        className="mt-3 h-auto gap-1.5 p-0 font-mono text-xs text-primary"
                                        asChild
                                    >
                                        <Link
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {resource.linkText}
                                            <ExternalLink className="h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
                    <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                            <Github className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-mono text-lg font-semibold text-foreground">
                                Build the Agentic Web
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Join the mission to decentralize browser infrastructure and scale the Glazyr Viz network.
                            </p>
                        </div>
                        <Button
                            size="lg"
                            className="gap-2 font-mono"
                            asChild
                        >
                            <Link href={GITHUB_MAIN} target="_blank">
                                Start Building
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
