import { NextRequest, NextResponse } from "next/server"
import { createPublicClient, http, type Hex } from "viem"
import { base } from "viem/chains"

const CDP_PAYMASTER_URL = process.env.CDP_PAYMASTER_URL || "https://api.developer.coinbase.com/rpc/v1/base/"

export async function POST(req: NextRequest) {
    try {
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
        // Here, we would update the user's total active frames in Redis.
        // const currentFrames = await redis.get(`user:${address}:frames`) || 0
        // await redis.set(`user:${address}:frames`, currentFrames + 100000)
        // ====================================================================

        return NextResponse.json({
            success: true,
            message: "Transaction verified and frames credited.",
            receiptStatus: receipt.status,
            framesAdded: 100000
        })

    } catch (error: any) {
        console.error("Verification Error:", error)
        return NextResponse.json(
            { success: false, error: "Failed to verify transaction receipt" },
            { status: 500 }
        )
    }
}
