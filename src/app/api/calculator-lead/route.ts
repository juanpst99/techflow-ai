import { NextRequest, NextResponse } from 'next/server'

interface CalculatorLeadData {
  name: string
  email: string
  phone: string
  company?: string
  calculatorData: {
    projectType: string
    pages: number
    features: string[]
    design: string
    timeline: string
  }
  estimate: {
    min: number
    max: number
    timeMin: number
    timeMax: number
  }
  type: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const data: CalculatorLeadData = await request.json()
    
    // Validación básica
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }
    
    // Formatear el mensaje para email/webhook
    const projectDetails = `
    Tipo de Proyecto: ${data.calculatorData.projectType}
    Páginas: ${data.calculatorData.pages}
    Diseño: ${data.calculatorData.design}
    Timeline: ${data.calculatorData.timeline}
    Funcionalidades: ${data.calculatorData.features.join(', ') || 'Ninguna'}
    
    Estimado: COP ${data.estimate.min.toLocaleString()} - ${data.estimate.max.toLocaleString()}
    Tiempo: ${data.estimate.timeMin} - ${data.estimate.timeMax} semanas
    `
    
    // Log para debugging
    console.log('Lead de calculadora recibido:', {
      name: data.name,
      email: data.email,
      estimate: `${data.estimate.min} - ${data.estimate.max}`,
    })
    
    // Enviar a múltiples servicios
    const promises = []
    
    // 1. Webhook (n8n, Make, Zapier)
    if (process.env.WEBHOOK_URL) {
      promises.push(
        fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            source: 'Web Cost Calculator',
            projectDetails,
          }),
        })
      )
    }
    
    // 2. Email notification
    if (process.env.RESEND_API_KEY) {
      promises.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'TechFlow AI <calculadora@techflowai.co>',
            to: process.env.EMAIL_TO || 'hola@techflowai.co',
            subject: `💰 Lead Calculadora: ${data.name} - ${data.calculatorData.projectType}`,
            html: generateEmailTemplate(data, projectDetails),
          }),
        })
      )
    }
    
    await Promise.allSettled(promises)
    
    return NextResponse.json({
      success: true,
      message: 'Cotización generada correctamente',
    })
    
  } catch (error) {
    console.error('Error procesando lead de calculadora:', error)
    
    return NextResponse.json(
      { 
        error: 'Error al procesar la solicitud',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

function generateEmailTemplate(data: CalculatorLeadData, projectDetails: string): string {
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(num)
  }
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Lead de Calculadora - TechFlow AI</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1991EB 0%, #6919FF 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .estimate-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 2px solid #1991EB; }
        .estimate-price { font-size: 28px; font-weight: bold; color: #1991EB; margin: 10px 0; }
        .details { background: white; padding: 15px; border-radius: 5px; margin-top: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #666; }
        .value { margin-top: 5px; }
        .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        .button { display: inline-block; padding: 12px 30px; background: #1991EB; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💰 Nuevo Lead de Calculadora Web</h1>
          <p>Un cliente potencial ha utilizado la calculadora de costos</p>
        </div>
        
        <div class="content">
          <div class="estimate-box">
            <p style="margin: 0; color: #666;">Presupuesto Estimado:</p>
            <div class="estimate-price">
              ${formatCurrency(data.estimate.min)} - ${formatCurrency(data.estimate.max)}
            </div>
            <p style="margin: 0; color: #666;">Tiempo: ${data.estimate.timeMin} - ${data.estimate.timeMax} semanas</p>
          </div>
          
          <div class="field">
            <div class="label">👤 Información del Cliente</div>
            <div class="value">
              <strong>${data.name}</strong><br>
              📧 <a href="mailto:${data.email}">${data.email}</a><br>
              📱 <a href="tel:${data.phone}">${data.phone}</a>
              ${data.company ? `<br>🏢 ${data.company}` : ''}
            </div>
          </div>
          
          <div class="details">
            <div class="label">📋 Detalles del Proyecto</div>
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${projectDetails}</pre>
          </div>
          
          <center>
            <a href="https://wa.me/${data.phone.replace(/\D/g, '')}" class="button">
              Contactar por WhatsApp
            </a>
          </center>
          
          <div class="field" style="margin-top: 30px;">
            <div class="label">⏰ Recomendaciones de Seguimiento</div>
            <div class="value">
              • Contactar en las próximas 2 horas (mayor conversión)<br>
              • Preparar propuesta detallada basada en el estimado<br>
              • Ofrecer descuento por decisión rápida<br>
              • Agendar llamada de descubrimiento
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>Este lead fue generado desde la Calculadora de Costos Web</p>
          <p>${new Date(data.timestamp).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</p>
        </div>
      </div>
    </body>
    </html>
  `
}