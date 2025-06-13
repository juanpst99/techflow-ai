import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Casos de Éxito - Proyectos que Transforman Negocios',
  description: 'Descubre cómo hemos ayudado a más de 150 empresas a multiplicar sus resultados con marketing digital, automatización e inteligencia artificial.',
  openGraph: {
    title: 'Casos de Éxito - TechFlow AI',
    description: 'Proyectos reales con resultados medibles. Descubre cómo transformamos negocios.',
  },
}

export default function CasosDeExitoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}