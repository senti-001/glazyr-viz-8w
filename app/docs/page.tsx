import { Navbar } from "@/components/glazyr/navbar"
import { Footer } from "@/components/glazyr/footer"
import { Terminal, Code2, BookOpen, Layers } from "lucide-react"

export default function DocsPage() {
    return (
        <div className="min-h-screen holographic-bg text-foreground font-sans">
            <Navbar />
            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 shrink-0 space-y-8">
                    <div>
                        <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                            <BookOpen className="h-4 w-4" /> Getting Started
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#introduction" className="hover:text-primary transition-colors">Introduction</a></li>
                            <li><a href="#quickstart" className="hover:text-primary transition-colors">Quickstart</a></li>
                            <li><a href="#authentication" className="hover:text-primary transition-colors">Authentication</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                            <Code2 className="h-4 w-4" /> Client SDKs
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#nodejs-sdk" className="hover:text-primary transition-colors">Node.js / TypeScript</a></li>
                            <li><a href="#python-sdk" className="hover:text-primary transition-colors">Python</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                            <Layers className="h-4 w-4" /> Advanced
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#mcp-server" className="hover:text-primary transition-colors">MCP Server Setup</a></li>
                            <li><a href="#inspector" className="hover:text-primary transition-colors">Vision Inspector</a></li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <article className="flex-1 space-y-12 max-w-3xl">
                    <section id="introduction">
                        <h1 className="slb-header text-4xl mb-4">Documentation</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Welcome to the Glazyr Viz documentation. Learn how to integrate zero-copy agentic vision into your AI workloads using our high-performance SDKs and the Model Context Protocol (MCP).
                        </p>
                    </section>

                    <section id="quickstart" className="scroll-mt-32">
                        <h2 className="slb-header text-2xl mb-4 border-b border-border/50 pb-2">Quickstart</h2>
                        <div className="slb-panel p-6 space-y-4">
                            <p className="text-muted-foreground">
                                Get your agent running in under 2 minutes. First, install the MCP server:
                            </p>
                            <div className="bg-zinc-950 text-zinc-50 rounded-md p-4 font-mono text-sm border border-zinc-800">
                                npx @glazyr/mcp-server init
                            </div>
                            <p className="text-muted-foreground">
                                Then initialize the client and run a task:
                            </p>
                            <div className="bg-zinc-950 text-zinc-50 rounded-md p-4 font-mono text-sm border border-zinc-800 whitespace-pre">
{`import { Glazyr } from '@glazyr/sdk';

const client = new Glazyr({ apiKey: 'YOUR_API_KEY' });
const result = await client.agent.run({
    url: 'https://news.ycombinator.com',
    task: 'Extract the top 3 story titles'
});

console.log(result);`}
                            </div>
                        </div>
                    </section>

                    <section id="python-sdk" className="scroll-mt-32">
                        <h2 className="slb-header text-2xl mb-4 border-b border-border/50 pb-2">Python SDK</h2>
                        <div className="slb-panel p-6 space-y-4">
                            <p className="text-muted-foreground">
                                For data science and ML workloads, use our Python SDK:
                            </p>
                            <div className="bg-zinc-950 text-zinc-50 rounded-md p-4 font-mono text-sm border border-zinc-800">
                                pip install glazyr-sdk
                            </div>
                            <div className="bg-zinc-950 text-zinc-50 rounded-md p-4 font-mono text-sm border border-zinc-800 whitespace-pre">
{`from glazyr import Glazyr

client = Glazyr(api_key="YOUR_API_KEY")

result = client.agent.run(
    url="https://news.ycombinator.com",
    task="Extract the top 3 story titles"
)

print(result)`}
                            </div>
                        </div>
                    </section>

                    <section id="inspector" className="scroll-mt-32">
                        <h2 className="slb-header text-2xl mb-4 border-b border-border/50 pb-2">Vision Inspector</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            The Glazyr Vision Inspector allows you to monitor your agent's real-time vision feed, DOM interactions, and latency metrics locally.
                        </p>
                        <div className="slb-panel p-6 bg-primary/5 border border-primary/20 flex items-start gap-4">
                            <Terminal className="h-6 w-6 text-primary shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-foreground mb-1">Live Telemetry</h4>
                                <p className="text-sm text-muted-foreground">
                                    Head over to the <a href="/dashboard/sessions" className="text-primary hover:underline">Sessions Dashboard</a> to view live active sessions directly connected to your local or remote agents.
                                </p>
                            </div>
                        </div>
                    </section>
                </article>
            </main>
            <Footer />
        </div>
    )
}
