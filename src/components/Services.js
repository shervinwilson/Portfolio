import { site } from "@/data/site";

export default function Services() {
  return (
    <section
      className="services-section"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="container">
        <header className="services__head">
          <p className="services__eyebrow">What I do /</p>
          <h2 id="services-title">Websites, made to work.</h2>
          <p className="services__intro">
            From a first idea to a site that needs a second life, I bring design,
            development, and practical problem-solving into one process.
          </p>
        </header>
        <div className="services__list">
          {site.services.map((service, index) => (
            <article className="service-row" key={service.title}>
              <span className="service-row__num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{service.title}</h3>
              <div className="service-row__copy">
                <p>{service.description}</p>
                <ul className="service-row__items">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}