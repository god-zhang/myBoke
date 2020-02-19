<template>
    <div class="reply">
        <div class="headImg">
            <div class="img">
                <img src="~@/assets/images/bg.jpg" alt="">
            </div>
        </div>
        <div class="content">
            <div class="name">
                <span class="name1">atsh</span>
                <span class="reply1">回复</span>
                <span class="name2">tgfh</span>
                <span class="comment-con">噢!上帝,这个博客太好看了吧</span>
            </div>
            <div class="time">
                <span>2020/2/11 17:36:34</span>
                <span @click="replyUser">{{upAndDown}}</span>
            </div>
            <replyFrame :showReply='isReplay'></replyFrame>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import replyFrame from '../components/replyFrame';
export default {
    components:{
        replyFrame
    },
    data() {
        return {
            upAndDown: '回复',
            isReplay: false
        }
    },
    methods:{
        replyUser(){
            this.isReplay = !this.isReplay;
            if(this.isReplay){
                this.upAndDown = '收起';
            }else{
                this.upAndDown = '回复';
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .reply{
        display: flex;
        border-top: 1px solid #999;
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
            text-align: left;
            margin-left: 10px;
            width: 100%;
            .name{
                font-size: 18px;
                font-weight: 400;
                margin-bottom: 10px;
                span{
                    margin-right: 5px;
                    &.name1,&.name2{
                        color: #2ea7e0;
                    }
                    &.reply1{
                        font-size: 15px;
                    }
                    &.comment-con{
                        font-size: 15px;
                    }
                }
            }
            .time{
                font-size: 14px;
                color: rgb(49, 49, 49);
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