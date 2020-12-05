<template>
    <div id="root">
        <div class="homeTabs" v-if="cardLists.length > 0">
            <div
                class="grid-content"
                v-for="card in cardLists"
                :key="card.cardName"
                :style="card.cover ? `background:${card.cover.data}` : ''"
                @click="toVocabulary(card.cardName)"
            >
                <span class="porn">{{ card.cardName }}</span>
                <span class="hub">词汇</span>
            </div>
        </div>
        <div v-else>
            现在还没有什么模块，<router-link to="/createCards"
                >点击我</router-link
            >创建吧！
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cardLists: [],
        };
    },
    created() {
        this.getCards();
    },
    methods: {
        async getCards() {
            const { data } = await this.$http.get('/getCards');
            this.cardLists = data.data;
            console.log(this.cardLists);
        },
        toVocabulary(tab) {
            if (tab === '考研') {
                this.$router.push('/kaoyan');
            } else if (tab === '计算机') {
                this.$router.push('/computerEng');
            } else {
                this.$router.push('/theZone');
            }
        },
    },
};
</script>

<style lang="stylus" scoped>
.homeTabs {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

cardWidthpc = 400px;
cardHeightpc = 300px;

.grid-content {
  width: cardWidthpc;
  height: cardHeightpc;
  background-color: #000;
  font-weight: bold;
  text-align: center;
  line-height: @height;
  font-size: 3rem;
  box-shadow: 10px 5px 5px gray;
  cursor: pointer;
  margin: 10px;

  & .porn {
    color: #fff;
  }

  & .hub {
    color: #000;
    padding: 2px;
    background-color: rgb(254, 154, 0);
    border-radius: 10px;
    margin-left: 5px;
  }
}

@media screen and (min-width: 320px) and (max-width: 768px) {
  .homeTabs {
    flex-direction: column;
  }

  .grid-content {
    width: 100%;
    height: 200px;
    line-height: @height;
    font-size: 2rem;
    margin-bottom: 20px;
  }
}
</style>