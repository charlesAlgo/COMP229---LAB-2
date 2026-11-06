/**
 * ProjectCard.jsx
 * Displays one project: image, title, my role, a short description,
 * the outcome and the technologies used.
 */
const publicPath = import.meta.env.BASE_URL

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <img
        className="project-image"
        src={`${publicPath}${project.image}`}
        alt={`Screenshot of the ${project.title} project`}
        width="640"
        height="360"
        loading="lazy"
      />
      <div className="project-body">
        <h2 className="project-title">{project.title}</h2>
        <p className="project-role">
          <strong>Role:</strong> {project.role}
        </p>
        <p>{project.description}</p>
        <p className="project-outcome">
          <strong>Outcome:</strong> {project.outcome}
        </p>
        <ul className="project-tags" aria-label="Technologies used">
          {project.technologies.map((technologyName) => (
            <li key={technologyName}>{technologyName}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default ProjectCard
