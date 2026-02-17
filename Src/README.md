# Weather Forecast App - React + TypeScript

Une application météo moderne et élégante construite avec React, TypeScript, Tailwind CSS et Framer Motion.

![Weather App](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-purple)

## ✨ Fonctionnalités

- 🌤️ **Données météo en temps réel** - API Visual Crossing
- 🌡️ **Toggle Celsius/Fahrenheit** - Conversion instantanée
- 🎨 **Interface glassmorphism** - Design moderne et élégant
- ⚡ **Animations fluides** - Framer Motion pour des transitions douces
- 📱 **Responsive** - Fonctionne sur tous les appareils
- 💾 **Persistance** - Sauvegarde de l'unité de température préférée
- 🎭 **États de chargement** - Animations pendant le chargement
- ❌ **Gestion d'erreurs** - Messages d'erreur clairs avec retry

## 🚀 Démarrage rapide

### Installation

```bash
npm install
```

### Lancement du serveur de développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173)

### Build pour la production

```bash
npm run build
```

### Prévisualisation du build

```bash
npm run preview
```

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Bibliothèque d'animations
- **Lucide React** - Icônes modernes
- **Visual Crossing API** - Données météorologiques

## 📁 Structure du projet

```
weather-react/
├── src/
│   ├── components/          # Composants React
│   │   ├── CurrentWeather.tsx
│   │   ├── ErrorDisplay.tsx
│   │   ├── ForecastCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── SearchBar.tsx
│   │   ├── UnitToggle.tsx
│   │   └── WeatherDetails.tsx
│   ├── hooks/              # Custom hooks
│   │   ├── useTemperatureUnit.ts
│   │   └── useWeather.ts
│   ├── services/           # Services API
│   │   └── weatherApi.ts
│   ├── types/              # Types TypeScript
│   │   └── weather.ts
│   ├── App.tsx             # Composant principal
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── tailwind.config.js      # Configuration Tailwind
├── tsconfig.json           # Configuration TypeScript
└── vite.config.ts          # Configuration Vite
```

## 🎨 Fonctionnalités techniques

### Custom Hooks

- **useWeather** - Gestion de l'état météo, chargement et erreurs
- **useTemperatureUnit** - Gestion de l'unité de température avec localStorage

### Animations Framer Motion

- Entrées/sorties fluides avec `AnimatePresence`
- Animations de hover sur les cartes
- Icône météo flottante
- Particules animées en arrière-plan
- Animations staggerées pour les détails météo

### Glassmorphism

- Effets de verre avec `backdrop-blur`
- Bordures semi-transparentes
- Dégradés subtils

## 🌐 API

L'application utilise l'[API Visual Crossing](https://www.visualcrossing.com/weather-api):

- Clé API déjà configurée
- 1000 requêtes/jour (plan gratuit)
- Données mondiales

## 📱 Responsive Design

- Mobile-first approach
- Grilles adaptatives
- Breakpoints Tailwind (sm, md, lg)

## 🎯 Prochaines améliorations

- [ ] Géolocalisation automatique
- [ ] Alertes météo
- [ ] Vue horaire détaillée
- [ ] Cartes météo interactives
- [ ] Favoris de localisation
- [ ] Mode sombre/clair
- [ ] PWA (Progressive Web App)
- [ ] Tests unitaires

## 📄 Licence

Projet éducatif - The Odin Project

## 👨‍💻 Auteur

Créé avec ❤️ pour The Odin Project
