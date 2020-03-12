<template>
  <div class="index">
    <div class="loading" :class="isGo ? 'hide' : ''"></div>

    <div class="top">
      <div class="go" :class="isGo ? 'hide' : ''">
        <div class="con animated zoomInUp">
          <div class="name css1f0c0aa5751c354">殒殇</div>
          <div class="entry css1f0c0aa5751c354" @click="toHome">探 索</div>
          <div class="title" v-cloak>{{truthText}}</div>
        </div>
      </div>

      <img src="~@/assets/images/blackhole.png" alt="" :class="isGo ? 'hide' : ''">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import animate from 'animate.css';
export default {
  name: 'index',
  data() {
    return {
      isGo: false,
      truthText: '探索中......'
    }
  },
  created() {
    // console.log(this.$router.currentRoute.path)
    if(this.$router.currentRoute.path == '/'){
      this.$store.state.isNavFooter = false;
    }else{
      this.$store.state.isNavFooter = true;
    }
    axios.get(`${this.global.apiUrl}queryTopTruth`).then((res)=>{
      if(res.status == 200){
        this.truthText = res.data.content;
      }else{
        this.truthText = '星 空 深 邃 , 值 得 等 待';
      }
    })
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
  .index{
    height: 100vh;
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
        transform: translateX(-50%) translateY(-14%);
        top: 50%;
        left: 50%;
        z-index: 10;
        font-size: 20px;
        text-align: center;
        &.hide{
          animation: hide 2s ease-in-out forwards;
        }
        .con{
          transform: translateY(-50%);
          .name{
            margin-bottom: 40px;
            font-size: 35px;
          }
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
          margin-top: 40px;
          font-size: 18px;
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
          transform: translateX(-50%) translateY(-8%);
          .title{
            font-size: 14px;
            margin-top: 20px;
          }
          .con{
            .name{
              font-size: 30px;
              margin-bottom: 20px;
            }
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


  @keyframes hide {
    0%{
      opacity: 1;
    }

    100%{
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
