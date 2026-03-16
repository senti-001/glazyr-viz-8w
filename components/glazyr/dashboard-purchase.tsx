"use client"

import { useState } from "react"
import { CreditCard, Coins, ExternalLink, Zap, Shield, Check, Loader2 } from "lucide-react"
import { ethers } from "ethers"
import { useRouter } from "next/navigation"

const TIERS = [
    { name: "Starter", frames: "10,000", price: "Free", highlight: false, badge: "Included", desc: "Perfect for testing and prototyping." },
    { name: "Developer", frames: "100,000", price: "$3", highlight: true, badge: "Most Popular", desc: "Ship production agents at scale." },
    { name: "Professional", frames: "500,000", price: "$15", highlight: false, badge: "Best Value", desc: "Enterprise-grade throughput." },
]

export function DashboardPurchase() {
    const router = useRouter()
    const [isPaying, setIsPaying] = useState(false)
    const [txStatus, setTxStatus] = useState<{ message: string; type: 'info' | 'success' | 'error' } | null>(null)

    const handleOnChainPayment = async () => {
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
                // This error code indicates that the chain has not been added to MetaMask.
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

            setTxStatus({ message: "Confirm transaction in your wallet...", type: 'info' })

            // Base USDC Contract ABI (ERC20 Transfer)
            const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
            const TREASURY_ADDRESS = "0x104A40D202d40458d8c67758ac54E93024A41B01"
            const USDC_ABI = ["function transfer(address to, uint256 amount) returns (bool)"]
            const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer)

            // The user requested: "get a payment sent sown for lets say 3 from and to our same acct"
            // Sending 3 USDC (USDC has 6 decimals, so 3 * 10^6 base units) back to the same address
            const amount = ethers.parseUnits("3", 6)

            setTxStatus({ message: "Requesting USDC transfer signature...", type: 'info' })
            // Bypass Ethers.js transaction parsing bugs (nonce undefined) by sending raw RPC payload
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

            setTxStatus({ message: `Transaction accepted by wallet! Reconciling with backend...`, type: 'info' })

            // Reconcile transaction with the backend (Approach 2: Cryptographic Proof)
            const response = await fetch("/api/verify-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ txHash: txHash, address: address })
            })

            const verifyData = await response.json()
            if (verifyData.success) {
                setTxStatus({ message: "Reconciliation successful. Frames credited!", type: 'success' })
                router.refresh()
            } else {
                setTxStatus({ message: "Payment confirmed, but backend reconciliation failed.", type: 'error' })
            }

            // Clear success message after 5 seconds
            setTimeout(() => setTxStatus(null), 5000)

        } catch (err: any) {
            console.error(err)
            // Handle user rejection gracefully
            if (err.code === "ACTION_REJECTED") {
                setTxStatus({ message: "Transaction was rejected in wallet.", type: 'error' })
            } else {
                setTxStatus({ message: err.message || "Transaction failed", type: 'error' })
            }
        } finally {
            setIsPaying(false)
        }
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

            {/* Tier Cards — SLB Panels */}
            <div className="grid md:grid-cols-3 gap-4">
                {TIERS.map(tier => (
                    <div
                        key={tier.name}
                        className={`relative slb-panel p-6 transition-all ${tier.highlight ? 'slb-panel-highlight' : ''}`}
                    >
                        {tier.highlight && (
                            <span className="absolute -top-3 left-4 slb-label text-primary bg-background border border-primary/50 px-3 py-1 z-10 shadow-sm">
                                {tier.badge}
                            </span>
                        )}
                        <div className="mb-4 pt-1">
                            <h3 className="slb-header text-lg text-foreground">{tier.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{tier.desc}</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-3xl font-bold tracking-tight text-foreground font-mono">{tier.price}</span>
                            {tier.price !== "Free" && <span className="text-sm text-muted-foreground">USD</span>}
                        </div>
                        <p className="text-sm text-primary font-mono font-medium mb-4">{tier.frames} frames</p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                Zero-copy vision pipeline
                            </li>
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                GCP Big Iron compute
                            </li>
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                Cloud-isolated security
                            </li>
                        </ul>
                        <button
                            className={`w-full py-2.5 text-sm font-semibold transition-all ${tier.highlight
                                ? 'slb-btn slb-btn-primary'
                                : 'slb-btn'
                                }`}
                        >
                            {tier.price === "Free" ? "Current Tier" : "Purchase"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Settlement Methods — SLB Panel */}
            <div className="slb-panel p-8">
                <h3 className="slb-header text-foreground mb-2">Settlement Options</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Choose how you&apos;d like to pay. Both methods credit your account instantly.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Stripe */}
                    <div className="slb-inset p-6 hover:border-primary transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="slb-panel p-2" style={{ boxShadow: 'none' }}>
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
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <CreditCard className="h-3 w-3 text-violet-600 dark:text-violet-400 shrink-0" />
                                Visa, Mastercard, Amex, ACH
                            </li>
                        </ul>
                        <button className="w-full slb-btn slb-btn-stripe py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
                            Pay with Stripe
                            <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    {/* On-Chain */}
                    <div className="slb-inset p-6 hover:border-primary transition-all">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="slb-panel p-2" style={{ boxShadow: 'none' }}>
                                <Coins className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm">On-Chain (USDC / SOL)</h4>
                                <p className="text-xs text-muted-foreground">Settle directly on Solana or Base mainnet</p>
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
                            <li className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Coins className="h-3 w-3 text-amber-600 dark:text-amber-400 shrink-0" />
                                USDC or ETH accepted
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
                            {isPaying ? 'Processing...' : 'Pay On-Chain'}
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
