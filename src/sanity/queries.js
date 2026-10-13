import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "excerpt": pt::text(body),
    "categories": categories[]->title
  }
`);

export const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "excerpt": pt::text(body),
    author->{name},
    "categories": categories[]->{_id, title},
    mainImage {
      ...,
      asset->{_id, metadata{dimensions{width, height}}}
    },
    body[] {
      ...,
      _type == "image" => {
        "asset": asset->{_id, metadata{dimensions{width, height}}}
      }
    }
  }
`);