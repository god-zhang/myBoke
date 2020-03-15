<template>
  <div class="banner">
    <div class="bannerCon_pc">
      <router-link tag="div" class="logo" to="/"><img :src="logo" alt="logo" title="首页" @mouseover="handleHover" @mouseout="handleOut"></router-link>
      <ul>
        <router-link tag="li" to="/home">博客</router-link>
        <router-link tag="li" to="/leaveMes">留言</router-link>
        <router-link tag="li" to="/record">随手记</router-link>
        <router-link tag="li" to="/about">关于</router-link>
      </ul>
      <router-link class="login" tag="div" to="/login" v-if="!userInfo.id">登录</router-link>
      <div class="loginSuccess" @mouseover="onTipsNamePc(userInfo.is_admin == 1 ? '主人' : userInfo.name)" v-if="userInfo.id">
        <img :src="userInfo.avatar" :alt='`${userInfo.name}头像`'>
        <div class="exitLogin" @click="onExit">退 出</div>
      </div>
    </div>

    <div class="bannerCon_m">
      <router-link tag="div" class="logo" to="/"><img :src="logo" alt="logo" title="首页" @mouseover="handleHover" @mouseout="handleOut"></router-link>
      <div class="more">
        <img src="~@/assets/images/all.png" alt="" @click="showMenu">
        <ul class="menu" v-if="menu_hide" @click="closeList">
          <router-link tag="li" to="/home">博客</router-link>
          <router-link tag="li" to="/leaveMes">留言</router-link>
          <router-link tag="li" to="/record">随手记</router-link>
          <router-link tag="li" to="/about">关于</router-link>
        </ul>
      </div>
      <router-link class="login" tag="div" to="/login" v-if="!userInfo.id">登录</router-link>
      <div class="loginSuccess" @mouseover="onTipsNameM(userInfo.is_admin == 1 ? '主人' : userInfo.name)" v-if="userInfo.id">
        <img :src="userInfo.avatar" :alt='`${userInfo.name}头像`' @click="showExit">
        <div class="exitLogin" v-if="m_isShowExit" @click="onExit">退 出</div>
      </div>
      
    </div>
  </div>
</template>

<script>
import logo from '../assets/images/logo.png';
import logo_hover from '../assets/images/logo_hover.png';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      menu_hide: false,
      logo: logo,
      m_isShowExit: false
    }
  },

  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo
    }),
  },
  methods:{
    showMenu(){
      this.menu_hide = !this.menu_hide;
    },
    handleHover(){
      this.logo = logo_hover;
    },
    handleOut(){
      this.logo = logo;
    },
    closeList(){
      this.menu_hide = false
    },
    onTipsNamePc(name){
      this.$layer.tips(`Hi, ${name}`,'.bannerCon_pc .loginSuccess',{tips: 1})
    },
    onTipsNameM(name){
      this.$layer.tips(`Hi, ${name}`,'.bannerCon_m .loginSuccess',{tips: 2})
    },
    showExit(){
      this.m_isShowExit = !this.m_isShowExit;
    },
    onExit(){
      this.$cookies.remove('email');
      this.$cookies.remove('password');
      location.reload()
      this.$layer.msg('退出成功');
    },
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
        text-align: center;
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
              &.link-active,&.active{
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
            &:hover,&.link-active{
              color: #6200ec;
            }
          }
          .loginSuccess{
            position: relative;
            width: 50px;
            height: 60px;
            margin-left: 10%;
            text-align: right;
            cursor: pointer;
            overflow: hidden;
            img{
              width: 100%;
              border-radius: 50%;
              vertical-align: middle;
            }
            .exitLogin{
              position: absolute;
              opacity: 0;
              transition: opacity 0.5s;
              top: 0;
              left: 0;
              width: 50px;
              line-height: 60px;
              font-size: 14px;
              text-align: center;
              background-color: rgba(0, 0, 0, 0.5);
              &:hover{
                opacity: 1;
              }
            }
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
            text-align: left;
            cursor: pointer;
            &:hover{
              color: #999;
            }
          }
          .login{
            text-align: right;
            cursor: pointer;
            &:hover{
              color: #6200ec;
            }
          }
          .more{
            text-align: center;
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
              li{
                text-align: left;
                padding: 0px 15px;
                position: relative;
                &.link-active,&.active{
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

          .loginSuccess{
            position: relative;
            width: 50px;
            height: 60px;
            text-align: right;
            cursor: pointer;
            img{
              width: 100%;
              border-radius: 50%;
              vertical-align: middle;
            }
            .exitLogin{
              position: absolute;
              top: 17px;
              left: -55px;
              width: 50px;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              text-align: center;
              background-color: #fff;
              color: #000;
              border-radius: 5px;
            }
          }
        }
      }
    }
</style>