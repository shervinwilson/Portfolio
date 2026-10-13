"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { isNavigating } from "@/lib/transition";

// Scroll and entrance animations for every page except the home hero and the
// black work section (those animate themselves). It finds elements by their
// class names, so pages don't need any extra markup. The matching starting
// states are in globals.css (search for "Entrance starting states").
export default function SiteAnimations() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Wait for the page-transition curtain to start lifting.
        const delay = isNavigating() ? 0.55 : 0;
        const all = (selector) => gsap.utils.toArray(selector);

        // Items rise and fade in, one after another, when `trigger` scrolls in.
        const rise = (targets, trigger, extra = {}) => {
          if (!targets.length || !trigger) return;
          gsap.fromTo(
            targets,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              delay,
              scrollTrigger: { trigger, start: "top 88%", once: true },
              ...extra,
            }
          );
        };

        // Inner-page headers: play straight away.
        const heads = all(".page-head > *");
        if (heads.length) {
          gsap.fromTo(
            heads,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.1,
              delay,
            }
          );
        }

        // Section headings.
        all(".section__head h2").forEach((h) => rise([h], h));

        // About text and facts.
        const about = document.querySelector(".about");
        if (about) {
          rise(
            [
              ...all(".about > h2"),
              ...all(".about__lead"),
              ...all(".about__body > p"),
              ...all(".facts > div"),
            ],
            about
          );
        }

        // Skills columns.
        const skills = document.querySelector(".skills");
        if (skills) rise(all(".skills > div"), skills, { stagger: 0.14 });

        // Contact call-to-action on the home page.
        const contact = document.querySelector(".contact");
        if (contact) {
          rise(
            [
              ...all(".contact h2"),
              ...all(".contact__email"),
              ...all(".contact .actions"),
            ],
            contact,
            { stagger: 0.12 }
          );
        }

        // Contact page: form fields and side details.
        const grid = document.querySelector(".contact-grid");
        if (grid) {
          rise(
            [
              ...all(".form .field"),
              ...all(".form > .btn"),
              ...all(".contact-grid aside > *"),
            ],
            grid,
            { stagger: 0.06 }
          );
        }

        // Case study pages.
        const meta = document.querySelector(".case__meta");
        if (meta) rise(all(".case__meta > div"), meta, { stagger: 0.12 });
        all(".case__body section").forEach((s) => rise([s], s));
        const next = document.querySelector(".case__next");
        if (next) rise([next], next);

        // The light project list on /work.
        if (document.querySelector(".work__list")) {
          ScrollTrigger.batch(".work__list li", {
            start: "top 90%",
            once: true,
            onEnter: (items) =>
              gsap.fromTo(
                items,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: "power3.out",
                  stagger: 0.1,
                  delay,
                }
              ),
          });
        }

        // Footer.
        const footer = document.querySelector(".footer");
        if (footer) rise(all(".footer__inner > *"), footer, { stagger: 0.1 });
      });

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  return null;
}
