"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Desarrollo Web', href: '/desarrollo-web' },
  { name: 'Casos de Éxito', href: '/casos-de-exito' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacto', href: '/contacto' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
              <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold text-xl px-3 py-1 rounded-lg">
                TF
              </div>
            </div>
            <span className={cn(
              "font-display font-bold text-xl transition-colors duration-300",
              isScrolled ? "text-gray-900" : "text-white"
            )}>
              TechFlow AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? isScrolled
                        ? "bg-primary-100 text-primary-700"
                        : "bg-white/20 text-white"
                      : isScrolled
                      ? "text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
            
            {/* CTA Button */}
            <Link
              href="/contacto"
              className="ml-4 btn-primary"
            >
              Solicitar Consulta
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            )}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                className={cn(
                  "block h-0.5 w-6 transition-colors",
                  isScrolled ? "bg-gray-700" : "bg-white"
                )}
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                className={cn(
                  "block h-0.5 w-6 transition-colors",
                  isScrolled ? "bg-gray-700" : "bg-white"
                )}
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                className={cn(
                  "block h-0.5 w-6 transition-colors",
                  isScrolled ? "bg-gray-700" : "bg-white"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      isActive
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <Link
                href="/contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full btn-primary text-center mt-4"
              >
                Solicitar Consulta
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}