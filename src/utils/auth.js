/**
 * ============================================================
 * auth.js —— 登录态读写（Cookie + Vuex 双写）
 * ------------------------------------------------------------
 * 设计：
 *   - token 存在 Cookie（后续可改 HTTP-only，由后端 Set-Cookie 下发）
 *   - user 信息存在 Vuex（内存），刷新时通过 fetchUser() 重新拉
 *   - 组件和路由守卫统一走本文件，不直接碰 Cookie / Vuex
 *
 * 后续接后端时：
 *   - 登录成功：调 setToken()，再调 store.dispatch('fetchUser')
 *   - 401 响应拦截器：调 logout() 清状态
 * ============================================================
 */
import store from "@/store";

const TOKEN_KEY = "app_token";
// TODO-AUTH-REFRESH: 如果后端支持 refresh_token，把下面这个 key 改成后端实际下发的字段名
const REFRESH_TOKEN_KEY = "app_refresh_token";

// ---- Cookie 小工具（无依赖）----
function setCookie(name, value, days = 7) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}
function getCookie(name) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}
function delCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

export default {
  /** 读 token（Cookie 优先，Vuex 兜底） */
  getToken() {
    return getCookie(TOKEN_KEY) || store.state.token;
  },

  /**
   * 登录成功后调用
   * @param {string} token 后端返回的 token
   * @param {object} user  可选，直接塞用户信息（一般留空，走 fetchUser）
   */
  setToken(token, user = null) {
    setCookie(TOKEN_KEY, token);
    store.commit("SET_TOKEN", token);
    if (user) store.commit("SET_USER", user);
  },

  /** 读当前用户（Vuex） */
  getUser() {
    return store.state.user;
  },

  /** 是否已登录 */
  isLoggedIn() {
    return !!this.getToken();
  },

  /** 退出登录：清 Cookie + Vuex */
  logout() {
    delCookie(TOKEN_KEY);
    delCookie(REFRESH_TOKEN_KEY);
    store.dispatch("logout");
  },

  /**
   * 读取刷新 token（axios 401 自动续期用）
   * TODO-AUTH-REFRESH: 后端支持 refresh_token 后无需改这里；
   *   request.js 会自动调本方法。如果后端不支持 refresh_token，保持返回 '' 即可。
   */
  getRefreshToken() {
    return getCookie(REFRESH_TOKEN_KEY);
  },

  /** 写入刷新 token（登录成功 / 刷新接口返回时调） */
  setRefreshToken(token) {
    setCookie(REFRESH_TOKEN_KEY, token);
  },

  /** 刷新用户信息（启动时调一次） */
  fetchUser() {
    return store.dispatch("fetchUser");
  },
};
