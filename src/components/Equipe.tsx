import prisciImg from '../assets/photos/new/Prisci1.jpg'
import remyImg from '../assets/photos/new/Remy.jpg'

const membres = [
  { nom: 'Priscillia Rhéaume', role: 'Propriétaire & fondatrice', bio: 'Passionnée par les animaux depuis toujours. Elle veille à ce que chaque visite soit calme et de qualité.', img: prisciImg },
  { nom: 'Rémy Dallaire', role: 'Toiletteur certifié', bio: 'Spécialiste des coupes de race, il adapte chaque coupe au type de pelage et au tempérament de l\'animal. Patient et attentionné, il prend le temps qu\'il faut pour que chaque bête reparte à son meilleur.', img: remyImg },
  { nom: 'Ève Potvin', role: 'Préposée au toilettage', bio: "Reconnue pour sa douceur et sa précision, Ève apporte le soutien essentiel à l'équipe au quotidien. Son calme naturel met les animaux à l'aise dès leur arrivée.", img: null, initiales: 'ÈP' },
]

const Equipe = () => (
  <section id="equipe" style={{ background: '#fff', padding: '5rem 0 6rem' }}>
    <div className="site-container">

      <div style={{ marginBottom: '3.5rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2B5874', marginBottom: '1.25rem' }}>
          Équipe
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: '#111', lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0 }}>
          Votre animal entre bonnes mains
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2px', background: '#f0f0f0', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ebebeb' }}>
        {membres.map((m, i) => (
          <div key={i} style={{ background: '#fff', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Avatar */}
            <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', background: '#f4f4f5', flexShrink: 0 }}>
              {m.img
                ? <img loading="lazy" src={m.img} alt={m.nom} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#2B5874' }}>{m.initiales}</div>
              }
            </div>
            {/* Infos */}
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '4px' }}>{m.nom}</div>
              <div style={{ fontSize: '12px', color: '#aaa', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '14px' }}>{m.role}</div>
              <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.7, margin: 0 }}>{m.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Equipe
