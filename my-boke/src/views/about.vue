<template>
  <div class="about">
    <div class="content animated bounceInUp">
      <div class="head css1f0c0aa5751c354">
        <p>殒殇</p>
        <p>陨落星辰 , 虽短暂 , 却在最后一刻照亮了死寂的宇宙</p>
      </div>
      <div class="body card cardCommon">
        
        <div class="aboutMe">
          <h3><span class="kk"></span>关于我</h3>
          <div>
            <p class="marginB">一个放诞不羁, 热爱自由, 却又被现实的枷锁困住的代码狂, 每次面对代码就像是面对星辰大海, 有着无尽的探索欲望</p>
            <p class="marginB">若对本站有疑问, 或者有什么问题, 或者你是大神, 可以留言给我, 我们一起探讨, 一起感受星辰大海</p>
            <p>以下是我的联系方式:</p>
            <p>Q Q : <span class="color1">2374171406</span></p>
            <p>微信 : <span class="color1">点开最下面的微信图标扫码加我</span></p>
          </div>
        </div>

        <div class="aboutWeb">
          <h3><span class="kk"></span>关于本站</h3>
          <div>
            <p class="marginB">本站建于2020年3月15日</p>
            <p>网站架构:</p>
            <p>前端 : <span class="color2">VUE</span></p>
            <p class="marginB">后端 : <span class="color2">NodeJs</span> + <span class="color2">Express</span> + <span class="color2">MySQL</span></p>
            <p>服务器采用的是华为云</p>
          </div>
        </div>

        <div class="desc">
          <h3><span class="kk"></span>特别说明</h3>
          <div>
            <p class="marginB">本站文章仅代表个人观点，与任何组织或个人无关。</p>
            <p class="marginB">注册时使用到的邮箱，仅供做用户的唯一识别码，接收验证码以及回复消息时使用，不做他用。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import animate from 'animate.css';
export default {
  mounted() {
    window.scrollTo(0,0);
  },
}
</script>

<style lang="less" scoped>
  .about{
    .content{
      margin-bottom: 20px;
      .head{
        text-align: center;
        padding: 10px 0;
        font-size: 22px;
        color: #fff;
        p{
          &:first-of-type{
            font-size: 30px;
          }
          line-height: 50px;
        }
      }
      .body{
        width: 66.7%;
        margin: 10px auto;
        div{
          margin-bottom: 30px;
          div{
            padding-left: 10px;
            font-size: 15px;
            p{
              &.marginB{
                margin-bottom: 20px;
              }
              .color1{
                background: #fff;
                padding: .2rem .4rem;
                color: #05b0ff;
                border-radius: 4px;
              }
              .color2{
                background: rgba(27,31,35,.5);
                padding: .2rem .4rem;
                color: #05b0ff;
                border-radius: 4px;
              }
              line-height: 30px;
            }
          }
          h3{
            margin-bottom: 10px;
            color: #000;
            .kk{
              display: inline-block;
              position: relative;
              top: 10px;
              margin-right: 10px;
              width: 5px;
              height: 35px;
              background-color: #05b0ff;
              border-radius: 5px;
            }
          }
        }
      }
      @media screen and (max-width:1024px){
        .body{
          width: 90%;
        }
      }
    }
  }
</style>