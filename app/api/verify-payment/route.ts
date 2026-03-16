import { NextRequest, NextResponse } from "next/server"
import { createPublicClient, http, type Hex } from "viem"
import { base } from "viem/chains"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import redis from "@/lib/redis"
import { CreditManager } from "@/lib/paymaster"

const CDP_PAYMASTER_URL = process.env.CDP_PAYMASTER_URL || "https://mainnet.base.org"

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }
        const userId = session.user.id as string

        const body = await req.json()
        const { txHash, address, tierFrames: providedTierFrames } = body

        if (!txHash || !address) {
            return NextResponse.json(
                { success: false, error: "Missing txHash or address" },
                { status: 400 }
            )
        }

        // ====================================================================
        // TRUSTLESS RECONCILIATION LOGIC (V1 HARDENED):
        // We use the fast-path receipt fetching for the provided txHash, which bypasses public RPC lag/503 limits.
        const creditManager = new CreditManager()
        const tierFrames = providedTierFrames || 100000 // Default to Developer tier if not provided
        const reconciliation = await creditManager.reconcileOnChain(userId, address, tierFrames, txHash)

        if (reconciliation.success) {
            console.log(`[VerifyApi] ✅ Success for ${userId}: ${reconciliation.txHash}`);
            return NextResponse.json({
                success: true,
                message: "Transaction verified trustlessly and frames credited.",
                txHash: reconciliation.txHash,
                framesAdded: reconciliation.framesAdded
            })
        }
        
        console.warn(`[VerifyApi] ❌ Reconciliation failed for ${userId} at ${address}. Details:`, reconciliation);
        // ====================================================================

        return NextResponse.json({
            success: false,
            error: "On-chain transaction not found or already processed. Please wait valid block confirmation.",
            debug: reconciliation // Expose reconciliation state for live debugging
        }, { status: 400 })

    } catch (error: any) {
        console.error("Verification Error:", error)
        return NextResponse.json(
            { success: false, error: "Failed to verify transaction receipt" },
            { status: 500 }
        )
    }
}
