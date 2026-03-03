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

interface Contribution {
  id: string
  title: string
  module: string
  status: BountyStatus
  priority: "low" | "medium" | "high" | "critical"
  assignee: string
  description: string
}

const contributions: Contribution[] = [
  {
    id: "GLAZYR-001",
    title: "Contribute to Glazyr Viz Core",
    module: "Open Source",
    status: "open",
    priority: "high",
    assignee: "Community",
    description: "All active development tasks and bug tracking have moved to our GitHub Issues page. Click 'View Details' to navigate to the repository.",
  }
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

export function ContributionBoard() {
  return null; // Contributions managed via GitHub Issues
}
