"use client"

import { useState } from "react"
import { CreditCard, Coins, ExternalLink, Zap, Shield, Check, Loader2 } from "lucide-react"
import { ethers } from "ethers"
import { useRouter } from "next/navigation"

const TIERS = [
    { name: "Starter", frames: "5,000", price: "Free", priceNum: 0, highlight: false, badge: "Included", desc: "Perfect for testing and prototyping." },
    { name: "Developer", frames: "100,000", price: "$3", priceNum: 3, highlight: true, badge: "Most Popular", desc: "The Alpha Standard for active agents." },
    { name: "Pro", frames: "300,000", price: "$9", priceNum: 9, highlight: false, badge: "Heavy Usage", desc: "For high-frequency vision benchmarks." },
    { name: "Scale", frames: "1,000,000", price: "$15", priceNum: 15, highlight: false, badge: "Enterprise", desc: "Production-grade autonomous agents." },
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

    const selectTier = (tier: typeof TIERS[0]) => {
        if (tier.priceNum === 0) return;
        setSelectedTier(tier);
        // Smooth scroll to settlement section
        const el = document.getElementById('settlement-options');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="slb-header text-xl text-foreground mb-2">Purchase Frames</h2>
                <p className="text-sm text-muted-foreground">
                    Each frame = 1 perception cycle (navigate, click, extract, etc). Choose your settlement method below.
                </p>
            </div>

            {/* Tier Cards — Step 1 */}
            <div className="grid md:grid-cols-4 gap-4">
                {TIERS.map(tier => (
                    <div
                        key={tier.name}
                        onClick={() => selectTier(tier)}
                        className={`relative slb-panel p-5 transition-all cursor-pointer group ${
                            selectedTier?.name === tier.name ? 'border-primary ring-1 ring-primary/50 bg-primary/5' : 
                            tier.highlight ? 'slb-panel-highlight' : 'hover:border-primary/50'
                        }`}
                    >
                        {(tier.highlight || selectedTier?.name === tier.name) && (
                            <span className="absolute -top-3 left-4 slb-label text-primary bg-background border border-primary/50 px-3 py-1 z-10 shadow-sm">
                                {selectedTier?.name === tier.name ? 'Selected' : tier.badge}
                            </span>
                        )}
                        <div className="mb-4 pt-1">
                            <h3 className="slb-header text-lg text-foreground">{tier.name}</h3>
                            <p className="text-[10px] leading-tight text-muted-foreground mt-1 h-8">{tier.desc}</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-2xl font-bold tracking-tight text-foreground font-mono">{tier.price}</span>
                            {tier.price !== "Free" && <span className="text-sm text-muted-foreground uppercase">USD</span>}
                        </div>
                        <p className="text-sm text-primary font-mono font-medium mb-4">{tier.frames} frames</p>
                        <button
                            className={`w-full py-2 text-xs font-semibold transition-all ${
                                selectedTier?.name === tier.name || tier.highlight
                                ? 'slb-btn slb-btn-primary'
                                : 'slb-btn'
                            }`}
                        >
                            {tier.price === "Free" ? "Active Tier" : selectedTier?.name === tier.name ? "Proceed ↓" : "Select"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Settlement Methods — Step 2 */}
            <div id="settlement-options" className={`slb-panel p-8 transition-all duration-500 ${!selectedTier ? 'opacity-50 grayscale pointer-events-none scale-[0.98]' : 'opacity-100'}`}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="slb-header text-foreground mb-1">Settlement Options</h3>
                        <p className="text-sm text-muted-foreground">
                            {selectedTier ? `Confirm check-out for ${selectedTier.name} (${selectedTier.frames} Frames)` : "Select a tier above to unlock payment methods."}
                        </p>
                    </div>
                    {selectedTier && (
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Amount</p>
                            <p className="text-2xl font-bold font-mono text-primary text-glow">{selectedTier.price} USDC</p>
                        </div>
                    )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Stripe */}
                    <div className="slb-inset p-6 hover:border-primary transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="slb-panel p-2 group-hover:bg-primary/10 transition-colors" style={{ boxShadow: 'none' }}>
                                <CreditCard className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm">Stripe (Card / ACH)</h4>
                                <p className="text-xs text-muted-foreground">Instant settlement via credit card or bank</p>
                            </div>
                        </div>
                        <ul className="space-y-1.5 mb-5">
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Shield className="h-3 w-3 text-violet-600 dark:text-violet-400 shrink-0" />
                                PCI-compliant checkout
                            </li>
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Zap className="h-3 w-3 text-violet-600 dark:text-violet-400 shrink-0" />
                                Frames credited in &lt;5 seconds
                            </li>
                        </ul>
                        <button className="w-full slb-btn slb-btn-stripe py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
                            Pay with Stripe
                            <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    {/* On-Chain */}
                    <div className="slb-inset p-6 hover:border-primary transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="slb-panel p-2 group-hover:bg-primary/10 transition-colors" style={{ boxShadow: 'none' }}>
                                <Coins className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm">On-Chain (USDC / SOL)</h4>
                                <p className="text-xs text-muted-foreground">Settle directly on Base mainnet</p>
                            </div>
                        </div>
                        <ul className="space-y-1.5 mb-5">
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Shield className="h-3 w-3 text-amber-600 dark:text-amber-400 shrink-0" />
                                Non-custodial — you sign the tx
                            </li>
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Zap className="h-3 w-3 text-amber-600 dark:text-amber-400 shrink-0" />
                                Confirmed in ~400ms
                            </li>
                        </ul>
                        <button
                            onClick={handleOnChainPayment}
                            disabled={isPaying}
                            className={`w-full slb-btn slb-btn-chain py-2.5 text-sm font-semibold flex items-center justify-center gap-2 ${isPaying ? 'opacity-80 cursor-wait' : ''}`}
                        >
                            {isPaying ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : null}
                            {isPaying ? 'Processing...' : `Pay On-Chain`}
                            {!isPaying && <ExternalLink className="h-3.5 w-3.5" />}
                        </button>

                        {txStatus && (
                            <div className={`mt-4 p-3 slb-inset border text-xs font-mono break-words ${txStatus.type === 'error' ? 'text-red-500 border-red-500/20 bg-red-500/5' :
                                txStatus.type === 'success' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' :
                                    'text-primary border-primary/20 bg-primary/5'
                                }`}>
                                {txStatus.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
