/**
 * Projects.jsx
 * Projects page: renders a card for every project listed in portfolioData.
 */
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/portfolioData'
import './Projects.css'

function Projects() {
  return (
    <section className="page container">
      <h1 className="page-title">Projects</h1>
      <p className="page-intro">
        A selection of current and past projects, with my role in each and what it achieved.
      </p>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
