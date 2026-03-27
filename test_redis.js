const { Redis } = require("@upstash/redis")

// Upstash credentials from .env.local
const redis = new Redis({
  url: 'https://big-oyster-39155.upstash.io',
  token: 'AZjzAAIncDE2YzlkYWRjNzI5YjQ0NDFkOWY0ZTRkNDc0NGE0YWUxMHAxMzkxNTU',
})

async function checkUserActivity() {
    try {
        console.log("[*] Querying Upstash Redis for Glazyr activity...")
        
        // NextAuth keys: user:*, session:*, account:*
        const users = await redis.keys("user:*")
        const sessions = await redis.keys("session:*")
        
        // Glazyr specific keys: frames:*, ledger:*
        const frames = await redis.keys("frames:*")
        const ledger = await redis.keys("ledger:*")

        console.log(`[RESULTS] Total Users Registered: ${users.length}`)
        console.log(`[RESULTS] Active Sessions: ${sessions.length}`)
        console.log(`[RESULTS] Frame Pools Tracked: ${frames.length}`)
        console.log(`[RESULTS] Ledger Entries: ${ledger.length}`)

        if (users.length > 0) {
            console.log("\n[RECENT USERS]")
            for (let i = 0; i < Math.min(users.length, 5); i++) {
                const userData = await redis.get(users[i])
                console.log(` - ${users[i]}: ${JSON.stringify(userData)}`)
            }
        }

        process.exit(0)
    } catch (err) {
        console.error("[-] Audit Failed:", err)
        process.exit(1)
    }
}

checkUserActivity()
