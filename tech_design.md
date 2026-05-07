技术设计文档 (Tech Design) - Vibe & Pace 个人网站
1. 技术栈选择 (Tech Stack)
为了实现“极简、心流、快速迭代”的目标，技术选型需避免过度工程化（Over-engineering），采用现代化的 Jamstack 架构。

前端 (Frontend)

核心框架：Astro。Astro 以内容驱动和“零 JS”加载著称，能提供极致的页面加载速度，非常适合个人展示网站。

UI 库：React (仅在需要复杂交互的 Astro Island 中按需引入)。

样式方案：Tailwind CSS。实用优先的 CSS 框架，方便快速实现 PRD 中要求的“留白、呼吸感”和浅色主题。

动效引擎：Framer Motion。用于实现页面滚动时的元素上浮、卡片丝滑缩放等“呼吸感动效”。

后端 & 内容管理 (Backend & CMS)

无头方案：MDX (Markdown with JSX)。无需部署传统的后端服务器，将“项目 (Projects)”和“日志 (Logs)”作为 .mdx 文件直接托管在代码库中。完美契合开发者习惯，修改即发布。

数据库 (Database / Storage)

核心数据：无传统关系型数据库（遵循极简原则）。

动态状态（可选扩展）：若后期需要展示实时状态（如博客阅读量、下一个马拉松的倒计时实时状态），可引入 Vercel KV (基于 Redis) 作为轻量级键值对存储。

基础设施 (Infrastructure / CI&CD)

部署平台：Vercel。自动化 CI/CD，Push 代码到 GitHub 的 main 分支即可自动构建并发布，符合 Vibe Coding 的即时反馈要求。

2. 项目结构 (Project Structure)
代码组织将遵循 Astro 的标准约定，保持扁平化和高可读性：

Plaintext
├── public/                 # 静态资源 (Favicon, 极简头像, 项目占位图)
│   └── images/
├── src/
│   ├── components/         # 可复用的 UI 组件
│   │   ├── ui/             # 基础组件 (Button, Badge)
│   │   ├── layout/         # 布局组件 (Header, Footer, BentoGrid)
│   │   └── widgets/        # 复合组件 (ProjectCard, MarathonStats)
│   ├── content/            # MDX 内容集合 (充当数据库)
│   │   ├── projects/       # Vibe Coding 项目列表 (如 PB Calendar)
│   │   └── config.ts       # 定义数据 Schema 和类型校验
│   ├── layouts/            # 页面基础骨架 (定义全局字体、浅色背景)
│   ├── pages/              # 路由页面
│   │   ├── index.astro     # 首页 (Hero Section + 关于我)
│   │   ├── projects.astro  # 项目展示聚合页
│   │   └── [slug].astro    # 单个项目详情页 (动态路由)
│   ├── styles/             # 全局样式
│   │   └── global.css      # Tailwind 引入与自定义字体定义
│   └── utils/              # 工具函数 (日期格式化等)
├── astro.config.mjs        # Astro 核心配置 (集成 Tailwind, React, MDX)
├── tailwind.config.cjs     # 颜色、字体间距等设计规范配置
└── package.json
3. 数据模型 (Data Model)
通过 Astro Collections 和 Zod 定义严格的 Frontmatter Schema。所有数据以文件形式存储在 src/content/ 下。

3.1 项目数据模型 (Project Schema)
文件位置：src/content/projects/*.mdx

TypeScript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),                  // 项目名称 (如: "PB Calendar")
    tagline: z.string(),                // 一句话简评
    description: z.string(),            // 项目详情描述
    pubDate: z.date(),                  // 发布时间 (用于排序)
    coverImage: z.string().optional(),  // UI Mockup 图片路径
    tags: z.array(z.string()),          // 标签 (如: ["#Vibe-Coding", "#Automation"])
    repoUrl: z.string().url().optional(), // GitHub 链接
    isFeatured: z.boolean().default(false), // 是否在首页 Bento Grid 中高亮显示
  })
});
3.2 个人马拉松/状态数据 (Profile Config)
由于这些数据不经常变动，可直接提取为一个全局配置文件，方便维护。
文件位置：src/utils/profile.ts

TypeScript
export const profileData = {
  stats: {
    marathonPB: "3:00",
    halfMarathonPB: "1:24",
  },
  socials: {
    github: "https://github.com/...",
    email: "mailto:...",
  },
  quotes: [
    "在心流中构建工具，在赛道上寻找节奏。"
  ]
};
4. 关键技术点 (Key Technical Points)
4.1 动效与性能的平衡 (Astro Islands)
挑战：PRD 要求“呼吸感动效”和交互（如卡片缩放），传统的 React SPA 会导致首屏加载大量 JS，破坏“极速”体验。

解决方案：采用 Astro 的 Island 架构。页面的静态部分（如文本、排版）完全渲染为 HTML，只有包含交互动效的组件（如包裹了 Framer Motion 的 ProjectCard）才使用 <ProjectCard client:visible /> 指令，实现按需加载（Hydration）。

4.2 极简浅色主题的工程化约束
挑战：需要严格控制色彩，避免浏览器默认的暗色模式破坏极简浅色设计。

解决方案：在 tailwind.config.cjs 中配置固定的色板，禁用 Dark Mode 的自动切换。通过 CSS 变量锁定背景色 #F8F9FA 和文字色 #1A1A1A，确保在任何设备上视觉呈现的高度一致性。

4.3 响应式 Bento Grid (便当盒布局) 的实现
挑战：Bento Grid 在桌面端看起来很精致，但在移动端容易因为挤压变形或破坏信息层级。

解决方案：使用 CSS Grid (或 Tailwind 的 grid 类)。

移动端（< 768px）：强制单列布局 grid-cols-1。

桌面端：定义 grid-cols-3 或 grid-cols-4，并通过数据模型中的 isFeatured 字段控制特定卡片占据 col-span-2 或 row-span-2，实现大小错落有致的视觉节奏。

4.4 图像自动优化 (Image Optimization)
挑战：高清的 UI Mockup 或赛道照片可能导致网站加载缓慢。

解决方案：强制使用 Astro 内置的 <Image /> 组件。它会自动在构建时调整图像大小，并将其转换为下一代格式（如 WebP 或 AVIF），保证页面既有高清晰度又能秒级打开。