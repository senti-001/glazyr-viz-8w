import { createPublicClient, http, parseAbi, type Hex } from "viem"
import { base } from "viem/chains"

const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
const TREASURY_ADDRESS = "0x104A20a7a68e42f6e2a66B7d3B3E080146a2B01"
const PUBLIC_RPC = "https://mainnet.base.org"

async function debug() {
    console.log("--- BLOCKCHAIN LOG DEBUG ---");
    const client = createPublicClient({
        chain: base,
        transport: http(PUBLIC_RPC),
    });

    try {
        const block = await client.getBlockNumber();
        console.log(`Current Block: ${block}`);

        console.log(`Scanning last 2000 blocks for transfers TO treasury: ${TREASURY_ADDRESS}...`);
        const logsToTreasury = await client.getLogs({
            address: USDC_ADDRESS,
            event: parseAbi(["event Transfer(address indexed from, address indexed to, uint256 value)"])[0],
            args: {
                to: TREASURY_ADDRESS as Hex
            },
            fromBlock: block - BigInt(2000)
        });

        console.log(`Found ${logsToTreasury.length} transfers to treasury.`);
        logsToTreasury.forEach(l => {
            // @ts-ignore
            console.log(`- From: ${l.args.from}, Val: ${Number(l.args.value) / 1e6} USDC, Hash: ${l.transactionHash}`);
        });

        // Also scan for ANY transfers from the last 500 blocks to see what's happening generally
        console.log("\nScanning last 500 blocks for ANY USDC transfers (sampling)...");
        const anyLogs = await client.getLogs({
            address: USDC_ADDRESS,
            event: parseAbi(["event Transfer(address indexed from, address indexed to, uint256 value)"])[0],
            fromBlock: block - BigInt(500)
        });
        console.log(`Found ${anyLogs.length} total USDC transfers.`);
        
    } catch (err) {
        console.error("Debug failed:", err);
    }
}

debug();
