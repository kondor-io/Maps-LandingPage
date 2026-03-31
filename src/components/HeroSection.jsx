import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import RocketScene from './RocketScene'
import InfoBlocks from './InfoBlocks'

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-white"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#1E1E24 1px, transparent 1px), linear-gradient(90deg, #1E1E24 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Accent glow top-left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center min-h-[75vh]">

          {/* ─── LEFT: Copy ─── */}
          <div className="flex flex-col justify-center gap-6">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent tracking-widest uppercase">
                <span className="w-4 h-px bg-brand-accent" />
                Software Factory
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="text-4xl lg:text-5xl xl:text-6xl font-black text-brand-dark leading-[1.05] tracking-tight text-balance"
            >
              Orquestando
              <br />
              la evolución
              <br />
              <span className="text-brand-accent">industrial</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base text-gray-500 italic font-light leading-relaxed"
            >
              ~ Sincronizando el instinto con la exactitud digital
            </motion.p>

            {/* Scroll breadcrumb */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="flex flex-col gap-2 mt-2"
            >
              <a
                href="#vision"
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-dark transition-colors group w-fit"
              >
                <ChevronDown size={14} className="text-gray-300" />
                <span>Nuestra visión</span>
              </a>
              <a
                href="#portfolio"
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-dark transition-colors group w-fit"
              >
                <ChevronDown size={14} className="text-gray-300" />
                <span>Ver portfolio</span>
              </a>
            </motion.div>
          </div>

          {/* ─── CENTER: Rocket + CTA ─── */}
          <div className="flex flex-col items-center justify-center gap-0">
            <RocketScene />

            {/* CTA below rocket */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="flex flex-col items-center gap-3 -mt-2"
            >
              <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
                ¿Listo para despegar?
              </p>
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-brand-accent text-white font-semibold text-sm px-7 py-3 rounded-xl shadow-lg shadow-brand-accent/20 hover:bg-red-600 transition-colors duration-200"
              >
                Sincronizar mi empresa
                <ArrowRight size={15} />
              </motion.a>
            </motion.div>
          </div>

          {/* ─── RIGHT: Info blocks ─── */}
          <div className="flex flex-col justify-center">
            <InfoBlocks />

            {/* Secondary CTA */}
            <motion.a
              href="#portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              whileHover={{ x: 4 }}
              className="mt-8 flex items-center gap-2 text-sm font-semibold text-brand-dark hover:text-brand-accent transition-colors group w-fit"
            >
              Ver nuestro portfolio
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50/80 to-transparent pointer-events-none" />
    </section>
  )
}
