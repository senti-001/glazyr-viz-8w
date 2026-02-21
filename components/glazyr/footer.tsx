import Image from "next/image"

const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Pulse", href: "#pulse" },
      { label: "Bounties", href: "#bounties" },
      { label: "Intelligence", href: "#intelligence" },
      { label: "Sovereign Link", href: "#sovereign-link" },
    ],
  },
  {
    heading: "Ecosystem",
    links: [
      { label: "Senti AI", href: "#" },
      { label: "Big Iron", href: "#" },
      { label: "Cascade Engine", href: "#" },
      { label: "Module SDK", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Status Page", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-16 px-6">
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
              <span className="text-base font-semibold text-foreground">
                Glazyr Viz
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Sovereign Agentic Platform. Where AI-driven intelligence meets
              proactive interaction.
            </p>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">
                {group.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Glazyr Viz. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
