export interface CaseStudy {
  id: string
  slug: string
  title: string
  client: string
  industry: string
  services: string[]
  challenge: string
  solution: string
  results: Result[]
  testimonial?: Testimonial
  images: {
    thumbnail: string
    hero: string
    gallery?: string[]
  }
  technologies: string[]
  duration: string
  featured: boolean
  category: 'marketing' | 'automation' | 'web-development' | 'ai-chatbots'
}

export interface Result {
  metric: string
  value: string
  description: string
  icon?: string
}

export interface Testimonial {
  quote: string
  author: string
  position: string
  company: string
  avatar?: string
}