<template>
  <div class="home">
    <blogNav class="banner"></blogNav>
    <div class="content">
      <div class="left">
        <blogCard :height='200'></blogCard>
        <blogCard :height='300'></blogCard>
        <blogCard></blogCard>
      </div>
      <div class="right">
        <blogCard :height='400'></blogCard>
        <blogCard :height='400'></blogCard>
        <blogCard :height='400'></blogCard>
      </div>
    </div>
  </div>
</template>

<script>
import blogNav from '../components/nav';
import blogCard from '../components/card';
export default {
  components:{
    blogNav,
    blogCard
  }
}
</script>

<style lang="less" scoped>
  .home{
    width: 100%;
    height: 100%;
    background: url('~@/assets/images/bg.jpg') no-repeat;
    // background-size: cover;
    overflow-y: scroll;
    .banner{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
    }
    .content{
      display: flex;
      position: relative;
      top: 90px;
      justify-content: space-between;
      width: 80%;
      margin: 0px auto;
      // background-color: #fff;
      .left{
        width: 60%;
        // background-color: #ace;
      }
      .right{
        width: 36%;
        // background-color: #456;
      }
    }
  }
</style>