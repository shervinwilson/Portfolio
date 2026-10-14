import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WorkShowcase from "@/components/WorkShowcase";
import Process from "@/components/Process";
import AboutBlock from "@/components/AboutBlock";
import Skills from "@/components/Skills";
import ContactBlock from "@/components/ContactBlock";
import { projects } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* The hero stays pinned as the services and work panels scroll over it. */}
      <div className="stack">
        <Hero />
        <Services />
        <WorkShowcase projects={projects.slice(0, 4)} />
      </div>

      <section className="section skills-section" id="skills" aria-labelledby="skills-title">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="skills__eyebrow">Developer / Designer / Builder /</p>
              <h2 id="skills-title">Tools of the trade</h2>
            </div>
          </div>
          <Skills />
        </div>
      </section>

      <Process />

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="container">
          <AboutBlock headingId="about-title" />
        </div>
      </section>

      <section className="section section--cta" id="contact" aria-labelledby="contact-title">
        <div className="container">
          <ContactBlock headingId="contact-title" />
        </div>
      </section>
    </>
  );
}