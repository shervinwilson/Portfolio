import WorkIndex from "@/components/WorkIndex";
import { projects } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Explore websites designed and built by Shervin Wilson, including responsive web design, Webflow, WordPress, and custom development projects.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="container">
      <header className="page-head">
        <h1>Work</h1>
        <p className="page-head__lead">
          A selection of websites and digital projects I&apos;ve worked on. Open a
          project to visit its live site.
        </p>
      </header>
      <section className="section section--tight" aria-label="All projects">
        <WorkIndex projects={projects} />
      </section>
    </div>
  );
}
