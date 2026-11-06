/**
 * Home.jsx
 * Landing page: welcome message, mission statement and buttons that lead
 * visitors to the About Me page and the rest of the site.
 */
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { personalInfo } from '../data/portfolioData'
import './Home.css'

// Quick links shown below the hero so visitors can jump to any section
const sectionHighlights = [
  { path: '/projects', title: 'Projects', text: 'See what I have built.' },
  { path: '/education', title: 'Education', text: 'My qualifications and training.' },
  { path: '/services', title: 'Services', text: 'How I can help you.' },
]

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="hero-eyebrow">Hello, I&apos;m</p>
            <h1 className="hero-title">{personalInfo.legalName}</h1>
            <p className="hero-subtitle">{personalInfo.jobTitle}</p>
            <p className="hero-welcome">{personalInfo.welcomeMessage}</p>
            <div className="hero-actions">
              <Link to="/about" className="button">
                About Me
              </Link>
              <Link to="/contact" className="button button-outline">
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="hero-logo" aria-hidden="true">
            <Logo size={260} />
          </div>
        </div>
      </section>

      <section className="mission container">
        <h2>My Mission</h2>
        <blockquote className="mission-statement">{personalInfo.missionStatement}</blockquote>
      </section>

      <section className="highlights container">
        {sectionHighlights.map((highlight) => (
          <Link key={highlight.path} to={highlight.path} className="highlight-card">
            <h3>{highlight.title}</h3>
            <p>{highlight.text}</p>
            <span className="highlight-arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        ))}
      </section>
    </>
  )
}

export default Home
