<template>
  <div class="apple-tiles">
    <div
      v-for="tile in tiles"
      :key="tile.title"
      class="apple-tile"
      :class="tile.theme === 'dark' ? 'apple-tile--dark' : 'apple-tile--light'"
      :style="{ backgroundColor: tile.background }"
    >
      <div v-if="tile.image" class="apple-tile__bg" :style="{ backgroundImage: `url(${tile.image})` }"></div>
      <div v-if="tile.imageMobile" class="apple-tile__bg apple-tile__bg--mobile" :style="{ backgroundImage: `url(${tile.imageMobile})` }"></div>
      <div class="apple-tile__text">
        <h3 class="apple-tile__title">
          <svg v-if="tile.showLogo" class="apple-tile__logo" viewBox="0 0 14 44" height="44" aria-hidden="true">
            <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"/>
          </svg>
          {{ tile.title }}<em v-if="tile.titleAccent" class="apple-tile__accent">{{ tile.titleAccent }}</em>
        </h3>
        <p v-if="tile.subtitle" class="apple-tile__subtitle">{{ tile.subtitle }}</p>
        <div class="apple-tile__cta">
          <a
            v-for="link in tile.links"
            :key="link.text"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="apple-tile__btn"
            :class="link.type === 'primary' ? 'apple-tile__btn--primary' : 'apple-tile__btn--outline'"
          >{{ link.text }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppleTileGrid',
  props: { tiles: { type: Array, default: () => [] } },
};
</script>

<style lang="scss" scoped>
.apple-tiles {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
  background: #fff; padding: 12px;
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif;
}
.apple-tile {
  position: relative; min-height: 580px;
  display: flex; flex-direction: column; align-items: center; text-align: center;
  overflow: hidden;
}
.apple-tile--light { color: #1d1d1f; }
.apple-tile--dark { color: #f5f5f7; }
.apple-tile__bg {
  position: absolute; left: 0; right: 0; bottom: 0; top: 0;
  background-position: center bottom; background-repeat: no-repeat; background-size: cover; z-index: 0;
}
.apple-tile__text { padding: 56px 20px 0; position: relative; z-index: 2; }
.apple-tile__title {
  margin: 0; font-size: 32px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.1;
  display: flex; align-items: center; justify-content: center; gap: 8px;height: 40px;
}
.apple-tile__logo { height: 72px; width: auto; fill: currentColor; }
.apple-tile__accent { font-style: italic; color: #0071e3; font-weight: 400; }
.apple-tile__subtitle { margin: 8px auto 0; font-size: 21px; line-height: 1.4; max-width: 332px; }
.apple-tile__cta { margin-top: 20px; display: flex; gap: 16px; justify-content: center; }
.apple-tile__btn {
  display: inline-flex; align-items: center; font-size: 17px; padding: 9px 20px; border-radius: 999px;
  transition: transform 120ms ease-out, background-color 150ms ease-out;
}
.apple-tile__btn--primary { background: #0071e3; color: #fff; }
.apple-tile__btn--outline { border: 1px solid #0071e3; color: #0071e3; }
.apple-tile__btn--outline:hover { background: #0071e3; color: #fff; }
.apple-tile__btn:active { transform: scale(0.97); }
@media (max-width: 734px) {
  .apple-tiles { grid-template-columns: 1fr; padding: 0; gap: 12px; background: #fff; }
  .apple-tile { min-height: 500px; }
  .apple-tile__bg { display: none; }
  .apple-tile__bg--mobile { display: block; background-size: auto 100%; background-position: center bottom; }
  .apple-tile__text { padding: 24px 22px 0; }
  .apple-tile__title { font-size: 24px; }
  .apple-tile__subtitle { font-size: 15px; }
  .apple-tile__cta { margin-top: 12px; }
}
</style>
