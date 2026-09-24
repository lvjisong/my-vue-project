<template>
  <div class="hello">
    <appFileUpload :uploadParams="uploadParams">
    </appFileUpload>
  </div>
</template>

<script>
/* eslint-disable */
import appFileUpload from './appFileUpload.vue'
export default {
  name: 'HelloWorld',
  components: {
    appFileUpload
  },
  data() {
    return {
      uploadParams: {
        multiple: true,// 文件是否多选
        fileTypes: '.jpg,.jpeg,.png,.gif',// 文件类型
        uploadUrl: 'https://www.xxx.com:8080',// 接口路径示例
        webkitdirectory: false,//是否上传文件夹
        showFileList: false,// 是否显示文件列表
        sliceSize: 0,// 默认不切片
        md5:false,// 默认不加密
        id:'',// id默认为空
      }
    }
  },
  mounted() {},
  methods: {},
  beforeDestroy() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
