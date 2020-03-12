<template>
  <div class="home">
    <div class="content">
      <div class="left">
        <blogCard v-for="item in articles" :key="item.id+'article'" :articles='item'></blogCard>
        <div class="noMore" v-if="countScroll == Math.floor((total+2)/3)">没有更多了~</div>
        <div class="moreMo" @click="getMoreData" v-if="countScroll !== Math.floor((total+2)/3)">加载更多</div>
      </div>
      <div class="right" ref='right'>
        <cate @getArticles='getArticles' @getAllArticles='getAllArticles' @searchArticles='searchArticles' class="animated fadeInUp tagDown" :style="{top: hscrollTop > rightHeight+300 ? hscrollTop+'px' : '0'}"></cate>
        <calendar class="animated fadeInUp"></calendar>
        <hot class="animated fadeInUp"></hot>
        <users class="animated fadeInUp"></users>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import blogCard from '../components/card';
import cate from '../components/cate';
import hot from '../components/hot';
import users from '../components/recent-user';
import calendar from '../components/calendar';
import axios from 'axios';
import animate from 'animate.css';
export default {
  data() {
    return {
      offset: 0,
      limit: 3,
      total: 0,
      articles:[],
      countScroll: 1,
      tagId: 0,
      search: '',
      rightHeight: 0,
      isCreated: true
    }
  },
  components:{
    blogCard,
    cate,
    calendar,
    hot,
    users,
  },
  created() {
    if(this.$router.currentRoute.path == '/'){
      this.$store.state.isNavFooter = false;
    }else{
      this.$store.state.isNavFooter = true;
    }
    window.scrollTo(0,0);
    this.isCreated = true;
    this.getAllArticles(false,this.offset,this.limit);
  },
  mounted() {
    window.scrollTo(0,0);
    this.$nextTick(()=>{
      this.rightHeight = this.$refs.right.offsetHeight;
    })
  },
  computed: {
    ...mapState({
      hscrollBottom: (state) => state.scrollBottom
    }),
    hscrollTop: function () {
      return this.$store.state.scrollTop;
    },
    
  },
  watch: {
    hscrollBottom(n,o){
      if(n == 0){
        if(this.isCreated){
          this.isCreated = false;
        }else{
          this.getMoreData();
        }
      }
    }
  },
  methods:{
    getAllArticles(clickTag,offset,limit){
      if(clickTag){
        window.scrollTo(0,0);
        this.offset = 0;
        this.limit = 3;
        this.articles = [];
        this.total = 0;
        this.countScroll = 1;
      }
      const loading = this.$layer.loading({content: '加载中...'})
      this.tagId = 0;
      axios.get(`${this.global.apiUrl}queryArticles?offset=${offset}&limit=${limit}`)
      .then((res)=>{
        if(res.status == 200){
          this.$layer.close(loading);
          this.articles = [...this.articles,...(res.data.rows)];
          this.total = res.data.total;
        }
      })
      .catch(err=>{
        console.log(err);
      })
    },
    getArticles(clickTag,tagId){
      window.scrollTo(0,0);
      if(clickTag){
        this.offset = 0;
        this.limit = 3;
        this.articles = [];
        this.total = 0;
        this.countScroll = 1;
      }
      const loading = this.$layer.loading({content: '加载中...'})
      this.tagId = tagId;
      axios.get(`${this.global.apiUrl}queryArticlesByTag?tagId=${tagId}&offset=${this.offset}&limit=${this.limit}`)
      .then((res)=>{
        if(res.status == 200){
          this.$layer.close(loading);
          this.articles = [...this.articles,...(res.data.rows)];
          this.total = res.data.total;
        }
      })
    },
    getMoreData(){
      if(Math.floor((this.total+2)/3) == this.countScroll){
          return;
        }
        this.countScroll ++;
        this.offset+=this.limit;
        if((this.total-this.offset)/this.limit <= 1){
          this.limit = this.total - this.offset;
        }
        if(this.tagId == 0){
          this.getAllArticles(false,this.offset,this.limit);
        }else if(this.tagId == -1){
          this.searchArticles(false,this.search,this.offset,this.limit,-1);
        }else{
          this.getArticles(false,this.tagId);
        }
    },
    searchArticles(isPage,search,offset,limit,tagId){
      window.scrollTo(0,0);
      if(isPage){
        this.offset = 0;
        this.limit = 3;
        this.articles = [];
        this.total = 0;
        this.countScroll = 1;
      }
      const loading = this.$layer.loading({content: '加载中...'})
      this.tagId = tagId;
      this.search = search;
      axios.get(`${this.global.apiUrl}queryArticles?search=${search}&offset=${offset}&limit=${limit}`)
      .then((res)=>{
        if(res.status == 200){
          this.$layer.close(loading);
          this.articles = [...this.articles,...(res.data.rows)];
          this.total = res.data.total;
        }
      })
      .catch(err=>{
        console.log(err);
      })
    },
  }
}
</script>

<style lang="less" scoped>
  .home{
    .content{
      display: flex;
      position: relative;
      justify-content: space-between;
      width: 66.7%;
      margin: 10px auto;
      height: 100%;
      .left{
        width: 75%;
        .heightMO{
          display: none;
        }
        .moreMo{
          display: none;
        }
        .noMore{
          width: 100%;
          text-align: center;
          font-size: 14px;
          color: #fff;
        }
      }
      .right{
        width: 23%;
        .tagDown{
          position: relative;
          z-index: 1;
          transition: top 0.5s ease-out;
        }
      }
    }
  }

  @media screen and (max-width:1024px){
    .home{
      .content{
        width: 90%;
        display: block;
        .left,.right{
          width: 100%;
        }
        .left{
          .heightPC{
            display: none;
          }
          .moreMo{
            display: block;
            color: #fff;
            background-color: rgba(255, 255, 255, .5);
            text-align: center;
            padding: 10px 15px;
            border-radius: 20px;
            margin-bottom: 10px;
          }
        }
        .right{
          .heightMO{
            display: block;
          }
          .tagDown{
            position: static;
          }
        }
      }
    }
  }
</style>