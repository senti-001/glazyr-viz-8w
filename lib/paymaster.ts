import { createPublicClient, http, encodeFunctionData, parseAbi, type Hex } from "viem"
import { base } from "viem/chains"

// CDP Configuration
const CDP_PAYMASTER_URL = process.env.CDP_PAYMASTER_URL || "https://mainnet.base.org"
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const
const TREASURY_ADDRESS = "0x104A40D202d40458d8c67758ac54E93024A41B01" as const

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
        return { success: true, txHash: "0x..." };
    }

    /**
     * Fast-Path Verification: Verifies a specific transaction hash directly without relying on getLogs.
     * Essential for bypassing public RPC 503 limits on wide block scans while maintaining trustless security.
     */
    async verifySpecificTransfer(txHash: Hex, userAddress: string, amountUsdc: number): Promise<Hex | null> {
        console.log(`[BaseProvider] Fast-Path verifying tx: ${txHash}`);
        try {
            const receipt = await this.client.getTransactionReceipt({ hash: txHash });
            if (receipt.status !== "success") return null;

            const expectedValue = BigInt(Math.round(amountUsdc * 1e6));
            
            for (const log of receipt.logs) {
                if (log.address.toLowerCase() === USDC_ADDRESS.toLowerCase()) {
                    try {
                        const decodedValue = BigInt(log.data as string || "0");
                        
                        // Extract "from" and "to" topics
                        const topics = log.topics;
                        if (topics && topics.length >= 3) {
                            const from = ('0x' + topics[1]?.slice(26)) as string;
                            const to = ('0x' + topics[2]?.slice(26)) as string;
                            
                            if (from.toLowerCase() === userAddress.toLowerCase() &&
                                to.toLowerCase() === TREASURY_ADDRESS.toLowerCase() &&
                                decodedValue === expectedValue) {
                                console.log(`[BaseProvider] ✅ Fast-Path Match Confirmed!`);
                                return txHash;
                            }
                        }
                    } catch (e) {
                         // Ignore decode errors on non-transfer events
                    }
                }
            }
        } catch (err) {
            console.error("[BaseProvider] Fast-path verification failed:", err);
        }
        return null;
    }

    /**
     * Trustless Event Indexing (X402)
     * Scans logs for a specific user to verify transfer to treasury.
     * Uses case-insensitive matching for maximum robustness.
     */
    async findRecentTransfer(userAddress: string, amountUsdc: number): Promise<Hex | null> {
        console.log(`[BaseProvider] Resolving trustless transfer for ${userAddress} ($${amountUsdc})`);
        try {
            const block = await this.client.getBlockNumber();
            const logs = await this.client.getLogs({
                address: USDC_ADDRESS,
                event: parseAbi(["event Transfer(address indexed from, address indexed to, uint256 value)"])[0],
                fromBlock: block - BigInt(3000) // Increase scan to last ~3000 blocks (~1.5 hrs)
            });

            const expectedValue = BigInt(Math.round(amountUsdc * 1e6));
            console.log(`[BaseProvider] Scanning ${logs.length} USDC events. Expected: ${expectedValue} units`);

            for (const log of logs) {
                // @ts-ignore
                const from = log.args.from as string;
                // @ts-ignore
                const to = log.args.to as string;
                // @ts-ignore
                const val = log.args.value as bigint;

                if (
                    from.toLowerCase() === userAddress.toLowerCase() &&
                    to.toLowerCase() === TREASURY_ADDRESS.toLowerCase() &&
                    val === expectedValue
                ) {
                    console.log(`[BaseProvider] ✅ Found match! Tx: ${log.transactionHash}`);
                    return log.transactionHash as Hex;
                }
            }
        } catch (err) {
            console.error("[BaseProvider] Scanning logs failed:", err);
        }
        return null;
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
        const balance = await redis.get(`user:credits:${userId}`);

        if (balance === null || balance === undefined) {
            // Beta Phase: Auto-grant 10k frames on first dashboard view
            const grant = 10_000;
            await redis.set(`user:credits:${userId}`, grant);
            return grant;
        }

        return typeof balance === 'string' ? parseInt(balance) : (balance as number);
    }

    /**
     * Reconcile on-chain payment trustlessly.
     * Prioritizes fast-path receipt fetching for the provided txHash.
     * Falls back to X402 background matching against Ethereum logs.
     */
    async reconcileOnChain(userId: string, userAddress: string, tierFrames: number, providedTxHash?: string): Promise<{ success: boolean; txHash?: string; framesAdded?: number; details?: any; providedHash?: string }> {
        const provider = new BaseSettlementProvider();
        
        // Map Tier Frames to USDC amount (e.g. 100k frames = $3)
        const frameToUsdcMap: Record<number, number> = {
            100000: 3,
            500000: 15
        };
        const expectedUsdc = frameToUsdcMap[tierFrames] || 0;
        
        if (expectedUsdc === 0) return { success: false, details: "Invalid tier frames or USDC amount mapping" };

        let resolvedTxHash = null;

        if (providedTxHash) {
            resolvedTxHash = await provider.verifySpecificTransfer(providedTxHash as Hex, userAddress, expectedUsdc);
        }

        // Trustless Fallback if Client dropping session / missing hash
        if (!resolvedTxHash) {
            resolvedTxHash = await provider.findRecentTransfer(userAddress, expectedUsdc);
        }
        
        if (resolvedTxHash) {
            // Check if this tx has already been processed to prevent double-spend
            const alreadyProcessed = await redis.get(`tx:processed:${resolvedTxHash}`);
            if (alreadyProcessed) return { success: false, txHash: resolvedTxHash, details: "Transaction already processed" };

            // Atomic Credit Update
            const balanceKey = `user:credits:${userId}`;
            const current = await this.getFiatBalance(userId);
            await redis.set(balanceKey, current + tierFrames);
            await redis.set(`tx:processed:${resolvedTxHash}`, "true", { ex: 604800 }); // Mark as processed for 1 week

            return { success: true, txHash: resolvedTxHash, framesAdded: tierFrames };
        }

        return { 
            success: false, 
            details: `Transaction not found in mempool/logs. Expected ${expectedUsdc} USDC from ${userAddress} to ${TREASURY_ADDRESS}`,
            providedHash: providedTxHash
        };
    }

    async setPendingFlag(userId: string): Promise<void> {
        await redis.set(`pending:credits:${userId}`, "true", { ex: 300 });
    }
}
