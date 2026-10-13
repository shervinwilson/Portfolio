import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteAnimations from "@/components/SiteAnimations";
import PageTransition from "@/components/PageTransition";
import { site } from "@/data/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.intro,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Lets the CSS hide animated items until JavaScript animates them in. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}.hero__char,.hero__reveal{opacity:1!important}.hero__portrait{clip-path:none!important}`}</style>
        </noscript>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <SiteAnimations />
        <PageTransition />
      </body>
    </html>
  );
}