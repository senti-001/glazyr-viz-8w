import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { CreditManager } from "@/lib/paymaster"
import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { DashboardKeyring } from "@/components/glazyr/dashboard-keyring"
import { DashboardQuickStart } from "@/components/glazyr/dashboard-quickstart"
import { DashboardPurchase } from "@/components/glazyr/dashboard-purchase"
import { Database, Code } from "lucide-react"
import { Terminal } from "@/components/glazyr/terminal"

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    // Secure Zero-Trust Route Lockdown
    if (!session || !session.user) {
        redirect("/auth/signin")
    }

    // Extract raw session token directly from secure cookies for the Keyring
    const cookieStore = await cookies()
    const isProd = process.env.NODE_ENV === "production"
    const tokenName = isProd ? "__Secure-next-auth.session-token" : "next-auth.session-token"
    const sessionToken = cookieStore.get(tokenName)?.value || "TOKEN_NOT_FOUND"

    // Query Upstash Redis directly to bypass NextAuth payload limitations
    const creditManager = new CreditManager()
    const balance = await creditManager.getFiatBalance(session.user.id as string)

    return (
        <div className="min-h-screen holographic-bg text-foreground font-sans">
            <Navbar />
            <main className="pt-32 pb-24 px-6">
                <div className="mx-auto max-w-4xl">
                    {/* Dashboard Header */}
                    <div className="mb-12">
                        <h1 className="slb-header text-3xl md:text-5xl tracking-tight mb-4">
                            <span className="text-primary">Dashboard</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Manage your Glazyr Credits and secure compute keys for the Glazyr network.
                        </p>
                    </div>

                    {/* Live Redis Ledger Box */}
                    <div className="mb-12">
                        <div className="slb-panel p-8 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h2 className="slb-header text-xl flex items-center gap-2">
                                    <Database className="h-5 w-5 text-primary" />
                                    Glazyr Balance
                                </h2>
                                <span className="slb-label bg-primary/10 px-3 py-1.5">
                                    Live Redis Ledger
                                </span>
                            </div>
                            <div className="flex items-baseline gap-3 mt-2">
                                <span className="text-6xl font-bold tracking-tight font-mono">{balance}</span>
                                <span className="slb-label text-base tracking-widest">Frames</span>
                            </div>
                            <p className="text-sm text-muted-foreground border-t border-border/50 pt-5 mt-4">
                                Each frame entitles your agent to exactly 1 high-speed perception frame via our secure infrastructure.
                            </p>
                        </div>
                    </div>

                    {/* Keyring Section */}
                    <div className="mb-12">
                        <div className="slb-panel slb-panel-highlight p-8">
                            <DashboardKeyring sessionToken={sessionToken} />
                        </div>
                    </div>

                    {/* OpenClaw Quick Start Section */}
                    <div className="mb-12">
                        <div className="slb-panel p-8 border-l-4 border-l-emerald-500">
                            <DashboardQuickStart sessionToken={sessionToken} />
                        </div>
                    </div>

                    {/* Purchase Frames / Settlement Section */}
                    <div className="mb-12">
                        <DashboardPurchase />
                    </div>

                    {/* Live Terminal / Benchmark Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="slb-panel p-2">
                                <Code className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="slb-header text-xl">Live Benchmark &amp; SDKs</h2>
                        </div>
                        <p className="text-muted-foreground mb-8">
                            Your session key is pre-populated. Run the benchmark below to verify your agent&apos;s zero-copy performance live on the Big Iron network.
                        </p>
                        <Terminal sessionToken={sessionToken} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
