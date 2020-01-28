<template>
  <div class="banner">
    <div class="bannerCon">
      <router-link tag="div" class="logo" to="/">(〃'▽'〃)</router-link>
      <ul>
        <router-link tag="li" to="home">博客</router-link>
        <router-link tag="li" to="leaveMes">留言</router-link>
        <router-link tag="li" to="record">随手记</router-link>
        <router-link tag="li" to="about">关于</router-link>
      </ul>
      <div class="login">登录</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .banner{
        display: flex;
        width: 100%;
        height: 60px;
        background: url('~@/assets/images/bg.jpg') no-repeat;
        box-shadow: 0px 0px 15px 0px #fff;
        color: #fff;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        .bannerCon{
          display: flex;
          width: 1280px;
          margin: 0 auto;
          justify-content: space-between;
          line-height: 60px;
          .logo{
            width: 10%;
            margin-right: 20%;
            text-align: left;
            cursor: pointer;
            &:hover{
              color: #999;
            }
          }
          ul{
            width: 50%;
            display: flex;
            justify-content: space-between;
            list-style: none;
            li{
              position: relative;
              flex: 3;
              margin-right: 10px;
              cursor: pointer;
              &.link-active{
                color: #6200ec;
                &::before{
                  content: '';
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  animation: border .5s ease-in-out forwards;
                  height: 2px;
                  background-color: #6200ec;
                }
              }
              &:hover{
                color: #6200ec;
                transition: 0.5s;
                &::before{
                  content: '';
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  animation: border .5s ease-in-out forwards;
                  height: 2px;
                  background-color: #6200ec;
                }
              }
            }
          }
          .login{
            width: 10%;
            margin-left: 10%;
            text-align: right;
            cursor: pointer;
          }
        }
    }

    @keyframes border {
      0%{
        width: 0;
      }
      100%{
        width: 100%;
      }
    }
</style>