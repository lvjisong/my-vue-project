<template>
  <div class="apple-home">
    <AppleNav />

    <!-- Hero 横幅（数组循环渲染） -->
    <AppleHero v-for="hero in heroes" :key="hero.title" v-bind="hero" />

    <!-- 双列磁贴 -->
    <AppleTileGrid :tiles="tiles" />

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
import AppleNav from './AppleNav.vue';
import AppleHero from './AppleHero.vue';
import AppleTileGrid from './AppleTileGrid.vue';
import AppleFooter from './AppleFooter.vue';

/** 官网 CDN 前缀，图片/链接统一基于此拼接 */
const CDN = 'https://www.apple.com.cn';

export default {
  name: 'AppleHome',
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
          title: 'iPhone 18 Pro', subtitle: 'Pro 再超前', theme: 'dark',
          image: `${CDN}/v/homepage/images/iphone-18-pro/a/hero_iphone_18_pro__fqe1motd0ymy_largetall_2x.jpg`,
          imageMobile: `${CDN}/v/homepage/images/iphone-18-pro/a/hero_iphone_18_pro__fqe1motd0ymy_small_2x.jpg`,
          fallbackBg: '#000', parallax: 0.15,
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/iphone-18-pro/` },
            { text: '购买', type: 'outline', url: `${CDN}/cn/shop/goto/buy_iphone/iphone_18_pro` },
          ],
        },
        {
          title: 'iPhone Duo', subtitle: 'Hello, hello。', theme: 'light',
          image: `${CDN}/homepage/built/heroes/iphone-duo/images/hero_iphone_duo_announce__fh4u8yzndpe2_largetall_2x.jpg`,
          imageMobile: `${CDN}/homepage/built/heroes/iphone-duo/images/hero_iphone_duo_announce__fh4u8yzndpe2_small_2x.jpg`,
          fallbackBg: '#f5f5f7', contentPosition: 'top', parallax: 0.12,
          infoLines: ['10 月 16 日晚 8 点接受预购', '10 月 23 日发售'],
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/iphone-duo/` },
            { text: '查看价格', type: 'outline', url: `${CDN}/cn/shop/goto/buy_iphone/iphone_duo` },
          ],
        },
        {
          title: 'WATCH SERIES 12',
          subtitle: '拥有 Apple Watch 迄今最先进的心率感测技术',
          theme: 'dark', showLogo: true, contentPosition: 'bottom',
          image: `${CDN}/homepage/built/heroes/apple-watch-series-12/images/hero_apple_watch_series_12__n9rln7bzvwya_largetall_2x.jpg`,
          imageMobile: `${CDN}/homepage/built/heroes/apple-watch-series-12/images/hero_apple_watch_series_12__n9rln7bzvwya_small_2x.jpg`,
          fallbackBg: '#000', parallax: 0.15,
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/apple-watch-series-12/` },
            { text: '购买', type: 'outline', url: `${CDN}/cn/shop/goto/buy_watch/apple_watch_series_12` },
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
          title: 'WATCH ULTRA 4', showLogo: true,
          subtitle: '飙电力，联手野到底。',
          theme: 'dark', background: '#000',
          image: `${CDN}/homepage/built/promos/apple-watch-ultra-4/images/promo_apple_watch_ultra_4__e4r3qertak2u_large_2x.jpg`,
          imageMobile: `${CDN}/homepage/built/promos/apple-watch-ultra-4/images/promo_apple_watch_ultra_4__e4r3qertak2u_small_2x.jpg`,
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/apple-watch-ultra-4/` },
            { text: '购买', type: 'outline', url: `${CDN}/cn/shop/goto/buy_watch/apple_watch_ultra_4` },
          ],
        },
        {
          title: 'iCloud+',
          subtitle: '激活新 iPhone、iPad 或 Mac，可免费试用 3 个月 iCloud+ 服务¹。',
          theme: 'light', background: '#f5f5f7',
          image: `${CDN}/homepage/built/promos/icloud/images/promo_icloud__fjwhk1y7hsa6_large_2x.jpg`,
          imageMobile: `${CDN}/homepage/built/promos/icloud/images/promo_icloud__fjwhk1y7hsa6_small_2x.jpg`,
          links: [{ text: '进一步了解', type: 'primary', url: 'https://offers.icloud.apple/cn-offer' }],
        },
        {
          title: 'Mac mini',
          subtitle: '现搭载 M6 或 M5 Pro',
          theme: 'light', background: '#f5f5f7',
          image: `${CDN}/v/homepage/images/mac-mini/a/promo_mac_mini_m6__pwypzbjgopea_large_2x.jpg`,
          imageMobile: `${CDN}/v/homepage/images/mac-mini/a/promo_mac_mini_m6__pwypzbjgopea_small_2x.jpg`,
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/mac-mini/` },
            { text: '购买', type: 'outline', url: `${CDN}/cn/shop/goto/buy_mac/mac_mini` },
          ],
        },
        {
          title: 'MacBook Air',
          subtitle: '强势动力现来自 M5',
          theme: 'light', background: '#e0f0fa',
          image: `${CDN}/homepage/built/promos/macbook-air/images/promo_macbook_air_m5__dibaetiq7nu6_large_2x.jpg`,
          imageMobile: `${CDN}/homepage/built/promos/macbook-air/images/promo_macbook_air_m5__dibaetiq7nu6_small_2x.jpg`,
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/macbook-air/` },
            { text: '购买', type: 'outline', url: `${CDN}/cn/shop/goto/buy_mac/macbook_air` },
          ],
        },
        {
          title: 'iPad ', titleAccent: 'air',
          subtitle: '强势动力现来自 M4',
          theme: 'light', background: '#d6eefc',
          image: `${CDN}/v/home/images/ipad-air-m4/a/promo_ipad_air_m4__bgcv7t286k8y_large_2x.jpg`,
          imageMobile: `${CDN}/v/home/images/ipad-air-m4/a/promo_ipad_air_m4__bgcv7t286k8y_small_2x.jpg`,
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/ipad-air/` },
            { text: '购买', type: 'outline', url: `${CDN}/cn/shop/goto/buy_ipad/ipad_air` },
          ],
        },
        {
          title: 'Trade In 换购计划', showLogo: true,
          subtitle: '用 iPhone 13 或后续机型来换购，可享预计为 RMB 900 至 RMB 8300 的折抵优惠²。',
          theme: 'light', background: '#f5f5f7',
          image: `${CDN}/v/homepage/images/iphone-tradein/a/promo_iphone_tradein__e4hrjxmgmf0i_large_2x.jpg`,
          imageMobile: `${CDN}/v/homepage/images/iphone-tradein/a/promo_iphone_tradein__e4hrjxmgmf0i_small_2x.jpg`,
          links: [{ text: '获取折抵估价', type: 'primary', url: `${CDN}/cn/shop/goto/trade_in` }],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.apple-home { padding-top: 44px; background: #fff; }
</style>
