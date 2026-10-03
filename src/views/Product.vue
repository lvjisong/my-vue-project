<template>
  <!-- 路径参数示例页：/product/iphone-18-pro -->
  <div class="page product-page">
    <h1>产品详情页</h1>
    <p class="product-page__id">
      产品 ID：<strong>{{ productId }}</strong>
    </p>
    <p class="product-page__desc">
      这是路径参数示例，URL 里的 <code>:id</code> 通过 <code>$route.params.id</code> 接收。
      刷新页面参数还在，适合传产品 ID 这种。
    </p>

    <!-- 加购物车按钮：演示 Vuex 传参 -->
    <button class="btn btn--primary" @click="addToCart">加入购物袋</button>

    <div class="product-page__actions">
      <button class="btn btn--primary" @click="goBack">返回首页</button>
      <!-- 演示查询参数跳转 -->
      <button class="btn btn--primary" @click="goSearch">去搜索页（带参数）</button>
    </div>
  </div>
</template>

<script>
/**
 * Product.vue —— 路径参数传参示例
 * 路由：/product/:id
 * 访问：/product/iphone-18-pro
 */
export default {
  name: "ProductPage",
  computed: {
    /** 从路径参数接收产品 ID */
    productId() {
      // $route.params 里的参数都是字符串
      return this.$route.params.id;
    },
  },
  methods: {
    /** 返回首页 */
    goBack() {
      this.$router.push("/");
    },
    /** 跳搜索页，带查询参数 */
    goSearch() {
      this.$router.push({
        path: "/search",
        query: {
          q: this.productId, // 把产品 ID 当搜索词传过去
          page: 1,
        },
      });
    },
    /** 加商品到购物车（演示 Vuex 传参） */
    addToCart() {
      this.$store.commit("CART_ADD_ITEM", {
        id: this.productId,
        name: `${this.productId} 手机`,
        price: 8999,
      });
      this.$message.success(`已加入购物袋！当前共 ${this.$store.getters.cartCount} 件商品`);
    },
  },
};
</script>

<style lang="scss" scoped>
.product-page {
  max-width: 800px;
  margin: 80px auto;
  padding: 0 20px;

  &__id {
    font-size: 18px;
    color: #666;
    margin: 20px 0;
  }

  &__desc {
    color: #666;
    line-height: 1.6;
    margin-bottom: 30px;

    code {
      background: #f5f5f7;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 14px;
    }
  }

  &__actions {
    margin-top: 30px;
    display: flex;
    gap: 12px;
  }
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }

  &--primary {
    background: #0071e3;
    color: #fff;
  }
}
</style>
