import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import WebDevelopmentSection from '@/components/sections/WebDevelopmentSection'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WebDevelopmentSection />
        <WhyChooseUsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}