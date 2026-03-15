export const dynamic = "force-dynamic"
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

const getStripe = () => {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) return null
    return new Stripe(key, {
        apiVersion: '2025-02-24.acacia' as any,
    })
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'UNAUTHORIZED: Active session required.' }, { status: 401 });
        }

        const stripe = getStripe()
        if (!stripe) return NextResponse.json({ error: 'Gateway Offline' }, { status: 503 })

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            client_reference_id: session.user.id,
            line_items: [
                {
                    price: process.env.STRIPE_CREDIT_PRICE_ID!,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXTAUTH_URL}/dashboard?checkout=success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/dashboard?checkout=canceled`,
        });

        return NextResponse.json({ url: checkoutSession.url });

    } catch (error: any) {
        console.error(`[CHECKOUT ERROR] Failed to initialize gateway: ${error.message}`);
        return NextResponse.json({ error: 'Internal Gateway Error' }, { status: 500 });
    }
}
