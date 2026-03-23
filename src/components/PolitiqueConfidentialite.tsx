import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const articles = [
  {
    titre: '1. Responsable de la protection des renseignements personnels',
    contenu: [
      "Toilettage Des Lacs désigne Priscillia Rhéaume comme responsable de la protection des renseignements personnels au sein de l'entreprise, conformément à la Loi 25 (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels, L.Q. 2021, c. 25).",
      "Pour toute question ou demande relative à vos renseignements personnels, vous pouvez communiquer avec la responsable aux coordonnées indiquées à l'article 9.",
    ],
  },
  {
    titre: '2. Renseignements collectés',
    contenu: [
      "Nous collectons uniquement les renseignements personnels nécessaires à la prestation de nos services de toilettage :",
    ],
    liste: [
      'Nom et prénom',
      'Numéro de téléphone',
      'Adresse courriel (si fournie)',
      'Informations sur votre animal (race, âge, état du pelage)',
      'Service souhaité',
    ],
    contenuApres: [
      "Ces renseignements sont fournis volontairement via notre formulaire de contact ou lors de votre appel téléphonique. Nous ne collectons aucun renseignement sans votre consentement explicite.",
    ],
  },
  {
    titre: '3. Finalités de la collecte',
    contenu: [
      "Les renseignements personnels collectés sont utilisés exclusivement aux fins suivantes :",
    ],
    liste: [
      'Planifier et confirmer vos rendez-vous de toilettage',
      'Vous fournir un estimé de prix adapté à votre animal',
      'Assurer le suivi de votre dossier client',
      "Vous contacter en cas de modification ou d'annulation",
    ],
    contenuApres: [
      "Nous n'utilisons pas vos renseignements à des fins commerciales, publicitaires ou de prospection.",
    ],
  },
  {
    titre: '4. Conservation et destruction',
    contenu: [
      "Vos renseignements personnels sont conservés uniquement pour la durée nécessaire à l'atteinte des finalités pour lesquelles ils ont été collectés, soit la durée de votre relation avec Toilettage Des Lacs.",
      "Lorsque ces renseignements ne sont plus nécessaires, ils sont détruits de façon sécuritaire afin d'en empêcher toute utilisation ou divulgation non autorisée, conformément à la Loi 25.",
    ],
  },
  {
    titre: '5. Communication à des tiers',
    contenu: [
      "Nous ne vendons, ne louons et ne transmettons pas vos renseignements personnels à des tiers, sauf dans les cas suivants :",
    ],
    liste: [
      "Obligation légale : si la loi l'exige ou suite à une ordonnance d'un tribunal",
      "Formspree (formspree.io) — service de traitement du formulaire de contact. Les données saisies (nom, téléphone, service, message) sont transmises via leurs serveurs situés aux États-Unis. Formspree agit à titre de sous-traitant de données. Politique : formspree.io/legal/privacy-policy",
      "Google Fonts (fonts.googleapis.com) — service de polices de caractères. Lors du chargement du site, votre adresse IP peut être journalisée par Google afin de servir les fichiers de polices. Politique : policies.google.com/privacy",
    ],
    contenuApres: [
      "Conformément à la Loi 25, le transfert de renseignements personnels hors Québec vers ces prestataires est encadré par leurs politiques de confidentialité respectives. Vous pouvez refuser ces transmissions en n'utilisant pas le formulaire de contact.",
    ],
  },
  {
    titre: '6. Témoins (cookies) et technologies similaires',
    contenu: [
      "Notre site web n'utilise pas de témoins (cookies) à des fins publicitaires ou de profilage. Des témoins techniques essentiels peuvent être utilisés pour assurer le bon fonctionnement du site.",
      "Nous n'utilisons pas de technologies de suivi comportemental, de pixels de suivi ou d'outils d'analyse tiers (Google Analytics, Meta Pixel, etc.).",
    ],
  },
  {
    titre: '7. Mesures de sécurité',
    contenu: [
      "Nous prenons des mesures de sécurité raisonnables pour protéger vos renseignements personnels contre tout accès non autorisé, divulgation, altération ou destruction. Ces mesures comprennent notamment :",
    ],
    liste: [
      'Transmission chiffrée des données via le protocole HTTPS (TLS)',
      'Accès restreint aux renseignements personnels au seul personnel autorisé',
      'Aucun stockage de vos données dans des bases de données non sécurisées',
    ],
  },
  {
    titre: '8. Vos droits — Loi 25 (Québec)',
    contenu: [
      "Conformément à la Loi 25 et à la Loi sur la protection des renseignements personnels dans le secteur privé (LPRPSP), vous disposez des droits suivants :",
    ],
    liste: [
      "Droit d'accès : obtenir copie des renseignements personnels que nous détenons sur vous",
      "Droit de rectification : faire corriger tout renseignement inexact, incomplet ou ambigu",
      "Droit à la suppression : demander la destruction de vos renseignements lorsqu'ils ne sont plus nécessaires",
      "Droit à la portabilité : recevoir vos renseignements dans un format technologique structuré et couramment utilisé",
      "Droit de retrait du consentement : retirer votre consentement en tout temps, sans préjudice à la légalité des traitements antérieurs",
    ],
    contenuApres: [
      "Pour exercer ces droits, adressez votre demande par écrit à la responsable de la protection des renseignements personnels. Nous répondrons dans un délai de 30 jours.",
    ],
  },
  {
    titre: '9. Nous joindre',
    contenu: [
      "Pour toute question relative à cette politique ou pour exercer vos droits, communiquez avec notre responsable de la protection des renseignements personnels :",
    ],
    coordonnees: true,
  },
  {
    titre: '10. Modifications à cette politique',
    contenu: [
      "Toilettage Des Lacs se réserve le droit de modifier cette politique à tout moment pour refléter les changements dans nos pratiques ou les exigences légales. La version en vigueur sera toujours accessible sur cette page avec la date de dernière mise à jour.",
      "En cas de modification importante, nous vous en informerons par les moyens de communication habituels.",
    ],
  },
]

const PolitiqueConfidentialite = () => {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const dateMAJ = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div style={{ background: 'linear-gradient(180deg, #0d1f2d 0%, #060f15 100%)', minHeight: '100vh', paddingTop: '7rem', paddingBottom: '6rem' }}>
      <div className="site-container" style={{ maxWidth: '760px' }}>

        {/* Retour */}
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', marginBottom: '3rem', transition: 'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
          <ArrowLeft size={14} /> Retour au site
        </Link>

        {/* En-tête */}
        <div style={{ marginBottom: '3.5rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2A9D8F', marginBottom: '1rem' }}>
            Légal
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Politique de confidentialité
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: '0 0 0.75rem' }}>
            Dernière mise à jour : {dateMAJ}
          </p>
          <div style={{ background: 'rgba(42,157,143,0.08)', border: '1px solid rgba(42,157,143,0.2)', borderRadius: '8px', padding: '14px 18px' }}>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>
              Cette politique est conforme à la <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Loi 25</strong> (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels, Québec) et à la <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Loi sur la protection des renseignements personnels dans le secteur privé (LPRPSP)</strong>.
            </p>
          </div>
        </div>

        {/* Articles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.75rem' }}>
          {articles.map((art, i) => (
            <div key={i}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: '1rem', lineHeight: 1.3 }}>
                {art.titre}
              </h2>
              {art.contenu.map((p, j) => (
                <p key={j} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '0.75rem' }}>{p}</p>
              ))}
              {art.liste && (
                <ul style={{ listStyle: 'none', padding: 0, margin: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {art.liste.map((item, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
                      <span style={{ color: '#2A9D8F', flexShrink: 0, marginTop: '2px' }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {art.contenuApres?.map((p, j) => (
                <p key={j} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginTop: '0.75rem' }}>{p}</p>
              ))}
              {art.coordonnees && (
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: 500, margin: 0 }}>Toilettage Des Lacs</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Responsable : Priscillia Rhéaume</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                    <a href="tel:+15819850212" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>581 985-0212</a>
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                    <a href="mailto:info@toilettagedeslacs.ca" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>info@toilettagedeslacs.ca</a>
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>1590 rue Jacques Bidard, Québec, QC  G3G 1R1</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Retour bas */}
        <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
            <ArrowLeft size={14} /> Retour au site
          </Link>
        </div>

      </div>
    </div>
  )
}

export default PolitiqueConfidentialite
