import HeroSection from './components/HeroSection'
import PricingSection from './components/PricingSection'
import FeaturesSection from './components/FeaturesSection'
import StatsSection from './components/StatsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import ProductShowcase from './components/ProductShowcase'
import HowItWorks from './components/HowItWorks'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductShowcase />
      <FeaturesSection /> 
      <HowItWorks />
      <StatsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}