# Ensemble Brodé Premium — Kenimoda Landing Page

Landing page premium pour campagne Meta Ads (Facebook & Instagram), 100% HTML / CSS / JavaScript natif (aucune dépendance, aucun build). Live sur **https://kenimoda.com/brode/**.

## 📁 Structure du projet

```
/
├── index.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── images/
    │   ├── rose-1.jpg ... rose-4.jpg
    │   ├── marron-1.jpg ... marron-3.jpg
    │   ├── bleu-1.jpg ... bleu-4.jpg
    │   ├── jaune-1.jpg ... jaune-4.jpg
    │   └── logo-kenimoda.png
    └── video/
        └── product-video.mp4   ← à ajouter (voir section Vidéo ci-dessous)
```

## 🛍️ Infos produit actuelles

- **Prix** : 490 DH (au lieu de 690 DH, soit -29%)
- **Couleurs** : Rose, Marron, Bleu Ciel, Jaune (4 coloris, chacun avec ses vraies photos)
- **Tailles** : S, M, L, XL, XXL
- **Livraison** : partout au Maroc — **Paiement à la livraison**

## ✨ Fonctionnalités

- Hero bilingue (titres en français, accroche/CTA en Darija) pensé pour le trafic Meta Ads
- Galerie produit avec miniatures, zoom, swipe mobile et transitions fluides
- Sélecteur de couleur avec **vraies miniatures photo** (pas de pastilles de couleur) juste sous les photos
- Sélecteur de taille obligatoire (S à XXL) avec guide des tailles en modal
- Section vidéo produit **prête à l'emploi** (voir ci-dessous)
- Section "Pourquoi choisir Kenimoda" (4 points forts, texte en Darija)
- Countdown/urgence avec redémarrage automatique
- Section avis clients en **état honnête "bientôt disponible"** — aucun faux avis n'est inventé ; un lien WhatsApp permet aux vraies clientes de partager leur avis dès maintenant
- FAQ en accordéon (accessible clavier, aria-expanded, spacing amélioré)
- Formulaire de commande relié à Formspree avec validation JS, anti-spam (honeypot), anti double-clic, spinner de chargement et message de succès animé
- Popup de preuve sociale (activité récente) toutes les 20-40 secondes
- Bouton WhatsApp flottant (pulse + nouvel onglet) + bouton retour en haut + barre de commande sticky mobile (CTA en Darija)
- SEO avancé : meta title/description, Open Graph, Twitter Cards, JSON-LD Product Schema (sans note/avis fictifs), robots.txt et sitemap.xml (avec image sitemap), URLs pointant vers kenimoda.com/brode/
- Performance : image hero préchargée, polices préconnectées, lazy loading sur toute la galerie, dimensions explicites (CLS réduit), script en `defer`
- Accessibilité : rôles ARIA, navigation clavier complète, focus géré sur les modales

## 🎬 Vidéo produit

Aucun fichier vidéo n'a été fourni pour l'instant — la section vidéo est **prête techniquement** mais reste masquée automatiquement tant qu'aucun fichier n'existe (aucun lecteur cassé ne s'affiche).

Pour l'activer :
1. Déposez votre fichier dans `assets/video/product-video.mp4`
2. Rechargez la page — la section apparaît automatiquement, avec lecture en muet dès qu'elle entre dans l'écran sur mobile

## 📊 Trackers publicitaires (Meta Pixel / GA4 / GTM)

| Tracker | Emplacement dans `index.html` | Statut |
|---|---|---|
| Google Tag Manager | Avant `</head>` + après `<body>` | ✅ Installé (`GTM-TNPN5NLX`) |
| Google Analytics 4 (GA4) | Fin du `<head>` | ⏳ Zone prête, à coller |
| Meta Pixel (Facebook) | Fin du `<head>`, après GA4 | ⏳ Zone prête, à coller |

Toutes les interactions utilisent **uniquement `window.dataLayer.push()`** (aucun `fbq()`/`gtag()` direct) : `select_color`, `select_size`, `view_size_guide`, `view_image_zoom`, `faq_open`, et surtout **`generate_lead`** déclenché uniquement après une commande confirmée avec succès par Formspree (nom du formulaire, produit, prix, devise, pays).

## 🚀 Déploiement sur GitHub + Cloudflare Pages

1. Poussez tous les fichiers de ce projet sur GitHub (en gardant la structure `assets/`).
2. Sur [Cloudflare Pages](https://pages.cloudflare.com/) : **Créer un projet** → **Connecter à Git** → sélectionnez le repo.
3. Build command : *(vide)* — Build output directory : `/`
4. Déployez. Le site est en ligne immédiatement.

## ⚙️ Personnalisation rapide

- **WhatsApp** : recherchez `212612449474` dans `index.html`
- **Formspree** : attribut `action` du `<form id="orderForm">`
- **Prix / couleurs / tailles** : `script.js` → objets `COLORS` et `SIZES`, et prix dans `index.html` (Hero, résumé de commande, sticky CTA)
- **Avis clients réels** : une fois disponibles, remplacez le contenu de `renderReviews()` dans `script.js`

## 📱 Compatibilité

Optimisé mobile-first (trafic Meta Ads), testé sur iPhone/Android, tablette et desktop. Aucune dépendance externe hormis les polices Google Fonts (Fraunces / Jost).
