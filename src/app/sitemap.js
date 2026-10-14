import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/queries";
import { absoluteSiteUrl, siteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap() {
  if (!siteUrl) return [];

  const posts = await client.fetch(
    POSTS_QUERY,
    {},
    { next: { revalidate } }
  );

  const pages = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/work", changeFrequency: "weekly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  ];

  return [
    ...pages.map(({ path, ...metadata }) => ({
      url: absoluteSiteUrl(path),
      ...metadata,
    })),
    ...posts.map((post) => ({
      url: absoluteSiteUrl(`/blog/${post.slug}`),
      ...(post.publishedAt ? { lastModified: new Date(post.publishedAt) } : {}),
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}