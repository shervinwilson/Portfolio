"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import ProjectArt from "./ProjectArt";

// The black "Selected work" section on the home page. It slides up over the
// hero (see .stack and .hero in globals.css); the hero fades in Hero.js.
// Every row sticks to the top and the next row slides over it.
export default function WorkShowcase({ projects }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Each row rises into view the first time you scroll to it.
        q(".showcase__row").forEach((row) => {
          gsap.from(row, {
            opacity: 0,
            y: 48,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  const lastIndex = projects.length - 1;

  return (
    <section
      className="work-section"
      id="work"
      aria-labelledby="work-title"
      ref={root}
    >
      <div className="container">
        <h2 className="work-section__title" id="work-title">
          Selected work<span aria-hidden="true"> /</span>
        </h2>

        <ul className="showcase">
          {projects.map((project, i) => (
            <li
              className={
                i === lastIndex
                  ? "showcase__item showcase__item--last"
                  : "showcase__item"
              }
              key={project.slug}
              style={{ "--i": i }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="showcase__row"
              >
                <span className="showcase__num" aria-hidden="true">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <span className="showcase__body">
                  <span className="showcase__title">{project.title}</span>
                  <span className="showcase__summary">{project.summary}</span>
                  <span className="showcase__meta">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </span>
                </span>
                <span className="showcase__art" aria-hidden="true">
                  <ProjectArt screenshot={project.screenshot} />
                </span>
              </a>
            </li>
          ))}
          {/* Extra scroll room so the last row stays pinned for a moment
              before the whole stack scrolls away. */}
          <li className="showcase__spacer" aria-hidden="true" />
        </ul>

        <div className="work-section__foot">
          <Link href="/work" className="btn btn--light">
            See all work
          </Link>
        </div>
      </div>
    </section>
  );
}