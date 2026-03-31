import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'

const smokeVariants = [
  { delay: 0,    duration: 2.4, scale: [0.8, 1.15, 0.8], opacity: [0.25, 0.5, 0.25], cx: 160, cy: 20, rx: 72, ry: 32 },
  { delay: 0.3,  duration: 2.8, scale: [0.9, 1.2,  0.9], opacity: [0.2,  0.4, 0.2],  cx: 130, cy: 38, rx: 55, ry: 26 },
  { delay: 0.6,  duration: 3.1, scale: [0.85,1.18, 0.85],opacity: [0.3,  0.55,0.3],  cx: 195, cy: 35, rx: 60, ry: 28 },
  { delay: 0.9,  duration: 2.6, scale: [0.8, 1.1,  0.8], opacity: [0.15, 0.35,0.15], cx: 108, cy: 55, rx: 42, ry: 20 },
  { delay: 1.2,  duration: 3.4, scale: [0.9, 1.22, 0.9], opacity: [0.2,  0.4, 0.2],  cx: 215, cy: 52, rx: 48, ry: 22 },
  { delay: 1.5,  duration: 2.9, scale: [0.88,1.15,0.88], opacity: [0.12, 0.28,0.12], cx: 160, cy: 68, rx: 80, ry: 28 },
]

function SmokeCloud({ config, launched }) {
  return (
    <motion.ellipse
      cx={config.cx}
      cy={config.cy}
      rx={config.rx}
      ry={config.ry}
      fill="rgba(30,30,36,0.18)"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={launched ? {
        scale: config.scale,
        opacity: config.opacity,
      } : { scale: 0.6, opacity: 0 }}
      transition={{
        delay: config.delay + 0.8,
        duration: config.duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ transformOrigin: `${config.cx}px ${config.cy}px` }}
    />
  )
}

export default function RocketScene() {
  const controls = useAnimation()
  const [launched, setLaunched] = useState(false)

  useEffect(() => {
    async function launch() {
      await controls.start({
        y: 0,
        opacity: 1,
        x: [0, -5, 5, -4, 4, -2, 2, 0],
        transition: {
          y: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 0.4 },
          x: { duration: 1.3, ease: 'easeOut', times: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1] },
        },
      })
      setLaunched(true)
      controls.start({
        y: [0, -14, 0],
        transition: {
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      })
    }
    launch()
  }, [controls])

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Rocket */}
      <motion.div
        initial={{ y: 320, opacity: 0 }}
        animate={controls}
        className="relative z-10"
        style={{ width: 180, height: 320 }}
      >
        <svg
          viewBox="0 0 180 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl"
        >
          {/* === ROCKET BODY === */}
          {/* Main body ellipsoid */}
          <ellipse cx="90" cy="175" rx="52" ry="105" fill="#1E1E24" />

          {/* Nose cone */}
          <path
            d="M90 20 C65 60 38 100 38 145 L142 145 C142 100 115 60 90 20Z"
            fill="#1E1E24"
          />
          {/* Nose tip highlight */}
          <ellipse cx="90" cy="22" rx="6" ry="4" fill="#2d2d36" />

          {/* Body highlight stripe (left) */}
          <path
            d="M55 110 Q52 175 56 240"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* === WINDOW === */}
          <circle cx="90" cy="145" r="22" fill="#2a2a32" />
          <circle cx="90" cy="145" r="18" fill="#1E1E24" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          {/* window shine */}
          <circle cx="83" cy="139" r="6" fill="rgba(255,255,255,0.08)" />

          {/* === LIGHTNING BOLT (brand accent) === */}
          <path
            d="M95 130 L84 148 L91 148 L86 165 L101 144 L93 144 Z"
            fill="#ED492F"
          />

          {/* === FINS (curved, left) === */}
          <path
            d="M38 230 C24 235 10 255 12 278 C18 272 28 262 38 258 Z"
            fill="#1E1E24"
          />
          <path
            d="M38 230 C30 242 28 256 38 258"
            fill="#252530"
          />

          {/* === FINS (curved, right) === */}
          <path
            d="M142 230 C156 235 170 255 168 278 C162 272 152 262 142 258 Z"
            fill="#1E1E24"
          />
          <path
            d="M142 230 C150 242 152 256 142 258"
            fill="#252530"
          />

          {/* === NOZZLE === */}
          <path
            d="M68 270 L112 270 L118 290 L62 290 Z"
            fill="#14141a"
          />
          <ellipse cx="90" cy="290" rx="28" ry="7" fill="#0d0d12" />

          {/* === FLAME === */}
          {/* Outer flame */}
          <motion.ellipse
            cx="90" cy="306"
            rx="20" ry="14"
            fill="#ED492F"
            animate={{ ry: [14, 18, 12, 16, 14], opacity: [0.9, 1, 0.8, 1, 0.9] }}
            transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
          />
          {/* Inner flame */}
          <motion.ellipse
            cx="90" cy="302"
            rx="11" ry="10"
            fill="#FF7A5C"
            animate={{ ry: [10, 14, 9, 12, 10] }}
            transition={{ duration: 0.25, repeat: Infinity, ease: 'linear', delay: 0.05 }}
          />
          {/* Core flame */}
          <motion.ellipse
            cx="90" cy="298"
            rx="5" ry="6"
            fill="#FFD4CC"
            animate={{ ry: [6, 9, 5, 8, 6] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: 'linear', delay: 0.1 }}
          />

          {/* Subtle body seam */}
          <line x1="90" y1="145" x2="90" y2="270" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Smoke / clouds */}
      <div className="relative -mt-4 w-full" style={{ height: 90 }}>
        <svg
          viewBox="0 0 320 90"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {smokeVariants.map((config, i) => (
            <SmokeCloud key={i} config={config} launched={launched} />
          ))}
        </svg>
      </div>
    </div>
  )
}
