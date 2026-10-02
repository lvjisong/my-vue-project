<template>
  <section
    ref="root"
    class="apple-hero"
    :class="[
      theme === 'dark' ? 'apple-hero--dark' : 'apple-hero--light',
      contentPosition === 'bottom' ? 'apple-hero--split' : '',
    ]"
    :style="{ backgroundColor: fallbackBg }"
  >
    <div v-if="image" ref="bg" class="apple-hero__bg" :style="{ backgroundImage: `url(${image})` }"></div>

    <!-- 顶部标题 -->
    <div ref="top" class="apple-hero__top">
      <h2 class="apple-hero__title">
        <svg v-if="showLogo" class="apple-hero__logo" viewBox="0 0 14 44" height="44" aria-hidden="true">
          <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"/>
        </svg>
        {{ title }}
      </h2>
      <!-- 顶部布局：副标题、小字、按钮都在标题下 -->
      <template v-if="contentPosition === 'top'">
        <p v-if="subtitle" class="apple-hero__subtitle">{{ subtitle }}</p>
        <p v-for="(line, i) in infoLines" :key="i" class="apple-hero__info">{{ line }}</p>
        <div v-if="links.length" class="apple-hero__cta">
          <a v-for="link in links" :key="link.text" href="#"
            class="apple-hero__btn"
            :class="link.type === 'primary' ? 'apple-hero__btn--primary' : 'apple-hero__btn--outline'"
            @click.prevent>{{ link.text }}</a>
        </div>
      </template>
    </div>

    <!-- 底部分栏：副标题、小字、按钮沉到底部 -->
    <div v-if="contentPosition === 'bottom'" ref="bottom" class="apple-hero__bottom">
      <p v-if="subtitle" class="apple-hero__subtitle">{{ subtitle }}</p>
      <p v-for="(line, i) in infoLines" :key="i" class="apple-hero__info">{{ line }}</p>
      <div v-if="links.length" class="apple-hero__cta">
        <a v-for="link in links" :key="link.text" href="#"
          class="apple-hero__btn"
          :class="link.type === 'primary' ? 'apple-hero__btn--primary' : 'apple-hero__btn--outline'"
          @click.prevent>{{ link.text }}</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppleHero',
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    infoLines: { type: Array, default: () => [] },
    links: { type: Array, default: () => [] },
    theme: { type: String, default: 'light' },
    image: { type: String, default: '' },
    fallbackBg: { type: String, default: '#fbfbfd' },
    showLogo: { type: Boolean, default: false },
    contentPosition: { type: String, default: 'top' }, // top | bottom
    parallax: { type: Number, default: 0.15 },
  },
  mounted() {
    // 无任何滚动特效，全部跟随页面自然滚动
  },
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.apple-hero {
  position: relative; width: 100%; min-height: 692px;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif;
  overflow: hidden;
}
.apple-hero--light { color: #1d1d1f; background: #f5f5f7; }
.apple-hero--dark { color: #f5f5f7; }
.apple-hero__bg {
  position: absolute; left: 0; right: 0; top: -10%; bottom: -10%;
  background-position: center bottom; background-repeat: no-repeat; background-size: cover;
  will-change: transform; z-index: 0;
}
.apple-hero__top { padding: 56px 22px 0; position: relative; z-index: 2; will-change: transform, opacity; }
.apple-hero__title {
  margin: 0; font-size: 56px; font-weight: 600; letter-spacing: -0.005em; line-height: 1.07;
  display: flex; align-items: center; justify-content: center; gap: 12px;
}
.apple-hero__logo { height: 120px; width: auto; fill: currentColor; }
.apple-hero__subtitle { margin: 4px 0 0; font-size: 28px; font-weight: 400; line-height: 1.2; }
.apple-hero__info { margin: 10px 0 0; font-size: 17px; line-height: 1.5; color: #6e6e73; }
.apple-hero__cta { margin-top: 22px; display: flex; gap: 18px; justify-content: center; }
.apple-hero__btn--primary { @include btn-primary; }
.apple-hero__btn--outline { @include btn-outline; }

/* 分栏布局：底部文字块 */
.apple-hero__bottom { margin-top: auto; padding: 0 22px 56px; position: relative; z-index: 2; }
.apple-hero--split .apple-hero__subtitle { margin: 0 0 18px; font-size: 21px; }

@media (max-width: 734px) {
  .apple-hero { min-height: 540px; }
  .apple-hero__title { font-size: 40px; }
  .apple-hero__subtitle { font-size: 24px; }
}
</style>
