"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CaseStudy } from '@/types/portfolio'

interface ProjectCardProps {
  project: CaseStudy
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/casos-de-exito/${project.slug}`}>
        <article className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ⭐ Destacado
              </span>
            </div>
          )}
          
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <Image
              src={project.images.thumbnail}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Category Badge */}
            <div className="absolute bottom-4 left-4 z-20">
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-900">
                {project.industry}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Client */}
            <p className="text-sm text-gray-600 mb-2">{project.client}</p>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {project.title}
            </h3>
            
            {/* Services */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.services.map((service, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700"
                >
                  {service}
                </span>
              ))}
            </div>
            
            {/* Key Results */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {project.results.slice(0, 2).map((result, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {result.metric}
                  </div>
                  <div className="text-xs text-gray-600">
                    {result.value}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Technologies */}
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {project.technologies.slice(0, 3).map((tech, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center"
                    title={tech}
                  >
                    <span className="text-xs font-medium text-gray-600">
                      {tech.charAt(0)}
                    </span>
                  </div>
                ))}
                {project.technologies.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      +{project.technologies.length - 3}
                    </span>
                  </div>
                )}
              </div>
              
              {/* CTA */}
              <span className="inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                Ver caso
                <svg
                  className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
            
            {/* Duration */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Proyecto completado en {project.duration}
              </p>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}