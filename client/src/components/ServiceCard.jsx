/**
 * ServiceCard.jsx
 * Displays one service offered, with an illustrative image and short description.
 */
const publicPath = import.meta.env.BASE_URL

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <img
        className="service-image"
        src={`${publicPath}${service.image}`}
        alt=""
        width="96"
        height="96"
        loading="lazy"
      />
      <h2 className="service-title">{service.title}</h2>
      <p className="service-description">{service.description}</p>
    </article>
  )
}

export default ServiceCard
