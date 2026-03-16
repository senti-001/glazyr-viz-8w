import { Redis as UpstashRedis } from "@upstash/redis";
import IoRedis from "ioredis";
import fs from "fs";
import path from "path";

/**
 * File-system based Redis Mock for Zero-Dependency development.
 * Stored in .glazyr_ledger.json in the project root.
 */
class FileSystemRedisMock {
    private cachePath: string;
    private data: Record<string, any> = {};

    constructor() {
        this.cachePath = path.join(process.cwd(), ".glazyr_ledger.json");
        this.load();
    }

    private load() {
        try {
            if (fs.existsSync(this.cachePath)) {
                this.data = JSON.parse(fs.readFileSync(this.cachePath, 'utf8'));
            }
        } catch (e) { console.error("Mock load error:", e); }
    }

    private save() {
        try {
            fs.writeFileSync(this.cachePath, JSON.stringify(this.data, null, 2));
        } catch (e) { console.error("Mock save error:", e); }
    }

    async get(key: string) { return this.data[key] ?? null; }
    async set(key: string, value: any, options?: any) {
        this.data[key] = value;
        this.save();
        return "OK";
    }
    async ping() { return "PONG (Mock)"; }
    async eval(script: string, numKeys: number, ...args: any[]) {
        // Basic deduction mock for CreditManager
        if (script.includes("DECRBY")) {
            const key = args[0];
            const amount = parseInt(args[1]);
            const current = parseInt(this.data[key] || "0");
            if (current < amount) return -1;
            this.data[key] = current - amount;
            this.save();
            return this.data[key];
        }
        return null;
    }
}

const redisClientSingleton = () => {
    const isBuild = process.env.CI === "true" || process.env.AMPLIFY_BUILD_ID;
    const hasUpstash = process.env.REDIS_URL && process.env.REDIS_TOKEN;

    // 1. Managed Cloud Redis (Upstash) - The "Public" Migration
    if (process.env.NODE_ENV === "production" || isBuild || hasUpstash) {
        if (!hasUpstash && !isBuild) {
            console.warn("⚠️ Upstash credentials missing. Falling back to Mock.");
            return new FileSystemRedisMock();
        }
        return new UpstashRedis({
            url: process.env.REDIS_URL || "",
            token: process.env.REDIS_TOKEN || ""
        });
    }

    // 2. Local Environment Check
    const useLocalTcp = process.env.LOCAL_REDIS_URL || process.env.USE_LOCAL_REDIS === "true";
    if (useLocalTcp) {
        console.log("🔌 Using local ioredis client (TCP)");
        return new IoRedis(process.env.LOCAL_REDIS_URL || "redis://localhost:6379");
    }

    // 3. Final Fallback: Zero-Dependency FileSystem Mock
    console.log("📂 Using Zero-Dependency FileSystem Ledger (.glazyr_ledger.json)");
    return new FileSystemRedisMock();
};

declare global {
    var redisInstance: undefined | any;
}

// Transparent Lazy Singleton Proxy
const redis = new Proxy({} as any, {
    get(_, prop) {
        if (!globalThis.redisInstance) {
            globalThis.redisInstance = redisClientSingleton();
        }
        const target = globalThis.redisInstance as any;
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
    }
});

export default redis;
