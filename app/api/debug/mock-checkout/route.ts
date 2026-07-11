import { NextRequest, NextResponse } from "next/server";
import { CreditManager } from "@/lib/paymaster";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const credits = parseInt(searchParams.get("credits") || "0", 10);
    
    if (!userId || !credits) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    try {
        const creditManager = new CreditManager();
        await creditManager.addCredits(userId, credits);
        console.log(`[MOCK STRIPE WEBHOOK] Minted ${credits} credits for User ${userId}.`);
        
        // Redirect back to dashboard
        return NextResponse.redirect(new URL("/dashboard?success=true", req.url));
    } catch (err) {
        return NextResponse.json({ error: "Failed to mint mock credits" }, { status: 500 });
    }
}
