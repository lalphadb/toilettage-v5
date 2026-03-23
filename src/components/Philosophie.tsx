import { useEffect, useRef, useState } from 'react'
import philoImg from '../assets/photos/new/Prisci_et_nala.jpg'

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let v = 0
    const step = target / (duration / 16)
    const t = setInterval(() => {
      v += step
      if (v >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(v))
    }, 16)
    return () => clearInterval(t)
  }, [active, target, duration])
  return count
}

const stats = [
  { suffix: '+', label: 'ans d\'expérience', target: 10, duration: 1000 },
  { suffix: ' k+', label: 'animaux toilettés', target: 5, duration: 1200 },
  { suffix: ' ★', label: 'note Google', target: 5, duration: 800 },
]

const Philosophie = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [countingStarted, setCountingStarted] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setCountingStarted(true); obs.disconnect() } }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const counts = [
    useCountUp(stats[0].target, stats[0].duration, countingStarted),
    useCountUp(stats[1].target, stats[1].duration, countingStarted),
    useCountUp(stats[2].target, stats[2].duration, countingStarted),
  ]

  return (
    <section id="philosophie" className="bg-white" style={{ padding: '6rem 0' }}>
      <div className="site-container">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Texte */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2B5874', marginBottom: '1.5rem' }}>
              Notre approche
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#111', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1.75rem' }}>
              Des soins adaptés à chaque animal
            </h2>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '44ch' }}>
              Depuis 2014, chaque animal est accueilli calmement et traité selon sa personnalité.
              Produits hypoallergéniques, toiletteurs certifiés, environnement bienveillant.
            </p>

            {/* Stats */}
            <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', paddingTop: '2rem', borderTop: '1px solid #f0f0f0' }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 700, color: '#111', lineHeight: 1 }}>
                    {counts[i]}{s.suffix}
                  </div>
                  <div style={{ fontSize: '12px', color: '#aaa', marginTop: '8px', lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 'clamp(240px, 32vw, 360px)', aspectRatio: '1' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#f4f4f5' }} />
              <img loading="lazy" src={philoImg} alt="Priscillia et Nala" style={{
                position: 'absolute', inset: '10px',
                width: 'calc(100% - 20px)', height: 'calc(100% - 20px)',
                borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top',
              }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Philosophie
