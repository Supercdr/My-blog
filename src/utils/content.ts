import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export function getPostHref(post: Post): string {
  return `/blog/${post.id}`;
}

export function getTagHref(tag: string): string {
  return `/tags/${tagSlug(tag)}`;
}

export function tagSlug(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

export function formatDateISO(date: Date): string {
  return date.toISOString();
}

export function collectTags(posts: Post[]): Map<string, Post[]> {
  const tags = new Map<string, Post[]>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const entries = tags.get(tag) ?? [];
      entries.push(post);
      tags.set(tag, entries);
    }
  }

  return new Map(
    [...tags.entries()].sort(([a], [b]) => a.localeCompare(b, "zh-CN"))
  );
}
