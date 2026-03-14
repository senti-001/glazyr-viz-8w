import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Redis } from '@upstash/redis';

// Initialize core infrastructure
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia', // Best practice is to use the latest typed version, stripe package expects a valid one though 2023-10-16 is often used in docs. Providing the type compatible version is better or just ignoring ts error if it's strict. I'll use a type-safe string or let it infer.
});

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        // Cryptographically verify the event originated from Stripe
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`[WEBHOOK ERROR] Signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Route the verified event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // The NextAuth userId MUST be passed during checkout creation
        const userId = session.client_reference_id;
        const amountPaid = session.amount_total;

        if (!userId) {
            console.error('[WEBHOOK ERROR] No client_reference_id provided in session.');
            return NextResponse.json({ error: 'Missing userId mapping' }, { status: 400 });
        }

        // Calculate credits based on your pricing model (e.g., 100 credits per $1.00 USD)
        // Assuming amountPaid is in cents. Adjust to your specific Glazyr Viz conversion rate.
        const creditsToMint = Math.floor((amountPaid || 0) / 100) * 100;

        try {
            // Atomic increment in Upstash Redis
            const balanceKey = `user:credits:${userId}`;
            const newBalance = await redis.incrby(balanceKey, creditsToMint);

            console.log(`[REVENUE SECURED] Minted ${creditsToMint} credits for User ${userId}. New Balance: ${newBalance}`);
        } catch (dbError) {
            console.error(`[LEDGER ERROR] Failed to allocate credits for ${userId}:`, dbError);
            return NextResponse.json({ error: 'Ledger allocation failed' }, { status: 500 });
        }
    }

    // Acknowledge receipt to Stripe to prevent event retries
    return NextResponse.json({ received: true }, { status: 200 });
}
