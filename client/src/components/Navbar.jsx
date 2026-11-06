/**
 * Navbar.jsx
 * Top navigation bar shown on every page. Contains the custom logo and links
 * to all six pages. On small screens the links collapse behind a menu button.
 */
import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'
import { personalInfo } from '../data/portfolioData'
import './Navbar.css'

// Route path + visible label for each page, in display order
const navigationLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Me' },
  { path: '/projects', label: 'Projects' },
  { path: '/education', label: 'Education' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
]

function Navbar() {
  // Controls whether the mobile menu is expanded
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="navbar">
      <nav className="navbar-inner container" aria-label="Main navigation">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <Logo />
          <span className="navbar-brand-name">{personalInfo.legalName}</span>
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="navbar-links"
          onClick={() => setIsMenuOpen((wasOpen) => !wasOpen)}
        >
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
          <span className="navbar-toggle-bar" />
        </button>

        <ul id="navbar-links" className={`navbar-links ${isMenuOpen ? 'is-open' : ''}`}>
          {navigationLinks.map((navItem) => (
            <li key={navItem.path}>
              {/* "end" stops "/" from being marked active on every route */}
              <NavLink to={navItem.path} end={navItem.path === '/'} onClick={closeMenu}>
                {navItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
