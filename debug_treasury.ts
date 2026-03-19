import { createPublicClient, http, parseAbi, type Hex } from "viem"
import { base } from "viem/chains"

const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
const TREASURY_ADDRESS = "0x104A40D202d40458d8c67758ac54E93024A41B01"
const PUBLIC_RPC = "https://mainnet.base.org"

async function debugTreasuryTransfers() {
    console.log("--- BLOCKCHAIN LOG DEBUG ---");
    const client = createPublicClient({
        chain: base,
        transport: http(PUBLIC_RPC),
    });

    try {
        const block = await client.getBlockNumber();
        console.log(`Current Block: ${block}`);

        console.log(`Scanning last 3000 blocks for transfers TO treasury: ${TREASURY_ADDRESS}...`);
        
        // Topics array: [signature, indexed_param_1 (from), indexed_param_2 (to)]
        // We pad the treasury address to 32 bytes to match the indexed topic encoding
        const treasuryTopic = `0x000000000000000000000000${TREASURY_ADDRESS.slice(2)}` as Hex;
        
        const logsToTreasury = await client.getLogs({
            address: USDC_ADDRESS,
            event: parseAbi(["event Transfer(address indexed from, address indexed to, uint256 value)"])[0],
            args: {
                to: TREASURY_ADDRESS as Hex
            },
            fromBlock: block - BigInt(800)
        });

        console.log(`Found ${logsToTreasury.length} transfer events directly targeting the treasury.`);
        logsToTreasury.forEach(l => {
            // @ts-ignore
            console.log(`- From: ${l.args.from}, To: ${l.args.to}, Val: ${Number(l.args.value) / 1e6} USDC, Hash: ${l.transactionHash}`);
        });

    } catch (err) {
        console.error("Debug failed:", err);
    }
}

debugTreasuryTransfers();
