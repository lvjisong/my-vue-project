<template>
    <div>
        <!-- 文件/文件夹上传选择器，使用Element UI的el-upload组件 -->
        <el-upload ref="uploadFile" 
            :action="uploadParams.uploadUrl" 
            :multiple="uploadParams.multiple"
            :before-upload="beforeUpload" 
            :http-request="customUpload" 
            :show-file-list="uploadParams.showFileList"
            :accept="uploadParams.fileTypes">
            <el-button @click="chooseFile">选择{{ uploadParams.webkitdirectory?'文件夹':'文件'}}</el-button>
            <el-button style="margin-left: 10px;" @click="submitUpload">开始上传</el-button>
        </el-upload>
    </div>
</template>

<script>
import SparkMD5 from 'spark-md5'; // 使用spark-md5库进行MD5加密

export default {
    name: 'FileUploader',
    props: {
        uploadParams: {
            type: Object,
            default: () => ({
                multiple: true, // 默认允许多选
                fileTypes: '', // 默认文件类型为空
                uploadUrl: '', // 默认上传地址为空
                webkitdirectory: false, // 默认不上传文件夹
                showFileList: false, // 默认不显示文件列表
                sliceSize: 0, // 默认不切片
                md5: false, // 默认不加密
                id: '', // 默认id为空
            })
        },
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
        console.log('切片大小' + this.uploadParams.sliceSize);
        console.log('文件类型' + this.uploadParams.fileTypes);
        console.log('上传接口' + this.uploadParams.uploadUrl);
        console.log('是否上传文件夹' + this.uploadParams.webkitdirectory);
        console.log('是否显示文件列表' + this.uploadParams.showFileList);
        console.log('是否加密' + this.uploadParams.md5);
        console.log('id' + this.uploadParams.id);
    },

    methods: {

        // 选择文件或文件夹
        chooseFile() {
            this.$refs.uploadFile.$children[0].$refs.input.webkitdirectory = this.webkitdirectory;
        },

        // 上传前钩子函数
        beforeUpload(file) {
            this.fileSelected = true; // 标记文件已选择
            if (this.uploadParams.sliceSize > 0) {
                this.fileSlice(file); // 对文件进行切片
            } else if (this.uploadParams.sliceSize === 0 && this.uploadParams.md5) {
                this.fileMD5Fun(file); // 对文件进行MD5加密
            }
            return false; // 阻止自动上传，等待自定义上传逻辑执行
        },

        // 开始上传
        submitUpload() {
            // 文件是否选择
            if (!this.fileSelected) {
                this.$message.error('请先选择文件');
                return;
            }
            // 是否需要切片，但文件未切片
            if (this.uploadParams.sliceSize>0 && !this.fileSliced) {
                this.$message.error('文件尚未处理完成，请稍候');
                return;
            }
            // 是否需要MD5加密，但文件未加密
            if (this.uploadParams.md5 && !this.fileMD5) {
                this.$message.error('文件尚未处理完成，请稍候');
                return;
            }
            // 自定义上传逻辑
            this.customUpload(); 
        },

        // 自定义上传逻辑
        customUpload() {
            // 如果切片了，则进行循环上传
            if (this.uploadParams.sliceSize > 0 && this.fileSliced) {
                // 自定义上传逻辑，逐个上传文件切片
                this.fileChunks.forEach((chunk, index) => {
                    const formData = new FormData();
                    formData.append('file', chunk);
                    formData.append('chunkNumber', index);
                    // 如果md5加密，则需要将md5值一并上传
                    if (this.uploadParams.md5) {
                        formData.append('md5', this.fileMD5);
                    }
                    // 通过XMLHttpRequest或fetch API发送formData到后端
                });
            } else {
                const formData = new FormData();
                formData.append('file', this.$refs.uploadFile.uploadFiles[0].raw);
                // 如果md5加密，则需要将md5值一并上传
                if (this.uploadParams.md5) {
                    formData.append('md5', this.fileMD5);
                }
                // 通过XMLHttpRequest或fetch API发送formData到后端
            }
        },

        // 异步函数，用于处理文件的切片
        async fileSlice(file) {
            this.fileChunks = [];
            const chunkSize = this.sliceSize;
            let currentChunk = 0;
            // 循环切片文件
            while (currentChunk < file.size) {
                const chunk = file.slice(currentChunk, Math.min(file.size, currentChunk + chunkSize));
                this.fileChunks.push(chunk);
                currentChunk += chunkSize;
            }
            // 如果不需要加密，则直接标记文件已切片
            if(!this.uploadParams.md5) {
                this.fileSliced = true;
                return;
            }
            // 如果需要加密，则计算文件的MD5值
            this.fileMD5 = '';
            const fileReader = new FileReader();
            const spark = new SparkMD5.ArrayBuffer();
            // 异步读取每个切片并计算MD5
            for (let chunk of this.fileChunks) {
                await new Promise((resolve) => {
                    fileReader.onload = (e) => {
                        spark.append(e.target.result); // 将读取到的切片内容添加到spark-md5中
                        resolve();
                    };
                    fileReader.readAsArrayBuffer(chunk); // 以ArrayBuffer的形式读取文件切片
                });
            }
            this.fileMD5 = spark.end(false); // 完成所有切片的读取和MD5计算后，获取最终的MD5值
            this.fileSliced = true; // 标记文件已切片并完成MD5加密
        },
        // 异步函数，用于计算文件的MD5值
        async fileMD5Fun(file) {
            this.fileMD5 = '';
            const fileReader = new FileReader();
            const spark = new SparkMD5.ArrayBuffer();
            await new Promise((resolve) => {
                fileReader.onload = (e) => {
                    spark.append(e.target.result); // 将读取到的文件内容添加到spark-md5中
                    resolve();
                };
                fileReader.readAsArrayBuffer(file); // 以ArrayBuffer的形式读取文件
            });
            this.fileMD5 = spark.end(false); // 完成文件的读取和MD5计算后，获取最终的MD5值
        },

    },
};
</script>

<style>
/* 这里可以添加组件的样式 */
</style>
