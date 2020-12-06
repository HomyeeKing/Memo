<template>
    <div>
        <v-file-input
            v-model="textFile"
            accept=".txt,.doc,.docx"
            placeholder="上传单词文件，只支持.txt,.doc,.docx,格式:每行一个单词及其注释"
        ></v-file-input>

        <v-btn outlined @click="upload">上传</v-btn>
        <template v-if="total <= 0">
            <h1>啊呀，现在还没有任何单词呢，赶紧上传文件吧</h1>
        </template>
        <template v-else>
            <word-show-list
                :page-info="{ total, range, currentPage }"
                :table-data="tableData"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                @start-learn="startLearn"
            />
        </template>
    </div>
</template>

<script>
import wordShowList from '@/components/wordShowList';

export default {
    name: 'theZone',
    components: { wordShowList },
    created() {
        this.owner = this.$route.params.owner;
        this.init();
    },
    data: () => ({
        textFile: null,
        owner: '',
        total: 0,
        range: 10,
        currentPage: 1,
        tableData: [],
    }),
    methods: {
        init() {
            this.getWords(this.currentPage, this.range);
            this.textFile = null;
        },
        async upload() {
            const formData = new FormData();
            formData.append('doc', this.textFile);
            formData.append('owner', this.owner);
            const {
                data: { msg },
            } = await this.$http.post('/upload', formData);
            alert(msg);
            this.init();
        },
        handleSizeChange(val) {
            this.range = val;
            this.getWords(this.currentPage, val);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getWords(val, this.range);
        },
        getWords(cur, range) {
            this.$http
                .get('/getWords', {
                    params: {
                        currentPage: cur,
                        range: range,
                        which: this.owner,
                    },
                })
                .then((res) => {
                    let { count, docs } = res.data;
                    this.total = count;
                    this.tableData = docs;
                });
        },
        startLearn() {
            this.$router.push(
                `/learn/${this.currentPage}/${this.range}/${this.owner}`
            );
        },
    },
};
</script>

