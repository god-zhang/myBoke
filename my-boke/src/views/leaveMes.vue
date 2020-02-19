<template>
  <div class="leaveMes contentYS" @scroll.passive="handleScroll">
    <blogNav></blogNav>
    <div class="content">
      <giveMes></giveMes>
      <comments></comments>
    </div>
    <blogFoot v-if="scrollBottom < 20"></blogFoot>
  </div>
</template>

<script>
import blogNav from '../components/nav';
import giveMes from '../components/givemeMes';
import comments from '../components/comments';
import blogFoot from '../components/footer';
export default {
  data() {
    return {
      scrollBottom: 20
    }
  },
  components:{
    blogNav,
    giveMes,
    comments,
    blogFoot
  },
  methods:{
    handleScroll(e){
      let scrollBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
      this.scrollBottom = scrollBottom;
    }
  }
}
</script>

<style lang="less" scoped>
    .leaveMes{
      .content{
        width: 66.7%;
        margin: 80px auto;
      }
    }
    @media screen and (max-width:1024px){
      .leaveMes{
        .content{
          width: 90%;
        }
      }
    }
</style>