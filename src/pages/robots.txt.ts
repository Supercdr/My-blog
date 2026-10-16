import type { APIContext } from "astro";
import { withBase } from "@/config";

export function GET(context: APIContext) {
  const siteURL = context.site ?? new URL("https://example.com");
  const sitemapURL = new URL(withBase("/sitemap.xml"), siteURL).toString();

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemapURL}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
