<template>
  <div class="cart-page">
    <h1>购物袋</h1>
    <p v-if="loading">加载中…</p>
    <p v-else-if="error" class="err">{{ error }}</p>

    <template v-else>
      <ul v-if="list.length" class="cart-list">
        <li v-for="item in list" :key="item.id" class="cart-item">
          <div class="name">{{ item.name }}</div>
          <div class="qty">× {{ item.qty }}</div>
          <div class="price">¥{{ item.price }}</div>
        </li>
      </ul>
      <p v-else class="empty">购物袋是空的，去 <router-link to="/">首页</router-link> 逛逛吧。</p>
    </template>

    <button class="back" @click="$router.back()">返回</button>
  </div>
</template>

<script>
import { getCartList } from "@/api";

export default {
  name: "CartPage",
  data() {
    return {
      loading: false,
      error: "",
      list: [], // 购物车数据
    };
  },
  async mounted() {
    this.loading = true;
    try {
      // GET /cart/list?page=1&size=10
      const res = await getCartList({ page: 1, size: 10 });
      // request.js 已解包，res 就是后端返回的 data 部分
      this.list = res.items || res || [];
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.cart-page {
  padding: 120px 24px;
  max-width: 980px;
  margin: 0 auto;
  h1 {
    font-size: 40px;
    margin-bottom: 16px;
  }
  .err {
    color: #b00020;
  }
  .cart-list {
    li.cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid #e5e5ea;
      .price {
        font-weight: 600;
      }
    }
  }
  .back {
    @include btn-outline;
    margin-top: 24px;
  }
}
</style>
