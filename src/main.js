/**
 * ============================================================
 * 应用入口 main.js
 * ------------------------------------------------------------
 * 这里做三件事：引入插件、挂全局样式、new Vue 启动。
 * ============================================================
 */
import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

// Element UI 组件库（全量引入；如需进一步减小体积可改为按需 import）
// 样式由 babel-plugin-component 按使用情况自动注入，不再全量引入 css
import ElementUI from "element-ui";
Vue.use(ElementUI);

// 全局样式入口（reset + 变量 + mixins）
import "@/styles/main.scss";
// 主题变量（跟随系统深浅色，组件里用 var(--xxx) 引用）
import "@/styles/theme.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
