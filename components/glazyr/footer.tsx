"use client"

import Image from "next/image"
import Link from "next/link"
import { useSession, signIn } from "next-auth/react"

const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Technology", href: "/technology" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
]

export function Footer() {
  const { data: session } = useSession()

  return (
    <footer className="border-t border-border/50 py-16 px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/glazyr-emblem.png"
                alt="Glazyr Viz"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="slb-header text-base text-foreground">
                Glazyr Viz
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Agentic Platform. Where high-speed DOM extraction meets autonomous action.
            </p>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h4 className="slb-label mb-4 text-foreground">
                {group.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.label === "Dashboard" ? (
                      <button
                        onClick={() => window.open("https://form.typeform.com/to/sbdm0689", "_blank")}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                      >
                        Enterprise Support
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="slb-panel p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Glazyr Viz. All rights reserved. MAGNETAR SENTIENT L.L.C.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-500 opacity-75" style={{ borderRadius: '50%' }} />
              <span className="relative inline-flex h-1.5 w-1.5 bg-emerald-500" style={{ borderRadius: '50%' }} />
            </span>
            <span className="slb-label text-emerald-600 dark:text-emerald-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
