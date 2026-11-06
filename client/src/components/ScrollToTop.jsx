/**
 * ScrollToTop.jsx
 * Scrolls the window back to the top whenever the route changes, so a new
 * page doesn't open half-way down.
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
