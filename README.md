# OLYMP

Site vitrine e-commerce artistique pour **OLYMP** — artefacts culturels, esthétique argent/encre, bilingue FR/EN.

## Stack

- [TanStack Start](https://tanstack.com/start) + React 19
- [TanStack Router](https://tanstack.com/router) (routing fichier)
- Tailwind CSS v4
- Framer Motion
- Déploiement SSR via Nitro (Cloudflare Workers)

## Structure du projet

```
src/
├── components/
│   ├── brand/       Logo, badges
│   ├── cart/        Panier latéral
│   ├── catalog/     Cartes, modal, filtres, recherche
│   ├── i18n/        Sélecteur de langue, animations de réécriture
│   ├── layout/      Nav, footer, preloader
│   └── motion/      Transitions, curseur, marquee
├── lib/
│   ├── audio/       Ambiance sonore (YouTube)
│   ├── cart/        État panier
│   ├── catalog/     Données produits
│   ├── config/      URLs & constantes
│   ├── contact/       Server function formulaire (submit-contact.ts)
│   ├── i18n/        Traductions FR/EN
│   ├── server/      Gestion erreurs SSR
│   └── ui/          Overlays, transitions de page
├── routes/          Pages (file-based routing)
├── styles/          CSS global & design tokens
├── router.tsx
├── server.ts        Entry Cloudflare Worker
└── start.ts         Middleware TanStack Start
public/              Assets statiques (favicon, logo)
```

## Démarrage

```bash
npm install
npm run dev
```

L’app tourne par défaut sur `http://localhost:5173` (ou le port indiqué dans le terminal).

## Variables d’environnement

Copier `.env.example` vers `.env` :

| Variable | Description |
|----------|-------------|
| `DISCORD_WEBHOOK_URL` | Webhook Discord pour le formulaire contact |

Sans `DISCORD_WEBHOOK_URL`, le formulaire contact affiche un message de configuration manquante.

## Scripts

| Commande | Action |
|----------|--------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run preview` | Prévisualiser le build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Déploiement

Le build génère `.output/` (Nitro + Cloudflare). Après `npm run build` :

```bash
npx wrangler deploy
```

## Pages

| Route | Contenu |
|-------|---------|
| `/` | Accueil, hero, sélection produits |
| `/products` | Catalogue complet, filtres, recherche |
| `/faq` | Questions fréquentes |
| `/doc` | Essai / documentation |
| `/contact` | Formulaire de transmission |

## Livraison client

Ce dépôt est autonome : aucune dépendance à une plateforme no-code. Le code source, les assets et la documentation suffisent pour héberger, maintenir et faire évoluer le site.
