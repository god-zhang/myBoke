<template>
  <div class="home contentYS" @scroll.passive="handleScroll">
    <blogNav class="banner"></blogNav>
    <div class="content">
      <div class="left">
        <blogCard></blogCard>
        <blogCard></blogCard>
        <blogCard></blogCard>
        <blogCard></blogCard>
        <blogCard></blogCard>
        <blogCard></blogCard>
        <blogCard></blogCard>
        <div class="height60 heightPC"></div>
      </div>
      <div class="right">
        <cate></cate>
        <calendar></calendar>
        <hot></hot>
        <users></users>
        <div class="height60 heightMO"></div>
      </div>
    </div>
    <blogFoot v-if="scrollBottom < 20"></blogFoot>
  </div>
</template>

<script>
import blogNav from '../components/nav';
import blogCard from '../components/card';
import cate from '../components/cate';
import hot from '../components/hot';
import users from '../components/recent-user';
import calendar from '../components/calendar';
import blogFoot from '../components/footer';
export default {
  data() {
    return {
      scrollBottom: 50
    }
  },
  components:{
    blogNav,
    blogCard,
    cate,
    calendar,
    hot,
    users,
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
  .home{
    .content{
      display: flex;
      position: relative;
      top: 80px;
      justify-content: space-between;
      width: 66.7%;
      margin: 0px auto;
      height: 100%;
      .left{
        width: 75%;
        .heightMO{
          display: none;
        }
      }
      .right{
        width: 23%;
      }
    }
  }

  @media screen and (max-width:1024px){
    .home{
      .content{
        width: 90%;
        display: block;
        .left,.right{
          width: 100%;
        }
        .left{
          .heightPC{
            display: none;
          }
        }
        .right{
          .heightMO{
            display: block;
          }
        }
      }
    }
  }
</style>