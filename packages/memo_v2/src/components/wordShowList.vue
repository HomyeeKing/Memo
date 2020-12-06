<template>
    <main class="content d-flex felx-column justify-center">
        <div>
            <v-btn
                @click="startLearn"
                style="margin-bottom: 20px"
                color="secondary"
                class="primary--text font-weight-bold"
                >学习当前页 👉</v-btn
            >
        </div>

        <v-simple-table>
            <thead>
                <tr>
                    <th class="text-left">单词</th>
                    <th class="text-left">音标</th>
                    <th class="text-left">翻译</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tableData" :key="item.word">
                    <td>{{ item.word }}</td>
                    <td>
                        <span
                            style="margin-right: 10px"
                            v-if="item.phoSymbol"
                            >{{ item.phoSymbol }}</span
                        >
                        <template v-if="item.audio">
                            <a
                                class="el-icon-microphone"
                                href="javascript:void(0)"
                                :name="item.audio"
                                @click="play($event, index)"
                            ></a>
                            <audio ref="audio"></audio>
                        </template>
                    </td>
                    <td>{{ item.translation }}</td>
                </tr>
            </tbody>
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
            :current-page="pageInfo.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfo.range"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
        ></el-pagination>
    </main>
</template>

<script>
export default {
    name: 'wordShowList',
    props: {
        tableData: {
            type: Array,
            required: true,
        },
        pageInfo: {
            type: Object,
            default: () => ({
                currentPage: 1,
                total: 100,
                range: 10,
            }),
        },
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('size-change', val);
        },
        handleCurrentChange(val) {
            this.$emit('current-change', val);
        },
        startLearn() {
            this.$emit('start-learn');
        },
        play(e, index) {
            this.$refs.audio[index].src = e.target.name;
            this.$refs.audio[index].pause();
            this.$refs.audio[index].play();
        },
    },
};
</script>

<style scoped lang="stylus">
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>