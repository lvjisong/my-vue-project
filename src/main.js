/**
 * ============================================================
 * 应用入口 main.js（Vue 3 写法）
 * ------------------------------------------------------------
 * Vue 3 用 createApp 创建应用实例，替代 Vue 2 的 new Vue()。
 * 每个 app 实例独立，不再共享全局 Vue 对象。
 * ============================================================
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

// Element Plus（Vue 3 版组件库，替代 Element UI）
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 全局样式入口（reset + 变量 + mixins）
import "@/styles/main.scss";
// 主题变量（跟随系统深浅色，组件里用 var(--xxx) 引用）
import "@/styles/theme.scss";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus);

app.mount("#app");
