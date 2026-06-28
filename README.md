# CF Server Monitor Theme

基于 Vue 3 + Vite 的终端风格服务器监控面板。支持实时 WebSocket 更新、多区域服务器卡片、交互式图表、地图视图、明暗主题切换和国际化。

## 功能特性

- 终端风格 UI，支持明暗主题切换
- 仪表盘支持卡片、表格、地图三种视图
- WebSocket 实时服务器状态推送
- 交互式延迟与流量图表 (Chart.js)
- Leaflet 地图视图展示服务器位置
- 按国家/地区筛选，带国旗图标
- 可配置背景图和站点标题
- JWT 认证 + Turnstile 验证
- 中英文国际化

## 快速开始

```bash
npm install
npm run dev
```

打开 `https://localhost:5173`。

## 配置

应用运行时读取 `public/config.json`：

```json
{
  "apiBase": ["https://your-api.com"],
  "title": "我的服务器监控",
  "backgroundImage": "https://example.com/bg.webp"
}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| `apiBase` | `string[]` | 后端 API 地址（第一个为主地址） |
| `title` | `string` | 页面标题 |
| `backgroundImage` | `string` | 背景图片 URL |

## 构建

```bash
npm run build
```

输出目录为 `dist/`。

### 环境变量

`npm run build` 会根据环境变量自动生成 `config.json`：

```bash
API_BASE="https://api.example.com,https://api2.example.com" \
TITLE="我的监控" \
BACKGROUND_IMAGE="https://cdn.example.com/bg.webp" \
npm run build
```

| 变量 | 说明 | 示例 |
|---|---|---|
| `API_BASE` | 逗号分隔的 API 地址 | `https://a.com,https://b.com` |
| `TITLE` | 站点标题 | `服务器监控` |
| `BACKGROUND_IMAGE` | 背景图片 URL | `https://cdn.example.com/bg.webp` |

## 部署到 GitHub Pages

### 1. 启用 GitHub Pages

进入仓库 **Settings → Pages → Source**，选择 **GitHub Actions**。

### 2. 设置环境变量（可选）

进入 **Settings → Secrets and variables → Actions → Variables**，添加：

- `API_BASE` — 逗号分隔的后端地址
- `TITLE` — 站点标题
- `BACKGROUND_IMAGE` — 背景图片 URL

### 3. 推送即部署

推送到 `main` 或 `master` 分支，或在 **Actions** 页面手动触发。

工作流（`.github/workflows/deploy.yml`）会自动：
1. 安装依赖
2. 根据环境变量生成 `config.json`
3. 构建项目
4. 部署到 GitHub Pages

## 项目结构

```
├── public/
│   └── config.json          # 运行时配置（自动生成，已 gitignore）
├── src/
│   ├── components/          # Vue 组件
│   ├── composables/         # Vue 组合式函数（useTheme）
│   ├── styles/              # 样式（main.css、light.css）
│   ├── utils/               # 配置、API、国际化、HTTP、常量
│   ├── views/               # 仪表盘、服务器详情页
│   ├── router/              # Vue Router
│   ├── App.vue
│   └── main.js
├── build.js                 # 自定义构建脚本
├── vite.config.js
└── .github/workflows/deploy.yml
```

## 技术栈

- [Vue 3](https://vuejs.org/) + 组合式 API
- [Vite](https://vitejs.dev/)
- [Chart.js](https://www.chartjs.org/)
- [Leaflet](https://leafletjs.com/)
- [Vue Router](https://router.vuejs.org/)

## 许可证

MIT
