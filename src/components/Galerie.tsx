import { useEffect, useRef, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

import p1  from '../assets/photos/new/Avant_apres.jpg'
import p2  from '../assets/photos/new/Avant_apres4.jpg'
import p3  from '../assets/photos/new/avant_apres3.jpg'
import p4  from '../assets/photos/new/avant apres6.jpg'
import p5  from '../assets/photos/new/avant_apres8.jpg'
import p6  from '../assets/photos/new/Belle_grimasse.jpg'
import p7  from '../assets/photos/new/Buffy.jpg'
import p8  from '../assets/photos/new/Gros_chien.jpg'
import p9  from '../assets/photos/new/Husky.jpg'
import p10 from '../assets/photos/new/chien_blanc cute.jpg'
import p11 from '../assets/photos/new/chien_brun.jpg'
import p12 from '../assets/photos/new/chien_gold.jpg'
import p13 from '../assets/photos/new/chat1.jpg'
import p14 from '../assets/photos/new/chat3.jpg'
import p15 from '../assets/photos/new/pomeramien.jpg'
import p16 from '../assets/photos/new/shiba.jpg'
import p17 from '../assets/photos/new/chien_pret.jpg'
import p18 from '../assets/photos/new/cute3.jpg'
import p19 from '../assets/photos/new/chien_terminer1.jpg'
import p20 from '../assets/photos/new/petit_chien.jpg'

const photos = [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20]
const avantApresIdx = new Set([0,1,2,3,4])

const Galerie = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  // Défilement automatique infini
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const speed = 0.55 // px par frame

    const step = () => {
      if (!paused) {
        posRef.current += speed
        const half = track.scrollWidth / 2
        if (posRef.current >= half) posRef.current = 0
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [paused])

  // Clavier lightbox
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex(n => n !== null ? (n + 1) % photos.length : null)
      if (e.key === 'ArrowLeft')  setLightboxIndex(n => n !== null ? (n - 1 + photos.length) % photos.length : null)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [lightboxIndex])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    if (lightboxIndex !== null) {
      // Focus trap : focus sur le premier bouton de la lightbox
      setTimeout(() => {
        const firstBtn = lightboxRef.current?.querySelector('button')
        firstBtn?.focus()
      }, 50)
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  // Focus trap : garder le focus dans la lightbox
  useEffect(() => {
    if (lightboxIndex === null) return
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !lightboxRef.current) return
      const focusable = Array.from(lightboxRef.current.querySelectorAll<HTMLElement>('button'))
      if (!focusable.length) return
      const first = focusable[0], last = focusable[focusable.length - 1]
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
      else { if (document.activeElement === last) { e.preventDefault(); first.focus() } }
    }
    window.addEventListener('keydown', trap)
    return () => window.removeEventListener('keydown', trap)
  }, [lightboxIndex])

  const openLightbox = (i: number, btn?: HTMLButtonElement) => {
    if (btn) triggerRef.current = btn
    setPaused(true)
    setLightboxIndex(i)
  }
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    setPaused(false)
    setTimeout(() => triggerRef.current?.focus(), 50)
  }, [])

  // Duplication pour le loop infini
  const doubled = [...photos, ...photos]

  return (
    <section id="galerie" style={{ background: '#fff', padding: '6rem 0', overflow: 'hidden' }}>

      {/* En-tête */}
      <div className="site-container" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2B5874', marginBottom: '1rem' }}>
              Réalisations
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, color: '#111', lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0 }}>
              Nos clients après leur séance
            </h2>
          </div>
          <p style={{ fontSize: '13px', color: '#aaa', maxWidth: '30ch', lineHeight: 1.65, margin: 0 }}>
            Cliquez sur une photo pour l'agrandir.<br />
            Les premières montrent le résultat avant / après.
          </p>
        </div>
      </div>

      {/* Bande défilante */}
      <div
        style={{ overflow: 'hidden', cursor: 'grab', userSelect: 'none' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => lightboxIndex === null && setPaused(false)}
      >
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: '10px', willChange: 'transform' }}
        >
          {doubled.map((src, i) => {
            const realIdx = i % photos.length
            const isAA = avantApresIdx.has(realIdx)
            return (
              <button
                key={i}
                onClick={(e) => openLightbox(realIdx, e.currentTarget as HTMLButtonElement)}
                aria-label={isAA ? "Voir photo avant/après agrandie" : "Voir photo agrandie"}
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  width: isAA ? '340px' : '260px',
                  height: '320px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: 'none',
                  padding: 0,
                  background: 'transparent',
                  display: 'block',
                }}>
                <img loading="lazy"
                  src={src}
                  alt="Réalisation"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {isAA && (
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                    color: '#fff', fontSize: '11px', fontWeight: 500,
                    padding: '4px 10px', borderRadius: '4px', letterSpacing: '0.05em',
                    pointerEvents: 'none',
                  }}>
                    Avant / Après
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${lightboxIndex !== null ? lightboxIndex + 1 : ''} sur ${photos.length}`}
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <button onClick={closeLightbox} aria-label="Fermer la photo" style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '8px' }}>
            <X size={22} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); setLightboxIndex(n => n !== null ? (n - 1 + photos.length) % photos.length : null) }}
            style={{ position: 'absolute', left: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '12px' }}
          >
            <ChevronLeft size={26} />
          </button>
          <img loading="lazy"
            src={photos[lightboxIndex]}
            alt="Photo agrandie"
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '88vh', maxWidth: '88vw', objectFit: 'contain', borderRadius: '6px', display: 'block' }}
          />
          <button
            onClick={e => { e.stopPropagation(); setLightboxIndex(n => n !== null ? (n + 1) % photos.length : null) }}
            style={{ position: 'absolute', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '12px' }}
          >
            <ChevronRight size={26} />
          </button>
          <p style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em', margin: 0 }}>
            {lightboxIndex + 1} / {photos.length}
          </p>
        </div>
      )}
    </section>
  )
}

export default Galerie
