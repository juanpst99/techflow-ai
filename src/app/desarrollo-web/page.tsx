'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getWhatsAppLink } from '@/lib/client-config'

// Datos de servicios de desarrollo web
const webServices = [
  {
    id: 'landing-pages',
    title: 'Landing Pages de Alta Conversión',
    description: 'Páginas diseñadas con un único objetivo: convertir visitantes en clientes. Optimizadas para velocidad y SEO.',
    price: 'Desde $2.5M COP',
    timeline: '2-3 semanas',
    features: [
      'Diseño orientado a conversión',
      'Velocidad de carga < 2 segundos',
      'SEO On-Page optimizado',
      'Responsive en todos los dispositivos',
      'Integración con analytics',
      'A/B Testing incluido'
    ],
    ideal: 'Ideal para campañas de marketing, lanzamientos de productos, generación de leads.',
    icon: '🎯'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Profesional',
    description: 'Tiendas online completas con pasarelas de pago, gestión de inventario y experiencia de compra optimizada.',
    price: 'Desde $8M COP',
    timeline: '6-8 semanas',
    features: [
      'Catálogo de productos ilimitado',
      'Pasarelas de pago integradas',
      'Gestión de inventario',
      'Sistema de envíos',
      'Panel de administración',
      'Notificaciones automáticas'
    ],
    ideal: 'Perfecto para retailers, marcas de moda, productos digitales, cualquier negocio B2C.',
    icon: '🛒'
  },
  {
    id: 'corporativo',
    title: 'Sitio Web Corporativo',
    description: 'Presencia digital profesional que refleja la identidad de tu marca y genera confianza en clientes potenciales.',
    price: 'Desde $5M COP',
    timeline: '4-6 semanas',
    features: [
      'Diseño personalizado de marca',
      'Secciones ilimitadas',
      'Blog integrado',
      'Formularios de contacto',
      'Integración con CRM',
      'Multi-idioma opcional'
    ],
    ideal: 'Esencial para empresas B2B, servicios profesionales, instituciones.',
    icon: '🏢'
  },
  {
    id: 'web-apps',
    title: 'Aplicaciones Web Complejas',
    description: 'Sistemas web personalizados, dashboards, plataformas SaaS y soluciones enterprise con tecnología de punta.',
    price: 'Desde $15M COP',
    timeline: '2-6 meses',
    features: [
      'Desarrollo a medida',
      'Arquitectura escalable',
      'APIs y microservicios',
      'Seguridad avanzada',
      'Integración con sistemas',
      'Soporte y mantenimiento'
    ],
    ideal: 'Para startups tecnológicas, empresas con procesos complejos, plataformas digitales.',
    icon: '⚡'
  }
]

const technologies = [
  { name: 'React.js', category: 'Frontend', icon: '⚛️', description: 'Interfaces dinámicas y rápidas' },
  { name: 'Next.js', category: 'Framework', icon: '▲', description: 'SEO y performance optimizados' },
  { name: 'TypeScript', category: 'Lenguaje', icon: '🔷', description: 'Código robusto y mantenible' },
  { name: 'Tailwind CSS', category: 'Estilos', icon: '🎨', description: 'Diseños modernos y responsivos' },
  { name: 'Node.js', category: 'Backend', icon: '🟢', description: 'Servidores rápidos y escalables' },
  { name: 'PostgreSQL', category: 'Database', icon: '🐘', description: 'Datos seguros y estructurados' },
  { name: 'AWS', category: 'Cloud', icon: '☁️', description: 'Infraestructura global confiable' },
  { name: 'Vercel', category: 'Deploy', icon: '🚀', description: 'Deploy instantáneo y CDN global' }
]

const process = [
  {
    phase: 'Descubrimiento',
    duration: '1-2 días',
    description: 'Entendemos tu negocio, objetivos y audiencia target.',
    activities: [
      'Reunión de kick-off',
      'Análisis de competencia',
      'Definición de objetivos',
      'Arquitectura de información'
    ]
  },
  {
    phase: 'Diseño UI/UX',
    duration: '1 semana',
    description: 'Creamos diseños que enamoran y convierten.',
    activities: [
      'Wireframes y prototipos',
      'Diseño visual completo',
      'Experiencia de usuario',
      'Revisiones y ajustes'
    ]
  },
  {
    phase: 'Desarrollo',
    duration: '2-4 semanas',
    description: 'Programamos con las mejores tecnologías del mercado.',
    activities: [
      'Desarrollo frontend',
      'Integración backend',
      'Optimización SEO',
      'Testing riguroso'
    ]
  },
  {
    phase: 'Lanzamiento',
    duration: '2-3 días',
    description: 'Deploy profesional y monitoreo post-lanzamiento.',
    activities: [
      'Configuración hosting',
      'Migración segura',
      'Monitoreo 24/7',
      'Soporte continuo'
    ]
  }
]

const faqs = [
  {
    question: '¿Cuánto tiempo toma desarrollar un sitio web?',
    answer: 'Depende de la complejidad. Una landing page toma 2-3 semanas, un sitio corporativo 4-6 semanas, y un e-commerce completo 6-8 semanas. Aplicaciones complejas pueden tomar 2-6 meses.'
  },
  {
    question: '¿Qué incluye el servicio de desarrollo web?',
    answer: 'Incluye: diseño UI/UX personalizado, desarrollo completo, optimización SEO, configuración de hosting, capacitación para administrar el sitio, y 3 meses de soporte post-lanzamiento.'
  },
  {
    question: '¿Puedo administrar el contenido por mi cuenta?',
    answer: 'Absolutamente. Todos nuestros sitios incluyen un CMS (sistema de gestión de contenido) fácil de usar. Además, te capacitamos para que puedas hacer cambios sin depender de programadores.'
  },
  {
    question: '¿Los sitios son optimizados para móviles?',
    answer: '100% responsive. Todos nuestros desarrollos funcionan perfectamente en móviles, tablets y desktop. Además, priorizamos la experiencia móvil siguiendo el mobile-first de Google.'
  },
  {
    question: '¿Incluyen posicionamiento SEO?',
    answer: 'Sí, incluimos SEO técnico on-page: estructura semántica, meta tags, schema markup, sitemap, velocidad optimizada y más. El SEO off-page y content marketing son servicios adicionales.'
  },
  {
    question: '¿Qué pasa después del lanzamiento?',
    answer: 'Incluimos 3 meses de soporte gratuito para ajustes menores. Después ofrecemos planes de mantenimiento mensual que incluyen actualizaciones, backups, monitoreo y cambios pequeños.'
  }
]

const portfolio = [
  {
    title: 'E-commerce Fashion Store',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    metrics: '+312% ventas, 2.5s carga',
    tech: ['Next.js', 'Stripe', 'Vercel']
  },
  {
    title: 'Plataforma Educativa',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    metrics: '10K usuarios, 4.8★ rating',
    tech: ['React', 'Node.js', 'AWS']
  },
  {
    title: 'Portal Inmobiliario',
    category: 'Corporativo',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    metrics: 'Top 3 Google, +420% leads',
    tech: ['Next.js', 'PostgreSQL', 'Maps API']
  }
]

export default function DesarrolloWebPage() {
  const [selectedService, setSelectedService] = useState(webServices[0])
  const [activePhase, setActivePhase] = useState(0)

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                <span className="mr-2">💻</span>
                Desarrollo Web de Nueva Generación
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                Sitios Web que{' '}
                <span className="text-gradient">Venden 24/7</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Creamos experiencias digitales que convierten visitantes en clientes. 
                Tecnología de punta, diseño impactante y resultados medibles.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="#servicios"
                  className="btn-primary"
                >
                  Ver Servicios y Precios
                </Link>
                <Link
                  href="/herramientas/calculadora-web"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Calcular Costo Online
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '50+', label: 'Sitios Desarrollados' },
                  { value: '<2s', label: 'Tiempo de Carga' },
                  { value: '100/100', label: 'PageSpeed Score' },
                  { value: '99.9%', label: 'Uptime Garantizado' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Servicios de Desarrollo Web
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluciones adaptadas a cada etapa y necesidad de tu negocio
              </p>
            </motion.div>

            {/* Calculator CTA Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 md:p-8 mb-12 text-white text-center"
            >
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-3">
                  🧮 ¿Quieres saber cuánto costaría tu proyecto?
                </h3>
                <p className="text-white/90 mb-4">
                  Usa nuestra calculadora interactiva y obtén un estimado instantáneo
                </p>
                <Link
                  href="/herramientas/calculadora-web"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
                >
                  Calcular Costo Ahora
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Service Selector */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  {webServices.map((service) => (
                    <motion.button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full text-left p-4 rounded-xl transition-all duration-300
                        ${selectedService.id === service.id 
                          ? 'bg-primary-500 text-white shadow-lg' 
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{service.icon}</span>
                            <h3 className="font-semibold">{service.title}</h3>
                          </div>
                          <p className={`text-sm mt-1 ${
                            selectedService.id === service.id ? 'text-white/90' : 'text-gray-600'
                          }`}>
                            {service.price} • {service.timeline}
                          </p>
                        </div>
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            selectedService.id === service.id ? 'rotate-90' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Service Details */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedService.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedService.title}
                        </h3>
                        <p className="text-gray-600">
                          {selectedService.description}
                        </p>
                      </div>
                      <span className="text-4xl">{selectedService.icon}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-primary-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary-900 mb-1">Inversión</h4>
                        <p className="text-2xl font-bold text-primary-600">{selectedService.price}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-1">Tiempo de Entrega</h4>
                        <p className="text-2xl font-bold text-green-600">{selectedService.timeline}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Incluye:</h4>
                      <ul className="space-y-2">
                        {selectedService.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg mb-6">
                      <p className="text-sm text-gray-600">
                        <strong>Ideal para:</strong> {selectedService.ideal}
                      </p>
                    </div>

                    <Link
                      href="/contacto"
                      className="btn-primary w-full text-center"
                    >
                      Solicitar Cotización para {selectedService.title}
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Stack Tecnológico de Vanguardia
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Utilizamos las tecnologías más modernas y confiables del mercado
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {technologies.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{tech.category}</p>
                  <p className="text-sm text-gray-700">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Proceso de Desarrollo Transparente
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Metodología ágil con comunicación constante y entregas incrementales
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {/* Process Timeline */}
              <div className="relative">
                {/* Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                
                {process.map((phase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative flex items-start mb-12 last:mb-0"
                  >
                    {/* Number */}
                    <div className={`
                      relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold
                      ${activePhase === idx 
                        ? 'bg-primary-500 text-white shadow-lg scale-110' 
                        : 'bg-white text-gray-700 border-2 border-gray-300'
                      }
                      transition-all duration-300 cursor-pointer
                    `}
                    onClick={() => setActivePhase(idx)}
                    >
                      {idx + 1}
                    </div>

                    {/* Content */}
                    <div className="ml-8 flex-1">
                      <div className={`
                        p-6 rounded-xl transition-all duration-300
                        ${activePhase === idx 
                          ? 'bg-white shadow-xl' 
                          : 'bg-gray-100'
                        }
                      `}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900">{phase.phase}</h3>
                          <span className="text-sm text-gray-600">{phase.duration}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{phase.description}</p>
                        
                        <AnimatePresence>
                          {activePhase === idx && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-2"
                            >
                              {phase.activities.map((activity, actIdx) => (
                                <li key={actIdx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  {activity}
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Preview */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Proyectos Recientes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Algunos de los sitios web que hemos desarrollado
              </p>
              <Link
                href="/casos-de-exito"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                Ver Portfolio Completo
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {portfolio.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    
                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="text-sm text-gray-300 mb-1">{project.category}</div>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-300 mb-3">{project.metrics}</p>
                      <div className="flex gap-2">
                        {project.tech.map((tech, techIdx) => (
                          <span key={techIdx} className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Preguntas Frecuentes
              </h2>
              
              <div className="space-y-6">
                {faqs.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
                ¿Listo para tener un sitio web que venda?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Agenda una consultoría gratuita y descubre cómo podemos crear 
                la presencia digital perfecta para tu negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl"
                >
                  Solicitar Cotización Gratis
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <a
                  href={getWhatsAppLink('Hola! Necesito un sitio web profesional')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}