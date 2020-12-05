<template>
    <div>
        <v-file-input
            v-model="textFile"
            accept=".txt,.doc,.docx"
            placeholder="上传单词文件，只支持.txt,.doc,.docx,格式:每行一个单词及其注释"
        ></v-file-input>

        <v-btn outlined @click="upload">上传</v-btn>
    </div>
</template>

<script>
export default {
    name: 'theZone',
    data: () => ({
        textFile: null,
    }),
    methods: {
        upload() {
            const formData = new FormData();
            formData.append('doc', this.textFile);
            this.$http.post('/upload', formData);
        },
    },
};
</script>

<style>
</style>