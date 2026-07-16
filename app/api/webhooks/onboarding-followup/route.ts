import { NextRequest, NextResponse } from "next/server"
import { sendOnboardingFollowUp } from "@/lib/email"
import prisma from "@/lib/db"

/**
 * POST /api/webhooks/onboarding-followup
 * 
 * Sends a Day-1 onboarding follow-up email to a specific user.
 * Can be called manually from the CRM or triggered by a cron job.
 * 
 * Body: { email: string } OR { userId: string }
 * Header: Authorization: Bearer <CRON_SECRET>
 */
export async function POST(req: NextRequest) {
    // Protect the endpoint with a shared secret
    const authHeader = req.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET || "glazyr-cron-secret"

    if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const body = await req.json()
        const { email, userId } = body

        let targetUser: { name: string | null; email: string | null } | null = null

        if (userId) {
            targetUser = await prisma.user.findUnique({
                where: { id: userId },
                select: { name: true, email: true }
            })
        } else if (email) {
            targetUser = await prisma.user.findUnique({
                where: { email },
                select: { name: true, email: true }
            })
        }

        if (!targetUser || !targetUser.email) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const result = await sendOnboardingFollowUp({
            name: targetUser.name,
            email: targetUser.email,
        })

        if (!result.success) {
            return NextResponse.json({ error: "Failed to send email", details: result.error }, { status: 500 })
        }

        return NextResponse.json({ success: true, emailId: result.id })

    } catch (err: any) {
        console.error("[OnboardingFollowUp] Error:", err)
        return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 })
    }
}
