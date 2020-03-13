<template>
    <div class="replyBorder" v-if='showReply'>
        <div class="replyCon">
            <textarea @keydown.enter="biuReply" name="replyB" id="replyB" cols="30" rows="1" :placeholder="`回复 ${replyName}:`" v-model="replyVal" :autofocus='isfocus'></textarea>
            <div class="emojis">
                <img src="~@/assets/images/emjio.png" alt="添加表情" title="添加表情" @click="showEmoji">
                <div class="allEmoji" v-if="isShowEmoji">
                    <img v-for="(item,index) in emojis" :key="index+item.alt" :src="item.src" :alt="item.alt" :title="item.alt" @click="addEmoji">
                </div>
            </div>
        </div>
        <button class="submitReply" @click="biuReply">biu ~</button>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios';
export default {
    props: ['showReply','parentId','blogId','replyName','replyEmail'],
    data() {
        return {
            replyVal: '',
            isShowEmoji: false,
            emojiObj: {},
            isfocus: false,
            commentArr: [],
            urlSplitStr: this.$store.state.globalRandomStr
        }
    },
    computed: {
        ...mapState({
            emojis: (state) => state.emojis
        }),
        ...mapState({
            userInfo: (state) => state.userInfo
        }),
    },
    methods:{
        biuReply(){
            if(this.replyVal.trim() == ''){
                this.$layer.msg('你还没有输入内容哦~')
            }else if(!this.$cookies.isKey('email') || !this.$cookies.isKey('password')){
                this.$layer.msg('请先登录 再评论哟~')
            }else if(this.replyVal.length > 200){
                this.$layer.msg('评论长度不得超过两百哟~');
            }else{
                this.dealCommentContent();
                const userMes = JSON.stringify({
                    name: this.userInfo.name,
                    avatar: this.userInfo.avatar,
                    content1: this.replyVal,
                    content2: JSON.stringify(this.commentArr),
                    blog_id: this.blogId == '' || this.blogId == null ? -1 : parseInt(this.blogId),
                    parent_id: this.parentId,
                    email: this.$cookies.get('email'),
                    parent_email: this.replyEmail,
                    parent_name: this.replyName == null ? '0' : this.replyName,
                    is_admin: this.userInfo.is_admin,
                    url_split_str: this.urlSplitStr
                })
                this.sendComment(userMes);
            }
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
            this.replyVal = this.replyVal + e.target.alt;
            this.isfocus = true;
            this.isShowEmoji = false;
        },
        onFocus(){
            this.isShowEmoji = false;
        },
        dealCommentContent(){
            this.commentArr = [];
            const mesArr = [];
            const newMes = this.replyVal.replace(/\[/g,`${this.urlSplitStr}[`).replace(/\]/g,`]${this.urlSplitStr}`);
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
        },
    }
}
</script>

<style lang="less" scoped>
    .replyBorder{
        width: 100%;
        margin-top: 10px;
        .replyCon{
            display: flex;
            border: 1px solid #fff;
            border-radius: 10px;
            box-sizing: border-box;
            position: relative;
            textarea{
                width: 100%;
                resize: vertical;
                outline: none;
                background-color: transparent;
                padding: 15px;
                border: none;
                box-sizing: border-box;
                color: #fff;
                cursor: pointer;
                &::placeholder{
                    color: rgb(66, 66, 66);
                }
            }
            .emojis{
                box-sizing: border-box;
                padding: 10px;
                cursor: pointer;
                img{
                    width: 20px;
                    vertical-align: middle;
                }
                .allEmoji{
                    position: absolute;
                    right: 0;
                    bottom: 50px;
                    background-color: #fff;
                    width: 455px;
                    height: 175px;
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
            }
        }
        .submitReply{
            margin-top: 10px;
            color: #fff;
            background-color: #6cc40d;
            border: none;
            padding: 5px 10px;
            text-align: center;
            cursor: pointer;
            border-radius: 5px;
            outline: none;
            &:hover{
                background-color: #72d10d;
            }
        }
    }
</style>