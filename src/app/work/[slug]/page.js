import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/site";
import ProjectArt from "@/components/ProjectArt";
import ParallaxArt from "@/components/ParallaxArt";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="container">
      <header className="page-head">
        <Link href="/work" className="link">
          All work
        </Link>
        <h1>{project.title}</h1>
        <p className="page-head__lead">{project.summary}</p>
      </header>

      <ParallaxArt>
        <ProjectArt variant={project.art} />
      </ParallaxArt>

      <dl className="case__meta">
        <div>
          <dt>Role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>{project.year}</dd>
        </div>
        <div>
          <dt>Tools</dt>
          <dd>{project.tools.join(", ")}</dd>
        </div>
      </dl>

      <div className="case__body">
        <section>
          <h2>Overview</h2>
          <p>{project.overview}</p>
        </section>
        <section>
          <h2>The challenge</h2>
          <p>{project.challenge}</p>
        </section>
        <section>
          <h2>The approach</h2>
          <p>{project.approach}</p>
        </section>
        <section>
          <h2>The outcome</h2>
          <p>{project.outcome}</p>
        </section>
      </div>

      <Link href={`/work/${next.slug}`} className="case__next">
        <span className="case__next-label">Next project</span>
        <span className="case__next-title">{next.title}</span>
      </Link>
    </article>
  );
}
