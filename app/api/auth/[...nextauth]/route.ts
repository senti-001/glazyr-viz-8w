import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import { Redis } from "@upstash/redis"

/**
 * NextAuth Configuration - Optimized for Magnetar Sentient L.L.C.
 * Uses Redis for session persistence and cryptographically verified user records.
 */

const redis = new Redis({
    url: process.env.REDIS_URL || "https://localhost:6379",
    token: process.env.REDIS_TOKEN || "test",
})

export const authOptions: NextAuthOptions = {
    theme: { colorScheme: "light" },
    pages: {
        signIn: "/auth/signin",
    },
    adapter: UpstashRedisAdapter(redis) as any,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        async session({ session, user }: any) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    events: {
        async createUser({ user }) {
            // Auto-grant 10,000 free Glazyr Frames on signup (Proof of Concept Tier)
            if (user.id) {
                await redis.set(`user:credits:${user.id}`, 10_000)
                console.log(`[NextAuth] New user ${user.email} granted 10,000 Glazyr Frames.`)
            }
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_dev",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
