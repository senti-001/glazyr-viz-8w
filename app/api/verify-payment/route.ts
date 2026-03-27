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

        // BETA FREE BYPASS (REPLACING TRUSTLESS RECONCILIATION)
        console.log(`[VerifyApi] 🧪 BETA_FREE Mode: Pre-verifying ${userId} for frames.`);
        return NextResponse.json({
            success: true,
            message: "GLAZYR BETA: Free frames credited automatically.",
            txHash: txHash,
            framesAdded: providedTierFrames || 1000000 
        })

        /* Original On-Chain Reconciliation (Disabled for Beta)
        const creditManager = new CreditManager()
        ...
        */

    } catch (error: any) {
        console.error("Verification Error:", error)
        return NextResponse.json(
            { success: false, error: "Failed to verify transaction receipt" },
            { status: 500 }
        )
    }
}
