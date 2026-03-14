import { NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import redis from "@/lib/redis"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-10-28.acacia" as any,
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get("stripe-signature") as string

    if (!signature || !webhookSecret) {
        return new NextResponse("Missing signature or secret", { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
        console.error(`[Webhook Error] ${err.message}`)
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const creditAmount = session.metadata?.credits ? parseInt(session.metadata.credits) : 400000

        if (userId) {
            console.log(`[Stripe] Atomically allocating ${creditAmount} credits for User: ${userId}`)

            try {
                // Atomic Increment for user balance
                const balanceKey = `user:credits:${userId}`;
                const pendingKey = `pending:credits:${userId}`;

                await redis.multi()
                    .incrby(balanceKey, creditAmount)
                    .del(pendingKey)
                    .exec();

                console.log(`[Redis] Success: Updated ${balanceKey} and cleared ${pendingKey}`);
            } catch (redisErr) {
                console.error(`[Redis Error] Failed to update balance for ${userId}:`, redisErr);
                // In production, we would dead-letter this or retry
                return new NextResponse("Internal Server Error", { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true })
}
