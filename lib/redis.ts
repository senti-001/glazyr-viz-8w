import { Redis } from "@upstash/redis";

/**
 * Production-ready Upstash Redis client.
 * Optimized for Next.js Serverless and Edge environments.
 */

const getRedisConfig = () => {
    if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
        if (process.env.NODE_ENV === "production") {
            throw new Error("REDIS_URL and REDIS_TOKEN are required in production");
        }
        console.warn("⚠️ Upstash credentials missing, falling back to empty config for local build");
        return { url: "https://localhost", token: "test" };
    }
    return {
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN
    };
};

const redisClientSingleton = () => {
    return new Redis(getRedisConfig());
};

declare global {
    var upstashRedis: undefined | ReturnType<typeof redisClientSingleton>;
}

const redis = globalThis.upstashRedis ?? redisClientSingleton();

export default redis;

if (process.env.NODE_ENV !== "production") globalThis.upstashRedis = redis;
