# my-vue-project

复刻 apple.com.cn 首页（导航 / Hero / 磁贴 / 页脚），Vue 2 + Element UI + Vuex + Vue Router。

## 启动

```bash
npm install
npm run serve        # 开发 http://localhost:8080
npm run build        # 生产打包
npm run build:report # 打包体积分析
npm run format       # Prettier 格式化 src 下所有 vue/js/scss/css
```

## 目录结构

```
src/
├── api/            # 后端接口集中定义
├── components/
│   └── apple-home/ # Apple 首页组件（Nav/Hero/TileGrid/Footer/Home）
├── router/         # 路由 + 守卫
├── store/          # Vuex（auth 模块）
├── styles/         # 全局样式 + 主题变量
├── utils/
│   ├── auth.js     # 登录态 Cookie+Vuex 封装
│   ├── request.js  # axios 封装（拦截器/401 刷新/错误提示）
│   └── spring.js
└── views/          # Cart / Login / NotFound
public/images/      # 本地图片（heroes / promos）
```

## 接后端必改（搜 TODO）

| 文件 | 改什么 |
|---|---|
| `vue.config.js` | `devServer.proxy.target` 本地后端地址 |
| `.env.production` | `VUE_APP_BASE_API` 生产 API 域名 |
| `src/views/Login.vue` | 真实登录接口 |
| `src/store/index.js` | `/api/user/me`、`/api/logout` |
| `src/api/index.js` | 真实接口路径 |

## 环境变量

- `VUE_APP_IMAGE_BASE` 图片前缀（默认 `/images`）
- `VUE_APP_SITE_URL` 官网外链域名
- `VUE_APP_BASE_API` API 前缀（开发走 proxy，生产走真实域名）

## 登录态

- token 存 Cookie（`app_token`），用户信息存 Vuex
- 路由 `meta.requireAuth: true` 拦截
- 401 自动刷新 token，失败跳登录

## 深色模式

Footer 跟随系统 `prefers-color-scheme`，颜色变量在 `src/styles/theme.scss`。
