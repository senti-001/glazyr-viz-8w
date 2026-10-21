import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MCP Server Setup & Token Provisioning',
  description: 'Provision credentials and configure Model Context Protocol (MCP) clients for Glazyr Viz real-time vision telemetry.',
  alternates: {
    canonical: '/mcp-setup',
  },
  openGraph: {
    title: 'MCP Server Setup & Token Provisioning | Glazyr Viz',
    description: 'Provision credentials and configure Model Context Protocol (MCP) clients for Glazyr Viz real-time vision telemetry.',
    url: 'https://glazyr.com/mcp-setup',
  },
}

export default function McpSetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
