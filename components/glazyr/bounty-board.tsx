"use client"

import { useState } from "react"
import {
  Target,
  GitBranch,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  Users,
  Flame,
} from "lucide-react"

type BountyStatus = "open" | "in-progress" | "completed" | "critical"

interface Bounty {
  id: string
  title: string
  module: string
  status: BountyStatus
  priority: "low" | "medium" | "high" | "critical"
  assignee: string
  reward: string
  description: string
}

const bounties: Bounty[] = [
  {
    id: "BNT-001",
    title: "Cascade Engine v2 Migration",
    module: "Cascade",
    status: "in-progress",
    priority: "high",
    assignee: "Core Team",
    reward: "2,500 GLZ",
    description: "Migrate the cascade engine to v2 architecture with improved throughput.",
  },
  {
    id: "BNT-002",
    title: "Sovereign Relay Hardening",
    module: "Relay",
    status: "critical",
    priority: "critical",
    assignee: "Security",
    reward: "5,000 GLZ",
    description: "Implement additional security layers for the sovereign relay network.",
  },
  {
    id: "BNT-003",
    title: "Senti Training Data Pipeline",
    module: "Senti",
    status: "open",
    priority: "medium",
    assignee: "Unassigned",
    reward: "1,800 GLZ",
    description: "Build automated pipeline for ingesting and curating Senti training data.",
  },
  {
    id: "BNT-004",
    title: "Big Iron Telemetry Optimization",
    module: "Infrastructure",
    status: "completed",
    priority: "low",
    assignee: "DevOps",
    reward: "1,200 GLZ",
    description: "Optimize telemetry collection to reduce overhead on Big Iron servers.",
  },
  {
    id: "BNT-005",
    title: "ElevenLabs Widget Integration",
    module: "Frontend",
    status: "in-progress",
    priority: "high",
    assignee: "UI Team",
    reward: "2,000 GLZ",
    description: "Integrate the ElevenLabs conversational AI widget as the floating orb.",
  },
  {
    id: "BNT-006",
    title: "Typeform Sovereign Link Flow",
    module: "Onboarding",
    status: "open",
    priority: "medium",
    assignee: "Unassigned",
    reward: "1,500 GLZ",
    description: "Design and implement the Typeform-based sovereign handshake flow.",
  },
]

const statusConfig: Record<BountyStatus, { label: string; color: string; icon: React.ElementType }> = {
  open: { label: "Open", color: "text-primary", icon: AlertCircle },
  "in-progress": { label: "In Progress", color: "text-amber-400", icon: Clock },
  completed: { label: "Completed", color: "text-emerald-400", icon: CheckCircle2 },
  critical: { label: "Critical", color: "text-red-400", icon: Flame },
}

const filterOptions: { label: string; value: BountyStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in-progress" },
  { label: "Critical", value: "critical" },
  { label: "Completed", value: "completed" },
]

export function BountyBoard() {
  const [filter, setFilter] = useState<BountyStatus | "all">("all")

  const filtered =
    filter === "all" ? bounties : bounties.filter((b) => b.status === filter)

  return (
    <section id="bounties" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <Target className="h-5 w-5 text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-widest">
            Module Development
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
          Bounty Board
        </h2>
        <p className="text-muted-foreground max-w-xl mb-8 leading-relaxed">
          Transparent tracking of open tasks, module developments, and community
          contributions across the Glazyr ecosystem.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                filter === opt.value
                  ? "bg-primary text-primary-foreground glow-cyan-subtle"
                  : "glass-panel text-muted-foreground hover:text-foreground hover:border-primary/20"
              }`}
            >
              {opt.label}
              {opt.value !== "all" && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  ({bounties.filter((b) =>
                    opt.value === "all" ? true : b.status === opt.value
                  ).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bounty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((bounty) => {
            const statusInfo = statusConfig[bounty.status]
            const StatusIcon = statusInfo.icon

            return (
              <div
                key={bounty.id}
                className="glass-panel glass-panel-hover rounded-xl p-5 transition-all group cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {bounty.id}
                  </span>
                  <div className={`flex items-center gap-1.5 text-xs font-medium ${statusInfo.color}`}>
                    <StatusIcon className="h-3.5 w-3.5" />
                    {statusInfo.label}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {bounty.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {bounty.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <GitBranch className="h-3 w-3" />
                      {bounty.module}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {bounty.assignee}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-primary">
                    {bounty.reward}
                  </span>
                </div>

                {/* Hover Arrow */}
                <div className="mt-4 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
