# Ensemble Brodé Femme Premium — Landing Page

Landing page premium pour campagne Facebook Ads, 100% HTML / CSS / JavaScript natif (aucune dépendance, aucun build).

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
    └── images/
        ├── marron-1.jpg ... marron-3.jpg
        ├── rose-1.jpg ... rose-4.jpg
        ├── bleu-1.jpg ... bleu-4.jpg
        └── jaune-1.jpg ... jaune-4.jpg
```

## ✨ Fonctionnalités

- Galerie produit responsive avec miniatures, zoom, swipe mobile et transitions fluides
- Sélecteur de couleur (4 coloris avec photos + Noir/Beige en "Disponible sur demande" sans image cassée), positionné juste sous les photos
- Sélecteur de taille obligatoire (38 à 46) avec guide des tailles en modal
- Countdown/urgence avec redémarrage automatique
- 8 avis clients réalistes
- FAQ en accordéon (accessible clavier, aria-expanded)
- Formulaire de commande relié à Formspree (`https://formspree.io/f/mwvzjgqe`) avec validation JS, anti-spam (honeypot), anti double-clic, animation de chargement et message de succès animé
- Popup de preuve sociale ("Sara de Casablanca vient de commander...") toutes les 20-40 secondes
- Bouton WhatsApp flottant (pulse + ouverture nouvel onglet) + bouton retour en haut + barre de commande sticky sur mobile
- Loader de page au premier chargement
- SEO avancé : meta title/description optimisés, Open Graph, Twitter Cards, JSON-LD Product Schema enrichi (retours, livraison), robots.txt et sitemap.xml (avec image sitemap)
- Performance : image hero préchargée (`fetchpriority="high"`), polices préconnectées, lazy loading sur toute la galerie, dimensions explicites pour réduire le CLS, script en `defer`
- Accessibilité : rôles ARIA sur les modales/accordéon/groupes de choix, navigation clavier complète (miniatures, swatches), focus géré à l'ouverture/fermeture des modales
- Animations au scroll, hover et succès de commande

## 📊 Trackers publicitaires (Meta Pixel / GA4 / GTM)

Le fichier `index.html` contient des zones prêtes à l'emploi, clairement commentées, pour coller vos codes de suivi sans toucher au reste du site :

| Tracker | Emplacement dans `index.html` | Repère |
|---|---|---|
| Google Tag Manager (head) | Tout en haut du `<head>` | `<!-- GTM Head Start -->` |
| Google Analytics 4 (GA4) | Fin du `<head>` | `<!-- Google Analytics Start -->` |
| Meta Pixel (Facebook) | Fin du `<head>`, après GA4 | `<!-- Meta Pixel Start -->` |
| Google Tag Manager (body/noscript) | Tout en haut du `<body>` | `<!-- GTM Body Start -->` |

Une fois vos codes collés, le fichier `script.js` détecte automatiquement `dataLayer`, `gtag` ou `fbq` et leur envoie déjà des événements utiles sans configuration supplémentaire : `select_color`, `select_size`, `view_size_guide`, `view_image_zoom`, `faq_open`, et `purchase` (déclenché après une commande confirmée, avec valeur, devise, couleur, taille et quantité).

## 🚀 Déploiement sur GitHub + Cloudflare Pages

1. Créez un nouveau repository GitHub et poussez tous les fichiers de ce projet (en conservant la structure de dossiers, notamment `assets/images/`).
2. Sur [Cloudflare Pages](https://pages.cloudflare.com/), cliquez sur **Créer un projet** → **Connecter à Git** → sélectionnez votre repository.
3. Paramètres de build :
   - **Build command** : *(laisser vide)*
   - **Build output directory** : `/`
4. Cliquez sur **Déployer**. Le site sera en ligne immédiatement, sans étape supplémentaire.

## ⚙️ Personnalisation rapide

- **Numéro WhatsApp** : recherchez `212612449474` dans `index.html` et remplacez-le par votre numéro (format international sans `+`).
- **Lien Formspree** : modifiez l'attribut `action` du formulaire dans `index.html` si vous changez de compte Formspree.
- **Prix / stock** : modifiables directement dans `index.html` (section Hero) et `script.js` (objet `COLORS`).
- **Avis clients** : tableau `REVIEWS` dans `script.js`.

## 📱 Compatibilité

Testé pour un rendu optimal sur mobile (prioritaire pour le trafic Facebook Ads), tablette et desktop. Aucune dépendance externe autre que les polices Google Fonts (Fraunces / Jost), chargées via CDN standard.
