<template>
  <!-- 查询参数示例页：/search?q=iPhone&page=2 -->
  <div class="page search-page">
    <h1>搜索结果页</h1>
    <p class="search-page__info">
      搜索词：<strong>{{ keyword }}</strong>
    </p>
    <p class="search-page__info">
      当前第：<strong>{{ page }}</strong> 页
    </p>
    <p class="search-page__info">
      分类：<strong>{{ category }}</strong>
    </p>

    <p class="search-page__desc">
      这是查询参数示例，URL 后面的 <code>?q=xxx&page=2</code> 通过
      <code>$route.query</code> 接收。刷新页面参数还在，适合传搜索词、页码、筛选条件。
    </p>

    <div class="search-page__actions">
      <button @click="goBack">返回首页</button>
      <button @click="goProduct">去产品详情页（带路径参数）</button>
    </div>
  </div>
</template>

<script>
/**
 * Search.vue —— 查询参数传参示例
 * 路由：/search?q=xxx&page=2
 */
export default {
  name: "SearchPage",
  computed: {
    /** 搜索词（query 里都是字符串，默认空串） */
    keyword() {
      return this.$route.query.q || "（空）";
    },
    /** 页码（转成数字，默认第 1 页） */
    page() {
      return Number(this.$route.query.page) || 1;
    },
    /** 分类（默认 all） */
    category() {
      return this.$route.query.category || "all";
    },
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    /** 跳产品详情页，演示路径参数 */
    goProduct() {
      this.$router.push({
        name: "Product",
        params: { id: "iphone-18-pro" },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-page {
  max-width: 800px;
  margin: 80px auto;
  padding: 0 20px;

  &__info {
    font-size: 18px;
    color: #666;
    margin: 10px 0;
  }

  &__desc {
    color: #666;
    line-height: 1.6;
    margin: 30px 0;

    code {
      background: #f5f5f7;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 14px;
    }
  }

  &__actions {
    display: flex;
    gap: 12px;
  }
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  background: #0071e3;
  color: #fff;

  &:hover {
    opacity: 0.85;
  }
}
</style>
