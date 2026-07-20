export default function DashboardLoading() {
    return (
        <div className="min-h-screen holographic-bg text-foreground font-sans">
            <div className="border-b border-border/50 bg-background/50 backdrop-blur-md h-16 w-full fixed top-0 z-50"></div>
            <main className="pt-32 pb-24 px-6">
                <div className="mx-auto max-w-4xl space-y-12 animate-pulse">
                    {/* Header Skeleton */}
                    <div>
                        <div className="h-10 bg-primary/10 rounded-md w-1/3 mb-4"></div>
                        <div className="h-6 bg-primary/5 rounded-md w-1/2"></div>
                    </div>

                    {/* Ledger Box Skeleton */}
                    <div className="slb-panel p-8 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="h-6 bg-primary/10 rounded-md w-1/4"></div>
                            <div className="h-8 bg-emerald-500/10 rounded-md w-32"></div>
                        </div>
                        <div className="h-16 bg-primary/5 rounded-md w-1/3 mt-2"></div>
                        <div className="h-4 bg-primary/10 rounded-md w-full mt-4"></div>
                    </div>

                    {/* Keyring Skeleton */}
                    <div className="slb-panel slb-panel-highlight p-8 space-y-4">
                        <div className="h-6 bg-primary/10 rounded-md w-1/4"></div>
                        <div className="h-12 bg-primary/5 rounded-md w-full"></div>
                    </div>

                    {/* Quickstart Skeleton */}
                    <div className="slb-panel p-8 border-l-4 border-l-emerald-500/20 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10"></div>
                            <div className="space-y-2">
                                <div className="h-6 bg-primary/10 rounded-md w-48"></div>
                                <div className="h-4 bg-primary/5 rounded-md w-64"></div>
                            </div>
                        </div>
                        <div className="h-24 bg-primary/5 rounded-md w-full"></div>
                    </div>
                </div>
            </main>
        </div>
    )
}
