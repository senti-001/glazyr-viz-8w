"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { ThemeToggle } from "@/components/glazyr/theme-toggle"

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

          {status === "loading" ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                title="Account menu"
                className="focus:outline-none"
              >
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User avatar"}
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-primary/40 hover:border-primary transition-colors cursor-pointer shadow-[0_0_12px_var(--primary-glow)]"
                  />
                ) : (
                  <div
                    className="h-9 w-9 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-primary font-bold text-sm hover:border-primary transition-colors cursor-pointer"
                  >
                    {(session.user?.name || session.user?.email || "U")[0].toUpperCase()}
                  </div>
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 slb-panel border border-border py-2 shadow-xl z-50">
                  <div className="px-3 pb-2 border-b border-border/50 mb-1">
                    <p className="text-xs font-semibold text-foreground truncate">{session.user?.name}</p>
                    <p className="slb-label truncate">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: '/' }) }}
                    className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="slb-btn slb-btn-primary px-5 py-2.5 text-sm font-semibold"
            >
              Sign In
            </button>
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
          <button onClick={() => { setMobileOpen(false); session ? window.location.href = '/dashboard' : signIn(); }} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 text-left uppercase tracking-wider">Dashboard</button>
          <Link href="/privacy" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 uppercase tracking-wider">Privacy</Link>
          <div className="flex items-center gap-3 pt-2 border-t border-border/30">
            <ThemeToggle />
            {session ? (
              <button onClick={() => { setMobileOpen(false); signOut({ callbackUrl: '/' }); }} className="slb-btn w-full py-2.5 text-sm font-semibold">Sign Out</button>
            ) : (
              <button onClick={() => { setMobileOpen(false); signIn(); }} className="slb-btn slb-btn-primary w-full py-2.5 text-sm font-semibold">Sign In</button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
