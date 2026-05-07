# 项目说明

这是一个基于 **Astro + React Islands + Tailwind + Framer Motion + MDX** 的极简个人品牌网站，用来展示：

- Vibe Coding（AI 协作与自动化构建）
- 马拉松长期主义（全马 PB 3:00，半马 PB 1:24）

## 技术栈

- Astro（主框架）
- React（仅用于需要交互的 Islands 组件）
- Tailwind CSS（样式）
- Framer Motion（轻量动效）
- MDX + Astro Content Collections（内容管理）

## 快速开始

```bash
npm install
npm run dev
```

打开：`http://localhost:4321`

## 构建

```bash
npm run build
npm run preview
```

## 视觉回归测试

首次执行（生成基线截图）：

```bash
npx playwright install chromium
npm run test:visual:update
```

日常对比检查：

```bash
npm run test:visual
```

说明：

- 截图覆盖首页、项目列表页、项目详情页
- 详情页路径由测试动态从项目列表自动获取
- 同时检查桌面端与移动端布局
- 额外覆盖首页 Hero 与 Project Log（Bento）关键区域截图
- 基线截图目录：`tests/visual/__screenshots__/`

## 目录结构

```text
.
├── public/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── widgets/
│   ├── content/
│   │   └── projects/
│   ├── content.config.ts
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── docs/
│   └── decision-log.md
├── astro.config.mjs
├── tailwind.config.cjs
└── package.json
```

## 内容维护

- 项目内容：`src/content/projects/*.mdx`
- 数据结构校验：`src/content.config.ts`

新增一个项目时，只需要创建一个新的 `.mdx` 文件并填写 Frontmatter。

## 当前已实现

- 首页/项目页/项目详情页静态生成
- 响应式 Bento Grid（移动端单列，桌面端多列）
- React Islands 动效：
  - 项目卡片 hover 轻动效
  - 区块滚动淡入（`MotionReveal`）
- 移动端底部极简导航（`MobileDock`）
