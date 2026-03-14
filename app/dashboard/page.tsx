import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { CreditManager } from "@/lib/paymaster"
import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { DashboardKeyring } from "@/components/glazyr/dashboard-keyring"
import { Database, Zap, Activity } from "lucide-react"

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
                            Developer <span className="text-primary">Dashboard</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Manage your Glazyr Credits and secure compute keys for the Glazyr network.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Live Redis Ledger Box */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Database className="h-5 w-5 text-primary" />
                                    Glazyr Balance
                                </h2>
                                <span className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">
                                    LIVE REDIS LEDGER
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold tracking-tight">{balance}</span>
                                <span className="text-muted-foreground uppercase text-sm tracking-widest">Credits</span>
                            </div>
                            <p className="text-sm text-muted-foreground border-t border-white/5 pt-4 mt-2">
                                Each credit entitles your agent to exactly 1 high-speed perception frame via our secure infrastructure.
                            </p>
                        </div>

                        {/* Awaiting Telemetry Box */}
                        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4 relative overflow-hidden">
                            <div className="flex items-center justify-between z-10">
                                <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground/50">
                                    <Activity className="h-5 w-5 text-muted-foreground" />
                                    Usage & Savings
                                </h2>
                                <span className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded z-10">
                                    AWAITING CONNECTION...
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2 z-10 opacity-50">
                                <span className="text-5xl font-bold tracking-tight">0</span>
                                <span className="text-muted-foreground uppercase text-sm tracking-widest">Tokens Saved</span>
                            </div>
                            <p className="text-sm text-muted-foreground border-t border-white/5 pt-4 mt-2 z-10 opacity-50">
                                Connect an active agent session to begin tracking your real-time usage and token savings.
                            </p>
                            <div className="absolute -inset-2 bg-gradient-to-tr from-transparent via-primary/5 to-transparent blur-3xl z-0 pointer-events-none" />
                        </div>
                    </div>

                    {/* Keyring Section */}
                    <div className="glass-panel p-8 rounded-2xl border border-primary/20 bg-primary/5 shadow-[0_0_30px_-5px_var(--primary-glow)]">
                        <DashboardKeyring sessionToken={sessionToken} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
