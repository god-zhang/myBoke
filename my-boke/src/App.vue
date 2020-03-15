<template>
  <div id="app" class="">
    <blogNav v-if="isHide"></blogNav>
    <div style="height:80px;" v-if="isHide"></div>
    <router-view />
    <blogFoot v-if="isHide"></blogFoot>
    <backTop v-if="isHide"></backTop>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import blogNav from './components/nav';
import blogFoot from './components/footer';
import backTop from './components/backTop';
import axios from 'axios';
export default {
  data() {
    return {
      scrollTop: 0,
    }
  },
  computed: {
    isHide(){
      return this.$store.state.isNavFooter;
    }
  },
  components:{
    blogNav,
    blogFoot,
    backTop
  },
  mounted() {
    window.scrollTo(0,0);
    window.addEventListener('scroll',this.handleScroll);
    this.randomStr();
    this.autoLogin();
  },
  
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    handleScroll(e){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      let scrollBottom = this.getScrollHeight() - this.getClientHeight() - scrollTop;
      this.scrollTop = scrollTop;
      this.changeScrollTop(scrollTop);
      this.changeScrollBottom(scrollBottom);
    },
    getClientHeight() {
      let clientHeight = 0;
      if(document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    getScrollHeight() {
      let scrollHeight = 0;
      if(document.documentElement && document.documentElement.scrollHeight) {
        scrollHeight = document.documentElement.scrollHeight;
      } else if(document.body) {
        scrollHeight = document.body.scrollHeight;
      }
      return scrollHeight;
    },

    autoLogin(state) {
      if (this.$cookies.isKey('email') && this.$cookies.isKey('password')) {
        const loginMes = JSON.stringify({
            email: this.$cookies.get('email'),
            password: this.passReturn()
        })
        axios.post(`${this.global.apiUrl}login`, loginMes)
            .then((res) => {
                if (res.status == 200) {
                    if (res.data.code == 200) {
                      this.changeUserInfo(res.data.result);
                    }else{
                      this.$layer.msg('自动登陆失败,请重新登录,ERROR: '+res.data.msg)
                    }
                }
            })
        }
    },
    passReturn(){
      try {
        return window.atob(this.$cookies.get('password'))
      } catch (error) {
        return this.$cookies.get('password')
      }
    },
    ...mapMutations(['changeScrollTop','changeScrollBottom','randomStr','changeUserInfo'])
  },
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  color: #2c3e50;
  background: url('~@/assets/images/bg.jpg') no-repeat;
  background-attachment: fixed;
  background-size: cover;
  &::-webkit-scrollbar {
    display: none;
  }
}

@media screen and (max-width: 1024px){
    #app{
      background: none;
    }
    #app::before {
      content: '';
      position: fixed;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: url('~@/assets/images/bg.jpg') center no-repeat;
      background-size: cover;
    }
  }
</style>
