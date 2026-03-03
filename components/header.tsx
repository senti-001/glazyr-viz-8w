"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const GITHUB_URL = "https://github.com/senti-001/glazyr-viz"
const agentic_LINK = "https://form.typeform.com/to/sbdm0689"

const navLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#status", label: "Status" },
  { href: "#community", label: "Community" },
  { href: "#senti-001", label: "Senti-001" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav aria-label="Main navigation" className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:h-28 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Glazyr Viz home">
          <div className="relative h-16 w-64 sm:h-24 sm:w-[350px]">
            <Image
              src="/logo-v2.png"
              alt="Glazyr Viz Logo"
              width={32}
              height={32}
              className="h-8 w-8 text-primary"
            />
            <span className="font-mono text-lg font-bold tracking-tight text-foreground sm:text-xl">
              GLAZYR<span className="text-primary">VIZ</span>
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="hidden gap-2 bg-transparent md:flex" asChild>
            <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
          </Button>
          <Button size="sm" className="hidden gap-2 md:flex" asChild>
            <Link href={agentic_LINK} target="_blank" rel="noopener noreferrer">
              <span>Agentic Link</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-14 bottom-0 z-40 bg-background/95 backdrop-blur-sm sm:top-16 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href={agentic_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg px-4 py-3 text-base font-bold text-primary transition-colors hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              Agentic Link
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
