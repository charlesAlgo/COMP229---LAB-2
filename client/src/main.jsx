/**
 * main.jsx
 * Entry point. Mounts the app and wraps it in HashRouter – hash-based URLs
 * (e.g. /#/about) let page refreshes work on GitHub Pages, which has no
 * server-side routing.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
