import { motion } from 'framer-motion'
import { Layers, Cpu, TrendingUp, Crosshair } from 'lucide-react'

const pillars = [
  {
    icon: Cpu,
    title: 'Ingeniería de criterio',
    body: 'Cada sistema se diseña y construye con buenas prácticas, sin atajos. Aplicamos estándares de ingeniería reales en cada capa del producto.',
    n: '01',
    accent: false,
  },
  {
    icon: Layers,
    title: 'Marca madre',
    body: 'Kondor es la empresa detrás de distintos productos y verticales. No somos un solo producto: somos la plataforma que los hace posibles.',
    n: '02',
    accent: true,
  },
  {
    icon: TrendingUp,
    title: 'Evolución continua',
    body: 'Acompañamos a las organizaciones en su transformación tecnológica para que puedan operar con el nivel de una gran corporación.',
    n: '03',
    accent: false,
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function VisionSection() {
  return (
    <section
      id="vision"
      className="relative z-[30] overflow-hidden border-y border-white/10 bg-[#1E1E24]/50 backdrop-blur-2xl py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute top-0 inset-x-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 z-[2] h-[2px] bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-14 lg:gap-16">
          {/* Bloque superior — ancho completo */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.65 }}
            className="w-full"
          >
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="min-w-0 flex-1 max-w-3xl">
                <div className="flex items-center gap-3 mb-8">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-brand-accent/35 bg-brand-accent/10 text-brand-accent">
                    <Crosshair size={18} strokeWidth={1.75} />
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.28em] text-brand-accent/90 uppercase">
                    Nuestra visión
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute -left-1 -top-2 h-4 w-4 border-l-2 border-t-2 border-brand-accent/50" />
                  <span className="absolute -right-1 -bottom-2 h-4 w-4 border-r-2 border-b-2 border-white/20" />

                  <h2 className="text-4xl sm:text-5xl xl:text-[3.25rem] font-black text-white leading-[1.05] tracking-tight text-balance">
                    Tecnología{' '}
                    <span className="relative inline text-white">
                      real
                      <motion.span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-accent/20 via-brand-accent to-brand-accent/20 rounded-full"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35, duration: 0.65, ease: 'easeOut' }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </span>
                    ,
                    <br />
                    construida con{' '}
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-br from-[#ff6b52] via-brand-accent to-[#9b2615] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(237,73,47,0.35)]">
                        rigor
                      </span>
                      <motion.span
                        className="pointer-events-none absolute -inset-2 -z-10 rounded-lg bg-brand-accent/35 blur-xl"
                        animate={{ opacity: [0.32, 0.12, 0.32] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                        aria-hidden
                      />
                    </span>
                    .
                  </h2>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-6 lg:max-w-md lg:text-right">
                <p className="text-base lg:text-lg text-white/55 leading-relaxed border-l border-white/15 pl-5 lg:border-l-0 lg:border-r lg:pl-0 lg:pr-5">
                  Somos cuatro personas con criterio técnico claro. Creamos sistemas para que las
                  medianas organizaciones puedan operar como grandes corporaciones.
                </p>
                <motion.div
                  className="inline-flex w-fit max-w-full items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[11px] font-mono text-white/45 tracking-wider lg:self-end"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent shadow-[0_0_8px_#ED492F] animate-pulse" />
                  COORD · DIRECTO AL IMPACTO OPERATIVO
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tres pilares — fila horizontal; cada uno es fila órbita + texto */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <motion.article
                  key={pillar.title}
                  variants={item}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className={`group relative flex flex-row items-start gap-4 px-0 md:px-6 lg:gap-5 lg:px-8 first:md:pl-0 last:md:pr-0 ${
                    pillar.accent ? 'md:rounded-2xl md:bg-brand-accent/[0.06] md:ring-1 md:ring-brand-accent/25' : ''
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute rounded-full blur-2xl transition-opacity group-hover:opacity-80 ${
                      pillar.accent ? 'left-1/2 top-0 h-32 w-32 -translate-x-1/2 bg-brand-accent/20' : '-left-4 top-6 h-28 w-28 bg-white/[0.06]'
                    }`}
                    aria-hidden
                  />

                  {/* Órbita compacta — siempre a la izquierda del texto (horizontal) */}
                  <div className="relative z-[1] shrink-0">
                    <div className="relative h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20">
                      <div
                        className={`absolute inset-0 rounded-full border ${
                          pillar.accent
                            ? 'border-brand-accent/45 shadow-[0_0_28px_-6px_rgba(237,73,47,0.4)]'
                            : 'border-white/12'
                        }`}
                      />
                      <motion.div
                        className="absolute inset-[4px] rounded-full border border-dashed border-white/18"
                        style={{ borderColor: pillar.accent ? 'rgba(237,73,47,0.32)' : undefined }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br sm:h-12 sm:w-12 ${
                            pillar.accent
                              ? 'from-brand-accent/30 to-brand-accent/5 text-brand-accent ring-2 ring-brand-accent/35'
                              : 'from-white/14 to-white/[0.02] text-white ring-1 ring-white/12 group-hover:ring-brand-accent/30'
                          }`}
                        >
                          <Icon size={20} strokeWidth={1.5} />
                        </div>
                      </div>
                      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-brand-accent/70">
                        {pillar.n}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-[1] min-w-0 flex-1 pt-0.5">
                    <p className="mb-1 text-[9px] font-mono uppercase tracking-[0.2em] text-white/35">Pilar</p>
                    <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">{pillar.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/52 sm:text-sm [text-wrap:pretty]">
                      {pillar.body}
                    </p>
                    <div className="mt-4 flex gap-1.5" aria-hidden>
                      <span className="h-1 w-1 rounded-full bg-brand-accent/55" />
                      <span className="h-1 w-1 rounded-full bg-white/18" />
                      <span className="h-1 w-1 rounded-full bg-white/18" />
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="mt-12 lg:mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-full border border-white/10 bg-white/[0.05] px-6 py-4 sm:px-10 sm:py-5"
        >
          <p className="text-xs sm:text-sm text-white/48 max-w-xl leading-relaxed">
            Nuestro foco inicial son las agencias de productores de seguros, pero nuestra visión es
            más amplia: cualquier organización que quiera dar el salto tecnológico.
          </p>
          <motion.a
            href="#portfolio"
            whileHover={{ x: 3 }}
            className="shrink-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-accent hover:text-white transition-colors"
          >
            Ver sistemas
            <span aria-hidden className="text-base leading-none">
              →
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
