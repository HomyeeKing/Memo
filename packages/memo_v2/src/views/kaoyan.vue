<template>
    <div>
        <v-snackbar top v-model="snackbar" color="cyan darken-2">
            考研单词 共{{ total }}个
            <v-btn text @click="snackbar = false">Close</v-btn>
        </v-snackbar>

        <word-show-list
            :page-info="{ total, range, currentPage }"
            :table-data="tableData"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @start-learn="startLearn"
        />
    </div>
</template>

<script>
import wordShowList from '@/components/wordShowList';

export default {
    components: { wordShowList },
    created() {
        this.getWords(this.currentPage, this.range);
        this.snackbar = true;
    },
    data() {
        return {
            total: 0,
            range: 10,
            currentPage: 1,
            tableData: [],
            snackbar: false,
            headers: [
                { text: '单词', value: 'word', align: 'center' },
                { text: '音标', value: 'phoSymbol', align: 'center' },
                { text: '发音', value: 'audio', align: 'center' },
                { text: '注释', value: 'translation', align: 'center' },
            ], //表头
        };
    },
    methods: {
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
                    params: { currentPage: cur, range: range, which: 'kaoyan' },
                })
                .then((res) => {
                    let { count, docs } = res.data;
                    this.total = count;
                    this.tableData = docs;
                });
        },
        startLearn() {
            this.$router.push(
                `/learn/${this.currentPage}/${this.range}/kaoyan`
            );
        },
    },
};
</script>

<style lang="stylus" scoped>
hub = rgb(254, 154, 0);

header {
  width: 100%;
  height: 100px;
  background-color: #2B3648;
  text-align: center;
  line-height: @height;
  position: relative;
  display: flex;
  flex-direction: collum;
  justify-content: center;
  align-items: center;

  & h1 {
    color: hub;
    font-size: 2rem;
  }
}
</style>