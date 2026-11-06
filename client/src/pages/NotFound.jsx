/**
 * NotFound.jsx
 * Shown when the URL does not match any page.
 */
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page container text-center">
      <h1>Page not found</h1>
      <p>Sorry, that page doesn&apos;t exist.</p>
      <Link to="/" className="button">
        Back to Home
      </Link>
    </section>
  )
}

export default NotFound
