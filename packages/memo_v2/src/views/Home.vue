<template>
  <div id="root">
    <div class="homeTabs">
      <div
        class="grid-content"
        v-for="(tab,index) in tabs"
        :key="index+tabs"
        @click="toVocabulary(tab)"
      >
        <span class="porn">{{tab}}</span>
        <span class="hub">词汇</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
        tabs: ["考研", "计算机"]
        };
    },
    methods: {
        toVocabulary(tab){
            if(tab === '考研'){
                this.$router.push("/kaoyan")          
            }else if(tab === '计算机'){
              this.$router.push("/computerEng")
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.homeTabs {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  
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
  cursor pointer
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

@media screen and (min-width 320px) and (max-width 768px){
  .homeTabs{
    flex-direction column
  }
  .grid-content{
      width 100%
      height 200px
      line-height @height
      font-size 2rem
      margin-bottom  20px
  } 
      
}
</style>