<template>
  <div class="record">
    <div class="animated bounceInUp">
      <div class="content">
        <timeLine :timeData='timeData'></timeLine>
      </div>
    </div>
  </div>
</template>

<script>
import timeLine from '../components/timeLine';
import animate from 'animate.css';
import axios from 'axios';
export default {
    components:{
      timeLine,
    },
    data() {
      return {
        timeData: [],
      };
    },
    mounted() {
      window.scrollTo(0,0);
      const layer = this.$layer.loading({content: '加载中...'})
      axios.get(`${this.global.apiUrl}queryEssays`)
      .then(res => {
         if(res.status == 200){
           this.$layer.close(layer);
           this.timeData = res.data;
         }
      })
      .catch(e => {
        console.log(e);
      })
    },
    methods:{
      
    }
}
</script>

<style lang="less" scoped>
  .record{
    .content{
      width: 66.7%;
      margin: 10px auto;
      background-color: rgba(255, 255, 255, .5);
      color: #fff;
    }
  }
  @media screen and (max-width:1024px){
      .record{
        .content{
          width: 90%;
        }
      }
    }
</style>