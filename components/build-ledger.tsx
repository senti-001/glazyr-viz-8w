"use client"

import { useEffect, useState } from "react"
import { GitCommit, Github, ExternalLink, Loader2 } from "lucide-react"

interface Commit {
    sha: string
    commit: {
        message: string
        author: {
            name: string
            date: string
        }
    }
    html_url: string
}

export function BuildLedger() {
    const [commits, setCommits] = useState<Commit[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchCommits() {
            try {
                // Fetch commits that modified README.md
                const headers: HeadersInit = {}

                // Add GitHub token if available (from environment variable)
                const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN
                if (githubToken) {
                    headers['Authorization'] = `Bearer ${githubToken}`
                }

                const response = await fetch(
                    "https://api.github.com/repos/senti-001/neural-chromium/commits?path=README.md&per_page=5",
                    { headers }
                )

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.statusText}`)
                }

                const data = await response.json()
                setCommits(data)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch repository activity")
            } finally {
                setLoading(false)
            }
        }

        fetchCommits()
    }, [])

    return (
        <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6 shadow-sm h-full flex flex-col">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-primary" />
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">Build Ledger</h3>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">README.md Activity</span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <Loader2 className="h-6 w-6 animate-spin text-primary/40" />
                        <p className="font-mono text-xs text-muted-foreground">Synchronizing with Repo...</p>
                    </div>
                ) : error ? (
                    <div className="rounded-lg bg-destructive/10 p-4 font-mono text-xs text-destructive border border-destructive/20">
                        {error}
                    </div>
                ) : commits.length === 0 ? (
                    <p className="font-mono text-xs text-muted-foreground text-center py-8">No recent activity detected.</p>
                ) : (
                    commits.map((commit) => (
                        <a
                            key={commit.sha}
                            href={commit.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block rounded-lg border border-border/30 bg-muted/30 p-3 transition-all hover:border-primary/30 hover:bg-muted/50"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2 truncate">
                                    <GitCommit className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary" />
                                    <span className="truncate font-mono text-[11px] font-medium text-foreground">
                                        {commit.commit.message.split("\n")[0]}
                                    </span>
                                </div>
                                <ExternalLink className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground" />
                            </div>
                            <div className="mt-2 flex items-center justify-between font-mono text-[9px] text-muted-foreground">
                                <span>{commit.commit.author.name}</span>
                                <span>{new Date(commit.commit.author.date).toLocaleDateString()}</span>
                            </div>
                        </a>
                    ))
                )}
            </div>

            <div className="mt-6 border-t border-border/50 pt-4 text-center">
                <a
                    href="https://github.com/senti-001/neural-chromium"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1.5"
                >
                    View Full Repository <ExternalLink className="h-2.5 w-2.5" />
                </a>
            </div>
        </div>
    )
}
