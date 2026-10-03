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
  applePay: `${APPLE}/apple-pay/`,
  applePayTransit: `${APPLE}/apple-pay/transit/`,
  music: `${APPLE}/apple-music/`,
  podcasts: `${APPLE}/apple-podcasts/`,
  appStore: `${APPLE}/app-store/`,
};

// 法律与政策
export const LEGAL = {
  privacy: `${APPLE}/legal/privacy/`,
  terms: `${APPLE}/legal/internet-services/terms/site.html`,
  main: `${APPLE}/legal/`,
  sitemap: `${APPLE}/sitemap/`,
  privacyMain: `${APPLE}/privacy/`,
};

// 关于 Apple / 公司信息
export const ABOUT = {
  business: `${APPLE}/business/`,
  education: `${APPLE}/education/`,
  accessibility: `${APPLE}/accessibility/`,
  educationInitiative: `${APPLE}/education-initiative/`,
  environment: `${APPLE}/environment/`,
  supplyChain: `${APPLE}/supply-chain/`,
  newsroom: `${APPLE}/newsroom/`,
  leadership: `${APPLE}/leadership/`,
  jobs: `${APPLE}/jobs/`,
  jobCreation: `${APPLE}/job-creation/`,
  compliance: `${APPLE}/compliance/`,
  events: `${APPLE}/apple-events/`,
  contact: `${APPLE}/contact/`,
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

// ============================================================
// 首页 Hero / Tiles 按钮链接
// ============================================================
export const HOME_LINKS = {
  // ===== Hero =====
  iphone18Pro: {
    learn: `${APPLE}/iphone-18-pro/`,
    buy: `${APPLE}/cn/shop/goto/buy_iphone/iphone_18_pro`,
  },
  iphoneDuo: {
    learn: `${APPLE}/iphone-duo/`,
    buy: `${APPLE}/cn/shop/goto/buy_iphone/iphone_duo`,
  },
  watchSeries12: {
    learn: `${APPLE}/apple-watch-series-12/`,
    buy: `${APPLE}/cn/shop/goto/buy_watch/apple_watch_series_12`,
  },
  // ===== Tiles =====
  watchUltra4: {
    learn: `${APPLE}/apple-watch-ultra-4/`,
    buy: `${APPLE}/cn/shop/goto/buy_watch/apple_watch_ultra_4`,
  },
  macMini: {
    learn: `${APPLE}/mac-mini/`,
    buy: `${APPLE}/cn/shop/goto/buy_mac/mac_mini`,
  },
  macbookAir: {
    learn: `${APPLE}/macbook-air/`,
    buy: `${APPLE}/cn/shop/goto/buy_mac/macbook_air`,
  },
  ipadAir: {
    learn: `${APPLE}/ipad-air/`,
    buy: `${APPLE}/cn/shop/goto/buy_ipad/ipad_air`,
  },
};

// ============================================================
// 导航栏下拉面板链接（topLink 一级导航 + linkUrl 二级 flyout）
// key 是链接文案，value 是跳转 URL。未匹配到时默认跳首页。
// ============================================================

/** 顶部一级导航：文案 -> URL */
export const NAV_TOP = {
  商店: SHOP.store,
  Mac: `${APPLE}/mac/`,
  iPad: `${APPLE}/ipad/`,
  iPhone: `${APPLE}/iphone/`,
  Watch: `${APPLE}/watch/`,
  Vision: `${APPLE}/apple-vision-pro/`,
  AirPods: `${APPLE}/airpods/`,
  家居: `${APPLE}/apple-home/`,
  娱乐: `${APPLE}/entertainment/`,
  配件: SHOP.buyAccessories,
  技术支持: SUPPORT,
};

/** 下拉面板内链接：文案 -> URL（已逐字核对 apple.com.cn 实际 DOM） */
// prettier-ignore
export const NAV_FLYOUT = {
  "选购最新产品": `${SHOP.store}`,
  "Mac": SHOP.buyMac,
  "iPhone": SHOP.buyIphone,
  "Apple Watch": SHOP.buyWatch,
  "Apple Vision Pro": SHOP.buyVision,
  "AirPods": SHOP.airpods,
  "配件": SHOP.buyAccessories,
  "查找零售店": RETAIL.main,
  "订单状态": SHOP.orderList,
  "Apple Trade In 换购计划": SHOP.tradeIn,
  "分期付款": SHOP.financing,
  "个人设置辅导": `${APPLE}/cn/shop/goto/personal_setup`,
  "认证的翻新产品": SHOP.specialDeals,
  "教育": SHOP.educationRouting,
  "商务": RETAIL.business,

  // ===== Mac =====
  "探索全部 Mac 机型": `${APPLE}/mac/`,
  "MacBook Neo": `${APPLE}/macbook-neo/`,
  "MacBook Air": `${APPLE}/macbook-air/`,
  "MacBook Pro": `${APPLE}/macbook-pro/`,
  "iMac": `${APPLE}/imac/`,
  "Mac mini": `${APPLE}/mac-mini/`,
  "Mac Studio": `${APPLE}/mac-studio/`,
  "显示器": `${APPLE}/displays/`,
  "Mac 机型比较": `${APPLE}/mac/compare/`,
  "从 PC 换成 Mac": `${APPLE}/mac/mac-does-that/`,
  "选购 Mac": SHOP.buyMac,
  "Mac 配件": `${APPLE}/cn/shop/goto/mac/accessories`,
  "Mac 支持": `${SUPPORT}/mac`,
  "AppleCare": `${APPLE}/applecare/`,
  "OS 27": `${APPLE}/os/`,
  "Apple 打造的 App": `${APPLE}/apps/`,
  "Apple 创作坊": `${APPLE}/apple-creator-studio/`,
  "配合 iPhone 更好用": `${APPLE}/macos/continuity/`,
  "iCloud+": `${APPLE}/icloud/`,
  "Mac 商务应用": `${APPLE}/business/mac/`,
  "Apple at Work": `${APPLE}/business/`,

  // ===== iPad =====
  "探索全部 iPad 机型": `${APPLE}/ipad/`,
  "iPad Pro": `${APPLE}/ipad-pro/`,
  "iPad Air": `${APPLE}/ipad-air/`,
  "iPad": `${APPLE}/ipad-11/`,
  "iPad mini": `${APPLE}/ipad-mini/`,
  "Apple Pencil": `${APPLE}/apple-pencil/`,
  "键盘": `${APPLE}/ipad-keyboards/`,
  "iPad 机型比较": `${APPLE}/ipad/compare/`,
  "选购 iPad": `${APPLE}/cn/shop/goto/buy_ipad`,
  "iPad 配件": `${APPLE}/cn/shop/goto/ipad/accessories`,
  "iPad 支持": `${SUPPORT}/ipad`,

  // ===== iPhone =====
  "探索全部 iPhone 机型": `${APPLE}/iphone/`,
  "iPhone Duo": `${APPLE}/iphone-duo/`,
  "iPhone 18 Pro": `${APPLE}/iphone-18-pro/`,
  "iPhone Air": `${APPLE}/iphone-air/`,
  "iPhone 17": `${APPLE}/iphone-17/`,
  "iPhone 17e": `${APPLE}/iphone-17e/`,
  "iPhone 16": `${APPLE}/cn/shop/goto/buy_iphone/iphone_16`,
  "iPhone 机型比较": `${APPLE}/iphone/compare/`,
  "换成 iPhone": `${APPLE}/iphone/switch/`,
  "选购 iPhone": SHOP.buyIphone,
  "iPhone 配件": `${APPLE}/cn/shop/goto/iphone/accessories`,
  "iPhone 支持": `${SUPPORT}/iphone`,
  "iPhone 隐私保护": `${APPLE}/privacy/`,
  "配合 Mac 更好用": `${APPLE}/macos/continuity/`,
  "Apple Pay": `${APPLE}/apple-pay/`,
  "Siri": `${APPLE}/siri/`,

  // ===== Watch =====
  "探索全部 Apple Watch 表款": `${APPLE}/watch/`,
  "Apple Watch Series 12": `${APPLE}/apple-watch-series-12/`,
  "Apple Watch Ultra 4": `${APPLE}/apple-watch-ultra-4/`,
  "Apple Watch SE 3": `${APPLE}/apple-watch-se-3/`,
  "Apple Watch Nike": `${APPLE}/apple-watch-nike/`,
  "Apple Watch Hermès": `${APPLE}/apple-watch-hermes/`,
  "Apple Watch 表款比较": `${APPLE}/watch/compare/`,
  "Apple Watch 哪里好": `${APPLE}/watch/why-apple-watch/`,
  "选购 Apple Watch": SHOP.buyWatch,
  "Apple Watch 表带": `${APPLE}/cn/shop/goto/watch/bands`,
  "Apple Watch 配件": `${APPLE}/cn/shop/goto/watch/accessories`,
  "Apple Watch 支持": `${SUPPORT}/watch`,

  // ===== Vision =====
  "探索 Apple Vision Pro": `${APPLE}/apple-vision-pro/`,
  "技术规格": `${APPLE}/apple-vision-pro/specs/`,
  "选购 Apple Vision Pro": SHOP.buyVision,
  "Apple Vision Pro 配件": `${APPLE}/cn/shop/goto/vision/accessories`,
  "预约演示试用": `${APPLE}/retail/instore-shopping-session/session-selection/?topic=visionpro`,
  "Apple Vision Pro 支持": `${SUPPORT}/apple-vision-pro`,

  // ===== AirPods =====
  "探索全部 AirPods 机型": `${APPLE}/airpods/`,
  "AirPods 5": `${APPLE}/airpods-5/`,
  "AirPods Pro 3": `${APPLE}/airpods-pro/`,
  "AirPods Max 2": `${APPLE}/airpods-max/`,
  "AirPods 机型比较": `${APPLE}/airpods/compare/`,
  "选购 AirPods 5": `${APPLE}/cn/shop/goto/buy_airpods/airpods_5`,
  "选购 AirPods Pro 3": `${APPLE}/cn/shop/goto/buy_airpods/airpods_pro_3`,
  "选购 AirPods Max 2": `${APPLE}/cn/shop/goto/buy_airpods/airpods_max_2`,
  "AirPods 配件": SHOP.airpods,
  "AirPods 支持": `${SUPPORT}/airpods`,
  "Apple Music": `${APPLE}/apple-music/`,

  // ===== 家居 =====
  "探索家居项目": `${APPLE}/apple-home/`,
  "HomePod": `${APPLE}/homepod-2nd-generation/`,
  "HomePod mini": `${APPLE}/homepod-mini/`,
  "选购 HomePod": `${APPLE}/cn/shop/goto/buy_homepod/homepod`,
  "选购 HomePod mini": `${APPLE}/cn/shop/goto/buy_homepod/homepod_mini`,
  "家居配件": `${APPLE}/cn/shop/goto/accessories/homekit`,
  "HomePod 支持": `${SUPPORT}/homepod`,
  "家庭 App": `${APPLE}/home-app/`,
  "隔空播放": `${APPLE}/airplay/`,

  // ===== 娱乐 =====
  "探索娱乐内容": `${APPLE}/services/`,
  "Apple 播客": `${APPLE}/apple-podcasts/`,
  "App Store": `${APPLE}/app-store/`,
  "Apple Music 支持": `${SUPPORT}/music`,

  // ===== 配件 =====
  "选购所有配件": SHOP.buyAccessories,
  "来自 Apple 的配件": `${APPLE}/cn/shop/goto/accessories/all_accessories/made_by_apple`,
  "Beats": `${APPLE}/cn/shop/goto/accessories/all_accessories/beats_featured`,
  "AirTag": `${APPLE}/airtag/`,

  // ===== 技术支持 =====
  "Music": `${SUPPORT}/music`,
  "探索各类技术支持": SUPPORT,
  "社区": DISCUSSIONS,
  "查看保修服务": CHECK_COVERAGE,
  "Genius Bar 天才吧": RETAIL.geniusBar,
  "维修": `${SUPPORT}/repair`,
  "获取 AppleCare": `${APPLE}/applecare/`,
  "Apple 账户和密码": `${SUPPORT}/apple-account`,
  "账单和订阅": `${SUPPORT}/billing`,
  "无障碍使用": `${SUPPORT}/accessibility`,
};
