"use client"

import { useState } from "react"
import { CreditCard, Coins, ExternalLink, Zap, Shield, Check, Loader2 } from "lucide-react"
import { ethers } from "ethers"
import { useRouter } from "next/navigation"

const TIERS = [
    { name: "Enterprise", frames: "Unlimited", price: "Contact", priceNum: 0, highlight: true, badge: "SLA", desc: "Industrial-grade vision scaling." }
]

export function DashboardPurchase() {
    const router = useRouter()
    const [isPaying, setIsPaying] = useState(false)
    const [selectedTier, setSelectedTier] = useState<typeof TIERS[0] | null>(null)
    const [txStatus, setTxStatus] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(null)

    const handleOnChainPayment = async () => {
        if (!selectedTier || selectedTier.priceNum === 0) {
            setTxStatus({ message: "Please select a paid tier first.", type: 'error' });
            return;
        }

        try {
            setIsPaying(true)
            setTxStatus({ message: "Connecting to wallet...", type: 'info' })

            // @ts-ignore
            if (typeof window === 'undefined' || !window.ethereum) {
                setTxStatus({ message: "No Web3 wallet detected. Please install MetaMask.", type: 'error' })
                return
            }

            // Enforce Base Network (Chain ID 8453 = 0x2105)
            try {
                // @ts-ignore
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x2105' }],
                });
            } catch (switchError: any) {
                if (switchError.code === 4902) {
                    setTxStatus({ message: "Please manually add the Base network to your wallet to continue.", type: 'error' })
                    setIsPaying(false)
                    return
                }
                throw switchError
            }

            // @ts-ignore
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const address = await signer.getAddress()

            setTxStatus({ message: `Initiating ${selectedTier.price} USDC Payment...`, type: 'info' })

            const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
            const TREASURY_ADDRESS = "0x104A40D202d40458d8c67758ac54E93024A41B01"
            const USDC_ABI = ["function transfer(address to, uint256 amount) returns (bool)"]
            const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer)

            // Dynamic Amount Calculation
            const amount = ethers.parseUnits(selectedTier.priceNum.toString(), 6)

            setTxStatus({ message: "Requesting USDC transfer signature...", type: 'info' })
            const data = usdcContract.interface.encodeFunctionData("transfer", [TREASURY_ADDRESS, amount])

            // @ts-ignore
            const txHash = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: address,
                    to: USDC_ADDRESS,
                    data: data,
                    value: '0x0'
                }]
            })

            setTxStatus({ message: `Transaction accepted! Reconciling with backend...`, type: 'info' })

            // Reconcile transaction with the backend
            const response = await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    txHash: txHash, 
                    address: address,
                    tierFrames: parseInt(selectedTier.frames.replace(/,/g, ''))
                })
            })

            const verifyData = await response.json()
            if (verifyData.success) {
                setTxStatus({ message: `${selectedTier.frames} frames credited trustlessly!`, type: 'success' })
                router.refresh()
            } else {
                console.error("Reconciliation failed:", verifyData.debug);
                setTxStatus({ message: "Payment confirmed, but backend reconciliation failed.", type: 'error' })
            }

            setTimeout(() => setTxStatus(null), 5000)

        } catch (err: any) {
            console.error(err)
            if (err.code === "ACTION_REJECTED") {
                setTxStatus({ message: "Transaction was rejected in wallet.", type: 'error' })
            } else {
                setTxStatus({ message: err.message || "Transaction failed", type: 'error' })
            }
        } finally {
            setIsPaying(false)
        }
    }

    const handleStripePayment = async () => {
        if (!selectedTier || selectedTier.priceNum === 0) {
            setTxStatus({ message: "Please select a paid tier first.", type: 'error' });
            return;
        }

        try {
            setIsPaying(true)
            setTxStatus({ message: "Initializing secure Stripe session...", type: 'info' })

            const tierId = selectedTier.name.toLowerCase().split(' ')[0] // developer, pro, scale
            
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tierId }),
            })

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                const msg = data.details ? `${data.error}: ${data.details}` : (data.error || "Failed to create checkout session")
                throw new Error(msg)
            }
        } catch (err: any) {
            console.error("Stripe Error:", err)
            setTxStatus({ message: err.message || "Payment system unavailable. Please try again.", type: 'error' })
        } finally {
            setIsPaying(false)
        }
    }

    const selectTier = (tier: typeof TIERS[0]) => {
        if (tier.priceNum === 0) return;
        setSelectedTier(tier);
        // Smooth scroll to settlement section
        const el = document.getElementById('settlement-options');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <div className="slb-panel p-10 bg-gradient-to-br from-primary/10 to-transparent border-primary/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                <Zap className="h-24 w-24 text-primary" />
            </div>
            
            <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <span className="slb-label bg-primary/10 text-primary border-primary/20 px-3 py-1">
                        ENTERPRISE GRADUATION ACTIVE
                    </span>
                </div>
                
                <h2 className="slb-header text-3xl mb-4">
                    Scaling to B2B Infrastructure
                </h2>
                
                <p className="text-sm text-muted-foreground mb-8">
                    The 55-user beta has successfully concluded. We are now scaling exclusively as a B2B infrastructure layer, delivering 90%+ token savings for industrial LLM vision workflows.
                </p>

                <div className="slb-inset p-8 bg-primary/5 border border-primary/20 mb-8 text-center">
                    <h3 className="slb-header text-xl mb-4">Industrial Scaling & B2B Tiers</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        The consumer beta has closed. Glazyr Viz now provides exclusive high-frequency vision infrastructure for enterprise clusters. Contact our engineering team to architect your B2B token savings.
                    </p>
                    <button 
                        onClick={() => window.open("https://form.typeform.com/to/sbdm0689", "_blank")}
                        className="slb-btn slb-btn-primary px-10 py-4 text-sm font-bold uppercase tracking-widest"
                    >
                        Contact Enterprise Support
                    </button>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button 
                        onClick={() => {
                            const el = document.querySelector('.terminal-container');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="slb-btn px-8 py-3 text-sm font-bold flex items-center gap-2 border border-border/50 bg-muted/20"
                    >
                        <Zap className="h-4 w-4" />
                        Launch Vision Debugger
                    </button>
                    <a 
                        href="/technology"
                        className="slb-btn px-8 py-3 text-sm font-bold flex items-center gap-2 border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                        Review DMA Architecture
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </div>
    )
}
