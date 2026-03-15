"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
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
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link href="/technology" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Technology</Link>
          <button
            onClick={() => session ? window.location.href = '/dashboard' : signIn()}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Dashboard
          </button>
          <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
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
                  <div className="h-9 w-9 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-primary font-bold text-sm hover:border-primary transition-colors cursor-pointer">
                    {(session.user?.name || session.user?.email || "U")[0].toUpperCase()}
                  </div>
                )}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-panel border border-white/10 rounded-xl py-2 shadow-xl z-50">
                  <div className="px-3 pb-2 border-b border-white/5 mb-1">
                    <p className="text-xs font-semibold text-foreground truncate">{session.user?.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: '/' }) }}
                    className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-red-400 hover:bg-white/5 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors glow-cyan-subtle"
            >
              Authenticate Identity
            </button>
          )}
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
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Home
          </Link>
          <Link
            href="/technology"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Technology
          </Link>
          <button
            onClick={() => { setMobileOpen(false); session ? window.location.href = '/dashboard' : signIn(); }}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2 text-left"
          >
            Dashboard
          </button>
          <Link
            href="/privacy"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Privacy
          </Link>
          {session ? (
            <button
              onClick={() => { setMobileOpen(false); signOut({ callbackUrl: '/' }); }}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors mt-2"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => { setMobileOpen(false); signIn(); }}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors mt-2"
            >
              Authenticate Identity
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
