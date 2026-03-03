import Image from "next/image"
import Link from "next/link"
import { Github } from "lucide-react"
import { AgenticAudit } from "@/components/agentic-audit"

const GITHUB_URL = "https://github.com/senti-001/neural-chromium"

export function Footer() {
  return (
    <footer role="contentinfo">
      <AgenticAudit />
      <div className="border-t border-border/50 py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Link href="/" className="flex items-center gap-2" aria-label="Glazyr Viz home">
              <span className="text-xl font-bold tracking-tight text-white">
                GLAZYR<span className="text-primary">VIZ</span>
              </span>
            </Link>

            <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link
                href="#overview"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Overview
              </Link>
              <Link
                href="#phoenix"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Phoenix Protocol
              </Link>
              <Link
                href="#tokenomics"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Tokenomics
              </Link>
              <Link
                href="#developers"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Developers
              </Link>
              <Link
                href="#bounties"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Bounties
              </Link>
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </Link>
              <Link
                href="https://github.com/senti-001/glazyr-portal-contracts"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Smart Contracts
              </Link>
              <Link
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Glazyr Viz on GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>
            </nav>
          </div>

          <div className="mt-6 border-t border-border/50 pt-6 text-center sm:mt-8 sm:pt-8">
            <p className="text-xs text-muted-foreground sm:text-sm">
              Built by{" "}
              <Link
                href="https://github.com/senti-001"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-foreground transition-colors hover:text-primary"
              >
                Senti-001
              </Link>
              . Open source under the project license.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
