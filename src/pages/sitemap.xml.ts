import type { APIContext } from "astro";
import { withBase } from "@/config";
import {
  collectTags,
  getPostHref,
  getPublishedPosts,
  getTagHref
} from "@/utils/content";

const escapeXML = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const siteURL = context.site ?? new URL("https://example.com");
  const staticPaths = ["/", "/blog", "/tags", "/about"].map(withBase);
  const tagPaths = [...collectTags(posts).keys()].map(getTagHref);
  const paths = [...staticPaths, ...tagPaths, ...posts.map(getPostHref)];

  const urls = paths
    .map((path) => {
      const location = new URL(path, siteURL).toString();
      return `<url><loc>${escapeXML(location)}</loc></url>`;
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
      </urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
}
