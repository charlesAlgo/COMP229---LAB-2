/**
 * Logo.jsx
 * Custom site logo: a filled hexagon with the owner's initials in the centre.
 * Drawn as inline SVG so it scales cleanly and needs no image file.
 */
import { personalInfo } from '../data/portfolioData'

function Logo({ size = 44 }) {
  return (
    <svg
      className="site-logo"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${personalInfo.legalName} logo`}
    >
      {/* Six points of a regular hexagon inside a 100x100 box */}
      <polygon points="50,4 92,27 92,73 50,96 8,73 8,27" fill="var(--color-primary)" />
      <polygon
        points="50,14 83,32 83,68 50,86 17,68 17,32"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="3"
      />
      <text
        x="50"
        y="61"
        textAnchor="middle"
        fontFamily="Poppins, Arial, sans-serif"
        fontSize="30"
        fontWeight="700"
        fill="#ffffff"
      >
        {personalInfo.initials}
      </text>
    </svg>
  )
}

export default Logo
