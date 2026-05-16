# Weather Forecast App

A modern, elegant weather application built with React, TypeScript, Tailwind CSS, and Framer Motion. Features a beautiful glassmorphism design with full dark/light theme support.

![React](https://img.shields.io/badge/React-19-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6) ![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4) ![Vite](https://img.shields.io/badge/Vite-7-646CFF)

## Features

- **Real-time Weather Data** — Powered by Visual Crossing API
- **Dark/Light Theme** — Toggle with system preference detection and localStorage persistence
- **Celsius/Fahrenheit Toggle** — Instant conversion with animated toggle
- **7-Day Forecast** — Daily breakdown with high/low temperatures and conditions
- **Hourly Forecast** — Scrollable 24-hour view with precipitation probability
- **Weather Details** — Humidity, wind, pressure, visibility, UV index, sunrise/sunset
- **Search & Geolocation** — City search with recent searches saved locally
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Glassmorphism UI** — Frosted glass cards with backdrop blur
- **Smooth Animations** — Framer Motion for entry, hover, and scroll-driven animations
- **Loading & Error States** — Spinner during fetch, clear error messages with retry

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start development server            |
| `npm run build`   | TypeScript check + production build |
| `npm run preview` | Preview production build            |
| `npm run lint`    | Run ESLint                          |

## Tech Stack

- **React 19** — UI library
- **TypeScript 5.9** — Static type checking
- **Vite 7** — Fast bundler and dev server
- **Tailwind CSS 3** — Utility-first CSS with `darkMode: 'class'`
- **Framer Motion 12** — Declarative animations
- **Lucide React** — SVG icon set
- **react-intersection-observer** — Scroll-triggered animations
- **Visual Crossing API** — Weather data source

## Project Structure

```
src/
├── components/
│   ├── AnimatedBackground.tsx   # Floating orb background
│   ├── ContactForm.tsx          # Contact form (formsubmit.co)
│   ├── CurrentWeather.tsx       # Main weather display
│   ├── ErrorDisplay.tsx         # Error state with retry
│   ├── Footer.tsx               # Site footer with links
│   ├── ForecastCard.tsx         # Single day forecast card
│   ├── HourlyForecast.tsx       # Horizontal hourly scroll
│   ├── LoadingSpinner.tsx       # Loading state
│   ├── SearchBar.tsx            # City search + geolocation
│   ├── Sponsors.tsx             # Sponsor showcase
│   ├── ThemeToggle.tsx          # Dark/light toggle
│   ├── UnitToggle.tsx           # °C/°F toggle
│   └── WeatherDetails.tsx       # Detail grid
├── hooks/
│   ├── useTemperatureUnit.ts    # °C/°F with localStorage
│   ├── useTheme.ts              # Dark/light with system preference
│   └── useWeather.ts            # Fetch + loading/error state
├── services/
│   └── weatherApi.ts            # Visual Crossing API client
├── types/
│   └── weather.ts               # TypeScript interfaces
├── App.tsx                      # Root component
├── main.tsx                     # Entry point
└── index.css                    # Global styles + CSS variables
```

## Configuration

### Theme

The app uses CSS custom properties for theming. Light mode is the default; dark mode is applied via the `.dark` class on `<html>`. The user's preference is persisted in `localStorage` and respects `prefers-color-scheme` on first visit.

### API

Weather data comes from [Visual Crossing](https://www.visualcrossing.com/weather-api). The API key is bundled with the client — for production, consider moving it behind a proxy server.
VITE_API_KEY=NB8HLCFCAVRMZEHBGTBJYWJMR
VITE_API_BASE_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline

## Performance Notes

- Animated background reduced to 3 orbs with `will-change-transform`
- Continuous glow animations removed in favor of interaction-triggered effects
- Entry animations use staggered delays with `triggerOnce` via IntersectionObserver
- CSS variables handle theming to avoid re-renders on theme switch

## License

Educational project.
