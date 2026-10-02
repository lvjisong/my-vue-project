<template>
  <div class="apple-home">
    <AppleNav />

    <!-- Hero 0：iPhone 18 Pro -->
    <AppleHero
      title="iPhone 18 Pro"
      subtitle="Pro 再超前"
      theme="dark"
      :image="heroIphonePro"
      fallback-bg="#000"
      :parallax="0.15"
      :links="[
        { text: '进一步了解', type: 'primary', url: 'https://www.apple.com.cn/iphone-18-pro/' },
        { text: '购买', type: 'outline', url: 'https://www.apple.com.cn/cn/shop/goto/buy_iphone/iphone_18_pro' },
      ]"
    />

    <!-- Hero 1：iPhone Duo -->
    <AppleHero
      title="iPhone Duo"
      subtitle="Hello, hello。"
      theme="light"
      :image="heroDuo"
      fallback-bg="#f5f5f7"
      content-position="top"
      :info-lines="['10 月 16 日晚 8 点接受预购', '10 月 23 日发售']"
      :parallax="0.12"
      :links="[
        { text: '进一步了解', type: 'primary', url: 'https://www.apple.com.cn/iphone-duo/' },
        { text: '查看价格', type: 'outline', url: 'https://www.apple.com.cn/cn/shop/goto/buy_iphone/iphone_duo' },
      ]"
    />

    <!-- Hero 2：Apple Watch Series 12 -->
    <AppleHero
      title="WATCH SERIES 12"
      subtitle="拥有 Apple Watch 迄今最先进的心率感测技术"
      theme="dark"
      :image="heroWatch"
      fallback-bg="#000"
      show-logo
      content-position="bottom"
      :parallax="0.15"
      :links="[
        { text: '进一步了解', type: 'primary', url: 'https://www.apple.com.cn/apple-watch-series-12/' },
        { text: '购买', type: 'outline', url: 'https://www.apple.com.cn/cn/shop/goto/buy_watch/apple_watch_series_12' },
      ]"
    />

    <!-- 双列磁贴 -->
    <AppleTileGrid :tiles="tiles" />

    <AppleFooter />
  </div>
</template>

<script>
import AppleNav from './AppleNav.vue';
import AppleHero from './AppleHero.vue';
import AppleTileGrid from './AppleTileGrid.vue';
import AppleFooter from './AppleFooter.vue';

const CDN = 'https://www.apple.com.cn';

export default {
  name: 'AppleHome',
  components: { AppleNav, AppleHero, AppleTileGrid, AppleFooter },
  data() {
    return {
      heroIphonePro: `https://www.apple.com.cn/v/homepage/images/iphone-18-pro/a/hero_iphone_18_pro__fqe1motd0ymy_large.jpg`,
      heroDuo: `${CDN}/homepage/built/heroes/iphone-duo/images/hero_iphone_duo_announce__fh4u8yzndpe2_large.jpg`,
      heroWatch: `${CDN}/homepage/built/heroes/apple-watch-series-12/images/hero_apple_watch_series_12__n9rln7bzvwya_large.jpg`,
      tiles: [
        {
          title: 'WATCH ULTRA 4', showLogo: true,
          subtitle: '飙电力，联手野到底。',
          theme: 'dark', background: '#000',
          image: `${CDN}/homepage/built/promos/apple-watch-ultra-4/images/promo_apple_watch_ultra_4__e4r3qertak2u_large.jpg`,
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/apple-watch-ultra-4/` },
            { text: '购买', type: 'outline', url: `${CDN}/cn/shop/goto/buy_watch/apple_watch_ultra_4` },
          ],
        },
        {
          title: 'iCloud+',
          subtitle: '激活新 iPhone、iPad 或 Mac，可免费试用 3 个月 iCloud+ 服务¹。',
          theme: 'light', background: '#f5f5f7',
          image: `${CDN}/homepage/built/promos/icloud/images/promo_icloud__fjwhk1y7hsa6_large.jpg`,
          links: [{ text: '进一步了解', type: 'primary', url: 'https://offers.icloud.apple/cn-offer' }],
        },
        {
          title: 'Mac mini',
          subtitle: '现搭载 M6 或 M5 Pro',
          theme: 'light', background: '#f5f5f7',
          image: `${CDN}/v/homepage/images/mac-mini/a/promo_mac_mini_m6__pwypzbjgopea_large.jpg`,
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/mac-mini/` },
            { text: '购买', type: 'outline', url: `${CDN}/cn/shop/goto/buy_mac/mac_mini` },
          ],
        },
        {
          title: 'MacBook Air',
          subtitle: '强势动力现来自 M5',
          theme: 'light', background: '#e0f0fa',
          image: `${CDN}/homepage/built/promos/macbook-air/images/promo_macbook_air_m5__dibaetiq7nu6_large.jpg`,
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/macbook-air/` },
            { text: '购买', type: 'outline', url: `${CDN}/cn/shop/goto/buy_mac/macbook_air` },
          ],
        },
        {
          title: 'iPad ', titleAccent: 'air',
          subtitle: '强势动力现来自 M4',
          theme: 'light', background: '#d6eefc',
          image: `${CDN}/v/home/images/ipad-air-m4/a/promo_ipad_air_m4__bgcv7t286k8y_large.jpg`,
          links: [
            { text: '进一步了解', type: 'primary', url: `${CDN}/ipad-air/` },
            { text: '购买', type: 'outline', url: `${CDN}/cn/shop/goto/buy_ipad/ipad_air` },
          ],
        },
        {
          title: 'Trade In 换购计划', showLogo: true,
          subtitle: '用 iPhone 13 或后续机型来换购，可享预计为 RMB 900 至 RMB 8300 的折抵优惠²。',
          theme: 'light', background: '#f5f5f7',
          image: `${CDN}/v/homepage/images/iphone-tradein/a/promo_iphone_tradein__e4hrjxmgmf0i_large.jpg`,
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
