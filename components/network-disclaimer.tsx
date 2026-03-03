"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NetworkDisclaimer() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has previously dismissed the banner
        const dismissed = localStorage.getItem("network-disclaimer-dismissed")
        if (!dismissed) {
            setIsVisible(true)
        }
    }, [])

    const handleDismiss = () => {
        setIsVisible(false)
        localStorage.setItem("network-disclaimer-dismissed", "true")
    }

    if (!isVisible) return null

    return (
        <div className="relative border-b border-amber-500/50 bg-black">
            <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
                <div className="flex items-start gap-3 sm:items-center">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5 sm:mt-0" />
                    <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs font-bold uppercase tracking-wider text-amber-500 sm:text-sm">
                            Network Status: Genesis Sandbox (Solana Devnet)
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-amber-100/90 sm:text-sm">
                            All $NEURAL tokens and treasury balances are currently on the Solana Devnet.
                            These represent technical validation of the Agentic Cloud architecture and have{" "}
                            <span className="font-semibold text-amber-300">no real-world monetary value</span>.
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDismiss}
                        className="h-8 w-8 shrink-0 text-amber-500 hover:bg-amber-500/10 hover:text-amber-400"
                        aria-label="Dismiss network disclaimer"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
