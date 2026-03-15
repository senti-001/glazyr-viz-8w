import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { CreditManager } from "@/lib/paymaster"
import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { DashboardKeyring } from "@/components/glazyr/dashboard-keyring"
import { Database, Zap, Activity, Code } from "lucide-react"
import { Terminal } from "@/components/glazyr/terminal"

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    // Secure Zero-Trust Route Lockdown
    if (!session || !session.user) {
        redirect("/")
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
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />
            <main className="pt-32 pb-24 px-6">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            <span className="text-primary">Dashboard</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Manage your Glazyr Credits and secure compute keys for the Glazyr network.
                        </p>
                    </div>

                    <div className="mb-12">
                        {/* Live Redis Ledger Box */}
                        <div className="glass-panel p-8 rounded-2xl border border-white/5 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Database className="h-5 w-5 text-primary" />
                                    Glazyr Balance
                                </h2>
                                <span className="text-xs font-mono text-muted-foreground bg-white/5 px-3 py-1.5 rounded uppercase tracking-wider">
                                    Live Redis Ledger
                                </span>
                            </div>
                            <div className="flex items-baseline gap-3 mt-2">
                                <span className="text-6xl font-bold tracking-tight">{balance}</span>
                                <span className="text-muted-foreground uppercase text-base tracking-widest font-medium">Frames</span>
                            </div>
                            <p className="text-sm text-muted-foreground border-t border-white/5 pt-5 mt-4">
                                Each frame entitles your agent to exactly 1 high-speed perception frame via our secure infrastructure.
                            </p>
                        </div>
                    </div>

                    {/* Keyring Section */}
                    <div className="mb-12">
                        <div className="glass-panel p-8 rounded-2xl border border-primary/20 bg-primary/5 shadow-[0_0_30px_-5px_var(--primary-glow)]">
                            <DashboardKeyring sessionToken={sessionToken} />
                        </div>
                    </div>

                    {/* Live Terminal / Benchmark Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <Code className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-semibold">Live Benchmark & SDKs</h2>
                        </div>
                        <p className="text-muted-foreground mb-8">
                            Your session key is pre-populated. Run the benchmark below to verify your agent's zero-copy performance live on the Big Iron network.
                        </p>
                        <Terminal sessionToken={sessionToken} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
