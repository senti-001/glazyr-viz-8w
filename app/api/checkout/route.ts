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

const PRICING_TIERS: Record<string, { amount: number; credits: number; name: string }> = {
    "developer": { amount: 300, credits: 100000, name: "Developer Pack" },
    "pro": { amount: 900, credits: 300000, name: "Pro Pack" },
    "scale": { amount: 1500, credits: 1000000, name: "Scale Pack" },
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { tierId } = await req.json();

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'UNAUTHORIZED: Active session required.' }, { status: 401 });
        }

        const tier = PRICING_TIERS[tierId];
        if (!tier) {
            return NextResponse.json({ error: 'INVALID_TIER' }, { status: 400 });
        }

        const stripe = getStripe()
        if (!stripe) return NextResponse.json({ error: 'Gateway Offline' }, { status: 503 })

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            client_reference_id: session.user.id,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Glazyr Viz: ${tier.name}`,
                            description: `${tier.credits.toLocaleString()} Zero-Copy Frames`,
                        },
                        unit_amount: tier.amount,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: session.user.id,
                credits: tier.credits.toString(),
            },
            success_url: `${process.env.NEXTAUTH_URL || 'https://glazyr.com'}/dashboard?checkout=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'https://glazyr.com'}/dashboard?checkout=canceled`,
        });

        return NextResponse.json({ url: checkoutSession.url });

    } catch (error: any) {
        console.error(`[CHECKOUT ERROR] Failed to initialize gateway: ${error.message}`);
        // Return actual error message for terminal debugging
        return NextResponse.json({ 
            error: 'Internal Gateway Error', 
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
