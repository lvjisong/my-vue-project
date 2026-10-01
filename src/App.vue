<template>
  <div id="app">
    <!-- Apple 官网首页复刻（组件化，纯交互模拟） -->
    <AppleHome />

    <!-- Apple 风格文件上传组件-->
    <!-- <apple-file-upload :uploadParams="uploadParams" /> -->
  </div>
</template>

<script>
import AppleHome from './components/apple-home/AppleHome.vue'
// import AppleFileUpload from './components/AppleFileUpload.vue'
export default {
  name: 'App',
  components: {
    AppleHome,
    // AppleFileUpload
  },
  data() {
    return {
      // 文件上传配置：仅传入需要覆盖默认值的项即可，其余用组件默认值
      uploadParams: {
        multiple: true, // 是否多选
        fileTypes: '.jpg,.jpeg,.png,.gif', // 文件类型（空字符串表示不限）
        uploadUrl: 'https://www.xxx.com:8080', // 真实上传接口地址
        webkitdirectory: false, // 是否上传文件夹
        sliceSize: 0, // 切片大小（0 表示不切片）
        md5: false, // 是否计算 MD5
        maxFileSize: 100 * 1024 * 1024, // 单个文件大小上限（0 表示不限）
        maxFileCount: 4, // 最多可选文件数（0 表示不限）
        simulate: true, // 是否模拟上传（true 预览动画，false 走真实接口）
        mockError: false, // 模拟接口是否返回错误（true 演示报错弹窗）
      }
    }
  },
  mounted() {
    console.log('页面挂载完成')
  },
  methods: {}
}
</script>

<style lang="scss">
/* 去掉浏览器默认 body 边距，让 Hero 紧贴浏览器边缘 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue',
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1d1d1f;
}
/* 全局去掉所有链接下划线 */
a, a:hover, a:focus, a:active {
  text-decoration: none;
}
</style>
