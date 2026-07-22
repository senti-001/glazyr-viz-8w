"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { ThemeToggle } from "@/components/glazyr/theme-toggle"

const navLinks = [
  { label: "Pulse", href: "#pulse" },
  { label: "Contributions", href: "#bounties" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Agentic Link", href: "#agentic-link" },
  { label: "Enterprise Demo", href: "/enterprise" },
]

export function Navbar() {
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 slb-panel border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/glazyr-emblem.png"
            alt="Glazyr Viz Logo"
            width={40}
            height={40}
            className="rounded-full glow-cyan"
          />
          <span className="slb-header text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
            Glazyr Viz
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Home</Link>
          <Link href="/technology" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Technology</Link>
          <button
            onClick={() => session ? window.location.href = '/dashboard' : signIn()}
            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            Dashboard
          </button>
          <Link href="/privacy" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Privacy</Link>
        </div>

        {/* CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {session ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 focus:outline-none rounded-full ring-2 ring-transparent hover:ring-primary/50 transition-all">
                {session.user?.image ? (
                  <img src={session.user.image} alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-border" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary font-bold">
                    {session.user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 slb-panel border border-border/50 shadow-xl rounded-xl py-2 flex flex-col z-50">
                  <div className="px-4 py-3 border-b border-border/50 mb-1">
                    <p className="text-sm font-bold text-foreground truncate">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="px-4 py-2 text-sm hover:bg-white/5 transition-colors text-left text-muted-foreground hover:text-foreground">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/benchmark" onClick={() => setDropdownOpen(false)} className="px-4 py-2 text-sm hover:bg-white/5 transition-colors text-left text-muted-foreground hover:text-foreground">
                    Benchmark Dashboard
                  </Link>
                  <button onClick={() => { setDropdownOpen(false); signOut(); }} className="px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors text-left">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => window.open("https://form.typeform.com/to/sbdm0689", "_blank")}
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider mr-2"
              >
                Enterprise
              </button>
              <button
                onClick={() => signIn()}
                className="slb-btn slb-btn-primary px-5 py-2.5 text-sm font-semibold whitespace-nowrap"
              >
                Sign In
              </button>
            </>
          )}
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
          {session && (
            <>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider">Dashboard</Link>
              <Link href="/dashboard/benchmark" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider">Benchmark</Link>
            </>
          )}
          <Link href="/privacy" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider">Privacy</Link>
          
          {session && (
             <button onClick={() => { setMobileOpen(false); signOut(); }} className="text-sm font-semibold text-red-400 hover:text-red-300 transition-colors py-2 text-left uppercase tracking-wider">Sign Out</button>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            {session ? (
                <div className="flex items-center gap-3">
                    {session.user?.image ? (
                        <img src={session.user.image} alt="Avatar" className="w-10 h-10 rounded-full border border-border" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary font-bold">
                            {session.user?.name?.charAt(0) || "U"}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">{session.user?.name}</span>
                        <span className="text-xs text-muted-foreground">{session.user?.email}</span>
                    </div>
                </div>
            ) : (
                <button
                  onClick={() => { setMobileOpen(false); signIn(); }}
                  className="slb-btn slb-btn-primary w-full py-2.5 text-sm font-semibold"
                >
                  Sign In
                </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  )
}
