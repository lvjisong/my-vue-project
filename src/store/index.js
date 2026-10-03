/**
 * ============================================================
 * store/index.js —— Vuex 全局状态（Vuex 4 写法）
 * ------------------------------------------------------------
 * Vue 3 用 createStore() 创建 store 实例，替代 Vue 2 的 new Vuex.Store()。
 * 当前只有 auth 模块（user/token）+ cart 购物车模块。
 *
 * 【购物车持久化】
 *   购物车数据存在 localStorage，刷新页面不丢失。
 *   - 初始化时从 localStorage 读回来
 *   - 每次改购物车自动同步到 localStorage
 *   - 想清掉：浏览器控制台 localStorage.removeItem("cart_items")
 * ============================================================
 */
import { createStore } from "vuex";
// axios：当前 fetchUser/logout 还是 mock 实现，没真正发请求。
// 这行 import 故意留着（eslint-disable 压 unused 警告），接后端后直接在
// actions 里 await axios.get('/api/user/me') 即可，不用再补 import。
// eslint-disable-next-line no-unused-vars
import axios from "axios";

// localStorage 里购物车数据的 key
const CART_STORAGE_KEY = "cart_items";

/** 从 localStorage 读购物车数据（刷新页面后恢复） */
function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return []; // 解析失败就返回空数组，不要报错
  }
}

/** 把购物车数据写到 localStorage */
function saveCartToStorage(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export default createStore({
  state: {
    /** 当前登录用户，未登录为 null */
    user: null,
    /** token（一般由后端通过 Cookie 下发，这里仅做内存缓存，避免每次读 Cookie） */
    token: "",
    /**
     * 购物车数据（Vuex 传参示例）
     * 为什么放 Vuex 而不是路由传？
     *   - 商品是对象（id/name/price/图片），路由 query 只能传字符串
     *   - 购物车要在多个页面共享（商品页加，购物袋页看）
     *
     * 持久化：初始化时从 localStorage 读，刷新页面不丢
     */
    cart: {
      items: loadCartFromStorage(), // 购物车商品列表，每个元素是 { id, name, price }
    },
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    RESET_AUTH(state) {
      state.user = null;
      state.token = "";
    },

    // ======== 购物车相关 mutations ========
    /**
     * 加商品到购物车
     * @param {object} product 商品对象 { id, name, price }
     */
    CART_ADD_ITEM(state, product) {
      state.cart.items.push(product);
      // 改完立刻同步到 localStorage，刷新不丢
      saveCartToStorage(state.cart.items);
    },
    /** 清空购物车 */
    CART_CLEAR(state) {
      state.cart.items = [];
      // 同步清掉 localStorage
      localStorage.removeItem(CART_STORAGE_KEY);
    },
  },

  actions: {
    /**
     * 拉取当前登录用户信息
     *
     * TODO-AUTH-FETCHUSER: 【接后端前】现在这样：
     *   async fetchUser({ commit }) {
     *     console.log('fetchUser action called, but no backend API is connected.')
     *   },
     *
     * TODO-AUTH-FETCHUSER: 【接后端后】替换为：
     *   async fetchUser({ commit }) {
     *     try {
     *       const { data } = await axios.get('/api/user/me')
     *       commit('SET_USER', data)
     *     } catch (e) {
     *       commit('RESET_AUTH')
     *       throw e
     *     }
     *   },
     */
    async fetchUser() {
      // TODO: 接后端后替换为真实 API 调用
    },

    /**
     * 退出登录
     *
     * TODO-AUTH-LOGOUT: 【接后端前】现在这样：
     *   async logout({ commit }) { commit('RESET_AUTH') },
     *
     * TODO-AUTH-LOGOUT: 【接后端后】替换为：
     *   async logout({ commit }) {
     *     try { await axios.post('/api/logout') }
     *     finally { commit('RESET_AUTH') }
     *   },
     */
    async logout({ commit }) {
      commit("RESET_AUTH");
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.user || !!state.token,
    /** 购物车商品总数（页角标显示用） */
    cartCount: (state) => state.cart.items.length,
  },
});
