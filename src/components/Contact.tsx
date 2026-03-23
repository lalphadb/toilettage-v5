import { useState } from 'react'
import { MapPin, Clock, Mail, Facebook, Send, CheckCircle, AlertCircle, Star } from 'lucide-react'

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
    if (!data.nom.trim()) e.nom = 'Votre nom est requis'
    if (!data.telephone.trim()) e.telephone = 'Votre numéro est requis'
    else if (!/^[\d\s\-().+]{7,15}$/.test(data.telephone.trim())) e.telephone = 'Format invalide (ex: 581 985-0212)'
    return e
  }

  const handleBlur = (name: string) => {
    setTouched(t => ({ ...t, [name]: true }))
    const errs = validate()
    setErrors(errs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setTouched({ nom: true, telephone: true })
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitting(true)
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
    if (touched[name]) {
      const errs = validate(updated)
      setErrors(prev => ({ ...prev, [name]: errs[name] || '' }))
    }
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    width: '100%', boxSizing: 'border-box',
    padding: '12px 14px',
    background: 'rgba(255,255,255,0.06)',
    border: `1.5px solid ${touched[name] && errors[name] ? 'rgba(248,113,113,0.6)' : touched[name] && !errors[name] ? 'rgba(42,157,143,0.5)' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 'var(--r-sm)',
    fontSize: '14px', color: 'var(--t-primary)',
    outline: 'none', transition: 'border-color var(--ease)',
  })

  return (
    <section id="contact" style={{ background: 'var(--c-navy)', padding: 'var(--sp-2xl) 0' }}>
      <div className="site-container" style={{ maxWidth: '1020px' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--c-teal)', marginBottom: '1rem' }}>Contact</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: 'var(--c-white)', lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0 }}>
            Prenons contact
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>

          {/* ── Colonne gauche : preuves + infos ── */}
          <div>

            {/* Preuves de confiance */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 'var(--r-lg)', padding: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '0.5rem' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={15} style={{ fill: '#f59e0b', color: '#f59e0b' }} />)}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--t-secondary)', lineHeight: 1.6, margin: '0 0 0.75rem' }}>
                "Notre golden a été traité avec beaucoup de douceur. Le résultat est impeccable. On reviendra sans hésiter."
              </p>
              <p style={{ fontSize: '12px', color: 'var(--t-muted)', margin: 0 }}>— Marie-Claude B., cliente depuis 2021</p>
            </div>

            {/* Téléphone */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--t-muted)', marginBottom: '0.6rem' }}>Appelez directement</p>
              <a href="tel:+15819850212" style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: 700, color: 'var(--c-white)', textDecoration: 'none', lineHeight: 1 }}>
                581 985-0212
              </a>
              <p style={{ fontSize: '13px', color: 'var(--t-muted)', margin: '6px 0 0' }}>Estimé gratuit · Réponse le jour même</p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                { icon: <Clock size={13} />, label: 'Horaires', value: 'Lun & Ven : 9h30–15h\nMar–Jeu : 9h30–18h\nSam–Dim : Fermé' },
                { icon: <MapPin size={13} />, label: 'Adresse', value: '1590 rue Jacques Bidard\nQuébec, QC  G3G 1R1' },
                { icon: <Mail size={13} />, label: 'Courriel', value: 'info@toilettagedeslacs.ca', href: 'mailto:info@toilettagedeslacs.ca' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--t-hint)', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--t-hint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{item.label}</p>
                    {item.href
                      ? <a href={item.href} style={{ fontSize: '13px', color: 'var(--t-secondary)', textDecoration: 'none' }}>{item.value}</a>
                      : <p style={{ fontSize: '13px', color: 'var(--t-secondary)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>{item.value}</p>}
                  </div>
                </div>
              ))}
              <a href="https://www.facebook.com/lacstcharles" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13px', color: 'var(--t-muted)', textDecoration: 'none', marginTop: '0.25rem' }}>
                <Facebook size={13} style={{ color: '#1877F2' }} />
                Suivez-nous sur Facebook
              </a>
            </div>
          </div>

          {/* ── Colonne droite : formulaire ── */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--t-primary)', margin: 0 }}>Envoyer un message</p>
              <p style={{ fontSize: '12px', color: 'var(--t-muted)', margin: 0 }}>Réponse sous 24h</p>
            </div>

            <div style={{ padding: '1.75rem' }}>
              <div aria-live="polite" aria-atomic="true">
                {sent ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.5rem 0', gap: '1rem', textAlign: 'center' }}>
                    <CheckCircle size={36} style={{ color: 'var(--c-teal)' }} />
                    <div>
                      <p style={{ fontSize: '17px', fontFamily: 'var(--font-serif)', color: 'var(--t-primary)', margin: '0 0 0.5rem' }}>Message envoyé !</p>
                      <p style={{ fontSize: '14px', color: 'var(--t-secondary)', margin: '0 0 0.25rem' }}>On vous rappelle dans les 24 heures.</p>
                      <p style={{ fontSize: '13px', color: 'var(--t-muted)', margin: 0 }}>En urgence : <a href="tel:+15819850212" style={{ color: 'var(--c-teal-light)', textDecoration: 'none' }}>581 985-0212</a></p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {error && (
                      <div role="alert" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--r-sm)', padding: '10px 14px' }}>
                        <AlertCircle size={14} style={{ color: '#f87171', flexShrink: 0 }} />
                        <span style={{ fontSize: '13px', color: '#fca5a5' }}>Erreur d'envoi. Appelez-nous au <a href="tel:+15819850212" style={{ color: '#fca5a5' }}>581 985-0212</a>.</span>
                      </div>
                    )}

                    {/* Nom + Téléphone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label htmlFor="nom" style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: touched.nom && errors.nom ? '#f87171' : 'var(--t-secondary)', marginBottom: '7px' }}>Nom *</label>
                        <input id="nom" type="text" name="nom" value={form.nom} onChange={onChange} onBlur={() => handleBlur('nom')}
                          placeholder="Jean Dupont" maxLength={60} autoComplete="name"
                          aria-invalid={touched.nom && !!errors.nom} aria-describedby={errors.nom ? 'nom-error' : undefined}
                          style={fieldStyle('nom')} />
                        {touched.nom && errors.nom && <p id="nom-error" role="alert" style={{ fontSize: '11px', color: '#f87171', marginTop: '5px' }}>{errors.nom}</p>}
                      </div>
                      <div>
                        <label htmlFor="telephone" style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: touched.telephone && errors.telephone ? '#f87171' : 'var(--t-secondary)', marginBottom: '7px' }}>Téléphone *</label>
                        <input id="telephone" type="tel" name="telephone" value={form.telephone} onChange={onChange} onBlur={() => handleBlur('telephone')}
                          placeholder="581 985-0212" maxLength={15} autoComplete="tel"
                          aria-invalid={touched.telephone && !!errors.telephone} aria-describedby={errors.telephone ? 'tel-error' : undefined}
                          style={fieldStyle('telephone')} />
                        {touched.telephone && errors.telephone && <p id="tel-error" role="alert" style={{ fontSize: '11px', color: '#f87171', marginTop: '5px' }}>{errors.telephone}</p>}
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="service" style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--t-secondary)', marginBottom: '7px' }}>
                        Service <span style={{ color: 'var(--t-muted)', fontWeight: 400 }}>(optionnel)</span>
                      </label>
                      <select id="service" name="service" value={form.service} onChange={onChange}
                        style={{ ...fieldStyle('service'), background: 'var(--c-navy)' }}>
                        <option value="">Choisir un service...</option>
                        <option value="Bain & brossage">Bain &amp; brossage</option>
                        <option value="Coupe & tonte">Coupe &amp; tonte</option>
                        <option value="Toilettage pour chat">Toilettage pour chat</option>
                        <option value="Coupe de griffes">Coupe de griffes</option>
                        <option value="Toilettage complet">Toilettage complet</option>
                        <option value="Autre / Je ne sais pas">Autre / Je ne sais pas</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: 'var(--t-secondary)', marginBottom: '7px' }}>
                        Message <span style={{ color: 'var(--t-muted)', fontWeight: 400 }}>(race, âge, état du pelage...)</span>
                      </label>
                      <textarea id="message" name="message" value={form.message} onChange={onChange} rows={3}
                        maxLength={800} style={{ ...fieldStyle('message'), resize: 'none', lineHeight: 1.6 }} />
                    </div>

                    <button type="submit" disabled={submitting} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      width: '100%', padding: '13px',
                      background: submitting ? '#1e3a4f' : 'var(--c-teal)',
                      color: submitting ? 'var(--t-muted)' : 'var(--c-white)',
                      border: 'none', borderRadius: 'var(--r-md)', cursor: submitting ? 'not-allowed' : 'pointer',
                      fontSize: '14px', fontWeight: 600,
                      boxShadow: submitting ? 'none' : '0 4px 12px rgba(42,157,143,0.3)',
                    }}>
                      <Send size={14} />
                      {submitting ? 'Envoi en cours...' : 'Envoyer'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
