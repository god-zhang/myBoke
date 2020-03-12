<template>
  <div class="backTop" @click="backTop" v-if="bscrollTop>300">
    <img src="~@/assets/images/backTop.png" alt='回到顶部' title="回到顶部"/>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data() {
        return {
            flag: false,
        }
    },
    computed: {
      bscrollTop: function () {
        return this.$store.state.scrollTop;
      }
    },
    methods: {
        backTop(e){
          const that = this;
          let timer = setInterval(()=>{
            let ispeed = Math.floor(-that.bscrollTop / 5)
            window.scrollTo(0,that.bscrollTop + ispeed);
            if(that.bscrollTop == 0){
              clearInterval(timer);
            }
          },16)
       },
    },
}
</script>

<style lang="less" scoped>
.backTop {
  position: fixed;
  bottom: 30px;
  right: 2%;
  width: 40px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
  cursor: pointer;
  img {
    width: 100%;
    padding-top: 5px;
  }
}
</style>
