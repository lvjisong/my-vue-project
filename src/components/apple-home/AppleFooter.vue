<template>
  <footer class="apple-footer">
    <div class="apple-footer__inner">
      <!-- 法律小字 -->
      <div class="apple-footer__notes">
        <p>
          1.
          仅限新订阅用户使用在活动期间内激活的符合条件的设备进行兑换。免费试用期结束后，订阅方案将按每月
          RMB 6 的价格自动续订，直至取消订阅。每个 Apple
          账户仅可兑换一次优惠。需要在符合条件的设备激活后 3
          个月内兑换此优惠。须遵守限制条件及其他条款（参见
          <a
            style="text-decoration: underline; color: #6e6e73"
            href="https://www.apple.com.cn/promo"
            target="_blank"
            >apple.com.cn/promo</a
          >）。iCloud
          在中国大陆由云上贵州（云上艾珀（贵州）技术有限公司）运营。某些功能要求使用无线局域网连接。某些服务仅限最多
          10 部设备访问。某些功能仅适用于部分国家或地区。
        </p>
        <p>
          2. 折抵换购服务由 Apple
          的折抵服务合作伙伴提供。折抵金额报价仅为预估价，实际折抵金额可能低于预估价值，具体金额取决于设备的状况、配置、推出年份，以及发售国家或地区。并非所有设备均有资格获得第三方折抵服务合作伙伴提供的设备折抵金额或
          Apple 提供的购新优惠。年满 18
          周岁及以上才可参与本计划。现有设备的折抵金额可用于折抵购买新的 Apple
          设备。实际折抵金额取决于收到的符合折抵条件的设备状况是否与评估时你提供的设备描述相符。可能需要按照新设备的全额售价缴纳增值税。店内折抵需出示政府颁发并附有照片的有效身份证件（当地法律可能要求存储该信息）。该服务可能仅在部分
          Apple Store 零售店提供。在线换购和店内换购的折抵金额可能有所不同。某些
          Apple Store 零售店可能有不同要求。Apple
          的折抵服务合作伙伴保留出于任何原因拒绝、取消任何折抵交易或限制任何设备（及其数量）的权利。如需获得有关折抵及设备回收服务的更多信息，请咨询
          Apple 的折抵服务合作伙伴。需要遵守 Apple
          的折抵服务合作伙伴的其他条款。
        </p>
        <p>
          功能可能会有所变化。某些功能、应用软件和服务可能仅适用于部分地区或语言。
        </p>
      </div>

      <hr class="apple-footer__divider" />

      <!-- 5 列链接，每列可含多个分组 -->
      <div class="apple-footer__cols">
        <div v-for="(col, ci) in columns" :key="ci" class="apple-footer__col">
          <div
            v-for="group in col"
            :key="group.heading"
            class="apple-footer__group"
            :class="{ 'is-open': open[ci + '-' + group.heading] }"
          >
            <button
              class="apple-footer__head"
              @click="toggle(ci + '-' + group.heading)"
            >
              {{ group.heading }}
              <span class="apple-footer__chev">⌄</span>
            </button>
            <transition name="footer-expand">
              <ul
                v-show="open[ci + '-' + group.heading]"
                class="apple-footer__list"
              >
                <li v-for="link in group.links" :key="link.text">
                  <a
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ link.text }}</a
                  >
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>

      <hr class="apple-footer__divider apple-footer__divider--legal" />

      <p class="apple-footer__shopline apple-footer__shopline--legal">
        更多选购方式：<a
          href="https://www.apple.com.cn/retail/"
          target="_blank"
          rel="noopener noreferrer"
          style="text-decoration: underline"
          >查找你附近的 Apple Store 零售店</a
        >及<a
          href="https://www.apple.com.cn/retail/"
          target="_blank"
          rel="noopener noreferrer"
          style="text-decoration: underline"
          >更多门店</a
        >，或者致电
        <a href="tel:400-666-8800" style="text-decoration: underline"
          >400-666-8800</a
        >。
      </p>

      <hr class="apple-footer__divider apple-footer__divider--legal" />

      <div class="apple-footer__legal">
        <p>Copyright © 2026 Apple Inc. 保留所有权利。</p>
        <nav class="apple-footer__legalnav">
          <a
            v-for="l in legalLinks"
            :key="l.text"
            :href="l.url"
            target="_blank"
            rel="noopener noreferrer"
            >{{ l.text }}</a
          >
        </nav>
        <p class="apple-footer__icp">
          京ICP备10214630号 营业执照 无线电发射设备销售备案编号11201910351200
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
/**
 * AppleFooter.vue —— apple.com.cn 页脚复刻
 *
 * 结构（自上而下）：
 *   1. 法律小字（iCloud 优惠 / Trade In 折抵说明）
 *   2. 5 列链接组（PC 常显，移动端折叠为手风琴）
 *   3. 更多选购方式 + 客服电话
 *   4. Copyright + 法律导航 + ICP 备案号
 *
 * 移动端交互：点组标题 toggle 展开/收起该组链接（this.$set 保证 Vue2 响应式）
 * 主题：颜色全部走 theme.scss 的 CSS 变量（--bg-page / --text-secondary 等），跟随系统深浅色
 */
export default {
  name: "AppleFooter",
  data() {
    return {
      open: {},
      legalLinks: [
        { text: "隐私政策", url: "https://www.apple.com.cn/legal/privacy/" },
        {
          text: "使用条款",
          url: "https://www.apple.com.cn/legal/internet-services/terms/site.html",
        },
        {
          text: "销售政策",
          url: "https://www.apple.com.cn/cn/shop/goto/help/sales_refunds",
        },
        { text: "法律信息", url: "https://www.apple.com.cn/legal/" },
        { text: "网站地图", url: "https://www.apple.com.cn/sitemap/" },
      ],
      columns: [
        [
          {
            heading: "选购及了解",
            links: [
              {
                text: "商店",
                url: "https://www.apple.com.cn/cn/shop/goto/store",
              },
              { text: "Mac", url: "https://www.apple.com.cn/mac/" },
              { text: "iPad", url: "https://www.apple.com.cn/ipad/" },
              { text: "iPhone", url: "https://www.apple.com.cn/iphone/" },
              { text: "Watch", url: "https://www.apple.com.cn/watch/" },
              {
                text: "Vision",
                url: "https://www.apple.com.cn/apple-vision-pro/",
              },
              { text: "AirPods", url: "https://www.apple.com.cn/airpods/" },
              { text: "家居", url: "https://www.apple.com.cn/apple-home/" },
              { text: "AirTag", url: "https://www.apple.com.cn/airtag/" },
              {
                text: "配件",
                url: "https://www.apple.com.cn/cn/shop/goto/buy_accessories",
              },
              {
                text: "App Store 充值卡",
                url: "https://www.apple.com.cn/cn/shop/goto/giftcards",
              },
            ],
          },
          {
            heading: "Apple 钱包",
            links: [
              { text: "Apple Pay", url: "https://www.apple.com.cn/apple-pay/" },
              {
                text: "Apple Pay 公交",
                url: "https://www.apple.com.cn/apple-pay/transit/",
              },
            ],
          },
        ],
        [
          {
            heading: "账户",
            links: [
              {
                text: "管理你的 Apple 账户",
                url: "https://account.apple.com/cn/",
              },
              {
                text: "Apple Store 账户",
                url: "https://www.apple.com.cn/cn/shop/goto/account",
              },
              { text: "iCloud.com", url: "https://www.icloud.com/" },
            ],
          },
          {
            heading: "娱乐",
            links: [
              {
                text: "Apple Music",
                url: "https://www.apple.com.cn/apple-music/",
              },
              {
                text: "Apple 播客",
                url: "https://www.apple.com.cn/apple-podcasts/",
              },
              { text: "App Store", url: "https://www.apple.com.cn/app-store/" },
            ],
          },
        ],
        [
          {
            heading: "Apple Store 商店",
            links: [
              { text: "查找零售店", url: "https://www.apple.com.cn/retail/" },
              {
                text: "Genius Bar 天才吧",
                url: "https://www.apple.com.cn/retail/geniusbar/",
              },
              {
                text: "Today at Apple",
                url: "https://www.apple.com.cn/today/",
              },
              {
                text: "团体预约",
                url: "https://www.apple.com.cn/today/groups/",
              },
              {
                text: "Apple 夏令营",
                url: "https://www.apple.com.cn/today/camp/",
              },
              {
                text: "Apple Store App",
                url: "https://apps.apple.com/cn/app/apple-store/id375380948",
              },
              {
                text: "认证的翻新产品",
                url: "https://www.apple.com.cn/cn/shop/goto/special_deals",
              },
              {
                text: "Apple Trade In 换购计划",
                url: "https://www.apple.com.cn/cn/shop/goto/trade_in",
              },
              {
                text: "分期付款",
                url: "https://www.apple.com.cn/cn/shop/goto/ww/financing",
              },
              {
                text: "订单状态",
                url: "https://www.apple.com.cn/cn/shop/goto/order/list",
              },
              {
                text: "选购帮助",
                url: "https://www.apple.com.cn/cn/shop/goto/help",
              },
            ],
          },
        ],
        [
          {
            heading: "商务应用",
            links: [
              {
                text: "Apple 与商务",
                url: "https://www.apple.com.cn/business/",
              },
              {
                text: "商务选购",
                url: "https://www.apple.com.cn/retail/business/",
              },
            ],
          },
          {
            heading: "教育应用",
            links: [
              {
                text: "Apple 与教育",
                url: "https://www.apple.com.cn/education/",
              },
              {
                text: "高校师生选购",
                url: "https://www.apple.com.cn/cn/shop/goto/educationrouting",
              },
            ],
          },
        ],
        [
          {
            heading: "Apple 价值观",
            links: [
              {
                text: "无障碍使用",
                url: "https://www.apple.com.cn/accessibility/",
              },
              {
                text: "教育",
                url: "https://www.apple.com.cn/education-initiative/",
              },
              {
                text: "环境责任",
                url: "https://www.apple.com.cn/environment/",
              },
              { text: "隐私", url: "https://www.apple.com.cn/privacy/" },
              {
                text: "供应链创新",
                url: "https://www.apple.com.cn/supply-chain/",
              },
            ],
          },
          {
            heading: "关于 Apple",
            links: [
              { text: "Newsroom", url: "https://www.apple.com.cn/newsroom/" },
              {
                text: "Apple 管理层",
                url: "https://www.apple.com.cn/leadership/",
              },
              { text: "工作机会", url: "https://www.apple.com.cn/jobs/" },
              {
                text: "创造就业",
                url: "https://www.apple.com.cn/job-creation/",
              },
              {
                text: "商业道德与合规",
                url: "https://www.apple.com.cn/compliance/",
              },
              { text: "活动", url: "https://www.apple.com.cn/apple-events/" },
              { text: "联系 Apple", url: "https://www.apple.com.cn/contact/" },
            ],
          },
        ],
      ],
    };
  },
  methods: {
    /**
     * 切换移动端 group 的展开/收起
     *
     * 原理：
     *   - this.open 是一个对象，key 形如 "0-选购及了解"，value 为 true/false
     *   - 模板里用 v-show="open[key]" 控制对应 ul 的显示
     *   - 每次点击把该 key 的值取反：true→false（收起），undefined→true（展开）
     *
     * 为什么用 this.$set：
     *   Vue 2 无法检测对象新增属性，直接 this.open[key] = xxx 视图不更新；
     *   this.$set 会新增响应式属性并触发重渲染。
     */
    toggle(key) {
      this.$set(this.open, key, !this.open[key]);
    },
  },
};
</script>

<style lang="scss" scoped>
.apple-footer {
  background: var(--bg-page);
  color: var(--text-secondary);
  font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont,
    "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    system-ui, sans-serif;
  font-size: 12px;
}
.apple-footer__inner {
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px 22px;
}

/* 法律小字 */
.apple-footer__notes p {
  margin: 0 0 12px;
  line-height: 1.4;
  color: var(--text-secondary);
}
.apple-footer__notes a {
  color: var(--link);
}

.apple-footer__divider {
  border: none;
  border-top: 1px solid var(--border);
  margin: 16px 0;
}

/* 5 列 */
.apple-footer__cols {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px 24px;
}
.apple-footer__group {
  margin-bottom: 20px;
}
.apple-footer__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  background: none;
  border: none;
  padding: 0 0 6px;
  cursor: pointer;
}
.apple-footer__chev {
  display: none;
  transition: transform 200ms ease;
}
.apple-footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.apple-footer__list li {
  margin-bottom: 8px;
}
.apple-footer__list a {
  color: var(--text-link);
  line-height: 1.3;
}
.apple-footer__list a:hover {
  color: var(--text-link-hover);
}

.apple-footer__shopline {
  margin: 0;
  color: var(--text-secondary);
}
.apple-footer__shopline a {
  color: var(--link);
}

.apple-footer__legal p {
  margin: 0 0 4px;
}
.apple-footer__legalnav {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4px;
}
.apple-footer__legalnav a {
  color: var(--text-link);
  padding: 0 10px;
  border-left: 1px solid var(--border);
}
.apple-footer__legalnav a:first-child {
  padding-left: 0;
  border-left: none;
}
.apple-footer__icp {
  color: var(--text-secondary);
}

@media (max-width: 734px) {
  .apple-footer__cols {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .apple-footer__group {
    border-bottom: 1px solid var(--border);
    border-top: none;
    margin-bottom: 0;
  }
  .apple-footer__head {
    padding: 14px 0;
  }
  .apple-footer__chev {
    display: inline-block;
    transition: transform 0.3s ease;
  }
  .apple-footer__group.is-open .apple-footer__chev {
    transform: scaleY(-1);
  }
  .apple-footer__list {
    padding: 0 0 14px 12px;
    overflow: hidden;
  }
  /* 展开动画：和 PC 下拉面板一致 scaleY 0.38s；收起无过渡 */
  .footer-expand-enter-active {
    transition: transform 0.38s cubic-bezier(0.4, 0, 0.6, 1), opacity 0.25s ease;
    transform-origin: top;
  }
  .footer-expand-enter {
    transform: scaleY(0);
    opacity: 0;
  }
  .footer-expand-leave-active {
    transition: none;
  }
  /* 移动端：Copyright 上方不要分割线 */
  .apple-footer__divider--legal {
    display: none;
  }
  .apple-footer__shopline--legal {
    margin: 20px 0;
  }
}
@media (min-width: 735px) {
  .apple-footer__list {
    display: block !important;
  }
  .apple-footer__head {
    cursor: default;
  }
}
</style>
