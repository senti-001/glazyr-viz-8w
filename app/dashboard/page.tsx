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
                        <div className="flex items-center gap-2 mb-2">
                            <span className="slb-label bg-primary/10 text-primary border-primary/20 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                                System State: Beta Free
                            </span>
                        </div>
                        <h1 className="slb-header text-3xl md:text-5xl tracking-tight mb-4">
                             Glazyr <span className="text-primary">Network</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Developer Dashboard & Zero-Copy Vision Infrastructure. All payment gates are currently bypassed.
                        </p>
                    </div>

                    {/* Live Redis Ledger Box */}
                    <div className="mb-12">
                        <div className="slb-panel p-8 flex flex-col gap-4 bg-gradient-to-r from-card to-primary/5">
                            <div className="flex items-center justify-between">
                                <h2 className="slb-header text-xl flex items-center gap-2">
                                    <Database className="h-5 w-5 text-primary" />
                                    Complimentary Vision Frames
                                </h2>
                                <span className="slb-label bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1.5 font-bold">
                                    FEES WAIVED
                                </span>
                            </div>
                            <div className="flex items-baseline gap-3 mt-2">
                                <span className="text-6xl font-bold tracking-tight font-mono">1,000,000</span>
                                <span className="slb-label text-base tracking-widest">+ {balance} Base</span>
                            </div>
                            <p className="text-sm text-muted-foreground border-t border-border/50 pt-5 mt-4">
                                During the Beta Free period, every session is granted 1,000,000 frames for high-frequency benchmarks. Your Base balance remains available for legacy verification.
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
                    <div id="purchase" className="mb-12">
                        <DashboardPurchase />
                    </div>

                    {/* Live Terminal / Benchmark Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="slb-panel p-2">
                                <Code className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="slb-header text-xl">Developer Tools &amp; SDKs</h2>
                        </div>
                        <p className="text-muted-foreground mb-8">
                            Your session key is pre-populated. Launch the MCP Inspector below to visually verify your agent&apos;s zero-copy performance live on the Big Iron network.
                        </p>
                        <Terminal sessionToken={sessionToken} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
