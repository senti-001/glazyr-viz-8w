import Stripe from 'stripe';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
    console.error("❌ No STRIPE_SECRET_KEY found in .env.local!");
    process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia' as any,
});

const WEBHOOK_URL = 'https://glazyr.com/api/webhooks/stripe';

async function setup() {
    console.log("🚀 Starting Stripe Setup using SDK...");

    // 1. Create Webhook
    console.log(`\n🔗 Creating Webhook Endpoint for ${WEBHOOK_URL}...`);
    try {
        const webhook = await stripe.webhookEndpoints.create({
            url: WEBHOOK_URL,
            enabled_events: ['checkout.session.completed'],
        });
        console.log("✅ Webhook created successfully!");
        console.log(`   Webhook ID: ${webhook.id}`);
        console.log(`   Webhook Secret: ${webhook.secret}`);
        
        // 2. Update .env.local
        console.log("\n📝 Updating .env.local with new webhook secret...");
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        if (envContent.includes('STRIPE_WEBHOOK_SECRET=')) {
            envContent = envContent.replace(/STRIPE_WEBHOOK_SECRET=.*/g, `STRIPE_WEBHOOK_SECRET=${webhook.secret}`);
        } else {
            envContent += `\nSTRIPE_WEBHOOK_SECRET=${webhook.secret}\n`;
        }
        
        fs.writeFileSync(envPath, envContent);
        console.log("✅ .env.local updated successfully!");
    } catch (err: any) {
        console.error("❌ Failed to create webhook:", err.message);
    }
}

setup().catch(console.error);
