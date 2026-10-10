# 项目长期记忆：blog（D:/project/blog）

## 技术栈
Next.js 16 App Router / React 19 / Tailwind CSS v4（CSS-first，无 tailwind.config）/ pnpm / TypeScript。部署走 opennextjs-cloudflare。

## 关键约定
- **设计令牌只在 `src/styles/theme.css` 的 `@theme` 里定义**，8 个 `--color-*`（primary/secondary/brand/brand-secondary/bg/border/card/article）会生成全站 Tailwind 工具类，引用 200+ 处。改名会大面积破坏，只改值。
- `src/app/layout.tsx` 用 `<html style>` **内联注入**同样的 8 个变量（值来自 `src/config/site-content.json` 的 `theme`），内联优先级高于 `@theme`。**改配色必须两处都改**。
- 深色模式用 `html.dark { --color-*: ... !important }`，必须 `!important` 才能压过内联样式与配置弹窗的 `setProperty`。
- 数据全在 `public/blogs/`（index.json + categories.json + `{slug}/config.json` + `{slug}/index.md`），运行时 `fetch('/blogs/...')` 客户端拉取。文章字段：slug/title/tags/date/summary/cover/hidden/category。
- 导航入口定义在 `src/consts.ts` 的 `NAV_ITEMS`（/blog、/projects、/about、/share、/bloggers）。
- 全局外壳在 `src/layout/index.tsx`：Header + `<main className='mx-auto max-w-7xl px-6 pt-10 pb-16'>` + Footer。页面不要再写 `pt-24/28/32` 和 `px-6`。
- 固定编辑工具栏统一用 `fixed top-[72px] right-6 z-40`（header 高 56px）。
- 代码风格：Prettier `useTabs, printWidth 160, semi: false, singleQuote, jsxSingleQuote, arrowParens: avoid, bracketSameLine`。

## 本机命令（务必照此执行）
- pnpm 不在 PATH：`C:/Users/fanqie/.workbuddy/binaries/node/versions/22.22.2-6/corepack pnpm ...`
- 装/构建必须带 `--config.verifyDepsBeforeRun=false`，否则 pnpm 会先重装依赖并破坏 node_modules。
- 装依赖必须带 `--node-linker=hoisted`（Windows 无 symlink 权限）。
- `ERR_PNPM_IGNORED_BUILDS`（esbuild/sharp/workerd）是正常现象，exit 1 但依赖已就绪。
- dev server：`pnpm --config.verifyDepsBeforeRun=false exec next dev --turbopack -p 2026`（2025 常被用户自己的服务占用）。

## 易踩的坑
- `src/components/blog-preview.tsx` 同时被 `/blog/[id]` 和 `/write` 预览复用，改它两边同步生效。
- `@utility card` 是全局视觉原语；历史上曾用 `@utility shadow` 覆盖 Tailwind 原生 shadow 语义（已删除）。
- 构建时若报 `SAFE_DELETE_BULK_CONFIRM_REQUIRED`（清理 `.next/trace`），是 WorkBuddy 删除守卫拦截，重试即可，非代码问题。
