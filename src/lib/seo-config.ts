export const siteConfig = {
  name: "TechFlow AI",
  description: "Agencia líder en marketing digital y automatización con IA en Colombia. Transformamos tu negocio con estrategias innovadoras, automatización inteligente y soluciones de inteligencia artificial.",
  url: "https://techflowai.co",
  ogImage: "https://techflowai.co/og-image.jpg",
  links: {
    twitter: "https://twitter.com/techflowai",
    linkedin: "https://linkedin.com/company/techflowai",
    instagram: "https://instagram.com/techflowai",
    facebook: "https://facebook.com/techflowai",
  },
  creator: "TechFlow AI",
  keywords: [
    "marketing digital colombia",
    "agencia marketing digital medellin",
    "automatización marketing",
    "inteligencia artificial marketing",
    "chatbots ia colombia",
    "desarrollo web profesional",
    "seo colombia",
    "facebook ads colombia",
    "google ads colombia",
    "automatización procesos",
    "n8n colombia",
    "zapier colombia",
    "make integromat",
    "transformación digital",
    "marketing automation"
  ],
}

export const defaultSEO = {
  title: siteConfig.name,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    handle: '@techflowai',
    site: '@techflowai',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'keywords',
      content: siteConfig.keywords.join(', '),
    },
    {
      name: 'author',
      content: siteConfig.creator,
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'googlebot',
      content: 'index, follow',
    },
    {
      name: 'geo.region',
      content: 'CO-ANT',
    },
    {
      name: 'geo.placename',
      content: 'Medellín',
    },
    {
      name: 'geo.position',
      content: '6.2442;-75.5812',
    },
    {
      name: 'ICBM',
      content: '6.2442, -75.5812',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
}

// Función para generar metadata para páginas específicas
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
}: {
  title: string
  description: string
  path?: string
  image?: string
}) {
  const pageTitle = `${title} | ${siteConfig.name}`
  const url = `${siteConfig.url}${path}`
  
  return {
    title: pageTitle,
    description,
    canonical: url,
    openGraph: {
      title: pageTitle,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
    },
  }
}