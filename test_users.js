const { Redis } = require("@upstash/redis")

const redis = new Redis({
  url: 'https://big-oyster-39155.upstash.io',
  token: 'AZjzAAIncDE2YzlkYWRjNzI5YjQ0NDFkOWY0ZTRkNDc0NGE0YWUxMHAxMzkxNTU',
})

async function detailUsers() {
    try {
        const users = await redis.keys("user:*")
        console.log(`[RESULTS] Total Users: ${users.length}\n`)
        
        let recentFound = 0
        for (const key of users) {
             const user = await redis.get(key)
             // Check if user has an email or name to show we have real data
             if (user && (user.email || user.name)) {
                 recentFound++
                 if (recentFound <= 10) {
                     console.log(` - ${user.name || 'Anon'} (${user.email || 'no-email'})`)
                 }
             }
        }
        process.exit(0)
    } catch (err) {
        process.exit(1)
    }
}
detailUsers()
