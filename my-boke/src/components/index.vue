<template>
  <div class="index">
    <div class="loading" :class="isGo ? 'hide' : ''"></div>

    <div class="top">
      <div class="go" :class="isGo ? 'hide' : ''">
        <div class="con">
          <div class="entry css1e773aea221c354" @click="toHome">MyBlog</div>
          <div class="title css1e773aea221c354">星 空 深 邃 , 值 得 等 待</div>
        </div>
      </div>

      <img src="~@/assets/images/blackhold.png" alt="" :class="isGo ? 'hide' : ''">
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      isGo: false
    }
  },
  mounted() {

  },
  computed: {
  
  },

  methods: {

    toHome(){
      this.isGo = true;
      setTimeout(()=>{
        this.$router.push({
          name: 'home'
        })
      },2500)
    }
  },
}
</script>

<style scoped lang='less'>
  @import 'http://cdn.repository.webfont.com/webfonts/nomal/115540/45904/5e297d58f629d80ab485eaea.css';
  [v-cloak]{
    display: block;
  }

  .index{
    height: 100%;
    background: url('~@/assets/images/bg.jpg') no-repeat;
    background-size: cover;
    .loading.hide{
      width: 0;
      height: 2px;
      background-color: #fff;
      border-radius: 1px;
      animation: loading 2s alternate linear;
      z-index: 100;
    }
    .top{
      position: absolute;
      color: #fff;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      img{
        position: absolute;
        width: 400px;
        left: 50%;
        top: 50%;
        margin: -200px 0 0 -200px;
        animation: xz 2s infinite linear;
      }
      img.hide{
        animation: sx 2s linear forwards;
      }
      .go{
        position: absolute;
        width: 400px;
        height: 400px;
        top: 50%;
        left: 50%;
        margin: -200px 0 0 -200px;
        z-index: 10;
        font-size: 20px;
        text-align: center;
        &.hide{
          animation: xishou 1s forwards linear;
        }
        .con{
          margin: 50% auto;
          transform: translateY(-50%);
        }
        .entry{
          margin: 0 auto;
          width: 100px;
          padding: 10px 15px;
          background-color: rgba(64, 36, 85, .5);
          border-radius: 5px;
          cursor: pointer;
          &:hover{
            background-color: rgba(64, 36, 85, 1);
          }
        }
        .title{
          line-height: 60px;
        }
      }
    }
  }
  @media screen and (max-width : 767px) {
    .index{
      .top{
        img{
          width: 300px;
          margin: -150px 0 0 -150px;
        }
        .go{
          width: 300px;
          height: 300px;
          margin: -150px 0 0 -150px;
          .title{
            font-size: 16px;
          }
          .entry{
            width: 80px;
            font-size: 16px;
          }
        }
      }
    }
  }

  @keyframes xz {
    0%{
      transform: rotate(0);
    }

    25%{
      transform: rotate(-90deg);
    }

    50%{
      transform: rotate(-180deg);
    }

    75%{
      transform: rotate(-270deg);
    }

    100%{
      transform: rotate(-360deg);
    }
  }

  @keyframes sx {
    0%{
      transform: rotate(0) scale(1);
    }

    25%{
      transform: rotate(-180deg) scale(0.75);
    }

    50%{
      transform: rotate(-360deg) scale(0.5);
    }

    75%{
      transform: rotate(-560deg) scale(0.25);
    }

    100%{
      transform: rotate(-720deg) scale(0);
    }
  }

  @keyframes xishou {
    0%{
      transform: rotate(0);
      font-size: 18px;
      opacity: 1;
    }

    25%{
      transform: rotate(-360deg);
      font-size: 13px;
      opacity: 0.75;
    }

    50%{
      transform: rotate(-720deg);
      font-size: 8px;
      opacity: 0.5;
    }

    75%{
      transform: rotate(-1080deg);
      font-size: 3px;
      opacity: 0,25;
    }

    100%{
      transform: rotate(-1440deg);
      font-size: 0px;
      opacity: 0;
    }
  }

  @keyframes loading {
    0%{
      width: 0;
    }

    100%{
      width: 100%;
    }
  }
</style>
