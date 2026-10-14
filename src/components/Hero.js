"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/data/site";
import ProjectArt from "./ProjectArt";

// The intro plays once per page load. Coming back to the home page through
// the site's own links skips it, so it never gets in the way.
let introPlayed = false;

const chars = Array.from(site.name);

export default function Hero() {
  const root = useRef(null);
  const overlayRef = useRef(null);
  const mask = useRef(null);
  const text = useRef(null);
  const count = useRef(null);
  const [today, setToday] = useState("");

  // Set on the client so the date is always the visitor's today.
  useEffect(() => {
    setToday(
      new Date()
        .toLocaleDateString("en-US", { month: "short", day: "numeric" })
        .toUpperCase()
    );
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const qp = gsap.utils.selector(overlayRef);
      const html = document.documentElement;
      const maskEl = mask.current;
      const textEl = text.current;

      // Scale the name so it always spans the full width, whatever its length.
      const fit = () => {
        if (!maskEl || !textEl) return;
        textEl.style.fontSize = "1000px";
        const natural = textEl.offsetWidth; // ignores transforms
        if (!natural) return;
        const size = (1000 * maskEl.clientWidth) / natural;
        textEl.style.fontSize = `${Math.min(size, window.innerHeight * 0.42)}px`;
      };

      fit();
      if (document.fonts) document.fonts.ready.then(fit);

      // The hero's height drives how far it can scroll before it pins (CSS).
      const heroEl = root.current;
      const setHeroHeight = () =>
        heroEl.style.setProperty("--hero-h", `${heroEl.offsetHeight}px`);
      setHeroHeight();
      const heroRO = new ResizeObserver(setHeroHeight);
      heroRO.observe(heroEl);

      let lastWidth = 0;
      const ro = new ResizeObserver(() => {
        const w = maskEl.clientWidth;
        if (w !== lastWidth) {
          lastWidth = w;
          fit();
        }
      });
      ro.observe(maskEl);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const overlay = overlayRef.current;

        // As the black work section slides up over the hero, the hero fades and
        // drifts up slowly (parallax) while the portrait moves a little more.
        // Everything is worked out from where the black section is right now,
        // so the hero is untouched at the top of the page.
        const inner = q(".hero__inner")[0];
        const portraitInner = q(".hero__portrait-inner")[0];
        const services = document.getElementById("services");
        const setOpacity = gsap.quickSetter(inner, "opacity");
        const setDrift = gsap.quickSetter(inner, "y", "px");
        const setPortrait = gsap.quickSetter(portraitInner, "yPercent");

        const updateFade = () => {
          if (!inner || !services) return;
          const vh = window.innerHeight;
          const progress = gsap.utils.clamp(
            0,
            1,
            (vh - services.getBoundingClientRect().top) / (vh * 0.9)
          );
          setOpacity(1 - 0.85 * progress);
          setDrift(-progress * vh * 0.1);
          setPortrait(-6 * progress);
        };
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: updateFade,
          onRefresh: updateFade,
        });
        updateFade();

        const cleanup = () => {
          html.style.overflow = "";
          gsap.set([inner, portraitInner], {
            clearProps: "opacity,y,yPercent",
          });
        };

        if (introPlayed) {
          gsap.set(overlay, { display: "none" });
          gsap.set(q(".hero__char"), { opacity: 1 });
          gsap.set(q(".hero__reveal"), { opacity: 1 });
          gsap.set(q(".hero__portrait"), { clipPath: "inset(0% 0% 0% 0%)" });
          return cleanup;
        }

        // Keep the page still while the black screen is up.
        html.style.overflow = "hidden";

        const counter = { v: 0 };
        const tl = gsap.timeline({
          onComplete: () => {
            introPlayed = true;
            html.style.overflow = "";
            gsap.set(overlay, { display: "none" });
            ScrollTrigger.refresh();
          },
        });

        tl
          // 1. Black screen: the counter runs up to 100.
          .to(counter, {
            v: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) {
                count.current.textContent = Math.round(counter.v);
              }
            },
          })
          // 2. The counter and label fade away.
          .to(qp(".preloader__role, .preloader__count"), {
            opacity: 0,
            y: -16,
            duration: 0.45,
            ease: "power2.in",
          })
          .addLabel("lift", "+=0.05")
          // 3. The black screen lifts away with a soft curved edge.
          .fromTo(
            qp(".preloader__curve"),
            { scaleY: 0 },
            { scaleY: 1, duration: 0.5, ease: "power2.in" },
            "lift"
          )
          .to(
            overlay,
            {
              y: () => -(window.innerHeight + window.innerWidth * 0.12),
              duration: 1.3,
              ease: "expo.inOut",
            },
            "lift"
          )
          // 4. The name rises into place, letter by letter.
          .fromTo(
            q(".hero__char"),
            { yPercent: 110, opacity: 1 },
            {
              yPercent: 0,
              duration: 1.4,
              stagger: 0.045,
              ease: "power4.out",
            },
            "lift+=0.5"
          )
          // 5. The portrait unmasks from the bottom.
          .fromTo(
            q(".hero__portrait"),
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.4,
              ease: "expo.inOut",
            },
            "lift+=0.6"
          )
          .fromTo(
            q(".hero__portrait-inner"),
            { scale: 1.25 },
            { scale: 1, duration: 1.8, ease: "expo.out" },
            "lift+=0.6"
          )
          // 6. Everything else settles in.
          .fromTo(
            q(".hero__reveal"),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
            "lift+=0.9"
          );

        return cleanup;
      });

      return () => {
        ro.disconnect();
        heroRO.disconnect();
        mm.revert();
      };
    },
    { scope: root }
  );

  return (
    <>
      <div className="preloader" ref={overlayRef} aria-hidden="true">
        <p className="preloader__role">{site.role}</p>
        <p className="preloader__count">
          <span ref={count}>0</span>
        </p>
        <div className="preloader__curve" />
      </div>

      <section className="hero" ref={root}>
      <div className="container hero__inner">
        <h1 className="hero__name" aria-label={site.name}>
          <span className="hero__mask" ref={mask}>
            <span className="hero__name-text" ref={text} aria-hidden="true">
              {chars.map((ch, i) => (
                <span className="hero__char" key={i}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <div className="hero__grid">
          <div className="hero__left">
            <svg
              className="hero__arrow hero__reveal"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              aria-hidden="true"
            >
              <path d="M5 5l14 14M19 8v11H8" />
            </svg>

            <p className="hero__intro hero__reveal">{site.heroIntro}</p>

            <Link href="/contact" className="btn btn--solid hero__reveal">
              Contact
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
                aria-hidden="true"
              >
                <path d="M6 18L18 6M8 6h10v10" />
              </svg>
            </Link>
          </div>

          <div className="hero__portrait">
            <div className="hero__portrait-inner">
              {site.portrait ? (
                <Image
                  className="hero__img"
                  src={site.portrait}
                  alt={`Portrait of ${site.name}`}
                  fill
                  priority
                  sizes="(max-width: 800px) 70vw, 22rem"
                />
              ) : (
                <ProjectArt variant={0} />
              )}
            </div>
          </div>

          <div className="hero__avail hero__reveal">
            <p className="hero__avail-label">{site.availability}</p>
            <p className="hero__date">{today || "\u00A0"}</p>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}