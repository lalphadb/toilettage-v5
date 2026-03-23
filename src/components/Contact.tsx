import { useState } from 'react'
import { Phone, MapPin, Clock, Mail, Facebook, ArrowRight, CheckCircle, AlertCircle, Star } from 'lucide-react'

const FORMSPREE_ID = 'xzzbjkop'

const Contact = () => {
  const [form, setForm] = useState({ nom: '', telephone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validate = (data = form) => {
    const e: Record<string, string> = {}
    if (!data.nom.trim()) e.nom = 'Requis'
    if (!data.telephone.trim()) e.telephone = 'Requis'
    else if (!/^[\d\s\-().+]{7,15}$/.test(data.telephone.trim())) e.telephone = 'Format invalide'
    return e
  }

  const handleBlur = (name: string) => {
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(validate())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setTouched({ nom: true, telephone: true })
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    setError(false)
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ nom: form.nom, telephone: form.telephone, service: form.service || 'Non précisé', message: form.message }),
      })
      if (res.ok) { setSent(true); setForm({ nom: '', telephone: '', service: '', message: '' }) }
      else setError(true)
    } catch { setError(true) }
    finally { setSubmitting(false) }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const updated = { ...form, [name]: value }
    setForm(updated)
    if (touched[name]) setErrors(v => ({ ...v, [name]: validate(updated)[name] || '' }))
  }

  return (
    <section id="contact" style={{ background: 'var(--c-offwhite)', padding: 'var(--sp-2xl) 0' }}>
      <div className="site-container" style={{ maxWidth: '1080px' }}>

        {/* ── Bandeau supérieur — appel direct ── */}
        <div style={{
          background: 'var(--c-navy)',
          borderRadius: 'var(--r-xl)',
          padding: '2.5rem 3rem',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: '1.5rem',
          marginBottom: '2px',
        }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.6rem' }}>
              La façon la plus rapide
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--c-white)', lineHeight: 1.1, margin: 0 }}>
              Appelez-nous directement
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
            <a href="tel:+15819850212" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700,
              color: 'var(--c-white)', textDecoration: 'none', lineHeight: 1,
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <Phone size={22} style={{ opacity: 0.5 }} />
              581 985-0212
            </a>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
              Lun–Ven · Estimé gratuit · Réponse le jour même
            </p>
          </div>
        </div>

        {/* ── Séparateur "OU" ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--c-border)' }} />
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--tl-muted)', textTransform: 'uppercase' }}>ou</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--c-border)' }} />
        </div>

        {/* ── Zone principale : formulaire + infos ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2px',
          background: 'var(--c-border)',
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
        }}>

          {/* Formulaire */}
          <div style={{ background: 'var(--c-white)', padding: '2.5rem 2.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--tl-primary)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
              Écrivez-nous
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--tl-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              On vous rappelle sous 24h avec un estimé personnalisé.
            </p>

            <div aria-live="polite" aria-atomic="true">
              {sent ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.5rem 0', gap: '1rem', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(43,88,116,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={28} style={{ color: 'var(--c-blue)' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '17px', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--tl-primary)', margin: '0 0 0.4rem' }}>Message reçu !</p>
                    <p style={{ fontSize: '14px', color: 'var(--tl-secondary)', margin: '0 0 0.25rem' }}>On vous rappelle dans les 24 heures.</p>
                    <p style={{ fontSize: '13px', color: 'var(--tl-muted)', margin: 0 }}>
                      Urgent ? <a href="tel:+15819850212" style={{ color: 'var(--c-blue)', textDecoration: 'none', fontWeight: 500 }}>581 985-0212</a>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {error && (
                    <div role="alert" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--r-sm)', padding: '10px 14px' }}>
                      <AlertCircle size={14} style={{ color: '#ef4444', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: '#dc2626' }}>Erreur. Appelez-nous au <a href="tel:+15819850212" style={{ color: '#dc2626', fontWeight: 500 }}>581 985-0212</a>.</span>
                    </div>
                  )}

                  {/* Nom + Téléphone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {[
                      { id: 'nom', label: 'Nom *', type: 'text', placeholder: 'Jean Dupont', auto: 'name', max: 60 },
                      { id: 'telephone', label: 'Téléphone *', type: 'tel', placeholder: '581 985-0212', auto: 'tel', max: 15 },
                    ].map(f => (
                      <div key={f.id}>
                        <label htmlFor={f.id} style={{
                          display: 'block', fontSize: '12px', fontWeight: 500, marginBottom: '6px',
                          color: touched[f.id] && errors[f.id] ? '#dc2626' : 'var(--tl-secondary)',
                        }}>{f.label}</label>
                        <input id={f.id} type={f.type} name={f.id}
                          value={form[f.id as keyof typeof form]}
                          onChange={onChange} onBlur={() => handleBlur(f.id)}
                          placeholder={f.placeholder} maxLength={f.max} autoComplete={f.auto}
                          aria-invalid={touched[f.id] && !!errors[f.id]}
                          aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
                          style={{
                            width: '100%', boxSizing: 'border-box', padding: '10px 12px',
                            background: 'var(--c-offwhite)',
                            border: `1.5px solid ${touched[f.id] && errors[f.id] ? '#fca5a5' : touched[f.id] && !errors[f.id] ? 'rgba(43,88,116,0.4)' : 'var(--c-border)'}`,
                            borderRadius: 'var(--r-sm)', fontSize: '14px', color: 'var(--tl-primary)', outline: 'none',
                          }} />
                        {touched[f.id] && errors[f.id] && (
                          <p id={`${f.id}-error`} role="alert" style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>{errors[f.id]}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--tl-secondary)', marginBottom: '6px' }}>
                      Service <span style={{ color: 'var(--tl-muted)', fontWeight: 400 }}>— optionnel</span>
                    </label>
                    <select id="service" name="service" value={form.service} onChange={onChange}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', background: 'var(--c-offwhite)', border: '1.5px solid var(--c-border)', borderRadius: 'var(--r-sm)', fontSize: '14px', color: form.service ? 'var(--tl-primary)' : 'var(--tl-muted)', outline: 'none' }}>
                      <option value="">Quel service vous intéresse ?</option>
                      <option value="Bain & brossage">Bain &amp; brossage</option>
                      <option value="Coupe & tonte">Coupe &amp; tonte</option>
                      <option value="Toilettage pour chat">Toilettage pour chat</option>
                      <option value="Coupe de griffes">Coupe de griffes</option>
                      <option value="Toilettage complet">Toilettage complet</option>
                      <option value="Autre / Je ne sais pas">Autre / Je ne sais pas encore</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--tl-secondary)', marginBottom: '6px' }}>
                      Votre animal <span style={{ color: 'var(--tl-muted)', fontWeight: 400 }}>— race, âge, état du pelage</span>
                    </label>
                    <textarea id="message" name="message" value={form.message} onChange={onChange} rows={3}
                      placeholder="Ex : Golden retriever, 3 ans, pelage emmêlé..."
                      maxLength={800}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', background: 'var(--c-offwhite)', border: '1.5px solid var(--c-border)', borderRadius: 'var(--r-sm)', fontSize: '14px', color: 'var(--tl-primary)', outline: 'none', resize: 'none', lineHeight: 1.6 }} />
                  </div>

                  <button type="submit" disabled={submitting} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%', padding: '13px',
                    background: submitting ? '#cbd5e1' : 'var(--c-navy)',
                    color: submitting ? '#94a3b8' : 'var(--c-white)',
                    border: 'none', borderRadius: 'var(--r-md)',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    fontSize: '14px', fontWeight: 600,
                    transition: 'background var(--ease), transform var(--ease)',
                  }}
                    onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = 'var(--c-blue)'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                    onMouseLeave={e => { e.currentTarget.style.background = submitting ? '#cbd5e1' : 'var(--c-navy)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {submitting ? 'Envoi...' : <>Envoyer <ArrowRight size={14} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Infos + avis */}
          <div style={{ background: 'var(--c-navy)', padding: '2.5rem 2.25rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Avis */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '3px', marginBottom: '0.75rem' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={13} style={{ fill: '#f59e0b', color: '#f59e0b' }} />)}
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginLeft: '6px' }}>5.0 · Google</span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 0.6rem', fontStyle: 'italic' }}>
                "Notre golden a été traité avec beaucoup de douceur. Le résultat est impeccable."
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>— Marie-Claude B.</p>
            </div>

            {/* Coordonnées */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: <Clock size={13} />, label: 'Horaires', lines: ['Lun & Ven : 9h30 – 15h00', 'Mar – Jeu : 9h30 – 18h00', 'Sam – Dim : Fermé'] },
                { icon: <MapPin size={13} />, label: 'Adresse', lines: ['1590 rue Jacques Bidard', 'Québec, QC  G3G 1R1'] },
                { icon: <Mail size={13} />, label: 'Courriel', lines: ['info@toilettagedeslacs.ca'], href: 'mailto:info@toilettagedeslacs.ca' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'rgba(255,255,255,0.25)', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '5px' }}>{item.label}</p>
                    {item.lines.map((l, j) =>
                      item.href
                        ? <a key={j} href={item.href} style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', lineHeight: 1.6 }}>{l}</a>
                        : <p key={j} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>{l}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Facebook */}
            <a href="https://www.facebook.com/lacstcharles" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', marginTop: 'auto' }}>
              <Facebook size={13} style={{ color: '#1877F2' }} />
              Suivez-nous sur Facebook
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
