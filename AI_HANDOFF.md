# AI_HANDOFF.md

这是一份写给后续 AI 编程代理的项目交接文档。请在改动代码前先阅读本文件，再结合 `README.md`、`types/site.ts`、`lib/site-data.ts` 和 `components/admin/AdminDashboard.tsx` 理解整体结构。

## 项目身份

项目名：`EduLab CMS Starter`

定位：一个面向实验室、科研团队、教育技术团队和学术项目的开源官网 Starter。它不是单纯静态页面，而是一个“前台展示 + 本地 JSON 内容 + 轻量后台 CMS”的完整框架。

当前内容已经被清理为模拟数据。不要把仓库中的人物、新闻、成果、联系方式或图片理解为真实信息。

## 技术栈

- Next.js 16 App Router
- React 19
- TypeScript
- 本地 JSON 内容文件：`content/site-content.json`
- API Route 后台接口：`app/api/admin/*`
- 图片存储：`public/uploads/`

## 核心文件

- `content/site-content.json`：站点主数据源。前台页面和后台编辑器都围绕这个文件工作。
- `types/site.ts`：站点内容结构的 TypeScript 类型定义。
- `lib/site-data.ts`：读取、写入、归档、成员 slug 处理和默认数据加载逻辑。
- `lib/auth.ts`：后台登录和 cookie session 逻辑。
- `components/admin/AdminDashboard.tsx`：后台编辑器主组件，文件较大，改动前要先定位具体模块。
- `components/site/*`：前台展示组件。
- `public/uploads/demo/`：AI 生成的真实风格演示图片。

## 数据流

1. 前台页面通过 `readSiteData()` 读取 `content/site-content.json`。
2. 后台页面读取同一份数据并在浏览器中编辑。
3. 保存时，后台向 `/api/admin/content` 提交完整站点数据。
4. `/api/admin/content` 会规范化成员 slug、同步新闻归档，然后写回 JSON 文件。
5. 图片上传走 `/api/admin/upload`，文件写入 `public/uploads/<folder>/`，页面内容中保存 `/uploads/...` 路径。
6. 新闻归档逻辑会把超过 `settings.newsArchiveMonths` 的新闻移动到 `news.archivedItems`，但会保留至少 `settings.minimumNewsItems` 条当前新闻。

## 必须保留的约束

- 保留后台可编辑能力。用户非常在意“设计和内容可以通过后台方便修改”。
- 不要在没有明确需求时引入数据库。当前项目特色是文件驱动、容易理解、便于 Git 管理。
- 不要重新引入真实人物、真实高校、真实论文或私有图像。当前仓库应保持开源模板状态。
- 不要提交 `node_modules/`、`.next/`、日志、真实 `.env`、临时截图或本地路径。
- README 默认用中文维护，除非用户明确要求多语言文档。
- 图片路径必须指向项目内的 `public/uploads/...` 或远程可公开访问资源。
- 后续如做三语言切换，优先设计清晰的数据结构，不要只在组件里硬编码三套字符串。

## 已知注意点

- 当前没有数据库，生产环境需要可写文件系统才能通过后台保存 JSON 和上传图片。
- 部署生产环境必须设置 `LAB_ADMIN_PASSWORD` 和 `LAB_SESSION_SECRET`。
- `services` 数据结构存在于 `types/site.ts` 和内容文件中，但当前默认路由没有 `app/services/page.tsx`。
- `components/admin/AdminDashboard.tsx` 体量较大，适合后续拆分为多个编辑区组件。
- 当前演示图片由 AI 生成，仅用于模板预览。真实项目上线前应替换为真实授权图片。
- 当前内容是单语言内容结构，UI 标签集中在 `lib/ui-labels.ts`。如果用户要中英日或其他三语言切换，需要扩展内容 schema。

## 建议验证命令

```powershell
npm.cmd install
npm.cmd run typecheck
npm.cmd run build
```

完成验证后，如果要保持仓库干净，可以删除：

```text
node_modules/
.next/
tsconfig.tsbuildinfo
```

这些文件已经在 `.gitignore` 中。

## 推荐后续任务

- 为 `content/site-content.json` 增加运行时 schema 校验。
- 将 `AdminDashboard.tsx` 拆分为更小的编辑组件。
- 设计真正的多语言数据结构，例如 `zh`、`en`、`ja` 或用户指定的第三语言。
- 增加 `app/services/page.tsx`，让已有 services 数据真正可访问。
- 添加 GitHub Actions，自动运行 typecheck 和 build。
- 当前仓库已经包含 GPL-3.0 `LICENSE`。如果用户要更换许可，记得同步更新 `LICENSE` 和 `package.json`。

## 给下一个 AI 的起始提示

建议用户这样交代后续 AI：

```text
请先阅读 README.md、AI_HANDOFF.md、types/site.ts、lib/site-data.ts 和 components/admin/AdminDashboard.tsx，再继续修改这个项目。请保留本地 JSON 驱动和后台可编辑能力，不要引入真实数据，也不要提交构建产物或本地临时文件。
```
