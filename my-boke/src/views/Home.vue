<template>
  <div class="home contentYS">
    <blogNav class="banner"></blogNav>
    <div class="content">
      <div class="left">
        <blogCard></blogCard>
        <blogCard></blogCard>
        <blogCard></blogCard>
      </div>
      <div class="right">
        <blogCard :height='300'></blogCard>
        <blogCard :height='400'></blogCard>
        <blogCard :height='200'></blogCard>
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
    .content{
      display: flex;
      flex-wrap: wrap;
      position: relative;
      top: 80px;
      justify-content: space-between;
      width: 1280px;
      margin: 0px auto;
      height: 100%;
      .left{
        width: 75%;
      }
      .right{
        width: 23%;
      }
    }
  }
</style>