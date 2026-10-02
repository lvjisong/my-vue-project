<template>
  <div class="login-page">
    <h1>登录</h1>
    <p>演示登录页。点击下方按钮模拟登录后跳回原页面。</p>
    <button class="btn" @click="fakeLogin">模拟登录</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    fakeLogin() {
      localStorage.setItem('token', 'demo-token-' + Date.now())
      const redirect = this.$route.query.redirect || '/'
      this.$router.replace(redirect)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  padding: 120px 24px;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
  h1 { font-size: 40px; margin-bottom: 16px; }
  .btn { @include btn-primary; margin-top: 16px; }
}
</style>
