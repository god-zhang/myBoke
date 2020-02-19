<template>
    <div class="comments-main">
        <div class="headImg">
            <div class="img">
                <img src="~@/assets/images/bg.jpg" alt="">
            </div>
        </div>
        <div class="content">
            <div class="name">
                <span>atsh</span>
            </div>
            <div class="comment-con">噢!上帝,这个博客太好看了吧 <i class="iconfont iconemoji_line7" style="color:#000;font-size:25px;font-weight:400;"></i></div>
            <div class="time">
                <span>2020/2/11 17:36:34</span>
                <span @click="replyUser">{{upAndDown}}</span>
            </div>
            <commentsReply v-if="isReply"></commentsReply>
            <replyFrame :showReply='showReply'></replyFrame>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import commentsReply from '../components/comments-reply';
import replyFrame from '../components/replyFrame';
export default {
    data() {
        return {
            upAndDown: '回复',
            showReply: false
        }
    },
    components:{
        commentsReply,
        replyFrame
    },
    props: {
        isReply:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        replyUser(){
            this.showReply = !this.showReply;
            if(this.showReply){
                this.upAndDown = '收起';
            }else{
                this.upAndDown = '回复';
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .comments-main{
        display: flex;
        border-bottom: 1px dashed rgb(247, 234, 234);
        padding: 10px 0;
        .headImg{
            padding-top: 5px;
            .img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    vertical-align: middle;
                }
            }
        }
        .content{
            width: 100%;
            text-align: left;
            margin-left: 10px;
            .name{
                color: #2ea7e0;
                font-size: 20px;
                font-weight: 400;
            }
            .comment-con{
                margin-bottom: 15px;
                font-size: 16px;
            }
            .time{
                font-size: 14px;
                color: rgb(49, 49, 49);
                padding-bottom: 10px;
                span{
                    &:last-child{
                        margin-left: 10px;
                        color: #2ea7e0;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>