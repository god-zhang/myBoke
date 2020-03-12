<template>
  <div class="leaveMes contentYS">
    <div class="content animated bounceInUp">
      <giveMes></giveMes>
      <comments></comments>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import giveMes from '../components/givemeMes';
import comments from '../components/comments';
import animate from 'animate.css';
import axios from 'axios';
export default {
  data() {
    return {
      emojis: []
    }
  },
  components:{
    giveMes,
    comments,
  },
  mounted() {
    window.scrollTo(0,0);
    axios.get(`${this.global.apiUrl}queryEmoji`)
    .then((res)=>{
        if(res.status == 200){
            this.getEmojis(res.data);
        }
    })
  },
  methods:{
    ...mapMutations(['getEmojis'])
  }
}
</script>

<style lang="less" scoped>
    .leaveMes{
      .content{
        width: 66.7%;
        margin: 10px auto;
      }
    }
    @media screen and (max-width:1024px){
      .leaveMes{
        .content{
          width: 90%;
        }
      }
    }
</style>