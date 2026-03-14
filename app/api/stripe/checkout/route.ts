import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-10-28.acacia" as any,
})

const PRICING_TIERS = {
    "nexus-entry": { name: "Nexus Entry", amount: 800, credits: 400000 },
    "developer-pack": { name: "Developer Pack", amount: 2500, credits: 1500000 },
    "production-surge": { name: "Production Surge", amount: 10000, credits: 10000000 },
}

export async function POST(req: Request) {
    try {
        const { userId, tierId } = await req.json()

        if (!userId) {
            return NextResponse.json({ error: "USER_ID_REQUIRED" }, { status: 400 })
        }

        const tier = PRICING_TIERS[tierId as keyof typeof PRICING_TIERS]
        if (!tier) {
            return NextResponse.json({ error: "INVALID_PRICING_TIER" }, { status: 400 })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Glazyr Viz: ${tier.name}`,
                            description: `${tier.credits.toLocaleString()} Zero-Copy Frame Perception Sessions`,
                            images: ["https://glazyr.com/images/nexus-credits.png"],
                        },
                        unit_amount: tier.amount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?payment=cancelled`,
            metadata: {
                userId,
                credits: tier.credits.toString(),
                tier: tierId,
            },
        })

        return NextResponse.json({ url: session.url })
    } catch (err: any) {
        console.error(`[Stripe Checkout Error] ${err.message}`)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
