import { absoluteSiteUrl } from "@/lib/seo";

export default function robots() {
  const sitemap = absoluteSiteUrl("/sitemap.xml");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio"],
    },
    ...(sitemap ? { sitemap } : {}),
  };
}