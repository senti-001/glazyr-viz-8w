import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

import { AuthProvider } from '@/components/auth-provider'

import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
    metadataBase: new URL('https://glazyr.com'),
    title: {
        default: 'Glazyr Viz - The Zero-Copy Agentic Platform',
        template: '%s | Glazyr Viz',
    },
    description: 'Glazyr Viz is the high-throughput, zero-copy optic nerve for AI agents. Sub-8ms visual perception, direct GPU buffer access, and deterministic click targeting via Model Context Protocol (MCP).',
    keywords: [
        'AI agents',
        'computer vision',
        'zero-copy perception',
        'Model Context Protocol',
        'MCP',
        'headless browser',
        'autonomous web agents',
        'Chromium GPU buffer',
        'browser automation',
        'Glazyr'
    ],
    authors: [{ name: 'Magnetar Sentient L.L.C.', url: 'https://glazyr.com' }],
    creator: 'Magnetar Sentient L.L.C.',
    publisher: 'Glazyr Viz',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://glazyr.com',
        siteName: 'Glazyr Viz',
        title: 'Glazyr Viz - The Zero-Copy Agentic Platform',
        description: '7.35ms visual perception & deterministic click targeting for AI agents. Direct GPU frame buffer access via Model Context Protocol (MCP).',
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Glazyr Viz - The Zero-Copy Agentic Platform',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Glazyr Viz - The Zero-Copy Agentic Platform',
        description: '7.35ms visual perception & deterministic click targeting for AI agents. Direct GPU frame buffer access via Model Context Protocol (MCP).',
        images: ['/opengraph-image'],
        creator: '@glazyrviz',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.png' },
            { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
            { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        ],
        apple: '/apple-icon.png',
    },
}

export const viewport: Viewport = {
    themeColor: '#0a0e16',
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="UTF-8" />
                {/* Inline script to prevent flash of wrong theme */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                var theme = localStorage.getItem('glazyr-theme');
                                if (theme === 'light') {
                                    document.documentElement.classList.remove('dark');
                                } else {
                                    document.documentElement.classList.add('dark');
                                }
                            })();
                        `,
                    }}
                />
                {process.env.NEXT_PUBLIC_GA_ID && (
                    <>
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
                    </>
                )}
            </head>
            <body className="font-sans antialiased min-h-screen bg-background text-foreground">
                <JsonLd />
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}
