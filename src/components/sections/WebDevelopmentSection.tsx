"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

const technologies = [
  { name: 'React.js', icon: '⚛️', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Next.js', icon: '▲', color: 'from-gray-700 to-gray-900' },
  { name: 'TypeScript', icon: 'TS', color: 'from-blue-500 to-blue-700' },
  { name: 'Tailwind CSS', icon: '🎨', color: 'from-teal-400 to-blue-600' },
  { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-green-700' },
  { name: 'AI Integration', icon: '🤖', color: 'from-purple-500 to-pink-600' },
]

const features = [
  {
    title: 'Optimización SEO & IA',
    description: 'Sitios web preparados para dominar los rankings de Google y ser perfectamente interpretados por motores de IA como ChatGPT y Bard.',
    icon: '🔍',
    stats: '300% más visibilidad',
  },
  {
    title: 'Velocidad Extrema',
    description: 'Performance optimizada con lazy loading, CDN global y técnicas avanzadas. Puntuación perfecta en Core Web Vitals.',
    icon: '⚡',
    stats: '<0.5s carga inicial',
  },
  {
    title: 'Diseño que Convierte',
    description: 'UX/UI basado en psicología del consumidor y neuromarketing. Cada elemento diseñado para maximizar conversiones.',
    icon: '🎯',
    stats: '+68% tasa conversión',
  },
  {
    title: 'Seguridad Máxima',
    description: 'Protección contra ataques DDoS, SSL avanzado, backups automáticos y monitoreo 24/7 de vulnerabilidades.',
    icon: '🛡️',
    stats: '99.9% uptime garantizado',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Análisis Estratégico',
    description: 'Estudiamos tu negocio, competencia y objetivos para crear una estrategia digital ganadora.',
  },
  {
    number: '02',
    title: 'Diseño con IA',
    description: 'Utilizamos herramientas de IA para crear diseños únicos que resuenan con tu audiencia objetivo.',
  },
  {
    number: '03',
    title: 'Desarrollo Ágil',
    description: 'Programación con las últimas tecnologías, siguiendo mejores prácticas y estándares internacionales.',
  },
  {
    number: '04',
    title: 'Optimización Continua',
    description: 'Análisis de datos en tiempo real y ajustes constantes para maximizar resultados.',
  },
]

export default function WebDevelopmentSection() {
  const [hoveredTech, setHoveredTech] = useState<number | null>(null)
  const [selectedFeature, setSelectedFeature] = useState(0)

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Desarrollo Web de Nueva Generación
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            Creamos Experiencias Digitales que{' '}
            <span className="text-gradient">Transforman Negocios</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Desarrollamos sitios web que no solo se ven increíbles, sino que están diseñados 
            para <strong>dominar motores de búsqueda</strong>, <strong>convertir visitantes en clientes</strong> y 
            <strong> preparados para la era de la IA</strong>. Tecnología de punta al servicio de tu éxito.
          </p>
        </motion.div>

        {/* Technologies Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Tecnologías de Vanguardia
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredTech(index)}
                onMouseLeave={() => setHoveredTech(null)}
                className="relative group"
              >
                <div className={cn(
                  "relative p-6 rounded-xl border-2 border-gray-200 bg-white cursor-pointer transition-all duration-300",
                  hoveredTech === index && "border-primary-500 shadow-xl scale-110 z-10"
                )}>
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 rounded-xl transition-opacity duration-300",
                    tech.color,
                    hoveredTech === index && "opacity-10"
                  )} />
                  <div className="relative text-center">
                    <div className="text-3xl mb-2">{tech.icon}</div>
                    <div className="text-sm font-medium text-gray-700">{tech.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Características que Marcan la Diferencia
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setSelectedFeature(index)}
                  className={cn(
                    "p-6 rounded-xl cursor-pointer transition-all duration-300",
                    selectedFeature === index
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl scale-105"
                      : "bg-white border-2 border-gray-200 hover:border-primary-300"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={cn(
                          "text-lg font-semibold",
                          selectedFeature === index ? "text-white" : "text-gray-900"
                        )}>
                          {feature.title}
                        </h4>
                        <span className={cn(
                          "text-sm font-bold",
                          selectedFeature === index ? "text-white/90" : "text-primary-600"
                        )}>
                          {feature.stats}
                        </span>
                      </div>
                      <p className={cn(
                        "text-sm",
                        selectedFeature === index ? "text-white/90" : "text-gray-600"
                      )}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Mockup Browser */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 p-8">
                <div className="bg-white/10 backdrop-blur-md rounded-xl h-full p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1 ml-4">
                      <div className="bg-white/20 rounded h-6 w-3/4"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded h-32"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/20 rounded h-20"></div>
                      <div className="bg-white/20 rounded h-20"></div>
                      <div className="bg-white/20 rounded h-20"></div>
                    </div>
                    <div className="bg-white/20 rounded h-24"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-10 right-10 bg-white rounded-lg shadow-xl p-4"
              >
                <div className="text-2xl font-bold text-green-600">100</div>
                <div className="text-xs text-gray-600">PageSpeed</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-10 bg-white rounded-lg shadow-xl p-4"
              >
                <div className="text-2xl font-bold text-primary-600">+68%</div>
                <div className="text-xs text-gray-600">Conversión</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nuestro Proceso Probado
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></div>
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white text-3xl font-bold mb-4 shadow-xl">
                    {step.number}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-12 shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para Revolucionar tu Presencia Digital?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a las empresas colombianas que ya están dominando el mercado digital 
            con sitios web de última generación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-4 font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              Solicitar Cotización Gratis
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/casos-de-exito"
              className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105"
            >
              Ver Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Utility function (si no la tienes ya)
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}