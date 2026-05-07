# 技术决策记录

## 2026-05-07 初始化阶段

### 决策 1：Astro 作为主渲染框架
- 原因：内容型网站首屏性能优先，静态输出能减少脚本体积。
- 结果：页面默认使用 `.astro`，只在交互区域使用 React Islands。

### 决策 2：内容通过 MDX + Content Collections 管理
- 原因：项目日志变更频繁，文件即内容最直观，且有 schema 校验避免脏数据。
- 结果：`src/content/projects/*.mdx` + `src/content.config.ts`。

### 决策 3：轻量动效只放在项目卡片
- 原因：需要“呼吸感”但不能干扰滚动与点击。
- 结果：用 `framer-motion` 做卡片 hover 轻动效，范围受控。

### 决策 4：强制浅色主题
- 原因：视觉基调明确，避免设备自动深色模式破坏留白。
- 结果：全局固定 `#F8F9FA / #FFFFFF / #1A1A1A` 并设置 `color-scheme: light`。

### 决策 5：动效采用“局部 Islands + 渐进加载”
- 原因：需要呼吸感动效，但不希望全站引入客户端状态和脚本负担。
- 结果：只对关键区块接入 `MotionReveal`（`client:visible`），其余保持纯 Astro 静态渲染。

### 决策 6：移动端导航采用底部 Dock
- 原因：移动端触达效率更高，且不引入抽屉状态管理。
- 结果：新增 `MobileDock.astro`，仅在 `md` 以下显示，桌面端继续用顶部导航。

### 决策 7：视觉回归采用 Playwright 截图对比
- 原因：本项目重点是留白和间距，文字单元测试无法覆盖视觉偏差。
- 结果：增加 `tests/visual/layout.spec.ts`，按桌面/移动双视口对核心页面做截图比对。
