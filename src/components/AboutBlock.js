import { site } from "@/data/site";

export default function AboutBlock({ headingId, showHeading = true }) {
  return (
    <div className="about">
      {showHeading ? <h2 id={headingId}>About</h2> : <div />}
      <div className="about__body">
        <p className="about__lead">{site.aboutLead}</p>
        {site.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <dl className="facts">
          {site.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
