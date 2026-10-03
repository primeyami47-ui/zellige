import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Polices auto-hébergées : pas d'appel à Google Fonts (vitesse, et aucune
// donnée de visite transmise à un tiers). Instrument Serif pour les titres
// (romain et italique), Instrument Sans pour le texte.
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/instrument-sans'
import 'lenis/dist/lenis.css'
import './styles/tokens.css'
import App from './App'

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
const root = document.getElementById('root')!
// Page prérendue pour cette adresse : React reprend le HTML existant au lieu
// de le reconstruire (sinon le hero est réinséré et ses animations
// rejouent). Sinon (développement, page 404) : rendu complet.
const path = (p: string) => p.replace(/\/+$/, '') || '/'
if (root.dataset.route && path(root.dataset.route) === path(location.pathname)) hydrateRoot(root, app)
else createRoot(root).render(app)
