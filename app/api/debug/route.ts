import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
    const env = {
        NODE_ENV: process.env.NODE_ENV,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
        GITHUB_ID: process.env.GITHUB_ID ? "PRESENT" : "MISSING",
        GITHUB_SECRET: process.env.GITHUB_SECRET ? "PRESENT" : "MISSING",
        GOOGLE_ID: process.env.GOOGLE_ID ? "PRESENT" : "MISSING",
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "PRESENT" : "MISSING",
        REDIS_URL: process.env.REDIS_URL ? "PRESENT" : "MISSING",
        AMPLIFY_BUILD_ID: process.env.AMPLIFY_BUILD_ID || "NOT_IN_AMPLIFY",
    };

    let redisStatus = "Unknown";
    try {
        const ping = await redis.ping();
        redisStatus = `Connected: ${ping}`;
    } catch (e: any) {
        redisStatus = `Error: ${e.message}`;
    }

    return NextResponse.json({
        message: "Glazyr Viz Production Debug Info",
        timestamp: new Date().toISOString(),
        env,
        redisStatus
    });
}
