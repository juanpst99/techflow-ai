'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WebCostCalculator from '@/components/tools/WebCostCalculator'
import Link from 'next/link'

export default function CalculadoraWebPage() {
  const benefits = [
    {
      icon: '💰',
      title: 'Presupuesto Transparente',
      description: 'Conoce el rango de inversión antes de contactarnos'
    },
    {
      icon: '⏰',
      title: 'Estimado de Tiempo',
      description: 'Planifica tu proyecto con tiempos realistas'
    },
    {
      icon: '📋',
      title: 'Cotización Detallada',
      description: 'Recibe un desglose completo por email'
    },
    {
      icon: '🎯',
      title: 'Sin Compromisos',
      description: 'Explora opciones sin presión de venta'
    }
  ]

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-30"></div>
          </div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                <span className="mr-2">🧮</span>
                Herramienta Gratuita
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
                Calcula el Costo de tu{' '}
                <span className="text-gradient">Sitio Web</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                Obtén un estimado instantáneo y transparente para tu proyecto web. 
                Personaliza cada detalle y conoce la inversión necesaria en menos de 2 minutos.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl mb-2">{benefit.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <WebCostCalculator />
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ¿Por qué los precios varían tanto?
                </h2>
                <p className="text-xl text-gray-600">
                  Cada proyecto web es único. Aquí los factores principales:
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Complejidad del Diseño',
                    description: 'Un diseño personalizado requiere más tiempo de conceptualización, iteraciones y refinamiento que usar una plantilla.',
                    icon: '🎨'
                  },
                  {
                    title: 'Funcionalidades Especiales',
                    description: 'Integraciones con APIs, sistemas de pago, multi-idioma y otras características aumentan el tiempo de desarrollo.',
                    icon: '⚙️'
                  },
                  {
                    title: 'Número de Páginas',
                    description: 'Más páginas significa más contenido que estructurar, diseñar y optimizar para diferentes dispositivos.',
                    icon: '📄'
                  },
                  {
                    title: 'Tiempo de Entrega',
                    description: 'Los proyectos urgentes requieren más recursos y horas extra para cumplir con plazos ajustados.',
                    icon: '⏱️'
                  }
                ].map((factor, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl">
                      {factor.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{factor.title}</h3>
                      <p className="text-gray-600">{factor.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Preguntas Frecuentes sobre Costos
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    q: '¿El estimado es el precio final?',
                    a: 'El estimado es un rango basado en las características seleccionadas. El precio final se determina después de una reunión detallada donde entendemos todos los requisitos específicos de tu proyecto.'
                  },
                  {
                    q: '¿Qué incluye el precio?',
                    a: 'Incluye: diseño completo, desarrollo, configuración de hosting, optimización SEO básica, capacitación y 3 meses de soporte post-lanzamiento. No incluye: dominio, hosting mensual, o mantenimiento después de los 3 meses.'
                  },
                  {
                    q: '¿Hay costos ocultos?',
                    a: 'No. Somos transparentes con nuestros precios. Cualquier funcionalidad adicional que surja durante el proyecto se cotiza y aprueba antes de implementarse.'
                  },
                  {
                    q: '¿Ofrecen planes de pago?',
                    a: 'Sí, trabajamos con 50% de anticipo y 50% al entregar. Para proyectos grandes ofrecemos planes de 3-4 pagos. También aceptamos tarjetas de crédito con pequeño recargo.'
                  }
                ].map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600">
                      {faq.a}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Tienes un proyecto más complejo?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Para proyectos empresariales, plataformas SaaS o aplicaciones web complejas, 
                agenda una consultoría personalizada con nuestro equipo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl"
                >
                  Agendar Consultoría
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </Link>
                <Link
                  href="/desarrollo-web"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105"
                >
                  Ver Servicios de Desarrollo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}