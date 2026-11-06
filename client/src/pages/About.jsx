/**
 * About.jsx
 * About Me page: legal name, headshot, a short bio and a link to the
 * PDF resume. Kept deliberately simple for prospective employers.
 */
import { Link } from 'react-router-dom'
import { personalInfo, testimonial } from '../data/portfolioData'
import './About.css'

// import.meta.env.BASE_URL is the site's base path ("/" locally, the repo
// name on GitHub Pages), so public files resolve correctly in both places
const publicPath = import.meta.env.BASE_URL

function About() {
  return (
    <section className="page container">
      <h1 className="page-title">About Me</h1>

      <div className="about-layout">
        <img
          className="about-photo"
          src={`${publicPath}${personalInfo.profileImage}`}
          alt={`Head and shoulders portrait of ${personalInfo.legalName}`}
          width="181"
          height="227"
        />

        <div className="about-text">
          <h2 className="about-name">{personalInfo.legalName}</h2>
          <p className="about-title">{personalInfo.jobTitle}</p>

          {personalInfo.aboutParagraphs.map((paragraphText) => (
            <p key={paragraphText}>{paragraphText}</p>
          ))}

          <div className="about-actions">
            <a
              className="button"
              href={`${publicPath}${personalInfo.resumeFile}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View My Resume (PDF)
            </a>
            <Link to="/projects" className="button button-outline">
              See My Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Quoted word for word from a LinkedIn recommendation */}
      <figure className="about-testimonial">
        <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
        <figcaption>
          <strong>{testimonial.author}</strong>, {testimonial.authorRole}
        </figcaption>
      </figure>
    </section>
  )
}

export default About
