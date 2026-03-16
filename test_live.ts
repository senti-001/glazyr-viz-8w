async function testLiveApi() {
    try {
        console.log("Pinging live API...");
        const res = await fetch("https://glazyr.com/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                txHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
                address: "0x0000000000000000000000000000000000000000" 
            })
        });
        
        const text = await res.text();
        console.log(`Status: ${res.status}`);
        console.log(`Response: ${text}`);
    } catch (e) {
        console.error("Error:", e);
    }
}

testLiveApi();
