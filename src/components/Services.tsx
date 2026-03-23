import { Clock, ArrowRight } from 'lucide-react'
import img1 from '../assets/photos/new/chien_dans_bain.jpg'
import img2 from '../assets/photos/new/coupe_chien.jpg'
import img3 from '../assets/photos/new/chat3.jpg'
import img4 from '../assets/photos/new/chien_pret.jpg'
import img5 from '../assets/photos/new/coupe_griffe.png'
import img6 from '../assets/photos/new/nettoyage_oreil.png'

const services = [
  {
    titre: 'Bain & brossage',
    detail: 'Shampooing hypoallergénique, séchage doux, démêlage complet et parfum léger.',
    durée: '45 – 60 min',
    img: img1,
    accent: '#2B5874',
  },
  {
    titre: 'Coupe & tonte',
    detail: 'Coupe aux ciseaux ou tondeuse, adaptée au standard de la race et aux souhaits du client.',
    durée: '60 – 90 min',
    img: img2,
    accent: '#1a3a4f',
  },
  {
    titre: 'Toilettage chats',
    detail: 'Bain, brossage et coupe hygiénique réalisés avec patience, dans le calme.',
    durée: '45 – 75 min',
    img: img3,
    accent: '#2B5874',
  },
  {
    titre: 'Toilettage complet',
    detail: 'Bain, coupe, griffes, oreilles, dents et parfum. Le soin tout-inclus.',
    durée: '90 – 120 min',
    img: img4,
    accent: '#1a3a4f',
  },
]

const miniServices = [
  { titre: 'Coupe de griffes', detail: 'Taille précise avec limage des arêtes vives.', durée: '10 min', img: img5, accent: '#2B5874' },
  { titre: "Nettoyage d'oreilles", detail: 'Solution douce, inspection du conduit auditif.', durée: '10 min', img: img6, accent: '#1a3a4f' },
]

const Services = () => (
  <section id="services" style={{ background: 'var(--c-white)', padding: 'var(--sp-2xl) 0' }}>
    <div className="site-container">

      {/* ── En-tête ── */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-blue)', marginBottom: '1rem' }}>
            Services
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: 'var(--tl-primary)', lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0 }}>
            Des soins adaptés<br />à chaque animal.
          </h2>
        </div>
        <a href="#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '13px', fontWeight: 500, color: 'var(--c-blue)',
          textDecoration: 'none', border: '1px solid var(--c-blue)',
          padding: '8px 16px', borderRadius: 'var(--r-md)',
          whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-blue)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-blue)' }}
        >
          Prendre rendez-vous <ArrowRight size={13} />
        </a>
      </div>

      {/* ── Grille 4 cartes principales ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '16px',
      }}>
        {services.map((s, i) => (
          <div key={i} style={{
            position: 'relative',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
            background: s.accent,
            aspectRatio: '3/4',
            cursor: 'default',
            boxShadow: 'var(--shadow-md)',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {/* Photo pleine carte */}
            <img
              loading="lazy"
              src={s.img}
              alt={s.titre}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />

            {/* Dégradé bas */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
            }} />

            {/* Badge durée — haut droite */}
            <div style={{
              position: 'absolute', top: '14px', right: '14px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '20px',
              padding: '4px 10px',
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <Clock size={10} style={{ color: 'rgba(255,255,255,0.8)' }} />
              <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.03em' }}>{s.durée}</span>
            </div>

            {/* Texte bas */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>
                {s.titre}
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, margin: 0 }}>
                {s.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── 2 mini-services — même style que les cartes ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '2.5rem',
      }}>
        {miniServices.map((s, i) => (
          <div key={i} style={{
            position: 'relative',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
            background: s.accent,
            aspectRatio: '5/3',
            boxShadow: 'var(--shadow-md)',
            transition: 'transform var(--ease)',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <img loading="lazy" src={s.img} alt={s.titre} style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', transition: 'transform 0.5s ease',
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
            <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={10} style={{ color: 'rgba(255,255,255,0.8)' }} />
              <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.03em' }}>{s.durée}</span>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 0.35rem', letterSpacing: '-0.01em' }}>{s.titre}</h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>{s.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Note bas */}
      <p style={{ fontSize: '12px', color: 'var(--tl-muted)', textAlign: 'center', margin: 0 }}>
        Tous les soins sont réalisés avec des produits hypoallergéniques de qualité professionnelle. Estimé gratuit avant chaque visite.
      </p>

    </div>
  </section>
)

export default Services
