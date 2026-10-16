# 留白

一个使用 Astro 构建的极简独立博客。文章使用 Markdown 管理，构建结果是纯静态文件，不需要数据库、登录系统或后台服务。

## 本地预览

```bash
npm install
npm run dev
```

终端会输出本地地址，通常是 `http://localhost:4321`。

检查类型和构建：

```bash
npm run check
npm run build
npm run preview
```

`npm run build` 生成的静态文件位于 `dist/`。

## 新增文章

在 `src/content/posts/` 中新建一个 `.md` 文件。文件名会成为文章地址，例如 `my-new-post.md` 对应 `/blog/my-new-post`。

```md
---
title: "文章标题"
description: "用于列表、搜索摘要和分享卡片的一句话摘要。"
pubDate: 2026-10-15
updatedDate: 2026-10-18
tags:
  - 写作
  - 技术
featured: false
draft: false
---

这里开始写正文。

## 二级标题

支持普通 Markdown 语法。
```

字段说明：

- `title`：文章标题，必填。
- `description`：摘要，必填。
- `pubDate`：发布日期，必填。
- `updatedDate`：更新日期，可选。
- `tags`：标签数组，必填，可以为空数组。
- `featured`：是否在列表中标为精选，可选。
- `draft`：设为 `true` 后不会出现在列表、标签、RSS 和站点地图中。

文件名建议使用英文小写和连字符，例如 `designing-for-clarity.md`。

## 修改个人信息

站点名称、作者、介绍、邮箱和导航位于 `src/config.ts`。首页与关于页的文案分别在：

- `src/pages/index.astro`
- `src/pages/about.astro`

## 发布到 GitHub Pages

项目已包含 `.github/workflows/deploy.yml`。GitHub Pages 必须使用 Actions 构建，而不是让 Jekyll 直接发布 Astro 源码，否则 Jekyll 会误把 `.astro` 文件中的 `---` 当成 YAML front matter。

首次部署：

1. 把修改推送到 GitHub 的 `main` 分支。
2. 打开仓库的 `Settings` → `Pages`。
3. 在 `Build and deployment` 中将 `Source` 设为 `GitHub Actions`。
4. 打开 `Actions`，运行或等待 `Deploy to GitHub Pages` 完成。

项目仓库 `Supercdr/My-blog` 的默认地址通常是：

```text
https://supercdr.github.io/My-blog/
```

工作流会自动提供 `SITE_URL` 和 `BASE_PATH`，因此项目页的子路径、CSS、图片、文章链接和 SEO 地址都能正确生成。使用自定义域名时，在 Pages 设置中完成域名绑定即可。

每次推送到 `main` 分支后都会自动重新构建和发布。站点地图位于 `/My-blog/sitemap.xml`，RSS 位于 `/My-blog/rss.xml`。

## 发布到其他平台

项目也可以部署到 Vercel、Netlify 或 Cloudflare Pages：

- 构建命令：`npm run build`
- 输出目录：`dist`
- 站点根路径的 `SITE_URL`：例如 `https://blog.example.com`
- 站点根路径的 `BASE_PATH`：`/`
