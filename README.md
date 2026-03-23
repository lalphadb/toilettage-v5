# Toilettage Des Lacs — Site vitrine v4

Site vitrine professionnel pour salon de toilettage à Québec.  
**URL de production :** https://toilettage.privateip.org

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- React Router v7
- Lucide React
- Nginx + Docker + Traefik

## Lancement local

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Commandes

```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run lint       # ESLint
npm run preview    # Prévisualiser le build
```

## Déploiement

```bash
docker compose up -d        # Premier démarrage
./toilettage.sh rebuild     # Rebuild complet
./toilettage.sh status      # Statut du container
./toilettage.sh logs        # Logs en temps réel
```

## Structure

```
src/
  components/
    Header.tsx              Navigation fixe
    Hero.tsx                Section d'accueil
    Philosophie.tsx         Approche + stats animées
    Services.tsx            Table des services
    Tarifs.tsx              Tarification + estimé
    Galerie.tsx             Carrousel de réalisations
    Equipe.tsx              Fiches équipe
    Contact.tsx             Formulaire + coordonnées
    Footer.tsx              Pied de page
    PolitiqueConfidentialite.tsx  Page légale
  assets/
    photos/new/             Photos utilisées sur le site
    facebook-logo.png       Logo Facebook officiel
```

## Formulaire de contact

Le formulaire utilise [Formspree](https://formspree.io).  
Remplacer `FORMSPREE_ID` dans `Contact.tsx` avec l'ID du formulaire Formspree.

## CI/CD

Pipeline GitHub Actions sur chaque push :
- ESLint
- TypeScript check
- Build de production

## Variables d'environnement

Aucune variable d'environnement requise — le site est entièrement statique.

## Domaine de production

Configuré dans `docker-compose.yml` via les labels Traefik :
```
traefik.http.routers.toilettage.rule=Host(`toilettage.privateip.org`)
```
