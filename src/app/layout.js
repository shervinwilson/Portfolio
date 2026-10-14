import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteAnimations from "@/components/SiteAnimations";
import PageTransition from "@/components/PageTransition";
import { site } from "@/data/site";
import {
  absoluteSiteUrl,
  createPageMetadata,
  siteUrl,
} from "@/lib/seo";

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

const siteTitle = `${site.name} | Web Designer & Developer in Kerala, India`;
const siteDescription =
  "Shervin Wilson is a web designer and developer in Kerala, India, building responsive websites with Webflow, WordPress, and custom code.";

export const metadata = {
  ...(siteUrl ? { metadataBase: siteUrl } : {}),
  ...createPageMetadata({
    title: siteTitle,
    description: siteDescription,
    path: "/",
  }),
  title: {
    default: siteTitle,
    template: `%s | ${site.name}`,
  },
  applicationName: site.name,
  creator: site.name,
  publisher: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  homeLocation: { "@type": "Place", name: site.location },
  sameAs: site.socials.map(({ href }) => href),
  ...(siteUrl
    ? {
        "@id": absoluteSiteUrl("/#person"),
        url: siteUrl.href,
        image: absoluteSiteUrl(site.aboutPortrait || site.portrait),
      }
    : {}),
};

export default function RootLayout({ children }) {
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c"),
          }}
        />
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