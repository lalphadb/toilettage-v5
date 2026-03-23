import { Link } from 'react-router-dom'
import fbLogo from '../assets/facebook-logo.png'

const Footer = () => (
  <footer style={{ background: 'linear-gradient(180deg, #0d1f2d 0%, #091520 100%)' }}>

    {/* Bande supérieure — infos essentielles */}
    <div className="site-container" style={{ padding: '5rem 2rem 3.5rem' }}>

      {/* Logo / Nom + accroche */}
      <div style={{ marginBottom: '3.5rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 0.4rem' }}>
          Toilettage Des Lacs
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
          Salon de toilettage professionnel à Québec — chiens et chats depuis 2014.
        </p>
      </div>

      {/* Grille 3 colonnes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>

        {/* Navigation */}
        <div>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.25rem' }}>
            Navigation
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { href: '/#accueil', label: 'Accueil' },
              { href: '/#services', label: 'Services' },
              { href: '/#tarifs', label: 'Tarifs' },
              { href: '/#galerie', label: 'Réalisations' },
              { href: '/#equipe', label: 'Notre équipe' },
              { href: '/#contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.href}>
                <Link to={l.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coordonnées */}
        <div>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.25rem' }}>
            Nous joindre
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Téléphone</p>
              <a href="tel:+15819850212" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                581 985-0212
              </a>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Courriel</p>
              <a href="mailto:info@toilettagedeslacs.ca" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                info@toilettagedeslacs.ca
              </a>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Adresse</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, margin: 0 }}>
                1590 rue Jacques Bidard<br />Québec, QC  G3G 1R1
              </p>
            </div>
          </div>
        </div>

        {/* Horaires + Facebook */}
        <div>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.25rem' }}>
            Horaires
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '2rem' }}>
            {[
              ['Lundi', '9h30 – 15h00'],
              ['Mardi – Jeudi', '9h30 – 18h00'],
              ['Vendredi', '9h30 – 15h00'],
              ['Sam – Dim', 'Fermé'],
            ].map(([jour, heure], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{jour}</span>
                <span style={{ fontSize: '13px', color: i === 3 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.4)' }}>{heure}</span>
              </div>
            ))}
          </div>

          {/* Facebook */}
          <a href="https://www.facebook.com/lacstcharles" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', opacity: 0.55, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.55')}>
            <img src={fbLogo} alt="Suivez-nous sur Facebook" style={{ height: '26px', width: 'auto', display: 'block' }} />
          </a>
        </div>

      </div>
    </div>

    {/* Barre de bas */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="site-container" style={{ padding: '1.25rem 2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)', margin: 0 }}>
          &copy; {new Date().getFullYear()} Toilettage Des Lacs. Tous droits réservés.
        </p>
        <Link to="/politique-confidentialite"
          style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
          Politique de confidentialité
        </Link>
      </div>
    </div>
  </footer>
)

export default Footer
