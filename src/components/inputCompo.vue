<template>
  <div>
    <div class="inputCompo">
      <input type="text" class="confirmWord" placeholder="拼写单词" v-model="val" :input="validate" />
      <span class="clearInput" @click="clear"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        val:""
    };
  },
  methods: {
      clear(){
          this.val = "";
      },
      validate(){
          this.$emit("validate",this.val)
      }
  }
};
</script>

<style lang="stylus" scoped>
.inputCompo {
  width: 230px;
  height: 40px;
  position: relative;
}

.confirmWord {
  border: none;
  border-bottom: 1px solid #3498DB;
  background-color: #F5F5F5;
  width: 200px;
  height: 100%;
  font-size: 1.2rem;
  font-family: 'Arial, Helvetica, sans-serif';
  box-sizing: border-box;
  text-align: center;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    text-align: center;
  }
}

chaWid = 10px;

.clearInput {
  width: chaWid;
  border-top: 1px solid #3498DB;
  position: absolute;
  bottom: 20px;
  right: 10px;
  cursor: pointer;
  transform: rotate(45deg);
  transition: all 0.5s ease;

  &::after {
    content: '';
    position: absolute;
    width: chaWid;
    left: 0;
    top: 0;
    border-top: 1px solid #3498DB;
    bottom: 20px;
    transform: rotate(-90deg);
  }

  &:hover {
    transform: rotate(135deg);
  }
}
</style>