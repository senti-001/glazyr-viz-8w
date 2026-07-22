import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { CreditManager } from '@/lib/paymaster';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, secret } = body;

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Missing email' }, { status: 400 });
        }

        if (secret !== (process.env.MCP_INTERNAL_SECRET || "fallback_internal_secret")) {
            return NextResponse.json({ error: 'Unauthorized internal call' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const creditManager = new CreditManager();
        
        // Deduct 1 credit for a frame consumption
        const result = await creditManager.deduct(user.id, 1);

        if (!result.success) {
            return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 });
        }

        return NextResponse.json({ success: true, balance: result.balance });
    } catch (error: any) {
        console.error(`[MCP CONSUME OAUTH ERROR] Failed to consume credit: ${error.message}`);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
