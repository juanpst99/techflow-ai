import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CaseStudyDetail from '@/components/portfolio/CaseStudyDetail'
import { caseStudies } from '@/data/portfolio'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseStudy = caseStudies.find(study => study.slug === params.slug)
  
  if (!caseStudy) {
    return {
      title: 'Caso no encontrado',
    }
  }

  return {
    title: `${caseStudy.title} - Caso de Éxito`,
    description: caseStudy.challenge,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.challenge,
      images: [caseStudy.images.hero],
    },
  }
}

export default function CaseStudyPage({ params }: Props) {
  const caseStudy = caseStudies.find(study => study.slug === params.slug)
  
  if (!caseStudy) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <CaseStudyDetail caseStudy={caseStudy} />
      </main>
      <Footer />
    </>
  )
}