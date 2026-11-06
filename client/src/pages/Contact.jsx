/**
 * Contact.jsx
 * Contact page: a panel with my contact details and a message form.
 * The form is not connected to a server – on a valid submit it captures the
 * entered data, shows a thank-you message and then redirects to the Home page.
 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { contactInfo } from '../data/portfolioData'
import './Contact.css'

// Starting (empty) value for every form field
const emptyContactForm = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  emailAddress: '',
  message: '',
}

// How long the thank-you message shows before redirecting (milliseconds)
const REDIRECT_DELAY_MS = 3000

// Simple patterns for basic client-side validation
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/

/**
 * Checks the form values and returns an object of error messages keyed by
 * field name. An empty object means the form is valid.
 */
function validateContactForm(formValues) {
  const validationErrors = {}

  if (!formValues.firstName.trim()) validationErrors.firstName = 'Please enter your first name.'
  if (!formValues.lastName.trim()) validationErrors.lastName = 'Please enter your last name.'
  if (formValues.phoneNumber.trim() && !PHONE_PATTERN.test(formValues.phoneNumber.trim())) {
    validationErrors.phoneNumber = 'Please enter a valid phone number.'
  }
  if (!EMAIL_PATTERN.test(formValues.emailAddress.trim())) {
    validationErrors.emailAddress = 'Please enter a valid email address.'
  }
  if (formValues.message.trim().length < 10) {
    validationErrors.message = 'Your message should be at least 10 characters.'
  }

  return validationErrors
}

function Contact() {
  const navigate = useNavigate()
  const [contactFormData, setContactFormData] = useState(emptyContactForm)
  const [formErrors, setFormErrors] = useState({})
  // Holds the submitted details once the form is sent, so they can be shown back
  const [submittedMessage, setSubmittedMessage] = useState(null)

  // After a successful submit, wait briefly then send the user to Home.
  // The cleanup cancels the timer if the user leaves the page first.
  useEffect(() => {
    if (!submittedMessage) return undefined
    const redirectTimer = setTimeout(() => navigate('/'), REDIRECT_DELAY_MS)
    return () => clearTimeout(redirectTimer)
  }, [submittedMessage, navigate])

  // Updates whichever field changed, using the input's "name" attribute as the key
  const handleInputChange = (event) => {
    const { name: fieldName, value: fieldValue } = event.target
    setContactFormData((previousData) => ({ ...previousData, [fieldName]: fieldValue }))
    // Clear that field's error as soon as the user starts fixing it
    if (formErrors[fieldName]) {
      setFormErrors((previousErrors) => ({ ...previousErrors, [fieldName]: undefined }))
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault() // stop the browser from reloading the page

    const validationErrors = validateContactForm(contactFormData)
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors)
      return
    }

    // No back end yet: the captured data is logged and echoed to the user
    console.info('Contact form submitted:', contactFormData)
    setSubmittedMessage(contactFormData)
    setContactFormData(emptyContactForm)
  }

  return (
    <section className="page container">
      <h1 className="page-title">Contact Me</h1>
      <p className="page-intro">
        Have a question or an opportunity? Get in touch using the details or the form below.
      </p>

      <div className="contact-layout">
        <aside className="contact-panel" aria-labelledby="contact-panel-heading">
          <h2 id="contact-panel-heading">Contact Information</h2>
          <ul className="contact-details">
            <li>
              <span className="contact-label">Email</span>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
            <li>
              <span className="contact-label">Phone</span>
              <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}>{contactInfo.phone}</a>
            </li>
            <li>
              <span className="contact-label">Location</span>
              <span>{contactInfo.location}</span>
            </li>
            <li>
              <span className="contact-label">GitHub</span>
              <a href={contactInfo.githubUrl} target="_blank" rel="noopener noreferrer">
                {contactInfo.githubUrl.replace('https://', '')}
              </a>
            </li>
            <li>
              <span className="contact-label">Agency</span>
              <a href={contactInfo.websiteUrl} target="_blank" rel="noopener noreferrer">
                {contactInfo.websiteUrl.replace('https://', '')}
              </a>
            </li>
            <li>
              <span className="contact-label">LinkedIn</span>
              <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                View profile
              </a>
            </li>
          </ul>
        </aside>

        <div className="contact-form-wrapper">
          {submittedMessage ? (
            <div className="contact-success" role="status">
              <h2>Thank you, {submittedMessage.firstName}!</h2>
              <p>
                Your message has been received. I&apos;ll reply to{' '}
                <strong>{submittedMessage.emailAddress}</strong> as soon as possible.
              </p>
              <p className="contact-redirect-note">Taking you back to the Home page…</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleFormSubmit} noValidate>
              <div className="form-row">
                <FormField
                  label="First Name"
                  name="firstName"
                  value={contactFormData.firstName}
                  error={formErrors.firstName}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  required
                />
                <FormField
                  label="Last Name"
                  name="lastName"
                  value={contactFormData.lastName}
                  error={formErrors.lastName}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  required
                />
              </div>
              <div className="form-row">
                <FormField
                  label="Contact Number"
                  name="phoneNumber"
                  type="tel"
                  value={contactFormData.phoneNumber}
                  error={formErrors.phoneNumber}
                  onChange={handleInputChange}
                  autoComplete="tel"
                />
                <FormField
                  label="Email Address"
                  name="emailAddress"
                  type="email"
                  value={contactFormData.emailAddress}
                  error={formErrors.emailAddress}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                />
              </div>
              <FormField
                label="Message"
                name="message"
                multiline
                value={contactFormData.message}
                error={formErrors.message}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="button contact-submit">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * FormField
 * A labelled input (or textarea when "multiline" is set) with an inline
 * error message. Keeps the form markup above short and consistent.
 */
function FormField({ label, name, error, multiline = false, required = false, ...inputProps }) {
  const fieldId = `contact-${name}`
  const errorId = `${fieldId}-error`
  const InputElement = multiline ? 'textarea' : 'input'

  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={fieldId}>
        {label}
        {required && <span className="required-mark"> *</span>}
      </label>
      <InputElement
        id={fieldId}
        name={name}
        rows={multiline ? 5 : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        required={required}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="form-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default Contact
