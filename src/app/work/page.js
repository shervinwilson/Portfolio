import WorkIndex from "@/components/WorkIndex";
import { projects } from "@/data/site";

export const metadata = {
  title: "Work",
  description: "Selected websites and projects.",
};

export default function WorkPage() {
  return (
    <div className="container">
      <header className="page-head">
        <h1>Work</h1>
        <p className="page-head__lead">
          Websites I&apos;ve designed, built and improved. Pick a project to
          read how it came together.
        </p>
      </header>
      <section className="section section--tight" aria-label="All projects">
        <WorkIndex projects={projects} />
      </section>
    </div>
  );
}
