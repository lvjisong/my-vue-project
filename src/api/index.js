/**
 * ============================================================
 * 统一 API 层
 * ------------------------------------------------------------
 * 所有后端接口集中在这里定义，组件里只 import 具名方法，不直接写 url。
 *
 * 环境自动切换：
 *   - 开发 npm run serve：baseURL=/api，由 vue.config.js devServer.proxy 转发
 *   - 生产 npm run build：baseURL=.env.production 里的 VUE_APP_BASE_API
 *
 * 新增接口示例：
 *   export const getProductDetail = (id) => get(`/product/${id}`)
 *   export const createOrder = (data) => post('/order/create', data)
 * ============================================================
 */
import request from '@/utils/request'

// ===== 基础请求方法（封装 axios 实例）=====

/** GET 请求，params 自动拼到 query string */
export const get = (url, params, config = {}) =>
  request.get(url, { params, ...config })

/** POST 请求，data 作为 body 发送 */
export const post = (url, data, config = {}) =>
  request.post(url, data, config)

/** PUT 请求，通常用于更新 */
export const put = (url, data, config = {}) =>
  request.put(url, data, config)

/** DELETE 请求，通常用于删除 */
export const del = (url, config = {}) =>
  request.delete(url, config)

// ===== 业务接口（按需新增）=====

/** 购物车列表 */
export const getCartList = (params) => get('/cart/list', params)

/** 添加购物车 */
export const addToCart = (data) => post('/cart/add', data)

/** 更新购物车数量 */
export const updateCartItem = (data) => put('/cart/update', data)

/** 删除购物车项 */
export const removeCartItem = (id) => del(`/cart/item/${id}`)

/** 文件上传（带进度条） */
export const uploadFile = (formData, onUploadProgress) =>
  post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
    timeout: 60000,
    silentError: true // 上传错误由调用方自己提示，不弹全局 Message
  })
