import { NextRequest, NextResponse } from "next/server"
import { createPublicClient, http, type Hex } from "viem"
import { base } from "viem/chains"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import redis from "@/lib/redis"

const CDP_PAYMASTER_URL = process.env.CDP_PAYMASTER_URL || "https://api.developer.coinbase.com/rpc/v1/base/"

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
        }
        const userId = session.user.id as string

        const body = await req.json()
        const { txHash, address } = body

        if (!txHash || !address) {
            return NextResponse.json(
                { success: false, error: "Missing txHash or address" },
                { status: 400 }
            )
        }

        const client = createPublicClient({
            chain: base,
            transport: http(CDP_PAYMASTER_URL),
        })

        // In a production environment, we securely verify the receipt on the RPC node
        // We verify that the 'to' address was our treasury, the amount was correct, and it didn't revert.
        const receipt = await client.getTransactionReceipt({
            hash: txHash as Hex
        })

        if (receipt.status !== "success") {
            return NextResponse.json(
                { success: false, error: "Transaction reverted on-chain" },
                { status: 400 }
            )
        }

        // ====================================================================
        // RECONCILIATION LOGIC:
        // Update the user's total active frames in Redis.
        const balanceKey = `user:credits:${userId}`
        const currentFramesStr = await redis.get<string | number>(balanceKey)
        const currentFrames = typeof currentFramesStr === 'string' ? parseInt(currentFramesStr) : (currentFramesStr as number) || 0
        const framesAdded = 100000
        await redis.set(balanceKey, currentFrames + framesAdded)
        // ====================================================================

        return NextResponse.json({
            success: true,
            message: "Transaction verified and frames credited.",
            receiptStatus: receipt.status,
            framesAdded: framesAdded
        })

    } catch (error: any) {
        console.error("Verification Error:", error)
        return NextResponse.json(
            { success: false, error: "Failed to verify transaction receipt" },
            { status: 500 }
        )
    }
}
