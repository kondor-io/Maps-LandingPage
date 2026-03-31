import { motion } from 'framer-motion'
import { GripVertical } from 'lucide-react'

const blocks = [
  {
    title: 'Quiénes somos',
    body: 'Una fábrica de software de cuatro personas diseñada para construir con criterio, sin atajos y con ingeniería real.',
  },
  {
    title: 'Qué hacemos',
    body: 'Creamos sistemas que dan a organizaciones medianas el nivel tecnológico y operativo de una gran corporación.',
  },
  {
    title: 'Qué obtienes',
    body: 'Sistemas que evolucionan, procesos que escalan y una ventaja competitiva construida desde la ingeniería.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function InfoBlocks() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {blocks.map((block) => (
        <motion.div
          key={block.title}
          variants={itemVariants}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="group flex items-start gap-3 cursor-default"
        >
          <div className="mt-1 text-gray-300 group-hover:text-brand-accent transition-colors duration-200 shrink-0">
            <GripVertical size={16} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-brand-dark mb-1 group-hover:text-brand-accent transition-colors duration-200">
              {block.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {block.body}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
