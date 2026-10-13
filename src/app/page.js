import Hero from "@/components/Hero";
import WorkShowcase from "@/components/WorkShowcase";
import AboutBlock from "@/components/AboutBlock";
import Skills from "@/components/Skills";
import ContactBlock from "@/components/ContactBlock";
import { projects } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* The hero stays pinned while the black work section slides over it. */}
      <div className="stack">
        <Hero />
        <WorkShowcase projects={projects} />
      </div>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="container">
          <AboutBlock headingId="about-title" />
        </div>
      </section>

      <section className="section" id="skills" aria-labelledby="skills-title">
        <div className="container">
          <div className="section__head">
            <h2 id="skills-title">Skills and tools</h2>
          </div>
          <Skills />
        </div>
      </section>

      <section className="section" id="contact" aria-labelledby="contact-title">
        <div className="container">
          <ContactBlock headingId="contact-title" />
        </div>
      </section>
    </>
  );
}