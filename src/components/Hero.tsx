import { Phone, ArrowRight } from 'lucide-react'
import salonImg from '../assets/photos/new/salon.png'

const Hero = () => (
  <section
    id="accueil"
    style={{
      background: 'linear-gradient(140deg, var(--c-navy) 0%, var(--c-navy-mid) 55%, var(--c-blue) 100%)',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Fond radial subtil */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse at 70% 50%, rgba(43,88,116,0.08) 0%, transparent 65%)',
    }} />

    <div className="site-container" style={{ paddingTop: '7rem', paddingBottom: '6rem', position: 'relative', zIndex: 1 }}>
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* ── Texte ── */}
        <div>

          {/* Surtitre */}
          <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--t-muted)', marginBottom: '1.5rem' }}>
            Toilettage Des Lacs · Québec depuis 2014
          </p>

          {/* Un seul message fort */}
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(34px, 4.5vw, 56px)', fontWeight: 700, color: 'var(--c-white)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}>
            Votre animal mérite<br />
            <span style={{ color: 'var(--c-teal-light)' }}>le meilleur soin.</span>
          </h1>

          <p style={{ fontSize: '16px', color: 'var(--t-secondary)', lineHeight: 1.7, maxWidth: '42ch', marginBottom: '2.5rem' }}>
            Salon de toilettage professionnel pour chiens et chats à Québec. Équipe certifiée, produits doux, estimé gratuit avant chaque visite.
          </p>

          {/* CTAs : principal + secondaire */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>

            {/* CTA principal — appel */}
            <a href="tel:+15819850212" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'var(--c-teal)', color: 'var(--c-white)',
              fontSize: '15px', fontWeight: 600, letterSpacing: '0.01em',
              padding: '14px 28px', borderRadius: 'var(--r-md)',
              textDecoration: 'none', boxShadow: '0 4px 16px rgba(43,88,116,0.45)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1e4d65'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--c-teal)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <Phone size={16} />
              581 985-0212
            </a>

            {/* CTA secondaire — formulaire */}
            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--t-primary)', fontSize: '14px', fontWeight: 500,
              padding: '13px 24px', borderRadius: 'var(--r-md)',
              textDecoration: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            >
              Prendre rendez-vous <ArrowRight size={14} style={{ opacity: 0.6 }} />
            </a>
          </div>

        </div>

        {/* ── Image ── */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            position: 'relative',
            width: 'clamp(220px, 30vw, 360px)',
            aspectRatio: '1',
          }}>
            {/* Anneau décoratif teal */}
            <div style={{
              position: 'absolute', inset: '-12px',
              borderRadius: '50%',
              border: '2px solid rgba(43,88,116,0.25)',
            }} />
            <img src={salonImg} alt="Salon Toilettage Des Lacs" style={{
              width: '100%', height: '100%',
              borderRadius: '50%', objectFit: 'cover',
              boxShadow: 'var(--shadow-lg)',
            }} />
          </div>
        </div>
      </div>
    </div>

    {/* Wave */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
      <svg viewBox="0 0 1440 56" style={{ width: '100%', display: 'block' }} preserveAspectRatio="none">
        <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="#ffffff" />
      </svg>
    </div>
  </section>
)

export default Hero
