export const dynamic = "force-dynamic"
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import redis from '@/lib/redis';

const getStripe = () => {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) return null
    return new Stripe(key, {
        apiVersion: '2025-02-24.acacia' as any,
    })
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

export async function POST(req: Request) {
    const body = await req.text();
    const head = await headers();
    const signature = head.get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
    }

    const stripe = getStripe()
    if (!stripe || !webhookSecret) {
        console.error("[Stripe] Secret key or Webhook secret missing. Webhook deactivated.")
        return new NextResponse("Webhook deactivated", { status: 503 })
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`[WEBHOOK ERROR] Signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id || session.metadata?.userId;
        const amountPaid = session.amount_total;

        if (!userId) {
            console.error('[WEBHOOK ERROR] No userId provided in session.');
            return NextResponse.json({ error: 'Missing userId mapping' }, { status: 400 });
        }

        const creditsToMint = session.metadata?.credits
            ? parseInt(session.metadata.credits)
            : Math.floor((amountPaid || 0) / 100) * 100;

        try {
            const balanceKey = `user:credits:${userId}`;
            const newBalance = await redis.incrby(balanceKey, creditsToMint);
            console.log(`[REVENUE SECURED] Minted ${creditsToMint} credits for User ${userId}. New Balance: ${newBalance}`);
        } catch (dbError) {
            console.error(`[LEDGER ERROR] Failed to allocate credits for ${userId}:`, dbError);
            return NextResponse.json({ error: 'Ledger allocation failed' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
