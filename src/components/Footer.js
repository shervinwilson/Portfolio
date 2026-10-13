"use client";

import { site } from "@/data/site";

export default function Footer() {
  function backToTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <ul className="footer__links">
          <li>
            <a href={`mailto:${site.email}`}>Email</a>
          </li>
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <button type="button" className="footer__top" onClick={backToTop}>
          Back to top
        </button>
      </div>
    </footer>
  );
}
