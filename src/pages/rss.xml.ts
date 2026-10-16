import type { APIContext } from "astro";
import { siteConfig, withBase } from "@/config";
import { getPostHref, getPublishedPosts } from "@/utils/content";

const escapeXML = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const siteURL = context.site ?? new URL("https://example.com");
  const channelURL = new URL(withBase("/"), siteURL).toString();
  const feedURL = new URL(withBase("/rss.xml"), siteURL).toString();

  const items = posts
    .map((post) => {
      const postURL = new URL(getPostHref(post), siteURL).toString();

      return `
        <item>
          <title>${escapeXML(post.data.title)}</title>
          <link>${escapeXML(postURL)}</link>
          <guid isPermaLink="true">${escapeXML(postURL)}</guid>
          <description>${escapeXML(post.data.description)}</description>
          <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
          ${post.data.tags
            .map((tag) => `<category>${escapeXML(tag)}</category>`)
            .join("")}
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${escapeXML(siteConfig.title)}</title>
        <link>${escapeXML(channelURL)}</link>
        <description>${escapeXML(siteConfig.description)}</description>
        <language>zh-CN</language>
        <atom:link href="${escapeXML(feedURL)}" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
