export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://glazyr.com/#website',
        url: 'https://glazyr.com',
        name: 'Glazyr Viz',
        description:
          'The high-throughput, zero-copy optic nerve and perception platform for autonomous AI agents.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'Organization',
        '@id': 'https://glazyr.com/#organization',
        name: 'Glazyr Viz',
        legalName: 'Magnetar Sentient L.L.C.',
        url: 'https://glazyr.com',
        logo: 'https://glazyr.com/images/glazyr-emblem.png',
        sameAs: ['https://github.com/senti-001/glazyr-viz-8w'],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://glazyr.com/#application',
        name: 'Glazyr Viz Zero-Copy Optic Nerve Engine',
        applicationCategory: 'DeveloperApplication, ComputerVisionApplication, ArtificialIntelligence',
        operatingSystem: 'Linux, Chromium, Docker, Model Context Protocol',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'High-throughput, zero-copy browser perception infrastructure delivering sub-8ms state extraction directly from GPU frame buffers with deterministic click coordinates.',
        featureList: [
          '7.35ms Direct GPU Frame Buffer Perception',
          'Zero-Copy Shared Memory (SHM) Telemetry',
          'Exact (x,y) Deterministic Click Targeting',
          'Model Context Protocol (MCP) Server for Claude & Cursor',
          '15-50x Faster State Extraction than Playwright / CDP',
          'Custom Hardened Chromium Headless Optic Engine',
          'B2B Perception Infrastructure Layer',
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
