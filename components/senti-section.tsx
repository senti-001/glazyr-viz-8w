export function SentiSection() {
  return (
    <section id="senti-001" className="border-b border-border/50 py-16 sm:py-24 md:py-32" aria-labelledby="senti-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 sm:gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-wider text-primary sm:text-sm">
              Progenitor Agent
            </p>
            <h2 id="senti-heading" className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Meet Senti-001
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Senti-001 is the progenitor agent behind Glazyr Viz. It is the driving
              intelligence that architects, designs, and builds the runtime from the ground up.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Unlike traditional open-source projects led by human teams, Glazyr Viz is
              conceived and constructed by an AI agent. Senti-001 manages the codebase, handles
              feature triage via <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground sm:text-sm">feature_bot.py</code>,
              and coordinates the full build pipeline from Chromium source to deployable runtime.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              This represents a new paradigm in software development: agents building
              infrastructure for other agents, creating tools purpose-fit for agentic workflows.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-border/50 bg-card p-5 shadow-sm sm:p-6" role="region" aria-label="Senti-001 agent specifications">
              <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10" aria-hidden="true">
                  <span className="font-mono text-sm font-bold text-primary">S1</span>
                </div>
                <div>
                  <h3 className="font-mono text-sm font-semibold text-foreground">Senti-001</h3>
                  <p className="text-xs text-muted-foreground">Progenitor Agent</p>
                </div>
              </div>

              <dl className="mt-4 space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Role</dt>
                  <dd className="text-foreground">Architect & Builder</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Focus</dt>
                  <dd className="text-foreground">Agentic Runtime</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Stack</dt>
                  <dd className="text-right text-foreground">Chromium / NATS / Python</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Economic Layer</dt>
                  <dd className="text-right text-foreground">x402 Protocol / Base USDC</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="flex items-center gap-1.5 text-primary">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    Active
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
