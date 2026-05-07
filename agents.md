# AI Agent 指令与项目上下文 (agents.md)

你好，AI 助手。当你协助我进行代码编写、重构或生成新功能时，请务必严格遵循以下项目规范与上下文设定。

## 1. 项目概述 (Project Overview)
本项目是一个极简主义的个人品牌网站，旨在展示我的双重身份：“Vibe Coder（感性编程者/AI自动化实践者）”与“硬核马拉松跑者（全马 PB 3:00，半马 PB 1:24）”。
* **核心基调**：极简、心流、呼吸感、留白、专注。
* **技术栈**：Astro (核心框架) + React (按需交互) + Tailwind CSS (样式) + Framer Motion (动效) + MDX (内容管理)。
* **部署环境**：Vercel。

## 2. 开发规范 (Development Guidelines)
### 2.1 架构与文件约定
* **Astro 优先**：默认使用 `.astro` 文件处理纯静态 UI 和数据抓取。只有当需要复杂的客户端状态或物理级动效（Framer Motion）时，才使用 React (`.tsx`) 并结合 Astro Islands 架构（如 `client:visible` 或 `client:load`）进行按需水合。
* **内容驱动**：所有项目数据、日志均通过 `src/content/` 下的 `.mdx` 文件管理。必须使用 Astro Content Collections 和 Zod 进行严格的 Frontmatter 类型校验。
* **组件化**：遵循原子设计理念。所有 UI 组件库放置于 `src/components/ui/`，复合型业务组件放置于 `src/components/widgets/`。

### 2.2 样式与 UI 规范
* **纯净浅色模式 (Light Mode Only)**：本项目**禁用**暗色模式。所有背景色限制在 `#F8F9FA` (极简灰白) 或 `#FFFFFF`。主文本颜色使用 `#1A1A1A`。
* **Tailwind 规范**：优先使用 Tailwind Utility Classes。禁止写行内样式 (Inline Style)。
* **克制的设计**：避免使用厚重的阴影（Shadows）、明显的边框（Borders）或高饱和度的渐变。UI 应该看起来轻盈且具有空气感。
* **Bento Grid**：项目展示模块需使用响应式的 CSS Grid 实现便当盒布局，确保移动端自动降级为单列显示。

## 3. 测试要求 (Testing Requirements)
* **视觉回归**：每次生成 UI 代码后，确保边距（Margin/Padding）保持一致。留白（Whitespace）是本项目最重要的设计元素。
* **性能底线**：保持极致的首屏加载速度。禁止在全局引入庞大的 JS 库。所有图片必须使用 Astro 官方的 `<Image />` 组件以支持 WebP/AVIF 自动优化。
* **动效测试**：Framer Motion 动效应当是“点缀”而非“干扰”。确保滚动触发的淡入（Fade-in）效果平滑且不阻碍用户滚动或点击。

## 4. 代码风格 (Code Style)
* **极简代码 (Vibe Coding)**：不要过度工程化（Over-engineering）。用最少的代码实现目标，保持代码的直觉性与高可读性。
* **命名规范**：
    * 组件名：PascalCase (e.g., `ProjectCard.tsx`)
    * 变量/函数：camelCase (e.g., `formatDate`)
    * 样式类名：小写字母连字符 (e.g., `bento-grid-container`)
* **类型安全**：TypeScript 必须保持严格模式 (`strict: true`)。避免使用 `any`，为所有 Props 和 API 返回值定义清晰的 Interface。
* **注释风格**：注释只解释“为什么这么做 (Why)”，不解释“代码在干什么 (What)”，保持代码本身的自解释性。

## 5. 注意事项与隐私红线 (Strict Restrictions)
* **🚫 隐私隔离**：**绝对禁止**在网站文案、注释或模拟数据中提及任何与企业级后端架构、数据备份、存储系统（如 NetBackup, Cohesity）、服务器运维相关的词汇。
* **身份锚点**：文案生成应始终围绕“自动化构建”、“AI 协作”、“长跑意志力”、“节奏与心流”展开。
* **避免冗余交互**：不需要复杂的表单提交或用户登录系统。联系方式仅提供静态链接（如 GitHub、Email `mailto:` 链接）。