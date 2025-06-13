"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

const reasons = [
  {
    title: 'Pioneros en IA en Colombia',
    description: 'Somos la primera agencia colombiana que integra IA generativa en cada aspecto del marketing digital, desde la creación de contenido hasta la automatización de procesos.',
    icon: '🧠',
    stats: { number: '100%', label: 'Proyectos con IA' }
  },
  {
    title: 'Resultados Garantizados',
    description: 'No prometemos, demostramos. Cada estrategia está respaldada por datos y optimizada continuamente para superar los KPIs acordados.',
    icon: '📊',
    stats: { number: '3.5x', label: 'ROI Promedio' }
  },
  {
    title: 'Equipo Experto Local',
    description: 'Profesionales colombianos que entienden el mercado local, con certificaciones internacionales en Google, Meta, y las principales plataformas.',
    icon: '👥',
    stats: { number: '15+', label: 'Certificaciones' }
  },
  {
    title: 'Tecnología de Vanguardia',
    description: 'Utilizamos las herramientas más avanzadas del mercado: GPT-4, Claude, n8n, Make, y desarrollos propios que nos dan ventaja competitiva.',
    icon: '🚀',
    stats: { number: '50+', label: 'Herramientas IA' }
  },
  {
    title: 'Enfoque Data-Driven',
    description: 'Cada decisión está basada en análisis profundo de datos. Usamos IA para predecir tendencias y optimizar campañas en tiempo real.',
    icon: '📈',
    stats: { number: '24/7', label: 'Monitoreo' }
  },
  {
    title: 'Soporte Dedicado',
    description: 'Un equipo dedicado a tu cuenta, disponible cuando lo necesites. Reportes semanales y comunicación transparente en cada etapa.',
    icon: '💬',
    stats: { number: '2hrs', label: 'Respuesta Max' }
  }
]

const testimonials = [
  {
    quote: "TechFlow AI transformó completamente nuestra estrategia digital. En 6 meses triplicamos nuestras ventas online y redujimos costos operativos en un 40%.",
    author: "María Rodríguez",
    position: "CEO, TechStartup Colombia",
    rating: 5
  },
  {
    quote: "La automatización que implementaron nos ahorró 120 horas al mes. Ahora nuestro equipo se enfoca en estrategia mientras los procesos corren solos.",
    author: "Carlos Mendoza",
    position: "Director de Marketing, Retail Corp",
    rating: 5
  },
  {
    quote: "Su chatbot con IA maneja el 80% de consultas de clientes. La satisfacción subió al 95% y las ventas nocturnas aumentaron un 200%.",
    author: "Ana Gómez",
    position: "Gerente E-commerce, Fashion Brand",
    rating: 5
  }
]

const achievements = [
  { icon: '🏆', label: 'Google Partner', year: '2024' },
  { icon: '🥇', label: 'Meta Business Partner', year: '2024' },
  { icon: '🌟', label: 'Top AI Agency Colombia', year: '2024' },
  { icon: '🚀', label: 'Startup del Año', year: '2023' }
]

export default function WhyChooseUsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium mb-6">
            <span className="mr-2">⭐</span>
            La Diferencia TechFlow AI
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            Por Qué Somos la{' '}
            <span className="text-gradient">Mejor Opción</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            No somos otra agencia más. Somos tu socio estratégico en la transformación digital, 
            combinando experiencia local con tecnología global de punta.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-primary-300 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{reason.stats.number}</div>
                    <div className="text-xs text-gray-600">{reason.stats.label}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl mb-2">{achievement.icon}</div>
                  <div className="text-white font-semibold">{achievement.label}</div>
                  <div className="text-white/80 text-sm">{achievement.year}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lo Que Dicen Nuestros Clientes
          </h3>
          
          <div className="relative">
            {/* Testimonial Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeTestimonial === index ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className={activeTestimonial === index ? 'block' : 'hidden'}
                >
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-8 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600">{testimonial.position}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index 
                      ? 'bg-primary-500 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Únete a más de 150 empresas que ya confían en nosotros
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="btn-primary"
            >
              Comenzar mi Transformación Digital
            </a>
            <a
              href="/casos-de-exito"
              className="btn-outline"
            >
              Ver Casos de Éxito
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}