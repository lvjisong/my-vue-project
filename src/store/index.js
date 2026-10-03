/**
 * ============================================================
 * store/index.js —— Vuex 全局状态（Vuex 4 写法）
 * ------------------------------------------------------------
 * Vue 3 用 createStore() 创建 store 实例，替代 Vue 2 的 new Vuex.Store()。
 * 当前只有 auth 模块（user/token）。后续加购物车、主题等再拆 modules。
 * ============================================================
 */
import { createStore } from "vuex";
// axios：当前 fetchUser/logout 还是 mock 实现，没真正发请求。
// 这行 import 故意留着（eslint-disable 压 unused 警告），接后端后直接在
// actions 里 await axios.get('/api/user/me') 即可，不用再补 import。
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default createStore({
  state: {
    /** 当前登录用户，未登录为 null */
    user: null,
    /** token（一般由后端通过 Cookie 下发，这里仅做内存缓存，避免每次读 Cookie） */
    token: "",
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
      console.log("fetchUser action called, but no backend API is connected.");
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
  },
});
