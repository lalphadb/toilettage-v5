import img1 from '../assets/photos/new/chien_dans_bain.jpg'
import img2 from '../assets/photos/new/coupe_chien.jpg'
import img3 from '../assets/photos/new/chat3.jpg'

const services = [
  { titre: 'Bain & brossage', detail: 'Shampooing hypoallergénique, séchage doux, parfum léger', durée: '45–60 min', img: img1 },
  { titre: 'Coupe & tonte', detail: 'Coupe aux ciseaux ou tondeuse, adaptée à la race', durée: '60–90 min', img: img2 },
  { titre: 'Toilettage pour chats', detail: 'Bain, brossage et coupe hygiénique, approche patiente', durée: '45–75 min', img: img3 },
  { titre: 'Toilettage complet', detail: 'Bain, coupe, griffes, oreilles, dents, parfum', durée: '90–120 min', img: null },
  { titre: 'Coupe de griffes', detail: 'Taille précise avec limage des arêtes', durée: '10 min', img: null },
  { titre: "Nettoyage d'oreilles", detail: 'Solution douce, vérification du conduit', durée: '10 min', img: null },
]

const Services = () => (
  <section id="services" style={{ background: '#f7f7f8', padding: '5rem 0 6rem' }}>
    <div className="site-container">

      {/* En-tête */}
      <div style={{ marginBottom: '3.5rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2B5874', marginBottom: '1.25rem' }}>
          Services
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: '#111', lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0 }}>
            Ce que nous faisons
          </h2>
          <a href="#contact" style={{ fontSize: '13px', color: '#2B5874', textDecoration: 'none', borderBottom: '1px solid #2B5874', paddingBottom: '2px', whiteSpace: 'nowrap' }}>
            Prendre rendez-vous →
          </a>
        </div>
      </div>

      {/* Table de services */}
      <div style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ebebeb', marginBottom: '2rem' }}>
        {services.map((s, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: s.img ? '1fr auto auto' : '1fr auto auto',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '1.25rem 1.75rem',
            borderBottom: i < services.length - 1 ? '1px solid #f4f4f4' : 'none',
            background: i % 2 === 0 ? '#fff' : '#fafafa',
          }}>
            {/* Titre + detail */}
            <div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#1a1a1a', marginBottom: '3px' }}>{s.titre}</div>
              <div style={{ fontSize: '13px', color: '#999', lineHeight: 1.5 }}>{s.detail}</div>
            </div>
            {/* Durée */}
            <div style={{ fontSize: '13px', color: '#bbb', whiteSpace: 'nowrap', textAlign: 'right' }}>
              {s.durée}
            </div>
            {/* Photo miniature ou vide */}
            <div style={{ width: '52px', height: '52px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#f0f0f0' }}>
              {s.img && <img loading="lazy" src={s.img} alt={s.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '12px', color: '#bbb', textAlign: 'center' }}>
        Tous les services sont réalisés avec des produits hypoallergéniques de qualité professionnelle.
      </p>
    </div>
  </section>
)

export default Services
