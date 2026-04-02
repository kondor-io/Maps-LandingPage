import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import VisionSection from './components/VisionSection'
import PortfolioSection from './components/PortfolioSection'
import CTASection from './components/CTASection'
import TeamSection from './components/TeamSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.70, ease: 'easeOut' }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <VisionSection />
          <PortfolioSection />
          <TeamSection />
          <CTASection />
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}
