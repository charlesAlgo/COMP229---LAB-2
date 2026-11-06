/**
 * EducationItem.jsx
 * One entry on the Education timeline: qualification, institution,
 * dates and a short note.
 */
function EducationItem({ educationEntry }) {
  const { qualification, institution, startYear, endYear, details } = educationEntry

  // Show a single year when the qualification started and finished in the same year
  const dateRange = startYear === endYear ? endYear : `${startYear} – ${endYear}`

  return (
    <li className="education-item">
      <span className="education-dot" aria-hidden="true" />
      <div className="education-card">
        <p className="education-dates">{dateRange}</p>
        <h2 className="education-qualification">{qualification}</h2>
        <p className="education-institution">{institution}</p>
        <p className="education-details">{details}</p>
      </div>
    </li>
  )
}

export default EducationItem
