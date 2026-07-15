const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();
    
    console.log("\x1b[31m[PLAYWRIGHT] NAVIGATING TO AQUARIUM...\x1b[0m");
    await page.goto('https://webglsamples.org/aquarium/aquarium.html', { waitUntil: 'networkidle' });

    let totalBytes = 0;
    console.log("\x1b[31m[PLAYWRIGHT] INITIALIZING SCREENSHOT LOOP (THE OLD WAY)...\x1b[0m");

    const interval = setInterval(async () => {
        try {
            // Check for STUTTER flag in Redis
            const sRes = await fetch("https://big-oyster-39155.upstash.io/get/glazyr:viz:stutter?_token=AZjzAAIncDE2YzlkYWRjNzI5YjQ0NDFkOWY0ZTRkNDc0NGE0YWUxMHAxMzkxNTU");
            const sData = await sRes.json();
            if (sData.result === "ON") {
                await new Promise(r => setTimeout(r, 800)); // Artificial 1 FPS "Slideshow"
            }

            const start = Date.now();
            const buffer = await page.screenshot({ type: 'jpeg', quality: 20 });
            
            totalBytes += buffer.length;
            const latency = Date.now() - start;
            const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
            
            // Calculate instantaneous bandwidth (MB/s)
            const instMBs = (buffer.length / (latency / 1000)) / (1024 * 1024);
            const instBW = instMBs > 0 ? `${instMBs.toFixed(1)} MB/s` : "0.0 MB/s";

            // GAS PUMP VISUAL (High Contrast)
            process.stdout.write('\x1b[2J\x1b[H'); 
            console.log(`\x1b[31;1m[METHOD] TRADITIONAL (CDP SCREENSHOTS)\x1b[0m`);
            console.log(`\x1b[90m--------------------------------------------------\x1b[0m`);
            console.log(`\x1b[31;1m[ENGINE PULSE]   4.0 FPS     (CDP Limit)\x1b[0m`);
            console.log(`\x1b[31;1m[TUNNEL LATENCY] ${latency} ms\x1b[0m`);
            console.log(`\x1b[31;1m[CLOUD SYNC]     ${instBW}  (The "Bloat")\x1b[0m`);
            console.log(`\x1b[90m--------------------------------------------------\x1b[0m`);
            
            // THE GAS PUMP (Massive Red Counter)
            console.log(`\n\x1b[31;1;5m  TOTAL BANDWIDTH CONSUMED:\x1b[0m`);
            console.log(`\x1b[31;1m  +----------------------------------+\x1b[0m`);
            console.log(`\x1b[31;1m  |   ${totalMB.padStart(10)} MB RACKED UP   |\x1b[0m`);
            console.log(`\x1b[31;1m  +----------------------------------+\x1b[0m`);
            
            console.log(`\n\x1b[31;1m[STATUS] LOSING THE RACE...\x1b[0m`);

        } catch (e) { /* ignore loop errors */ }
    }, 250); 

    // Run for 60 seconds
    setTimeout(async () => {
        clearInterval(interval);
        console.log(`\n\x1b[31;1m[PLAYWRIGHT] DEMO COMPLETE. FINAL BLOAT: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB\x1b[0m`);
        await browser.close();
        process.exit(0);
    }, 60000);
})();
