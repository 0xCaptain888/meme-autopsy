# 🧬 Meme Autopsy — Meme 验尸官

> 每一个 Meme 都值得一份死亡报告。

**Meme Autopsy** 是一个 Meme 币分析工具，像"法医验尸"一样解剖每一个 Meme 项目的生与死，帮助投资者从失败中学习、在混乱中找到真相。

## 🌐 在线体验

👉 [https://meme-soul-search.lovable.app](https://meme-soul-search.lovable.app)

## ✨ 核心功能

- **🔬 Meme 验尸报告** — 输入合约地址，生成完整的项目"尸检报告"
- **📋 案例归档** — 浏览历史经典案例，从过去的 Meme 死亡中学习
- **🧠 核心论点分析** — 多维度分析项目的死因与教训
- **🌍 中英双语** — 支持中文和英文界面切换

## 🛠 技术栈

- **前端**: React 18 + TypeScript + Vite
- **样式**: Tailwind CSS + shadcn/ui
- **动画**: Framer Motion
- **路由**: React Router
- **状态管理**: TanStack React Query

## 🚀 本地开发

```bash
# 克隆仓库
git clone https://github.com/0xCaptain888/meme-autopsy.git
cd meme-autopsy

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 📁 项目结构

```
src/
├── components/       # UI 组件
│   ├── ui/          # shadcn/ui 基础组件
│   ├── Hero.tsx     # 首页 Hero 区域
│   ├── CaseIntakePanel.tsx    # 案例输入面板
│   ├── AutopsyReportView.tsx  # 验尸报告视图
│   ├── ArchivedCaseFiles.tsx  # 归档案例
│   └── ThesisBlock.tsx        # 论点模块
├── data/            # 示例数据
├── lib/             # 工具函数与类型定义
├── pages/           # 页面组件
└── hooks/           # 自定义 Hooks
```

## 📜 License

MIT

---

Built with ❤️ by [0xCaptain888](https://github.com/0xCaptain888)
