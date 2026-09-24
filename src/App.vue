<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <TestFile></TestFile>

  </div>
</template>

<script>
/* eslint-disable */
import HelloWorld from './components/HelloWorld.vue'
import TestFile from './components/TestFile.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    TestFile
  },
  data() {
        return {
            fileSelected: false, // 标记是否已选择文件
            fileSliced: false, // 标记是否已完成文件切片
            fileMD5: '', // 存储文件的MD5值
            fileChunks: [], // 存储文件切片数组
        };
    },
    mounted() {
        console.log('是否开启多选' + this.uploadParams.multiple);
        
    },

    methods: {

    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
