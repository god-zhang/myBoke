<template>
  <div id="app" class="">
    <blogNav v-if="isHide"></blogNav>
    <div style="height:80px;" v-if="isHide"></div>
    <router-view />
    <blogFoot v-if="isHide"></blogFoot>
    <backTop v-if="isHide"></backTop>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import blogNav from './components/nav';
import blogFoot from './components/footer';
import backTop from './components/backTop';
export default {
  data() {
    return {
      scrollTop: 0,
    }
  },
  computed: {
    isHide(){
      return this.$store.state.isNavFooter;
    }
  },
  components:{
    blogNav,
    blogFoot,
    backTop
  },
  mounted() {
    window.scrollTo(0,0);
    window.addEventListener('scroll',this.handleScroll);
    this.randomStr();
  },
  
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    handleScroll(e){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let scrollBottom = this.getScrollHeight() - this.getClientHeight() - scrollTop;
      this.scrollTop = scrollTop;
      this.changeScrollTop(scrollTop);
      this.changeScrollBottom(scrollBottom);
    },
    getClientHeight() {
      let clientHeight = 0;
      if(document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    getScrollHeight() {
      let scrollHeight = 0;
      if(document.documentElement && document.documentElement.scrollHeight) {
        scrollHeight = document.documentElement.scrollHeight;
      } else if(document.body) {
        scrollHeight = document.body.scrollHeight;
      }
      return scrollHeight;
    },
    ...mapMutations(['changeScrollTop','changeScrollBottom','randomStr'])
  },
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  color: #2c3e50;
  background: url('~@/assets/images/bg.jpg') no-repeat;
  background-attachment: fixed;
  background-size: cover;
  -webkit-background-attachment:fixed;
  -o-background-attachment:fixed;
  -moz-background-attachment:fixed;
  -ms-background-attachment:fixed;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
