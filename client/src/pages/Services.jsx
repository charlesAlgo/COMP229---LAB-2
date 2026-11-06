/**
 * Services.jsx
 * Services page: a short list of the services I offer, each with an image,
 * followed by a call to action pointing to the Contact page.
 */
import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { services, contactInfo } from '../data/portfolioData'
import './Services.css'

function Services() {
  return (
    <section className="page container">
      <h1 className="page-title">Services</h1>
      <p className="page-intro">
        Through my agency,{' '}
        <a href={contactInfo.websiteUrl} target="_blank" rel="noopener noreferrer">
          Data-Life Tech
        </a>
        , I build AI systems for electrical contractors. The system drafts; you approve.
      </p>

      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="services-cta">
        <h2>Still counting takeoffs by hand?</h2>
        <p>Send me a message and let&apos;s talk about your drawings.</p>
        <Link to="/contact" className="button">
          Contact Me
        </Link>
      </div>
    </section>
  )
}

export default Services
