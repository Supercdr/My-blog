import { defineConfig } from "astro/config";

const site = process.env.SITE_URL ?? "https://example.com";
const configuredBase = process.env.BASE_PATH ?? "/";
const base =
  configuredBase === "/"
    ? "/"
    : `/${configuredBase.replace(/^\/+|\/+$/g, "")}`;

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "never",
  markdown: {
    shikiConfig: {
      theme: "github-light",
      wrap: true
    }
  }
});
