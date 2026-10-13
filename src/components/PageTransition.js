"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { setNavigating } from "@/lib/transition";

// A black curtain rises over the page, the new page loads behind it, then the
// curtain lifts away. Skipped for visitors who prefer reduced motion.
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const panel = useRef(null);
  const pending = useRef(false);

  // Intercept clicks on internal links (capture phase, so we run first).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (event) => {
      if (reduce.matches || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link =
        event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      event.stopPropagation();
      if (pending.current) return;

      pending.current = true;
      setNavigating(true);

      gsap.fromTo(
        panel.current,
        { yPercent: 100, visibility: "visible" },
        {
          yPercent: 0,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => router.push(url.pathname + url.search + url.hash),
        }
      );

      // Safety net: never leave the curtain stuck if navigation fails.
      window.setTimeout(() => {
        if (!pending.current) return;
        pending.current = false;
        setNavigating(false);
        gsap.set(panel.current, { yPercent: 100, visibility: "hidden" });
      }, 5000);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // When the new page is in place, lift the curtain.
  useEffect(() => {
    if (!pending.current) return;
    gsap.to(panel.current, {
      yPercent: -100,
      duration: 0.8,
      delay: 0.1,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(panel.current, { yPercent: 100, visibility: "hidden" });
        pending.current = false;
        setNavigating(false);
      },
    });
  }, [pathname]);

  return <div className="curtain" ref={panel} aria-hidden="true" />;
}
