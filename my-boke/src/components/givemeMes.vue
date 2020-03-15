<template>
    <div class='giveMes card cardCommon'>
        <div class="head" v-if="isHide">
            <h3>留言屋</h3>
            <p>在此留下你来过的痕迹吧~</p>
        </div>
        <div class="content">
            <div class="emjio">
                <img src="~@/assets/images/emjio.png" alt="添加表情" title="添加表情" @click="showEmoji">
                <img src="~@/assets/images/delete.png" alt="重新输入" title="重新输入" @click="resetMes">
            </div>
            <div class="allEmoji" v-if="isShowEmoji">
                <img v-for="(item,index) in emojis" :key="index+item.alt" :src="item.src" :alt="item.alt" :title="item.alt" @click="addEmoji">
            </div>
            <textarea id="comments" contenteditable="true" v-model="commentMes" cols="20" rows="10" :autofocus='isfocus' @focus="onFocus" placeholder="说出你的心声~"></textarea>
        </div>
        <button class="upMes" @click='submitMes'>{{submitBtn}}</button>
    </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex';
export default {
    props:{
        isHide:{
            type: Boolean,
            default: true
        },
        submitBtn:{
            type: String,
            default: '留下足迹'
        },
        blogId:{
            type: String,
            default: ''
        },
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.userInfo
        }),
        ...mapState({
            emojis: (state) => state.emojis
        }),
    },
    data() {
        return {
            isShowEmoji: false,
            commentMes: '',
            isfocus: false,
            commentArr: [],
            emojiObj: {},
            urlSplitStr: this.$store.state.globalRandomStr
        }
    },
    mounted() {
        
    },
    methods:{
        submitMes(){
            if(this.commentMes == null || this.commentMes.trim() == ''){
                this.$layer.msg('你还没有输入内容哦~')
            }else if(!this.$cookies.isKey('email') || !this.$cookies.isKey('password')){
                this.$layer.msg('请先登录 再评论哟~')
            }else if(this.commentMes.length > 200){
                this.$layer.msg('评论长度不得超过两百哟~');
            }else{
                this.dealCommentContent();
                const userMes = JSON.stringify({
                    name: this.userInfo.name,
                    avatar: this.userInfo.avatar,
                    content1: this.commentMes,
                    content2: JSON.stringify(this.commentArr),
                    blog_id: this.blogId == '' ? -1 : parseInt(this.blogId),
                    parent_id: -1,
                    email: this.$cookies.get('email'),
                    parent_email: 'lmmkazhangmin@foxmail.com',
                    parent_name: '0',
                    is_admin: this.userInfo.is_admin,
                    url_split_str: this.urlSplitStr
                })
                this.sendComment(userMes);
            }
        },
        resetMes(){
            this.commentMes = '';
            this.emojiObj = {};
        },
        showEmoji(){
            this.isShowEmoji = !this.isShowEmoji;
        },
        addEmoji(e){
            let altUnicode = '';
            for(let i = 1; i < e.target.alt.length-1; i++){
                altUnicode += e.target.alt.charCodeAt(i)
            }
            this.emojiObj[altUnicode] = this.urlSplitStr+e.target.src;
            this.commentMes = this.commentMes + e.target.alt;
            this.isfocus = true;
            this.isShowEmoji = false;
        },
        onFocus(){
            this.isShowEmoji = false;
        },
        dealCommentContent(){
            this.commentArr = [];
            const mesArr = [];
            const newMes = this.commentMes.replace(/\[/g,`${this.urlSplitStr}[`).replace(/\]/g,`]${this.urlSplitStr}`);
            const newMesArr = newMes.split(this.urlSplitStr);
            for(let i = 0; i < newMesArr.length; i++){
                if(newMesArr[i] != ''){
                    mesArr.push(newMesArr[i]);
                }
            }

            for(let i = 0; i < mesArr.length; i++){
                const reg = /\[.*.\]/g;
                if(reg.test(mesArr[i])){
                    let altUnicode = '';
                    for(let m = 1; m < mesArr[i].length-1; m++){
                        altUnicode += mesArr[i].charCodeAt(m);
                    }
                    if(this.emojiObj[altUnicode]){
                        this.commentArr.push(this.emojiObj[altUnicode]);
                    }else{
                        this.commentArr.push(mesArr[i]);
                    }
                }else{
                    this.commentArr.push(mesArr[i]);
                }
            }
        },

        sendComment(data){
            axios.post(`${this.global.apiUrl}insertComments`,data)
            .then(res=>{
                if(res.data.code == 200){
                    this.$layer.msg(res.data.msg);
                    location.reload();
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .giveMes{
        width: 100%;
        .head{
            text-align: center;
            h3{
                margin-bottom: 10px;
            }
            p{
                color: #853734;
                font-size: 15px;
            }
        }
        .content{
            position: relative;
            width: 100%;
            margin-top: 40px;
            border: 1px solid #000;
            border-radius: 10px;
            box-sizing: border-box;
            .emjio{
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #000;
                margin-bottom: 5px;
                padding: 10px 15px; 
                img{
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }
            }
            .allEmoji{
                position: absolute;
                left: 15px;
                top: 40px;
                background-color: #fff;
                width: 60%;
                height: 170px;
                overflow: scroll;
                img{
                    width: 35px;
                    height: 35px;
                    display: inline-block;
                    border: 1px solid #000;
                    padding: 2px;
                    text-align: center;
                    box-sizing: border-box;
                    cursor: pointer;
                    &:hover{
                        background-color: #eee;
                    }
                }
            }
            #comments{
                padding: 15px;
                width: 100%;
                outline: none;
                background-color: transparent;
                border: none;
                color: #fff;
                font-size: 15px;
                cursor: pointer;
                resize: vertical;
                box-sizing: border-box;
                &::placeholder{
                    color: #555;
                }
            }
        }
        .upMes{
            margin-top: 10px;
            color: #fff;
            background-color: #6cc40d;
            border: none;
            padding: 10px 20px;
            text-align: center;
            cursor: pointer;
            border-radius: 5px;
            outline: none;
            &:hover{
                background-color: #72d10d;
            }
        }
    }
    @media screen and (max-width:767px){
        .giveMes{
            .content{
                .allEmoji{
                    width: 315px;
                    height: 280px;
                }
            }
        }
    }
</style>