<template>
  <div class="login">
    <div class="content card cardCommon animated bounceInUp">
        <h3>登录</h3>
        <div class="email">
            <label for="email">
                邮箱 : <input type="email" placeholder="请输入邮箱" id="email" name="email" v-model="email">
            </label>
        </div>
        
        <div class="password">
            <label for="pass">
                密码 : <input type="password" placeholder="请输入密码" id="pass" name="pass" autocomplete="off" v-model="password">
            </label>
        </div>

        <div class="submit" @click="login">
            <div class="btn">登录</div>
        </div>
        <router-link class="toRegister" tag="div" to="/register">
            <div class="btn">没号?去注册一个</div>
        </router-link>
        
    </div>
  </div>
</template>

<script>
import animate from 'animate.css';
import axios from 'axios';
import {mapMutations} from 'vuex';
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    mounted() {
        window.scrollTo(0,0);
    },
    methods: {
        login(){
            if(this.email == '' || this.password == ''){
                this.$layer.msg('邮箱或密码不能为空');
                return;
            }
            const loginMes = JSON.stringify({
                email: this.email,
                password: this.password
            })
            axios.post(`${this.global.apiUrl}login`,loginMes)
            .then((res)=>{
                if(res.status == 200){
                    this.$layer.msg(res.data.msg)
                    if(res.data.code == 200){
                        this.$cookies.set('email',this.email);
                        this.$cookies.set('password',window.btoa(this.password));
                        this.changeUserInfo(res.data.result);
                        this.$router.push('/home');
                    }
                }
            })
        },

        ...mapMutations(['changeUserInfo'])
    },
}
</script>

<style lang="less" scoped>
  .login{
      height: 100vh;
      .content{
          text-align: center;
          width: 400px;
          margin: 10px auto;
          @media screen and (max-width:767px){
              width: 80%;
          }
          input{
              width: 75%;
              border: 1px solid #fff;
              border-radius: 5px;
              outline: none;
              padding: 10px 10px;
              background-color: #fff;
              color: #000;
          }
          h3{
              margin-bottom: 20px;
          }
          div{
              margin-bottom: 20px;
          }
          .submit,.toRegister{
              .btn{
                  padding: 10px 0;
                  text-align: center;
                  border-radius: 5px;
                  background-color: rgba(107, 195, 13, 1);
                  cursor: pointer;
                  &:hover{
                      background-color: rgba(107, 195, 13, 0.8);
                  }
              }
          }
      }
  }
</style>