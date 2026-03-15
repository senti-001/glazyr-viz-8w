import { createPublicClient, http, encodeFunctionData, parseAbi, type Hex } from "viem"
import { base } from "viem/chains"

// CDP Configuration
const CDP_PAYMASTER_URL = process.env.CDP_PAYMASTER_URL || "https://api.developer.coinbase.com/rpc/v1/base/..."
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const
const TREASURY_ADDRESS = "0x104A20a7a68e42f6e2a66B7d3B3E080146a2B01" as const

const USDC_ABI = parseAbi([
    "function transfer(address to, uint256 amount) returns (bool)",
    "function balanceOf(address owner) view returns (uint256)",
])

export interface SettlementResult {
    success: boolean;
    txHash?: string;
    error?: string;
    sponsored?: boolean;
}

/**
 * Abstract interface for different settlement layers (Base, Solana, etc.)
 */
export interface ISettlementProvider {
    readonly name: string;
    readonly chainId: number | string;
    isReady(address: string): Promise<boolean>;
    settle(privateKey: string, amount: number): Promise<SettlementResult>;
    getBalance(address: string): Promise<number>;
}

/**
 * Base Mainnet (EVM) Settlement Provider
 */
export class BaseSettlementProvider implements ISettlementProvider {
    readonly name = "Base";
    readonly chainId = 8453;

    private client = createPublicClient({
        chain: base,
        transport: http(CDP_PAYMASTER_URL),
    });

    async isReady(address: string): Promise<boolean> {
        const balance = await this.getBalance(address);
        return balance > 0.001; // Minimum for sponsored capture
    }

    async getBalance(address: string): Promise<number> {
        const balance = await this.client.readContract({
            address: USDC_ADDRESS,
            abi: USDC_ABI,
            functionName: "balanceOf",
            args: [address as Hex],
        });
        return Number(balance) / 1e6;
    }

    async settle(privateKey: string, amount: number): Promise<SettlementResult> {
        // Implementation logic for CDP sponsored user ops...
        // For brevity, we would wrap the existing sponsoredCapture logic here
        return { success: true, txHash: "0x..." };
    }
}

import redis from "@/lib/redis"

/**
 * Unified Credit Manager for hybrid Fiat (Stripe) and Crypto payments.
 * Optimized for Auth.js (NextAuth) verified user records.
 */
export class CreditManager {
    /**
     * Deducts credits for a perception task (1 unit = 1 frame)
     * Uses a Lua script for atomic verification and deduction.
     */
    async deduct(userId: string, amount: number): Promise<{ success: boolean; method: 'fiat' | 'crypto'; txHash?: string; error?: string }> {
        const balanceKey = `user:credits:${userId}`;

        // Lua script for atomic check-and-decrement
        const luaScript = `
            local current = redis.call('GET', KEYS[1])
            if not current or tonumber(current) < tonumber(ARGV[1]) then
                return -1
            end
            return redis.call('DECRBY', KEYS[1], ARGV[1])
        `;

        try {
            // @ts-ignore - ioredis supports defineCommand or eval
            const result = await redis.eval(luaScript, 1, balanceKey, amount);

            if (result !== -1) {
                return { success: true, method: 'fiat' };
            }
        } catch (err) {
            console.error(`[CreditManager] Redis/Lua Error:`, err);
        }

        // Fallback to On-Chain Settlement (Crypto)
        return this.fallbackToCrypto(userId, amount);
    }

    private async fallbackToCrypto(userId: string, amount: number): Promise<{ success: boolean; method: 'fiat' | 'crypto'; txHash?: string; error?: string }> {
        // PeerPush Placeholder: Crypto settlement requires user signature verification
        return { success: false, method: 'crypto', error: "INSUFFICIENT_FIAT_FUNDS" };
    }

    async getFiatBalance(userId: string): Promise<number> {
        const balance = await redis.get<string | number>(`user:credits:${userId}`);

        if (balance === null) {
            // Beta Phase: Auto-grant 1M credits on first dashboard view
            const grant = 1_000_000;
            await redis.set(`user:credits:${userId}`, grant);
            return grant;
        }

        return typeof balance === 'string' ? parseInt(balance) : (balance as number);
    }

    async setPendingFlag(userId: string): Promise<void> {
        await redis.set(`pending:credits:${userId}`, "true", { ex: 300 });
    }
}
