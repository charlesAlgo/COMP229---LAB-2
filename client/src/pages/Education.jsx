/**
 * Education.jsx
 * Education page: educational and professional qualifications shown as a
 * vertical timeline, most recent first.
 */
import EducationItem from '../components/EducationItem'
import { education } from '../data/portfolioData'
import './Education.css'

function Education() {
  return (
    <section className="page container">
      <h1 className="page-title">Education</h1>
      <p className="page-intro">My educational and professional qualifications.</p>

      <ol className="education-timeline">
        {education.map((educationEntry) => (
          <EducationItem key={educationEntry.id} educationEntry={educationEntry} />
        ))}
      </ol>
    </section>
  )
}

export default Education
