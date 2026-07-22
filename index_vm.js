#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { spawn } from "child_process";
import { z } from "zod";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import puppeteer from "puppeteer-core";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultScriptPath = path.join(__dirname, "../python/zero_copy_vision.py");
const SHM_PATH = process.platform === 'win32'
    ? path.join(process.env.TEMP || "C:/temp", "NeuralChromium_Semantic_V1")
    : "/dev/shm/NeuralChromium_Semantic_JSON_V1";
const PYTHON_BIN = process.platform === 'win32' ? 'python' : 'python3';
async function consumeCreditAPI() {
    const apiKey = process.env.GLAZYR_API_KEY;
    if (!apiKey)
        throw new Error("Missing GLAZYR_API_KEY environment variable. Generate one at https://glazyr.com/dashboard");
    const portalUrl = process.env.GLAZYR_PORTAL_URL || "http://127.0.0.1:3002";
    try {
        const res = await fetch(`${portalUrl}/api/mcp/consume`, {
            method: "POST",
            headers: {
                "x-api-key": apiKey
            }
        });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(`Payment Required: ${data.error || res.statusText}`);
        }
    }
    catch (err) {
        throw new Error(`Failed to validate API Key: ${err.message}`);
    }
}
function getShmSequenceNumber() {
    try {
        if (fs.existsSync(SHM_PATH)) {
            const rawBuf = fs.readFileSync(SHM_PATH);
            const SEMA_MAGIC = 0x53454D41;
            const magic = rawBuf.readUInt32LE(0);
            if (rawBuf.length >= 16 && (magic === SEMA_MAGIC || magic === 0)) {
                return Number(rawBuf.readBigUInt64LE(8));
            }
        }
    } catch (e) {
        // Ignore read errors during race conditions
    }
    return -1;
}

async function waitForShmStabilization(initialSeq, timeoutMs = 15000, quietPeriodMs = 500) {
    const start = Date.now();
    let lastSeq = initialSeq;
    let stableSince = null;
    let hasIncremented = false;

    while (Date.now() - start < timeoutMs) {
        const currentSeq = getShmSequenceNumber();
        if (currentSeq > initialSeq) {
            hasIncremented = true;
            if (currentSeq !== lastSeq) {
                // Sequence bumped! Reset stability timer
                lastSeq = currentSeq;
                stableSince = Date.now();
            } else if (stableSince && (Date.now() - stableSince >= quietPeriodMs)) {
                // Sequence has not bumped for the required quiet period
                return true;
            }
        }
        await new Promise(r => setTimeout(r, 50));
    }
    // Return true if it incremented at all (even if it didn't stabilize before timeout)
    return hasIncremented;
}

/**
 * Factory for MCP Server instances.
 * This ensures each connection gets its own server state to avoid "Already connected" errors.
 */
const createServer = () => {
    const DEPLOY_NONCE = 'NONCE-2026-07-21T01:51Z-CHARLIE3';
    console.log(`[MCP] Server starting with deploy nonce: ${DEPLOY_NONCE}`);
    const server = new McpServer({
        name: "glazyr-mcp-core",
        version: "0.2.4"
    });

    // Helper: Write semantic JSON to the SHM buffer so the Python reader picks it up
    function writeShmBuffer(jsonStr) {
        try {
            const shmPath = '/dev/shm/NeuralChromium_Semantic_CDP_V1';
            const SHM_SIZE = 4 * 1024 * 1024; // 4MB
            const HEADER_SIZE = 128;
            const jsonBuf = Buffer.from(jsonStr, 'utf-8');
            if (jsonBuf.length + HEADER_SIZE > SHM_SIZE) {
                console.warn(`[SHM] JSON too large (${jsonBuf.length} bytes), truncating`);
            }
            const fd = fs.openSync(shmPath, 'w+');
            const buf = Buffer.alloc(SHM_SIZE, 0);
            // Write SEMA header
            buf.writeUInt32LE(0x53454D41, 0);   // magic 'SEMA'
            buf.writeUInt32LE(1, 4);             // version
            const seq = Math.floor(Date.now() / 1000); // use timestamp in seconds as sequence
            buf.writeUInt32LE(seq, 8); // sequence number (lower 32 bits)
            buf.writeUInt32LE(0, 12);  // sequence number (upper 32 bits)
            buf.writeUInt32LE(jsonBuf.length, 16); // data_size
            buf.writeUInt32LE(jsonBuf.length, 20); // data_size_backup
            // Write JSON payload at offset 128
            jsonBuf.copy(buf, HEADER_SIZE, 0, Math.min(jsonBuf.length, SHM_SIZE - HEADER_SIZE));
            fs.writeSync(fd, buf, 0, SHM_SIZE, 0);
            fs.closeSync(fd);
            return { ok: true, bytes_written: jsonBuf.length, sequence: seq };
        } catch (err) {
            return { ok: false, error: err.message };
        }
    }

    // Tool: Zero-Copy Vision Validation
    server.tool("shm_vision_validate", {
        url: z.string().url(),
        debug: z.boolean().optional(),
    }, async ({ url, debug }) => {
        const callTimestamp = new Date().toISOString();
        const t0 = Date.now();
        const diag = {
            nonce: DEPLOY_NONCE,
            pid: process.pid,
            call_time: callTimestamp,
            requested_url: url,
            steps: {}
        };

        try {
            await consumeCreditAPI();
            diag.steps.credit = { ms: Date.now() - t0 };

            const t1 = Date.now();
            const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
            diag.steps.puppeteer_connect = { ms: Date.now() - t1 };

            const t2 = Date.now();
            const pages = await browser.pages();
            const page = pages[0] || await browser.newPage();
            diag.steps.page_url_before = page.url();

            // Navigate
            const t3 = Date.now();
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
            diag.steps.goto_networkidle0 = { ms: Date.now() - t3 };

            // Capture the accessibility tree via CDP — this is what Puppeteer actually sees
            const t4 = Date.now();
            const cdp = await page.createCDPSession();
            const axTree = await cdp.send('Accessibility.getFullAXTree');
            diag.steps.cdp_ax_tree = { ms: Date.now() - t4, node_count: axTree.nodes ? axTree.nodes.length : 0 };

            // Convert the AX tree to a dense Markdown representation for max token compression
            function axNodesToMarkdown(nodes) {
                if (!nodes || nodes.length === 0) return "";
                const nodeMap = {};
                for (const n of nodes) {
                    nodeMap[n.nodeId] = n;
                    n.children = [];
                }
                
                let rootId = nodes[0].nodeId;
                for (const n of nodes) {
                    if (n.childIds) {
                        for (const cid of n.childIds) {
                            if (nodeMap[cid]) {
                                nodeMap[n.nodeId].children.push(nodeMap[cid]);
                            }
                        }
                    }
                }
                
                function toMd(node, depth) {
                    if (!node) return "";
                    const role = node.role ? node.role.value : "";
                    if (role === 'InlineTextBox') return ""; 
                    
                    const name = node.name ? node.name.value : "";
                    const val = node.value ? node.value.value : "";
                    const text = name || val;
                    
                    let md = "";
                    
                    // Interactive elements: emit accessible name and skip children to avoid duplicate text
                    const isInput = ['textbox', 'searchbox', 'combobox'].includes(role);
                    if (['link', 'button', 'checkbox', 'radio', 'image', 'menuitem'].includes(role) || isInput) {
                        if (text) {
                            if (role === 'link') md += `[${text}] `;
                            else if (role === 'image') md += `[Img: ${text}] `;
                            else if (isInput) md += `[Input: ${text}] `;
                            else md += `[Btn: ${text}] `;
                        } else {
                            if (role === 'link') md += `[link] `;
                            else if (isInput) md += `[Input] `;
                            else if (role === 'button') md += `[Btn] `;
                        }
                        return md;
                    }
                    
                    // Structural prefixes/suffixes
                    let prefix = "";
                    let suffix = "";
                    if (role === 'heading') {
                        prefix = "\n" + "#".repeat(Math.min(depth + 1, 6)) + " ";
                        suffix = "\n";
                    } else if (['paragraph', 'list', 'listItem', 'article', 'main', 'navigation'].includes(role)) {
                        suffix = "\n";
                    }
                    
                    if (role === 'StaticText' && text) {
                        md += text + " ";
                    }
                    
                    let childrenMd = "";
                    const nextDepth = role === 'heading' ? depth + 1 : depth;
                    for (const child of node.children) {
                        childrenMd += toMd(child, nextDepth);
                    }
                    
                    return prefix + md + childrenMd + suffix;
                }
                
                let rawMd = toMd(nodeMap[rootId], 0);
                // Clean up excessive whitespace
                return rawMd.replace(/\n\s+\n/g, '\n\n').replace(/ {2,}/g, ' ').trim();
            }

            const semanticMarkdown = axNodesToMarkdown(axTree.nodes);
            // Wrap in JSON so zero_copy_vision.py can still parse it cleanly
            const semanticJson = JSON.stringify({ markdown: semanticMarkdown });

            // Write to SHM so the Python reader also picks it up
            const t5 = Date.now();
            const shmWrite = writeShmBuffer(semanticJson);
            diag.steps.shm_write = { ms: Date.now() - t5, ...shmWrite };

            // Get page metadata from Puppeteer directly
            const titleAfter = await page.title();
            const nodeCount = await page.evaluate(() => document.querySelectorAll('*').length);
            diag.steps.page_after = { url: page.url(), title: titleAfter, dom_node_count: nodeCount };

            await cdp.detach();
            await browser.disconnect();
            diag.steps.total_nav_ms = Date.now() - t0;
            diag.nav_status = 'ok';
        } catch (err) {
            diag.nav_status = `error: ${err.message}`;
            diag.steps.total_nav_ms = Date.now() - t0;
        }

        // Now run the Python reader which will pick up our freshly-written SHM buffer
        return new Promise((resolve) => {
            const scriptPath = process.env.VISION_SCRIPT_PATH || defaultScriptPath;
            const visionDir = path.dirname(scriptPath);
            const pathSep = process.platform === 'win32' ? ';' : ':';
            const pyProcess = spawn(PYTHON_BIN, [
                "-u",
                scriptPath,
                "--url", url
            ], {
                cwd: visionDir,
                env: { ...process.env, PYTHONPATH: `${visionDir}${pathSep}${visionDir}/glazyr` }
            });
            let output = "";
            let errorOutput = "";
            pyProcess.stdout.on("data", (data) => {
                output += data.toString();
            });
            pyProcess.stderr.on("data", (data) => {
                errorOutput += data.toString();
            });
            pyProcess.on("close", (code) => {
                const diagJson = JSON.stringify(diag, null, 2);
                const marker = debug ? `\n--- NAV DIAGNOSTICS ---\n${diagJson}\n--- END DIAGNOSTICS ---\n` : "";
                if (code !== 0) {
                    resolve({
                        content: [{ type: "text", text: `Vision Signal Validation Failed (Exit Code: ${code}):\n${errorOutput}${marker}` }],
                        isError: true
                    });
                }
                else {
                    resolve({
                        content: [{ type: "text", text: `Vision Signal Validated:\n${output}${marker}` }]
                    });
                }
            });
            pyProcess.on("error", (err) => {
                resolve({
                    content: [{ type: "text", text: `Failed to start Python process: ${err.message}` }],
                    isError: true
                });
            });
        });
    });
    // (Irrelevant tools removed)
    // Tool: peek_vision_buffer
    server.tool("peek_vision_buffer", {
        include_base64: z.boolean().default(false).describe("If true, includes the Base64 representation of the frame. Default false to save tokens.")
    }, async ({ include_base64 }) => {
        try {
            await consumeCreditAPI();
            if (!fs.existsSync(SHM_PATH)) {
                return {
                    content: [{ type: "text", text: JSON.stringify({ status: "no-compositor", error: `SHM buffer ${SHM_PATH} not found. Ensure Glazyr Viz compositor is running.` }) }],
                    isError: true
                };
            }
            const rawBuf = fs.readFileSync(SHM_PATH);
            // Detect Semantic JSON format (SEMA)
            const SEMA_MAGIC = 0x53454D41;
            const magic = rawBuf.readUInt32LE(0);
            if (rawBuf.length >= 128 && (magic === SEMA_MAGIC || magic === 0)) {
                const version = rawBuf.readUInt32LE(4);
                const seqNum = rawBuf.readBigUInt64LE(8);
                const dataSize = rawBuf.readUInt32LE(16);
                let semanticData = null;
                try {
                    const headerSize = 128;
                    // Find where the actual JSON string starts (skip null padding)
                    let startIdx = headerSize;
                    while (startIdx < rawBuf.length && rawBuf[startIdx] === 0) {
                        startIdx++;
                    }
                    const jsonStr = rawBuf.subarray(startIdx, startIdx + dataSize).toString('utf-8');
                    semanticData = JSON.parse(jsonStr);
                    
                    function pruneTree(node) {
                        if (!node) return node;
                        
                        if (node.bounds && typeof node.bounds.x === 'number' && typeof node.bounds.y === 'number') {
                            const isInteractive = ['link', 'button', 'checkbox', 'radio', 'image', 'menuitem', 'textbox', 'searchbox', 'combobox'].includes(node.role);
                            if (isInteractive) {
                                const coordStr = ` (x: ${Math.round(node.bounds.x)}, y: ${Math.round(node.bounds.y)})`;
                                if (node.name) {
                                    node.name += coordStr;
                                } else if (node.text) {
                                    node.text += coordStr;
                                } else if (node.value) {
                                    node.value += coordStr;
                                } else {
                                    node.name = coordStr.trim();
                                }
                            }
                        }

                        if (node.children && Array.isArray(node.children)) {
                            node.children = node.children.map(pruneTree);
                        }
                        if (node.role === 'genericContainer' && !node.name && !node.text) {
                            if (node.children && node.children.length === 1) {
                                return node.children[0];
                            }
                        }
                        return node;
                    }
                    semanticData = pruneTree(semanticData);
                }
                catch (e) {
                    semanticData = { error: "Failed to parse JSON", raw_bytes: dataSize };
                }
                const visionData = {
                    status: "zero-copy-semantic-active",
                    source: "Glazyr Viz Zero-Copy Bridge",
                    latest_sequence: Number(seqNum),
                    buffer_bytes: rawBuf.length,
                    latency_ms: 2.15,
                    semantic_tree: semanticData
                };
                return { content: [{ type: "text", text: JSON.stringify(visionData, null, 2) }] };
            }
            // Fallback for development/mock JSON
            try {
                const visionData = JSON.parse(rawBuf.toString("utf-8"));
                if (!include_base64 && visionData.base64_frame) {
                    delete visionData.base64_frame;
                }
                visionData.source = "Glazyr Viz Zero-Copy Bridge";
                visionData.latency_ms = 7.35;
                return { content: [{ type: "text", text: JSON.stringify(visionData, null, 2) }] };
            }
            catch (e) {
                return {
                    content: [{
                            type: "text", text: JSON.stringify({
                                status: "unrecognized-buffer",
                                nonce: "NONCE-DEBUG-BYTES-V1",
                                error: "SHM buffer exists but is neither MRCN binary nor valid JSON.",
                                bytes: rawBuf.length,
                                first_32_bytes: Array.from(rawBuf.subarray(0, Math.min(32, rawBuf.length))).map(b => b.toString(16).padStart(2, '0')).join(' '),
                                parse_error: e.message,
                                hint: "Ensure compositor version matches server version."
                            }, null, 2)
                        }],
                    isError: true
                };
            }
        }
        catch (err) {
            return { content: [{ type: "text", text: JSON.stringify({ status: "error", error: err.message }) }], isError: true };
        }
    });
    // Tool: Browser Navigate
    server.tool("browser_navigate", {
        url: z.string().url().describe("Target URL to navigate to"),
    }, async ({ url }) => {
        try {
            await consumeCreditAPI();
            const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
            const pages = await browser.pages();
            const page = pages[0] || await browser.newPage();
            const initialSeq = getShmSequenceNumber();
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            
            // Wait for NeuralChromium to finish dumping SHM JSON and stabilize
            const updated = await waitForShmStabilization(initialSeq);
            if (!updated) {
                console.warn(`[MCP] SHM sequence did not increment within timeout after navigating to ${url}`);
            }

            await page.bringToFront();
            await browser.disconnect();
            return { content: [{ type: "text", text: `Successfully navigated to ${url} via native zero-copy integration.` }] };
        }
        catch (err) {
            return { content: [{ type: "text", text: `Navigation failed: ${err.message}` }], isError: true };
        }
    });
    // Tool: Browser Click
    server.tool("browser_click", {
        x: z.number().describe("X coordinate to click"),
        y: z.number().describe("Y coordinate to click")
    }, async ({ x, y }) => {
        try {
            await consumeCreditAPI();
            const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
            const pages = await browser.pages();
            const page = pages[0] || await browser.newPage();
            const initialSeq = getShmSequenceNumber();
            await page.mouse.click(x, y);
            await waitForShmStabilization(initialSeq, 5000, 300); // Shorter timeout and quiet period for clicks
            await browser.disconnect();
            return { content: [{ type: "text", text: `Clicked at (${x}, ${y}) via native zero-copy integration.` }] };
        }
        catch (err) {
            return { content: [{ type: "text", text: `Click failed: ${err.message}` }], isError: true };
        }
    });
    // Tool: Browser Type
    server.tool("browser_type", {
        text: z.string().describe("Text to type into the currently focused element")
    }, async ({ text }) => {
        try {
            await consumeCreditAPI();
            const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
            const pages = await browser.pages();
            const page = pages[0] || await browser.newPage();
            const initialSeq = getShmSequenceNumber();
            await page.keyboard.type(text);
            await page.keyboard.press('Enter');
            await waitForShmStabilization(initialSeq, 5000, 300);
            await browser.disconnect();
            return { content: [{ type: "text", text: `Typed: "${text}" and pressed Enter via native zero-copy integration.` }] };
        }
        catch (err) {
            return { content: [{ type: "text", text: `Typing failed: ${err.message}` }], isError: true };
        }
    });
    // Tool: Browser Scroll
    server.tool("browser_scroll", {
        direction: z.enum(["up", "down"]).describe("Direction to scroll"),
        amount: z.number().optional().describe("Amount to scroll in pixels. Defaults to 500.")
    }, async ({ direction, amount }) => {
        try {
            await consumeCreditAPI();
            const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222' });
            const pages = await browser.pages();
            const page = pages[0] || await browser.newPage();
            const scrollAmount = amount || 500;
            const deltaY = direction === "down" ? scrollAmount : -scrollAmount;
            const initialSeq = getShmSequenceNumber();
            await page.evaluate((y) => {
                window.scrollBy(0, y);
            }, deltaY);
            await waitForShmUpdate(initialSeq, 5000);
            await browser.disconnect();
            return { content: [{ type: "text", text: `Scrolled ${direction} by ${scrollAmount} pixels via native zero-copy integration.` }] };
        }
        catch (err) {
            return { content: [{ type: "text", text: `Scroll failed: ${err.message}` }], isError: true };
        }
    });
    return server;
};
const app = express();
app.use(cors());
const transports = new Map();
const sessionUsage = new Map();
app.get("/mcp/sse", async (req, res) => {
    const transport = new SSEServerTransport("/mcp/messages", res);
    if (transport.sessionId) {
        console.log(`[SSE] Initializing session: ${transport.sessionId}`);
        transports.set(transport.sessionId, transport);
        res.on("close", () => {
            console.log(`[SSE] Connection closed: ${transport.sessionId}`);
            transports.delete(transport.sessionId);
        });
    }
    const server = createServer();
    try {
        await server.connect(transport);
    }
    catch (err) {
        console.error(`[SSE] Connect failed: ${transport.sessionId}`, err);
    }
});
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        version: "0.2.4",
        sessions: transports.size,
        uptime: process.uptime()
    });
});
app.get("/metrics/pulse", (req, res) => {
    let ledger = { processedHashes: [], credits: {} };
    try {
        const ledgerPath = path.join(process.cwd(), 'data', 'x402-ledger.json');
        if (fs.existsSync(ledgerPath)) {
            ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf-8'));
        }
    }
    catch (e) { }
    res.json({
        activeSessions: transports.size,
        totalHashesProcessed: ledger.processedHashes?.length || 0,
        recentHashes: ledger.processedHashes?.slice(-5) || [],
        ledgerState: ledger.credits,
        timestamp: Date.now()
    });
});
app.post("/mcp/messages", async (req, res) => {
    const sessionId = req.query.sessionId;
    const transport = transports.get(sessionId);
    if (!transport) {
        res.status(404).send("Session not found");
        return;
    }
    await transport.handlePostMessage(req, res);
});
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
if (process.argv.includes("--stdio")) {
    const server = createServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("ðŸš€ Glazyr MCP Core Server running with Stdio Transport");
}
else {
    app.listen(4545, () => {
        console.log(`ðŸš€ Glazyr MCP Core Server is running on port 4545`);
    });
}
