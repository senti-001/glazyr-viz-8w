const { Redis } = require("@upstash/redis")

// Upstash credentials
const redis = new Redis({
  url: 'https://big-oyster-39155.upstash.io',
  token: 'AZjzAAIncDE2YzlkYWRjNzI5YjQ0NDFkOWY0ZTRkNDc0NGE0YWUxMHAxMzkxNTU',
})

async function checkUserActivity() {
    try {
        console.log("[*] Querying Upstash Redis for Glazyr activity (PROD KEYS)...")
        
        // Correct keys from paymaster.ts and next-auth
        const users = await redis.keys("user:*")
        const sessionKeys = await redis.keys("session:*")
        const creditKeys = await redis.keys("user:credits:*")
        const processedTxKeys = await redis.keys("tx:processed:*")

        console.log(`[RESULTS] Total Registered Users: ${users.length}`)
        console.log(`[RESULTS] Total Credit Pools (Activation): ${creditKeys.length}`)
        console.log(`[RESULTS] Active Sessions (Logins): ${sessionKeys.length}`)
        console.log(`[RESULTS] Processed On-Chain Tx: ${processedTxKeys.length}`)

        if (creditKeys.length > 0) {
            console.log("\n[TOP 5 CREDIT POOLS]")
            for (let i = 0; i < Math.min(creditKeys.length, 5); i++) {
                const balance = await redis.get(creditKeys[i])
                console.log(` - ${creditKeys[i]}: ${balance} frames`)
            }
        }

        process.exit(0)
    } catch (err) {
        console.error("[-] Audit Failed:", err)
        process.exit(1)
    }
}

checkUserActivity()
