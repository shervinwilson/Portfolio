"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import ProjectArt from "./ProjectArt";

export default function WorkIndex({ projects }) {
  const root = useRef(null);
  const preview = useRef(null);
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only on devices with a real pointer: a preview card follows the cursor.
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = preview.current;
          if (!el) return;

          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

          const move = (e) => {
            const w = el.offsetWidth;
            const h = el.offsetHeight;
            const x = Math.min(e.clientX + 28, window.innerWidth - w - 16);
            const y = Math.max(16, e.clientY - h / 2);
            xTo(x);
            yTo(y);
          };

          window.addEventListener("mousemove", move);
          return () => window.removeEventListener("mousemove", move);
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <ul className="work__list">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="work__row"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(-1)}
            >
              <span className="work__main">
                <span className="work__title">{project.title}</span>
                <span className="work__summary">{project.summary}</span>
              </span>
              <span className="work__meta">{project.category}</span>
              <span className="work__year">{project.status}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="work__preview" ref={preview} aria-hidden="true">
        {projects.map((project, i) => (
          <div
            className="work__art"
            key={project.slug}
            data-on={active === i ? "true" : "false"}
          >
            <ProjectArt screenshot={project.screenshot} />
          </div>
        ))}
      </div>
    </div>
  );
}
