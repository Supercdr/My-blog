export const siteConfig = {
  title: "留白",
  tagline: "在信息之间，留一点思考的余地",
  description:
    "一个关于写作、设计、技术与日常观察的独立博客，记录那些值得慢慢想清楚的事。",
  author: "Zhang Yuying",
  email: "hello@example.com",
  location: "Shanghai, China",
  nav: [
    { label: "文章", href: "/blog" },
    { label: "标签", href: "/tags" },
    { label: "关于", href: "/about" }
  ]
} as const;

export function withBase(path = "/"): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path) || path.startsWith("#")) {
    return path;
  }

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${base}${normalizedPath}` || "/";
}
