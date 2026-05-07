# EduLab CMS Starter

一个内容驱动的实验室官网与轻量 CMS Starter，适合教育技术、学习分析、AI 教育、科研团队、课题组和学术项目快速搭建公开展示网站。

本项目的特色不是只做一个静态页面，而是保留了“前台展示 + 后台内容管理 + 本地 JSON 数据”的完整框架。你可以先把它当作设计原型，也可以继续扩展成真实团队官网。

## 项目特色

- 基于 Next.js App Router、React 和 TypeScript。
- 内容集中存放在 `content/site-content.json`，便于版本管理。
- 内置轻量后台 `/admin`，可修改站点设置、导航、首页、新闻、成员、研究内容、出版物、招募和联系方式。
- 支持本地图片上传，文件保存到 `public/uploads/`。
- 新闻支持自动归档，归档数据仍可通过页面访问。
- 当前数据已经清理为模拟内容，不包含真实人物、真实机构、真实论文或私有图片。
- `public/uploads/demo/` 中提供 AI 生成的真实风格演示图片，方便作为开源模板预览。

## Vibe Coding 说明

本项目是通过 vibe coding 方式迭代整理出来的：先根据视觉参考、内容结构和实际反馈快速搭建，再由 AI 编程代理持续清理数据、修正布局、补充文档并准备开源发布。

这意味着它很适合作为二次开发起点，但在用于正式生产环境前，建议你重新检查数据结构、安全配置、部署方式和许可协议。

## 快速开始

在项目根目录执行：

```powershell
npm.cmd install
npm.cmd run dev
```

打开：

```text
http://localhost:3000
```

后台入口：

```text
http://localhost:3000/admin/login
```

开发环境下，如果没有设置 `LAB_ADMIN_PASSWORD`，默认后台密码是：

```text
lab-admin
```

## 环境变量

复制示例环境变量文件：

```powershell
Copy-Item .env.example .env.local
```

生产环境请明确设置：

```text
LAB_ADMIN_PASSWORD=your-password
LAB_SESSION_SECRET=your-session-secret
```

不要在公开仓库中提交 `.env.local` 或真实密钥。

## 常用命令

```powershell
npm.cmd run dev        # 本地开发
npm.cmd run typecheck  # TypeScript 检查
npm.cmd run build      # 生产构建
npm.cmd run start      # 启动生产构建
```

## 目录说明

```text
app/                       Next.js 页面和 API 路由
components/site/            前台展示组件
components/admin/           后台内容编辑器
content/site-content.json   站点主内容数据
lib/                       数据读写、鉴权、格式化等工具
public/uploads/demo/        AI 生成的演示图片
types/site.ts               内容数据类型定义
AI_HANDOFF.md               写给下一个 AI 编程代理的交接文档
```

## 后续开发建议

如果你准备用 Claude Code、Codex 或其他 AI 编程代理继续开发，建议先让它阅读：

```text
README.md
AI_HANDOFF.md
types/site.ts
lib/site-data.ts
components/admin/AdminDashboard.tsx
```

其中 `AI_HANDOFF.md` 是专门写给后续 AI 的交接文档，说明了项目架构、数据流、后台机制、保留约束和适合继续推进的方向。

## 内容替换

主要内容文件：

```text
content/site-content.json
```

上传图片目录：

```text
public/uploads/
```

你可以通过后台修改内容，也可以直接编辑 JSON 文件。正式使用时，请替换所有模拟数据、演示图片、联系方式和页面文案。

## 开源许可

本仓库当前包含 `LICENSE` 文件，使用 GPL-3.0 许可。后续如果你希望改用 MIT、Apache-2.0 或其他协议，请在正式协作前统一调整 `LICENSE` 与 `package.json` 中的许可字段。
