import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { CreditManager } from '@/lib/paymaster';

export async function POST(req: Request) {
    try {
        const apiKeyHeader = req.headers.get('x-api-key');

        if (!apiKeyHeader) {
            return NextResponse.json({ error: 'Missing x-api-key header' }, { status: 401 });
        }

        // Find the API Key
        const apiKey = await prisma.apiKey.findUnique({
            where: { key: apiKeyHeader }
        });

        if (!apiKey) {
            return NextResponse.json({ error: 'Invalid API Key' }, { status: 401 });
        }

        // Update lastUsed timestamp
        await prisma.apiKey.update({
            where: { id: apiKey.id },
            data: { lastUsed: new Date() }
        });

        const creditManager = new CreditManager();
        
        // Deduct 1 credit for a frame consumption
        const result = await creditManager.deduct(apiKey.userId, 1);

        if (!result.success) {
            return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error(`[MCP CONSUME ERROR] Failed to consume credit: ${error.message}`);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
