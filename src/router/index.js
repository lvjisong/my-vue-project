/**
 * ============================================================
 * 路由配置 + 全局守卫（Vue Router 4 写法）
 * ------------------------------------------------------------
 * Vue 3 用 createRouter() + createWebHistory() 替代 new VueRouter()。
 *
 * 新增页面流程：
 *   1. 在 src/views/ 新建 Xxx.vue
 *   2. 在下面 routes 数组里加一条，懒加载写法：component: () => import('@/views/Xxx.vue')
 *   3. 需要登录才能访问的路由，meta 里加 requireAuth: true
 *   4. meta 里加 title / description / ogTitle，守卫会自动更新到页面 meta 标签
 *
 * 登录态：统一走 @/utils/auth.js，不要在组件里直接读 localStorage
 * ============================================================
 */
import { createRouter, createWebHistory } from "vue-router";
import auth from "@/utils/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    // () => import() 是路由级代码分包，进入该页才下载对应 JS
    component: () => import("@/components/apple-home/AppleHome.vue"),
    meta: {
      title: "Apple (中国大陆) - 官方网站",
      description:
        "Apple 中国大陆官方网站。你可以在这里选购 iPhone、Mac、iPad、Apple Watch、Vision 及更多产品。",
      requireAuth: false,
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart.vue"),
    // requireAuth: true —— 访问前会检查登录态（见 @/utils/auth.js）
    meta: {
      title: "购物袋 - Apple",
      description: "查看你的购物袋，浏览已选产品并结账。",
      requireAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      title: "登录 - Apple",
      description: "登录你的 Apple 账户，查看订单、收藏和个人设置。",
      requireAuth: false,
    },
  },

  // ======== 路由传参示例页面 ========
  // 路径参数示例：/product/iphone-18-pro
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("@/views/Product.vue"),
    meta: {
      title: "产品详情",
      description: "产品详情页示例，演示路径参数传参。",
      requireAuth: false,
    },
  },
  // 查询参数示例：/search?q=iPhone&page=2
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search.vue"),
    meta: {
      title: "搜索",
      description: "搜索页示例，演示查询参数传参。",
      requireAuth: false,
    },
  },

  // 404 兜底（Vue Router 4 通配符写法：/:pathMatch(.*)*）
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      title: "页面未找到 - Apple",
      description: "抱歉，你访问的页面不存在。",
    },
  },
];

const router = createRouter({
  // createWebHistory 替代 mode: 'history'，需要 Nginx try_files 配合
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 切换路由后回到顶部；浏览器前进后退时保留原滚动位置
    if (savedPosition) return savedPosition;
    return { x: 0, y: 0 };
  },
});

// ===== SEO 工具函数：更新页面 meta 标签 =====
/**
 * 根据路由 meta 更新 document.title、description、og:title 等
 * 每次路由切换自动调用，让每个页面有独立的 SEO 信息
 */
function updateMeta(to) {
  // 1. 更新标题
  if (to.meta.title) document.title = to.meta.title;

  // 2. 更新 description（不存在则创建）
  if (to.meta.description) {
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute("content", to.meta.description);
  }

  // 3. 更新 og:title（Open Graph，微信/微博分享时显示）
  if (to.meta.title) {
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", to.meta.title);
  }
}

// ===== 全局前置守卫：每次跳转前执行 =====
router.beforeEach((to, from, next) => {
  // 1. 动态更新标题 + meta 标签（SEO）
  updateMeta(to);

  // 2. 登录鉴权：requireAuth 的路由必须已登录
  if (to.meta.requireAuth && !auth.isLoggedIn()) {
    // 未登录 -> 跳登录页，把目标地址带过去，登录成功后跳回
    next({ name: "Login", query: { redirect: to.fullPath } });
    return;
  }

  // 3. 已登录用户访问登录页 -> 直接跳首页（后续可按业务调整）
  if (to.name === "Login" && auth.isLoggedIn()) {
    next({ path: "/" });
    return;
  }

  next();
});

// ===== 全局后置钩子：跳转完成后执行，可埋点 =====
router.afterEach(() => {
  // 例：在这里上报页面浏览量
});

export default router;
