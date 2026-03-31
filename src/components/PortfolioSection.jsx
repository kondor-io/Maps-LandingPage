import { motion } from 'framer-motion'
import { ArrowUpRight, Activity, GitBranch, Eye } from 'lucide-react'

const products = [
  {
    icon: Activity,
    name: 'Kondor Core',
    tagline: 'Gestión operativa de base',
    description:
      'Plataforma central de gestión operativa para organizaciones en crecimiento. Estructura, visibilidad y control en un único sistema.',
    status: 'En producción',
    statusColor: 'text-emerald-600 bg-emerald-50',
    accentColor: 'group-hover:border-emerald-200',
  },
  {
    icon: GitBranch,
    name: 'Kondor Flow',
    tagline: 'Automatización de procesos',
    description:
      'Sistema de automatización de flujos operativos diseñado para organizaciones con procesos complejos de gestión y seguimiento.',
    status: 'En producción',
    statusColor: 'text-emerald-600 bg-emerald-50',
    accentColor: 'group-hover:border-brand-accent/30',
    highlight: true,
  },
  {
    icon: Eye,
    name: 'Kondor Lens',
    tagline: 'Trazabilidad y auditoría',
    description:
      'Módulo de trazabilidad y auditoría para equipos distribuidos. Registro completo de operaciones con criterio de ingeniería.',
    status: 'En desarrollo',
    statusColor: 'text-blue-600 bg-blue-50',
    accentColor: 'group-hover:border-blue-200',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-gray-50/70 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent tracking-widest uppercase mb-4">
            <span className="w-4 h-px bg-brand-accent" />
            Portfolio
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <h2 className="text-3xl lg:text-4xl font-black text-brand-dark leading-tight tracking-tight">
              Los sistemas
              <br />
              que construimos.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Cada producto de Kondor es un sistema de ingeniería diseñado para
              resolver un problema real con criterio técnico claro.
            </p>
          </div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {products.map((product) => {
            const Icon = product.icon
            return (
              <motion.div
                key={product.name}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className={`group relative bg-white rounded-2xl border border-gray-200 p-7 cursor-pointer overflow-hidden transition-all duration-300 ${product.accentColor} ${
                  product.highlight ? 'ring-1 ring-brand-accent/20' : ''
                }`}
              >
                {product.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-accent/60 via-brand-accent to-brand-accent/60" />
                )}

                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-brand-dark/5 flex items-center justify-center transition-colors duration-200">
                    <Icon size={18} className="text-brand-dark/70" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${product.statusColor}`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <h3 className="text-base font-bold text-brand-dark mb-0.5">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-brand-accent/80">
                    {product.tagline}
                  </p>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {product.description}
                </p>

                <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-brand-dark transition-colors duration-200">
                  <span>Ver más</span>
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 text-center text-xs text-gray-400"
        >
          Más sistemas en desarrollo. Hablá con el equipo para conocer la hoja de ruta.
        </motion.p>
      </div>
    </section>
  )
}
