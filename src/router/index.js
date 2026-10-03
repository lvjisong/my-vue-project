/**
 * ============================================================
 * 路由配置 + 全局守卫
 * ------------------------------------------------------------
 * 新增页面流程：
 *   1. 在 src/views/ 新建 Xxx.vue
 *   2. 在下面 routes 数组里加一条，懒加载写法：component: () => import('@/views/Xxx.vue')
 *   3. 需要登录才能访问的路由，meta 里加 requireAuth: true
 * ============================================================
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // () => import() 是路由级代码分包，进入该页才下载对应 JS
    component: () => import('@/components/apple-home/AppleHome.vue'),
    meta: { title: 'Apple (中国大陆) - 官方网站', requireAuth: false }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue'),
    // requireAuth: true —— 访问前会检查 localStorage 里的 token
    meta: { title: '购物袋 - Apple', requireAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', requireAuth: false }
  },
  // 404 兜底
  { path: '*', component: () => import('@/views/NotFound.vue'), meta: { title: '页面未找到' } }
]

const router = new VueRouter({
  mode: 'history',          // 干净的 URL，无 #；需要 Nginx try_files 配合（见 deploy/nginx.conf.example）
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 切换路由后回到顶部；浏览器前进后退时保留原滚动位置
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  }
})

// ===== 全局前置守卫：每次跳转前执行 =====
router.beforeEach((to, from, next) => {
  // 1. 动态设置浏览器标签标题
  if (to.meta.title) document.title = to.meta.title

  // 2. 登录鉴权：requireAuth 的页面必须有 token
  //    TODO-AUTH 改成你项目实际的登录态读取方式（Vuex / Pinia / Cookie）
  const token = localStorage.getItem('token')
  if (to.meta.requireAuth && !token) {
    // 未登录 -> 跳登录页，把目标地址带过去，登录成功后跳回
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }
  next()
})

// ===== 全局后置钩子：跳转完成后执行，可埋点 =====
router.afterEach(() => {
  // 例：在这里上报页面浏览量
})

export default router
