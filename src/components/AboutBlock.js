import Image from "next/image";
import { site } from "@/data/site";

export default function AboutBlock({ headingId, showHeading = true }) {
  return (
    <div className={showHeading ? "about" : "about about--compact"}>
      {showHeading && <h2 id={headingId}>About</h2>}
      {site.portrait && (
        <figure className="about__portrait">
          <Image
            src={site.aboutPortrait || site.portrait}
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(max-width: 800px) 90vw, 28vw"
          />
        </figure>
      )}
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
