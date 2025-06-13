import { CaseStudy } from '@/types/portfolio'

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'ecommerce-moda-3x-ventas',
    title: 'Triplicamos las Ventas de E-commerce de Moda',
    client: 'Fashion Store Colombia',
    industry: 'E-commerce / Moda',
    services: ['Marketing Digital', 'Automatización', 'Chatbot IA'],
    challenge: 'Fashion Store enfrentaba alta competencia online, carritos abandonados del 70% y atención al cliente limitada a horario oficina.',
    solution: 'Implementamos una estrategia integral: campañas segmentadas en Facebook/Instagram, automatización de recuperación de carritos, y un chatbot con IA que atiende 24/7.',
    results: [
      {
        metric: '+312%',
        value: 'Aumento en Ventas',
        description: 'En solo 6 meses triplicamos las ventas online',
        icon: '📈'
      },
      {
        metric: '-45%',
        value: 'Carritos Abandonados',
        description: 'Recuperación automática de carritos con emails y WhatsApp',
        icon: '🛒'
      },
      {
        metric: '24/7',
        value: 'Atención al Cliente',
        description: 'Chatbot IA resuelve 80% de consultas automáticamente',
        icon: '🤖'
      },
      {
        metric: '2.8x',
        value: 'ROAS',
        description: 'Retorno de inversión publicitaria optimizado',
        icon: '💰'
      }
    ],
    testimonial: {
      quote: 'TechFlow AI transformó completamente nuestro negocio. No solo triplicamos las ventas, sino que ahora tenemos procesos automatizados que nos ahorran 40 horas semanales. El chatbot es increíble, nuestros clientes lo aman.',
      author: 'María Fernanda López',
      position: 'CEO',
      company: 'Fashion Store Colombia'
    },
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      hero: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
      ]
    },
    technologies: ['Facebook Ads', 'Instagram Shopping', 'WhatsApp Business API', 'OpenAI GPT-4', 'n8n'],
    duration: '6 meses',
    featured: true,
    category: 'marketing'
  },
  {
    id: '2',
    slug: 'automatizacion-inmobiliaria',
    title: 'Automatización Total para Inmobiliaria Líder',
    client: 'Inversiones Inmobiliarias SAS',
    industry: 'Real Estate',
    services: ['Automatización', 'Desarrollo Web', 'SEO'],
    challenge: 'Procesos manuales consumían 80% del tiempo del equipo comercial. Sin presencia digital efectiva y leads de baja calidad.',
    solution: 'Desarrollamos un sitio web optimizado para SEO con tours virtuales 360°, automatizamos el proceso de calificación de leads y seguimiento comercial con n8n y CRM personalizado.',
    results: [
      {
        metric: '150+',
        value: 'Horas Ahorradas/Mes',
        description: 'Automatización de tareas repetitivas',
        icon: '⏰'
      },
      {
        metric: '+420%',
        value: 'Leads Calificados',
        description: 'Sistema automático de scoring y calificación',
        icon: '🎯'
      },
      {
        metric: 'Top 3',
        value: 'Google Rankings',
        description: 'Para "inmobiliarias en Medellín" y términos clave',
        icon: '🔍'
      },
      {
        metric: '65%',
        value: 'Tasa de Conversión',
        description: 'De visitante web a cliente potencial',
        icon: '💼'
      }
    ],
    testimonial: {
      quote: 'La automatización nos cambió la vida. Ahora nuestros asesores se enfocan en cerrar ventas, no en tareas operativas. El ROI fue evidente desde el primer mes.',
      author: 'Carlos Andrés Mejía',
      position: 'Director Comercial',
      company: 'Inversiones Inmobiliarias SAS'
    },
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      hero: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop'
    },
    technologies: ['Next.js', 'Three.js', 'n8n', 'HubSpot CRM', 'Google Cloud'],
    duration: '4 meses',
    featured: true,
    category: 'automation'
  },
  {
    id: '3',
    slug: 'chatbot-ia-clinica',
    title: 'Chatbot IA para Clínica: 90% Satisfacción',
    client: 'Clínica Salud Total',
    industry: 'Salud',
    services: ['Chatbot IA', 'Automatización'],
    challenge: 'Call center saturado, tiempos de espera de 15+ minutos, citas perdidas por falta de confirmación y recordatorios.',
    solution: 'Desarrollamos un chatbot con IA que agenda citas, responde FAQs médicas, envía recordatorios automáticos y realiza triaje básico 24/7.',
    results: [
      {
        metric: '90%',
        value: 'Satisfacción',
        description: 'Calificación de pacientes con el servicio',
        icon: '⭐'
      },
      {
        metric: '-80%',
        value: 'Tiempo de Espera',
        description: 'Respuesta inmediata 24/7',
        icon: '⚡'
      },
      {
        metric: '3,500+',
        value: 'Citas/Mes',
        description: 'Agendadas automáticamente',
        icon: '📅'
      },
      {
        metric: '-35%',
        value: 'Citas Perdidas',
        description: 'Gracias a recordatorios automáticos',
        icon: '✅'
      }
    ],
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop'
    },
    technologies: ['WhatsApp Business API', 'Dialogflow', 'OpenAI', 'Google Calendar API'],
    duration: '2 meses',
    featured: false,
    category: 'ai-chatbots'
  },
  {
    id: '4',
    slug: 'plataforma-educativa-startup',
    title: 'Plataforma Educativa: De Idea a 10K Usuarios',
    client: 'EduTech Colombia',
    industry: 'Educación',
    services: ['Desarrollo Web', 'Marketing Digital', 'SEO'],
    challenge: 'Startup sin presencia digital necesitaba una plataforma escalable y estrategia de crecimiento para competir con grandes players.',
    solution: 'Desarrollamos una plataforma educativa con React/Next.js, sistema de gamificación, y estrategia de content marketing + SEO para crecimiento orgánico.',
    results: [
      {
        metric: '10,000+',
        value: 'Usuarios Activos',
        description: 'En los primeros 8 meses',
        icon: '👥'
      },
      {
        metric: '4.8/5',
        value: 'Rating App',
        description: 'Calificación en tiendas',
        icon: '⭐'
      },
      {
        metric: '+500%',
        value: 'Tráfico Orgánico',
        description: 'Crecimiento mes a mes',
        icon: '📊'
      },
      {
        metric: '$2M',
        value: 'Inversión Levantada',
        description: 'Gracias a métricas de crecimiento',
        icon: '🚀'
      }
    ],
    testimonial: {
      quote: 'TechFlow AI no solo construyó nuestra plataforma, nos ayudaron a crear un producto que los usuarios aman. Su expertise técnico y estratégico fue clave para nuestro éxito.',
      author: 'Santiago Rodríguez',
      position: 'CTO & Co-founder',
      company: 'EduTech Colombia'
    },
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      hero: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop'
    },
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
    duration: '8 meses',
    featured: true,
    category: 'web-development'
  },
  {
    id: '5',
    slug: 'campana-b2b-software',
    title: 'Campaña B2B: 250 Leads Calificados/Mes',
    client: 'TechSolutions Pro',
    industry: 'Software B2B',
    services: ['Marketing Digital', 'Automatización'],
    challenge: 'Costo por lead de $500 USD, ciclo de ventas largo, dificultad para llegar a decisores en empresas grandes.',
    solution: 'Estrategia ABM (Account-Based Marketing) con LinkedIn Ads, contenido premium, webinars automatizados y nurturing personalizado.',
    results: [
      {
        metric: '-75%',
        value: 'Costo por Lead',
        description: 'De $500 a $125 USD',
        icon: '💰'
      },
      {
        metric: '250+',
        value: 'Leads B2B/Mes',
        description: 'Decisores de empresas target',
        icon: '🎯'
      },
      {
        metric: '6→3',
        value: 'Meses Ciclo Venta',
        description: 'Reducción del 50%',
        icon: '⏱️'
      },
      {
        metric: '15',
        value: 'Clientes Enterprise',
        description: 'Cerrados en 6 meses',
        icon: '🏢'
      }
    ],
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
      hero: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop'
    },
    technologies: ['LinkedIn Ads', 'HubSpot', 'Webflow', 'n8n', 'Calendly'],
    duration: '6 meses ongoing',
    featured: false,
    category: 'marketing'
  },
  {
    id: '6',
    slug: 'transformacion-digital-manufactura',
    title: 'Industria 4.0: Digitalización Completa',
    client: 'Manufacturas del Valle',
    industry: 'Manufactura',
    services: ['Automatización', 'Desarrollo Web', 'IA'],
    challenge: 'Procesos 100% manuales, sin visibilidad de inventarios, pérdidas por falta de mantenimiento predictivo.',
    solution: 'Sistema integral con IoT para monitoreo en tiempo real, IA para mantenimiento predictivo, y dashboard ejecutivo para toma de decisiones.',
    results: [
      {
        metric: '-40%',
        value: 'Costos Operativos',
        description: 'Optimización de recursos',
        icon: '📉'
      },
      {
        metric: '99.5%',
        value: 'Uptime Maquinaria',
        description: 'Mantenimiento predictivo con IA',
        icon: '🔧'
      },
      {
        metric: '100%',
        value: 'Visibilidad',
        description: 'Control total de inventarios',
        icon: '👁️'
      },
      {
        metric: 'ROI 8:1',
        value: 'Retorno Inversión',
        description: 'En el primer año',
        icon: '📈'
      }
    ],
    testimonial: {
      quote: 'La transformación digital con TechFlow AI nos puso años luz adelante de la competencia. Ahora tomamos decisiones basadas en datos reales, no en intuición.',
      author: 'Roberto Castaño',
      position: 'Gerente General',
      company: 'Manufacturas del Valle'
    },
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      hero: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop'
    },
    technologies: ['React', 'Node.js', 'TensorFlow', 'AWS IoT', 'PostgreSQL'],
    duration: '10 meses',
    featured: false,
    category: 'automation'
  }
]

export const categories = [
  { id: 'all', name: 'Todos', icon: '🎯' },
  { id: 'marketing', name: 'Marketing Digital', icon: '📱' },
  { id: 'automation', name: 'Automatización', icon: '⚙️' },
  { id: 'web-development', name: 'Desarrollo Web', icon: '💻' },
  { id: 'ai-chatbots', name: 'IA & Chatbots', icon: '🤖' }
]