"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Tipos de datos
interface CalculatorData {
  projectType: string
  pages: number
  features: string[]
  design: string
  timeline: string
}

interface PriceEstimate {
  min: number
  max: number
  timeMin: number
  timeMax: number
}

// Esquema de validación para el formulario de lead
const leadSchema = z.object({
  name: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono requerido'),
  company: z.string().optional(),
})

type LeadFormData = z.infer<typeof leadSchema>

// Configuración de precios base (en COP)
const BASE_PRICES = {
  landing: { min: 2000000, max: 4000000, time: 2 },
  corporate: { min: 4000000, max: 8000000, time: 4 },
  ecommerce: { min: 8000000, max: 15000000, time: 6 },
  webapp: { min: 15000000, max: 50000000, time: 12 },
  blog: { min: 3000000, max: 6000000, time: 3 },
  portfolio: { min: 3500000, max: 7000000, time: 3.5 },
}

// Multiplicadores por número de páginas
const PAGE_MULTIPLIERS = {
  '1-5': 1,
  '6-10': 1.3,
  '11-20': 1.6,
  '21-50': 2.2,
  '50+': 3,
}

// Precios adicionales por features
const FEATURE_PRICES = {
  payments: { price: 2000000, time: 1 },
  multilanguage: { price: 1500000, time: 1 },
  chat: { price: 1000000, time: 0.5 },
  booking: { price: 2500000, time: 1.5 },
  crm: { price: 3000000, time: 2 },
  analytics: { price: 500000, time: 0.25 },
  seo: { price: 1500000, time: 0.5 },
  animations: { price: 1000000, time: 0.5 },
  api: { price: 3000000, time: 2 },
  admin: { price: 2000000, time: 1 },
  notifications: { price: 800000, time: 0.5 },
  social: { price: 1200000, time: 0.75 },
}

// Multiplicadores por diseño
const DESIGN_MULTIPLIERS = {
  template: 0.7,
  custom: 1,
  premium: 1.4,
}

// Multiplicadores por timeline
const TIMELINE_MULTIPLIERS = {
  normal: 1,
  fast: 1.3,
  urgent: 1.6,
}

export default function WebCostCalculator() {
  const [step, setStep] = useState(1)
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    projectType: '',
    pages: 5,
    features: [],
    design: 'custom',
    timeline: 'normal',
  })
  const [estimate, setEstimate] = useState<PriceEstimate | null>(null)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
  })

  // Calcular precio estimado
  const calculateEstimate = () => {
    const basePrice = BASE_PRICES[calculatorData.projectType as keyof typeof BASE_PRICES]
    if (!basePrice) return

    let minPrice = basePrice.min
    let maxPrice = basePrice.max
    let totalTime = basePrice.time

    // Aplicar multiplicador por páginas
    const pageRange = 
      calculatorData.pages <= 5 ? '1-5' :
      calculatorData.pages <= 10 ? '6-10' :
      calculatorData.pages <= 20 ? '11-20' :
      calculatorData.pages <= 50 ? '21-50' : '50+'
    
    const pageMultiplier = PAGE_MULTIPLIERS[pageRange]
    minPrice *= pageMultiplier
    maxPrice *= pageMultiplier

    // Agregar features
    calculatorData.features.forEach(feature => {
      const featureData = FEATURE_PRICES[feature as keyof typeof FEATURE_PRICES]
      if (featureData) {
        minPrice += featureData.price * 0.8
        maxPrice += featureData.price * 1.2
        totalTime += featureData.time
      }
    })

    // Aplicar multiplicador de diseño
    const designMultiplier = DESIGN_MULTIPLIERS[calculatorData.design as keyof typeof DESIGN_MULTIPLIERS]
    minPrice *= designMultiplier
    maxPrice *= designMultiplier

    // Aplicar multiplicador de timeline
    const timelineMultiplier = TIMELINE_MULTIPLIERS[calculatorData.timeline as keyof typeof TIMELINE_MULTIPLIERS]
    minPrice *= timelineMultiplier
    maxPrice *= timelineMultiplier

    // Ajustar tiempo según timeline
    if (calculatorData.timeline === 'fast') {
      totalTime *= 0.75
    } else if (calculatorData.timeline === 'urgent') {
      totalTime *= 0.5
    }

    setEstimate({
      min: Math.round(minPrice),
      max: Math.round(maxPrice),
      timeMin: Math.round(totalTime),
      timeMax: Math.round(totalTime * 1.3),
    })
  }

  // Manejar envío del formulario de lead
  const onSubmitLead = async (data: LeadFormData) => {
    setIsSubmitting(true)
    
    try {
      // Enviar datos al backend
      const response = await fetch('/api/calculator-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          calculatorData,
          estimate,
          type: 'web-cost-calculator',
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Error al enviar')

      // Mostrar mensaje de éxito
      setShowLeadForm(false)
      // Aquí podrías mostrar un modal de agradecimiento o redirigir
      
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Formatear precio en COP
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Calculadora de Costos de Desarrollo Web
        </h2>
        <p className="text-gray-600">
          Obtén un estimado instantáneo para tu proyecto web
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                i <= step
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary-500"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Tipo de Proyecto */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">
              ¿Qué tipo de sitio web necesitas?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { id: 'landing', name: 'Landing Page', desc: 'Una página de conversión', icon: '🎯' },
                { id: 'corporate', name: 'Sitio Corporativo', desc: 'Múltiples páginas empresariales', icon: '🏢' },
                { id: 'ecommerce', name: 'E-commerce', desc: 'Tienda online completa', icon: '🛒' },
                { id: 'webapp', name: 'Aplicación Web', desc: 'Sistema web personalizado', icon: '⚡' },
                { id: 'blog', name: 'Blog/Revista', desc: 'Plataforma de contenidos', icon: '📝' },
                { id: 'portfolio', name: 'Portfolio', desc: 'Mostrar trabajos/proyectos', icon: '🎨' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setCalculatorData({ ...calculatorData, projectType: type.id })
                    setStep(2)
                  }}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:border-primary-500 hover:shadow-lg ${
                    calculatorData.projectType === type.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{type.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{type.name}</h4>
                      <p className="text-sm text-gray-600">{type.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Número de Páginas */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">
              ¿Cuántas páginas aproximadamente necesitas?
            </h3>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="100"
                value={calculatorData.pages}
                onChange={(e) =>
                  setCalculatorData({ ...calculatorData, pages: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <span className="text-4xl font-bold text-primary-600">
                  {calculatorData.pages}
                </span>
                <span className="text-gray-600 ml-2">páginas</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>1</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100+</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Anterior
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 px-6 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Funcionalidades */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-4">
              ¿Qué funcionalidades necesitas?
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { id: 'payments', name: 'Pagos Online', icon: '💳' },
                { id: 'multilanguage', name: 'Multi-idioma', icon: '🌍' },
                { id: 'chat', name: 'Chat en Vivo', icon: '💬' },
                { id: 'booking', name: 'Sistema de Reservas', icon: '📅' },
                { id: 'crm', name: 'Integración CRM', icon: '📊' },
                { id: 'analytics', name: 'Analytics Avanzado', icon: '📈' },
                { id: 'seo', name: 'SEO Avanzado', icon: '🔍' },
                { id: 'animations', name: 'Animaciones Premium', icon: '✨' },
                { id: 'api', name: 'API Personalizada', icon: '🔌' },
                { id: 'admin', name: 'Panel Admin', icon: '⚙️' },
                { id: 'notifications', name: 'Notificaciones', icon: '🔔' },
                { id: 'social', name: 'Login Social', icon: '👥' },
              ].map((feature) => (
                <label
                  key={feature.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    calculatorData.features.includes(feature.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={calculatorData.features.includes(feature.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCalculatorData({
                          ...calculatorData,
                          features: [...calculatorData.features, feature.id],
                        })
                      } else {
                        setCalculatorData({
                          ...calculatorData,
                          features: calculatorData.features.filter((f) => f !== feature.id),
                        })
                      }
                    }}
                    className="w-5 h-5 text-primary-600 rounded"
                  />
                  <span className="text-xl">{feature.icon}</span>
                  <span className="text-gray-700">{feature.name}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Anterior
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3 px-6 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Diseño y Timeline */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">
                ¿Qué tipo de diseño prefieres?
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: 'template', name: 'Plantilla', desc: 'Diseño basado en template', price: 'Económico' },
                  { id: 'custom', name: 'Personalizado', desc: 'Diseño único para tu marca', price: 'Estándar' },
                  { id: 'premium', name: 'Premium', desc: 'Diseño exclusivo con animaciones', price: 'Premium' },
                ].map((design) => (
                  <button
                    key={design.id}
                    onClick={() => setCalculatorData({ ...calculatorData, design: design.id })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      calculatorData.design === design.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900">{design.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{design.desc}</p>
                    <p className="text-xs text-primary-600 mt-2">{design.price}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                ¿Cuándo necesitas el proyecto?
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: 'normal', name: 'Normal', desc: 'Tiempo estándar de entrega' },
                  { id: 'fast', name: 'Rápido', desc: '25% más rápido (+30% costo)' },
                  { id: 'urgent', name: 'Urgente', desc: '50% más rápido (+60% costo)' },
                ].map((timeline) => (
                  <button
                    key={timeline.id}
                    onClick={() => setCalculatorData({ ...calculatorData, timeline: timeline.id })}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      calculatorData.timeline === timeline.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900">{timeline.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{timeline.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Anterior
              </button>
              <button
                onClick={() => {
                  calculateEstimate()
                  setStep(5)
                }}
                className="flex-1 py-3 px-6 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Calcular Precio
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 5: Resultado */}
        {step === 5 && estimate && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-6"
          >
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Estimado para tu proyecto
              </h3>
              <p className="text-gray-600">
                Basado en las características seleccionadas
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
              <div className="text-center mb-6">
                <p className="text-lg mb-2">Rango de inversión estimada:</p>
                <div className="text-4xl md:text-5xl font-bold">
                  {formatPrice(estimate.min)} - {formatPrice(estimate.max)}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm opacity-90">Tiempo estimado:</p>
                  <p className="text-xl font-semibold">
                    {estimate.timeMin} - {estimate.timeMax} semanas
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Tipo de proyecto:</p>
                  <p className="text-xl font-semibold capitalize">
                    {calculatorData.projectType}
                  </p>
                </div>
              </div>
            </div>

            {/* Resumen de características */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Resumen de tu proyecto:
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Tipo: {calculatorData.projectType}</li>
                <li>• Páginas: {calculatorData.pages}</li>
                <li>• Diseño: {calculatorData.design}</li>
                <li>• Timeline: {calculatorData.timeline}</li>
                {calculatorData.features.length > 0 && (
                  <li>• Funcionalidades: {calculatorData.features.join(', ')}</li>
                )}
              </ul>
            </div>

            {/* CTAs */}
            {!showLeadForm ? (
              <div className="space-y-4">
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="w-full py-4 px-6 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                >
                  Obtener Cotización Detallada
                </button>
                <div className="text-center">
                  <button
                    onClick={() => {
                      setStep(1)
                      setCalculatorData({
                        projectType: '',
                        pages: 5,
                        features: [],
                        design: 'custom',
                        timeline: 'normal',
                      })
                      setEstimate(null)
                    }}
                    className="text-primary-600 hover:text-primary-700 underline"
                  >
                    Calcular otro proyecto
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 border-2 border-primary-200"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Recibe tu cotización detallada
                </h4>
                <form onSubmit={handleSubmit(onSubmitLead)} className="space-y-4">
                  <div>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="Tu teléfono"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('company')}
                      type="text"
                      placeholder="Empresa (opcional)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Recibir Cotización Detallada'}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    Al enviar aceptas nuestra política de privacidad. No spam.
                  </p>
                </form>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}