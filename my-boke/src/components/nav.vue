<template>
  <div class="banner">
    <div class="bannerCon_pc">
      <router-link tag="div" class="logo" to="/">(〃'▽'〃)</router-link>
      <ul>
        <router-link tag="li" to="home">博客</router-link>
        <router-link tag="li" to="leaveMes">留言</router-link>
        <router-link tag="li" to="record">随手记</router-link>
        <router-link tag="li" to="about">关于</router-link>
      </ul>
      <div class="login">登录</div>
      <!-- <div><img src="~@/assets/images/all.png" alt="" height="60"></div> -->
    </div>

    <div class="bannerCon_m">
      <router-link tag="div" class="logo" to="/">(〃'▽'〃)</router-link>
      <div class="login">登录</div>
      <div class="more">
        <img src="~@/assets/images/all.png" alt="" @click="showMenu">
        <ul class="menu" :class="menu_hide ? 'showList' : 'hideList'">
          <router-link tag="li" to="home">博客</router-link>
          <router-link tag="li" to="leaveMes">留言</router-link>
          <router-link tag="li" to="record">随手记</router-link>
          <router-link tag="li" to="about">关于</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu_hide: false
    }
  },

  methods:{
    showMenu(){
      this.menu_hide = !this.menu_hide;
      const className = document.getElementsByClassName('menu')[0].className.split(' ')[1];
      if(className == 'showList'){
        setTimeout(()=>{
          document.getElementsByClassName('menu')[0].style.display = 'none';
        },500)
      }else{
        document.getElementsByClassName('menu')[0].style.display = 'block';
      }
    }
  }
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
        .bannerCon_m{
          display: none;
        }
        .bannerCon_pc{
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

    @keyframes showList {
      0%{
        width: 30%;
      }
      100%{
        width: 100%;
      }
    }

    @keyframes hideList {
      0%{
        width: 100%;
      }
      100%{
        width: 30%;
        opacity: 0;
      }
    }
    
    @media screen and (max-width:1024px){
      .banner{
        .bannerCon_pc{
          display: none;
        }
        .bannerCon_m{
          display: flex;
          width: 90%;
          margin: 0 auto;
          justify-content: space-between;
          line-height: 60px;
          .logo{
            width: 20%;
            margin-right: 10%;
            text-align: left;
            cursor: pointer;
            &:hover{
              color: #999;
            }
          }
          .login{
            width: 40%;
            margin-left: 10%;
            text-align: center;
            cursor: pointer;
          }
          .more{
            width: 20%;
            margin-left: 10%;
            text-align: right;
            img{
              vertical-align: middle;
            }
            ul{
              position: absolute;
              left: 0;
              top: 60px;
              list-style: none;
              width: 100%;
              background: url('~@/assets/images/bg.jpg') no-repeat;
              box-shadow: 0px 0px 30px -10px #fff;
              &.showList{
                animation: showList .5s ease-in-out forwards;
              }
              &.hideList{
                animation: hideList .5s ease-in-out forwards;
              }
              li{
                text-align: left;
                padding: 0px 15px;
                // border-bottom: 1px solid #fff;
                position: relative;
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
              }
            }
          }
        }
      }
    }
</style>