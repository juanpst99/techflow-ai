import { NextRequest, NextResponse } from 'next/server'

// Tipos para el formulario
interface ContactFormData {
  name: string
  email: string
  phone: string
  company?: string
  service: string
  budget: string
  message: string
  consent: boolean
  timestamp: string
  source: string
}

// Configuración de servicios (actualiza con tus credenciales)
const config = {
  // Opción 1: Webhook (n8n, Make, Zapier)
  webhookUrl: process.env.WEBHOOK_URL || '',
  
  // Opción 2: Email directo (requiere servicio SMTP)
  emailTo: process.env.EMAIL_TO || 'hola@techflowai.co',
  
  // Opción 3: CRM API
  crmApiKey: process.env.CRM_API_KEY || '',
  crmApiUrl: process.env.CRM_API_URL || '',
  
  // Opción 4: Google Sheets (via API)
  googleSheetsId: process.env.GOOGLE_SHEETS_ID || '',
  
  // Opción 5: Notion Database
  notionApiKey: process.env.NOTION_API_KEY || '',
  notionDatabaseId: process.env.NOTION_DATABASE_ID || '',
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()
    
    // Validación básica
    if (!data.name || !data.email || !data.phone || !data.message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }
    
    // Log para debugging (quitar en producción)
    console.log('Nuevo contacto recibido:', {
      name: data.name,
      email: data.email,
      service: data.service,
      timestamp: data.timestamp,
    })
    
    // Procesar el lead en paralelo con múltiples servicios
    const promises = []
    
    // 1. Enviar a Webhook (n8n, Make, Zapier)
    if (config.webhookUrl) {
      promises.push(
        fetch(config.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            leadSource: 'Website Contact Form',
            ip: request.headers.get('x-forwarded-for') || 'unknown',
            userAgent: request.headers.get('user-agent') || 'unknown',
          }),
        })
      )
    }
    
    // 2. Enviar notificación por email (usando servicio externo)
    if (process.env.RESEND_API_KEY) {
      // Ejemplo con Resend (https://resend.com)
      promises.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'TechFlow AI <noreply@techflowai.co>',
            to: config.emailTo,
            subject: `Nuevo Lead: ${data.name} - ${data.service}`,
            html: generateEmailTemplate(data),
          }),
        })
      )
    }
    
    // 3. Guardar en base de datos (ejemplo con Prisma)
    // if (prisma) {
    //   promises.push(
    //     prisma.lead.create({
    //       data: {
    //         name: data.name,
    //         email: data.email,
    //         phone: data.phone,
    //         company: data.company,
    //         service: data.service,
    //         budget: data.budget,
    //         message: data.message,
    //         source: data.source,
    //         status: 'new',
    //       },
    //     })
    //   )
    // }
    
    // 4. Enviar a CRM
    if (config.crmApiKey && config.crmApiUrl) {
      promises.push(
        fetch(config.crmApiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.crmApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              firstname: data.name.split(' ')[0],
              lastname: data.name.split(' ').slice(1).join(' '),
              email: data.email,
              phone: data.phone,
              company: data.company,
              service_interest: data.service,
              budget_range: data.budget,
              message: data.message,
              lead_source: 'Website',
            },
          }),
        })
      )
    }
    
    // 5. Guardar en Google Sheets
    if (config.googleSheetsId && process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      // Implementar integración con Google Sheets API
      // Ver: https://developers.google.com/sheets/api/quickstart/nodejs
    }
    
    // 6. Guardar en Notion
    if (config.notionApiKey && config.notionDatabaseId) {
      promises.push(
        fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.notionApiKey}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28',
          },
          body: JSON.stringify({
            parent: { database_id: config.notionDatabaseId },
            properties: {
              'Nombre': { title: [{ text: { content: data.name } }] },
              'Email': { email: data.email },
              'Teléfono': { phone_number: data.phone },
              'Empresa': { rich_text: [{ text: { content: data.company || '' } }] },
              'Servicio': { select: { name: data.service } },
              'Presupuesto': { select: { name: data.budget } },
              'Mensaje': { rich_text: [{ text: { content: data.message } }] },
              'Fecha': { date: { start: data.timestamp } },
              'Estado': { select: { name: 'Nuevo' } },
            },
          }),
        })
      )
    }
    
    // Ejecutar todas las integraciones
    await Promise.allSettled(promises)
    
    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Formulario recibido correctamente',
    })
    
  } catch (error) {
    console.error('Error procesando formulario:', error)
    
    return NextResponse.json(
      { 
        error: 'Error al procesar el formulario',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Template de email HTML
function generateEmailTemplate(data: ContactFormData): string {
  const serviceLabels: Record<string, string> = {
    'marketing-digital': 'Marketing Digital',
    'automatizacion': 'Automatización de Procesos',
    'chatbots-ia': 'Chatbots & IA',
    'desarrollo-web': 'Desarrollo Web',
    'seo': 'SEO & Posicionamiento',
    'consultoria': 'Consultoría Integral',
  }
  
  const budgetLabels: Record<string, string> = {
    '0-1m': 'Menos de $1M COP',
    '1m-3m': '$1M - $3M COP',
    '3m-5m': '$3M - $5M COP',
    '5m-10m': '$5M - $10M COP',
    '10m+': 'Más de $10M COP',
    'consultar': 'Prefiere consultarlo',
  }
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Nuevo Lead - TechFlow AI</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1991EB 0%, #6919FF 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #666; font-size: 14px; }
        .value { font-size: 16px; margin-top: 5px; }
        .message { background: white; padding: 15px; border-radius: 5px; margin-top: 10px; }
        .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
        .button { display: inline-block; padding: 12px 30px; background: #1991EB; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Nuevo Lead Recibido</h1>
          <p>Un nuevo cliente potencial ha contactado a través del formulario web</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">👤 Nombre</div>
            <div class="value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="label">📧 Email</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">📱 Teléfono</div>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          
          ${data.company ? `
          <div class="field">
            <div class="label">🏢 Empresa</div>
            <div class="value">${data.company}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">🎯 Servicio de Interés</div>
            <div class="value">${serviceLabels[data.service] || data.service}</div>
          </div>
          
          <div class="field">
            <div class="label">💰 Presupuesto</div>
            <div class="value">${budgetLabels[data.budget] || data.budget}</div>
          </div>
          
          <div class="field">
            <div class="label">💬 Mensaje</div>
            <div class="message">${data.message}</div>
          </div>
          
          <div class="field">
            <div class="label">🕐 Fecha y Hora</div>
            <div class="value">${new Date(data.timestamp).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</div>
          </div>
          
          <center>
            <a href="https://wa.me/${data.phone.replace(/\D/g, '')}" class="button">
              Contactar por WhatsApp
            </a>
          </center>
        </div>
        
        <div class="footer">
          <p>Este email fue generado automáticamente por el sistema de TechFlow AI</p>
          <p>Recuerda responder en menos de 2 horas para mantener nuestra promesa de servicio</p>
        </div>
      </div>
    </body>
    </html>
  `
}