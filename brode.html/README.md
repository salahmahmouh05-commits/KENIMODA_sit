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
- Sélecteur de couleur (4 coloris avec photos + Noir/Beige en "Disponible sur demande" sans image cassée)
- Sélecteur de taille obligatoire (38 à 46) avec guide des tailles en modal
- Countdown/urgence avec redémarrage automatique
- 8 avis clients réalistes
- FAQ en accordéon
- Formulaire de commande relié à Formspree (`https://formspree.io/f/mwvzjgqe`) avec validation JS et message de succès
- Bouton WhatsApp flottant + barre de commande sticky sur mobile
- SEO : meta title/description, Open Graph, Twitter Cards, JSON-LD Product Schema, robots.txt, sitemap.xml
- Animations au scroll, lazy loading des images, accessibilité (focus visible, `prefers-reduced-motion` respecté)

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
