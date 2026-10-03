<template>
  <div class="login-page">
    <h1>登录</h1>
    <p>演示登录页。点击下方按钮模拟登录后跳回原页面。</p>
    <button class="btn" @click="fakeLogin">模拟登录</button>
  </div>
</template>

<script>
import auth from "@/utils/auth";
export default {
  name: "LoginPage",
  methods: {
    fakeLogin() {
      // TODO-AUTH-LOGIN: 接后端前现在这样：假 token，写个随机数
      auth.setToken("demo-token-" + Date.now());
      // TODO-AUTH-LOGIN: 接后端后把下面1、2注释打开,把上面的代码注释掉：
      // 1. 调后端登录接口
      // const { data } = await post('/auth/login', {
      //   username: this.form.username,
      //   password: this.form.password
      // })
      // 2. 把后端返回的 token 存起来
      //   auth.setToken(data.token, data.user)
      //   auth.setRefreshToken(data.refresh_token)
      // 3. 跳回原页面
      const redirect = this.$route.query.redirect || "/";
      this.$router.replace(redirect);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  padding: 120px 24px;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
  h1 {
    font-size: 40px;
    margin-bottom: 16px;
  }
  .btn {
    @include btn-primary;
    margin-top: 16px;
  }
}
</style>
