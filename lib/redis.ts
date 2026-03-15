import { Redis } from "@upstash/redis";

/**
 * Production-ready Upstash Redis client.
 * Optimized for Next.js Serverless and Edge environments.
 */

const getRedisConfig = () => {
    const isBuild = process.env.CI === "true" || process.env.AMPLIFY_BUILD_ID;

    if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
        if (process.env.NODE_ENV === "production" && !isBuild) {
            throw new Error("REDIS_URL and REDIS_TOKEN are required in production runtime");
        }
        console.warn("⚠️ Upstash credentials missing. Using fallback for build/local environment.");
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

// Transparent Lazy Singleton Proxy
const redis = new Proxy({} as Redis, {
    get(_, prop) {
        if (!globalThis.upstashRedis) {
            globalThis.upstashRedis = redisClientSingleton();
        }
        const target = globalThis.upstashRedis as any;
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
    }
});

export default redis;
