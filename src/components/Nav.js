"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [hidden, setHidden] = useState(false);

  // On the home page the nav floats over the content, so it tucks away while
  // you scroll down and returns as soon as you scroll up.
  useEffect(() => {
    if (!isHome) {
      setHidden(false);
      return;
    }
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const className = ["nav", isHome && "nav--home", hidden && "nav--hidden"]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={className}>
      {/* The home page already shows your name huge, so the nav shows your role there. */}
      <Link href="/" className="nav__name">
        {isHome ? site.role : site.name}
      </Link>

      <nav aria-label="Primary">
        <ul className="nav__links">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}