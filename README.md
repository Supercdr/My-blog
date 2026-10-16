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

## 发布到公网

这是一个静态站点，可以部署到 Vercel、Netlify、Cloudflare Pages 或 GitHub Pages。

推荐流程：

1. 把项目提交到一个 Git 仓库。
2. 在部署平台导入仓库。
3. 构建命令填写 `npm run build`。
4. 输出目录填写 `dist`。
5. 设置环境变量 `SITE_URL` 为正式域名，例如 `https://blog.example.com`。

每次推送到主分支后，平台会自动重新构建和发布。域名配置完成后，站点地图位于 `/sitemap.xml`，RSS 位于 `/rss.xml`。
