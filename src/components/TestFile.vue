<template>
    <div class="hello">
        <button @click="startAudio" :disabled="isRecording">开始录制</button>
        <button @click="stopAudio" :disabled="!isRecording">停止录制</button>
        <div v-for="img in defects" :key="img.id">
            <!-- <el-checkbox @change="checkImg(img)" :v-model="deleteArr.includes(img.id) ? true : false"></el-checkbox> -->
            <el-checkbox @change="checkImg(img)" :value="deleteArr.includes(img.id)"></el-checkbox>
            <img style="width: 100px;height: 100px;" :src="img.src" alt="">
            <span>{{ img.name }}</span>
        </div>
        <div @click="deleteImg">批量删除</div>
        <div @click="changeClass">切换异常部件</div>
        <TestFile :multiple="true"></TestFile>
    </div>
</template>

<script>
/* eslint-disable */
import TestFile from './TestFile.vue'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    components: {
        TestFile
    },
    data() {
        return {
            audioData: [],
            isRecording: false,
            audioContext: null,
            scriptNode: null,
            mediaRecorder: null,
            audioChunks: [],
            mp3Data: null,
            deleteArr: [],
            defects: [{
                id: '001',
                src: "https://img0.baidu.com/it/u=3847178919,3968767388&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666",
                name: "图片001"
            }, {
                id: '002',
                src: "https://img1.baidu.com/it/u=708565728,391958346&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667",
                name: "图片002"
            }, {
                id: '003',
                src: "https://img1.baidu.com/it/u=2730940331,1040419597&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750",
                name: "图片003"
            }]
        }
    },
    mounted() { },
    methods: {

        checkImg(img) {
            if (this.deleteArr.includes(img.id)) {
                this.deleteArr = this.deleteArr.filter(item => item !== img.id)
            } else {
                this.deleteArr.push(img.id)
            }
        },
        deleteImg() {
            console.log(this.deleteArr);
        },
        changeClass() {
            // this.defects = [{
            //   id: '004',
            //   src: "https://img0.baidu.com/it/u=3847178919,3968767388&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=668",
            //   name: "图片004"
            // }, {
            //   id: '005',
            //   src: "https://img1.baidu.com/it/u=708565728,391958346&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=669",
            //   name: "图片005"
            // }, {
            //   id: '006',
            //   src: "https://img1.baidu.com/it/u=2730940331,1040419597&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=770 ",
            //   name: "图片006"
            //   }]
            this.deleteArr = [];
            console.log(this.deleteArr);
            this.$forceUpdate();
        },

        startAudio() {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    this.audioData = []; // 清空之前的录音数据
                    this.isRecording = true; // 更新录音状态
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const source = this.audioContext.createMediaStreamSource(stream);
                    this.scriptNode = this.audioContext.createScriptProcessor(4096, 1, 1);
                    source.connect(this.scriptNode);
                    this.scriptNode.connect(this.audioContext.destination);
                    this.scriptNode.onaudioprocess = this.handleAudioProcess;
                })
                .catch(err => {
                    console.error('访问麦克风出错：', err);
                });
        },
        stopAudio(flag = true) {
            this.scriptNode.onaudioprocess = null;
            if (this.audioContext) {
                this.audioContext.close();
                flag && (this.audioContext = null);
            }
            this.isRecording = false; // 更新录音状态
        },
        handleAudioProcess(event) {
            const audioData = event.inputBuffer.getChannelData(0);
            // 将音频数据转换为二进制数据
            const binaryData = this.convertToBinary(audioData);
            // 输出二进制数据到控制台
            console.log(binaryData);
        },
        // 将音频数据转换为二进制数据
        convertToBinary(audioData) {
            const buffer = new ArrayBuffer(audioData.length * 2); // Int16Array 占用 2 个字节
            const view = new Int16Array(buffer);
            for (let i = 0; i < audioData.length; i++) {
                view[i] = audioData[i] * 0x7fff; // 将音频数据映射到 [-32768, 32767] 的范围
            }
            return new Uint8Array(buffer);
        },
    },
    beforeDestroy() {
        this.stopAudio();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
