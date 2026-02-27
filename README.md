# Mira AI — Site vitrine SPA pour agents IA en santé

## Lancer le projet

Ouvrez simplement `index.html` dans un navigateur, ou lancez un serveur local :

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Puis accédez à `http://localhost:8080`.

## Structure des fichiers

```
mira-ai/
├── index.html        # HTML uniquement — structure des 3 pages (Home, Discover, Demo)
├── css/
│   └── style.css     # Tous les styles (nav, hero, carousel, features, discover, demo, responsive)
├── js/
│   ├── data.js       # Constantes de données : agents, sectors, ucTypes, tools, cardColors
│   └── app.js        # Logique SPA : navigation, rendu UI, filtres, toggle langue
├── assets/           # Dossier pour futures images / polices locales
└── README.md
```

## Stack

- **HTML/CSS/JS vanilla** — aucun framework, aucun bundler
- **Google Fonts** — DM Sans + DM Serif Display (importées dans `css/style.css`)
- **SPA côté client** — navigation par `display: none / block`, pas de rechargement de page

## Ajouter un nouvel agent

Dans [js/data.js](js/data.js), ajoutez un objet dans le tableau `agents` :

```js
{
  sector: 'dental',          // ID du secteur (voir tableau sectors)
  icon: '🦷',
  sf: 'Dentaire',            // Nom du secteur en français
  se: 'Dental',              // Nom du secteur en anglais
  cat: 'tp',                 // ID du type d'usage (voir tableau ucTypes)
  cf: 'Tiers-payant',        // Libellé du type en français
  ce: 'Third-party',         // Libellé du type en anglais
  n: {
    fr: 'Nom de l\'agent en français',
    en: 'Agent name in English',
  },
  d: {
    fr: 'Description détaillée en français...',
    en: 'Detailed description in English...',
  },
  m: '-70% saisie',          // Métrique mise en avant sur la carte
  c: '#dcfce7',              // Couleur de fond du badge secteur
  tc: '#166534',             // Couleur du texte du badge secteur
}
```

## Modifier le wording

- **Textes des pages Home / Discover / Demo** → [index.html](index.html), cherchez les balises `<span class="fr">` et `<span class="en">`
- **Données agents** → [js/data.js](js/data.js), champs `n.fr`, `n.en`, `d.fr`, `d.en`
- **Noms des secteurs et types** → [js/data.js](js/data.js), tableaux `sectors` et `ucTypes`
- **Outils intégrés** → [js/data.js](js/data.js), tableau `tools`
