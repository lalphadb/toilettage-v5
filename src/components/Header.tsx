import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import logoImg from '../assets/photos/new/logo_entreprise.jpg'

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#tarifs', label: 'Tarifs' },
  { href: '/#galerie', label: 'Réalisations' },
  { href: '/#equipe', label: 'Équipe' },
  { href: '/#contact', label: 'Contact' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Détection section active via IntersectionObserver
  useEffect(() => {
    if (!isHome) return
    const ids = ['accueil', 'services', 'tarifs', 'galerie', 'equipe', 'contact']
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [isHome])

  const isActive = (href: string) => {
    const section = href.replace('/#', '')
    return activeSection === section
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled || menuOpen ? 'rgba(43,88,116,0.97)' : 'transparent',
      backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'background 0.25s ease, border-color 0.25s ease, backdrop-filter 0.25s ease',
    }}>
      <div className="site-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img src={logoImg} alt="Logo Toilettage Des Lacs" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 700, color: 'var(--c-white)', letterSpacing: '-0.01em' }}>
            Toilettage Des Lacs
          </span>
        </Link>

        {/* Nav desktop */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden md:flex">
          {navLinks.map(l => (
            <Link key={l.href} to={l.href} style={{
              fontSize: '13px', fontWeight: 500,
              color: isActive(l.href) ? 'var(--c-white)' : 'var(--t-secondary)',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: 'var(--r-sm)',
              background: isActive(l.href) ? 'rgba(255,255,255,0.08)' : 'transparent',
              position: 'relative',
            }}>
              {l.label}
              {isActive(l.href) && (
                <span style={{
                  position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%)',
                  width: '16px', height: '2px', background: 'var(--c-teal-light)',
                  borderRadius: '2px',
                }} />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA téléphone — toujours visible */}
        <a href="tel:+15819850212"
          className="hidden md:inline-flex"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: 'var(--c-teal)', color: 'var(--c-white)',
            fontSize: '13px', fontWeight: 600,
            padding: '8px 16px', borderRadius: 'var(--r-md)',
            textDecoration: 'none',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#1e4d65')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--c-teal)')}
        >
          <Phone size={13} /> Appeler
        </a>

        {/* Burger mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-white)', padding: '4px' }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div style={{ background: 'rgba(43,88,116,0.98)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1rem 0 1.5rem' }}>
          <div className="site-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map(l => (
              <Link key={l.href} to={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: '15px', fontWeight: 500,
                  color: isActive(l.href) ? 'var(--c-white)' : 'var(--t-secondary)',
                  textDecoration: 'none', padding: '10px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                {l.label}
              </Link>
            ))}
            {/* CTA mobile bien visible */}
            <a href="tel:+15819850212"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                marginTop: '1rem',
                background: 'var(--c-teal)', color: 'var(--c-white)',
                fontSize: '15px', fontWeight: 600,
                padding: '13px 20px', borderRadius: 'var(--r-md)',
                textDecoration: 'none',
              }}>
              <Phone size={15} /> 581 985-0212
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
