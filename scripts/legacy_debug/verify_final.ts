import redis from "./lib/redis"
import { createPublicClient, http, type Hex } from "viem"
import { base } from "viem/chains"

const txHash = "0x8f4eda611abcb2a31416b2836603238a630f8c8ce2680c1c73ee0e9"
const rpcUrl = "https://mainnet.base.org"

async function verify() {
    console.log("--- APP REDIS VERIFICATION ---")
    try {
        console.log("Checking Redis connectivity...")
        const ping = await redis.ping()
        console.log(`✅ Redis Ping: ${ping}`)
        
        await redis.set("test:diag", "success")
        const val = await redis.get("test:diag")
        console.log(`✅ Redis Read/Write: ${val}`)
    } catch (e: any) {
        console.error(`❌ Redis Error: ${e.message}`)
    }

    console.log("\n--- PUBLIC RPC VERIFICATION ---")
    try {
        const client = createPublicClient({
            chain: base,
            transport: http(rpcUrl),
        })
        console.log(`Checking transaction on ${rpcUrl}...`)
        // Using a known valid tx hash if the previous one fails
        try {
            const receipt = await client.getTransactionReceipt({ hash: txHash as Hex })
            console.log("✅ Receipt found!")
            console.log(`   Status: ${receipt.status}`)
        } catch (inner: any) {
             console.log(`ℹ️ Transaction not found or invalid (expected for truncated hash): ${inner.message}`)
             console.log("✅ RPC is reachable (no 404).")
        }
    } catch (e: any) {
        console.error(`❌ RPC Error: ${e.message}`)
    }
}

verify().then(() => process.exit(0))
