import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { VisionInspector } from "@/components/glazyr/vision-inspector"
import { MonitorPlay } from "lucide-react"

export default async function SessionsPage() {
    const session = await getServerSession(authOptions)

    // Secure Zero-Trust Route Lockdown
    if (!session || !session.user) {
        redirect("/auth/signin")
    }

    return (
        <div className="min-h-screen holographic-bg text-foreground font-sans">
            <Navbar />
            <main className="pt-32 pb-24 px-6">
                <div className="mx-auto max-w-5xl">
                    {/* Dashboard Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <MonitorPlay className="h-8 w-8 text-primary" />
                            <h1 className="slb-header text-3xl md:text-5xl tracking-tight">
                                Live <span className="text-primary">Sessions</span>
                            </h1>
                        </div>
                        <p className="text-muted-foreground text-lg">
                            Monitor your local Glazyr Vision agents in real-time. Connect to your local MCP server to view the zero-copy vision buffer and DOM event stream.
                        </p>
                    </div>

                    <VisionInspector />
                </div>
            </main>
            <Footer />
        </div>
    )
}
