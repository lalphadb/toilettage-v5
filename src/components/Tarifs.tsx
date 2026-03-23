const Tarifs = () => (
  <section id="tarifs" style={{ background: '#f7f7f8', padding: '6rem 0 5rem' }}>
    <div className="site-container" style={{ maxWidth: '860px' }}>

      {/* ── En-tête ── */}
      <div style={{ marginBottom: '4rem' }}>
        <p style={{
          fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#2B5874', marginBottom: '1.25rem',
        }}>
          Tarification
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700,
          color: '#111', lineHeight: 1.15, letterSpacing: '-0.02em',
          marginBottom: '1rem', maxWidth: '18ch',
        }}>
          Un prix juste,<br />établi pour votre animal.
        </h2>
        <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.7, maxWidth: '52ch', margin: 0 }}>
          Nous ne travaillons pas avec un tarif fixe. Chaque animal est évalué selon son état
          avant de commencer — c'est plus honnête pour vous.
        </p>
      </div>

      {/* ── 2 cartes principales ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2px',
        background: '#e8e8e8',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '2px',
        border: '1px solid #e2e2e2',
      }}>

        {/* Carte 1 — Ce qui influence le tarif */}
        <div style={{ background: '#fff', padding: '2.5rem 2.25rem' }}>
          <p style={{
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: '#bbb', marginBottom: '1.5rem',
          }}>
            Ce qui influence le tarif
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              ['Race & type de pelage', 'poil court, long, frisé, double manteau'],
              ['État du poil', 'nœuds, matting, pelage négligé'],
              ['Taille de l\'animal', 'petit, moyen ou grand gabarit'],
              ['Service choisi', 'bain seul, coupe complète, soins additionnels'],
            ].map(([titre, detail], i) => (
              <li key={i} style={{
                paddingBottom: i < 3 ? '1.1rem' : 0,
                marginBottom: i < 3 ? '1.1rem' : 0,
                borderBottom: i < 3 ? '1px solid #f2f2f2' : 'none',
              }}>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#222', marginBottom: '3px' }}>
                  {titre}
                </div>
                <div style={{ fontSize: '12px', color: '#aaa', lineHeight: 1.5 }}>
                  {detail}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Carte 2 — Obtenir une estimation */}
        <div style={{ background: '#0d1f2d', padding: '2.5rem 2.25rem', display: 'flex', flexDirection: 'column' }}>
          <p style={{
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem',
          }}>
            Obtenir une estimation
          </p>

          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: 'auto' }}>
            Appelez-nous avant votre première visite.
            En quelques questions, on vous donne un prix honnête
            avant même que vous vous déplaciez.
          </p>

          {/* Téléphone — élément principal */}
          <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Appelez-nous
            </p>
            <a href="tel:+15819850212" style={{
              display: 'block', textDecoration: 'none',
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(26px, 3.5vw, 34px)', fontWeight: 700,
              color: '#fff', lineHeight: 1, marginBottom: '0.5rem',
              transition: 'opacity 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              581 985-0212
            </a>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
              Lun & Ven : 9h30–15h &nbsp;·&nbsp; Mar–Jeu : 9h30–18h
            </p>
          </div>
        </div>
      </div>

      {/* ── Note bas ── */}
      <p style={{ fontSize: '12px', color: '#bbb', textAlign: 'center', margin: 0 }}>
        Un pelage très emmêlé ou négligé demande plus de travail — le tarif en tient compte.
      </p>

    </div>
  </section>
)

export default Tarifs
