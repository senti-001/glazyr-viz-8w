"use client"

import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/glazyr/theme-toggle"

const navLinks = [
  { label: "Pulse", href: "#pulse" },
  { label: "Contributions", href: "#bounties" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Agentic Link", href: "#agentic-link" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 slb-panel border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/glazyr-emblem.png"
            alt="Glazyr"
            width={40}
            height={40}
            className="rounded-full glow-cyan"
          />
          <span className="slb-header text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
            Glazyr
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Home</Link>
          <Link href="/technology" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Technology</Link>
          <Link href="/benchmarks" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Benchmarks</Link>
          <Link href="/build-log" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Build Log</Link>
          <Link href="/mcp-setup" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">MCP Setup</Link>
          <Link href="/privacy" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Privacy</Link>
        </div>

        {/* CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <a
            href="https://github.com/mcpmessenger/glazyr-mcp"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            GitHub
          </a>
          <Link
            href="/#mcp"
            className="slb-btn slb-btn-primary px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
          >
            Get Glazyr — Free
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:!hidden slb-btn slb-btn-sm"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden slb-panel border-t border-border/50 px-6 py-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider">Home</Link>
          <Link href="/technology" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider">Technology</Link>
          <Link href="/benchmarks" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider">Benchmarks</Link>
          <Link href="/build-log" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider">Build Log</Link>
          <Link href="/mcp-setup" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider">MCP Setup</Link>
          <Link href="/privacy" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider">Privacy</Link>
          

          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <Link
              href="/#mcp"
              onClick={() => setMobileOpen(false)}
              className="slb-btn slb-btn-primary px-5 py-2.5 text-sm font-semibold"
            >
              Get Glazyr — Free
            </Link>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}
