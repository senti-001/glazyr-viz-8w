export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://glazyr.com/#website',
        url: 'https://glazyr.com',
        name: 'Glazyr',
        description:
          'zero-copy browser perception infrastructure: page state served from shared memory, curated for token cost, exposed to agents over MCP.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'Organization',
        '@id': 'https://glazyr.com/#organization',
        name: 'Glazyr',
        legalName: 'Magnetar Sentient L.L.C.',
        url: 'https://glazyr.com',
        logo: 'https://glazyr.com/images/glazyr-emblem.png',
        sameAs: ['https://github.com/senti-001/glazyr-viz-8w'],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://glazyr.com/#application',
        name: 'Glazyr Zero-Copy Perception Engine',
        applicationCategory: 'DeveloperApplication, ArtificialIntelligence',
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
          '0.8µs Median Shared Memory Read (Measured over 2,000 samples)',
          'Chromium 158 Headless Shell Custom Fork',
          'Exact (x,y) Deterministic Layout Engine Coordinates',
          'Model Context Protocol (MCP) Server with 9 Core Tools',
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
