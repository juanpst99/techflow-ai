"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'

// Schema de validación
const contactSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  
  email: z.string()
    .email('Por favor ingresa un email válido')
    .min(1, 'El email es requerido'),
  
  phone: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .regex(/^[0-9+\-\s()]+$/, 'Por favor ingresa un número de teléfono válido'),
  
  company: z.string()
    .min(2, 'El nombre de la empresa debe tener al menos 2 caracteres')
    .optional()
    .or(z.literal('')),
  
  service: z.string()
    .min(1, 'Por favor selecciona un servicio'),
  
  budget: z.string()
    .min(1, 'Por favor selecciona un presupuesto'),
  
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede tener más de 1000 caracteres'),
  
  consent: z.boolean()
    .refine(val => val === true, 'Debes aceptar la política de privacidad'),
})

type ContactFormData = z.infer<typeof contactSchema>

const services = [
  { value: 'marketing-digital', label: 'Marketing Digital' },
  { value: 'automatizacion', label: 'Automatización de Procesos' },
  { value: 'chatbots-ia', label: 'Chatbots & IA' },
  { value: 'desarrollo-web', label: 'Desarrollo Web' },
  { value: 'seo', label: 'SEO & Posicionamiento' },
  { value: 'consultoria', label: 'Consultoría Integral' },
]

const budgetRanges = [
  { value: '0-1m', label: 'Menos de $1M COP' },
  { value: '1m-3m', label: '$1M - $3M COP' },
  { value: '3m-5m', label: '$3M - $5M COP' },
  { value: '5m-10m', label: '$5M - $10M COP' },
  { value: '10m+', label: 'Más de $10M COP' },
  { value: 'consultar', label: 'Prefiero consultarlo' },
]

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      consent: false,
    }
  })

  const selectedService = watch('service')

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Aquí puedes integrar con tu backend preferido
      // Opciones: API Route de Next.js, Formspree, EmailJS, etc.
      
      // Ejemplo con API Route de Next.js:
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'contact-form',
        }),
      })

      if (!response.ok) throw new Error('Error al enviar el formulario')

      // Tracking de conversión
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-XXXXXXXXX/XXXXXXXXX', // Reemplazar con tu ID
          'value': 1.0,
          'currency': 'COP',
        })
      }

      // Facebook Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: data.service,
          content_category: 'Contact Form',
          value: 1.0,
          currency: 'COP',
        })
      }

      setSubmitStatus('success')
      setSubmitMessage('¡Gracias por contactarnos! Te responderemos en menos de 2 horas.')
      reset()
      
      // Redirigir a página de gracias después de 3 segundos
      setTimeout(() => {
        window.location.href = '/gracias'
      }, 3000)

    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
      setSubmitMessage('Hubo un error al enviar el formulario. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nombre y Email */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo *
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200
              ${errors.name 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2
            `}
            placeholder="Juan Pérez"
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.name.message}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200
              ${errors.email 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2
            `}
            placeholder="juan@empresa.com"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Teléfono y Empresa */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono *
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200
              ${errors.phone 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2
            `}
            placeholder="+57 300 123 4567"
          />
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.phone.message}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Empresa (opcional)
          </label>
          <input
            {...register('company')}
            type="text"
            id="company"
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200
              ${errors.company 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2
            `}
            placeholder="Mi Empresa SAS"
          />
          {errors.company && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.company.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Servicio y Presupuesto */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
            Servicio de interés *
          </label>
          <select
            {...register('service')}
            id="service"
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200
              ${errors.service 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2
            `}
          >
            <option value="">Selecciona un servicio</option>
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.service.message}
            </motion.p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            Presupuesto mensual *
          </label>
          <select
            {...register('budget')}
            id="budget"
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200
              ${errors.budget 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2
            `}
          >
            <option value="">Selecciona un rango</option>
            {budgetRanges.map((budget) => (
              <option key={budget.value} value={budget.value}>
                {budget.label}
              </option>
            ))}
          </select>
          {errors.budget && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-red-600"
            >
              {errors.budget.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Cuéntanos sobre tu proyecto *
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200
            ${errors.message 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
            }
            focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none
          `}
          placeholder="Describe brevemente tu proyecto, objetivos y cualquier información relevante..."
        />
        {errors.message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.message.message}
          </motion.p>
        )}
      </div>

      {/* Consentimiento */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register('consent')}
            type="checkbox"
            className="mt-1 w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-600">
            Acepto la <a href="/privacidad" className="text-primary-600 hover:underline">política de privacidad</a> y 
            autorizo a TechFlow AI a contactarme con información sobre sus servicios.
          </span>
        </label>
        {errors.consent && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.consent.message}
          </motion.p>
        )}
      </div>

      {/* Submit Button y Status */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full px-8 py-4 rounded-lg font-semibold text-white
            transition-all duration-200 transform
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:scale-[1.02] hover:shadow-xl'
            }
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          ) : (
            'Enviar Solicitud'
          )}
        </button>

        {/* Status Messages */}
        <AnimatePresence>
          {submitStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`
                mt-4 p-4 rounded-lg text-center
                ${submitStatus === 'success' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
                }
              `}
            >
              {submitMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust Badges */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% Seguro
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Respuesta en 2 horas
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Sin compromiso
          </span>
        </div>
      </div>
    </form>
  )
}

// Type declarations for global tracking functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}