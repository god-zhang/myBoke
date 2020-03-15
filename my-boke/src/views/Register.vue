<template>
  <div class="register">
    <div class="content card cardCommon animated bounceInUp">
        <h3>注册</h3>
        <div class="email">
            <label for="email">
                <div class="title">邮箱 :</div>
                <div class="inp">
                    <input type="email" placeholder="请输入邮箱,暂支持QQ邮箱" id="email" name="email" v-model="email" autocomplete="off">
                </div> 
            </label>
        </div>

        <div class="userName">
            <label for="userName">
                <div class="title">用户名 :</div>
                <div class="inp">
                    <input type="text" placeholder="请输入用户名" id="userName" name="userName" v-model="userName" autocomplete="off">
                </div> 
            </label>
        </div>
        
        <div class="password">
            <label for="pass">
                <div class="title">密码 :</div>
                <div class="inp">
                    <input type="password" placeholder="请输入密码" id="pass" name="pass" v-model="password">
                </div>
            </label>
        </div>

        <div class="passagain">
            <label for="passagain">
                <div class="title">确认密码 :</div>
                <div class="inp">
                    <input type="password" placeholder="请在次输入密码" id="passagain" name="passagain" v-model="passagain">
                </div>  
            </label>
        </div>
        <div class="avatar">
            <label for="avatar">
                <div class="title">上传头像 :</div>
                <div class="inp">
                    <input type="file" id="avatar" name="avatar" @change="fileChange">
                    <p>* 为保证美观,小伙伴请尽量上传正方形图片哟~</p>
                </div>     
            </label>
        </div>

        <div class="code">
            <div class="codeDiv">
                <div class="title">验证码 :</div>
                <div class="inp">
                    <input type="text" placeholder="请输入验证码" id="code" name="code" autocomplete="off" v-model="code">
                </div>
                <button @click="getCode" :disabled='isDisableSend' :class="disableClass">{{disableText}}</button>
            </div>
        </div>

        <div class="showAvatar">
            <div class="prev">预览 :</div>
            <div class="img">
                <img :src="avatarImg" alt="" width="100%">
            </div>
        </div>

        <div class="submit">
            <div class="btn" @click="register">注册</div>
        </div>
        
    </div>
  </div>
</template>

<script>
import animate from 'animate.css';
import axios from 'axios';
export default {
    data() {
        return {
            avatarImg: null,
            email: '',
            password: '',
            passagain: '',
            userName: '',
            code: '',
            isDisableSend: false,
            disableClass: '',
            disableText: '发送',
            disableCount: 30,
        }
    },
    mounted() {
        window.scrollTo(0,0);
    },
    methods:{
        register(){
            const file = document.getElementById('avatar').files[0];
            const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g
            if(this.email.trim() == '' || this.password.trim() == '' || this.passagain.trim() == '' || this.userName.trim() == ''){
                this.$layer.msg('邮箱 或 密码 或 用户名不能为空');
                return;
            }else if(!file){
                this.$layer.msg('未选择任何文件');
                return;
            }else if(file.size > 150 * 1024){
                this.$layer.msg('图片大小不能超过150KB');
                return;
            }else if(!file.type.includes('image')){
                this.$layer.msg('请选择正确的图片格式上传');
                return;
            }else if(!reg.test(this.email)){
                this.$layer.msg('邮箱格式不正确');
                return;
            }else if(this.userName.length < 2 || this.userName.length > 6){
                this.$layer.msg('用户名长度必须介于2-6字符之间');
                return;
            }else if(/^[0-9]*$/.test(this.userName)){
                this.$layer.msg('用户名不能为纯数字');
                return;
            }else if((this.password.length < 8 || this.password.length > 12) || (this.passagain.length < 8 || this.passagain.length > 12)){
                this.$layer.msg('密码长度必须是8-12位');
                return;
            }else if(this.password !== this.passagain){
                this.$layer.msg('两次输入的密码不一致');
                return;
            }else if(this.code.trim() == ''){
                this.$layer.msg('验证码不能为空');
                return;
            }
            const forms = new FormData();
            forms.append('email',this.email);
            forms.append('password',this.password);
            forms.append('userName',this.userName);
            forms.append('avatar',file);
            forms.append('code',this.code.trim());
            axios.post(
            `${this.global.apiUrl}register`,forms)
            .then(res => {
                 this.$layer.msg(res.data.msg);
                 if(res.data.code == 200){
                     this.$router.push('/login');
                 }
            })
            .catch(e => {
                
            })
        },
        fileChange(e){
            const avatar = e.target.files[0];
            const wUrl = window.URL || window.webkitURL;
            const imgUrl = wUrl.createObjectURL(avatar);
            this.avatarImg = imgUrl;
        },
        getCode(){
            let timer = null;
            const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g
            if(this.email.trim() == ''){
                this.$layer.msg('邮箱不能为空');
            }else if(!reg.test(this.email)){
                this.$layer.msg('邮箱格式不正确');
            }else{
                axios.get(`${this.global.apiUrl}randomCode?email=${this.email}`)
                .then((res)=>{
                    this.$layer.msg(res.data.msg);
                    if(res.data.code == 200 || res.data.code == 201){
                        this.isDisableSend = true;
                        this.disableClass = 'disableClass';
                        timer = setInterval(()=>{
                            this.disableCount --;
                            this.disableText = this.disableCount+'秒'
                            if(this.disableCount == 0){
                                this.isDisableSend = false;
                                this.disableClass = '';
                                this.disableText = '发送';
                                this.disableCount = 30;
                                clearInterval(timer);
                            }
                        },1000)
                    }
                })
            }
        },
    }
}
</script>

<style lang="less" scoped>
  .register{
      height: 100vh;
      .content{
          text-align: center;
          width: 400px;
          margin: 10px auto;
          @media screen and (max-width:767px){
              width: 80%;
          }
          .email label,.password label,.passagain label,.avatar label,.userName label,.code .codeDiv{
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
              .title{
                  width: 30%;
                  text-align: left;
              }
              .inp{
                  width: 70%;
                  text-align: right;
                  p{
                      text-align: right;
                      font-size: 10px;
                      color: #000;
                      padding-top: 5px;
                  }
                  input{
                    width: 80%;
                    border: 1px solid #fff;
                    border-radius: 5px;
                    outline: none;
                    padding: 10px 10px;
                    background-color: #fff;
                    color: #000;
                  }
              }
          }
          .code .codeDiv .title{
              width: 55%;
          }
          .code button{
              width: 30%;
              border-radius: 5px;
              outline: none;
              padding: 10px 0px;
              cursor: pointer;
              margin-left: 5px;
              border: none;
              background-color: rgba(46, 167, 220, 1);
              color: #fff;
              &:hover{
                background-color: rgba(46, 167, 220, 0.8);
              }
              &.disableClass{
                  cursor: not-allowed;
                  background-color: gray;
              }
          }
          .showAvatar{
              text-align: left;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
              .img{
                  width: 100px;
                  height: 100px;
                  border: 1px solid #000;
                  border-radius: 50%;
                  overflow: hidden;
              }
          }
          h3{
              margin-bottom: 20px;
          }
          .submit{
              margin-bottom: 20px;
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