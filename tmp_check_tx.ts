import { createPublicClient, http, type Hex } from "viem"
import { base } from "viem/chains"
import { Redis } from "@upstash/redis"

const txHash = "0x8f4eda611abcb2a31416b2836603238a630f8c8ce2680c1c73ee0e9"
// Trying a more reliable public RPC
const rpcUrl = "https://mainnet.base.org"

// Upstash Config fallback as per lib/redis.ts
const redisUrl = "https://localhost"
const redisToken = "test"

async function diag() {
    console.log("--- BASE RPC DIAGNOSTIC ---")
    try {
        const client = createPublicClient({
            chain: base,
            transport: http(rpcUrl),
        })
        console.log(`Checking transaction: ${txHash} on ${rpcUrl}`)
        const receipt = await client.getTransactionReceipt({ hash: txHash as Hex })
        console.log("✅ Receipt found!")
        console.log(`   Status: ${receipt.status}`)
        console.log(`   From: ${receipt.from}`)
        console.log(`   To: ${receipt.to}`)
    } catch (e: any) {
        console.error(`❌ RPC Error: ${e.message}`)
    }

    console.log("\n--- REDIS DIAGNOSTIC ---")
    try {
        const redis = new Redis({ url: redisUrl, token: redisToken })
        console.log(`Checking Redis at ${redisUrl}`)
        const ping = await redis.ping()
        console.log(`✅ Redis Ping: ${ping}`)
    } catch (e: any) {
        console.error(`❌ Redis Error: ${e.message}`)
    }
}

diag()
