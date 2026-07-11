import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
        }

        // Generate a random key
        const prefix = "glz_live_";
        const randomHex = crypto.randomBytes(32).toString('hex');
        const keyString = `${prefix}${randomHex}`;

        const newKey = await prisma.apiKey.create({
            data: {
                key: keyString,
                userId: session.user.id
            }
        });

        return NextResponse.json({ key: newKey.key });
    } catch (error: any) {
        console.error(`[API KEY ERROR] Failed to generate key: ${error.message}`);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
        }

        const keys = await prisma.apiKey.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ keys });
    } catch (error: any) {
        console.error(`[API KEY ERROR] Failed to fetch keys: ${error.message}`);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(req.url);
        const keyId = searchParams.get("id");

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
        }

        if (!keyId) {
            return NextResponse.json({ error: 'Missing key ID' }, { status: 400 });
        }

        // Delete the key, ensuring it belongs to the user
        await prisma.apiKey.deleteMany({
            where: {
                id: keyId,
                userId: session.user.id
            }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error(`[API KEY ERROR] Failed to delete key: ${error.message}`);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
