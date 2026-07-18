# Ensemble Brodé Premium — Kenimoda Luxury Landing Page

Landing page **luxury fashion** pour campagne Meta Ads (Facebook & Instagram), 100% HTML / CSS / JavaScript natif (aucune dépendance, aucun build). Live sur **https://kenimoda.com/brode/**.

## 🎨 Design system

Redesign complet inspiré des maisons premium (Zara, Massimo Dutti, Sézane) :
- **Palette minimale** : crème / beige / charcoal / texte noir — **une seule couleur d'accent** (or antique `#8A6A34`) réservée aux CTA et états de sélection. Plus de multi-couleurs décoratives.
- **Typographie** : Manrope (titres, gras, impact) + Inter (texte, lisibilité).
- Beaucoup de blanc/espace, cartes arrondies, ombres douces, micro-animations, transitions élégantes.

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
    ├── images/  (rose, marron, bleu, jaune + logo-kenimoda.png)
    └── video/
        └── product-video.mp4   ← à ajouter (voir section Vidéo)
```

## 🛍️ Infos produit

- **Prix** : 520 DH (au lieu de 690 DH, -25%)
- **Couleurs** : Rose, Marron, Bleu Ciel, Jaune
- **Tailles** : S, M, L, XL, XXL
- **Livraison** : partout au Maroc — **Paiement à la livraison**

## 🧭 Nouveau parcours de conversion (le changement le plus important)

L'ancienne page forçait un long scroll avant d'arriver au formulaire. Le nouvel ordre des sections est pensé pour convertir plus vite :

1. **Hero** — image large, prix, tailles/couleurs, CTA "🛍️ طلبي دابا"
2. **Trust badges** (4 réassurances rapides)
3. **➜ Formulaire de commande** — remonté juste ici, à 2 sections du haut de page (au lieu d'être tout en bas)
4. Vidéo produit
5. Pourquoi choisir Kenimoda (4 points forts)
6. Guide des tailles
7. Avis clients
8. FAQ

L'ancienne section "Pourquoi nous choisir" (paiement/échange/support) a été retirée : son contenu est déjà couvert par les badges de confiance en haut de page et par la FAQ, ce qui évite la redondance et allège la page — cohérent avec la direction "minimal luxury".

## ✨ Fonctionnalités (inchangées, juste redessinées)

- Galerie avec vraies miniatures photo par couleur, zoom, swipe mobile
- Sélecteur de couleur en cercles luxe, sélecteur de taille obligatoire avec guide en modal
- Countdown avec redémarrage automatique
- Section avis clients en **état honnête "bientôt disponible"** — aucun faux avis inventé
- FAQ accordéon accessible clavier
- Formulaire Formspree : validation, anti-spam (honeypot), anti double-clic, spinner, succès animé
- Popup de preuve sociale, bouton WhatsApp flottant, retour en haut, CTA sticky mobile (Darija)
- SEO complet (title/description/OG/Twitter/JSON-LD sans note fictive/robots.txt/sitemap image)
- Performance : image hero préchargée, lazy loading sur toute la galerie, dimensions explicites (CLS réduit), script en `defer`

## 🎬 Vidéo produit

Aucun fichier vidéo fourni pour l'instant — la section reste **masquée automatiquement** (aucun lecteur cassé) tant qu'aucun fichier n'existe. Déposez `assets/video/product-video.mp4` et elle apparaît automatiquement, en lecture muette dès qu'elle entre dans l'écran sur mobile.

## 📊 Trackers publicitaires

| Tracker | Statut |
|---|---|
| Google Tag Manager | ✅ Installé (`GTM-TNPN5NLX`) |
| GA4 | ⏳ Zone prête dans `<head>`, à coller |
| Meta Pixel | ⏳ Zone prête dans `<head>`, à coller |

Toutes les interactions utilisent `window.dataLayer.push()` uniquement (aucun `fbq()`/`gtag()` direct). Événement clé : **`generate_lead`**, déclenché uniquement après une commande confirmée avec succès par Formspree.

## 🚀 Déploiement sur GitHub + Cloudflare Pages

1. Poussez tous les fichiers (en gardant `assets/`).
2. [Cloudflare Pages](https://pages.cloudflare.com/) → **Créer un projet** → **Connecter à Git**.
3. Build command : *(vide)* — Output directory : `/`
4. Déployez.

## ⚙️ Personnalisation rapide

- **WhatsApp** : recherchez `212612449474` dans `index.html`
- **Formspree** : attribut `action` du `<form id="orderForm">`
- **Couleur d'accent** : variable `--accent` en haut de `style.css`
- **Prix / couleurs / tailles** : `script.js` (objets `COLORS`, `SIZES`) + `index.html` (Hero, résumé de commande, sticky CTA)
- **Avis clients réels** : remplacez `renderReviews()` dans `script.js` une fois disponibles

## 📱 Compatibilité

Conçu mobile-first, testé iPhone/Android, tablette, desktop. Fonts Google (Manrope/Inter) via CDN standard, aucune autre dépendance externe.
