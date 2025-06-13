'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CaseStudy } from '@/types/portfolio'
import { caseStudies } from '@/data/portfolio'

interface CaseStudyDetailProps {
  caseStudy: CaseStudy
}

export default function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={caseStudy.images.hero}
            alt={caseStudy.title}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/80" />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/casos-de-exito" className="hover:text-white transition-colors">
                Casos de Éxito
              </Link>
              <span>/</span>
              <span className="text-white">{caseStudy.client}</span>
            </nav>

            {/* Client & Industry */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium">
                {caseStudy.client}
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 text-primary-300 text-sm font-medium">
                {caseStudy.industry}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              {caseStudy.title}
            </h1>
            
            {/* Services */}
            <div className="flex flex-wrap gap-3 mb-8">
              {caseStudy.services.map((service, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white text-sm font-medium"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {caseStudy.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {result.icon} {result.metric}
                  </div>
                  <div className="text-sm text-gray-300">
                    {result.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                🎯 El Desafío
              </h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                💡 La Solución
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {caseStudy.solution}
                </p>
                
                {/* Technologies Used */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">
                    Tecnologías Utilizadas:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-white text-sm font-medium text-gray-700 border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results Detail */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                📈 Resultados Obtenidos
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {caseStudy.results.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{result.icon}</div>
                      <div>
                        <div className="text-3xl font-bold text-green-700 mb-1">
                          {result.metric}
                        </div>
                        <div className="text-lg font-semibold text-gray-900 mb-2">
                          {result.value}
                        </div>
                        <p className="text-gray-600">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 lg:p-12 rounded-2xl">
                  <svg
                    className="w-12 h-12 text-primary-400 mb-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="text-xl lg:text-2xl text-gray-700 mb-6 italic">
                    {caseStudy.testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-4">
                    {caseStudy.testimonial.avatar && (
                      <Image
                        src={caseStudy.testimonial.avatar}
                        alt={caseStudy.testimonial.author}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">
                        {caseStudy.testimonial.author}
                      </div>
                      <div className="text-gray-600">
                        {caseStudy.testimonial.position} en {caseStudy.testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Gallery */}
            {caseStudy.images.gallery && caseStudy.images.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  📸 Galería del Proyecto
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {caseStudy.images.gallery.map((image, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative h-64 rounded-xl overflow-hidden shadow-lg"
                    >
                      <Image
                        src={image}
                        alt={`${caseStudy.title} - Imagen ${idx + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Información del Proyecto
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Cliente</div>
                  <div className="font-semibold text-gray-900">{caseStudy.client}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Industria</div>
                  <div className="font-semibold text-gray-900">{caseStudy.industry}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Duración</div>
                  <div className="font-semibold text-gray-900">{caseStudy.duration}</div>
                </div>
              </div>
            </motion.div>
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
              ¿Quieres resultados similares para tu negocio?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Agenda una consultoría gratuita y descubramos juntos cómo multiplicar 
              tus resultados con estrategias probadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-primary-600 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                Solicitar Consultoría Gratis
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
              <Link
                href="/casos-de-exito"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105"
              >
                Ver Más Casos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Cases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Casos Relacionados
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies
              .filter(study => study.id !== caseStudy.id && study.category === caseStudy.category)
              .slice(0, 3)
              .map((relatedCase) => (
                <Link
                  key={relatedCase.id}
                  href={`/casos-de-exito/${relatedCase.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative h-48">
                      <Image
                        src={relatedCase.images.thumbnail}
                        alt={relatedCase.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-600 mb-2">{relatedCase.client}</p>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {relatedCase.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}