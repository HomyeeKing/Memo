<template>
  <div id="root" class="d-flex flex-column">
    <v-alert v-model="complete" center type="success">恭喜你完成本轮训练！✌</v-alert>
    <!-- 自己写的 -->
    <!-- <div class="countTime">
      <canvas ref="canvas" width="100px" height="100px" id="canvas">该浏览器不支持canvas</canvas>
      <span class="time">{{countTime}}</span>
    </div>-->
    <div class="text-left">
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="countTime*(100/startTime)"
        color="primary"
      >{{ countTime }}</v-progress-circular>
    </div>

    <v-window
      flat
      tile
      ref="carousel"
      @change="carouChange"
      :vertical="true"
      :show-arrows="true"
      v-model="curIndex"
    >
      <v-window-item v-for="(word,index) in words" :key="word+index">
        <v-card class="wordCard" height="200">
          <template v-if="countTime">
            <div class="curWord">
              <span class="word">{{word.word}}</span>
              <span class="phoSymbol">{{word.phoSymbol}}</span>
            </div>
          </template>

          <template v-else>
            <v-text-field
              :rules="rules"
              label="拼写单词"
              color="primary"
              :autofocus="true"
              :clearable="true"
              ref="wordInput"
              @keyup.enter.native.stop.prevent="jump"
              v-model="val"
            ></v-text-field>
          </template>

          <div class="translation">
            <span style="margin-right:10px">释义：{{word.translation}}</span>
            <a class="el-icon-microphone" href="javascript:void(0)" @click="play"></a>
            <audio ref="audios" :src="word.audio" autoplay></audio>
          </div>
          <div class="review" v-if="word.review">
            <v-chip class="ma-2" color="primary" label text-color="warning--text">
              <v-icon left>mdi-label</v-icon>复习
            </v-chip>
          </div>
          <div class="tips text-center" v-if="seeTip">
            <v-btn rounded color="primary" class="fbtn secondary--text" @click="forget">忘记了</v-btn>
          </div>
        </v-card>
      </v-window-item>
    </v-window>

    <!-- 返回提示框 start-->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">确定返回单词列表？</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">取消</v-btn>

          <v-btn color="green darken-1" text @click="back">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 返回提示框end -->
  </div>
</template>

<script>
export default {
  created() {
    document.addEventListener("keyup", this.jumpD);    
  },
  mounted() {
    this.init();
    // this.interval = setInterval(this.initCanvas, 1000);
    this.interval = setInterval(this.initCircular, 1000);
  },
  data() {
    return {
      currentPage: 1,
      range: 10,
      words: [],
      CTX: null, //CANVAS CTX,
      countTime: 5, //计时器每次增加的度数
      startTime: 5, //计时器每次增加的度数
      interval: {},
      val: "", //输入框值
      curWord: "",
      curIndex: 0,
      picker: 0, //定时器
      seeTip: false,
      review: [],
      complete: false,
      dialog: false, //返回提示框
      rules: [
        value => !!value || "please input the word u just see.",
        value => {
          return value === this.curWord || "spell wrong";
        }
      ]
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
    document.removeEventListener("keyup", this.jumpD);   
  },
  methods: {
    init() {
      this.currentPage = this.$route.params.currentPage;
      this.range = this.$route.params.range;       
      
      this.getWords(this.currentPage, this.range, this.$route.params.which);
      // if (this.$refs.canvas.getContext) {
      //   this.CTX = this.$refs.canvas.getContext("2d");
      // }
    },
    getWords(cur, range,which) {
      this.$http
        .get("/getWords", { params: { currentPage: cur, range,which } })
        .then(res => {
          let { docs } = res.data;
          this.words = docs;
          this.curWord = this.words[0].word;
        });
    },

    // initCanvas() {
    //   let c = this.CTX;
    //   if (c) {
    //     c.beginPath();
    //     c.lineWidth = 10;
    //     c.strokeStyle = "#fe9a00";
    //     if (this.countTime <= 0) {
    //       clearInterval(this.interval);
    //       this.interval = null;
    //       return;
    //     }
    //     this.countTime--;

    //     c.arc(
    //       50,
    //       50,
    //       40,
    //       0,
    //       this.d2arg((this.startTime - this.countTime) * (360 / this.startTime))
    //     );
    //     c.stroke();
    //     c.closePath();
    //   } else {
    //     throw new Error("canvas未初始化");
    //   }
    // },

    // d2arg(deg) {
    //   return (Math.PI / 180) * deg;
    // },
    initCircular() {
      if (this.countTime > 0) --this.countTime;
      else {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    reset() {
      // this.CTX.clearRect(
      //   0,
      //   0,
      //   this.$refs.canvas.width,
      //   this.$refs.canvas.height
      // );
      // this.countTime = this.startTime;

      if (this.interval) clearInterval(this.interval);
      this.countTime = this.startTime;
      this.interval = setInterval(this.initCircular, 1000);
      this.seeTip = false;
      this.val = "";
    },
    async carouChange(index) {
      //  重置定时器
      this.reset();
      this.curWord = this.words[index].word;
      this.curIndex = index;

      // 自动播放音频
      if (this.$refs.audios[index]) this.$refs.audios[index].play();
    },
    jump() {
      // 练习结束
      if (this.curIndex === this.words.length - 1) {
        this.complete = true;
        setTimeout(() => {
          this.$router.back(-1);
          return;
        }, 2000);
      }
      // 查看提示
      if (this.val !== this.curWord) {
        this.seeTip = true;
        return;
      }

      this.$refs.carousel.next();
    },
    async jumpD(e) {
      if (e.keyCode === 38) {
        //up
        this.$refs.carousel.prev();
      } else if (e.keyCode === 40) {
        //down
        this.$refs.carousel.next();
      } else if (e.keyCode === 13 && this.countTime > 0) {
        clearInterval(this.interval);
        this.interval = null;
        this.countTime = 0;
      } else if (e.keyCode === 27) {
        //返回上一级
        this.dialog = true;
      } else if (e.keyCode === 70 && this.countTime === 0) {
        //f focus
        await this.$nextTick();
        this.$refs.wordInput[this.curIndex].focus();
      } else if (e.keyCode === 84 && this.countTime === 0 && this.seeTip) {
        // see tip  t
        this.forget();
      } else if (e.keyCode === 80) {
        // p play
        this.play();
      }
      e.preventDefault();
    },
    forget() {
      this.val = this.curWord;

      let tmp = JSON.parse(JSON.stringify(this.words[this.curIndex]));

      tmp.review = true;
      this.words.push(tmp);
    },
    play() {
      this.$refs.audios[this.curIndex].pause();
      this.$refs.audios[this.curIndex].play();
    },
    back() {
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
hub = rgb(254, 154, 0);

// 倒计时
#canvas {
  position: absolute;
}

.countTime {
  position: relative;
  left: 45%;
  width: 300px;
  height: 150px;

  & .time {
    font-size: 1.5rem;
    position: absolute;
    left: 42px;
    top: 30px;
    color: hub;
  }
}

.wordCard {
  width: 500px;
  height: 200px;
  position: relative;
  border: 1px solid #fff;
  margin: 0 auto;
}

.curWord {
  position: absolute;
  left: 20px;
  top: 20px;

  & .word {
    color: hub;
    font-size: 28px;
    font-weight: bold;
    float: left;
    margin-right: 15px;
  }

  & .phoSymbol {
    color: hub;
    font-size: 20px;
    loat: left;
    margin-right: 15px;
    font-family: 'lucida sans unicode', arial;
  }
}

// 当前单词的翻译
.translation {
  position: absolute;
  left: 20px;
  top: 60px;
  font-weight: bold;
  margin-top: 30px;
  color: hub;
}

// 提示
.tips {
  position: absolute;
  left: 40%;
  bottom: 20px;

  & .fbtn {
    color: #000;
    font-weight: bold;
  }
}

.review {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>