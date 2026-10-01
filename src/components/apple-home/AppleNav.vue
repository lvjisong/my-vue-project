<template>
  <div class="apple-nav-root">
    <!-- 展开下拉时的暗色毛玻璃幕布（置于 header 外，backdrop-filter 才能模糊页面） -->
    <transition name="curtain">
      <div v-show="showPanel" class="apple-nav__curtain"></div>
    </transition>

  <header class="apple-nav" :class="{ 'is-open': activeIndex > -1 && !isClosing, 'is-closing': isClosing }" @mouseleave="scheduleClose">
    <div class="apple-nav__inner">
      <!-- Apple Logo（官网 SVG） -->
      <a class="apple-nav__logo" href="#" @click.prevent aria-label="Apple">
        <svg height="44" viewBox="0 0 14 44" width="14" aria-hidden="true">
          <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"/>
        </svg>
      </a>

      <nav class="apple-nav__menu">
        <div
          v-for="(item, index) in menus"
          :key="item.label"
          class="apple-nav__item"
          @mouseenter="openMenu(index)"
        >
          <a class="apple-nav__link" href="#" @click.prevent>{{ item.label }}</a>
        </div>
      </nav>

      <div class="apple-nav__actions">
        <a class="apple-nav__icon" href="#" @click.prevent aria-label="搜索">
          <svg height="44" viewBox="0 0 15 44" width="15" aria-hidden="true">
            <path d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"/>
          </svg>
        </a>
        <a class="apple-nav__icon" href="#" @click.prevent aria-label="购物袋">
          <svg height="44" viewBox="0 0 14 44" width="14" aria-hidden="true">
            <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- 下拉面板 -->
    <transition name="flyout" @after-leave="afterLeave">
      <div
        v-show="showPanel"
        class="apple-nav__flyout"
        @mouseenter="cancelClose"
        @mouseleave="scheduleClose"
      >
        <div class="apple-nav__flyout-inner">
          <div
            v-for="(col, gi) in dropColumns"
            :key="col.heading"
            class="apple-nav__col"
          >
            <p class="apple-nav__col-head" :style="stagger(0, gi)">{{ col.heading }}</p>
            <!-- 第一列：28px 大链接 -->
            <template v-if="gi === 0">
              <a
                v-for="(link, li) in col.links"
                :key="link"
                class="apple-nav__biglink"
                :style="stagger(li, gi)"
                href="#"
                @click.prevent
              >{{ link }}</a>
            </template>
            <!-- 第二三列：中号链接 -->
            <template v-else>
              <a
                v-for="(link, li) in col.links"
                :key="link"
                class="apple-nav__midlink"
                :style="stagger(li, gi)"
                href="#"
                @click.prevent
              >{{ link }}</a>
            </template>
            <a
              v-for="(link, fi) in (col.footLinks || [])"
              :key="'f-' + link"
              class="apple-nav__footlink"
              :style="stagger(col.links.length + fi, gi)"
              href="#"
              @click.prevent
            >{{ link }}</a>
          </div>
        </div>
      </div>
    </transition>
  </header>
  </div>
</template>

<script>
/**
 * AppleNav —— 严格按 apple.com.cn globalnav 样式还原
 * - 44px，rgba(22,22,23,.8) + saturate(180%) blur(20px)
 * - 展开面板 #161617；大链接 28px/600；分类标题 rgb(110,110,115)
 * - 错峰淡入 .32s cubic-bezier(.4,0,.6,1)；暗色幕布
 */
export default {
  name: 'AppleNav',
  data() {
    return {
      activeIndex: -1,
      showPanel: false,
      isClosing: false,
      closeTimer: null,
      menus: [
        {
          label: '商店',
          columns: [
            { heading: '选购', links: ['选购最新产品', 'Mac', 'iPad', 'iPhone', 'Apple Watch', 'Apple Vision Pro', 'AirPods', '配件'] },
            { heading: '快速链接', links: ['查找零售店', '订单状态', 'Apple Trade In 换购计划', '分期付款', '个人设置辅导'] },
            { heading: '专属商店选购', links: ['认证的翻新产品', '教育', '商务'] },
          ],
        },
        {
          label: 'Mac',
          columns: [
            {
              heading: '探索 Mac',
              links: ['探索全部 Mac 机型', 'MacBook Neo', 'MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini', 'Mac Studio', '显示器'],
              footLinks: ['Mac 机型比较', '从 PC 换成 Mac'],
            },
            { heading: '选购 Mac', links: ['选购 Mac', 'Mac 配件', 'Apple Trade In 换购计划', '分期付款', '个人设置辅导'] },
            { heading: 'Mac 相关', links: ['Mac 支持', 'AppleCare', 'OS 27', 'Apple 打造的 App', 'Apple 创作坊', '配合 iPhone 更好用', 'iCloud+', 'Mac 商务应用', '教育', 'Apple at Work'] },
          ],
        },
        {
          label: 'iPad',
          columns: [
            {
              heading: '探索 iPad',
              links: ['探索全部 iPad 机型', 'iPad Pro', 'iPad Air', 'iPad', 'iPad mini', 'Apple Pencil', '键盘'],
              footLinks: ['iPad 机型比较'],
            },
            { heading: '选购 iPad', links: ['选购 iPad', 'iPad 配件', 'Apple Trade In 换购计划', '分期付款', '个人设置辅导'] },
            { heading: 'iPad 相关', links: ['iPad 支持', 'AppleCare', 'OS 27', 'Apple 打造的 App', 'Apple 创作坊', 'iCloud+', '教育', 'Apple at Work'] },
          ],
        },
        {
          label: 'iPhone',
          columns: [
            {
              heading: '探索 iPhone',
              links: ['探索全部 iPhone 机型', 'iPhone Duo', 'iPhone 18 Pro', 'iPhone Air', 'iPhone 17', 'iPhone 17e', 'iPhone 16'],
              footLinks: ['iPhone 机型比较', '换成 iPhone'],
            },
            { heading: '选购 iPhone', links: ['选购 iPhone', 'iPhone 配件', 'Apple Trade In 换购计划', '分期付款', '个人设置辅导'] },
            { heading: 'iPhone 相关', links: ['iPhone 支持', 'AppleCare', 'OS 27', 'Apple 打造的 App', 'iPhone 隐私保护', '配合 Mac 更好用', 'iCloud+', 'Apple Pay', 'Siri', 'Apple at Work'] },
          ],
        },
        {
          label: 'Watch',
          columns: [
            {
              heading: '探索 Apple Watch',
              links: ['探索全部 Apple Watch 表款', 'Apple Watch Series 12', 'Apple Watch Ultra 4', 'Apple Watch SE 3', 'Apple Watch Nike', 'Apple Watch Hermès'],
              footLinks: ['Apple Watch 表款比较', 'Apple Watch 哪里好'],
            },
            { heading: '选购 Apple Watch', links: ['选购 Apple Watch', 'Apple Watch 表带', 'Apple Watch 配件', 'Apple Trade In 换购计划', '分期付款', '个人设置辅导'] },
            { heading: 'Apple Watch 相关', links: ['Apple Watch 支持', 'AppleCare', 'OS 27', 'Apple 打造的 App', '教育'] },
          ],
        },
        {
          label: 'Vision',
          columns: [
            { heading: '探索 Apple Vision Pro', links: ['探索 Apple Vision Pro'], footLinks: ['技术规格'] },
            { heading: '选购 Apple Vision Pro', links: ['选购 Apple Vision Pro', 'Apple Vision Pro 配件', '预约演示试用', '分期付款', '个人设置辅导'] },
            { heading: 'Apple Vision Pro 相关', links: ['Apple Vision Pro 支持', 'AppleCare', 'OS 27'] },
          ],
        },
        {
          label: 'AirPods',
          columns: [
            { heading: '探索 AirPods', links: ['探索全部 AirPods 机型', 'AirPods 5', 'AirPods Pro 3', 'AirPods Max 2'], footLinks: ['AirPods 机型比较'] },
            { heading: '选购 AirPods', links: ['选购 AirPods 5', '选购 AirPods Pro 3', '选购 AirPods Max 2', 'AirPods 配件'] },
            { heading: 'AirPods 相关', links: ['AirPods 支持', 'AppleCare', 'Apple Music'] },
          ],
        },
        {
          label: '家居',
          columns: [
            { heading: '探索家居', links: ['探索家居项目', 'HomePod', 'HomePod mini'] },
            { heading: '选购家居设备', links: ['选购 HomePod', '选购 HomePod mini', '家居配件'] },
            { heading: '家居相关', links: ['HomePod 支持', 'AppleCare', '家庭 App', 'Apple Music', 'Siri', '隔空播放'] },
          ],
        },
        {
          label: '娱乐',
          columns: [
            { heading: '探索娱乐', links: ['探索娱乐内容', 'Apple Music', 'Apple 播客', 'App Store'] },
            { heading: '技术支持', links: ['Apple Music 支持'] },
          ],
        },
        {
          label: '配件',
          columns: [
            { heading: '选购配件', links: ['选购所有配件', 'Mac', 'iPad', 'iPhone', 'Apple Watch', 'Apple Vision Pro', 'AirPods', '家居'] },
            { heading: '探索配件', links: ['来自 Apple 的配件', 'Beats', 'AirTag'] },
          ],
        },
        {
          label: '技术支持',
          columns: [
            { heading: '探索技术支持', links: ['iPhone', 'Mac', 'iPad', 'Watch', 'Apple Vision Pro', 'AirPods', 'Music'], footLinks: ['探索各类技术支持'] },
            { heading: '获取帮助', links: ['社区', '查看保修服务', 'Genius Bar 天才吧', '维修'] },
            { heading: '实用主题', links: ['获取 AppleCare', 'Apple 账户和密码', '账单和订阅', '无障碍使用'] },
          ],
        },
      ],
    };
  },
  computed: {
    dropColumns() {
      const item = this.menus[this.activeIndex];
      return item ? item.columns : [];
    },
  },
  methods: {
    // 错峰延迟：第 li 项 * 20ms + 第 gi 组 * 80ms（官网公式）
    stagger(li, gi) {
      return { transitionDelay: `${li * 20 + (gi + 1) * 80}ms` };
    },
    openMenu(index) {
      clearTimeout(this.closeTimer);
      this.isClosing = false;
      this.activeIndex = index;
      this.showPanel = true;
    },
    scheduleClose() {
      clearTimeout(this.closeTimer);
      this.closeTimer = setTimeout(() => {
        // 文案先淡出，再收空面板
        this.isClosing = true;
        this.showPanel = false;
      }, 200);
    },
    cancelClose() { clearTimeout(this.closeTimer); },
    afterLeave() {
      this.activeIndex = -1;
      this.isClosing = false;
    },
  },
  beforeDestroy() { clearTimeout(this.closeTimer); },
};
</script>

<style lang="scss" scoped>
.apple-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 2000;
  height: 44px;
  background: rgba(22, 22, 23, 1);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  color: rgba(255, 255, 255, 0.8);
  font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif;
}
/* 展开时导航条本体变为不透明深色 */
.apple-nav.is-open { background: #161617; }

.apple-nav__inner {
  max-width: 1024px; height: 44px; margin: 0 auto; padding: 0 22px;
  display: flex; align-items: center;
}
.apple-nav__logo { display: flex; align-items: center; opacity: 0.8; color: rgba(255,255,255,0.8); }
.apple-nav__logo:hover { opacity: 1; }
.apple-nav__logo svg { display: block; width: 16px; height: auto; margin-right: 28px; fill: currentColor; }

.apple-nav__menu { flex: 1; display: flex; justify-content: space-between; }
.apple-nav__item { display: flex; align-items: center; }
/* 官网：12px / 400 / letter-spacing 0（中文） */
.apple-nav__link {
  font-size: 12px; line-height: 1; font-weight: 400; letter-spacing: 0em;
  color: rgba(255, 255, 255, 0.8); padding: 0 8px; white-space: nowrap;
  transition: color 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}
.apple-nav__link:hover { color: #fff; }

.apple-nav__actions { display: flex; align-items: center; }
.apple-nav__icon { display: flex; align-items: center; opacity: 0.8; margin-left: 28px; color: rgba(255,255,255,0.8); }
.apple-nav__icon:hover { opacity: 1; }
.apple-nav__icon svg { display: block; width: 15px; height: auto; fill: currentColor; }

/* 暗色幕布：遮罩面板下方页面，展开时淡入、收起时淡出 */
.apple-nav__curtain {
  position: fixed; top: 44px; left: 0; right: 0;
  height: calc(100vh - 44px);
  background: rgba(0, 0, 0, 0.4);
  -webkit-backdrop-filter: saturate(180%) blur(40px);
  backdrop-filter: saturate(180%) blur(40px);
  z-index: 1999;
}

/* 下拉面板 #161617 */
.apple-nav__flyout {
  position: fixed; top: 44px; left: 0; right: 0;
  background: #161617;
  z-index: 2;
}
.apple-nav__flyout-inner {
  max-width: 1024px; margin: 0 auto;
  padding: 40px 22px 56px;
  display: flex; gap: 64px;
}
.apple-nav__col { min-width: 150px; }
.apple-nav__col-head {
  margin: 0 0 16px;
  font-size: 12px; line-height: 1.2; font-weight: 400;
  letter-spacing: -0.01em; color: rgb(110, 110, 115);
  /* 错峰淡入 */
  opacity: 0; transform: translateY(-4px);
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1), transform 0.32s cubic-bezier(0.4, 0, 0.6, 1);
}
/* 展开态：全部淡入 */
.apple-nav.is-open .apple-nav__col-head,
.apple-nav.is-open .apple-nav__biglink,
.apple-nav.is-open .apple-nav__footlink { opacity: 1; transform: translateY(0); }
/* 官网：首列大链接 24px / 600 */
.apple-nav__biglink {
  display: block; font-size: 24px; line-height: 1.16; font-weight: 600;
  letter-spacing: 0.007em; color: #f5f5f7;
  margin-bottom: 10px;
  opacity: 0; transform: translateY(-4px);
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1), transform 0.32s cubic-bezier(0.4, 0, 0.6, 1), color 0.2s;
}
.apple-nav__biglink:hover { color: #2997ff; }
/* 第二三列中号链接：17px / 600 */
.apple-nav__midlink {
  display: block; font-size: 17px; line-height: 1.4; font-weight: 600;
  color: #f5f5f7; margin-bottom: 6px;
  opacity: 0; transform: translateY(-4px);
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1), transform 0.32s cubic-bezier(0.4, 0, 0.6, 1), color 0.2s;
}
.apple-nav.is-open .apple-nav__midlink { opacity: 1; transform: translateY(0); }
.apple-nav__midlink:hover { color: #2997ff; }
/* 列底部小字链接（如 Mac 机型比较） */
.apple-nav__footlink {
  display: block; font-size: 12px; line-height: 1.33; font-weight: 400;
  color: #f5f5f7; margin-top: 14px;
  opacity: 0; transform: translateY(-4px);
  transition: opacity 0.32s cubic-bezier(0.4, 0, 0.6, 1), transform 0.32s cubic-bezier(0.4, 0, 0.6, 1), color 0.2s;
}
.apple-nav__footlink:hover { color: #2997ff; }

/* 面板：固定在导航下边缘，向下展开 / 向上收起 */
.flyout-enter-active, .flyout-leave-active {
  transition: transform 0.38s cubic-bezier(0.4, 0, 0.6, 1);
  transform-origin: top;
}
.flyout-enter, .flyout-leave-to { transform: scaleY(0); }

/* 收起瞬间文案立即清空，只剩空面板上收 */
.apple-nav.is-closing .apple-nav__col-head,
.apple-nav.is-closing .apple-nav__biglink,
.apple-nav.is-closing .apple-nav__midlink,
.apple-nav.is-closing .apple-nav__footlink {
  transition-delay: 0ms !important;
  transition-duration: 0s;
}

/* 幕布淡入 */
.curtain-enter-active, .curtain-leave-active { transition: opacity 0.32s ease; }
.curtain-enter, .curtain-leave-to { opacity: 0; }
</style>
