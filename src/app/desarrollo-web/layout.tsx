import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Desarrollo Web Profesional - Sitios que Venden 24/7',
  description: 'Creamos sitios web modernos y optimizados con React, Next.js y tecnologías de punta. Landing pages, e-commerce, aplicaciones web. Diseño UX/UI enfocado en conversión.',
  keywords: [
    'desarrollo web colombia',
    'desarrollo web medellin',
    'creacion paginas web',
    'diseño web profesional',
    'desarrollo react colombia',
    'next.js colombia',
    'agencia desarrollo web',
    'crear pagina web empresa',
    'ecommerce colombia',
    'landing page colombia'
  ],
  openGraph: {
    title: 'Desarrollo Web Profesional - TechFlow AI',
    description: 'Sitios web que convierten. Tecnología de punta, diseño impactante y resultados medibles.',
    images: ['/og-desarrollo-web.jpg'],
  },
}

export default function DesarrolloWebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}