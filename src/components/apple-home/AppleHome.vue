<template>
  <div class="apple-home">
    <!-- 顶部导航（PC 毛玻璃 + 下拉，移动端汉堡全屏菜单） -->
    <AppleNav />

    <!-- Hero 横幅（数组循环渲染） -->
    <AppleHero v-for="hero in heroes" :key="hero.title" v-bind="hero" />

    <!-- 双列磁贴 -->
    <AppleTileGrid :tiles="tiles" />

    <!-- 页脚（固定在底部） -->
    <AppleFooter />
  </div>
</template>

<script>
/**
 * AppleHome.vue —— apple.com.cn 首页复刻（组装入口）
 *
 * 页面结构（自上而下）：
 *   1. AppleNav       顶部导航（PC 毛玻璃 + 下拉，移动端汉堡全屏菜单）
 *   2. AppleHero × 3  首屏大横幅（iPhone 18 Pro / iPhone Duo / Watch S12）
 *   3. AppleTileGrid  下方双列（移动端单列）磁贴 promo 区
 *   4. AppleFooter    页脚
 *
 * 图片资源规范（严格对齐官网 CDN）：
 *   - CDN 前缀统一为 https://www.apple.com.cn
 *   - Hero 背景图 PC 端用 largetall_2x.jpg（高屏适配），移动端用 small_2x.jpg（734px 以下）
 *   - 磁贴图片 PC 端用 large_2x.jpg，移动端用 small_2x.jpg
 *   - 所有外链按钮均 target="_blank" 新窗口打开
 *
 * 维护提示：
 *   - 新增 Hero：复制一个 <AppleHero> 块，按官网 picture source 规则配 image / image-mobile
 *   - 新增磁贴：往 tiles 数组加一项，title/subtitle/theme/background/image/imageMobile/links 字段必填
 *   - 链接地址必须从官网 DOM 抓取，不要凭经验编造
 */
import AppleNav from "./AppleNav.vue";
import AppleHero from "./AppleHero.vue";
import AppleTileGrid from "./AppleTileGrid.vue";
import AppleFooter from "./AppleFooter.vue";
import { APPLE, ICLOUD_OFFER } from "@/constants/urls";

/** 官网 CDN 前缀（仅用于外链按钮跳转，不再用于图片） */
const CDN = APPLE;
/** 图片本地前缀（public/images/，由 .env 配置） */
const IMG = process.env.VUE_APP_IMAGE_BASE || "/images";

export default {
  name: "AppleHome",
  components: { AppleNav, AppleHero, AppleTileGrid, AppleFooter },
  data() {
    return {
      /**
       * Hero 横幅配置数组（按官网首页顺序）
       * 字段同 AppleHero props：title/subtitle/theme/image/imageMobile/fallbackBg/
       *   showLogo/contentPosition/infoLines/links/parallax
       */
      heroes: [
        {
          title: "iPhone 18 Pro",
          subtitle: "Pro 再超前",
          theme: "dark",
          image: `${IMG}/heroes/iphone-18-pro_largetall_2x.jpg`,
          imageMobile: `${IMG}/heroes/iphone-18-pro_small_2x.jpg`,
          fallbackBg: "#000",
          parallax: 0.15,
          links: [
            {
              text: "进一步了解",
              type: "primary",
              url: `${CDN}/iphone-18-pro/`,
            },
            {
              text: "购买",
              type: "outline",
              url: `${CDN}/cn/shop/goto/buy_iphone/iphone_18_pro`,
            },
          ],
        },
        {
          title: "iPhone Duo",
          subtitle: "Hello, hello。",
          theme: "light",
          image: `${IMG}/heroes/iphone-duo_largetall_2x.jpg`,
          imageMobile: `${IMG}/heroes/iphone-duo_small_2x.jpg`,
          fallbackBg: "#f5f5f7",
          contentPosition: "top",
          parallax: 0.12,
          infoLines: ["10 月 16 日晚 8 点接受预购", "10 月 23 日发售"],
          links: [
            { text: "进一步了解", type: "primary", url: `${CDN}/iphone-duo/` },
            {
              text: "查看价格",
              type: "outline",
              url: `${CDN}/cn/shop/goto/buy_iphone/iphone_duo`,
            },
          ],
        },
        {
          title: "WATCH SERIES 12",
          subtitle: "拥有 Apple Watch 迄今最先进的心率感测技术",
          theme: "dark",
          showLogo: true,
          contentPosition: "bottom",
          image: `${IMG}/heroes/watch-s12_largetall_2x.jpg`,
          imageMobile: `${IMG}/heroes/watch-s12_small_2x.jpg`,
          fallbackBg: "#000",
          parallax: 0.15,
          links: [
            {
              text: "进一步了解",
              type: "primary",
              url: `${CDN}/apple-watch-series-12/`,
            },
            {
              text: "购买",
              type: "outline",
              url: `${CDN}/cn/shop/goto/buy_watch/apple_watch_series_12`,
            },
          ],
        },
      ],
      /**
       * 磁贴（promo）配置数组
       * 字段说明：
       *   title       主标题文字；titleAccent 为斜体强调词（如 iPad air 中的 air）
       *   showLogo    是否在标题前显示 Apple logo
       *   subtitle    副标题文案
       *   theme       'dark' 深色底（白字）/ 'light' 浅色底（黑字）
       *   background  磁贴底色（与官网取色一致）
       *   image       PC 端背景图（large_2x.jpg）
       *   imageMobile 移动端背景图（small_2x.jpg，≤734px 切换）
       *   links       按钮数组：text 文案 / type 'primary' 蓝底 / 'outline' 描边 / url 链接
       */
      tiles: [
        {
          title: "WATCH ULTRA 4",
          showLogo: true,
          subtitle: "飙电力，联手野到底。",
          theme: "dark",
          background: "#000",
          image: `${IMG}/promos/watch-ultra-4_large_2x.jpg`,
          imageMobile: `${IMG}/promos/watch-ultra-4_small_2x.jpg`,
          links: [
            {
              text: "进一步了解",
              type: "primary",
              url: `${CDN}/apple-watch-ultra-4/`,
            },
            {
              text: "购买",
              type: "outline",
              url: `${CDN}/cn/shop/goto/buy_watch/apple_watch_ultra_4`,
            },
          ],
        },
        {
          title: "iCloud+",
          subtitle: "激活新 iPhone、iPad 或 Mac，可免费试用 3 个月 iCloud+ 服务¹。",
          theme: "light",
          background: "#f5f5f7",
          image: `${IMG}/promos/icloud_large_2x.jpg`,
          imageMobile: `${IMG}/promos/icloud_small_2x.jpg`,
          links: [
            {
              text: "进一步了解",
              type: "primary",
              url: ICLOUD_OFFER,
            },
          ],
        },
        {
          title: "Mac mini",
          subtitle: "现搭载 M6 或 M5 Pro",
          theme: "light",
          background: "#f5f5f7",
          image: `${IMG}/promos/mac-mini_large_2x.jpg`,
          imageMobile: `${IMG}/promos/mac-mini_small_2x.jpg`,
          links: [
            { text: "进一步了解", type: "primary", url: `${CDN}/mac-mini/` },
            {
              text: "购买",
              type: "outline",
              url: `${CDN}/cn/shop/goto/buy_mac/mac_mini`,
            },
          ],
        },
        {
          title: "MacBook Air",
          subtitle: "强势动力现来自 M5",
          theme: "light",
          background: "#e0f0fa",
          image: `${IMG}/promos/macbook-air_large_2x.jpg`,
          imageMobile: `${IMG}/promos/macbook-air_small_2x.jpg`,
          links: [
            { text: "进一步了解", type: "primary", url: `${CDN}/macbook-air/` },
            {
              text: "购买",
              type: "outline",
              url: `${CDN}/cn/shop/goto/buy_mac/macbook_air`,
            },
          ],
        },
        {
          title: "iPad ",
          titleAccent: "air",
          subtitle: "强势动力现来自 M4",
          theme: "light",
          background: "#d6eefc",
          image: `${IMG}/promos/ipad-air_large_2x.jpg`,
          imageMobile: `${IMG}/promos/ipad-air_small_2x.jpg`,
          links: [
            { text: "进一步了解", type: "primary", url: `${CDN}/ipad-air/` },
            {
              text: "购买",
              type: "outline",
              url: `${CDN}/cn/shop/goto/buy_ipad/ipad_air`,
            },
          ],
        },
        {
          title: "Trade In 换购计划",
          showLogo: true,
          subtitle: "用 iPhone 13 或后续机型来换购，可享预计为 RMB 900 至 RMB 8300 的折抵优惠²。",
          theme: "light",
          background: "#f5f5f7",
          image: `${IMG}/promos/trade-in_large_2x.jpg`,
          imageMobile: `${IMG}/promos/trade-in_small_2x.jpg`,
          links: [
            {
              text: "获取折抵估价",
              type: "primary",
              url: `${CDN}/cn/shop/goto/trade_in`,
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.apple-home {
  padding-top: 44px;
  background: #fff;
}
</style>
