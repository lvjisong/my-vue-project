/**
 * ============================================================
 * src/constants/urls.js —— Apple 官网外链常量统一管理
 * ------------------------------------------------------------
 * 所有指向 apple.com.cn 的外链集中在这里，改域名/路径只改这一处。
 * 组件里 import 后用模板字符串拼接，不要在 DOM 里写死完整 URL。
 * ============================================================
 */

// 主站域名
export const APPLE = "https://www.apple.com.cn";
// 支持站
export const SUPPORT = "https://support.apple.com/zh-cn";
// 账户站（单独域名）
export const APPLE_ACCOUNT = "https://account.apple.com/cn/";
// iCloud
export const ICLOUD = "https://www.icloud.com/";
// iCloud 优惠活动页
export const ICLOUD_OFFER = "https://offers.icloud.apple/cn-offer";
// App Store
export const APP_STORE = "https://www.apple.com.cn/app-store/";
// Apple 社区讨论
export const DISCUSSIONS = "https://discussionschinese.apple.com/welcome";
// 保修查询
export const CHECK_COVERAGE = "https://checkcoverage.apple.com/cn/zh";
// Apple Store App（App Store 链接）
export const APP_STORE_APP = "https://apps.apple.com/cn/app/apple-store/id375380948";

// 商店快捷入口（/cn/shop/goto/xxx）
export const SHOP = {
  store: `${APPLE}/cn/shop/goto/store`,
  buyMac: `${APPLE}/cn/shop/goto/buy_mac`,
  buyIphone: `${APPLE}/cn/shop/goto/buy_iphone`,
  buyWatch: `${APPLE}/cn/shop/goto/buy_watch`,
  buyVision: `${APPLE}/cn/shop/goto/buy_vision`,
  airpods: `${APPLE}/cn/shop/goto/airpods/accessories`,
  buyAccessories: `${APPLE}/cn/shop/goto/buy_accessories`,
  giftCards: `${APPLE}/cn/shop/goto/giftcards`,
  account: `${APPLE}/cn/shop/goto/account`,
  orderList: `${APPLE}/cn/shop/goto/order/list`,
  specialDeals: `${APPLE}/cn/shop/goto/special_deals`,
  tradeIn: `${APPLE}/cn/shop/goto/trade_in`,
  financing: `${APPLE}/cn/shop/goto/ww/financing`,
  help: `${APPLE}/cn/shop/goto/help`,
  educationRouting: `${APPLE}/cn/shop/goto/educationrouting`,
  salesRefunds: `${APPLE}/cn/shop/goto/help/sales_refunds`,
};

// 产品页（/mac/、/iphone/ 等）
export const PRODUCT = {
  mac: `${APPLE}/mac/`,
  ipad: `${APPLE}/ipad/`,
  iphone: `${APPLE}/iphone/`,
  watch: `${APPLE}/watch/`,
  vision: `${APPLE}/apple-vision-pro/`,
  airpods: `${APPLE}/airpods/`,
  home: `${APPLE}/apple-home/`,
  airtag: `${APPLE}/airtag/`,
};

// 零售店
export const RETAIL = {
  main: `${APPLE}/retail/`,
  geniusBar: `${APPLE}/retail/geniusbar/`,
  today: `${APPLE}/today/`,
  groups: `${APPLE}/today/groups/`,
  camp: `${APPLE}/today/camp/`,
  business: `${APPLE}/retail/business/`,
};

// 购物袋登录相关（secure8 带 ssi token，直接从 apple.com.cn 抓取）
export const CART_LINKS = {
  /** 购物袋面板"登录"主链接 */
  signIn:
    "https://secure8.www.apple.com.cn/shop/signIn?ssi=4AAABoQG73tUBIBmGXTMK5Q6yQ2mAYX9IMGqUGU5SSFf7GKjmyy1eUY3ZAAAAHGh0dHBzOi8vd3d3LmFwcGxlLmNvbS5jbi98fHwAAgEjLnSNMilLOoDhP2AYl0EBboujTCt3Bqr0VWHvfONqUg",
  /** 订单列表 */
  orderList: `${APPLE}/shop/order/list`,
  /** 你的收藏 */
  favorites:
    "https://secure8.www.apple.com.cn/shop/signIn?ssi=4AAABoQHOZaQBIN96jEzWUZEr_RzGMuffiK8sU2DJ-JXJJVyVM2kh2T87AAAAKmh0dHBzOi8vd3d3LmFwcGxlLmNvbS5jbi9zaG9wL3lvdXJzYXZlc3x8fAACAeCls5MyRoEw2dHLnX97I4UzENJd72cacqEGrXCZxKDH",
  /** 账户 */
  account:
    "https://secure8.www.apple.com.cn/shop/signIn/account?ssi=4AAABoQHisYQBIGHNMRJcFFdMu1pQoN8KMkiqmrLqnBkltFIY_si-RoojAAAANWh0dHBzOi8vc2VjdXJlOC53d3cuYXBwbGUuY29tLmNuL3Nob3AvYWNjb3VudC9ob21lfHx8AAIBGU4nFlL6xZHuxcz41vidacTJ3RSGx--ldniK5EpN8KQ",
  /** 登录（底部） */
  login:
    "https://secure8.www.apple.com.cn/shop/signIn?ssi=4AAABoQHvKysBIEKdifhoZ7BtnnwE7nl-PymU5DxW-x0J-z57ZeIOZofTAAAAHGh0dHBzOi8vd3d3LmFwcGxlLmNvbS5jbi98fHwAAgET9eEDpww213uGnDVIs_VaTJSHN_taHhd5cZynf7hPcA",
};
