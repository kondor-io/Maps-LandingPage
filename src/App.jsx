import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import VisionSection from './components/VisionSection'
import PortfolioSection from './components/PortfolioSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <VisionSection />
        <PortfolioSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
