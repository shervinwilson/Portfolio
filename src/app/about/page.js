import AboutBlock from "@/components/AboutBlock";
import Skills from "@/components/Skills";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Meet Shervin Wilson, a web designer and developer in Kerala, India. Learn about his approach, skills, and experience building websites.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container">
      <header className="page-head">
        <h1>About</h1>
      </header>
      <section className="section section--tight" aria-label="About me">
        <AboutBlock showHeading={false} />
      </section>
      <section className="section" aria-labelledby="skills-title">
        <div className="section__head">
          <h2 id="skills-title">Skills and tools</h2>
        </div>
        <Skills />
      </section>
    </div>
  );
}
