import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/queries";

export const revalidate = 60;

export const metadata = {
  title: "Blog",
  description: "Notes and articles.",
};

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function BlogPage() {
  const posts = await client.fetch(
    POSTS_QUERY,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <div className="container">
      <header className="page-head">
        <h1>Blog</h1>
        <p className="page-head__lead">Notes, ideas, and things I&apos;ve learned.</p>
      </header>
      <section className="section section--tight" aria-label="Published posts">
        {posts.length ? (
          <ul className="work__list">
            {posts.map((post) => {
              const excerpt = post.excerpt?.trim();
              const categories = post.categories?.filter(Boolean).join(", ");

              return (
                <li key={post._id}>
                  <Link href={`/blog/${post.slug}`} className="work__row">
                    <span className="work__main">
                      <span className="work__title">{post.title}</span>
                      {excerpt && (
                        <span className="work__summary">
                          {excerpt.slice(0, 220)}
                          {excerpt.length > 220 ? "..." : ""}
                        </span>
                      )}
                    </span>
                    <span className="work__meta">
                      {categories || "Article"}
                    </span>
                    <time
                      className="work__year"
                      dateTime={post.publishedAt || undefined}
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="blog-empty">No posts published yet.</p>
        )}
      </section>
    </div>
  );
}