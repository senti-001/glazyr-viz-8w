"use client"

import Link from "next/link"
import { Code2, Shield, Cpu, TrendingUp, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"

const GITHUB_URL = "https://github.com/senti-001/neural-chromium"
const agentic_LINK = "https://form.typeform.com/to/sbdm0689"

import bountiesData from "@/data/bounties.json"

interface Bounty {
    id: string
    title: string
    description: string
    difficulty: "Advanced" | "Expert"
    scope: string
    reward: string
    tags: string[]
}

const bounties = bountiesData as Bounty[]

const difficultyColors = {
    "Advanced": "text-violet-500 bg-violet-500/10 border-violet-500/20",
    "Expert": "text-rose-500 bg-rose-500/10 border-rose-500/20"
}

export function ModuleBountyBoard() {
    return null; // Bounties not yet minted
}
