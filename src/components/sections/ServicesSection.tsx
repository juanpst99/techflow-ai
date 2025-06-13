"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const services = [
  {
    id: 'marketing-digital',
    title: 'Marketing Digital Estratégico',
    description: 'Campañas integrales que combinan Facebook Ads, Google Ads, email marketing y contenido para maximizar tu ROI.',
    icon: '📈',
    features: [
      'Campañas en Facebook & Instagram Ads',
      'Google Ads (Search, Display, Shopping)',
      'Email Marketing Automatizado',
      'Marketing de Contenidos',
      'Análisis y Optimización Continua'
    ],
    benefits: [
      { metric: '3.5x', label: 'Retorno de Inversión' },
      { metric: '-45%', label: 'Costo por Adquisición' },
      { metric: '+250%', label: 'Leads Calificados' }
    ],
    color: 'from-blue-500 to-cyan-600',
    href: '/servicios/marketing-digital'
  },
  {
    id: 'automatizacion',
    title: 'Automatización de Procesos',
    description: 'Transformamos operaciones manuales en flujos automatizados usando n8n, Zapier y Make, liberando tiempo valioso.',
    icon: '⚙️',
    features: [
      'Automatización de Ventas',
      'Flujos de Trabajo Personalizados',
      'Integración de Herramientas',
      'Automatización de Marketing',
      'Reportes Automáticos'
    ],
    benefits: [
      { metric: '80%', label: 'Ahorro de Tiempo' },
      { metric: '0', label: 'Errores Humanos' },
      { metric: '24/7', label: 'Operación Continua' }
    ],
    color: 'from-purple-500 to-pink-600',
    href: '/servicios/automatizacion'
  },
  {
    id: 'chatbots-ia',
    title: 'Chatbots & Asistentes IA',
    description: 'Creamos asistentes virtuales inteligentes que atienden clientes 24/7, califican leads y aumentan ventas.',
    icon: '🤖',
    features: [
      'Chatbots con IA Conversacional',
      'Integración WhatsApp Business',
      'Calificación Automática de Leads',
      'Respuestas Personalizadas',
      'Análisis de Sentimiento'
    ],
    benefits: [
      { metric: '90%', label: 'Satisfacción Cliente' },
      { metric: '24/7', label: 'Disponibilidad' },
      { metric: '+60%', label: 'Conversión de Leads' }
    ],
    color: 'from-green-500 to-emerald-600',
    href: '/servicios/chatbots-ia'
  },
  {
    id: 'seo-avanzado',
    title: 'SEO & Posicionamiento IA',
    description: 'Optimización avanzada para dominar Google y ser encontrado por motores de IA como ChatGPT y Perplexity.',
    icon: '🔍',
    features: [
      'Auditoría SEO Completa',
      'Optimización On-Page y Off-Page',
      'Contenido Optimizado para IA',
      'Link Building Estratégico',
      'Schema Markup Avanzado'
    ],
    benefits: [
      { metric: '+300%', label: 'Tráfico Orgánico' },
      { metric: 'Top 3', label: 'Rankings Google' },
      { metric: '100%', label: 'Visibilidad IA' }
    ],
    color: 'from-orange-500 to-red-600',
    href: '/servicios/seo'
  }
]

export default function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium mb-6">
            <span className="mr-2">✨</span>
            Servicios que Transforman Negocios
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            Soluciones Integrales de{' '}
            <span className="text-gradient-reverse">Marketing & Tecnología</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Combinamos estrategias de marketing digital probadas con automatización inteligente 
            e inteligencia artificial para multiplicar los resultados de tu negocio.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative"
            >
              <div className={`
                relative overflow-hidden rounded-2xl border-2 border-gray-200 
                bg-white p-8 transition-all duration-500 
                ${hoveredService === service.id ? 'border-transparent shadow-2xl scale-[1.02]' : 'hover:border-gray-300'}
              `}>
                {/* Background Gradient on Hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 
                  transition-opacity duration-500
                  ${hoveredService === service.id ? 'opacity-5' : ''}
                `} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`
                        text-4xl p-3 rounded-xl bg-gradient-to-br ${service.color} 
                        bg-opacity-10 transition-transform duration-300
                        ${hoveredService === service.id ? 'scale-110 rotate-3' : ''}
                      `}>
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                      Incluye:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 * idx }}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {service.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 * idx }}
                        className="text-center"
                      >
                        <div className={`text-2xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                          {benefit.metric}
                        </div>
                        <div className="text-xs text-gray-600">{benefit.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={service.href}
                    className={`
                      inline-flex items-center justify-center w-full px-6 py-3 
                      font-semibold rounded-lg transition-all duration-300
                      ${hoveredService === service.id 
                        ? 'bg-gradient-to-r ' + service.color + ' text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                    `}
                  >
                    Conocer más
                    <svg
                      className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                        hoveredService === service.id ? 'translate-x-1' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            ¿No estás seguro de qué servicio necesitas?
          </p>
          <Link
            href="/contacto"
            className="btn-primary inline-flex items-center"
          >
            Recibe una Consultoría Gratuita
            <svg
              className="w-5 h-5 ml-2"
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
        </motion.div>
      </div>
    </section>
  )
}