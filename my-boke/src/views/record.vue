<template>
  <div class="record contentYS" @scroll.passive="handleScroll">
    <blogNav></blogNav>
    <div class="top80">
      <div class="content card">
        <timeLine :timeData='timeData'></timeLine>
      </div>
      <div class="height60"></div>
    </div>
    <blogFoot v-if="scrollBottom < 20"></blogFoot>
  </div>
</template>

<script>
import blogNav from '../components/nav';
import timeLine from '../components/timeLine';
import blogFoot from '../components/footer';
export default {
    components:{
      blogNav,
      timeLine,
      blogFoot
    },
    data() {
      return {
        timeData: [
          {
            id: 1,
            time: '2020-2-13',
            img: 'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1582356549&t=9e6a6aacac04ffae3092ac6f26c1d35b',
            content: '今天是个好天气'
          },
          {
            id: 2,
            time: '2020-2-14',
            content: '很好'
          },
          {
            id: 3,
            time: '2020-2-15',
            img: 'http://t7.baidu.com/it/u=3616242789,1098670747&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1582356549&t=502fb5509e1d926e41439bd0ad47e9a6',
            content: '非常好'
          },
          {
            id: 4,
            time: '2020-2-16',
            content: '我今天真帅'
          },
          {
            id: 5,
            time: '2020-2-15',
            img: 'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1582379227&t=3f9e0adbff96ec73db2528f94ec6f3f9',
            content: '非常好'
          },
          {
            id: 6,
            time: '2020-2-15',
            img: 'http://t9.baidu.com/it/u=86853839,3576305254&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1582379227&t=af4667b7c404ea4e2804d566b93c01d3',
            content: '非常好'
          },
        ],
        scrollBottom: 50
      };
    },

    methods:{
      handleScroll(e){
        let scrollBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        this.scrollBottom = scrollBottom;
      }
    }
}
</script>

<style lang="less" scoped>
  .record{
    .content{
      width: 66.7%;
      margin: 20px auto;
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