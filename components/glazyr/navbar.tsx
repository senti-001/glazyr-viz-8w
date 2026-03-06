"use client"

import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Agentic Link", href: "#agentic-link" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Image
            src="/images/glazyr-emblem.png"
            alt="Glazyr Viz Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            Glazyr Viz
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#agentic-link"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors glow-cyan-subtle"
          >
            Enter Platform
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-border/50 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#agentic-link"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors mt-2"
          >
            Enter Platform
          </a>
        </div>
      )}
    </nav>
  )
}
