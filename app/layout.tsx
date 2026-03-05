import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'Glazyr Viz - The Zero-Copy Agentic Platform',
    description: 'The primary interface for the Glazyr Viz ecosystem. High-frequency autonomy and zero-copy perception.',
    generator: 'v0.app',
    icons: {
        icon: '/favicon.png',
        apple: '/apple-icon.png',
    },
}

export const viewport: Viewport = {
    themeColor: '#0a0e16',
    width: 'device-width',
    initialScale: 1,
}

// import { ElevenLabsWidget } from '@/components/elevenlabs-widget'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark">
            <body className="font-sans antialiased min-h-screen bg-background text-foreground">
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                        `,
                    }}
                />
                {children}
                {/* <Analytics /> */}
                {/* <ElevenLabsWidget /> */}
            </body>
        </html>
    )
}
