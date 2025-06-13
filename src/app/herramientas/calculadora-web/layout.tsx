import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de Costos Web - Cotiza tu Proyecto Online',
  description: 'Calcula el costo de tu sitio web en segundos. Obtén un estimado transparente para landing pages, e-commerce, aplicaciones web y más. Herramienta gratuita.',
  keywords: [
    'calculadora costo pagina web',
    'cuanto cuesta una pagina web',
    'precio desarrollo web colombia',
    'cotizar pagina web',
    'calculadora web online',
    'presupuesto sitio web',
    'costo ecommerce colombia',
    'precio landing page'
  ],
  openGraph: {
    title: 'Calculadora de Costos Web - TechFlow AI',
    description: 'Descubre cuánto cuesta tu proyecto web. Estimado instantáneo y transparente.',
    type: 'website',
  },
}

export default function CalculadoraWebLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}