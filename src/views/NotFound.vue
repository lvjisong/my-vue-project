<template>
  <div class="not-found">
    <h1>404</h1>
    <p>我们找不到你要的页面。</p>
    <router-link to="/" class="not-found__btn">返回首页</router-link>
  </div>
</template>

<script>
export default { name: 'NotFound' }
</script>

<style scoped>
.not-found {
  min-height: 100vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px;
  background: #f5f5f7; color: #1d1d1f; font-family: -apple-system, sans-serif;
}
.not-found h1 { font-size: 80px; margin: 0; }
.not-found p { font-size: 18px; color: #6e6e73; }
.not-found__btn {
  background: #0071e3; color: #fff; padding: 10px 22px;
  border-radius: 999px; text-decoration: none; font-size: 15px;
}
</style>
