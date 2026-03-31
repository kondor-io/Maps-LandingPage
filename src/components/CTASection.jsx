import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

export default function CTASection() {
  return (
    <section id="contacto" className="relative bg-brand-dark py-24 lg:py-36 overflow-hidden">
      {/* Decorative accent circles */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-accent/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent tracking-widest uppercase">
            <span className="w-4 h-px bg-brand-accent" />
            Conversemos
            <span className="w-4 h-px bg-brand-accent" />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
          className="text-3xl lg:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight mb-6"
        >
          ¿Tu organización está lista
          <br />
          para el{' '}
          <span className="text-brand-accent">siguiente nivel</span>?
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-10"
        >
          Somos cuatro personas con criterio técnico y visión clara. Sin
          presentaciones largas: hablemos sobre lo que podemos construir juntos.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary */}
          <motion.a
            href="mailto:hola@kondor.dev"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 bg-brand-accent text-white font-bold text-base px-9 py-4 rounded-xl shadow-xl shadow-brand-accent/25 hover:bg-red-600 transition-colors duration-200"
          >
            Solicitar una conversación
            <ArrowRight size={17} />
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 text-gray-400 hover:text-white font-medium text-sm transition-colors duration-200 px-4 py-4"
          >
            <ExternalLink size={14} />
            Ver casos y recursos
          </motion.a>
        </motion.div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-10 text-xs text-gray-600"
        >
          Sin compromisos. Sin presentaciones largas. Solo una conversación honesta.
        </motion.p>
      </div>
    </section>
  )
}
