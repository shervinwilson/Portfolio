import { site } from "@/data/site";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = configuredSiteUrl
  ? new URL(
      /^https?:\/\//i.test(configuredSiteUrl)
        ? configuredSiteUrl
        : `https://${configuredSiteUrl}`
    )
  : undefined;

export function absoluteSiteUrl(path) {
  return siteUrl ? new URL(path, siteUrl).toString() : undefined;
}

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  imageAlt = `Portrait of ${site.name}`,
}) {
  const canonical = absoluteSiteUrl(path);
  const shareImage = image || absoluteSiteUrl(site.aboutPortrait || site.portrait);

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      type,
      locale: "en_IN",
      siteName: site.name,
      title,
      description,
      ...(canonical ? { url: canonical } : {}),
      ...(shareImage ? { images: [{ url: shareImage, alt: imageAlt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(shareImage ? { images: [shareImage] } : {}),
    },
  };
}