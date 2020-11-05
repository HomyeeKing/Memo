<template>
  <div>
    <v-snackbar top v-model="snackbar" color="cyan darken-2">
      考研单词 共{{total}}个
      <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <main class="content d-flex felx-column justify-center">
      <div>
        <v-btn @click="startLearn" style="margin-bottom:20px" color="secondary" class="primary--text font-weight-bold">学习当前页 👉</v-btn>
      </div>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">单词</th>
              <th class="text-left">音标</th>
              <th class="text-left">翻译</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="item.phoSymbol+index">
              <td>{{ item.word }}</td>
              <td>
                <span style="margin-right:10px">{{ item.phoSymbol }}</span>
                <a
                  class="el-icon-microphone"
                  href="javascript:void(0)"
                  :name="item.audio"
                  @click="play($event,index)"
                ></a>
                <audio ref="audio"></audio>
              </td>
              <td>{{item.translation}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- <el-table :data="tableData" style="width:600px;margin:20px">
        <el-table-column prop="word" label="单词" width="180"></el-table-column>
        <el-table-column label="音标" width="180">
          <template slot-scope="scope" v-if="scope.row.audio">
            <span style="margin-right:10px">{{ scope.row.phoSymbol }}</span>
            <a  class="el-icon-microphone" href="javascript:void(0)" :name="scope.row.audio" @click="play"></a>
            <audio ref="audio">     </audio>
          </template>
        </el-table-column>
        <el-table-column prop="translation" label="注释"></el-table-column>
      </el-table>-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="range"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </main>
  </div>
</template>

<script>
export default {
  mounted() {
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
        { text: "单词", value: "word", align: "center" },
        { text: "音标", value: "phoSymbol", align: "center" },
        { text: "发音", value: "audio", align: "center" },
        { text: "注释", value: "translation", align: "center" }
      ] //表头
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
        .get("/getWords", { params: { currentPage: cur, range: range,which:"computer" } })
        .then(res => {
          let { count, docs } = res.data;
          this.total = count;
          this.tableData = docs;
        });
    },
    startLearn() {
      this.$router.push(`/learn/${this.currentPage}/${this.range}/computer`);
    },
    play(e,index) {     
      this.$refs.audio[index].src = e.target.name;
      this.$refs.audio[index].pause();
      this.$refs.audio[index].play();
    }
  }
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

main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>