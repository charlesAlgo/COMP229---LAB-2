/**
 * Footer.jsx
 * Site-wide footer with copyright and social links.
 */
import { personalInfo, contactInfo } from '../data/portfolioData'
import './Footer.css'

// Calculated once when the site loads, not on every render
const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          &copy; {currentYear} {personalInfo.legalName}. All rights reserved.
        </p>
        <ul className="footer-links">
          <li>
            <a href={contactInfo.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${contactInfo.email}`}>Email</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
