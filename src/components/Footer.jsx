const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Visión', href: '#vision' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-brand-dark border border-white/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  fill="#ED492F"
                  stroke="#ED492F"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <span className="text-white font-bold text-sm tracking-tight">Kondor</span>
              <p className="text-gray-600 text-xs mt-0.5">Ingeniería con criterio.</p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-600">
            © 2025 Kondor. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
