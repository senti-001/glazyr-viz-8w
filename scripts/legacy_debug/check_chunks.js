const fs = require('fs');
const https = require('https');

async function test() {
    const html = fs.readFileSync('dashboard.html', 'utf8');
    const chunks = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+)"/g)].map(m => m[1]);
    
    let fixPresent = false;
    for (const c of chunks) {
        const js = await new Promise(r => https.get('https://glazyr.com' + c, res => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => r(data));
        }));
        if (js.includes('0x0')) {
            fixPresent = true;
            console.log('Fix present in', c);
        }
        if (js.includes('104A40D202d40458d8c67758ac54E93024A41B01') || js.includes('104a40d202d40458d8c67758ac54e93024a41b01')) {
             console.log('Treasury present in', c);
        }
    }
    console.log("Fix present?", fixPresent);
}

test();
