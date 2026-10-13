import AboutBlock from "@/components/AboutBlock";
import Skills from "@/components/Skills";

export const metadata = {
  title: "About",
  description: "Who I am, what I do and the tools I use.",
};

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
