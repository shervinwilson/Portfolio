import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERY } from "@/sanity/queries";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 60;

async function getPost(slug) {
  return client.fetch(POST_QUERY, { slug }, { next: { revalidate: 60 } });
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return createPageMetadata({
    title: post.title,
    description:
      post.excerpt?.replace(/\s+/g, " ").trim().slice(0, 160) ||
      `Read ${post.title} by Shervin Wilson.`,
    path: `/blog/${post.slug}`,
    type: "article",
    image: post.mainImage?.asset
      ? urlFor(post.mainImage).width(1200).url()
      : undefined,
    imageAlt: post.mainImage?.alt || post.title,
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const mainImageDimensions = post.mainImage?.asset?.metadata?.dimensions;
  const components = {
    types: {
      image: ({ value }) => {
        const dimensions = value.asset?.metadata?.dimensions;
        if (!value.asset || !dimensions) return null;

        return (
          <figure>
            <Image
              src={urlFor(value).width(1000).url()}
              width={dimensions.width}
              height={dimensions.height}
              alt={value.alt || ""}
              sizes="(max-width: 700px) 100vw, 640px"
            />
          </figure>
        );
      },
    },
    marks: {
      link: ({ children, value }) => (
        <a href={value?.href}>{children}</a>
      ),
    },
  };

  return (
    <article className="container blog-article">
      <header className="page-head blog-head">
        <Link href="/blog" className="link">
          All posts
        </Link>
        <h1>{post.title}</h1>
        <p className="blog-meta">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          )}
          {post.author?.name && ` · ${post.author.name}`}
        </p>
      </header>
      {post.mainImage?.asset && mainImageDimensions && (
        <figure className="blog-cover">
          <Image
            src={urlFor(post.mainImage).width(1200).url()}
            width={mainImageDimensions.width}
            height={mainImageDimensions.height}
            alt={post.mainImage.alt || ""}
            sizes="(max-width: 700px) calc(100vw - 40px), 840px"
            priority
          />
        </figure>
      )}
      <div className="blog-body">
        <PortableText value={post.body || []} components={components} />
      </div>
    </article>
  );
}