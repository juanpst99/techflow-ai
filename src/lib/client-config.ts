// Configuración para uso en componentes cliente
// Las variables NEXT_PUBLIC_ están disponibles en el cliente

export const clientConfig = {
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573001234567',
    defaultMessage: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hola! Quiero información sobre sus servicios',
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://techflowai.co',
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || '',
  },
}

// Helper function para generar links de WhatsApp
export function getWhatsAppLink(message?: string) {
  const number = clientConfig.whatsapp.number
  const text = encodeURIComponent(message || clientConfig.whatsapp.defaultMessage)
  return `https://wa.me/${number}?text=${text}`
}