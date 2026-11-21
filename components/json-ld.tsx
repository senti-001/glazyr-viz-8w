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
          'zero-copy browser perception infrastructure: page state served from shared memory, curated for token cost, exposed to agents over MCP. Local-first, in active development.',
        featureList: [
          'Zero-Copy Shared Memory (32MB SHM Region)',
          '0.8µs Median Frame Buffer Read (Measured over 2,000 samples)',
          'Chromium 158 Headless Shell Custom Fork',
          'Exact (x,y) Deterministic Layout Engine Coordinates',
          'Model Context Protocol (MCP) Server for Claude & Cursor',
          'Local-First Workstation Build',
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
