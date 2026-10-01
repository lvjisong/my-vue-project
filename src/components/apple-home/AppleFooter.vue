<template>
  <footer class="apple-footer">
    <div class="apple-footer__inner">
      <!-- 法律小字 -->
      <div class="apple-footer__notes">
        <p>1. 仅限新订阅用户使用在活动期间内激活的符合条件的设备进行兑换。免费试用期结束后，订阅方案将按每月 RMB 6 的价格自动续订，直至取消订阅。每个 Apple 账户仅可兑换一次优惠。需要在符合条件的设备激活后 3 个月内兑换此优惠。须遵守限制条件及其他条款（参见 <a style="text-decoration: underline;color:#6e6e73" href="https://www.apple.com.cn/promo" target="_blank">apple.com.cn/promo</a>）。iCloud 在中国大陆由云上贵州（云上艾珀（贵州）技术有限公司）运营。某些功能要求使用无线局域网连接。某些服务仅限最多 10 部设备访问。某些功能仅适用于部分国家或地区。</p>
        <p>2. 折抵换购服务由 Apple 的折抵服务合作伙伴提供。折抵金额报价仅为预估价，实际折抵金额可能低于预估价值，具体金额取决于设备的状况、配置、推出年份，以及发售国家或地区。并非所有设备均有资格获得第三方折抵服务合作伙伴提供的设备折抵金额或 Apple 提供的购新优惠。年满 18 周岁及以上才可参与本计划。现有设备的折抵金额可用于折抵购买新的 Apple 设备。实际折抵金额取决于收到的符合折抵条件的设备状况是否与评估时你提供的设备描述相符。可能需要按照新设备的全额售价缴纳增值税。店内折抵需出示政府颁发并附有照片的有效身份证件（当地法律可能要求存储该信息）。该服务可能仅在部分 Apple Store 零售店提供。在线换购和店内换购的折抵金额可能有所不同。某些 Apple Store 零售店可能有不同要求。Apple 的折抵服务合作伙伴保留出于任何原因拒绝、取消任何折抵交易或限制任何设备（及其数量）的权利。如需获得有关折抵及设备回收服务的更多信息，请咨询 Apple 的折抵服务合作伙伴。需要遵守 Apple 的折抵服务合作伙伴的其他条款。</p>
        <p>功能可能会有所变化。某些功能、应用软件和服务可能仅适用于部分地区或语言。</p>
      </div>

      <hr class="apple-footer__divider" />

      <!-- 5 列链接，每列可含多个分组 -->
      <div class="apple-footer__cols">
        <div v-for="(col, ci) in columns" :key="ci" class="apple-footer__col">
          <div v-for="group in col" :key="group.heading" class="apple-footer__group">
            <button class="apple-footer__head" @click="toggle(ci + '-' + group.heading)">
              {{ group.heading }}
              <span class="apple-footer__chev">›</span>
            </button>
            <ul v-show="open[ci + '-' + group.heading]" class="apple-footer__list">
              <li v-for="link in group.links" :key="link"><a href="#" @click.prevent>{{ link }}</a></li>
            </ul>
          </div>
        </div>
      </div>

      <hr class="apple-footer__divider" />

      <p class="apple-footer__shopline">
        更多选购方式：<a href="#" @click.prevent style="text-decoration: underline;">查找你附近的 Apple Store 零售店</a>及<a href="#" @click.prevent style="text-decoration: underline;">更多门店</a>，或者致电 <a href="tel:400-666-8800" style="text-decoration: underline;">400-666-8800</a>。
      </p>

      <hr class="apple-footer__divider" />

      <div class="apple-footer__legal">
        <p>Copyright © 2026 Apple Inc. 保留所有权利。</p>
        <nav class="apple-footer__legalnav">
          <a v-for="l in legalLinks" :key="l" href="#" @click.prevent>{{ l }}</a>
        </nav>
        <p class="apple-footer__icp">京ICP备10214630号 营业执照 无线电发射设备销售备案编号11201910351200</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppleFooter',
  data() {
    return {
      open: {},
      legalLinks: ['隐私政策', '使用条款', '销售政策', '法律信息', '网站地图'],
      columns: [
        [
          { heading: '选购及了解', links: ['商店', 'Mac', 'iPad', 'iPhone', 'Watch', 'Vision', 'AirPods', '家居', 'AirTag', '配件', 'App Store 充值卡'] },
          { heading: 'Apple 钱包', links: ['Apple Pay', 'Apple Pay 公交'] },
        ],
        [
          { heading: '账户', links: ['管理你的 Apple 账户', 'Apple Store 账户', 'iCloud.com'] },
          { heading: '娱乐', links: ['Apple Music', 'Apple 播客', 'App Store'] },
        ],
        [
          { heading: 'Apple Store 商店', links: ['查找零售店', 'Genius Bar 天才吧', 'Today at Apple', '团体预约', 'Apple 夏令营', 'Apple Store App', '认证的翻新产品', 'Apple Trade In 换购计划', '分期付款', '订单状态', '选购帮助'] },
        ],
        [
          { heading: '商务应用', links: ['Apple 与商务', '商务选购'] },
          { heading: '教育应用', links: ['Apple 与教育', '高校师生选购'] },
        ],
        [
          { heading: 'Apple 价值观', links: ['无障碍使用', '教育', '环境责任', '隐私', '供应链创新'] },
          { heading: '关于 Apple', links: ['Newsroom', 'Apple 管理层', '工作机会', '创造就业', '商业道德与合规', '活动', '联系 Apple'] },
        ],
      ],
    };
  },
  methods: {
    toggle(key) { this.$set(this.open, key, !this.open[key]); },
  },
};
</script>

<style lang="scss" scoped>
.apple-footer {
  background: #f5f5f7;
  color: #6e6e73;
  font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif;
  font-size: 12px;
}
.apple-footer__inner { max-width: 1024px; margin: 0 auto; padding: 20px 22px; }

/* 法律小字 */
.apple-footer__notes p { margin: 0 0 12px; line-height: 1.4; color: #6e6e73; }
.apple-footer__notes a { color: #0071e3; }

.apple-footer__divider { border: none; border-top: 1px solid #d2d2d7; margin: 16px 0; }

/* 5 列 */
.apple-footer__cols {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px 24px;
}
.apple-footer__group { margin-bottom: 20px; }
.apple-footer__head {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; font-size: 12px; font-weight: 600; color: #1d1d1f;
  background: none; border: none; padding: 0 0 6px; cursor: pointer;
}
.apple-footer__chev { display: none; transition: transform 200ms ease; }
.apple-footer__list { list-style: none; margin: 0; padding: 0; }
.apple-footer__list li { margin-bottom: 8px; }
.apple-footer__list a { color: #424245; line-height: 1.3; }
.apple-footer__list a:hover { color: #1d1d1f; }

.apple-footer__shopline { margin: 0; color: #6e6e73; }
.apple-footer__shopline a { color: #0071e3; }

.apple-footer__legal p { margin: 0 0 4px; }
.apple-footer__legalnav { display: flex; flex-wrap: wrap; margin-bottom: 4px; }
.apple-footer__legalnav a { color: #424245; padding: 0 10px; border-left: 1px solid #d2d2d7; }
.apple-footer__legalnav a:first-child { padding-left: 0; border-left: none; }
.apple-footer__icp { color: #6e6e73; }

@media (max-width: 734px) {
  .apple-footer__cols { grid-template-columns: 1fr; gap: 0; }
  .apple-footer__group { border-bottom: 1px solid #d2d2d7; margin-bottom: 0; }
  .apple-footer__chev { display: inline-block; }
  .apple-footer__list { padding: 0 0 12px; }
}
@media (min-width: 735px) {
  .apple-footer__list { display: block !important; }
  .apple-footer__head { cursor: default; }
}
</style>
