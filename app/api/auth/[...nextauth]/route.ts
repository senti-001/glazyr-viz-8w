import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/db"

// V1.0.0 Production Fix: Force canonical URL and trust headers for Amplify/SSR
if (process.env.NODE_ENV === "production" || process.env.AMPLIFY_BUILD_ID) {
    if (!process.env.NEXTAUTH_URL || process.env.NEXTAUTH_URL.includes("localhost")) {
        process.env.NEXTAUTH_URL = "https://glazyr.com";
    }
    process.env.AUTH_TRUST_HOST = "true"; // Required for NextAuth on serverless
}

export const authOptions: NextAuthOptions = {
    theme: { colorScheme: "light" },
    pages: {
        signIn: "/auth/signin",
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user && user.id) {
                const existing = await prisma.userCredit.findUnique({
                    where: { userId: user.id }
                });
                if (!existing) {
                    await prisma.userCredit.create({
                        data: {
                            userId: user.id,
                            balance: 2500
                        }
                    });
                    console.log(`[NextAuth] New user ${user?.email} granted 2,500 Glazyr Frames.`);
                }
            }
            return true;
        },
        async session({ session, token }: any) {
            if (session.user && token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    events: {
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_dev",
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
