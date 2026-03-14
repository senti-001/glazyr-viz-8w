import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia' as any, // Typecast to fix strict typing alignment while keeping current
});

export async function POST(req: Request) {
    try {
        // 1. Validate the zero-trust boundary
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'UNAUTHORIZED: Active session required.' }, { status: 401 });
        }

        // 2. Construct the Stripe Checkout payload
        const checkoutSession = await stripe.checkout.sessions.create({
            mode: 'payment', // or 'subscription' if you pivot to recurring MRR
            payment_method_types: ['card'],

            // THE CRITICAL BRIDGE: This maps the capital back to the Upstash Redis ledger
            client_reference_id: session.user.id,

            line_items: [
                {
                    // Replace with your actual Stripe Price ID for Glazyr Viz credits
                    price: process.env.STRIPE_CREDIT_PRICE_ID!,
                    quantity: 1,
                },
            ],

            // Redirects post-transaction
            success_url: `${process.env.NEXTAUTH_URL}/dashboard?checkout=success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/dashboard?checkout=canceled`,
        });

        // 3. Hand off the URL to the client for redirect
        return NextResponse.json({ url: checkoutSession.url });

    } catch (error: any) {
        console.error(`[CHECKOUT ERROR] Failed to initialize gateway: ${error.message}`);
        return NextResponse.json({ error: 'Internal Gateway Error' }, { status: 500 });
    }
}
